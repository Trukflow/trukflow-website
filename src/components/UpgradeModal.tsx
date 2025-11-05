import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  maxContacts?: string;
}

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plans: PricingPlan[];
  reason?: "trial_expired" | "limit_reached";
}

const UpgradeModal = ({ open, onOpenChange, plans, reason = "trial_expired" }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = (planId: string) => {
    navigate('/payment');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            {reason === "trial_expired" ? "Your Free Trial Has Expired" : "Upgrade to Continue"}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {reason === "trial_expired" 
              ? "Upgrade now to continue accessing our verified driver database"
              : "You've reached your contact limit. Upgrade to contact more drivers"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan, index) => {
            const icon = index === 0 ? Zap : index === 1 ? Crown : Star;
            const Icon = icon;
            
            return (
              <Card
                key={plan.id}
                className={`relative transition-all hover:shadow-xl ${
                  plan.popular ? 'border-primary border-2 scale-105' : 'hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.duration}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">KES {plan.price}</span>
                    <span className="text-muted-foreground text-sm">/{plan.duration}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.popular ? "Upgrade Now" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            All plans include access to verified driver profiles, secure payment processing, and premium support.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
