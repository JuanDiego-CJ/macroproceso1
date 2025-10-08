import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stepper } from '@/components/Stepper';
import { ConfigSummary } from '@/components/ConfigSummary';
import { QualificationModal } from '@/components/QualificationModal';
import { SchedulingModal } from '@/components/SchedulingModal';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { AlertCircle } from 'lucide-react';

const Step3 = () => {
  const navigate = useNavigate();
  const { state, getTotalInitial } = useConfigurator();
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);

  if (!state.selectedTemplate) {
    navigate('/configurar/paso-1');
    return null;
  }

  const totalInitial = getTotalInitial();
  const isHighValue = totalInitial > 5000;

  const handleFinalize = () => {
    if (isHighValue) {
      setShowQualificationModal(true);
    } else {
      navigate('/crear-cuenta');
    }
  };

  const handleQualificationFinalize = () => {
    setShowQualificationModal(false);
    navigate('/crear-cuenta');
  };

  const handleSchedule = () => {
    setShowQualificationModal(false);
    setShowSchedulingModal(true);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stepper currentStep={3} steps={['Plantilla', 'Módulos', 'Resumen']} />

        <div className="mt-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl mb-4">Resumen de tu Solución</h1>
            <p className="text-muted-foreground text-lg">
              Revisa tu configuración antes de finalizar
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ConfigSummary
              showEdit
              onEdit={() => navigate('/configurar/paso-2')}
            />

            {isHighValue && (
              <Card className="p-4 mt-6 bg-primary/5 border-primary/20">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Configuración de Alto Impacto</p>
                    <p className="text-sm text-muted-foreground">
                      Tu configuración supera los $5,000. Puedes finalizar ahora o agendar una
                      llamada de 15 minutos con un arquitecto para validar tu solución.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex flex-col gap-4 mt-8">
              <Button variant="gradient" size="lg" onClick={handleFinalize} className="w-full">
                Finalizar compra ahora
              </Button>

              {isHighValue && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowSchedulingModal(true)}
                  className="w-full"
                >
                  Hablar con un arquitecto (15 min)
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={() => navigate('/configurar/paso-2')}
                className="w-full"
              >
                Volver a módulos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <QualificationModal
        open={showQualificationModal}
        onClose={() => setShowQualificationModal(false)}
        onFinalize={handleQualificationFinalize}
        onSchedule={handleSchedule}
        totalAmount={totalInitial}
      />

      <SchedulingModal
        open={showSchedulingModal}
        onClose={() => setShowSchedulingModal(false)}
      />
    </div>
  );
};

export default Step3;
