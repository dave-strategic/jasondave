import React from 'react';
import { FEATURED_PROJECTS } from '../data';
import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="work" className="py-[70px] md:py-[120px] bg-[#0D1C2E] relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#4DA6FF] mb-3 block font-sans">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
              Featured <span className="text-gradient-blue">Case Studies</span>
            </h2>
          </div>
          <p className="text-[#AFC4D9] text-base md:text-lg max-w-md leading-relaxed">
            Real enterprise transformations delivering massive measurable revenue impact and user growth.
          </p>
        </div>

        {/* Projects List (Alternating Layout) */}
        <div className="flex flex-col gap-20 md:gap-28">
          {FEATURED_PROJECTS.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  !isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-7 ${!isEven ? 'lg:col-start-6' : ''}`}>
                  <div className="relative rounded-[24px] overflow-hidden group border border-white/[0.1] shadow-2xl bg-[#081423]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={proj.image} 
                        alt={proj.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081423]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Metric Badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 rounded-full glass-card border border-[#4DA6FF]/40 flex items-center gap-2 shadow-xl">
                      <TrendingUp className="w-4 h-4 text-[#4DA6FF]" />
                      <span className="text-xs font-bold text-white">{proj.metrics}</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-5 ${!isEven ? 'lg:col-start-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4DA6FF] bg-[#4DA6FF]/10 px-3 py-1 rounded-full">
                      {proj.category}
                    </span>
                    <span className="text-xs text-[#7E94A8] font-medium">• {proj.client}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-[-0.03em]">
                    {proj.title}
                  </h3>

                  <p className="text-base text-[#AFC4D9] leading-relaxed mb-8">
                    {proj.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-[#AFC4D9] bg-[#102338] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <a 
                    href="#/contact"
                    className="inline-flex items-center gap-3 px-6 py-4 rounded-[16px] bg-[#102338] hover:bg-[#4DA6FF] text-white hover:text-[#081423] font-semibold transition-all duration-300 border border-white/[0.08] hover:border-transparent shadow-lg group tracking-tight text-sm"
                  >
                    <span>View Project</span>
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
