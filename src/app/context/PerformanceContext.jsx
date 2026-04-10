'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
  const [isCinematic, setIsCinematic] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [performanceTier, setPerformanceTier] = useState('high'); // 'low', 'medium', 'high'
  const [dpr, setDpr] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Client-side detection: Calculate EVERYTHING first
    const ua = navigator.userAgent.toLowerCase();
    const android = /android/.test(ua);
    const mobile = window.innerWidth < 768;
    const rawDPR = window.devicePixelRatio || 1;
    const optimizedDPR = android ? 1 : (mobile ? Math.min(rawDPR, 1.2) : Math.min(rawDPR, 2));

    // Update states in a single, safe way: suppressing lint for mount-only initialization
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAndroid(android);
    setIsMobile(mobile);
    setDpr(optimizedDPR);
    setIsInitialized(true);

    if (mobile || android) {
      setPerformanceTier(android ? 'low' : 'medium');
      setIsCinematic(false);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Run once on mount

  const toggleMode = () => {
    setIsCinematic((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio-cinematic-mode', next.toString());
      return next;
    });
  };

  return (
    <PerformanceContext.Provider value={{ 
      isCinematic, 
      isMobile, 
      isAndroid,
      performanceTier,
      dpr,
      isInitialized, 
      toggleMode 
    }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
