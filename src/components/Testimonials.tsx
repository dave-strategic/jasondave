import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-[70px] md:py-[120px] bg-[#0D1C2E] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#4DA6FF] mb-3 block font-sans">
              Client Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
              Trusted by Ambitious <span className="text-gradient-blue">Founders</span>
            </h2>
          </div>

          {/* Slider Navigation Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-[16px] bg-[#102338] hover:bg-[#4DA6FF] text-white hover:text-[#081423] border border-white/[0.08] transition-all flex items-center justify-center shadow-lg"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-[16px] bg-[#102338] hover:bg-[#4DA6FF] text-white hover:text-[#081423] border border-white/[0.08] transition-all flex items-center justify-center shadow-lg"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid & Active View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`glass-card p-8 rounded-[24px] flex flex-col justify-between hover:rotate-1 hover:border-[#4DA6FF]/40 hover:-translate-y-2 transition-all duration-300 relative ${
                idx === activeIndex ? 'border-[#4DA6FF]/60 shadow-[0_20px_50px_rgba(77,166,255,0.25)]' : 'opacity-90'
              }`}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/[0.04] pointer-events-none" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#4DA6FF] text-[#4DA6FF]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-[#AFC4D9] leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full object-cover border border-[#4DA6FF]/40"
                />
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#7E94A8]">
                    {t.role}, <span className="text-[#4DA6FF] font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
