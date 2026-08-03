import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#081423] select-none">
      {/* Background Video of Sea */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.7] contrast-[1.1]"
        >
          <source src="https://naviterwealth.com/wp-content/uploads/2020/12/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle Dark Gradient Overlay for text & logo legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081423]/40 via-transparent to-[#081423]/80" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Top spacer for flex balance */}
      <div className="h-16 md:h-24" />

      {/* Centered Large Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-auto px-6 flex items-center justify-center"
      >
        <img 
          src="https://strategicwebsites-204210.web.app/Naviter%20logo-blue-1.svg" 
          alt="Naviter Wealth Logo" 
          className="w-64 sm:w-80 md:w-96 lg:w-[440px] h-auto object-contain drop-shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
        />
      </motion.div>

      {/* Bottom Serif Headline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pb-12 sm:pb-16 md:pb-20 px-6 max-w-5xl text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-normal tracking-[-0.01em] text-white leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Navigating Complexities via a Modular Family Office
        </h1>
      </motion.div>
    </section>
  );
};


