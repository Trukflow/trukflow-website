import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, LogOut, Shield, Star, Phone, Mail, Truck } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  image_url: string;
  gender: string;
  license_class: string;
  vehicle_type: string;
  region: string;
  rating: number;
  experience_years: number;
  phone: string;
  email: string;
  available: boolean;
  documents_verified: boolean;
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

  useEffect(() => {
    checkAuthAndVerification();
  }, []);

  useEffect(() => {
    filterDrivers();
  }, [drivers, searchTerm, genderFilter, licenseFilter, vehicleFilter, regionFilter]);

  const checkAuthAndVerification = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);

    // Check if company is verified (paid)
    const { data: company, error } = await supabase
      .from("companies")
      .select("verified")
      .eq("user_id", session.user.id)
      .single();

    if (error || !company?.verified) {
      setVerified(false);
      setLoading(false);
      return;
    }

    setVerified(true);
    fetchDrivers();
  };

  const fetchDrivers = async () => {
    try {
      // This endpoint will be provided by the user
      const response = await fetch('/api/job-seekers/approved');
      const data = await response.json();
      setDrivers(data);
      setFilteredDrivers(data);
    } catch (error) {
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
      filtered = filtered.filter(driver => driver.license_class === licenseFilter);
    }

    if (vehicleFilter !== "all") {
      filtered = filtered.filter(driver => driver.vehicle_type === vehicleFilter);
    }

    if (regionFilter !== "all") {
      filtered = filtered.filter(driver => driver.region === regionFilter);
    }

    setFilteredDrivers(filtered);
  };

  const handleHireDriver = (driver: Driver) => {
    if (!isAuthenticated || !verified) {
      navigate("/company-auth");
      return;
    }
    
    toast({
      title: "Contact Request Sent",
      description: `Your request to hire ${driver.name} has been submitted. We'll notify you shortly.`,
    });
    // TODO: Implement hire/contact functionality with email notifications
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/company-auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg animate-pulse mb-8" />
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
            <p className="text-xl md:text-2xl text-red-500 font-semibold mb-8 animate-fade-in max-w-2xl mx-auto">
              Connect with verified, experienced drivers ready to power your logistics operations
            </p>
            {isAuthenticated && verified && (
              <Button onClick={handleLogout} variant="secondary" className="gap-2 animate-scale-in">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
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
              <p className="text-red-500 text-lg max-w-2xl mx-auto font-semibold">
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

      {/* Driver Cards Section - Only show if verified */}
      {isAuthenticated && verified && (
        <>
          {/* Filter Section - Only for authenticated users */}
          <section className="py-8 bg-muted/30 border-y">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-red-500">Filter & Search Drivers</h2>
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

          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-red-500">Available Drivers ({filteredDrivers.length})</h2>
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
                              <p className="font-semibold">Class {driver.license_class}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Phone className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Vehicle</p>
                              <p className="font-semibold capitalize">{driver.vehicle_type}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{driver.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{driver.email}</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full group-hover:scale-105 transition-transform" 
                          onClick={() => handleHireDriver(driver)}
                          disabled={!driver.available}
                        >
                          {driver.available ? "Contact Driver" : "Not Available"}
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
        </>
      )}

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzIuMiAwIDQtMS44IDQtNHMtMS44LTQtNC00LTQgMS44LTQgNCAxLjggNCA0IDR6bTAgMTJjMi4yIDAgNC0xLjggNC00cy0xLjgtNC00LTQtNCAxLjgtNCA0IDEuOCA0IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm font-semibold px-4 py-2 animate-fade-in">
              ⚡ Limited Time Offer
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Register as a Company to <br className="hidden md:block" />Hire Professional Drivers
            </h2>
            <p className="text-xl opacity-95 mb-12 max-w-2xl mx-auto animate-fade-in">
              Get unlimited access to our verified drivers database and streamline your hiring process
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-12">
              <Card className="bg-background/95 backdrop-blur text-foreground p-8 max-w-sm hover:scale-105 transition-transform duration-300 hover:shadow-2xl animate-scale-in border-2">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">💎</span>
                  </div>
                  <CardTitle className="text-2xl">One-Time Payment</CardTitle>
                  <CardDescription className="text-base">Perfect for growing businesses</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="mb-6">
                    <p className="text-5xl font-bold mb-2 text-primary">Ksh 1,999</p>
                    <p className="text-muted-foreground font-medium">Lifetime Access</p>
                  </div>
                  <ul className="space-y-3 text-left text-sm">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Unlimited driver searches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary" />
                      <span>No hidden fees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white text-foreground p-8 max-w-sm hover:scale-105 transition-transform duration-300 hover:shadow-2xl animate-scale-in border-2 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
                  <CardDescription className="text-base">Flexible for all businesses</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="mb-6">
                    <p className="text-5xl font-bold mb-2 text-primary">Ksh 499</p>
                    <p className="text-muted-foreground font-medium">Per Month</p>
                  </div>
                  <ul className="space-y-3 text-left text-sm">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Full database access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span>Cancel anytime</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary" />
                      <span>Monthly updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform shadow-2xl animate-scale-in"
              onClick={() => navigate("/company-auth")}
            >
              Get Started Now →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriversJobBoard;
