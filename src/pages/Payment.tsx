import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/Navbar";
import { Check } from "lucide-react";
import { paymentApi } from "@/services/paymentApi";
import { recruiterApi } from "@/services/recruiterApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
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
    // Get current user from Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        navigate('/company-auth');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await recruiterApi.getPlans();
        const plans = response.plans.map(plan => ({
          id: plan.planId,
          name: plan.name,
          price: plan.price,
          duration: `${plan.duration} days`,
          features: [
            `${plan.features.accessDuration} access`,
            `Contact up to ${plan.features.maxDriverContacts} drivers`,
            `Up to ${plan.features.maxActiveJobPosts} active job posts`,
            plan.features.driverProfileViewing ? "Unlimited driver profile viewing" : "Limited driver viewing",
            plan.features.documentsAccess ? "Access to verified documents" : "Basic document access",
            ...(plan.features.featuredListings ? ["Featured listing on TRUK site"] : []),
            `${plan.features.supportLevel} support`
          ],
          popular: plan.isPopular
        }));
        setPricingPlans(plans);
        // Set default selected plan to the popular one or first plan
        const defaultPlan = plans.find(p => p.popular) || plans[0];
        if (defaultPlan) {
          setSelectedPlan(defaultPlan.id);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Error",
          description: "Failed to load pricing plans. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const plan = pricingPlans.find(p => p.id === selectedPlan);
    const user = auth.currentUser;

    if (!user || !currentUserId) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete payment.",
        variant: "destructive",
      });
      navigate('/company-auth');
      return;
    }

    try {
      if (paymentMethod === "mpesa") {
        // M-PESA payment flow (backend handles webhook)
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agritruk.onrender.com';
        const response = await fetch(`${API_BASE_URL}/api/payments/mpesa`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await user.getIdToken()}`
          },
          body: JSON.stringify({
            plan: selectedPlan,
            amount: plan?.price,
            phoneNumber: phoneNumber,
            planName: plan?.name,
            duration: plan?.duration,
            userId: currentUserId,
          })
        });

        if (!response.ok) {
          throw new Error('Payment request failed');
        }

        const data = await response.json();
        
        toast({
          title: "Payment Initiated",
          description: "Please complete the payment on your phone. Check your M-PESA for the prompt.",
        });

        // Poll for payment verification
        let attempts = 0;
        const maxAttempts = 60; // 3 minutes (60 * 3 seconds)
        
        const checkPayment = setInterval(async () => {
          attempts++;
          
          try {
            const hasActiveSubscription = await paymentApi.hasActiveSubscription(currentUserId);
            
            if (hasActiveSubscription) {
              clearInterval(checkPayment);
              setLoading(false);
              toast({
                title: "Payment Successful!",
                description: "Redirecting to the job board...",
              });
              
              setTimeout(() => {
                navigate("/drivers-job-board");
              }, 1500);
            }
          } catch (error) {
            console.error('Error checking payment:', error);
          }
          
          if (attempts >= maxAttempts) {
            clearInterval(checkPayment);
            setLoading(false);
            toast({
              title: "Payment Timeout",
              description: "Please contact support if you completed the payment.",
              variant: "destructive",
            });
          }
        }, 3000);

      } else if (paymentMethod === "card") {
        // Paystack payment initialization
        const email = user.email;
        if (!email) {
          throw new Error('User email not found');
        }

        const paystackResponse = await paymentApi.initializePaystack({
          email,
          amount: plan?.price || 0,
          planId: selectedPlan,
          userId: currentUserId,
          callbackUrl: `${window.location.origin}/drivers-job-board`
        });

        // Redirect to Paystack payment page
        if (paystackResponse.authorization_url) {
          window.location.href = paystackResponse.authorization_url;
        } else {
          throw new Error('Failed to get payment URL');
        }
      }

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const selectedPlanDetails = pricingPlans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-muted-foreground text-lg">
              Select a plan to access our verified driver database
            </p>
          </div>

          {/* Pricing Plans */}
          {plansLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
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
                    <span className="text-4xl font-bold">KES {plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
            </div>
          )}

          {/* Payment Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Complete your payment to access the job board
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Selected Plan Summary */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{selectedPlanDetails?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedPlanDetails?.duration}</p>
                    </div>
                    <p className="text-2xl font-bold">KES {selectedPlanDetails?.price}</p>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <img 
                            src="/M-PESA_LOGO-01.svg.png" 
                            alt="M-PESA" 
                            className="h-8 w-auto"
                          />
                          <span>M-PESA</span>
                        </div>
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

                {/* Phone Number for M-PESA */}
                {paymentMethod === "mpesa" && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-PESA Phone Number</Label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+254 700 000000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                )}

                {/* Card Details */}
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
                        className="w-full px-4 py-2 border rounded-md"
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
                        className="w-full px-4 py-2 border rounded-md"
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
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setCardDetails({...cardDetails, expiryDate: value});
                          }}
                          className="w-full px-4 py-2 border rounded-md"
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
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setCardDetails({...cardDetails, cvv: value});
                          }}
                          className="w-full px-4 py-2 border rounded-md"
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
                  By proceeding, you agree to our terms of service and payment policy
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
