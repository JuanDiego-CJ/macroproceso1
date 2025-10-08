import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stepper } from '@/components/Stepper';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { templates } from '@/data/templates';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const Step1 = () => {
  const navigate = useNavigate();
  const { state, selectTemplate } = useConfigurator();
  const [selectedId, setSelectedId] = useState<string | null>(
    state.selectedTemplate?.id || null
  );

  const handleSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedId(templateId);
      selectTemplate(template);
    }
  };

  const handleContinue = () => {
    if (selectedId) {
      navigate('/configurar/paso-2');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stepper currentStep={1} steps={['Plantilla', 'Módulos', 'Resumen']} />

        <div className="mt-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl mb-4">Selecciona tu Plantilla Base</h1>
            <p className="text-muted-foreground text-lg">
              Elige la plantilla que mejor se adapte a tu industria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => {
              const isSelected = selectedId === template.id;
              return (
                <Card
                  key={template.id}
                  className={cn(
                    'p-6 cursor-pointer transition-smooth hover:shadow-lg relative',
                    isSelected && 'ring-2 ring-primary shadow-glow'
                  )}
                  onClick={() => handleSelect(template.id)}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Desde</span>
                      <span className="font-semibold">${template.monthlyPrice}/mes</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleContinue}
              disabled={!selectedId}
              className="min-w-[200px]"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
