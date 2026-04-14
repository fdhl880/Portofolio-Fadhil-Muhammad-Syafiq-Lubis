'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppModeContext = createContext();

export function AppModeProvider({ children }) {
  const [mode, setMode] = useState(null);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const saved = sessionStorage.getItem('atelier-app-mode');
    if (saved) setMode(saved);
  }, []);

  const selectMode = (newMode) => {
    setMode(newMode);
    sessionStorage.setItem('atelier-app-mode', newMode);
  };

  return (
    <AppModeContext.Provider value={{ mode, selectMode, activeSection, setActiveSection }}>
      {children}
    </AppModeContext.Provider>
  );
}

export const useAppMode = () => useContext(AppModeContext);
