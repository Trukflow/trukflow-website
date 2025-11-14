import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MpesaPaymentRequest {
  userId: string;
  planId: string;
  planName: string;
  phoneNumber: string;
  amount: number;
  maxContacts: number;
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

    const { userId, planId, planName, phoneNumber, amount, maxContacts, firebaseToken }: MpesaPaymentRequest = await req.json();
    
    console.log('Processing M-PESA payment for user:', userId);
    console.log('Request payload:', { userId, planId, phoneNumber, amount });

    // 1. Initiate M-PESA payment via external backend
    const mpesaResponse = await fetch('https://agritruk.onrender.com/api/payments/mpesa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firebaseToken}`
      },
      body: JSON.stringify({
        phone: phoneNumber,
        amount,
        accountRef: `SUB-${userId}-${Date.now()}`
      })
    });

    if (!mpesaResponse.ok) {
      const errorText = await mpesaResponse.text();
      console.error('M-PESA initiation failed:', errorText);
      throw new Error(`M-PESA payment failed: ${errorText}`);
    }

    const mpesaData = await mpesaResponse.json();
    console.log('M-PESA initiated:', mpesaData);

    // 2. Create pending subscription in Supabase
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const { data: subscription, error: supabaseError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        plan_name: planName,
        status: 'active', // Will be confirmed via webhook
        end_date: endDate.toISOString(),
        max_contacts: maxContacts,
        contacts_used: 0,
        payment_reference: mpesaData.CheckoutRequestID || mpesaData.transactionId
      })
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      throw supabaseError;
    }

    console.log('Saved to Supabase:', subscription);

    // 3. Sync to external backend subscription system
    try {
      const backendResponse = await fetch('https://agritruk.onrender.com/api/recruiter/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`
        },
        body: JSON.stringify({
          userId,
          planId,
          paymentData: {
            paymentMethod: 'mpesa',
            phoneNumber,
            transactionId: mpesaData.CheckoutRequestID || mpesaData.transactionId
          }
        })
      });

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        console.log('Synced to backend:', backendData);
      } else {
        console.warn('Backend sync failed:', await backendResponse.text());
      }
    } catch (backendError) {
      console.warn('Backend sync error (continuing anyway):', backendError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription,
        mpesaData,
        message: 'Payment initiated. Please complete on your phone.'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Payment error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
