import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface QualificationModalProps {
  open: boolean;
  onClose: () => void;
  onFinalize: () => void;
  onSchedule: () => void;
  totalAmount: number;
}

export const QualificationModal = ({
  open,
  onClose,
  onFinalize,
  onSchedule,
  totalAmount,
}: QualificationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">Tu configuración es de alto impacto</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Has configurado una solución compleja con un valor de{' '}
            <span className="font-semibold text-foreground">${totalAmount.toLocaleString()}</span>.
          </p>

          <p className="text-muted-foreground">
            ¿Deseas finalizar la compra ahora o prefieres agendar una llamada de 15 minutos con un
            arquitecto para validar la configuración?
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <Button variant="gradient" size="lg" onClick={onFinalize} className="w-full">
              Finalizar compra ahora
            </Button>
            <Button variant="outline" size="lg" onClick={onSchedule} className="w-full">
              Agendar llamada con arquitecto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
