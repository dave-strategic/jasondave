import React, { useState } from 'react';
import { FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-[70px] md:py-[120px] bg-[#0D1C2E] relative">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102338] border border-[#4DA6FF]/30 text-[#4DA6FF] text-xs font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-6">
            Frequently Asked <span className="text-gradient-blue">Questions</span>
          </h2>
          <p className="text-[#AFC4D9] text-base leading-relaxed">
            Everything you need to know about our engineering standards, IP ownership, and execution SLA.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-[24px] overflow-hidden border transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#102338] border-[#4DA6FF]/50 shadow-[0_15px_40px_rgba(0,0,0,0.3)]' 
                    : 'bg-[#102338]/40 border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-6 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-[12px] bg-[#081423] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#4DA6FF] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#4DA6FF] text-[#081423]' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-[14px] md:text-[15px] text-[#AFC4D9] leading-relaxed pt-2 border-t border-white/[0.06]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
