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
    // We cap mobile/Android to 1.0 - 1.2 to ensure "luxury" smoothness over raw resolution.
    const rawDPR = window.devicePixelRatio || 1;
    const isAndroidDevice = /android/.test(ua);
    
    // Luxury Optimization: Prioritize 60fps over sharpness on mobile
    const optimizedDPR = isAndroidDevice ? 1 : (mobile ? Math.min(rawDPR, 1.2) : Math.min(rawDPR, 2));
    setDpr(optimizedDPR);

    if (mobile || isAndroidDevice) {
      setPerformanceTier(isAndroidDevice ? 'low' : 'medium');
      // On Android/Mobile, we disable cinematic mode by default to ensure first-load stability
      setIsCinematic(false);
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
