import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Smartcold = lazy(() => import("./pages/Smartcold"));
const Chukua = lazy(() => import("./pages/Chukua"));
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
  <div className="flex min-h-screen items-center justify-center bg-ink-950 text-ink-300">
    Loading...
  </div>
);

const SmartdropRedirect = () => {
  useEffect(() => {
    window.location.replace("https://smartdrop.africa");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 text-ink-300">
      Redirecting to Smartdrop...
    </div>
  );
};

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
            <Route path="/smartcold" element={<Smartcold />} />
            <Route path="/chukua" element={<Chukua />} />
            <Route path="/smartdrop" element={<SmartdropRedirect />} />
            <Route path="/company-auth" element={<CompanyAuth />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/hire-drivers" element={<HireDrivers />} />
            <Route path="/drivers-job-board" element={<DriversJobBoard />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            {/* Retired TRUK app pages */}
            <Route path="/agritruk" element={<Navigate to="/chukua" replace />} />
            <Route path="/cargotruk" element={<Navigate to="/chukua" replace />} />
            <Route path="/brokers" element={<Navigate to="/chukua#transporters" replace />} />
            <Route path="/transporter-enlistment" element={<Navigate to="/chukua#transporters" replace />} />
            <Route path="/download" element={<Navigate to="/" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
