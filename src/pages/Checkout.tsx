// @/pages/Checkout.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ConfigSummary } from '@/components/ConfigSummary';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { CreditCard, Lock, Check, Loader2 } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';

// 🚨 IMPORTANTE: Define la URL del Webhook de n8n
const N8N_CHECKOUT_WEBHOOK_URL = import.meta.env.VITE_N8N_CHECKOUT_WEBHOOK_URL; 
// Asume que la URL de éxito y cancelación usan la variable VITE_APP_URL
const APP_BASE_URL = import.meta.env.VITE_APP_URL || window.location.origin;

const Checkout = () => {
    const navigate = useNavigate();
    const { state, getTotalInitial, getTotalMonthly } = useConfigurator(); 
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);

    if (!state.selectedTemplate || !state.userEmail) {
        navigate('/configurar/paso-1');
        return null;
    }

    const totalInitial = getTotalInitial();
    const totalMonthly = getTotalMonthly();
    const template = state.selectedTemplate;

    // 🚀 FUNCIÓN handlePayment: LECTURA DE JSON Y REDIRECCIÓN JS
    const handlePayment = async () => {
        setIsProcessing(true);
        
        // 🚨 CORRECCIÓN CLAVE: Agregar el session_id a la URL de éxito para Stripe
        const successUrlWithSession = `${APP_BASE_URL}/pago/exitoso?session_id={CHECKOUT_SESSION_ID}`;
        
        const payload = {
            // Datos del Usuario
            email: state.userEmail,
            userName: state.userName,
            
            // Datos de la Orden y Precios
            monto_inicial: totalInitial,
            monto_mensual: totalMonthly,
            
            // Datos de la Configuración
            templateId: template.id,
            nombre_plantilla: template.name,
            modulesIds: state.selectedModules.map(m => m.id),
            
            // URLs de Stripe (para que n8n las use al crear la sesión)
            // 🚨 FIX 1: Usamos la URL corregida
            success_url: successUrlWithSession, 
            cancel_url: `${APP_BASE_URL}/checkout`,
        };

        if (!N8N_CHECKOUT_WEBHOOK_URL) {
            console.error("Error: VITE_N8N_CHECKOUT_WEBHOOK_URL no está definida.");
            toast({
                title: 'Error de Configuración',
                description: 'La URL del servidor de pago no está establecida. Verifica tu archivo .env.',
                variant: 'destructive',
            });
            setIsProcessing(false);
            return;
        }

        try {
            toast({
                title: 'Preparando tu compra...',
                description: 'Conectando con la pasarela de pago seguro.',
                duration: 5000
            });

            // 1. Llamada al Webhook de n8n
            const response = await fetch(N8N_CHECKOUT_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Manejar errores HTTP (400, 500, etc.)
                const errorText = await response.text();
                throw new Error(`Fallo en el servidor de pago: ${response.status}. Detalle: ${errorText}`);
            }
            
            // 2. Extraer la URL del JSON de respuesta (requiere n8n responda con JSON)
            const data = await response.json();
            
            // 🚨 FIX 2: Usa data.url como principal (lo que devuelve Stripe por defecto)
            const stripeCheckoutUrl = data.url || data.stripeSessionUrl; 

            if (stripeCheckoutUrl && typeof stripeCheckoutUrl === 'string') {
                // 3. ¡Redirección FORZADA por JavaScript!
                window.location.replace(stripeCheckoutUrl);
            } else {
                // Este error se lanza si n8n no devolvió la URL correctamente (probablemente por falta de data)
                throw new Error('El servidor respondió correctamente, pero no devolvió la URL de Stripe. (Revisa CORS y n8n logs)');
            }

        } catch (error) {
            console.error('Error durante el proceso de Checkout:', error);
            toast({
                title: 'Error de Pago',
                description: 'No pudimos iniciar la pasarela de pago. Intenta de nuevo. Revisa la consola y tu configuración de n8n.',
                variant: 'destructive',
            });
        } finally {
            setIsProcessing(false);
        }
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
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Nombre:</span>
                                            <span className="font-medium">{state.userName || 'N/A'}</span>
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
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Redirigiendo...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5 mr-2" />
                                            Pagar ${totalInitial.toLocaleString()} con Stripe
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
                        {/* Summary */}
                        <ConfigSummary compact /> 

                        {/* Detalle de Suscripción */}
                        <Card className="p-4 mt-6 bg-success/5 border-success/20">
                            <p className="text-sm text-muted-foreground space-y-2">
                                <div className="flex items-center text-success">
                                    <Check className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                        Pago único inicial: **${totalInitial.toLocaleString()}**
                                    </span>
                                </div>
                                <div className="flex items-center text-success">
                                    <Check className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                        Luego **${totalMonthly.toLocaleString()}/mes** (Suscripción)
                                    </span>
                                </div>
                                <div className="flex items-center text-success">
                                    <Check className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">Cancela cuando quieras</span>
                                </div>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;