import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, X, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Asumiendo que tienes un componente Input

// Tipos básicos para el mensaje (ajusta según tu necesidad real)
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Simulación de mensajes y entrada de usuario
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '¡Hola! Soy tu asistente virtual. ¿Tienes alguna duda sobre los módulos?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  // Función simulada para enviar mensaje
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
    };

    // Añade el mensaje del usuario
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // --- Aquí iría la lógica real para comunicarse con tu ChatBot/API ---
    // Simulación de respuesta del bot después de un breve retraso
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Recibí tu pregunta: "${newMessage.text}". Por ahora solo estoy de adorno, ¡pero pronto te ayudaré!`,
          sender: 'bot',
        },
      ]);
    }, 1000);
    // ---------------------------------------------------------------------
  };

  return (
    // Contenedor principal para posicionar el chat
    <div className="fixed bottom-6 right-6 z-50">
      {/* Ventana de Chat (visible cuando isOpen es true) */}
      {isOpen && (
        <Card className="w-80 h-96 flex flex-col shadow-xl mb-4">
          <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
            <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                <h3 className="font-semibold text-lg">Asistente Virtual</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Lista de Mensajes */}
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex",
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div 
                  className={cn(
                    "max-w-[75%] p-2 rounded-lg text-sm",
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </CardContent>

          <CardFooter className="p-3 border-t">
            {/* Formulario de Input */}
            <form onSubmit={sendMessage} className="flex w-full space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Botón Flotante (siempre visible) */}
      <Button
        variant="default"
        size="icon"
        className={cn("rounded-full w-14 h-14 shadow-lg transition-transform", isOpen ? "rotate-90" : "rotate-0")}
        onClick={toggleChat}
      >
        {isOpen ? <X className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default ChatBotButton;