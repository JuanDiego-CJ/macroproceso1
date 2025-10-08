import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');

  useEffect(() => {
    const statusParam = searchParams.get('status');

    if (statusParam === 'processing') {
      // Simulate payment processing
      const timer = setTimeout(() => {
        // Randomly succeed or fail for demo
        const success = Math.random() > 0.1; // 90% success rate
        setStatus(success ? 'success' : 'failed');

        if (success) {
          setTimeout(() => {
            navigate('/pago/exitoso');
          }, 2000);
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else if (statusParam === 'success') {
      setStatus('success');
      setTimeout(() => {
        navigate('/pago/exitoso');
      }, 2000);
    } else if (statusParam === 'failed') {
      setStatus('failed');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full p-8">
        {status === 'processing' && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Procesando tu pago...</h2>
            <p className="text-muted-foreground">
              Por favor espera mientras confirmamos tu pago con Stripe
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Pago confirmado!</h2>
            <p className="text-muted-foreground">Redirigiendo al proceso de onboarding...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pago fallido</h2>
            <p className="text-muted-foreground mb-6">
              Hubo un problema al procesar tu pago. Por favor intenta nuevamente.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/checkout')} className="flex-1">
                Reintentar
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/configurar/paso-3')}
                className="flex-1"
              >
                Volver
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentStatus;
