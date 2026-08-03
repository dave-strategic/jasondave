import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Scale, Landmark, BookOpen, Clock, 
  ArrowRight, Search, FileDown, CheckCircle2, 
  TrendingUp, Percent, ChevronRight, HelpCircle
} from 'lucide-react';
import { PolicyConstructionContent } from './PolicyConstructionContent';
import { StackedBarChart } from './StackedBarChart';
import { Seo } from './Seo';

export const PolicyStatement = ({ 
  onNavigateToContact, 
  onNavigateToFirm 
}: { 
  onNavigateToContact: () => void; 
  onNavigateToFirm: () => void; 
}) => {
  const [activeSection, setActiveSection] = useState('tenets');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeCards, setActiveCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const listener = (e: any) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  // Scroll listener to detect which cards are vertically centered in the viewport on mobile
  useEffect(() => {
    if (!isMobile) {
      setActiveCards({});
      return;
    }

    const handleScrollActiveCards = () => {
      const cards = document.querySelectorAll('.mobile-scroll-card');
      const viewportCenter = window.innerHeight / 2;
      const activeState: Record<string, boolean> = {};

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        
        // Define a viewport center trigger band (say when within 20% height of screen center)
        const threshold = window.innerHeight * 0.20;
        const distance = Math.abs(cardCenter - viewportCenter);
        
        const id = card.getAttribute('id');
        if (id) {
          activeState[id] = distance < threshold;
        }
      });

      setActiveCards(activeState);
    };

    handleScrollActiveCards();

    window.addEventListener('scroll', handleScrollActiveCards, { passive: true });
    window.addEventListener('resize', handleScrollActiveCards, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollActiveCards);
      window.removeEventListener('resize', handleScrollActiveCards);
    };
  }, [isMobile]);

  const handleViewportEnter = (id: string) => {
    // Scroll state handles active state on mobile
  };

  const handleViewportLeave = (id: string) => {
    // Scroll state handles active state on mobile
  };

  const getViewportConfig = (amountOnDesktop = 0.4) => ({
    once: false,
    margin: "0px",
    amount: amountOnDesktop
  });
  
  const sections = [
    { id: 'tenets', label: 'core tenets' },
    { id: 'construction', label: 'portfolio construction' },
    { id: 'changes', label: 'ongoing changes' },
    { id: 'fees', label: 'fee structure' },
    { id: 'definitions', label: 'definitions' }
  ];

  const tenets = [
    {
      title: "Own what we recommend to our clients.",
      desc: "In line with our view that the families for whom we work are partners, we want our financial interests to be aligned; we are in it together. This belief is foundational to the remaining tenets."
    },
    {
      title: "Apply our best thoughts, strategies, and resources to all relationships.",
      desc: "We have well-formed views on how to optimally manage wealth. These views are expressed consistently across all client relationships, customized to their individual objectives, risk tolerances, and time horizons."
    },
    {
      title: "Diversify intelligently.",
      desc: "The “diversity” that comes from owning the traditional style boxes (large-cap growth, large-cap value, mid-cap growth, etc.) is almost nonexistent due to their high correlation to one another. Simply owning more strategies should not be confused with diversifying away risk. One of the best ways to mitigate volatility is to own strategies that are truly lowly correlated to one another—which requires effort."
    },
    {
      title: "Concentrate portfolios into our highest conviction strategies.",
      desc: "We believe portfolios should own fewer, but higher quality strategies. Overdiversifying can dilute the results of your best-performing assets."
    },
    {
      title: "Drive investment costs lower.",
      desc: "While fees and expenses are necessary, care must be given to ensure proper value is received in return for those costs. We continually fight for lower costs, especially within traditional assets where differentiation and outperformance are difficult to obtain."
    },
    {
      title: "Taxes matter.",
      desc: "We understand that it is not what you make that counts, but what you keep. While we are careful not to let the “tax tail wag the investment dog,” we aggressively seek to minimize the impact of taxes. We rarely use mutual funds which are typically tax-insensitive. We systematically tax-loss harvest across our portfolios—typically monthly, generating meaningful “tax alpha.”"
    }
  ];

  const definitions = [
    {
      term: "Accredited Investor",
      def: "The SEC defines an accredited investor as either: 1) an individual with gross income exceeding $200,000 in each of the two most recent years or joint income with a spouse or partner exceeding $300,000 for those years and a reasonable expectation of the same income level in the current year or 2) a person whose individual net worth, or joint net worth with that person's spouse or partner, exceeds $1,000,000, excluding the person's primary residence."
    },
    {
      term: "Active Management",
      def: "Asset management where a portfolio manager makes buy, sell, and hold decisions with the goal of outperforming a market index or benchmark. The opposite of passive management."
    },
    {
      term: "Correlation",
      def: "The strength of a linear relationship between securities under the same market conditions. A correlation coefficient can be positive, negative, or zero (-1, 0, +1). A positive correlation indicates variables move in the same direction. A negative correlation indicates variables move in the opposite direction, an inverse relationship. A correlation of zero or close to zero indicates no linear relationship. These securities operate independent of one another regardless of market conditions."
    },
    {
      term: "Direct Indexing",
      def: "An investment strategy where an investor holds individual stocks that make up an index directly in their own account, instead of using a mutual fund or ETF to track the underlying index."
    },
    {
      term: "Lock-up",
      def: "A window of time when investors are not allowed to redeem or sell shares of a particular investment."
    },
    {
      term: "Passive Management",
      def: "Asset management where a portfolio manager mirrors the portfolio of a market index or benchmark. The opposite of active management."
    },
    {
      term: "Qualified Client",
      def: "An individual or entity that has either: 1) $1.1MM or more of assets under management with the investment advisor after the investment in the fund or 2) a net worth of $2.2MM prior to the investment in the fund (excluding the value of the investor's primary residence)."
    },
    {
      term: "Qualified Purchaser",
      def: "An individual or entity that can invest in securities investment products, like venture capital funds or private funds, because they meet specific sophistication thresholds set by the Investment Company Act of 1940. To qualify as an individual qualified purchaser, you must have an investment portfolio worth at least $5 million excluding your primary residence."
    },
    {
      term: "Separately Managed Account (SMA)",
      def: "A portfolio of securities managed by an investment firm on an investor's behalf and directly owned by the investor, unlike a mutual fund or Exchange Traded Fund (ETF)."
    },
    {
      term: "Tax Alpha",
      def: "Value-added after-tax returns due to utilizing tax-saving strategies."
    },
    {
      term: "Tax-Loss Harvesting",
      def: "Strategically taking losses on investments that have declined in value in order to offset current and future capital gains taxes."
    },
    {
      term: "Tracking Error",
      def: "A measure of the difference between the return fluctuations of an investment portfolio and the return fluctuations of a chosen benchmark."
    },
    {
      term: "Unconstrained",
      def: "An investment style that does not require a fund or portfolio manager to adhere to a specific benchmark."
    }
  ];

  // Auto-scrolling and active section spying
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const filteredDefinitions = definitions.filter(d => 
    d.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.def.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#fcfcfe] min-h-screen text-naviter-navy" id="policy-page-root">
      <Seo 
        title="Policy Statement - Naviter Wealth" 
        description="The Naviter Wealth Policy Statement describes our foundational beliefs, how we construct portfolios, the rationale behind those decisions, and our fee structure." 
      />
      {/* Decorative top spacer */}
      <div className="h-28 bg-naviter-navy" />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-b from-naviter-navy to-[#182a44] text-white md:py-20 py-12 px-6 relative overflow-hidden flex flex-col justify-center min-h-[calc(100vh-112px)] md:min-h-0">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/40 rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-12 tracking-tight">
              our policy statement
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-lg text-left shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          >
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue mb-4">
              The Purpose of This Document
            </h2>
            <p className="text-white/80 font-sans text-lg leading-relaxed font-light">
              The Naviter Wealth Policy Statement is designed to succinctly describe our foundational beliefs, how we construct portfolios, the rationale behind those decisions, and our fee structure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area - Beautifully Centered Single Column layout */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-32">
            
            {/* Section 1: Core Investment Tenets */}
            <section id="tenets" className="scroll-mt-28 space-y-12">
              <div className="border-b border-naviter-navy/10 pb-6">
                <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-naviter-blue font-bold mb-2">
                  Section 01
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-naviter-navy lowercase">
                  core investment tenets
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tenets.map((tenet, idx) => {
                  const cardId = `tenet-${idx}`;
                  const isActive = activeCards[cardId];
                  return (
                    <motion.div 
                      key={idx}
                      id={cardId}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={getViewportConfig(0.35)}
                      onViewportEnter={() => handleViewportEnter(cardId)}
                      onViewportLeave={() => handleViewportLeave(cardId)}
                      animate={isMobile && isActive ? { y: -8, scale: 1.01 } : { y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      whileHover={!isMobile ? { y: -8, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                      whileTap={{ scale: 0.98 }}
                      className={`mobile-scroll-card p-8 rounded-lg border shadow-sm transition-all duration-1000 flex flex-col justify-start relative group overflow-hidden cursor-pointer ${
                        isActive 
                          ? 'border-transparent text-white shadow-xl' 
                          : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-xl'
                      }`}
                    >
                      {/* Smooth Navy Background Transition overlay */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />

                      {/* Custom Naviter Box corner decoration */}
                      <div className={`absolute top-0 right-0 w-8 h-8 opacity-30 group-hover:opacity-100 transition-all duration-1000 pointer-events-none z-10 ${
                        isActive ? 'text-white opacity-100' : 'text-naviter-blue group-hover:text-white'
                      }`}>
                        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
                          <path d="M10 1.5 H18.5 V10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
                        </svg>
                      </div>

                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 font-sans text-sm font-semibold transition-all duration-1000 relative z-10 ${
                        isActive 
                          ? 'bg-naviter-blue text-white' 
                          : 'bg-naviter-navy/5 text-naviter-blue group-hover:bg-naviter-blue group-hover:text-white'
                      }`}>
                        0{idx + 1}
                      </div>

                      <h4 className={`text-xl font-serif leading-tight mb-4 transition-colors duration-1000 relative z-10 ${
                        isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                      }`}>
                        {tenet.title}
                      </h4>
                      <p className={`leading-relaxed text-sm font-sans transition-colors duration-1000 relative z-10 ${
                        isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/80'
                      }`}>
                        {tenet.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Section 2: Portfolio Construction */}
            <section id="construction" className="scroll-mt-28 space-y-16">
              <div className="border-b border-naviter-navy/10 pb-6">
                <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-naviter-blue font-bold mb-2">
                  Section 02
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-naviter-navy lowercase">
                  portfolio construction
                </h3>
              </div>

              {/* Subsection: Liquid vs Low-Liquidity Section */}
              <div className="bg-[#e5e5f0]/60 p-8 md:p-10 rounded-lg space-y-6 border border-naviter-navy/5">
                <h4 className="text-2xl font-serif text-naviter-navy">
                  Liquid Assets vs. Low-Liquidity Assets
                </h4>
                
                <p className="text-naviter-navy/80 leading-relaxed text-base font-sans">
                  Broadly we view investment assets in two categories: liquid assets and low-liquidity assets. Liquid assets are those that have daily liquidity while low-liquidity assets include assets with monthly and quarterly liquidity or assets with lock-ups.
                </p>
                <p className="text-naviter-navy/80 leading-relaxed text-base font-sans mt-4">
                  When low-liquidity assets are properly selected—with low correlations to liquid assets—their inclusion can have two long-term positive effects on a diversified portfolio:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-naviter-navy/80 font-sans">
                  <li>An increase in return</li>
                  <li>A decrease in volatility (risk)</li>
                </ul>
                <p className="text-naviter-navy/80 leading-relaxed text-base font-sans mt-4">
                  Given these benefits, the decision to include low-liquidity assets in a portfolio has less to do with risk preference and more to do with tolerance for illiquidity. Cash flow needs from the portfolio and investment time horizon are the primary factors in determining the proper balance between liquid and low-liquidity assets.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {(() => {
                    const cardId = 'sub-liq-0';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getViewportConfig(0.4)}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        className={`mobile-scroll-card p-6 rounded border shadow-sm transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'border-transparent text-white shadow-lg' 
                            : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-lg'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10">
                          <div className={`font-serif italic text-lg mb-3 transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-blue group-hover:text-white'
                          }`}>Long-term effects of selected alternative assets:</div>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 text-sm font-sans">
                              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 transition-colors duration-1000 ${
                                isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/80'
                              }`} />
                              <span className={`transition-colors duration-1000 ${isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'}`}>An increase in return</span>
                            </li>
                            <li className="flex items-start gap-2.5 text-sm font-sans">
                              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 transition-colors duration-1000 ${
                                isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/80'
                              }`} />
                              <span className={`transition-colors duration-1000 ${isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'}`}>A decrease in volatility (risk)</span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {(() => {
                    const cardId = 'sub-liq-1';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getViewportConfig(0.4)}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        className={`mobile-scroll-card p-6 rounded border shadow-sm transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'border-transparent text-white shadow-lg' 
                            : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-lg'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10">
                          <div className={`font-serif italic text-lg mb-3 transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-blue group-hover:text-white'
                          }`}>Primary Decisions:</div>
                          <p className={`text-sm font-sans leading-relaxed transition-colors duration-1000 ${
                            isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                          }`}>
                            Allocation between liquid and low-liquidity markets is determined primarily by cash flow needs from the portfolio and investment time horizon.
                          </p>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>

                <p className="text-naviter-navy/70 text-sm italic font-sans leading-relaxed">
                  Given these benefits, the decision to include low-liquidity assets in a portfolio has less to do with risk preference and more to do with tolerance for illiquidity.
                </p>
              </div>

              {/* Subsection: Liquid Assets Detail */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-naviter-blue" />
                  <h4 className="text-2xl font-serif text-naviter-navy">Liquid Assets</h4>
                </div>
                <p className="text-naviter-navy/80 leading-relaxed font-sans">
                  We view liquid assets in three categories: <strong className="text-naviter-navy">Equity</strong>, <strong className="text-naviter-navy">Fixed income</strong>, and <strong className="text-naviter-navy">Liquid alternatives</strong>.
                  The common characteristic is that each of these has at least daily, if not intraday liquidity, i.e., the ability to be sold quickly for cash.
                </p>
                <p className="text-naviter-navy/85 leading-relaxed font-sans">
                  We have created portfolio allocations for three preset risk profiles—conservative, moderate, and aggressive. Note that due to the expected returns and low correlation to equities and fixed income, the liquid alternatives are a static 40% regardless of the risk profile. Equity allocations increase and fixed income allocations decrease as risk tolerance increases.
                </p>

                <StackedBarChart />

                <div className="bg-white rounded-lg border border-naviter-navy/5 p-6 space-y-4">
                  <div className="text-xs uppercase font-sans tracking-[0.25em] text-naviter-blue font-bold">Liquid Allocation Options:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans">
                    <div className="p-4 bg-[#fcfufe] border border-naviter-navy/5">
                      <strong className="text-naviter-navy font-semibold">Decisions:</strong> Selection from pre-designed, liquid asset allocations for conservative, moderate, and aggressive profiles.
                    </div>
                    <div className="p-4 bg-[#fcfufe] border border-naviter-navy/5">
                      <strong className="text-naviter-navy font-semibold">Customizations:</strong> Clients are not limited to pre-designed allocations and may design their own blend of liquid markets.
                    </div>
                  </div>
                </div>

                {/* Sub-sub-sections */}
                <div className="space-y-6 pt-4">
                  {(() => {
                    const cardId = 'strategy-0';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getViewportConfig(0.4)}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.5 }}
                        className={`mobile-scroll-card p-6 border-l-4 border-naviter-blue shadow-sm space-y-4 transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-naviter-navy hover:shadow-xl hover:text-white'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10 space-y-4">
                          <h5 className={`text-lg font-serif transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                          }`}>Equities Strategy</h5>
                          <p className={`text-sm leading-relaxed font-sans transition-colors duration-1000 ${
                            isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                          }`}>
                            We view global equities as one asset class, utilizing <strong className={`transition-colors duration-1000 ${isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'} font-semibold`}>Direct Indexing</strong> instead of traditional mutual funds/ETFs. Direct Indexing owns underlying constituents directly, enabling index replication while systematically tax-loss harvesting (typically monthly). This generates historically between 75-100 basis points of after-tax economic benefit ("tax alpha").
                          </p>
                          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs font-sans uppercase tracking-wider font-semibold transition-colors duration-1000 ${
                            isActive ? 'text-white/70' : 'text-naviter-navy/60 group-hover:text-white/70'
                          }`}>
                            <div className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 shrink-0 transition-colors duration-1000 ${isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/85'}`}/> Reduced Costs</div>
                            <div className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 shrink-0 transition-colors duration-1000 ${isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/85'}`}/> Passive Efficiency</div>
                            <div className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 shrink-0 transition-colors duration-1000 ${isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/85'}`}/> Tax Alpha Benefit</div>
                          </div>
                          <div className={`text-xs font-sans italic border-t pt-2 transition-colors duration-1000 ${
                            isActive ? 'text-white/60 border-white/10' : 'text-naviter-navy/50 group-hover:text-white/60 border-naviter-navy/5'
                          }`}>
                            Customizations: Standard allocation is 60/40 U.S./International; ESG/SRI overlays; dynamic screening overlays available.
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {(() => {
                    const cardId = 'strategy-1';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getViewportConfig(0.4)}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`mobile-scroll-card p-6 border-l-4 border-naviter-blue shadow-sm space-y-4 transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-naviter-navy hover:shadow-xl hover:text-white'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10 space-y-4">
                          <h5 className={`text-lg font-serif transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                          }`}>Fixed Income Strategy</h5>
                          <p className={`text-sm leading-relaxed font-sans transition-colors duration-1000 ${
                            isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                          }`}>
                            We believe active management produces the best risk-adjusted returns in fixed income. Our allocation is managed by a single institutional manager through a “Core-Plus” portfolio, which we access through a separately managed account (SMA) structure. SMAs allow clients to hold individual fixed income securities directly, enabling tax-loss harvesting and custom credit parameters.
                          </p>
                          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-sans uppercase tracking-wider font-semibold transition-colors duration-1000 ${
                            isActive ? 'text-white/70' : 'text-naviter-navy/60 group-hover:text-white/70'
                          }`}>
                            <div className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 shrink-0 transition-colors duration-1000 ${isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/85'}`}/> SMA Advantages</div>
                            <div className="flex items-center gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 shrink-0 transition-colors duration-1000 ${isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/85'}`}/> Lower Fees than Mutual Funds</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {(() => {
                    const cardId = 'strategy-2';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={getViewportConfig(0.4)}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`mobile-scroll-card p-6 border-l-4 border-naviter-blue shadow-sm space-y-4 transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'text-white shadow-xl' 
                            : 'bg-white text-naviter-navy hover:shadow-xl hover:text-white'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10 space-y-4">
                          <h5 className={`text-lg font-serif transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                          }`}>Liquid Alternatives Strategy</h5>
                          <p className={`text-sm leading-relaxed font-sans transition-colors duration-1000 ${
                            isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                          }`}>
                            Complimentary investments with daily/intraday liquidity representing golden rules, commodities, MLPs, REITs, or tactical cash to express timely market themes. Implemented primarily through liquid vehicles like ETFs and individual SMAs.
                          </p>
                          <div className={`text-xs font-sans italic border-t pt-2 transition-colors duration-1000 ${
                            isActive ? 'text-white/60 border-white/10' : 'text-naviter-navy/50 group-hover:text-white/60 border-naviter-navy/5'
                          }`}>
                            Customizations: Allocations can be fully customized, or individual alternatives removed.
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </div>

              {/* Subsection: Low-Liquidity Assets Detail */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-naviter-blue" />
                  <h4 className="text-2xl font-serif text-naviter-navy">Low-Liquidity Assets</h4>
                </div>
                <p className="text-naviter-navy/80 leading-relaxed font-sans">
                  We define this set of strategies as “low-liquidity” assets rather than illiquid assets, as they each have varying degrees of liquidity, but are all less liquid than traditional investments. Two of the primary reasons for owning these alternative assets are <strong className="text-naviter-navy">increased returns</strong> and <strong className="text-naviter-navy">lower volatility (risk)</strong> relative to traditional investments.
                </p>

                <div className="bg-naviter-navy/5 p-6 rounded border border-naviter-navy/5 space-y-4 text-sm font-sans">
                  <div className="text-xs uppercase font-sans tracking-[0.25em] text-naviter-navy font-bold">Ownership Philosophy & Parameters:</div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-naviter-navy/80 list-none p-0 m-0">
                    <li className="flex items-start gap-2">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>Target returns for alternative assets should be higher than long-term equity returns (10%+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>Alternative assets should have low correlation to traditional markets and other portfolio alternatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>Strategy is not easily replicated in a cheaper or more liquid way</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>Qualitative operational due diligence performed on all strategies</span>
                    </li>
                  </ul>
                </div>

                <div className="text-xs font-sans text-naviter-navy/50 italic leading-relaxed pt-2">
                  Customizations: Select from 200+ other alternative strategies with due diligence prepared ($2.5MM minimum investment) or request custom third-party qualitative operational due diligence ($25,000 additional fee).
                </div>
              </div>

              {/* Subsection: Other */}
              <div className="space-y-4 pt-4 border-t border-naviter-navy/10">
                <h4 className="text-lg font-serif text-naviter-navy">Other Portfolios</h4>
                <p className="text-sm font-sans text-naviter-navy/70 leading-relaxed">
                  Client-driven trading portfolios, restricted or control stock, and large concentrated positions can easily be accommodated and may be considered in developing allocations. These positions may be excluded for billing and performance purposes in most cases.
                </p>
              </div>
            </section>

            {/* Section 3: Ongoing Portfolio Changes */}
            <section id="changes" className="scroll-mt-28 space-y-12">
              <div className="border-b border-naviter-navy/10 pb-6">
                <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-naviter-blue font-bold mb-2">
                  Section 03
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-naviter-navy lowercase">
                  ongoing portfolio changes
                </h3>
              </div>

              <div className="space-y-8 text-sm font-sans">
                {(() => {
                  const cardId = 'changes-0';
                  const isActive = activeCards[cardId];
                  return (
                    <motion.div 
                      id={cardId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={getViewportConfig(0.4)}
                      onViewportEnter={() => handleViewportEnter(cardId)}
                      onViewportLeave={() => handleViewportLeave(cardId)}
                      animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                      whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className={`mobile-scroll-card p-8 rounded border shadow-sm transition-all duration-1000 group cursor-pointer space-y-4 relative overflow-hidden ${
                        isActive 
                          ? 'border-transparent text-white shadow-xl' 
                          : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-xl'
                      }`}
                    >
                      {/* Smooth Navy Background Transition overlay */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />

                      <div className="relative z-10 space-y-4">
                        <h4 className={`text-xl font-serif transition-colors duration-1000 ${
                          isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                        }`}>Asset Allocation Changes</h4>
                        <p className={`leading-relaxed transition-colors duration-1000 ${
                          isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                        }`}>
                          Once a portfolio has been fully deployed, allocations between liquid assets and low-liquidity assets may change for two reasons:
                        </p>
                        <ul className={`list-disc pl-6 space-y-2 transition-colors duration-1000 ${
                          isActive ? 'text-white/80' : 'text-naviter-navy/70 group-hover:text-white/80'
                        }`}>
                          <li>A change in the client’s cash flow needs, objectives, etc.</li>
                          <li>Drift due to return differences between liquid assets and low-liquidity assets</li>
                        </ul>
                        <p className={`leading-relaxed transition-colors duration-1000 ${
                          isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                        }`}>
                          Within liquid allocations, drift bands trigger systematic rebalancing back to initial targets. Tactical weightings are customized surrounding market conditions or risk profiling shifts.
                        </p>
                      </div>
                    </motion.div>
                  );
                })()}

                {(() => {
                  const cardId = 'changes-1';
                  const isActive = activeCards[cardId];
                  return (
                    <motion.div 
                      id={cardId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={getViewportConfig(0.4)}
                      onViewportEnter={() => handleViewportEnter(cardId)}
                      onViewportLeave={() => handleViewportLeave(cardId)}
                      animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                      whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className={`mobile-scroll-card p-8 rounded border shadow-sm transition-all duration-1000 group cursor-pointer space-y-4 relative overflow-hidden ${
                        isActive 
                          ? 'border-transparent text-white shadow-xl' 
                          : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-xl'
                      }`}
                    >
                      {/* Smooth Navy Background Transition overlay */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />

                      <div className="relative z-10 space-y-4">
                        <h4 className={`text-xl font-serif transition-colors duration-1000 ${
                          isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                        }`}>Strategy Additions & Removals</h4>
                        <p className={`leading-relaxed transition-colors duration-1000 ${
                          isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                        }`}>
                          Our Investment Committee (IC) continually searches for new opportunities and reviews current portfolio holdings. After thorough research, the IC will vote on recommended additions or replacements of current managers where better vehicles exist.
                        </p>
                      </div>
                    </motion.div>
                  );
                })()}

                {(() => {
                  const cardId = 'changes-2';
                  const isActive = activeCards[cardId];
                  return (
                    <motion.div 
                      id={cardId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={getViewportConfig(0.4)}
                      onViewportEnter={() => handleViewportEnter(cardId)}
                      onViewportLeave={() => handleViewportLeave(cardId)}
                      animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                      whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className={`mobile-scroll-card p-8 rounded border shadow-sm transition-all duration-1000 group cursor-pointer space-y-4 relative overflow-hidden ${
                        isActive 
                          ? 'border-transparent text-white shadow-xl' 
                          : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-xl'
                      }`}
                    >
                      {/* Smooth Navy Background Transition overlay */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />

                      <div className="relative z-10 space-y-4">
                        <h4 className={`text-xl font-serif transition-colors duration-1000 ${
                          isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                        }`}>Trading Elements</h4>
                        <p className={`leading-relaxed transition-colors duration-1000 ${
                          isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                        }`}>
                          Three types of trading occur regularly across the portfolio:
                        </p>
                        <ul className={`list-disc pl-6 space-y-2 transition-colors duration-1000 ${
                          isActive ? 'text-white/80' : 'text-naviter-navy/70 group-hover:text-white/80'
                        }`}>
                          <li>Manager-directed trades within separately managed accounts (SMAs)</li>
                          <li>Tax-loss harvesting across the liquid assets</li>
                          <li>Trades surrounding client contributions or withdrawals</li>
                        </ul>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </section>

            {/* Section 4: Fee Structure */}
            <section id="fees" className="scroll-mt-28 space-y-12">
              <div className="border-b border-naviter-navy/10 pb-6">
                <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-naviter-blue font-bold mb-2">
                  Section 04
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-naviter-navy lowercase">
                  fee structure
                </h3>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-lg border border-naviter-navy/5 shadow-sm space-y-8 font-sans">
                <p className="text-naviter-navy leading-relaxed text-base">
                  Clients have the option of either a tiered or performance-based fee schedule. Full details of both structures are available on our Form ADV.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {(() => {
                    const cardId = 'fee-0';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        viewport={getViewportConfig(0.4)}
                        className={`mobile-scroll-card p-6 border rounded flex flex-col justify-between transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'border-transparent text-white shadow-lg' 
                            : 'bg-[#fcfcfe] border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-lg'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10">
                          <h4 className={`text-xl font-serif mb-2 transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                          }`}>Tiered Fee Schedule</h4>
                          <p className={`text-xs leading-relaxed transition-colors duration-1000 ${
                            isActive ? 'text-white/80' : 'text-naviter-navy/60 group-hover:text-white/80'
                          }`}>
                            Assets under management are billed quarterly on a tiered percentage structure, aligning advisory fees to overall portfolio scale.
                          </p>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {(() => {
                    const cardId = 'fee-1';
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        id={cardId}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        viewport={getViewportConfig(0.4)}
                        className={`mobile-scroll-card p-6 border rounded flex flex-col justify-between transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'border-transparent text-white shadow-lg' 
                            : 'bg-[#fcfcfe] border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-lg'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10">
                          <h4 className={`text-xl font-serif mb-2 transition-colors duration-1000 ${
                            isActive ? 'text-white' : 'text-naviter-navy group-hover:text-white'
                          }`}>Performance Fee Schedule</h4>
                          <p className={`text-xs leading-relaxed mb-4 transition-colors duration-1000 ${
                            isActive ? 'text-white/80' : 'text-naviter-navy/60 group-hover:text-white/80'
                          }`}>
                            Performance-linked fee structures under specific incentive standards. Available exclusively to Qualified Clients.
                          </p>
                          <div className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-1000 ${
                            isActive ? 'text-naviter-blue/80' : 'text-naviter-blue group-hover:text-naviter-blue/80'
                          }`}>
                            Requires Qualified Client Status
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>

                <div className="border-t border-naviter-navy/10 pt-6 space-y-4">
                  <h4 className="text-lg font-serif text-naviter-navy">Additional Fee Notes:</h4>
                  <ul className="space-y-3 font-sans text-sm text-naviter-navy/70">
                    <li className="flex items-start gap-2.5">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>We are not compensated by external manager products or placement agents.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>We are not compensated differently based on changing client allocations, strategies, or specific managers.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-naviter-blue font-bold">•</span>
                      <span>Any expense reductions or negotiated pricing advantages we secure are passed directly on to our families.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Definitions */}
            <section id="definitions" className="scroll-mt-28 space-y-12">
              <div className="border-b border-naviter-navy/10 pb-6">
                <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-naviter-blue font-bold mb-2">
                  Section 05
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-naviter-navy lowercase">
                  definitions
                </h3>
              </div>

              {/* Definitions Search Filter */}
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-naviter-navy/40 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search terms (e.g. SMA, Direct Indexing, Tax alpha...)"
                    className="w-full pl-12 pr-6 py-4 bg-white border border-naviter-navy/10 rounded-lg text-sm font-sans placeholder-naviter-navy/40 focus:outline-none focus:ring-1 focus:ring-naviter-blue focus:border-naviter-blue transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDefinitions.map((def, idx) => {
                    const cardId = `definition-${idx}`;
                    const isActive = activeCards[cardId];
                    return (
                      <motion.div 
                        key={idx}
                        id={cardId}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onViewportEnter={() => handleViewportEnter(cardId)}
                        onViewportLeave={() => handleViewportLeave(cardId)}
                        animate={isMobile && isActive ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
                        whileHover={!isMobile ? { y: -6, scale: 1.01, transition: { duration: 0.25 } } : undefined}
                        whileTap={{ scale: 0.98 }}
                        viewport={getViewportConfig(0.4)}
                        transition={{ duration: 0.4, delay: Math.min((idx % 4) * 0.1, 0.4) }}
                        className={`mobile-scroll-card p-6 rounded-lg border shadow-sm transition-all duration-1000 group cursor-pointer relative overflow-hidden ${
                          isActive 
                            ? 'border-transparent text-white shadow-xl' 
                            : 'bg-white border-naviter-navy/5 text-naviter-navy hover:border-transparent hover:text-white hover:shadow-xl'
                        }`}
                      >
                        {/* Smooth Navy Background Transition overlay */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />

                        <div className="relative z-10 space-y-3">
                          <h4 className="text-lg font-serif font-semibold flex items-center gap-2 transition-colors duration-1000">
                            <HelpCircle className={`w-4 h-4 shrink-0 transition-colors duration-1000 ${
                              isActive ? 'text-white' : 'text-naviter-blue group-hover:text-naviter-blue/80'
                            }`} />
                            <span>{def.term}</span>
                          </h4>
                          <p className={`text-sm font-sans leading-relaxed transition-colors duration-1000 ${
                            isActive ? 'text-white/85' : 'text-naviter-navy/70 group-hover:text-white/85'
                          }`}>
                            {def.def}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                  {filteredDefinitions.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-naviter-navy/40 font-sans text-sm italic">
                      No definitions found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              </div>
            </section>

               {/* Explore Our Firm Box (consistent with other pages) */}
            {(() => {
              const cardId = 'explore-card';
              const isActive = activeCards[cardId];
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  onViewportEnter={() => handleViewportEnter(cardId)}
                  onViewportLeave={() => handleViewportLeave(cardId)}
                  viewport={getViewportConfig(0.4)}
                  transition={{ delay: 0.3 }}
                  className="mt-16 flex justify-center pb-12"
                >
                  <motion.button 
                    id={cardId}
                    onClick={onNavigateToFirm}
                    animate={isMobile && isActive ? { scale: 1.05 } : { scale: 1 }}
                    className={`mobile-scroll-card group relative inline-flex items-center gap-6 px-12 py-6 overflow-hidden transition-all duration-1000 rounded-sm cursor-pointer border ${
                      isMobile 
                        ? isActive 
                          ? 'border-transparent text-white shadow-xl' 
                          : 'bg-white border-naviter-navy/10 text-naviter-navy shadow-sm'
                        : 'bg-[#154372] text-white border-transparent'
                    }`}
                  >
                    <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore our firm</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    
                    {/* Hover gold layer */}
                    <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
                    
                    {/* Mobile active navy overlay */}
                    {isMobile && (
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br from-naviter-navy to-[#111e30] transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })()}

        </div>
      </div>
    </div>
  );
};
