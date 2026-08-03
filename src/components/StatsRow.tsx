import React, { useState, useEffect } from 'react';
import { STATISTICS } from '../data';
import { motion } from 'motion/react';

export const StatsRow: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 -mt-16 sm:-mt-20 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATISTICS.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass-card p-8 rounded-[24px] group hover:border-[#4DA6FF]/40 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#4DA6FF]/10 rounded-full blur-2xl group-hover:bg-[#4DA6FF]/20 transition-all duration-500 pointer-events-none" />
            
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-blue font-sans">
                {stat.value}
              </span>
              <span className="text-3xl font-bold text-[#4DA6FF]">
                {stat.suffix}
              </span>
            </div>

            <h3 className="text-[16px] font-bold text-white mb-1 tracking-[-0.02em]">
              {stat.label}
            </h3>
            
            <p className="text-[13px] text-[#7E94A8] leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
