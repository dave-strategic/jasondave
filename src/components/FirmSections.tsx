import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Brain, Key, Play } from 'lucide-react';

export const FirmSections: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="bg-[#EEF2F6] text-[#0F2338] py-20 px-6 sm:px-12 font-sans overflow-hidden">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-32">
        
        {/* SECTION 1: OUR APPROACH */}
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-6">
            <span className="text-base font-serif lowercase tracking-wide text-[#5993D2] mb-3">
              our approach
            </span>
            <div className="w-12 h-[1px] bg-[#5993D2]/40 mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-serif text-[#0B1D33] max-w-2xl leading-snug font-normal">
              We view the families for whom we work not as clients but as partners.
            </h2>
          </div>

          {/* Video Thumbnail Card */}
          <div className="w-full max-w-[860px] relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(15,35,56,0.15)] border border-[#0F2338]/10 group bg-[#10253F] aspect-video flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80" 
              alt="Naviter Wealth Team" 
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D33] via-[#0B1D33]/60 to-transparent" />
            
            <div className="relative z-10 flex flex-col items-center gap-6 p-6 text-center">
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#0B1D33] flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 pl-1"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 fill-current text-[#0B1D33]" />
              </button>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                Get to Know Naviter Wealth
              </h3>

              <div className="mt-2">
                <img 
                  src="https://strategicwebsites-204210.web.app/Naviter%20logo-blue-1.svg" 
                  alt="Naviter Wealth" 
                  className="h-10 opacity-90 filter brightness-200"
                />
              </div>
            </div>
          </div>

          {/* Modal / Video Lightbox placeholder */}
          {isVideoOpen && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
                <button 
                  onClick={() => setIsVideoOpen(false)}
                  className="absolute top-4 right-4 text-white text-xl z-10 bg-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
                <video controls autoPlay className="w-full h-full">
                  <source src="https://naviterwealth.com/wp-content/uploads/2020/12/home.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}
        </section>


        {/* SECTION 2: OUR PILLARS */}
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-16">
            <span className="text-base font-serif lowercase tracking-wide text-[#5993D2] mb-3">
              our pillars
            </span>
            <div className="w-12 h-[1px] bg-[#5993D2]/40 mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-serif text-[#0B1D33] mb-4 font-normal">
              Integrity, Acumen, and Access.
            </h2>
            <p className="text-[#3B6A9C] text-sm sm:text-base max-w-2xl font-normal">
              We believe these three pillars are the essential criteria every family should expect from their advisors.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Integrity */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_15px_40px_rgba(15,35,56,0.06)] border border-white flex flex-col items-center text-center text-[#1E293B]"
            >
              <div className="w-14 h-14 rounded-full bg-[#5993D2] text-white flex items-center justify-center mb-6 shadow-md shadow-[#5993D2]/30">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-[#3B6A9C] mb-6">Integrity</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#475569]">
                With <span className="font-semibold text-[#1E293B]">deep reverence</span> for the trust placed in us, we are fiduciaries committed to serving your best interests. Approaching each decision with <span className="font-semibold text-[#3B6A9C]">humble confidence</span>, we take complete accountability as we navigate your financial journey—always doing the right thing, even when it is the hard thing.
              </p>
            </motion.div>

            {/* Acumen */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_15px_40px_rgba(15,35,56,0.06)] border border-white flex flex-col items-center text-center text-[#1E293B]"
            >
              <div className="w-14 h-14 rounded-full bg-[#5993D2] text-white flex items-center justify-center mb-6 shadow-md shadow-[#5993D2]/30">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-[#3B6A9C] mb-6">Acumen</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#475569]">
                For over 25 years, our team has served families who have accumulated significant wealth—this is what we do. Fueled by a <span className="font-semibold text-[#3B6A9C]">relentless drive</span> and the <span className="font-semibold text-[#3B6A9C]">pursuit of excellence</span>, we have built a core team of highly experienced and credentialed professionals dedicated to solving your unique complexities.
              </p>
            </motion.div>

            {/* Access */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_15px_40px_rgba(15,35,56,0.06)] border border-white flex flex-col items-center text-center text-[#1E293B]"
            >
              <div className="w-14 h-14 rounded-full bg-[#5993D2] text-white flex items-center justify-center mb-6 shadow-md shadow-[#5993D2]/30">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-[#3B6A9C] mb-6">Access</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#475569]">
                We capitalize on decades of industry relationships to deliver the talented specialists, technology, and strategies—resources often inaccessible to our competitors. Because we believe in <span className="font-semibold text-[#3B6A9C]">winning as a team</span>, we use these specialized resources to elevate and coordinate with valued advisors you may already have in place.
              </p>
            </motion.div>
          </div>
        </section>


        {/* SECTION 3: OUR FRAMEWORK */}
        <section className="flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-base font-serif lowercase tracking-wide text-[#5993D2] mb-3">
              our framework
            </span>
            <div className="w-12 h-[1px] bg-[#5993D2]/40 mb-6" />
            <p className="text-base sm:text-lg md:text-xl font-serif text-[#0B1D33] max-w-3xl leading-relaxed font-normal">
              We operationalize our guiding tagline—<span className="italic text-[#3B6A9C]">Navigating Complexities via a Modular Family Office</span>—through a purposeful blueprint designed to manage your wealth. These five defining elements represent how we coordinate and deliver our expertise for your family:
            </p>
          </div>

          {/* 5 Framework Rows */}
          <div className="flex flex-col gap-4 w-full max-w-[960px]">
            {[
              {
                num: "01",
                title: "Navigating",
                desc: "involves applying learned expertise and proven resources to solve the unique, evolving challenges of each client."
              },
              {
                num: "02",
                title: "Complexities",
                desc: "refers to the intricate, often overlapping financial and personal hurdles inherent to significant wealth—from tax inefficiencies and fragmented reporting to the nuances of multi-generational succession and business liquidity events."
              },
              {
                num: "03",
                title: "Modular",
                desc: "refers to our flexible service model where you choose the specific solutions you need, seamlessly integrating our capabilities alongside your long-standing, trusted advisors."
              },
              {
                num: "04",
                title: "Family",
                desc: "reflects our exclusive focus on serving multi-generational, ultra-high-net-worth families—particularly those managing wealth generated through significant liquidity events."
              },
              {
                num: "05",
                title: "Office",
                desc: "refers to our institutional-grade infrastructure, unified oversight, and dedicated operations team that acts as your central financial hub and executive suite."
              }
            ].map((item) => (
              <div 
                key={item.num}
                className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0_8px_24px_rgba(15,35,56,0.04)] border border-white flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(15,35,56,0.08)]"
              >
                {/* Number Indicator badge */}
                <div className="flex items-center gap-3 min-w-[180px] sm:w-[220px]">
                  <div className="relative border-t-2 border-l-2 border-[#5993D2] px-2 py-1 text-xs font-mono font-bold text-[#3B6A9C]">
                    {item.num}
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#5993D2]" />
                  </div>
                  <h4 className="text-xl font-serif italic text-[#3B6A9C] font-normal">
                    {item.title}
                  </h4>
                </div>

                {/* Vertical Separator */}
                <div className="hidden sm:block w-[1px] h-10 bg-[#CBD5E1]" />

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
