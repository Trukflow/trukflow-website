import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, Truck, Check } from "lucide-react";

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

const HireDrivers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzIuMiAwIDQtMS44IDQtNHMtMS44LTQtNC00LTQgMS44LTQgNCAxLjggNCA0IDR6bTAgMTJjMi4yIDAgNC0xLjggNC00cy0xLjgtNC00LTQtNCAxLjgtNCA0IDEuOCA0IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                🚛 Trusted by 500+ Companies
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
              Hire Trusted & Professional Drivers
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-semibold mb-8 animate-fade-in max-w-2xl mx-auto">
              Connect with verified, experienced drivers ready to power your logistics operations
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The most reliable way to find professional drivers for your business
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in group">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Verified Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Every driver undergoes comprehensive background checks, license verification, and reference validation
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in group">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Rated & Reviewed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Make informed decisions with transparent ratings and detailed reviews from previous employers
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in group">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Diverse Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Access drivers experienced with trucks, vans, lorries, pickups, and specialized vehicles
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-muted-foreground text-lg">
                Select a plan to access our verified driver database
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative transition-all hover:shadow-lg ${
                    plan.popular ? 'border-primary border-2' : ''
                  }`}
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
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => navigate("/company-auth")}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" onClick={() => navigate("/company-auth")} className="p-0 h-auto font-semibold">
                  Sign in here
                </Button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireDrivers;
