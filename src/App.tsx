
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Download from "./pages/Download";
import AgriTruk from "./pages/AgriTruk";
import CargoTruk from "./pages/CargoTruk";
import Brokers from "./pages/Brokers";
import TransporterEnlistment from "./pages/DriverEnlistment";
import CompanyAuth from "./pages/CompanyAuth";
import Payment from "./pages/Payment";
import HireDrivers from "./pages/HireDrivers";
import DriversJobBoard from "./pages/DriversJobBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
