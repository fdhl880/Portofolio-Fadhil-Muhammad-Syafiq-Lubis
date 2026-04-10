'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppModeContext = createContext();

export function AppModeProvider({ children }) {
  // modes: 'null' (not chosen), 'archive' (2D/Static), 'atelier' (3D/Cinematic)
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('atelier-app-mode');
    if (saved) setMode(saved);
  }, []);

  const selectMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem('atelier-app-mode', newMode);
  };

  return (
    <AppModeContext.Provider value={{ mode, selectMode }}>
      {children}
    </AppModeContext.Provider>
  );
}

export const useAppMode = () => useContext(AppModeContext);
