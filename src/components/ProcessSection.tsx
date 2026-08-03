import React from 'react';
import { PROCESS_STEPS } from '../data';
import { motion } from 'motion/react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-[70px] md:py-[120px] bg-[#081423] relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#4DA6FF] mb-3 block font-sans">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-6">
            Our Proven Engineering <span className="text-gradient-blue">Process</span>
          </h2>
          <p className="text-[#AFC4D9] text-base md:text-lg leading-relaxed">
            A linear, transparent roadmap engineered to minimize friction and deliver production-grade platforms rapidly.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-20 left-20 right-20 h-0.5 bg-gradient-to-r from-[#4DA6FF] via-[#6CC4FF] to-[#4DA6FF]/20 z-0 opacity-40" />

          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-start bg-[#102338]/60 backdrop-blur-md p-8 rounded-[24px] border border-white/[0.08] hover:border-[#4DA6FF]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                {/* Step Header with Icon and Number Badge */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#4DA6FF] to-[#102338] p-0.5 shadow-[0_10px_25px_rgba(77,166,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full bg-[#081423] rounded-[17px] flex items-center justify-center text-[#4DA6FF]">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-[#AFC4D9]/20 group-hover:text-[#4DA6FF] transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-[-0.02em]">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#4DA6FF] mb-4 block uppercase tracking-wider">
                  {step.subtitle}
                </span>

                <p className="text-[13px] text-[#AFC4D9] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
