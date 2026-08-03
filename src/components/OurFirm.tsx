import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Shield, Brain, Key, ArrowRight } from 'lucide-react';
import { Seo } from './Seo';

const FrameworkItem = ({ item, idx }: { item: any, idx: number, key?: any }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const listener = (e: any) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  const { scrollYProgress: scrollYProgressDesktop } = useScroll({
    target: ref,
    offset: ["start 100%", "start 50%"]
  });
  const { scrollYProgress: scrollYProgressMobile } = useScroll({
    target: ref,
    offset: ["start 100%", "center 50%"]
  });

  const scrollYProgress = isMobile ? scrollYProgressMobile : scrollYProgressDesktop;

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#ffffff", "#f5f5f5", "#ffffff"]);

  return (
    <motion.div
      ref={ref}
      key={item.label}
      initial="inactive"
      whileInView="active"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        inactive: { opacity: 0, y: 60 },
        active: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      style={{ backgroundColor }}
      className="relative flex flex-col md:flex-row items-center md:items-center gap-6 p-8 md:p-10 rounded-lg"
    >
      <div className="md:w-1/4 shrink-0 flex items-center gap-4 relative z-10 border-r border-naviter-blue/20">
        <div className="w-10 h-10 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
            <motion.path
              d="M 1.5 10 V 1.5 H 38.5 V 38.5 H 1.5 V 30"
              stroke="#58aadb"
              strokeWidth="3.4"
              strokeLinecap="square"
              fill="none"
              style={{ pathLength }}
            />
          </svg>
          <span className="text-naviter-blue text-sm font-sans">0{idx + 1}</span>
        </div>
        <h5 className="font-serif text-2xl italic text-naviter-blue">
          {item.label}
        </h5>
      </div>
      <div className="md:w-3/4 md:pl-8 relative z-10">
        <p className="text-naviter-navy/70 font-sans text-lg leading-relaxed text-center md:text-left">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const OurFirm = ({ onNavigateToServices }: { onNavigateToServices: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const listener = (e: any) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  const buttonRef = useRef(null);
  const { scrollYProgress: buttonScrollYProgress } = useScroll({
    target: buttonRef,
    offset: ["start 100%", "start 90%"]
  });
  const buttonBgColor = useTransform(buttonScrollYProgress, [0, 1], ["#154372", "#58aadb"]);

  return (
    <div className="flex flex-col w-full" id="firm-page-root">
      <Seo 
        title="Naviter Wealth" 
        description="Naviter Wealth is an independent wealth management firm committed to helping you navigate your financial journey— utilizing best-in-class resources to provide bespoke solutions." 
      />
      {/* Hero Banner */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-naviter-navy">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/banner-video.mov" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-naviter-navy/20" />
        </div>

        {/* Centered Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="flex items-center justify-center -translate-y-36"
            >
              <img 
                src="/Naviter logo-blue-1.svg" 
                alt="Naviter Wealth Logo"
                className="h-20 md:h-32 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          
          {/* Bottom Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-24 text-center w-full px-6"
          >
            <h1 className="text-3xl md:text-5xl text-white font-serif leading-tight">
              Navigating Complexities via a Modular Family Office
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Section 1: our foundation & purpose */}
      <section id="foundation" className="relative pt-24 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/transition-image.png" 
            alt="Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">
              our foundation & purpose
            </h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="text-2xl md:text-3xl font-serif text-naviter-navy leading-[1.6] font-light max-w-4xl mx-auto"
          >
            As an independent, privately owned family office with a national footprint, our purpose is defined by our name. Derived from the Latin <span className="italic">navigare</span> (to navigate) and <span className="italic">iter</span> (journey), Naviter exists to do exactly that: actively guide your family through the complexities of significant wealth.
          </motion.p>
        </div>
      </section>

      {/* National Footprint Map */}
      <section className="pb-12 bg-white px-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            src="/Naviter Footprint.png" 
            alt="Naviter National Footprint"
            className="w-full h-auto max-w-3xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="pt-24 pb-24 bg-[#e5e5f0] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">
              our approach
            </h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="text-2xl md:text-3xl font-serif text-naviter-navy leading-[1.4] mb-12"
          >
            We view the families for whom we work not as clients but as partners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full aspect-video rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(21,67,114,0.12)] border border-naviter-navy/5 bg-black relative group text-left"
          >
            <div className="w-full h-full relative">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://naviterwealth.com/wp-content/uploads/2022/06/Naviter_final.mp4"
                controls
                playsInline
                preload="metadata"
                title="Naviter Wealth Video"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: our pillars */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 bg-background px-6 overflow-hidden">
        {/* Yellowstone Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533095036125-d059082269a2?q=80&w=2670&auto=format&fit=crop" 
            alt="Yellowstone National Park - Grand Prismatic Spring"
            className="w-full h-full object-cover opacity-40 grayscale-[20%] contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">
              our pillars
            </h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          </div>
          
          <div className="text-center mb-16 max-w-4xl px-6">
            <p className="text-2xl md:text-3xl font-serif text-naviter-navy mb-8">
              Integrity, Acumen, and Access.
            </p>
            <p className="text-lg md:text-xl font-sans text-naviter-navy/70 leading-relaxed max-w-3xl mx-auto">
              <span className="text-[#58aadb]">We believe these three pillars are the essential criteria every family should expect from their advisors.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 w-full max-w-6xl">
            {[
              {
                title: 'Integrity',
                icon: Shield,
                content: (
                  <>
                    With <span className="text-naviter-blue font-medium">deep reverence</span> for the trust placed in us, we are fiduciaries committed to serving your best interests. Approaching each decision with <span className="text-naviter-blue font-medium">humble confidence</span>, we take complete accountability as we navigate your financial journey—always doing the right thing, even when it is the hard thing.
                  </>
                )
              },
              {
                title: 'Acumen',
                icon: Brain,
                content: (
                  <>
                    For over 25 years, our team has served families who have accumulated significant wealth—this is what we do. Fueled by a <span className="text-naviter-blue font-medium">relentless drive</span> and the <span className="text-naviter-blue font-medium">pursuit of excellence</span>, we have built a core team of highly experienced and credentialed professionals dedicated to solving your unique complexities.
                  </>
                )
              },
              {
                title: 'Access',
                icon: Key,
                content: (
                  <>
                    We capitalize on decades of industry relationships to deliver the talented specialists, leading technology, and sophisticated strategies—resources often inaccessible to our competitors. Because we believe in <span className="text-naviter-blue font-medium">winning as a team</span>, we use these specialized resources to elevate and coordinate with valued advisors you may already have in place.
                  </>
                )
              }
            ].map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial="inactive"
                  whileInView="active"
                  whileHover="hover"                
                  viewport={{ once: false, margin: isMobile ? "0px 0px -30% 0px" : "-10% 0px" }}
                  variants={{
                    inactive: { opacity: 0, y: 60 },
                    active: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.6, delay: idx * 0.1 }
                    },
                    hover: {
                      opacity: 1,
                      y: 0
                    }
                  }}
                  className="relative flex flex-col items-center text-center pt-8 pb-12 px-8 md:px-12 bg-white transition-all duration-500 rounded-xl group cursor-default"
                >
                  <motion.div
                    variants={{
                      inactive: { y: 0, boxShadow: "0 20px 40px rgba(21,67,114,0.08)" },
                      active: { y: -10, boxShadow: "0 60px 120px rgba(21,67,114,0.35)" }
                    }}
                    className="w-full h-full absolute inset-0 rounded-xl pointer-events-none"
                  />
                  
                  {/* Pillar Icon */}
                  <motion.div 
                    variants={{
                      inactive: { backgroundColor: "rgba(88, 170, 219, 0.05)", color: "#154372" },
                      active: { backgroundColor: "#58aadb", color: "#ffffff" },
                      hover: { backgroundColor: "#ffffff", color: "#154372" }
                    }}
                    transition={{ duration: isMobile ? 1.2 : 0.5, delay: isMobile ? 0.8 : 0 }}
                    className="mb-8 p-5 rounded-full relative z-10"
                  >
                    <PillarIcon size={32} strokeWidth={1.5} />
                  </motion.div>
                  
                  <motion.h3 
                    variants={{
                      inactive: { color: "#154372" },
                      active: { color: "#58aadb" }
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-serif mb-10 relative z-10"
                  >
                    {pillar.title}
                  </motion.h3>
                  <p className="text-naviter-navy/70 leading-[1.8] font-sans text-base relative z-10">
                    {pillar.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bison Image (Spans the width of the screen) */}
      <section className="w-full overflow-hidden relative">
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="/floerke-cover-image-1.jpg" 
          alt="Bison in Winter"
          className="w-full h-[500px] md:h-[700px] object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Section 3: our framework */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-[#e5e5f0] px-6 text-naviter-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">
              our framework
            </h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          </div>
            <p className="text-2xl md:text-3xl font-serif max-w-4xl mx-auto leading-relaxed mb-16 text-center">
              We operationalize our guiding tagline—<span className="text-naviter-blue italic font-bold">Navigating Complexities via a Modular Family Office</span>—through a purposeful blueprint designed to manage your wealth. These five defining elements represent how we coordinate and deliver our expertise for your family:
            </p>
          
          <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
            {[
              { label: 'Navigating', desc: 'involves applying learned expertise and proven resources to solve the unique, evolving challenges of each client.' },
              { label: 'Complexities', desc: 'refers to the intricate, often overlapping financial and personal hurdles inherent to significant wealth—from tax inefficiencies and fragmented reporting to the nuances of multi-generational succession and business liquidity events.' },
              { label: 'Modular', desc: 'refers to our flexible service model where you choose the specific solutions you need, seamlessly integrating our capabilities alongside your long-standing, trusted advisors.' },
              { label: 'Family', desc: 'reflects our exclusive focus on serving multi-generational, ultra-high-net-worth families—particularly those managing wealth generated through significant liquidity events.' },
              { label: 'Office', desc: 'refers to our integrated approach to centrally coordinating and delivering solutions. We aggregate fragmented data across all your managers and entities, translating complexity into clear, comprehensive reporting that empowers swift and decisive decision-making.' }
            ].map((item, idx) => (
               <FrameworkItem key={item.label} item={item} idx={idx} />
            ))}
          </div>


          <motion.div 
            ref={buttonRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex justify-center pb-24"
          >
            <motion.button 
              onClick={onNavigateToServices}
              style={{ backgroundColor: isMobile ? buttonBgColor : "#154372" }}
              className="group relative inline-flex items-center gap-6 px-12 py-6 text-white overflow-hidden transition-all duration-500 rounded-sm"
            >
              <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore our services</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
