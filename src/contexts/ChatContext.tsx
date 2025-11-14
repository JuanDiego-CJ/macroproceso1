import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definición de Tipos
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatContextType {
  isOpen: boolean;
  messages: Message[];
  setIsOpen: (open: boolean) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addBotMessage: (text: string) => void;
}

// 2. Creación del Contexto
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// 3. Hook Personalizado para usar el Contexto
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat debe ser usado dentro de un ChatProvider');
  }
  return context;
};

// 4. Proveedor del Contexto (Wrapper)
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Estado inicial: Cerrado por defecto.
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Función de ayuda para añadir mensajes del bot
  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'bot',
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ isOpen, messages, setIsOpen, setMessages, addBotMessage }}>
      {children}
    </ChatContext.Provider>
  );
};