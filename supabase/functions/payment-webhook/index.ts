import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentWebhookData {
  transactionId: string;
  phoneNumber: string;
  amount: number;
  status: 'success' | 'failed';
  userId?: string;
  planId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse webhook data
    const webhookData: PaymentWebhookData = await req.json();
    
    console.log('Payment webhook received:', webhookData);

    // Verify payment status
    if (webhookData.status === 'success') {
      // Update company verification status in database
      if (webhookData.userId) {
        const { error: updateError } = await supabase
          .from('companies')
          .update({ 
            verified: true,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', webhookData.userId);

        if (updateError) {
          console.error('Error updating company:', updateError);
          throw updateError;
        }

        console.log('Company verified successfully:', webhookData.userId);
      }

      // You can also store payment transaction details if needed
      // await supabase.from('payments').insert({
      //   user_id: webhookData.userId,
      //   transaction_id: webhookData.transactionId,
      //   amount: webhookData.amount,
      //   status: webhookData.status,
      //   phone_number: webhookData.phoneNumber,
      //   plan_id: webhookData.planId
      // });

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Payment verified and company approved' 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } else {
      console.log('Payment failed:', webhookData);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Payment failed' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
