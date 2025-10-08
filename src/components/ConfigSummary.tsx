import { Card } from '@/components/ui/card';
import { useConfigurator } from '@/contexts/ConfiguratorContext';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';

interface ConfigSummaryProps {
  onEdit?: () => void;
  showEdit?: boolean;
  compact?: boolean;
}

export const ConfigSummary = ({ onEdit, showEdit = false, compact = false }: ConfigSummaryProps) => {
  const { state, getTotalMonthly, getTotalInitial } = useConfigurator();

  if (!state.selectedTemplate) {
    return null;
  }

  return (
    <Card className="p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Resumen de tu solución</h3>
        {showEdit && onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Plantilla seleccionada</p>
          <p className="font-medium">{state.selectedTemplate.name}</p>
          {!compact && (
            <p className="text-sm text-muted-foreground mt-1">{state.selectedTemplate.description}</p>
          )}
        </div>

        {state.selectedModules.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Módulos ({state.selectedModules.length})
            </p>
            <ul className="space-y-1">
              {state.selectedModules.map((module) => (
                <li key={module.id} className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{module.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pago inicial</span>
            <span className="font-semibold">${getTotalInitial().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pago mensual</span>
            <span className="font-semibold">${getTotalMonthly().toLocaleString()}/mes</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="font-bold">Total inicial</span>
            <span className="font-bold text-primary text-lg">
              ${getTotalInitial().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
