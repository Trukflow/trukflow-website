import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Download = lazy(() => import("./pages/Download"));
const AgriTruk = lazy(() => import("./pages/AgriTruk"));
const CargoTruk = lazy(() => import("./pages/CargoTruk"));
const Brokers = lazy(() => import("./pages/Brokers"));
const TransporterEnlistment = lazy(() => import("./pages/DriverEnlistment"));
const CompanyAuth = lazy(() => import("./pages/CompanyAuth"));
const Payment = lazy(() => import("./pages/Payment"));
const HireDrivers = lazy(() => import("./pages/HireDrivers"));
const DriversJobBoard = lazy(() => import("./pages/DriversJobBoard"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const DeleteAccount = lazy(() => import("./pages/DeleteAccount"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
    Loading...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/download" element={<Download />} />
            <Route path="/agritruk" element={<AgriTruk />} />
            <Route path="/cargotruk" element={<CargoTruk />} />
            <Route path="/brokers" element={<Brokers />} />
            <Route path="/transporter-enlistment" element={<TransporterEnlistment />} />
            <Route path="/company-auth" element={<CompanyAuth />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/hire-drivers" element={<HireDrivers />} />
            <Route path="/drivers-job-board" element={<DriversJobBoard />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
