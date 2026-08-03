import React from 'react';
import { SERVICES } from '../data';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-[70px] md:py-[120px] bg-[#0D1C2E] relative overflow-hidden">
      {/* Subtle Background Glow Blob */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#4DA6FF]/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#4DA6FF] mb-3 block font-sans">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
              Enterprise Digital <span className="text-gradient-blue">Services</span>
            </h2>
          </div>
          <p className="text-[#AFC4D9] text-base md:text-lg max-w-md leading-relaxed">
            We combine high-end software engineering craftsmanship with conversion-focused agency execution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-[24px] flex flex-col justify-between group hover:-translate-y-2 hover:border-[#4DA6FF]/50 hover:shadow-[0_20px_50px_rgba(77,166,255,0.2)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Ambient Card Corner Glow */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-[#4DA6FF]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Top Row: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-[18px] bg-[#081423] border border-white/[0.1] flex items-center justify-center text-[#4DA6FF] group-hover:bg-gradient-to-br group-hover:from-[#4DA6FF] group-hover:to-[#3E8DFF] group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(77,166,255,0.4)] transition-all duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold text-[#AFC4D9] bg-[#081423]/60 px-3 py-1.5 rounded-full border border-white/[0.06] tracking-wide">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-[-0.02em] group-hover:text-[#4DA6FF] transition-colors">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-[#AFC4D9] leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Features List & CTA Link */}
                <div className="pt-6 border-t border-white/[0.08]">
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {srv.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-[#AFC4D9]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA6FF] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="#/contact" 
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-white group-hover:text-[#4DA6FF] transition-colors tracking-tight"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
