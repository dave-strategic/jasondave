import React from 'react';
import { PRICING_PLANS } from '../data';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-[70px] md:py-[120px] bg-[#081423] relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#4DA6FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#4DA6FF] mb-3 block font-sans">
            Transparent Investment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-6">
            Enterprise Digital <span className="text-gradient-blue">Pricing</span>
          </h2>
          <p className="text-[#AFC4D9] text-base md:text-lg leading-relaxed">
            High-ROI digital architectures engineered to compound your enterprise valuation. No hidden costs or vendor lock-in.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`rounded-[24px] p-8 md:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular 
                    ? 'bg-[#102338] border-2 border-[#4DA6FF] shadow-[0_25px_60px_rgba(77,166,255,0.25)] lg:-translate-y-4' 
                    : 'glass-panel hover:border-[#4DA6FF]/40 hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#4DA6FF] to-[#3E8DFF] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#AFC4D9] mb-8 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/[0.08]">
                    <span className="text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#7E94A8] font-medium uppercase tracking-wider">
                      / {plan.period}
                    </span>
                  </div>

                  <p className="text-sm text-[#AFC4D9] font-medium mb-8">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="flex flex-col gap-4 mb-10">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-[#AFC4D9]">
                        <div className="w-5 h-5 rounded-full bg-[#4DA6FF]/20 text-[#4DA6FF] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href="#/contact"
                  className={`w-full py-4 rounded-[16px] font-semibold text-center text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    isPopular 
                      ? 'btn-gradient text-white' 
                      : 'bg-[#081423] hover:bg-[#4DA6FF] text-white hover:text-[#081423] border border-white/[0.08]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
