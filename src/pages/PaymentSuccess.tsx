import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { CheckCircle2, Loader2, ExternalLink, Book } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useConfigurator();
  const [onboardingStatus, setOnboardingStatus] = useState<'in-progress' | 'completed'>(
    'in-progress'
  );
  const [portalUrl, setPortalUrl] = useState('');

  const onboardingSteps = [
    { label: 'Crear instancia', completed: false },
    { label: 'Provisionar módulos', completed: false },
    { label: 'Enviar credenciales', completed: false },
  ];

  const [steps, setSteps] = useState(onboardingSteps);

  useEffect(() => {
    // Simulate onboarding process
    const timers: NodeJS.Timeout[] = [];

    steps.forEach((_, index) => {
      const timer = setTimeout(
        () => {
          setSteps((prev) =>
            prev.map((step, i) => (i === index ? { ...step, completed: true } : step))
          );
        },
        (index + 1) * 1500
      );
      timers.push(timer);
    });

    // Complete onboarding and set portal URL
    const finalTimer = setTimeout(() => {
      setOnboardingStatus('completed');
      setPortalUrl('https://youtu.be/dz1MhkbPthI?list=RDdz1MhkbPthI'); // Mock URL

      // Auto-redirect after 3 seconds
      setTimeout(() => {
        window.location.href = 'https://youtu.be/dz1MhkbPthI?list=RDdz1MhkbPthI';
      }, 3000);
    }, 5000);

    timers.push(finalTimer);

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  if (!state.selectedTemplate) {
    navigate('/configurar/paso-1');
    return null;
  }

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">¡Pago confirmado!</h1>
          <p className="text-lg text-muted-foreground">
            Iniciando tu Onboarding personalizado
          </p>
        </div>

        <Card className="p-6 bg-secondary/50 mb-8">
          <h2 className="text-xl font-semibold mb-4">Progreso de configuración</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                {step.completed ? (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}
                <span
                  className={step.completed ? 'text-foreground' : 'text-muted-foreground'}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {onboardingStatus === 'completed' && (
          <div className="space-y-6">
            <div className="bg-success/10 border border-success/20 rounded-lg p-6">
              <h3 className="font-semibold text-success mb-2">
                ✓ Onboarding completado
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                Tu solución está lista. Te enviamos las credenciales de acceso a:
              </p>
              <p className="font-medium">{state.userEmail}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="gradient"
                size="lg"
                className="flex-1"
                onClick={() => (window.location.href = portalUrl)}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Ir a mi portal
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Book className="w-5 h-5 mr-2" />
                Ver guía de inicio
              </Button>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              Redirigiendo automáticamente en 3 segundos...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;
