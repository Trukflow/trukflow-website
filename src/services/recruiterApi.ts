import { auth } from "@/lib/firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agritruk.onrender.com';

// Request/Response Types
interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface UserResponse {
  uid: string;
  email: string;
  phone: string;
  role: string;
  name: string;
  location: string;
  languagePreference: string;
  profilePhotoUrl: string;
  isVerified: boolean;
}

interface PlanFeatures {
  accessDuration: string;
  maxDriverContacts: string;
  maxActiveJobPosts: string;
  driverProfileViewing: boolean;
  documentsAccess: boolean;
  featuredListings: boolean;
  supportLevel: string;
}

interface Plan {
  planId: string;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  duration: number;
  trialDays: number;
  features: PlanFeatures;
  isActive: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PlansResponse {
  plans: Plan[];
}

interface StartSubscriptionRequest {
  userId: string;
  planId: string;
  paymentData: {
    paymentMethod: 'mpesa' | 'card';
    phoneNumber?: string;
    email: string;
  };
}

interface SubscriptionResponse {
  userId: string;
  subscriberId: string;
  planId: string;
  status: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autorenew: boolean;
  paymentStatus: string;
  transactionId: string;
  currentUsage: number;
  updatedAt: string;
  createdAt: string;
}

interface UpgradeSubscriptionRequest {
  userId: string;
  newPlanId: string;
}

interface CreatePlanRequest extends Omit<Plan, 'createdAt' | 'updatedAt'> {}

export const recruiterApi = {
  // Authentication
  async register(data: RegisterRequest): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/api/recruiter/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Failed to register');
    }

    return response.json();
  },

  async login(data: LoginRequest): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/api/recruiter/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Failed to login');
    }

    return response.json();
  },

  // Plans
  async getPlans(): Promise<PlansResponse> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/plans`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }

    return response.json();
  },

  async getPlan(planId: string): Promise<Plan> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/plans/${planId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch plan');
    }

    return response.json();
  },

  // Subscriptions
  async startSubscription(data: StartSubscriptionRequest): Promise<SubscriptionResponse> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/subscription/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to start subscription' }));
      throw new Error(error.message || 'Failed to start subscription');
    }

    return response.json();
  },

  async getSubscriptionStatus(userId: string): Promise<SubscriptionResponse> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/subscription/status/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    return response.json();
  },

  async getSubscriptionHistory(userId: string): Promise<SubscriptionResponse[]> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/subscription/history/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription history');
    }

    return response.json();
  },

  async upgradeSubscription(data: UpgradeSubscriptionRequest): Promise<SubscriptionResponse> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/subscription/upgrade`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to upgrade subscription' }));
      throw new Error(error.message || 'Failed to upgrade subscription');
    }

    return response.json();
  },

  async cancelSubscription(userId: string): Promise<{ message: string }> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/subscription/cancel/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    return response.json();
  },

  // Admin - Plans Management
  async createPlan(data: CreatePlanRequest): Promise<Plan> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/admin/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create plan' }));
      throw new Error(error.message || 'Failed to create plan');
    }

    return response.json();
  },

  async updatePlan(planId: string, data: Partial<CreatePlanRequest>): Promise<Plan> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/admin/plans/${planId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update plan' }));
      throw new Error(error.message || 'Failed to update plan');
    }

    return response.json();
  },

  async deletePlan(planId: string): Promise<{ message: string }> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/admin/plans/${planId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete plan');
    }

    return response.json();
  },

  // Drivers
  async getApprovedDrivers(): Promise<any[]> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/drivers/approved`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch approved drivers');
    }

    return response.json();
  },
};
