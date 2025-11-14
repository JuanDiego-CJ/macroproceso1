import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

interface LocationState {
    orderId?: string; // Esperamos el OrderID que se nos pasó desde PaymentStatus
}

const PaymentSuccess = () => {
    const navigate = useNavigate();
    // Usamos useLocation para acceder al 'state' pasado en la redirección
    const location = useLocation();
    const state = location.state as LocationState;
    const orderId = state?.orderId || 'Desconocido';

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
            <Card className="max-w-md w-full p-8">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4 text-green-600">
                        ¡Compra Exitosa!
                    </h2>
                    
                    <p className="text-muted-foreground mb-6">
                        Gracias por tu compra. Tu pago ha sido confirmado y tu servicio está siendo activado.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <p className="text-sm font-semibold text-gray-700">
                            Número de Orden: <span className="text-primary font-mono">{orderId}</span>
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                        Próximos Pasos:
                    </h3>
                    
                    <ul className="text-left list-disc list-inside text-muted-foreground mb-8">
                        <li>Recibirás una factura en tu correo electrónico en los próximos minutos.</li>
                        <li>Hemos iniciado el proceso de activación de tu **Tienda Online**.</li>
                        <li>Accede a tu panel de control para empezar a configurar tus módulos.</li>
                    </ul>

                    <Button onClick={() => navigate('/dashboard')} className="w-full">
                        Ir al Panel de Control
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PaymentSuccess;