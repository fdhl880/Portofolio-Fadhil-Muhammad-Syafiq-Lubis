'use client';
import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function CinematicRoom() {
  const { scrollYProgress } = useScroll();
  const splineRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function onLoad(splineApp) {
    // Save the app directly to the ref for performance
    splineRef.current = splineApp;
    setIsLoaded(true);
    console.log('[Nexus] 3D Environment Online');
  }

  // Map scroll progress to Spline camera animations/states
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!splineRef.current) return;
    
    // Example: Trigger specific transition events in Spline based on scroll %
    // You must set up these events inside your Spline file (Events -> Transition)
    // and name them 'Section1', 'Section2', etc.
    
    // if (latest < 0.2) {
    //   splineRef.current.emitEvent('keyDown', 'Section1'); 
    // } else if (latest >= 0.2 && latest < 0.5) {
    //   splineRef.current.emitEvent('keyDown', 'Section2'); 
    // } else if (latest >= 0.5) {
    //   splineRef.current.emitEvent('keyDown', 'Section3'); 
    // }
  });

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#050510] pointer-events-auto">
      
      {/* 
        IMPORTANT: Replace the 'scene' URL below with your own Spline Public URL.
        To get it: Go to Spline.design -> Export -> Code -> React -> Copy URL.
        This placeholder is a common example of an isometric room.
      */}
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9I/scene.splinecode"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80"
      />
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050510] z-10 transition-opacity duration-1000">
           <div className="text-[#00f0ff] font-mono text-xs tracking-[0.5em] animate-pulse">
             LOADING_ENVIRONMENT...
           </div>
        </div>
      )}
    </div>
  );
}
