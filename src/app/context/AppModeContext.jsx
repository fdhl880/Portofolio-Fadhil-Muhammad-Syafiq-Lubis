'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppModeContext = createContext();

export function AppModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('atelier-app-mode') || null;
    }
    return null;
  });
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    // Sync to sessionStorage on changes
    if (mode) sessionStorage.setItem('atelier-app-mode', mode);
  }, [mode]);

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
