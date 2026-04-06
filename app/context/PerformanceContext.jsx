'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
  const [isCinematic, setIsCinematic] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-cinematic-mode');
      if (saved !== null) return saved === 'true';
    }
    return true; // default
  });

  const toggleMode = () => {
    setIsCinematic((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio-cinematic-mode', next.toString());
      return next;
    });
  };

  return (
    <PerformanceContext.Provider value={{ isCinematic, toggleMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
