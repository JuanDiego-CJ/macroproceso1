import { useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const N8N_VERIFY_WEBHOOK_URL = import.meta.env.VITE_N8N_VERIFY_WEBHOOK_URL;

const PaymentStatus = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isMounted = useRef(true);

    const verifyPayment = useCallback(async (sessionId: string) => {
        if (!N8N_VERIFY_WEBHOOK_URL) {
            console.error('Error: URL del Webhook de verificación no definida.');
            navigate('/pago/fallido', { replace: true });
            return;
        }

        try {
            const res = await fetch(`${N8N_VERIFY_WEBHOOK_URL}?sessionId=${sessionId}`, {
                method: "GET",
                redirect: "manual",
            });

            // En caso de que la API responda error no-JSON
            let data: any = null;

            try {
                data = await res.json();
            } catch {
                throw new Error("El backend no devolvió un JSON válido.");
            }

            if (data?.redirect) {
                console.log("Redirigiendo a:", data.redirect);
                window.location.href = data.redirect; // Redirect REAL del navegador
                return;
            }

            throw new Error("El backend no envió el campo 'redirect'.");

        } catch (error) {
            console.error('Error durante la verificación de pago:', error);

            // Esperamos un poco por si el navegador logró redirigir
            await new Promise(resolve => setTimeout(resolve, 800));

            if (isMounted.current) {
                navigate('/pago/fallido', { replace: true });
            }
        }
    }, [navigate]);

    useEffect(() => {
        isMounted.current = true;

        const sessionId = searchParams.get('session_id');

        if (sessionId) {
            verifyPayment(sessionId);
        } else {
            console.error('No se encontró session_id en la URL.');
            navigate('/pago/fallido', { replace: true });
        }

        return () => {
            isMounted.current = false;
        };
    }, [searchParams, verifyPayment, navigate]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
            <Card className="max-w-md w-full p-8">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Verificando tu Compra...</h2>
                    <p className="text-muted-foreground">
                        Estamos confirmando la transacción y procesando tu orden. Por favor, no cierres esta ventana.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default PaymentStatus;