import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Trash2, AlertTriangle, ArrowLeft, Shield } from "lucide-react";
import { recruiterApi } from "@/services/recruiterApi";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email || "");
        setEmail(user.email || "");
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (confirmText !== "DELETE") {
      toast({
        title: "Confirmation Required",
        description: "Please type DELETE to confirm your request.",
        variant: "destructive",
      });
      return;
    }

    if (!acknowledged) {
      toast({
        title: "Acknowledgment Required",
        description: "Please acknowledge that you understand this action is irreversible.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // If user is logged in, use their UID
      const uid = auth.currentUser?.uid;
      
      await recruiterApi.requestAccountDeletion(email, uid);

      toast({
        title: "Request Submitted",
        description: "Your account deletion request has been submitted. You will receive an email confirmation within 24-48 hours.",
      });

      // Sign out if logged in
      if (auth.currentUser) {
        await auth.signOut();
      }

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Request Failed",
        description: error.message || "Failed to submit deletion request. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <img
            src="/TRUK Logo3.png"
            alt="TRUK Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Warning Banner */}
          <Card className="mb-8 border-destructive/50 bg-destructive/5">
            <CardContent className="flex items-start gap-4 pt-6">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">
                  Warning: This action is permanent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Deleting your account will permanently remove all your data, including your profile, 
                  subscription history, job posts, and any saved information. This action cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Main Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Request Account Deletion</CardTitle>
              <CardDescription className="text-base mt-2">
                We're sorry to see you go. Please complete the form below to request the deletion of your TRUK account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeleteRequest} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Account Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggedIn}
                    required
                  />
                  {isLoggedIn && (
                    <p className="text-xs text-muted-foreground">
                      You're logged in as {userEmail}
                    </p>
                  )}
                </div>

                {/* Confirmation Text */}
                <div className="space-y-2">
                  <Label htmlFor="confirm">
                    Type <span className="font-bold text-destructive">DELETE</span> to confirm
                  </Label>
                  <Input
                    id="confirm"
                    type="text"
                    placeholder="Type DELETE"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    required
                  />
                </div>

                {/* Acknowledgment Checkbox */}
                <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Checkbox
                    id="acknowledge"
                    checked={acknowledged}
                    onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
                  />
                  <Label htmlFor="acknowledge" className="text-sm leading-relaxed cursor-pointer">
                    I understand that this will permanently delete my account and all associated data, 
                    including my profile, subscription history, and any content I have created. 
                    This action is irreversible.
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full"
                  disabled={loading || confirmText !== "DELETE" || !acknowledged || !email}
                >
                  {loading ? "Submitting Request..." : "Request Account Deletion"}
                </Button>
              </form>

              {/* Data Retention Info */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">What happens to your data?</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Your account will be deactivated immediately</li>
                      <li>• All personal data will be deleted within 30 days</li>
                      <li>• Transaction records may be retained for legal compliance (up to 7 years)</li>
                      <li>• You will receive a confirmation email once deletion is complete</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Having trouble? Contact us at{" "}
                  <a
                    href="mailto:support@trukafrica.com"
                    className="text-primary hover:underline font-medium"
                  >
                    support@trukafrica.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              TRUK Ltd • East Africa's Smartest Logistics Platform
            </p>
            <p className="mt-2">
              <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
              {" • "}
              <a href="/terms-conditions" className="hover:underline">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeleteAccount;
