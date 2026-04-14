'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppModeContext = createContext();

export function AppModeProvider({ children }) {
  // Always start with null to exactly match SSR output → prevents hydration mismatch.
  // sessionStorage is read AFTER mount in useEffect (client-only, safe).
  const [mode, setMode] = useState(null);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const saved = sessionStorage.getItem('atelier-app-mode');
    if (saved) setMode(saved); // eslint-disable-line react-hooks/set-state-in-effect
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
