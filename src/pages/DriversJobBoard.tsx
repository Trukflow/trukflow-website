// src/pages/DriversJobBoard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, LogOut, Shield, Star, Phone, Mail, Truck, Crown, Clock, AlertCircle } from "lucide-react";
import { recruiterApi } from "@/services/recruiterApi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UpgradeModal from "@/components/UpgradeModal";

interface Driver {
  id: string;
  name: string;
  image_url: string;
  gender: string;
  license_class: string[];
  vehicle_type: string[];
  region: string;
  rating: number;
  experience_years: number;
  phone: string;
  email: string;
  available: boolean;
  documents_verified: boolean;
  age: number;
  employment_status: string;
}

interface PlanFeatures {
  maxDriverContacts: string;
  accessDuration: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  maxContacts?: string;
}

const DriversJobBoard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [verified, setVerified] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [licenseFilter, setLicenseFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [contactedDrivers, setContactedDrivers] = useState<Set<string>>(new Set());
  const [planFeatures, setPlanFeatures] = useState<PlanFeatures | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [subscription, setSubscription] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [trialProgress, setTrialProgress] = useState<number>(100);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<"trial_expired" | "limit_reached">("trial_expired");
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndVerification();
    fetchPricingPlans();
  }, []);

  useEffect(() => {
    filterDrivers();
  }, [drivers, searchTerm, genderFilter, licenseFilter, vehicleFilter, regionFilter]);

  useEffect(() => {
    const pendingPlan = localStorage.getItem('pendingPlanId');
    if (pendingPlan) {
      localStorage.removeItem('pendingPlanId');
      checkAuthAndVerification();
    }
  }, []);

  useEffect(() => {
    if (!subscription?.endDate || subscription.paymentStatus !== 'trial') return;

    const totalDuration = 60 * 60 * 1000; // 1 hour in milliseconds
    
    const interval = setInterval(() => {
      const diff = new Date(subscription.endDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired");
        setTrialProgress(0);
        setUpgradeReason("trial_expired");
        setShowUpgradeModal(true);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
      
      // Calculate progress percentage (100% at start, 0% at end)
      const progress = (diff / totalDuration) * 100;
      setTrialProgress(Math.max(0, Math.min(100, progress)));
    }, 1000);

    return () => clearInterval(interval);
  }, [subscription?.endDate, navigate]);

  const fetchPricingPlans = async () => {
    try {
      const response = await recruiterApi.getPlans();
      const plans = response.plans
        .filter(plan => plan.price > 0) // Exclude free trial from upgrade modal
        .map(plan => ({
          id: plan.planId,
          name: plan.name,
          price: plan.price,
          duration: `${plan.duration} days`,
          maxContacts: plan.features.maxDriverContacts,
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
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const checkAuthAndVerification = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const token = await user.getIdToken(true);
      localStorage.setItem('authToken', token);

      setIsAuthenticated(true);
      setCurrentUserId(user.uid);

      const storedContacted = localStorage.getItem(`contacted_drivers_${user.uid}`);
      if (storedContacted) setContactedDrivers(new Set(JSON.parse(storedContacted)));

      try {
        // Fetch subscription from external backend (source of truth)
        const subscriptionData = await recruiterApi.getSubscriptionStatus(user.uid);
        if (!subscriptionData) {
          toast({ title: "No Active Subscription", description: "Please select a plan.", variant: "destructive" });
          navigate('/payment');
          return;
        }

        const now = new Date();
        const endDate = new Date(subscriptionData.endDate);
        const isActive = subscriptionData.status === 'active' ||
                        (subscriptionData.status === 'trial' && endDate > now);

        if (!isActive) {
          toast({ title: "Access Expired", description: "Start a new plan.", variant: "destructive" });
          navigate('/payment');
          return;
        }

        const planDetails = await recruiterApi.getPlan(subscriptionData.planId);

        // Format subscription data to match expected structure
        const subStatus = {
          isActive,
          planId: subscriptionData.planId,
          endDate: subscriptionData.endDate,
          paymentStatus: subscriptionData.status,
          contactsUsed: subscriptionData.currentUsage || 0,
          maxContacts: planDetails.features.maxDriverContacts
        };

        setSubscription(subStatus);
        setVerified(isActive);

        // Set plan features from subscription data
        setPlanFeatures({
          maxDriverContacts: planDetails.features.maxDriverContacts,
          accessDuration: planDetails.features.accessDuration
        });

        fetchDrivers();
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
        toast({ title: "Error", description: "Failed to verify access.", variant: "destructive" });
      }
    });
  };

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setApiError(null);
      const approvedDrivers = await recruiterApi.getApprovedDrivers();

      const mappedDrivers: Driver[] = approvedDrivers.map((d: any) => ({
        id: d.jobSeekerId,
        name: `${d.firstName} ${d.lastName}`,
        image_url: d.profilePhoto || "/placeholder.svg",
        gender: d.gender,
        license_class: d.documents.drivingLicense.vehicleClasses || [],
        vehicle_type: d.experience.vehicleClassesExperience || [],
        region: d.address.county || d.address.city || "Unknown",
        rating: d.performance.platformRating || 0,
        experience_years: d.experience.experienceYears || 0,
        phone: d.phone,
        email: d.email,
        available: d.employmentStatus === "unemployed" || d.employmentStatus === "seeking",
        documents_verified: 
          d.documents.drivingLicense.status === "approved" && 
          d.documents.goodConductCert.status === "approved",
        age: d.age,
        employment_status: d.employmentStatus
      }));

      setDrivers(mappedDrivers);
      setFilteredDrivers(mappedDrivers);
    } catch (error: any) {
      console.error('Error fetching drivers:', error);
      const errorMessage = error?.message || "Failed to load drivers. Please try again later.";
      setApiError(errorMessage);
      setDrivers([]);
      setFilteredDrivers([]);
      
      toast({ 
        title: "Error Loading Drivers", 
        description: errorMessage,
        variant: "destructive",
        duration: 6000
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDrivers = () => {
    let filtered = [...drivers];
    if (searchTerm) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (genderFilter !== "all") filtered = filtered.filter(d => d.gender === genderFilter);
    if (licenseFilter !== "all") filtered = filtered.filter(d => d.license_class.includes(licenseFilter));
    if (vehicleFilter !== "all") filtered = filtered.filter(d => d.vehicle_type.some(v => v.toLowerCase().includes(vehicleFilter.toLowerCase())));
    if (regionFilter !== "all") filtered = filtered.filter(d => d.region === regionFilter);
    setFilteredDrivers(filtered);
  };

  const handleContactDriver = async (driver: Driver) => {
    if (!isAuthenticated || !verified) {
      navigate("/company-auth");
      return;
    }

    if (contactedDrivers.has(driver.id)) {
      return;
    }

    if (planFeatures) {
      const maxContacts = planFeatures.maxDriverContacts === 'unlimited' ? Infinity : parseInt(planFeatures.maxDriverContacts) || 0;
      if (contactedDrivers.size >= maxContacts) {
        setUpgradeReason("limit_reached");
        setShowUpgradeModal(true);
        return;
      }
    }

    const newContacted = new Set(contactedDrivers).add(driver.id);
    setContactedDrivers(newContacted);
    localStorage.setItem(`contacted_drivers_${currentUserId}`, JSON.stringify(Array.from(newContacted)));

    window.open(`tel:${driver.phone}`, '_self');
    toast({ title: "Success", description: `Contact initiated with ${driver.name}` });
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('authToken');
    navigate("/company-auth");
  };

  if (loading) return <LoadingSkeleton />;

  if (!isAuthenticated) {
    navigate("/company-auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <UpgradeModal 
        open={showUpgradeModal} 
        onOpenChange={setShowUpgradeModal}
        plans={pricingPlans}
        reason={upgradeReason}
      />
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Driver Job Board</h1>
                <p className="text-primary-foreground/90">Browse and hire verified professional drivers</p>
                {planFeatures && (
                  <div className="mt-3 flex items-center gap-3">
                    <Badge variant="secondary" className="gap-1">
                      <Crown className="w-3 h-3" />
                      {planFeatures.accessDuration} access
                    </Badge>
                    <Badge variant="secondary">
                      {planFeatures.maxDriverContacts !== 'unlimited'
                        ? `${contactedDrivers.size}/${planFeatures.maxDriverContacts} contacts used`
                        : 'Unlimited contacts'}
                    </Badge>
                  </div>
                )}
              </div>
              <Button onClick={handleLogout} variant="secondary" className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            {subscription?.paymentStatus === 'trial' && (
              <Alert className="bg-primary-foreground text-primary border-none mt-4">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="ml-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Free Trial Time Remaining: {timeLeft}
                      </span>
                      <Badge variant="outline" className="border-primary">
                        {contactedDrivers.size}/2 contacts used
                      </Badge>
                    </div>
                    <Progress value={trialProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Your trial will expire soon. Upgrade to continue accessing drivers.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Filter & Search Drivers</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger><SelectValue placeholder="Region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="nairobi">Nairobi</SelectItem>
                  <SelectItem value="mombasa">Mombasa</SelectItem>
                  <SelectItem value="kisumu">Kisumu</SelectItem>
                  <SelectItem value="nakuru">Nakuru</SelectItem>
                  <SelectItem value="eldoret">Eldoret</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                <SelectTrigger><SelectValue placeholder="License Class" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Licenses</SelectItem>
                  <SelectItem value="A">Class A</SelectItem>
                  <SelectItem value="B">Class B</SelectItem>
                  <SelectItem value="C">Class C</SelectItem>
                  <SelectItem value="D">Class D</SelectItem>
                </SelectContent>
              </Select>
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger><SelectValue placeholder="Vehicle Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="lorry">Lorry</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Available Drivers ({filteredDrivers.length})</h2>
              <Badge variant="outline" className="text-base px-4 py-2">
                Online Now: {filteredDrivers.filter(d => d.available).length}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver, index) => (
                <Card key={driver.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img src={driver.image_url || "/placeholder.svg"} alt={driver.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {driver.documents_verified && (
                        <Badge variant="default" className="gap-1 shadow-lg">
                          <Shield className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                      <Badge variant={driver.available ? "default" : "secondary"} className={driver.available ? "bg-green-500 shadow-lg" : ""}>
                        {driver.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {driver.name}
                        </CardTitle>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{driver.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{driver.experience_years} years exp</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Truck className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">License</p>
                          <p className="font-semibold text-xs">
                            {driver.license_class.length > 0 ? driver.license_class.join(", ") : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Experience</p>
                          <p className="font-semibold text-xs capitalize">
                            {driver.vehicle_type.length > 0 ? driver.vehicle_type.slice(0, 2).join(", ") : "General"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t space-y-2 text-sm">
                      {contactedDrivers.has(driver.id) ? (
                        <>
                          <div className="flex items-center gap-2 text-foreground">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">{driver.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate font-medium">{driver.email}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span className="blur-sm select-none">+254 xxx xxx xxx</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="blur-sm select-none truncate">driver@email.com</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Button className="w-full group-hover:scale-105 transition-transform" onClick={() => handleContactDriver(driver)} disabled={!driver.available}>
                      {!driver.available ? "Not Available" : contactedDrivers.has(driver.id) ? "View Contact Info" : "Unlock Contact"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {apiError ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-destructive">Failed to Load Drivers</h3>
                <p className="text-muted-foreground text-lg mb-4">{apiError}</p>
                <Button onClick={fetchDrivers} variant="outline">
                  Retry
                </Button>
              </div>
            ) : filteredDrivers.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Drivers Found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your filters</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriversJobBoard;
