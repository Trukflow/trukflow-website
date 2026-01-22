import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { recruiterApi } from "@/services/recruiterApi";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().trim().email("Please enter a valid email address").max(255, "Email is too long");
const phoneSchema = z.string().trim()
  .regex(/^(\+?254|0)?[17]\d{8}$/, "Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)")
  .or(z.literal("")) // Allow empty phone
  .optional();

const CompanyAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const suppressAuthRedirectRef = useRef(false);

  // Check if already logged in and has active subscription
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (suppressAuthRedirectRef.current) {
          setCheckingAuth(false);
          return;
        }

        const postSignup = sessionStorage.getItem('postSignup');
        if (postSignup) {
          sessionStorage.removeItem('postSignup');
          localStorage.removeItem('authToken');
          await signOut(auth);
          setCheckingAuth(false);
          return;
        }

        const token = await user.getIdToken();
        localStorage.setItem('authToken', token);
        
        // Check subscription status before redirecting (external backend is source of truth)
        try {
          const subscriptionData = await recruiterApi.getSubscriptionStatus(user.uid);
          const now = new Date();
          const endDate = new Date(subscriptionData.endDate);
          const isActive = subscriptionData.status === 'active' ||
            (subscriptionData.status === 'trial' && endDate > now);

          if (isActive) {
            navigate("/drivers-job-board");
          } else {
            navigate("/payment");
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
          // On error, default to payment page
          navigate("/payment");
        }
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const validateEmail = (email: string): boolean => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone || phone.trim() === "") {
      setPhoneError(null);
      return true; // Phone is optional
    }
    
    // Clean phone number - remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, "");
    const result = phoneSchema.safeParse(cleanPhone);
    if (!result.success) {
      setPhoneError(result.error.errors[0].message);
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    suppressAuthRedirectRef.current = true;
    
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the Terms & Conditions and Privacy Policy to continue.",
        variant: "destructive",
      });
      suppressAuthRedirectRef.current = false;
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("signup-email") as string).trim();
    const password = formData.get("signup-password") as string;
    const companyName = formData.get("company-name") as string;
    const phone = (formData.get("phone") as string || "").trim();

    // Validate fields
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    if (!isEmailValid || !isPhoneValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      suppressAuthRedirectRef.current = false;
      return;
    }
    
    setLoading(true);

    try {
      // Register with external backend (source of truth)
      const registrationPayload = {
        name: companyName,
        email,
        password,
        phone: phone || "",
        role: "recruiter" // Explicitly set role
      };

      try {
        const backendResponse = await recruiterApi.register(registrationPayload);
        console.log('Successfully registered with external backend:', backendResponse);
      } catch (backendError: any) {
        console.error('Backend registration failed:', backendError);
        toast({
          title: "Signup Failed",
          description: backendError.message || "Backend registration failed. Please try again.",
          variant: "destructive",
        });
        suppressAuthRedirectRef.current = false;
        return;
      }

      toast({
        title: "Account Created!",
        description: "Please sign in to continue.",
      });

      sessionStorage.setItem('postSignup', '1');
      suppressAuthRedirectRef.current = false;
      navigate("/company-auth");
    } catch (error: any) {
      suppressAuthRedirectRef.current = false;
      toast({
        title: "Sign up failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("login-email") as string;
    const password = formData.get("login-password") as string;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);

      try {
        await recruiterApi.login({ email, password }, token);
      } catch (backendError: any) {
        console.error('Backend login failed:', backendError);
        localStorage.removeItem('authToken');
        await signOut(auth);
        toast({
          title: "Login failed",
          description: backendError.message || "Backend account not found. Please sign up again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login successful",
        description: "Redirecting to job board...",
      });

      navigate("/drivers-job-board");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth status
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking account status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Employer Access</CardTitle>
              <CardDescription>
                Sign in or create an account to access the Drivers Job Board
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        name="login-email"
                        type="email"
                        placeholder="company@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="login-password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Individual/Organization Name</Label>
                      <Input
                        id="company-name"
                        name="company-name"
                        type="text"
                        placeholder="Your Name or Organization"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        name="signup-email"
                        type="email"
                        placeholder="company@example.com"
                        required
                        onChange={(e) => validateEmail(e.target.value)}
                        className={emailError ? "border-destructive" : ""}
                      />
                      {emailError && (
                        <p className="text-sm text-destructive">{emailError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+254712345678"
                        onChange={(e) => validatePhone(e.target.value)}
                        className={phoneError ? "border-destructive" : ""}
                      />
                      {phoneError && (
                        <p className="text-sm text-destructive">{phoneError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="signup-password"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the{' '}
                        <a href="/terms-conditions" target="_blank" className="text-primary hover:underline">
                          Terms & Conditions
                        </a>
                        {' '}and{' '}
                        <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Payment required to access the job board after registration
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuth;
