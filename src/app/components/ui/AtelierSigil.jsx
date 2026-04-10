'use client';
import { motion } from 'framer-motion';

export default function AtelierSigil({ className = "w-12 h-12" }) {
  return (
    <div className={`relative ${className} group`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* The Nexus Monogram Construction (F + L) */}
        
        {/* Main Vertical Axis (The Foundation) */}
        <motion.path
          d="M35 15V85"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* The 'F' arms (Precision & Fact) */}
        <motion.path
          d="M35 15H65"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M35 45H55"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* The 'L' base (Logic & Legacy) */}
        <motion.path
          d="M35 85H65"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* Geometric Accents (The Nexus Points) */}
        <motion.rect
          x="33.5"
          y="13.5"
          width="3"
          height="3"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <motion.rect
          x="63.5"
          y="83.5"
          width="3"
          height="3"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 2, delay: 1.8 }}
        />

        {/* Decorative thin diagonal (Mathematics of intersection) */}
        <motion.path
          d="M35 45L65 15"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
      </svg>
      
      {/* Subtle hover "Nexus" glow */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 blur-xl transition-all duration-700 rounded-full" />
    </div>
  );
}
