import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

// 🚨 Nueva variable de entorno para el Webhook de verificación de n8n
const N8N_VERIFY_WEBHOOK_URL = import.meta.env.VITE_N8N_VERIFY_WEBHOOK_URL; 

// Define el tipo de respuesta que esperas de tu API (n8n)
interface VerificationResponse {
  status: 'success' | 'failed'; // El estado real que te da el Backend
  orderId?: string; // Opcional: algún ID de tu sistema
  message: string;
}

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Inicializamos el estado base en 'processing'
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Función para llamar a tu Backend (Webhook de n8n) y verificar el pago
  const verifyPayment = useCallback(async (sessionId: string) => {
    setStatus('processing'); // Asegura que el spinner esté visible
    setErrorMsg(null);

    // 🚨 1. Validación de URL del Webhook de n8n
    if (!N8N_VERIFY_WEBHOOK_URL) {
        setErrorMsg('Error de configuración: La URL del Webhook de verificación no está definida.');
        setStatus('failed');
        return;
    }

    try {
      // 🚨 2. Llamada al Webhook de n8n, pasando la session_id como query parameter
      const response = await fetch(`${N8N_VERIFY_WEBHOOK_URL}?session_id=${sessionId}`);
      const data: VerificationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la verificación del servidor (n8n).');
      }
      
      // 3. El backend (n8n) devuelve el estado final
      setStatus(data.status);

      if (data.status === 'success') {
        // Redirigir al usuario a la página de éxito después de un breve momento
        setTimeout(() => {
          // Redirección a la ruta de éxito
          navigate('/pago-exitoso', { state: { orderId: data.orderId } }); 
        }, 2000);
      } else {
        setErrorMsg(data.message);
      }

    } catch (error) {
      console.error('Error al verificar el pago:', error);
      setStatus('failed');
      setErrorMsg('No pudimos conectar con el servidor para verificar el pago.');
    }
  }, [navigate]);

  useEffect(() => {
    // 1. Buscamos el ID de la sesión de Stripe en la URL
    const sessionId = searchParams.get('session_id');

    // 2. Si existe un session_id, iniciamos la verificación real
    if (sessionId) {
      verifyPayment(sessionId);
    } 
    // Si no hay session_id, se asume fallo
    else {
        setStatus('failed');
        setErrorMsg('No se encontró el identificador de la sesión de pago.');
    }
  }, [searchParams, verifyPayment]); 

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
               Verificando la confirmación de tu pago con nuestro servidor.
             </p>
           </div>
        )}

        {status === 'success' && (
           <div className="text-center">
             <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
               <CheckCircle2 className="w-12 h-12 text-green-500" />
             </div>
             <h2 className="text-2xl font-bold mb-2">¡Pago confirmado!</h2>
             <p className="text-muted-foreground">Redirigiendo a tu página de éxito...</p>
           </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pago fallido</h2>
            <p className="text-muted-foreground mb-4">
              {errorMsg || 'Hubo un problema al procesar tu pago. Por favor intenta nuevamente.'}
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