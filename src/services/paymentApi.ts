// src/services/paymentApi.ts
import { normalizeFirebaseUID } from "@/lib/utils";
import { recruiterApi } from "@/services/recruiterApi";
import { apiUrl, authHeaders, jsonHeaders } from "@/services/http";

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
    const response = await fetch(apiUrl('api', 'payments', 'paystack', 'initialize'), {
      method: 'POST',
      headers: await jsonHeaders(),
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
    const response = await fetch(apiUrl('api', 'payments', paymentId), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment details');
    }

    return response.json();
  },

  // Get user's payment history
  async getUserPaymentHistory(userId: string): Promise<PaymentHistory[]> {
    const response = await fetch(apiUrl('api', 'payments', 'user', userId), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment history');
    }

    return response.json();
  },

  // Verify payment transaction
  async verifyPayment(reference: string) {
    const response = await fetch(apiUrl('api', 'payments', 'verify', reference), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return response.json();
  },

  // Check if user has active subscription
  async hasActiveSubscription(userId: string): Promise<boolean> {
    const normalized = normalizeFirebaseUID(userId);
    try {
      const subscription = await recruiterApi.getSubscriptionStatus(normalized);
      return subscription?.status === 'active' || subscription?.isActive === true;
    } catch {
      return false;
    }
  },

  // --- NEW: Start 1-Hour Free Trial ---
  async startTrial(userId: string, planId: string): Promise<SubscriptionResponse> {
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'trial'), {
      method: 'POST',
      headers: await jsonHeaders(),
      body: JSON.stringify({ userId, planId }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to start trial' }));
      throw new Error(error.message || 'Could not start free trial');
    }

    return response.json();
  },

  // Process M-PESA payment
  async processMpesaPayment(phone: string, amount: number, accountRef: string) {
    const response = await fetch(apiUrl('api', 'payments', 'mpesa'), {
      method: 'POST',
      headers: await jsonHeaders(),
      body: JSON.stringify({ phone, amount, accountRef }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'M-PESA payment failed' }));
      throw new Error(error.message || 'Failed to process M-PESA payment');
    }

    return response.json();
  },
};
