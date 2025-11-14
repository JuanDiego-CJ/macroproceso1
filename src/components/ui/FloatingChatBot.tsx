import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HelpCircle, X, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
// --- IMPORTA EL CONTEXTO Y LA INTERFAZ Message ---
import { useChat, Message } from '@/contexts/ChatContext'; 

const FloatingChatBot: React.FC = () => {
  // Ahora usamos el estado del Contexto en lugar del estado local
  const { isOpen, messages, setIsOpen, addBotMessage, setMessages } = useChat();
  const [inputValue, setInputValue] = useState('');

  // 1. Usa setIsOpen del contexto
  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // --- CORRECCIÓN APLICADA AQUÍ: Anotación de tipo explícita Message ---
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user', // TypeScript ahora verifica que 'user' es válido
    };
    // ---------------------------------------------------------------------

    // 2. Actualiza los mensajes usando setMessages del contexto
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulación de respuesta del bot
    setTimeout(() => {
      addBotMessage(
        `Recibí tu pregunta: "${userMessage.text}". ¿En qué más puedo ayudarte con la configuración de tu solución?`
      );
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Ventana de Chat: Usa isOpen del contexto */}
      {isOpen && (
        <Card className="w-80 h-96 flex flex-col shadow-xl mb-4 bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
            <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                <h3 className="font-semibold text-lg">Asistente de Configuración</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Mapeo de Mensajes: Usa messages del contexto */}
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
                    "max-w-[75%] p-2 rounded-lg text-sm shadow",
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
            <form onSubmit={sendMessage} className="flex w-full space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Botón de Toggle Flotante: Usa isOpen y toggleChat del contexto */}
      <Button
        variant="default"
        size="icon"
        className={cn("rounded-full w-14 h-14 shadow-xl transition-transform", isOpen ? "rotate-180" : "rotate-0")}
        onClick={toggleChat}
      >
        {isOpen ? <X className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default FloatingChatBot;