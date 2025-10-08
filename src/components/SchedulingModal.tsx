import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SchedulingModalProps {
  open: boolean;
  onClose: () => void;
}

export const SchedulingModal = ({ open, onClose }: SchedulingModalProps) => {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!email || !selectedDate || !selectedTime) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor completa todos los campos',
        variant: 'destructive',
      });
      return;
    }

    // Here you would save the appointment to your backend
    console.log('Appointment scheduled:', { email, selectedDate, selectedTime });

    setIsScheduled(true);
    toast({
      title: 'Cita agendada',
      description: 'Recibirás un correo con los detalles de la llamada',
    });

    setTimeout(() => {
      setIsScheduled(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setEmail('');
    setSelectedDate('');
    setSelectedTime('');
    setIsScheduled(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">Agendar llamada con arquitecto</DialogTitle>
          </div>
        </DialogHeader>

        {isScheduled ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Cita agendada!</h3>
            <p className="text-muted-foreground">Recibirás los detalles por correo</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <select
                id="time"
                className="w-full h-11 px-3 rounded-lg border border-input bg-background"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Selecciona una hora</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancelar
              </Button>
              <Button variant="gradient" onClick={handleConfirm} className="flex-1">
                Confirmar cita
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
