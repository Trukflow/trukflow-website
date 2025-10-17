import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    id: "24hour",
    name: "24-Hour Access",
    price: 499,
    duration: "24 hours",
    features: [
      "Full access to driver profiles & documents for 24 hours",
      "Contact up to 5 drivers",
      "1 active job post",
      "Basic support"
    ]
  },
  {
    id: "1week",
    name: "1-Week Access",
    price: 1499,
    duration: "7 days",
    features: [
      "7 days full access",
      "Unlimited driver profile viewing",
      "Contact up to 20 drivers",
      "Up to 3 active job posts",
      "Priority support"
    ],
    popular: true
  },
  {
    id: "1month",
    name: "1-Month Access",
    price: 2999,
    duration: "30 days",
    features: [
      "30 days full access",
      "Unlimited driver viewing & contacts",
      "Unlimited job postings",
      "Featured listing on TRUK site",
      "Dedicated account assistance",
      "Access to verified documents"
    ]
  }
];

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("1week");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Get selected plan details
    const plan = pricingPlans.find(p => p.id === selectedPlan);

    // Here you would integrate with your payment API (M-PESA, etc.)
    // For now, we'll simulate the payment process
    console.log("Processing payment:", {
      plan: selectedPlan,
      amount: plan?.price,
      method: paymentMethod,
      phone: phoneNumber
    });

    try {
      // TODO: Replace with actual API call to your payment endpoint
      // const response = await fetch('YOUR_PAYMENT_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     plan: selectedPlan,
      //     amount: plan?.price,
      //     paymentMethod,
      //     phoneNumber
      //   })
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Payment Initiated",
        description: `Please complete the payment on your ${paymentMethod === 'mpesa' ? 'M-PESA' : 'phone'}. Check your phone for the prompt.`,
      });

      // Simulate successful payment after a delay
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: "Redirecting to the job board...",
        });
        
        // Redirect to job board after successful payment
        setTimeout(() => {
          navigate("/drivers-job-board");
        }, 1500);
      }, 3000);

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
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
