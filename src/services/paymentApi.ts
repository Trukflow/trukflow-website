// src/services/paymentApi.ts
import { auth } from "@/lib/firebase";
import { supabase } from "@/integrations/supabase/client";
import { normalizeFirebaseUID } from "@/lib/utils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agritruk.onrender.com';

interface PaystackInitializeRequest {
  email: string;
  amount: number;
  planId: string;
  userId: string;
  callbackUrl: string;
}

interface PaymentHistory {
  id: string;
  userId: string;
  amount: number;
  status: string;
  planId: string;
  createdAt: string;
  expiresAt?: string;
}

interface SubscriptionResponse {
  isActive: boolean;
  planId: string;
  endDate: string;
  paymentStatus: string;
  // Add more fields as needed
}

export const paymentApi = {
  // Initialize Paystack payment
  async initializePaystack(data: PaystackInitializeRequest) {
    const token = await auth.currentUser?.getIdToken();

    const response = await fetch(`${API_BASE_URL}/api/payments/paystack/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Payment initialization failed' }));
      throw new Error(error.message || 'Failed to initialize payment');
    }

    return response.json();
  },

  // Get payment details by ID
  async getPaymentDetails(paymentId: string) {
    const token = await auth.currentUser?.getIdToken();

    const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment details');
    }

    return response.json();
  },

  // Get user's payment history
  async getUserPaymentHistory(userId: string): Promise<PaymentHistory[]> {
    const token = await auth.currentUser?.getIdToken();

    const response = await fetch(`${API_BASE_URL}/api/payments/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment history');
    }

    return response.json();
  },

  // Verify payment transaction
  async verifyPayment(reference: string) {
    const token = await auth.currentUser?.getIdToken();

    const response = await fetch(`${API_BASE_URL}/api/payments/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return response.json();
  },

  // Check if user has active subscription
  async hasActiveSubscription(userId: string): Promise<boolean> {
    const normalized = normalizeFirebaseUID(userId);
    const { data, error } = await supabase
      .from('companies')
      .select('verified')
      .eq('user_id', normalized)
      .single();

    return !error && data?.verified === true;
  },

  // --- NEW: Start 1-Hour Free Trial ---
  async startTrial(userId: string, planId: string): Promise<SubscriptionResponse> {
    const token = await auth.currentUser?.getIdToken();

    const response = await fetch(`${API_BASE_URL}/api/recruiter/subscription/trial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, planId }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to start trial' }));
      throw new Error(error.message || 'Could not start free trial');
    }

    return response.json();
  },
};