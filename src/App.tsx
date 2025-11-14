import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import { ChatProvider } from "@/contexts/ChatContext"; 
import Index from "./pages/Index";
import Article from "./pages/Article";
import LandingCampaign from "./pages/LandingCampaign";
import Step1 from "./pages/configurator/Step1";
import Step2 from "./pages/configurator/Step2";
import Step3 from "./pages/configurator/Step3";
import CreateAccount from "./pages/CreateAccount";
import Checkout from "./pages/Checkout";

// 🚨 COMPONENTES DEL FLUJO DE PAGO
// 1. La página con el spinner (la que llama a n8n). Componente interno: PaymentStatus
import PaymentStatus from "./pages/PaymentVerification"; 
// 2. La página final de éxito (el destino de la redirección de n8n).
import PaymentConfirmation from "./pages/PaymentSuccessFinal"; 
// 3. La página de fallo. ¡DEBES CREAR ESTE ARCHIVO!
import PaymentFailed from "./pages/PaymentFailed"; 

import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfiguratorProvider>
        <ChatProvider> 
          
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
                
                {/* RUTAS DEL FLUJO DE PAGO (AÑADIDAS) */}
                <Route path="/pago/exitoso" element={<PaymentStatus />} /> 
                <Route path="/pago/confirmado" element={<PaymentConfirmation />} /> 
                <Route path="/pago/fallido" element={<PaymentFailed />} />
                
                <Route path="/sign-in" element={<SignIn />} />
                
                {/* CATCH-ALL ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          
        </ChatProvider>
    </ConfiguratorProvider>
  </QueryClientProvider>
);

export default App;