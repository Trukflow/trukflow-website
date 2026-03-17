import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, Truck, Check } from "lucide-react";
import { recruiterApi } from "@/services/recruiterApi";
import { useToast } from "@/hooks/use-toast";
import LoadingSkeleton from "@/components/LoadingSkeleton";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const HireDrivers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

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
            ...(plan.features.featuredListings ? ["Featured listing on TRUKFLOW site"] : []),
            `${plan.features.supportLevel} support`
          ],
          popular: plan.isPopular
        }));
        setPricingPlans(plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Error",
          description: "Failed to load pricing plans. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground pt-40 pb-24 md:pt-44 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzIuMiAwIDQtMS44IDQtNHMtMS44LTQtNC00LTQgMS44LTQgNCAxLjggNCA0IDR6bTAgMTJjMi4yIDAgNC0xLjggNC00cy0xLjgtNC00LTQtNCAxLjgtNCA0IDEuOCA0IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-fade-in">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                🚛 Trusted by 500+ Companies
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
              Hire <span className="text-[hsl(var(--red))]">Trusted</span> & <span className="text-[hsl(var(--red))]">Professional</span> Drivers
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
              <p className="text-lg max-w-2xl mx-auto text-[hsl(var(--red))]">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE4YzIuMiAwIDQtMS44IDQtNHMtMS44LTQtNC00LTQgMS44LTQgNCAxLjggNCA0IDR6bTAgMTJjMi4yIDAgNC0xLjggNC00cy0xLjgtNC00LTQtNCAxLjgtNCA0IDEuOCA0IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Register to Hire Drivers
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
              Join hundreds of companies already using our platform to find reliable, verified drivers for their logistics needs
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 animate-fade-in hover:scale-105 transition-transform"
              onClick={() => navigate("/company-auth")}
            >
              Get Started Now
            </Button>
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

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={plan.id}
                  className={`relative transition-all hover:shadow-xl hover:-translate-y-1 ${
                    plan.popular 
                      ? 'border-[hsl(var(--emerald))] border-2 bg-gradient-to-br from-[hsl(var(--emerald))]/5 to-white shadow-lg' 
                      : index === 0 
                      ? 'border-[hsl(var(--red))]/20 hover:border-[hsl(var(--red))]/40'
                      : 'border-border hover:border-[hsl(var(--emerald))]/40'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[hsl(var(--emerald))] to-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className={`text-2xl ${plan.popular ? 'text-[hsl(var(--emerald))]' : ''}`}>
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="font-medium">{plan.duration}</CardDescription>
                    <div className="mt-4">
                      <span className={`text-4xl font-bold ${
                        plan.popular 
                          ? 'text-[hsl(var(--emerald))]' 
                          : index === 0 
                          ? 'text-[hsl(var(--red))]'
                          : 'text-foreground'
                      }`}>
                        KES {plan.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className={`h-5 w-5 shrink-0 mt-0.5 ${
                            plan.popular 
                              ? 'text-[hsl(var(--emerald))]' 
                              : index === 0 
                              ? 'text-[hsl(var(--red))]'
                              : 'text-foreground'
                          }`} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-[hsl(var(--emerald))] to-emerald-600 hover:from-emerald-600 hover:to-[hsl(var(--emerald))] text-white shadow-md hover:shadow-lg' 
                          : index === 0
                          ? 'bg-[hsl(var(--red))] hover:bg-[hsl(var(--red))]/90 text-white'
                          : ''
                      }`}
                      size="lg"
                      onClick={() => navigate("/company-auth")}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
              </div>
            )}

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
