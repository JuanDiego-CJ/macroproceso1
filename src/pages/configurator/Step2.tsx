import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Stepper } from '@/components/Stepper';
import { ConfigSummary } from '@/components/ConfigSummary';
import { useNavigate } from 'react-router-dom';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { modules } from '@/data/modules';
import { cn } from '@/lib/utils';
import { Check, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Step2 = () => {
  const navigate = useNavigate();
  const { state, toggleModule } = useConfigurator();

  if (!state.selectedTemplate) {
    navigate('/configurar/paso-1');
    return null;
  }

  const isModuleSelected = (moduleId: string) => {
    return state.selectedModules.some((m) => m.id === moduleId);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stepper currentStep={2} steps={['Plantilla', 'Módulos', 'Resumen']} />

        <div className="mt-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl mb-4">Personaliza con Módulos</h1>
            <p className="text-muted-foreground text-lg">
              Agrega las funcionalidades que necesitas. El precio se actualiza en tiempo real.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Modules List */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-4">
                {modules.map((module) => {
                  const isSelected = isModuleSelected(module.id);
                  return (
                    <Card
                      key={module.id}
                      className={cn(
                        'p-5 cursor-pointer transition-smooth hover:shadow-md relative',
                        isSelected && 'ring-2 ring-primary shadow-glow'
                      )}
                      onClick={() => toggleModule(module)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-smooth',
                            isSelected
                              ? 'bg-primary border-primary'
                              : 'border-border bg-background'
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{module.name}</h3>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{module.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {module.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Mensual</span>
                            <span className="font-semibold">+${module.monthlyPrice}/mes</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" size="lg" onClick={() => navigate('/configurar/paso-1')}>
                  Volver
                </Button>
                <Button variant="gradient" size="lg" onClick={() => navigate('/configurar/paso-3')}>
                  Continuar
                </Button>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <ConfigSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
