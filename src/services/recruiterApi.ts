import { apiUrl, authHeaders, jsonHeaders } from "@/services/http";

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
    paymentMethod: 'mpesa' | 'card' | 'trial';
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
    // Only send a token when one is passed in, so a new registration is never
    // tied to whichever account happens to be signed in
    const headers: Record<string, string> = firebaseToken
      ? await jsonHeaders(firebaseToken)
      : { 'Content-Type': 'application/json' };

    const response = await fetch(apiUrl('api', 'recruiter', 'register'), {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Failed to register');
    }

    return response.json();
  },

  async login(data: LoginRequest, firebaseToken?: string): Promise<UserResponse> {
    const response = await fetch(apiUrl('api', 'recruiter', 'login'), {
      method: 'POST',
      headers: await jsonHeaders(firebaseToken),
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
    const response = await fetch(apiUrl('api', 'recruiter', 'plans'), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }

    return response.json();
  },

  async getPlan(planId: string): Promise<Plan> {
    const response = await fetch(apiUrl('api', 'recruiter', 'plans', planId), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch plan');
    }

    return response.json();
  },

  // Subscriptions
  async startSubscription(data: StartSubscriptionRequest): Promise<SubscriptionResponse> {
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'start'), {
      method: 'POST',
      headers: await jsonHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to start subscription' }));
      throw new Error(error.message || 'Failed to start subscription');
    }

    return response.json();
  },

  async getSubscriptionStatus(userId: string): Promise<SubscriptionResponse> {
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'status', userId), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    return response.json();
  },

  async getSubscriptionHistory(userId: string): Promise<SubscriptionResponse[]> {
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'history', userId), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription history');
    }

    return response.json();
  },

  async upgradeSubscription(data: UpgradeSubscriptionRequest): Promise<SubscriptionResponse> {
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'upgrade'), {
      method: 'PUT',
      headers: await jsonHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to upgrade subscription' }));
      throw new Error(error.message || 'Failed to upgrade subscription');
    }

    return response.json();
  },

  async cancelSubscription(userId: string): Promise<{ message: string }> {
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'cancel', userId), {
      method: 'PUT',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    return response.json();
  },

  // Admin - Plans Management
  async createPlan(data: CreatePlanRequest): Promise<Plan> {
    const response = await fetch(apiUrl('api', 'recruiter', 'admin', 'plans'), {
      method: 'POST',
      headers: await jsonHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create plan' }));
      throw new Error(error.message || 'Failed to create plan');
    }

    return response.json();
  },

  async updatePlan(planId: string, data: Partial<CreatePlanRequest>): Promise<Plan> {
    const response = await fetch(apiUrl('api', 'recruiter', 'admin', 'plans', planId), {
      method: 'PUT',
      headers: await jsonHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update plan' }));
      throw new Error(error.message || 'Failed to update plan');
    }

    return response.json();
  },

  async deletePlan(planId: string): Promise<{ message: string }> {
    const response = await fetch(apiUrl('api', 'recruiter', 'admin', 'plans', planId), {
      method: 'DELETE',
      headers: await authHeaders(),
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
    const response = await fetch(apiUrl('api', 'payments', 'mpesa'), {
      method: 'POST',
      headers: await jsonHeaders(),
      body: JSON.stringify(data),
    });

    const payload = await response.json().catch(() => ({ message: 'Failed to initiate payment' }));

    if (!response.ok) {
      throw new Error(payload.message || 'Failed to initiate payment');
    }

    if (payload?.success === false) {
      throw new Error(payload.message || 'Failed to initiate payment');
    }

    if (payload?.data?.success === false) {
      throw new Error(payload.data.message || 'M-Pesa payment failed');
    }

    return payload;
  },

  // Drivers
  async getApprovedDrivers(): Promise<ApprovedDriver[]> {
    const response = await fetch(apiUrl('api', 'recruiter', 'drivers', 'approved'), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      console.error('Failed to fetch approved drivers:', response.status);
      throw new Error(`Failed to fetch approved drivers (${response.status})`);
    }

    const data = await response.json();

    const extractDriversArray = (value: any): ApprovedDriver[] | null => {
      if (!value) return null;
      if (Array.isArray(value)) return value;
      if (Array.isArray(value.drivers)) return value.drivers;
      if (Array.isArray(value.approvedDrivers)) return value.approvedDrivers;
      return null;
    };

    // Handle common wrapper patterns and nested payloads.
    const drivers =
      extractDriversArray(data) ||
      extractDriversArray(data?.data) ||
      extractDriversArray(data?.data?.data);

    if (drivers) {
      return drivers;
    }

    console.error('Unexpected approved drivers response structure');
    throw new Error('Unexpected API response format');
  },

  async getDriverDetails(jobSeekerId: string): Promise<ApprovedDriver> {
    const response = await fetch(apiUrl('api', 'recruiter', jobSeekerId, 'details'), {
      method: 'GET',
      headers: await authHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch driver details');
    }

    return response.json();
  },

  // Account Deletion Request
  // Supports both Firebase auth (web) and deep link token (mobile app)
  async requestAccountDeletion(reason: string, uid?: string, deepLinkToken?: string): Promise<{ message: string }> {
    // Use deep link token if provided, otherwise the Firebase token
    const headers = await jsonHeaders(deepLinkToken);

    // Use the endpoint format: POST /api/auth/{uid}/delete/request
    const endpoint = uid 
      ? apiUrl('api', 'auth', uid, 'delete', 'request')
      : apiUrl('api', 'auth', 'delete', 'request');
    
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
    const response = await fetch(apiUrl('api', 'recruiter', 'subscription', 'trial'), {
      method: 'POST',
      headers: await jsonHeaders(),
      body: JSON.stringify({ userId, planId }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to start trial' }));
      throw new Error(error.message);
    }

    return response.json();
  }
};
