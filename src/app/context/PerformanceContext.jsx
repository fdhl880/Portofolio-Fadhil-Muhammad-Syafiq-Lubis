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
    // Client-side detection
    const ua = navigator.userAgent.toLowerCase();
    const android = /android/.test(ua);
    setIsAndroid(android);

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    
    // Performance Tiering & DPR Optimization
    // Android devices often have high resolution (DPR 3+) but limited GPU fill-rate.
    // We cap mobile/Android to 1.5 - 2 to ensure buttery smooth luxury animations.
    const rawDPR = window.devicePixelRatio || 1;
    const optimizedDPR = mobile ? Math.min(rawDPR, 1.5) : Math.min(rawDPR, 2);
    setDpr(optimizedDPR);

    if (mobile || android) {
      setPerformanceTier(android ? 'low' : 'medium');
    }

    // Load config OR auto-fallback for mobile
    const saved = localStorage.getItem('portfolio-cinematic-mode');
    if (saved !== null) {
      setIsCinematic(saved === 'true');
    } else if (mobile) {
      setIsCinematic(false); // Force off on mobile by default for initial safety
    }

    setIsInitialized(true);

    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
