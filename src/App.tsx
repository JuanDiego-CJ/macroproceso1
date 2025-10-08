import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import Index from "./pages/Index";
import Article from "./pages/Article";
import LandingCampaign from "./pages/LandingCampaign";
import Step1 from "./pages/configurator/Step1";
import Step2 from "./pages/configurator/Step2";
import Step3 from "./pages/configurator/Step3";
import CreateAccount from "./pages/CreateAccount";
import Checkout from "./pages/Checkout";
import PaymentStatus from "./pages/PaymentStatus";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfiguratorProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articulo" element={<Article />} />
            <Route path="/campana" element={<LandingCampaign />} />
            <Route path="/configurar/paso-1" element={<Step1 />} />
            <Route path="/configurar/paso-2" element={<Step2 />} />
            <Route path="/configurar/paso-3" element={<Step3 />} />
            <Route path="/crear-cuenta" element={<CreateAccount />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pago/estado" element={<PaymentStatus />} />
            <Route path="/pago/exitoso" element={<PaymentSuccess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ConfiguratorProvider>
  </QueryClientProvider>
);

export default App;
