// src/pages/Payment.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from "@/components/Navbar";
import { Check } from "lucide-react";
import { recruiterApi } from "@/services/recruiterApi";
import { paymentApi } from "@/services/paymentApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { getSubscriptionAccess } from "@/lib/subscriptionAccess";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  trialHours?: number;
  maxContacts?: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserId(user.uid);
      else navigate('/company-auth');
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await recruiterApi.getPlans();
        const plans = response.plans.map(plan => {
          const maxContacts = plan.features.maxDriverContacts;
          return {
            id: plan.planId,
            name: plan.name,
            price: plan.price,
            duration: `${plan.duration} days`,
            trialHours: plan.trialDays > 0 ? plan.trialDays * 24 : undefined,
            maxContacts: maxContacts,
            features: [
              `${plan.features.accessDuration} access`,
              `Contact up to ${maxContacts} drivers`,
              `Up to ${plan.features.maxActiveJobPosts} active job posts`,
              plan.features.driverProfileViewing ? "Unlimited driver profile viewing" : "Limited driver viewing",
              plan.features.documentsAccess ? "Access to verified documents" : "Basic document access",
              ...(plan.features.featuredListings ? ["Featured listing on TRUKFLOW site"] : []),
              `${plan.features.supportLevel} support`
            ],
            popular: plan.isPopular
          };
        });
        setPricingPlans(plans);
        const defaultPlan = plans.find(p => p.popular) || plans[0];
        if (defaultPlan) setSelectedPlan(defaultPlan.id);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load pricing plans.",
          variant: "destructive",
        });
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, [toast]);

  const selectedPlanDetails = pricingPlans.find(p => p.id === selectedPlan);
  const isFreeTrial = selectedPlanDetails?.trialHours && selectedPlanDetails.trialHours > 0;

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('authToken');
    navigate('/company-auth');
  };

  const handleFreeTrial = async () => {
    if (!currentUserId || !selectedPlan) return;

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast({
          title: "Error",
          description: "User not authenticated",
          variant: "destructive",
        });
        return;
      }

      const email = user.email;
      if (!email) {
        toast({
          title: "Error",
          description: "User email not found",
          variant: "destructive",
        });
        return;
      }

      try {
        await recruiterApi.startTrial(currentUserId, selectedPlan);
      } catch (error: any) {
        const message = error?.message || "";
        if (!/page not found/i.test(message)) {
          throw error;
        }

        await recruiterApi.startSubscription({
          userId: currentUserId,
          planId: selectedPlan,
          paymentData: {
            paymentMethod: "trial",
            email,
            phoneNumber: phoneNumber || undefined,
          },
        });
      }

      let attempts = 0;
      const maxAttempts = 10;
      while (attempts < maxAttempts) {
        attempts += 1;
        const subscription = await recruiterApi.getSubscriptionStatus(currentUserId);
        const access = getSubscriptionAccess(subscription);

        if (access.isEligible) {
          toast({
            title: "1-Hour Free Trial Started!",
            description: "You can contact up to 2 drivers. Access ends in 1 hour.",
          });
          navigate("/drivers-job-board");
          return;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 500));
      }

      throw new Error("Trial was created but access is not active yet. Please try again.");
    } catch (error: any) {
      console.error('Trial error:', error);
      const msg = error.message || "Failed to start trial.";
      toast({
        title: "Trial Failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId || !selectedPlan) return;

    const plan = selectedPlanDetails;
    const user = auth.currentUser;
    if (!user) {
      navigate('/company-auth');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "mpesa") {
        let normalizedPhone = phoneNumber.replace(/\s+/g, "");
        if (!normalizedPhone) {
          toast({
            title: "Error",
            description: "Please enter your M-PESA phone number.",
            variant: "destructive",
          });
          return;
        }

        if (normalizedPhone.startsWith("+")) {
          normalizedPhone = normalizedPhone.slice(1);
        }

        if (normalizedPhone.startsWith("0")) {
          normalizedPhone = `254${normalizedPhone.slice(1)}`;
        } else if (/^[17]\d{8}$/.test(normalizedPhone)) {
          normalizedPhone = `254${normalizedPhone}`;
        }

        // Call your backend directly with plan info in accountRef
        const accountRef = `PLAN-${selectedPlan}-USER-${currentUserId}-${Date.now()}`;
        
        await recruiterApi.initiateMpesaPayment({
          phone: normalizedPhone,
          amount: plan?.price || 0,
          accountRef
        });

        toast({
          title: "M-PESA Prompt Sent",
          description: "Complete the payment on your phone. Waiting for confirmation...",
          duration: 5000,
        });

        // Poll your backend's subscription status instead of Supabase
        let attempts = 0;
        const maxAttempts = 60; // 3 minutes
        
        const checkPayment = setInterval(async () => {
          attempts++;
          try {
            const subscription = await recruiterApi.getSubscriptionStatus(currentUserId);
            
            if (subscription && subscription.status === 'active') {
              clearInterval(checkPayment);
              setLoading(false);
              toast({ 
                title: "Payment Confirmed!", 
                description: "Your subscription is now active. Redirecting..." 
              });
              setTimeout(() => navigate("/drivers-job-board"), 1500);
            } else if (subscription && (subscription.status === 'failed' || subscription.status === 'cancelled' || subscription.status === 'expired' || subscription.paymentStatus === 'failed')) {
              clearInterval(checkPayment);
              setLoading(false);
              const backendMessage = (subscription as any)?.message;
              toast({
                title: "Payment Failed",
                description: backendMessage || `Payment ${subscription.status}. Please try again.`,
                variant: "destructive",
                duration: 8000,
              });
            } else if (attempts >= maxAttempts) {
              clearInterval(checkPayment);
              setLoading(false);
              toast({
                title: "Payment Timeout",
                description: "Payment confirmation not received. Please check your M-PESA messages or contact support.",
                variant: "destructive",
                duration: 8000,
              });
            }
          } catch (error) {
            console.error('Error checking subscription:', error);
          }
        }, 3000);

      } else if (paymentMethod === "card") {
        const email = user.email;
        if (!email) throw new Error('User email not found');

        const paystackResponse = await paymentApi.initializePaystack({
          email,
          amount: plan?.price || 0,
          planId: selectedPlan,
          userId: currentUserId,
          callbackUrl: `${window.location.origin}/drivers-job-board`
        });

        if (paystackResponse.authorization_url) {
          localStorage.setItem('pendingPlanId', selectedPlan);
          window.location.href = paystackResponse.authorization_url;
        } else {
          throw new Error('Failed to get Paystack URL');
        }
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 pb-20 pt-32 md:pt-40">
        <div className="flex justify-end mb-6">
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg">
            Select a plan to access our verified driver database
          </p>
        </div>

        {plansLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all ${
                    selectedPlan === plan.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                  } ${plan.popular ? 'border-primary' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.duration}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        {plan.trialHours ? 'FREE TRIAL' : `KES ${plan.price}`}
                      </span>
                      {plan.trialHours && <p className="text-sm text-muted-foreground">1 hour free</p>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isFreeTrial ? (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Start Your 1-Hour Free Trial</CardTitle>
                  <CardDescription>
                    No payment required. Contact up to <strong>2 drivers</strong>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg mb-6">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{selectedPlanDetails?.name}</p>
                        <p className="text-sm text-muted-foreground">1 hour access</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">FREE</p>
                    </div>
                  </div>
                  <Button onClick={handleFreeTrial} className="w-full" size="lg" disabled={loading}>
                    {loading ? "Starting..." : `Start 1-Hour Free Trial`}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Access expires in 1 hour. Upgrade anytime.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Complete your payment to access the job board</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">{selectedPlanDetails?.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedPlanDetails?.duration}</p>
                        </div>
                        <p className="text-2xl font-bold">KES {selectedPlanDetails?.price}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="mpesa" id="mpesa" />
                          <Label htmlFor="mpesa" className="flex-1 cursor-pointer flex items-center gap-3">
                            <img src="/M-PESA_LOGO-01.svg.png" alt="M-PESA" className="h-8 w-auto" />
                            <span>M-PESA</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            Credit/Debit Card
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "mpesa" && (
                      <div className="space-y-2">
                        <Label htmlFor="phone">M-PESA Phone Number</Label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+254 700 000 000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          required
                        />
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <input
                            id="cardholderName"
                            type="text"
                            placeholder="John Doe"
                            value={cardDetails.cardholderName}
                            onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={cardDetails.cardNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, '');
                              const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                              setCardDetails({...cardDetails, cardNumber: formatted});
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <input
                              id="expiryDate"
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardDetails.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                setCardDetails({...cardDetails, expiryDate: value});
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <input
                              id="cvv"
                              type="text"
                              placeholder="123"
                              maxLength={4}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Processing..." : `Pay KES ${selectedPlanDetails?.price}`}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By proceeding, you agree to our <a href="https://www.trukafrica.com/terms" className="underline">Terms</a> and <a href="https://www.trukafrica.com/privacy" className="underline">Privacy Policy</a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
