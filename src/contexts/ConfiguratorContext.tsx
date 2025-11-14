// @/contexts/ConfiguratorContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
// ELIMINAMOS: import { findUser } from '@/data/userSimulator'; 

// 🚨 DEFINIMOS LAS URLs DE WEBHOOKS
const N8N_LOGIN_WEBHOOK_URL = import.meta.env.VITE_N8N_LOGIN_WEBHOOK_URL;
const N8N_REGISTER_WEBHOOK_URL = import.meta.env.VITE_N8N_REGISTER_WEBHOOK_URL; // <-- AGREGADO

export interface Module {
    id: string;
    name: string;
    description: string;
    monthlyPrice: number;
    initialPrice: number;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    monthlyPrice: number;
    initialPrice: number;
}

// 2. INTERFAZ PARA EL USUARIO AUTENTICADO
export interface AuthenticatedUser {
    email: string;
    name: string; 
    isRecurring: boolean;
    lastTemplateId: string | null;
}

export interface ConfiguratorState {
    selectedTemplate: Template | null;
    selectedModules: Module[];
    userEmail: string;
    userName: string;
    authenticatedUser: AuthenticatedUser | null; 
}

interface ConfiguratorContextType {
    // 🚀 CORRECCIÓN: AGREGAMOS 'state' aquí para que sea accesible
    state: ConfiguratorState;
    
    selectTemplate: (template: Template) => void;
    toggleModule: (module: Module) => void;
    clearModules: () => void;
    setUserInfo: (email: string, name: string) => void;
    
    // FUNCIONES DE AUTENTICACIÓN
    loginUser: (email: string, passwordHash: string) => Promise<boolean>; 
    registerUser: (name: string, email: string, passwordHash: string) => Promise<boolean>; // <-- AGREGADO
    isAuthenticated: () => boolean; 
    
    getTotalMonthly: () => number;
    getTotalInitial: () => number;
    resetConfiguration: () => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ConfiguratorState>({
        selectedTemplate: null,
        selectedModules: [],
        userEmail: '',
        userName: '',
        authenticatedUser: null,
    });

    const selectTemplate = (template: Template) => {
        setState(prev => ({ ...prev, selectedTemplate: template }));
    };

    const toggleModule = (module: Module) => {
        setState(prev => {
            const isSelected = prev.selectedModules.some(m => m.id === module.id);
            return {
                ...prev,
                selectedModules: isSelected
                    ? prev.selectedModules.filter(m => m.id !== module.id)
                    : [...prev.selectedModules, module],
            };
        });
    };

    const clearModules = () => {
        setState(prev => ({ ...prev, selectedModules: [] }));
    };

    const setUserInfo = (email: string, name: string) => {
        setState(prev => ({ ...prev, userEmail: email, userName: name }));
    };

    
    // 5. 🚀 IMPLEMENTACIÓN DE loginUser (USANDO WEBHOOK DE N8N)
    const loginUser = async (email: string, passwordHash: string): Promise<boolean> => {

        if (!N8N_LOGIN_WEBHOOK_URL) {
            console.error("Error: VITE_N8N_LOGIN_WEBHOOK_URL no está definida.");
            return false;
        }

        try {
            // 1. Llamada al Webhook de n8n (POST request)
            const response = await fetch(N8N_LOGIN_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: passwordHash }), 
            });

            if (!response.ok) {
                console.error('Error HTTP al intentar iniciar sesión:', response.status);
                return false;
            }

            const data = await response.json();
            
            // 2. Verificación de éxito según la respuesta de n8n
            if (data.success && data.user) {
                const foundUser = data.user; 
                
                // 3. Actualización del estado (Usando 'name' para el nombre completo)
                setState(prev => ({ 
                    ...prev, 
                    userEmail: foundUser.email,
                    userName: foundUser.name, // <-- Usamos el Full name para el display
                    authenticatedUser: {
                        email: foundUser.email,
                        name: foundUser.name,
                        isRecurring: foundUser.isRecurring,
                        lastTemplateId: foundUser.lastTemplateId || null,
                    }
                }));
                return true;
            }

            return false; // Login fallido (credenciales incorrectas)

        } catch (error) {
            console.error('Error durante la conexión al Webhook de Login:', error);
            return false;
        }
    };
    
    // 7. 🚀 IMPLEMENTACIÓN DE registerUser 
    const registerUser = async (name: string, email: string, passwordHash: string): Promise<boolean> => {

        if (!N8N_REGISTER_WEBHOOK_URL) {
            console.error("Error: VITE_N8N_REGISTER_WEBHOOK_URL no está definida.");
            return false;
        }

        try {
            // 1. Llamada al Webhook de n8n para Registro
            const response = await fetch(N8N_REGISTER_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password: passwordHash }), 
            });

            if (!response.ok) {
                console.error('Error HTTP al intentar registrar usuario:', response.status);
                return false;
            }

            const data = await response.json();
            
            // 2. Verificación de éxito y Login automático
            if (data.success && data.user) {
                const foundUser = data.user; 
                
                // 3. Actualización del estado (Login automático después del registro)
                setState(prev => ({ 
                    ...prev, 
                    userEmail: foundUser.email,
                    userName: foundUser.name,
                    authenticatedUser: {
                        email: foundUser.email,
                        name: foundUser.name,
                        isRecurring: foundUser.isRecurring,
                        lastTemplateId: foundUser.lastTemplateId || null,
                    }
                }));
                return true;
            }
            
            // Manejar el caso de que n8n devuelva OK, pero success: false (ej. email ya existe)
            return false; 

        } catch (error) {
            console.error('Error durante la conexión al Webhook de Registro:', error);
            return false;
        }
    };


    // 6. IMPLEMENTACIÓN DE isAuthenticated (se mantiene igual)
    const isAuthenticated = () => {
        return state.authenticatedUser !== null;
    };

    const getTotalMonthly = () => {
        const templatePrice = state.selectedTemplate?.monthlyPrice || 0;
        const modulesPrice = state.selectedModules.reduce((sum, m) => sum + m.monthlyPrice, 0);
        return templatePrice + modulesPrice;
    };

    const getTotalInitial = () => {
        const templatePrice = state.selectedTemplate?.initialPrice || 0;
        const modulesPrice = state.selectedModules.reduce((sum, m) => sum + m.initialPrice, 0);
        return templatePrice + modulesPrice;
    };

    const resetConfiguration = () => {
        setState({
            selectedTemplate: null,
            selectedModules: [],
            userEmail: '',
            userName: '',
            authenticatedUser: null,
        });
    };

    return (
        <ConfiguratorContext.Provider
            value={{
                state,
                selectTemplate,
                toggleModule,
                clearModules,
                setUserInfo,
                loginUser, 
                registerUser, // <-- AGREGADO AL CONTEXTO
                isAuthenticated, 
                getTotalMonthly,
                getTotalInitial,
                resetConfiguration,
            }}
        >
            {children}
        </ConfiguratorContext.Provider>
    );
};

export const useConfigurator = () => {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error('useConfigurator must be used within ConfiguratorProvider');
    }
    return context;
};