import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrialRequest {
  userId: string;
  planId: string;
  firebaseToken: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { userId, planId, firebaseToken }: TrialRequest = await req.json();
    
    console.log('Starting free trial for user:', userId);

    // Calculate trial end time (1 hour from now)
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 1);

    // 1. Store in Supabase
    const { data: subscription, error: supabaseError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        plan_name: 'Free Trial',
        status: 'trial',
        end_date: endDate.toISOString(),
        max_contacts: 2,
        contacts_used: 0
      })
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      throw supabaseError;
    }

    console.log('Saved to Supabase:', subscription);

    // 2. Sync to external backend
    try {
      const backendResponse = await fetch('https://agritruk.onrender.com/api/recruiter/subscription/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`
        },
        body: JSON.stringify({
          userId,
          planId
        })
      });

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        console.log('Synced to backend:', backendData);
      } else {
        // Log but don't fail if backend sync fails
        console.warn('Backend sync failed:', await backendResponse.text());
      }
    } catch (backendError) {
      console.warn('Backend sync error (continuing anyway):', backendError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription,
        message: 'Free trial started successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Trial error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start trial'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
