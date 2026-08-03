import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, ShieldCheck, Scale, HeartHandshake, 
  HandCoins, Landmark, FileText, PieChart,
  Target, TrendingUp, Users, Network,
  Lock, Globe, Handshake, LayoutDashboard,
  Shuffle, LayoutGrid, Grid3x3, ArrowRight,
  Plus, Minus, Workflow
} from 'lucide-react';

// Style: Complexity Grid Cards
const ComplexityGridCard = ({ comp, idx, isOpen, onToggle, onExplore }: { comp: any, idx: number, isOpen: boolean, onToggle: () => void, onExplore?: () => void, key?: string }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onToggle}
      className={`bg-[#e5e5f0] p-8 rounded-lg flex flex-col justify-start min-h-[340px] border border-transparent cursor-pointer hover:border-[#154372]/20 transition-all duration-300 relative ${isOpen ? 'ring-2 ring-[#154372]' : ''}`}
    >
       <div className="flex justify-between items-start">
         <div className="text-[#154372]">
            {comp.icon}
         </div>
         <div className="text-[#58aadb]">
            {isOpen ? <Minus className="w-5 h-5"/> : <Plus className="w-5 h-5"/>}
         </div>
       </div>
       <h4 className="text-2xl font-serif text-[#154372] leading-tight mt-6 mb-6">
         {comp.title}
       </h4>
       
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="w-full space-y-4 mb-6"
           >
             {comp.questions.map((q: string, qIdx: number) => (
               <p key={qIdx} className="text-[#154372] font-serif italic text-xl md:text-lg leading-relaxed border-b border-[#154372]/10 pb-2 last:border-b-0">
                 "{q}"
               </p>
             ))}
           </motion.div>
         )}
       </AnimatePresence>

       <div className="mt-auto pt-6 border-t border-[#154372]/10 flex items-center justify-between">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onExplore?.();
            }}
            className="flex items-center gap-2 text-[#58aadb] text-sm font-sans italic hover:text-[#154372] transition-colors cursor-pointer"
          >
            explore related content <ArrowRight className="w-3 h-3"/>
          </button>
       </div>
    </motion.div>
  );
};

const PremiumOfferingsAccordion = ({ offerings }: { offerings: any[] }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number | null>(null);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : clickedIdx;

  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const handlePanelClick = (idx: number) => {
    if (clickedIdx === idx) {
      setClickedIdx(null);
    } else {
      setClickedIdx(idx);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Horizontal Accordion Layout */}
      <div className="hidden lg:flex w-full h-[650px] gap-2 items-stretch">
        {offerings.map((offering, idx) => {
          const isExpanded = activeIdx === idx;
          const isAnyExpanded = activeIdx !== null;

          return (
            <div
              key={offering.title}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handlePanelClick(idx)}
              className={`relative h-full rounded-xl overflow-hidden cursor-pointer group select-none ${
                isExpanded 
                  ? 'flex-[24] shrink-0' 
                  : 'flex-[1] shrink-0' // Adjusting width for closed panels
              } transition-all duration-700 ease-in-out`}
            >
              {/* Collapsed Spine (The looking-like-the-image part) */}
              <div 
                className={`absolute inset-0 bg-[#0f2035] flex flex-col items-center justify-between py-10 px-2 transition-all duration-500 border border-white/10 rounded-xl ${
                    isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col items-center justify-between pt-4 pb-2 px-2 pointer-events-none relative z-10">
                  <div className="[writing-mode:vertical-rl] rotate-180 text-white font-serif tracking-[0.2em] text-sm font-medium text-center uppercase">
                     {offering.title}
                  </div>
                </div>
                <div className="pb-8 relative z-10">
                   <Plus className="w-6 h-6 text-white/60" />
                </div>
              </div>

              {/* Active Expanded State (Keep existing expanded content) */}
              {isExpanded && (
                <div className="absolute inset-0">
                  {/* Background Image Layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${offering.image})` }} 
                  />
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-[#0f2035]/80" />
                  
                  {/* Content */}
                  <div className="relative z-10 p-12 flex flex-col h-full justify-between select-text">
                    <div className="flex items-center gap-6">
                        <div className="text-[#58aadb]">{offering.icon}</div>
                        <div className="flex justify-between items-start w-full">
                            <h3 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-tight lowercase">
                                {offering.title}
                            </h3>
                            <button className="text-white/50 hover:text-white">x</button>
                        </div>
                    </div>
                    <div className="w-full h-px bg-white/20 mt-0 mb-4" />
                    <p className="text-white/85 font-serif italic text-2xl leading-relaxed antialiased">
                        "{offering.description}"
                    </p>
                    <div className="w-full h-px bg-white/20 my-6" />
                    <div className="space-y-4 mt-6">
                        {offering.features.map((feature: string, fIdx: number) => (
                            <div key={fIdx} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#58aadb] shrink-0" />
                                <span className="text-white/80 text-lg font-sans tracking-[0.05em] font-medium leading-none">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-12">
                      <button className="flex items-center gap-3 text-[#58aadb] font-serif text-base italic group/cta cursor-pointer hover:text-white transition-colors duration-300 pointer-events-auto">
                        explore related publications <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile/Tablet Premium Vertical Accordion Layout */}
      <div className="lg:hidden flex flex-col gap-4 w-full">
        {offerings.map((offering, idx) => {
          const isMobileOpen = mobileActiveIdx === idx;
          return (
            <div 
              key={offering.title}
              onClick={() => setMobileActiveIdx(isMobileOpen ? null : idx)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/10 shadow-lg ${
                isMobileOpen ? 'h-[520px]' : 'h-[100px]'
              }`}
            >
              {/* Background Layer */}
              <div 
                className={`absolute inset-0 bg-[#0f2035] transition-all duration-700 ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${offering.image})` }}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-[#154372]/30 transition-colors duration-500" />
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-all duration-700 ${
                  isMobileOpen ? 'from-black/98 via-black/60 to-[#154372]/20' : 'from-black/85 via-black/45'
                }`}
              />

              {/* Layout Container */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between h-full z-10">
                {/* Header view (always active) */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="text-[#58aadb]">{offering.icon}</div>
                    <h3 className="text-base md:text-lg font-serif text-white uppercase tracking-wider font-semibold leading-none pt-0.5">
                      {offering.title}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 backdrop-blur-sm transition-all duration-300 ${
                    isMobileOpen ? 'bg-white text-naviter-navy border-white' : ''
                  }`}>
                    <Plus className={`w-4 h-4 transition-transform duration-500 ${isMobileOpen ? 'rotate-45' : ''}`} />
                  </div>
                </div>

                {/* Expanded content view */}
                <div className={`transition-all duration-500 ease-out flex flex-col justify-end ${
                  isMobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto mt-4' : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'
                }`}>
                  <div className="space-y-4">
                    <p className="text-white/90 font-serif italic text-base md:text-lg leading-relaxed pt-2">
                      "{offering.description}"
                    </p>

                    <div className="space-y-2 border-t border-white/10 pt-4">
                      <p className="text-[9px] font-mono tracking-[0.2em] font-bold text-[#58aadb] uppercase">inherent capabilities</p>
                      <div className="space-y-2 pl-1">
                        {offering.features.map((feature: string, fIdx: number) => (
                          <div key={fIdx} className="flex items-center gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#58aadb] shrink-0" />
                            <span className="text-white/80 text-[10px] font-sans tracking-[0.14em] font-medium leading-none">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button className="flex items-center gap-2 text-[#58aadb] font-serif text-sm italic hover:text-white transition-colors duration-300">
                        coordinate offering
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">SECURE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const OurServices = ({ onNavigateToTeam, onNavigateToLibraryWithComplexity }: { onNavigateToTeam: () => void, onNavigateToLibraryWithComplexity?: (complexity: string) => void }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const complexes = [
    { 
      title: 'Optimizing Portfolio Returns', 
      icon: <BarChart3 className="w-8 h-8" />,
      questions: [
        "Is our current asset allocation optimized for today's market conditions?",
        "How should I effectively access and allocate to private markets?",
        "What should I do to protect my portfolio in difficult markets?"
      ]
    },
    { 
      title: 'Mitigating Taxes', 
      icon: <ShieldCheck className="w-8 h-8" />,
      questions: [
        "Are we utilizing the most tax-efficient investing and asset structure strategies?",
        "How can I reduce post-transaction taxes after the sale of my business?",
        "What can I do to minimize taxes on my ordinary income?"
      ]
    },
    { 
      title: 'Strategic Wealth Transfer', 
      icon: <Landmark className="w-8 h-8" />,
      questions: [
        "How do we construct a succession plan that prevents family conflict?",
        "What are the best structures to minimize estate and gift taxes?",
        "Are there ways to make gifts and still maintain control of the assets?"
      ]
    },
    { 
      title: 'Family Governance and Continuity', 
      icon: <Network className="w-8 h-8" />,
      questions: [
        "How do we educate future generations for responsible wealth stewardship?",
        "How can we reduce family conflict over decision-making?",
        "What is the best process for defining and codifying our family's values and mission statement?"
      ]
    },
    { 
      title: 'Asset Protection & Risk Management', 
      icon: <Lock className="w-8 h-8" />,
      questions: [
        "Are our assets properly insulated from potential future creditors?",
        "How can we utilize insurance to provide tax-free liquidity for future estate tax liabilities?",
        "Is our current level of personal and business insurance coverage sufficient?"
      ]
    },
    { 
      title: 'Philanthropic Endeavors', 
      icon: <Globe className="w-8 h-8" />,
      questions: [
        "How can we best align our charitable giving with our core values?",
        "What giving structure best maximizes our tax efficiency and impact?",
        "How can we involve younger generations in our giving decisions to create a family legacy?"
      ]
    },
    { 
      title: 'Business Transactions and Post-Liquidity Integration', 
      icon: <Handshake className="w-8 h-8" />,
      questions: [
        "What pre-transaction planning is essential to ensure a successful business sale?",
        "How should we best manage and invest the sudden, large influx of cash post-liquidity?",
        "How do I navigate the significant change to my personal identity after a sale?"
      ]
    },
    { 
      title: 'Consolidated Financial Reporting', 
      icon: <LayoutDashboard className="w-8 h-8" />,
      questions: [
        "How can we consolidate all my financial data from different custodians and assets into a single view?",
        "How do I ensure all of my financial service providers are utilizing the same data?",
        "What key benchmarks should we track to support informed decision-making?"
      ]
    },
  ];

  const offerings = [
    { 
      title: 'Investment management',
      icon: <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We construct customized, multi-asset portfolios focused on risk-adjusted returns, providing direct access to institutional-grade alternative investments and private markets.',
      features: ['Tax-efficient direct indexing', 'Negotiated private market access', 'Strategic co-investments ($5MM minimum)'],
      image: '/accordions/D523C4B2-1DD8-B71B-0B5DB9B6085AC60AOriginal.jpg'
    },
    { 
      title: 'Specialized Direct Investments',
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We provide qualified ultra-high-net-worth investors with access to private direct partnerships and tax-structured vehicles, precisely engineered to mitigate tax drag while targeting meaningful growth.',
      features: ['GP Drilling Funds', 'Qualified Opportunity Zone Funds', '1031-to-Fund ($5MM minimum)'],
      image: '/accordions/D6C983F0-1DD8-B71B-0BA4FE3A6EC70B12Original.jpg'
    },
    { 
      title: 'Portfolio lending',
      icon: <HandCoins className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We design strategic liquidity solutions that allow you to capitalize on time-sensitive opportunities or manage cash flow without disrupting your core investment allocations.',
      features: ['Securities-based lines of credit', 'Institutional lending rates', 'Tax-efficient liquidity structuring'],
      image: '/accordions/b0e6301f-f4bd-4604-b8a3-f2b9ed7a14efOriginal.jpg'
    },
    { 
      title: 'Performance reporting & data aggregation',
      icon: <PieChart className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We deliver a single, unified view of your entire financial ecosystem, consolidating data from multiple global custodians, private partnerships, and personal assets into one clear picture.',
      features: ['Dynamic PFS', 'Secure digital document vault', 'Entity-level performance reporting'],
      image: '/accordions/d0707b4b-933d-409a-9834-34ef2312a4e5Original.jpg'
    },
    { 
      title: 'Trust services',
      icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We provide strategic oversight and coordination of complex trust structures through Naviter Trust to ensure asset protection, fiduciary compliance, and seamless multi-generational wealth transfer.',
      features: ['Corporate trustee coordination', 'Fiduciary governance & compliance', 'Consolidated trust reporting & record-keeping'],
      image: '/accordions/e368f64b-37e3-42a3-a713-a350cb110a1aOriginal.jpg'
    },
    { 
      title: 'Tax advisory',
      icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We collaborate seamlessly with your incumbent tax team or tap into our network of highly vetted specialists to synchronize your tax planning across complex business transactions, private assets, and your core investment portfolio.',
      features: ['Pre-transaction tax planning', 'Entity structure optimization', 'Balance-sheet-wide tax mitigation'],
      image: '/accordions/3B9DD1B3-1DD8-B71B-0BE91DDAD78C92B6Original.jpg'
    },
    { 
      title: 'Estate planning',
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We lead the coordination of your legal and financial teams to codify your legacy, bridging the gap between complex legal structures and your family values.',
      features: ['Strategic wealth transfer', 'Business succession', 'Multi-generational legacy governance'],
      image: '/accordions/93cec478-3db6-4512-850f-ceac2c5516d9Original.jpg'
    },
    { 
      title: 'Life Insurance',
      icon: <HeartHandshake className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We utilize sophisticated insurance architectures to generate tax-free liquidity for estate obligations, secure legacy wealth replacement, and maximize the compounding of alternative assets.',
      features: ['Policy audits', 'Estate liquidity planning', 'Private Placement Life Insurance (PPLI)'],
      image: '/accordions/5b9f3721-1765-41c9-80c8-76f25b61ac7cOriginal.jpg'
    },
    { 
      title: 'P&C insurance',
      icon: <Lock className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We coordinate comprehensive risk management frameworks to safeguard your most valuable tangible assets—from global real estate and private aviation to fine art collections and maritime holdings.',
      features: ['Global multi-property asset protection', 'Excess liability and umbrella policies', 'Kidnap, ransom, and cyber security protection'],
      image: '/accordions/2FE4D971-1DD8-B71B-0BDF899563177D28Original.jpg'
    },
    { 
      title: 'Philanthropy & legacy giving',
      icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We guide your family through the intentional design and execution of your charitable vision, aligning your wealth with your core values to create a multi-generational impact.',
      features: ['Vehicle & structure advisory', 'Private market DAF integration', 'Mission statement drafting & grant making oversight'],
      image: '/accordions/0D474396-1DD8-B71B-0B044F9E71D87C38Original.jpg'},
    { 
      title: 'Family Governance & Education',
      icon: <Workflow className="w-5 h-5 md:w-6 md:h-6" />,
      description: 'We prepare the next generation for successful wealth stewardship, delivering the educational tools and structural governance required to ensure long-term family continuity.',
      features: ['Family constitutions & governance', 'Family investment policy statements (IPS)', 'Digital educational libraries & interactive workshops'],
      image: '/Grand-Teton.png'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Header */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-naviter-navy">
        {/* Grand Canyon Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/moraine-lake-3840x2160-13486 (1).jpg" 
            alt="Mountain Landscape"
            className="w-full h-full object-cover scale-105 opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-naviter-navy/5" />
        </div>

        {/* Bottom Centered Heading */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="absolute bottom-24 text-center w-full px-6 z-10"
        >
          <h1 className="text-3xl md:text-5xl text-white font-serif leading-tight">
            Our Modular Family Office
          </h1>
        </motion.div>
      </section>

      {/* Section 1: our clients’ complexities */}
      <section className="pt-16 pb-0 md:pt-24 md:pb-0 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our clients’ complexities</h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
            <p className="text-2xl md:text-3xl font-serif text-naviter-navy max-w-4xl mx-auto leading-relaxed mb-6">
              With significant wealth comes increased complexity. The <span className="text-[#58aadb] italic font-bold">Complexities</span> our clients commonly face include:
            </p>
          </div>

          {/* Complexities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative max-w-7xl mx-auto items-start animate-fade-in py-12">
            {complexes.map((comp, idx) => (
              <ComplexityGridCard 
                key={comp.title} 
                comp={comp} 
                idx={idx} 
                isOpen={openIdx === idx}
                onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                onExplore={() => {
                  if (onNavigateToLibraryWithComplexity) {
                    onNavigateToLibraryWithComplexity(comp.title);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-16 w-screen -mx-6">
            <img src="/yosemite-national-park-sunrise-tunnel-view-beautiful-sky-3840x216.jpg" alt="Mountain Landscape" className="w-full h-[500px] md:h-[600px] object-cover" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Section 2: our modular offerings */}
      <section className="relative pt-12 pb-32 md:pt-16 md:pb-48 px-6 overflow-hidden bg-naviter-navy/5">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our modular offerings</h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
            <p className="text-2xl md:text-3xl font-serif text-naviter-navy max-w-4xl mx-auto leading-relaxed">
              To solve these challenges, our <span className="text-[#58aadb] italic font-bold">Modular</span> approach allows clients to build a customized suite of solutions, selecting only the specific services they require:
            </p>
          </div>

          <PremiumOfferingsAccordion offerings={offerings} />
        </div>
      </section>

      {/* Section 3: our coordinated execution */}
      <section className="relative pt-16 pb-32 md:pt-24 md:pb-48 bg-naviter-navy text-white px-6 overflow-hidden">
        {/* Yellowstone Background */}
        <div className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://images.unsplash.com/photo-1533119480266-50560a0b9e38?q=80&w=2670&auto=format&fit=crop" 
            alt="Yellowstone National Park"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-naviter-navy/20" />
        </div>
        
        {/* Astrolabe Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img 
            src="/Astrolabe.jpeg" 
            alt="Astrolabe"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our coordinated execution</h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-serif leading-[1.6] font-light italic text-white/90">
                Our fiduciary responsibility extends to every solution we provide. We recognize that significant wealth requires an ecosystem of specialists. Whether we are deploying Naviter’s proprietary capabilities or seamlessly integrating alongside the trusted legal, corporate, and tax advisors you already have in place, we act as your central <span className="text-[#58aadb] italic font-bold">Office.</span>
              </p>
              <p className="text-2xl md:text-3xl font-serif leading-[1.6] font-light italic text-white/90">
                By bridging the gap between fragmented disciplines, we coordinate and execute your strategy with absolute objectivity—ensuring your entire team moves in lockstep toward your family's objectives.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      <section className="bg-[#e5e5f0] pt-16 pb-24 px-6">
          <div className="max-w-4xl mx-auto flex justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <motion.button 
                onClick={onNavigateToTeam}
                initial={{ backgroundColor: "#58aadb" }}
                whileInView={{ backgroundColor: "#154372" }}
                transition={{ duration: 0.6 }}
                className="group relative inline-flex items-center gap-6 px-12 py-6 text-white overflow-hidden transition-all duration-500 rounded-sm hover:bg-naviter-navy"
                >
                <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore our team</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
            </motion.div>
          </div>
      </section>
      
    </div>
  );
};
