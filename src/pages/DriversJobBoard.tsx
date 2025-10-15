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
      navigate("/company-auth");
      return;
    }

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
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Access Restricted</CardTitle>
              <CardDescription>
                Payment is required to access the Drivers Job Board
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Please complete your payment to unlock access to our verified drivers database.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
                <Button>
                  Complete Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hire Trusted Transporters & Drivers
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Access our database of verified, professional drivers ready to work
            </p>
            <Button onClick={handleLogout} variant="secondary" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Filter by Region or Category</h2>
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Available Drivers ({filteredDrivers.length})</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => (
                <Card key={driver.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{driver.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{driver.rating.toFixed(1)}</span>
                          <span className="mx-2">•</span>
                          <span>{driver.experience_years} yrs exp</span>
                        </CardDescription>
                      </div>
                      {driver.documents_verified && (
                        <Badge variant="default" className="gap-1">
                          <Shield className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Truck className="w-4 h-4" />
                        <span>License: {driver.license_class} | {driver.vehicle_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{driver.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Badge variant={driver.available ? "default" : "secondary"}>
                        {driver.available ? "Available" : "Busy"}
                      </Badge>
                      <Badge variant="outline">{driver.gender}</Badge>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handleHireDriver(driver)}
                      disabled={!driver.available}
                    >
                      Contact Driver
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDrivers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No drivers match your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Register as a Company to Hire Drivers</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get unlimited access to our verified drivers database
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
            <Card className="bg-background text-foreground p-6 max-w-xs">
              <CardHeader>
                <CardTitle>One-Time Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-2">Ksh 1,999</p>
                <p className="text-muted-foreground">Lifetime access</p>
              </CardContent>
            </Card>
            <Card className="bg-background text-foreground p-6 max-w-xs">
              <CardHeader>
                <CardTitle>Monthly Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-2">Ksh 499</p>
                <p className="text-muted-foreground">Per month</p>
              </CardContent>
            </Card>
          </div>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/company-auth")}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DriversJobBoard;
