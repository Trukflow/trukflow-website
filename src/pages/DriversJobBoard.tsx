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
import { Search, LogOut, Shield, Star, Phone, Mail, Truck, Crown } from "lucide-react";
import { paymentApi } from "@/services/paymentApi";
import { recruiterApi } from "@/services/recruiterApi";

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

  useEffect(() => {
    checkAuthAndVerification();
  }, []);

  useEffect(() => {
    filterDrivers();
  }, [drivers, searchTerm, genderFilter, licenseFilter, vehicleFilter, regionFilter]);

  const checkAuthAndVerification = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Refresh token and store it
      const token = await user.getIdToken(true);
      localStorage.setItem('authToken', token);

      setIsAuthenticated(true);
      setCurrentUserId(user.uid);

      // Load contacted drivers from localStorage
      const storedContacted = localStorage.getItem(`contacted_drivers_${user.uid}`);
      if (storedContacted) {
        setContactedDrivers(new Set(JSON.parse(storedContacted)));
      }

      try {
        const hasActiveSubscription = await paymentApi.hasActiveSubscription(user.uid);
        setVerified(hasActiveSubscription);
        
        if (!hasActiveSubscription) {
          toast({
            title: "Subscription Required",
            description: "Please complete payment to access the driver job board.",
            variant: "destructive",
          });
          setLoading(false);
          navigate('/payment');
          return;
        }

        // Fetch user's subscription plan details
        await fetchUserPlan();
        fetchDrivers();
      } catch (error) {
        console.error('Error checking subscription:', error);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to verify subscription status.",
          variant: "destructive",
        });
      }
    });
  };

  const fetchUserPlan = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const subscriptionStatus = await recruiterApi.getSubscriptionStatus(user.uid);
      
      if (subscriptionStatus?.planId) {
        const plan = await recruiterApi.getPlan(subscriptionStatus.planId);
        
        if (plan?.features) {
          setPlanFeatures({
            maxDriverContacts: plan.features.maxDriverContacts,
            accessDuration: plan.features.accessDuration
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user plan:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token available');
      }

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agritruk.onrender.com';
      const response = await fetch(`${API_BASE_URL}/api/job-seekers/approved`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('Backend error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch drivers');
      }
      const apiData = await response.json();
      
      // Map API data to our Driver interface
      const mappedDrivers: Driver[] = apiData.map((jobSeeker: any) => ({
        id: jobSeeker.jobSeekerId,
        name: `${jobSeeker.firstName} ${jobSeeker.lastName}`,
        image_url: jobSeeker.profilePhoto || "/placeholder.svg",
        gender: jobSeeker.gender,
        license_class: jobSeeker.documents?.drivingLicense?.vehicleClasses || [],
        vehicle_type: jobSeeker.experience?.vehicleClassesExperience || [],
        region: jobSeeker.address?.county || jobSeeker.address?.city || "Unknown",
        rating: jobSeeker.performance?.platformRating || 0,
        experience_years: jobSeeker.experience?.experienceYears || 0,
        phone: jobSeeker.phone,
        email: jobSeeker.email,
        available: jobSeeker.employmentStatus === "unemployed" || jobSeeker.employmentStatus === "seeking",
        documents_verified: jobSeeker.documents?.drivingLicense?.status === "approved" && 
                           jobSeeker.documents?.goodConductCert?.status === "approved",
        age: jobSeeker.age,
        employment_status: jobSeeker.employmentStatus
      }));
      
      setDrivers(mappedDrivers);
      setFilteredDrivers(mappedDrivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast({
        title: "Error",
        description: "Failed to load drivers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDrivers = () => {
    let filtered = [...drivers];

    if (searchTerm) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genderFilter !== "all") {
      filtered = filtered.filter(driver => driver.gender === genderFilter);
    }

    if (licenseFilter !== "all") {
      filtered = filtered.filter(driver => driver.license_class.includes(licenseFilter));
    }

    if (vehicleFilter !== "all") {
      filtered = filtered.filter(driver => 
        driver.vehicle_type.some(v => v.toLowerCase().includes(vehicleFilter.toLowerCase()))
      );
    }

    if (regionFilter !== "all") {
      filtered = filtered.filter(driver => driver.region === regionFilter);
    }

    setFilteredDrivers(filtered);
  };

  const handleContactDriver = async (driver: Driver) => {
    if (!isAuthenticated || !verified) {
      navigate("/company-auth");
      return;
    }

    // Check if already contacted
    if (contactedDrivers.has(driver.id)) {
      await viewDriverDetails(driver.id);
      return;
    }

    // Check contact limit
    if (planFeatures) {
      const maxContacts = planFeatures.maxDriverContacts === 'unlimited'
        ? Infinity 
        : parseInt(planFeatures.maxDriverContacts) || 0;

      if (contactedDrivers.size >= maxContacts) {
        toast({
          title: "Contact Limit Reached",
          description: "Choose a higher subscription plan to contact more drivers.",
          variant: "destructive",
        });
        setTimeout(() => navigate('/payment'), 2000);
        return;
      }
    }

    // Fetch driver details
    await viewDriverDetails(driver.id);

    // Mark as contacted
    const newContacted = new Set(contactedDrivers);
    newContacted.add(driver.id);
    setContactedDrivers(newContacted);
    localStorage.setItem(`contacted_drivers_${currentUserId}`, JSON.stringify([...newContacted]));

    toast({
      title: "Contact Information Unlocked",
      description: `You can now contact ${driver.name}. Contact details are visible.`,
    });
  };

  const viewDriverDetails = async (driverId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agritruk.onrender.com';
      const response = await fetch(`${API_BASE_URL}/api/recruiter/${driverId}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch driver details');
      }

      const driverDetails = await response.json();
      console.log('Driver details:', driverDetails);
    } catch (error) {
      console.error('Error fetching driver details:', error);
      toast({
        title: "Error",
        description: "Failed to load driver details.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('authToken');
    navigate("/company-auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg animate-pulse mb-8" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    navigate("/company-auth");
    return null;
  }

  // TEMPORARY: Bypass payment redirect for testing
  // Redirect to payment if not verified
  // if (!verified) {
  //   navigate("/payment");
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
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
                <Input
                  placeholder="Search by name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="License Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Licenses</SelectItem>
                  <SelectItem value="A">Class A</SelectItem>
                  <SelectItem value="B">Class B</SelectItem>
                  <SelectItem value="C">Class C</SelectItem>
                  <SelectItem value="D">Class D</SelectItem>
                </SelectContent>
              </Select>

              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
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

      {/* Driver Cards Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Available Drivers ({filteredDrivers.length})</h2>
              <Badge variant="outline" className="text-base px-4 py-2">
                🟢 {filteredDrivers.filter(d => d.available).length} Online Now
              </Badge>
            </div>
            
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDrivers.map((driver, index) => (
                    <Card 
                      key={driver.id} 
                      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 overflow-hidden animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img 
                          src={driver.image_url || "/placeholder.svg"} 
                          alt={driver.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          {driver.documents_verified && (
                            <Badge variant="default" className="gap-1 shadow-lg">
                              <Shield className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                          <Badge 
                            variant={driver.available ? "default" : "secondary"}
                            className={driver.available ? "bg-green-500 shadow-lg" : ""}
                          >
                            {driver.available ? "🟢 Available" : "Busy"}
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
                                {driver.license_class.length > 0 
                                  ? driver.license_class.join(", ") 
                                  : "N/A"}
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
                                {driver.vehicle_type.length > 0 
                                  ? driver.vehicle_type.slice(0, 2).join(", ")
                                  : "General"}
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

                        <Button 
                          className="w-full group-hover:scale-105 transition-transform" 
                          onClick={() => handleContactDriver(driver)}
                          disabled={!driver.available}
                        >
                          {!driver.available 
                            ? "Not Available" 
                            : contactedDrivers.has(driver.id)
                            ? "View Contact Info"
                            : "Unlock Contact"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
            </div>

            {filteredDrivers.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Drivers Found</h3>
                <p className="text-muted-foreground text-lg">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriversJobBoard;
