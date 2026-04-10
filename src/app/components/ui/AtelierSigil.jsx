'use client';
import { motion } from 'framer-motion';

export default function AtelierSigil({ className = "w-12 h-12", animateTrigger }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (customDelay = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut", delay: customDelay },
        opacity: { duration: 0.2, delay: customDelay }
      }
    })
  };

  const pointVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (customDelay = 0) => ({
      scale: 1,
      opacity: [0, 1, 0.5],
      transition: { 
        duration: 2, 
        delay: customDelay 
      }
    })
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial={animateTrigger ? "hidden" : "visible"}
      animate={animateTrigger || "visible"}
      whileInView={animateTrigger === "whileInView" ? "visible" : undefined}
      className={`relative ${className} group`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Vertical Axis */}
        <motion.path
          d="M35 15V85"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          variants={pathVariants}
          custom={0}
        />

        {/* The 'F' arms */}
        <motion.path
          d="M35 15H65"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          variants={pathVariants}
          custom={0.5}
        />
        <motion.path
          d="M35 45H55"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          variants={pathVariants}
          custom={0.8}
        />

        {/* The 'L' base */}
        <motion.path
          d="M35 85H65"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          variants={pathVariants}
          custom={1.2}
        />

        {/* Geometric Points */}
        <motion.rect
          x="33.5"
          y="13.5"
          width="3"
          height="3"
          fill="currentColor"
          variants={pointVariants}
          custom={1.5}
        />
        <motion.rect
          x="63.5"
          y="83.5"
          width="3"
          height="3"
          fill="currentColor"
          variants={pointVariants}
          custom={1.8}
        />

        {/* Decorative thin diagonal */}
        <motion.path
          d="M35 45L65 15"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
          variants={pathVariants}
          custom={2}
        />
      </svg>
      
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 blur-xl transition-all duration-700 rounded-full" />
    </motion.div>
  );
}
