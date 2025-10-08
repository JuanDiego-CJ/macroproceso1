import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ConfigSummary } from '@/components/ConfigSummary';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { CreditCard, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, getTotalInitial } = useConfigurator();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state.selectedTemplate || !state.userEmail) {
    navigate('/configurar/paso-1');
    return null;
  }

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate Stripe checkout redirect
    toast({
      title: 'Redirigiendo a Stripe...',
      description: 'Procesando tu pago de forma segura',
    });

    setTimeout(() => {
      navigate('/pago/estado?status=processing');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Finalizar Compra</h1>
          <p className="text-muted-foreground">
            Revisa tu orden y procede con el pago seguro
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Información de Pago</h2>

              <div className="space-y-6">
                <div className="bg-secondary/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Pago Seguro con Stripe</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tus datos de pago están protegidos con encriptación de nivel bancario
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Certificado SSL · PCI DSS Compliant</span>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Detalles del cliente</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{state.userEmail}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    'Procesando...'
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pagar ${getTotalInitial().toLocaleString()} con Stripe
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Al hacer clic en "Pagar", serás redirigido a la pasarela segura de Stripe
                </p>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <ConfigSummary compact />

            <Card className="p-4 mt-6 bg-success/5 border-success/20">
              <p className="text-sm text-muted-foreground">
                ✓ Pago único inicial: ${getTotalInitial().toLocaleString()}
                <br />✓ Luego ${state.selectedTemplate.monthlyPrice}/mes
                <br />✓ Cancela cuando quieras
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
