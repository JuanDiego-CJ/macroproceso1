// src/pages/PaymentFailed.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
            <Card className="max-w-md w-full p-8">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
                        <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4 text-red-600">
                        ¡Error en el Pago!
                    </h2>
                    
                    <p className="text-muted-foreground mb-6">
                        No pudimos verificar o procesar tu pago. Por favor, revisa tus datos e intenta de nuevo.
                    </p>

                    <Button onClick={() => navigate('/checkout')} className="w-full">
                        Volver al Checkout
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PaymentFailed;