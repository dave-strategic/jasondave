import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-[70px] md:py-[120px] bg-[#081423] relative overflow-hidden">
      {/* Glow Orb Effect */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#4DA6FF]/15 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Text & Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#4DA6FF] mb-3 block font-sans">
                Initiate Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-6 leading-tight">
                Let's Build Your Digital <span className="text-gradient-blue">Flagship</span>
              </h2>
              <p className="text-[#AFC4D9] text-base md:text-lg leading-relaxed mb-10">
                Schedule an architectural consultation with our senior engineering leadership. We evaluate your scope and deliver a concrete proposal within 24 hours.
              </p>

              {/* Info Items */}
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-4 p-4 rounded-[20px] glass-panel hover:border-[#4DA6FF]/40 transition-colors">
                  <div className="w-12 h-12 rounded-[14px] bg-[#4DA6FF]/15 flex items-center justify-center text-[#4DA6FF] shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-[#7E94A8] font-medium uppercase">Direct Engineering Desk</div>
                    <a href="mailto:build@apexlabs.com" className="text-base font-bold text-white hover:text-[#4DA6FF] transition-colors">
                      build@apexlabs.digital
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-[20px] glass-panel hover:border-[#4DA6FF]/40 transition-colors">
                  <div className="w-12 h-12 rounded-[14px] bg-[#4DA6FF]/15 flex items-center justify-center text-[#4DA6FF] shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-[#7E94A8] font-medium uppercase">Confidential Hotline</div>
                    <a href="tel:+1800555APEX" className="text-base font-bold text-white hover:text-[#4DA6FF] transition-colors font-mono">
                      +1 (800) 555-APEX
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-[20px] glass-panel hover:border-[#4DA6FF]/40 transition-colors">
                  <div className="w-12 h-12 rounded-[14px] bg-[#4DA6FF]/15 flex items-center justify-center text-[#4DA6FF] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-[#7E94A8] font-medium uppercase">Global HQ</div>
                    <div className="text-base font-bold text-white">
                      Silicon Valley & London Labs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Response Guarantee Card */}
            <div className="p-6 rounded-[24px] bg-[#102338] border border-[#4DA6FF]/30 flex items-center gap-4">
              <Clock className="w-8 h-8 text-[#4DA6FF] shrink-0" />
              <div className="text-xs text-[#AFC4D9] leading-relaxed">
                <span className="font-bold text-white block">Sub-2 Hour Engineering SLA</span>
                All inquiries are directly routed to our CTO pod. No junior sales SDR handoffs.
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glass Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 sm:p-12 rounded-[24px] relative overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <span>Project Brief</span>
                      <Sparkles className="w-5 h-5 text-[#4DA6FF]" />
                    </h3>
                    <span className="text-xs font-mono text-[#7E94A8]">NDA Protected</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D9]">
                        Full Name *
                      </label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        placeholder="Dave Mitchell"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-[14px] bg-[#081423] border border-white/[0.1] text-white placeholder:text-[#7E94A8] focus:border-[#4DA6FF] focus:outline-none focus:ring-1 focus:ring-[#4DA6FF] transition-all text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D9]">
                        Corporate Email *
                      </label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        placeholder="dave@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-[14px] bg-[#081423] border border-white/[0.1] text-white placeholder:text-[#7E94A8] focus:border-[#4DA6FF] focus:outline-none focus:ring-1 focus:ring-[#4DA6FF] transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D9]">
                      Phone Number (Optional)
                    </label>
                    <input 
                      id="phone"
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-[14px] bg-[#081423] border border-white/[0.1] text-white placeholder:text-[#7E94A8] focus:border-[#4DA6FF] focus:outline-none focus:ring-1 focus:ring-[#4DA6FF] transition-all text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D9]">
                      Project Scope & Goals *
                    </label>
                    <textarea 
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about your timeline, target conversion goals, or technical architecture requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-[14px] bg-[#081423] border border-white/[0.1] text-white placeholder:text-[#7E94A8] focus:border-[#4DA6FF] focus:outline-none focus:ring-1 focus:ring-[#4DA6FF] transition-all text-sm resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn-gradient w-full py-5 rounded-[16px] text-base font-semibold text-white mt-2 flex items-center justify-center gap-3 shadow-xl cursor-pointer"
                  >
                    <span>Submit Project Proposal</span>
                    <Send className="w-5 h-5" />
                  </button>

                  <p className="text-[11px] text-[#7E94A8] text-center">
                    By submitting this proposal, you agree to our strict corporate privacy terms. Zero spam guaranteed.
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-16 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center text-green-400 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Proposal Received</h3>
                  <p className="text-base text-[#AFC4D9] max-w-md leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our senior technical pod has received your architectural brief and will reach out to <span className="text-[#4DA6FF] font-semibold">{formData.email}</span> within 2 hours.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({name:'', email:'', phone:'', message:''}); }}
                    className="px-6 py-3 rounded-[16px] bg-[#081423] hover:bg-[#4DA6FF] hover:text-[#081423] text-sm font-semibold text-white transition-all border border-white/[0.1]"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
