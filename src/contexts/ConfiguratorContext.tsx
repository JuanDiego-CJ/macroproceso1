import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export interface ConfiguratorState {
  selectedTemplate: Template | null;
  selectedModules: Module[];
  userEmail: string;
  userName: string;
}

interface ConfiguratorContextType {
  state: ConfiguratorState;
  selectTemplate: (template: Template) => void;
  toggleModule: (module: Module) => void;
  clearModules: () => void;
  setUserInfo: (email: string, name: string) => void;
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
