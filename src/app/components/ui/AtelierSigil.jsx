'use client';
import { motion } from 'framer-motion';

/**
 * The Sigil of Convergence
 * A minimalist abstract mark representing the intersection of
 * mathematical precision (Logic) and spatial architecture (Creativity).
 */
export default function AtelierSigil({ className = "w-12 h-12" }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Precise Vertical Alignment (Logic) */}
        <motion.rect 
            initial={{ height: 0 }}
            animate={{ height: 80 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            x="49" y="10" width="2" fill="currentColor" 
        />
        
        {/* Foundation Alignment (Stability) */}
        <motion.rect 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            x="20" y="70" height="2" fill="currentColor" 
        />
        
        {/* The Golden Arc (Creativity/Convergence) */}
        <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            d="M 50 10 A 40 40 0 0 1 90 50" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none" 
        />

        {/* The Precision Point */}
        <motion.circle 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            cx="50" cy="71" r="2" fill="currentColor" 
        />
      </svg>
    </div>
  );
}
