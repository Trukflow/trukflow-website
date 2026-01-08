import { auth } from "@/lib/firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agritruk.onrender.com';

// Request/Response Types
interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
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

// Driver Interfaces
interface Address {
  street: string;
  city: string;
  county: string;
  country: string;
}

interface DocumentDetails {
  number: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  expiryDate?: string;
}

interface DrivingLicense extends DocumentDetails {
  vehicleClasses: string[];
}

interface GoodConductCert extends DocumentDetails {
  isClean: boolean;
  isRenewed: boolean;
}

interface Documents {
  idDoc: DocumentDetails;
  drivingLicense: DrivingLicense;
  goodConductCert: GoodConductCert;
  psvBadge: DocumentDetails;
  nightTravelLicense: DocumentDetails;
  rslLicense: DocumentDetails;
  backgroundCheck: DocumentDetails;
  goodsServiceLicense: DocumentDetails;
}

interface Experience {
  experienceYears: number;
  startDate: string;
  vehicleClassesExperience: string[];
  experienceDescription: string;
  specializations: ('local' | 'regional' | 'international')[];
}

interface SaccoDetails {
  name: string;
  membershipNumber: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

interface CrossBorderVerification {
  eacVerified: boolean;
  countries: string[];
  verifiedAt?: string;
}

interface Training {
  basicSafetyCompleted: boolean;
  basicSafetyDate?: string;
  advancedTrainingEligible: boolean;
  advancedTrainingCompleted: boolean;
  advancedTrainingDate?: string;
  certificates: string[];
}

interface Performance {
  platformRating: number;
  totalRatings: number;
  completedTrips: number;
  onTimeDeliveryRate: number;
  incidentReports: number;
  lastIncidentDate?: string;
}

interface TierEligibility {
  silverEligible: boolean;
  goldEligible: boolean;
  platinumEligible: boolean;
  eligibilityCheckedAt: string;
  blockingReasons: string[];
}

export interface ApprovedDriver {
  jobSeekerId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  age: number;
  address: Address;
  profilePhoto: string;
  employmentStatus: 'employed' | 'unemployed' | 'self-employed';
  employedSince?: string;
  documents: Documents;
  experience: Experience;
  saccoDetails: SaccoDetails;
  crossBorderVerification: CrossBorderVerification;
  training: Training;
  performance: Performance;
  tierEligibility: TierEligibility;
  createdAt: string;
  updatedAt: string;
  status: 'pending_approval' | 'approved' | 'rejected';
  approvedAt?: string;
  approvedBy?: string;
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionReason?: string;
}

export const recruiterApi = {
  // Authentication
  async register(data: RegisterRequest, firebaseToken?: string): Promise<UserResponse> {
    console.log('Sending registration request to:', `${API_BASE_URL}/api/recruiter/register`);
    console.log('Request payload:', { ...data, password: '***HIDDEN***' });
    console.log('Firebase token present:', !!firebaseToken);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (firebaseToken) {
      headers['Authorization'] = `Bearer ${firebaseToken}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    console.log('Registration response status:', response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      console.error('Registration error response:', error);
      throw new Error(error.message || 'Failed to register');
    }

    const responseData = await response.json();
    console.log('Registration successful, response:', responseData);
    return responseData;
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

  // Payment
  async initiateMpesaPayment(data: { 
    phone: string; 
    amount: number; 
    accountRef: string;
  }): Promise<any> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/payments/mpesa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to initiate payment' }));
      throw new Error(error.message || 'Failed to initiate payment');
    }

    return response.json();
  },

  // Drivers
  async getApprovedDrivers(): Promise<ApprovedDriver[]> {
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

  async getDriverDetails(jobSeekerId: string): Promise<ApprovedDriver> {
    const token = await auth.currentUser?.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/api/recruiter/${jobSeekerId}/details`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch driver details');
    }

    return response.json();
  },

  // Account Deletion Request
  async requestAccountDeletion(reason: string, uid?: string): Promise<{ message: string }> {
    const token = await auth.currentUser?.getIdToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Use the endpoint format: POST /api/auth/{uid}/delete/request
    const endpoint = uid 
      ? `${API_BASE_URL}/api/auth/${uid}/delete/request`
      : `${API_BASE_URL}/api/auth/delete/request`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to submit deletion request' }));
      throw new Error(error.message || 'Failed to submit deletion request');
    }

    return response.json();
  },

  // Start Trial
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
      throw new Error(error.message);
    }

    return response.json();
  }
};
