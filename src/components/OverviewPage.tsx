import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  Shield, 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Layers, 
  Coins, 
  ArrowLeft, 
  ArrowUpRight, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Smartphone,
  Sparkles,
  LayoutGrid,
  Presentation,
  Sliders,
  DollarSign,
  Scale,
  Lightbulb,
  Key,
  BadgeAlert,
  Info,
  Briefcase,
  Printer,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface TeamMemberBio {
  name: string;
  title: string;
  phone: string;
  email: string;
  bullets: string[];
}

const BIOS_DATA: TeamMemberBio[] = [
  {
    name: "Bentley Blackmon, CFA®, CFP®, CPA (inactive)",
    title: "Chief Executive Officer",
    phone: "501-333-9800",
    email: "bblackmon@naviterwealth.com",
    bullets: [
      "BA, magna cum laude, Accounting, Business Administration, Economics, Ouachita Baptist University, 1994",
      "MBA, Webster University, 1998",
      "CFA, Chartered Financial Analyst",
      "CFP®, CERTIFIED FINANCIAL PLANNER",
      "CPA, Certified Public Accountant (inactive)",
      "CEPA, Certified Exit Planning Advisor (inactive)",
      "Morgan Stanley, 1995–2003",
      "Stephens Inc., 2003–2020",
      "Joined Naviter Wealth, 2021"
    ]
  },
  {
    name: "Phillip Worthen",
    title: "President",
    phone: "501-333-9801",
    email: "pworthen@naviterwealth.com",
    bullets: [
      "BA, Business Administration, Biology, Ouachita Baptist University, 1994",
      "Doctor Veterinary Medicine, Louisiana State University, 2001",
      "Alltel, 1994–1996",
      "Wyeth Pharmaceuticals, 2002–2008",
      "Stephens Inc., 2008–2021",
      "Joined Naviter Wealth, 2021"
    ]
  },
  {
    name: "Katie McDaniel, CFP®, CPA",
    title: "Managing Director",
    phone: "501-333-9656",
    email: "kmcdaniel@naviterwealth.com",
    bullets: [
      "BA, magna cum laude, Accounting, Finance, Benedictine College, 2018",
      "CFP®, CERTIFIED FINANCIAL PLANNER",
      "CPA, Certified Public Accountant",
      "Federal Reserve Bank of Kansas City, 2018–2021",
      "Joined Naviter Wealth, 2021"
    ]
  },
  {
    name: "Jordan Bauer, CFP®, CPA",
    title: "Chief Operating Officer",
    phone: "501-333-9804",
    email: "jbauer@naviterwealth.com",
    bullets: [
      "BBA, Accounting, University of Central Arkansas, 2011",
      "CFP®, CERTIFIED FINANCIAL PLANNER",
      "CPA, Certified Public Accountant",
      "Practice Plus, 2011–2012",
      "Stephens Inc., 2012–2021",
      "Joined Naviter Wealth, 2021"
    ]
  },
  {
    name: "John Kornet, CFP®",
    title: "Chief Investment Officer",
    phone: "501-333-9803",
    email: "jkornet@naviterwealth.com",
    bullets: [
      "BA, summa cum laude, Business Administration, Ouachita Baptist University, 2014",
      "CFP®, CERTIFIED FINANCIAL PLANNER",
      "Stephens Inc., 2014–2021",
      "Completed Stephens Wealth Analyst Program",
      "Joined Naviter Wealth, 2021"
    ]
  },
  {
    name: "Nicole Hobbs, CPA",
    title: "Senior Tax Strategist",
    phone: "501-333-9800",
    email: "nhobbs@naviterwealth.com",
    bullets: [
      "BBA, Accounting, University of Central Arkansas, 2007",
      "Master of Accountancy with Emphasis in Tax, University of Central Arkansas, 2008",
      "Certified Public Accountant",
      "JPMS Cox, 2008–2017",
      "HCJ CPAs & Advisors, 2017–2025",
      "Joined Naviter Wealth, 2025"
    ]
  },
  {
    name: "Jackson Ratcliff",
    title: "Managing Director & Head of Advisory Services",
    phone: "501-333-9800",
    email: "jratcliff@naviterwealth.com",
    bullets: [
      "BSBA, Economics, Transportation & Logistics, University of Arkansas, Fayetteville, 2010",
      "Garrison Financial, 2008–2010",
      "Noble Corporation, 2010–2011",
      "Stephens Inc., 2011–2023",
      "Joined Naviter Wealth, 2023"
    ]
  },
  {
    name: "Grant Stevenson",
    title: "Managing Director",
    phone: "501-333-9800",
    email: "gstevenson@naviterwealth.com",
    bullets: [
      "BSBA, Finance, University of Arkansas, 2019",
      "Stephens Inc., Corporate Finance, 2019–2024",
      "Joined Naviter Wealth, 2024"
    ]
  },
  {
    name: "Trevor Booth",
    title: "Managing Director",
    phone: "501-333-9800",
    email: "tbooth@naviterwealth.com",
    bullets: [
      "BSBA, Finance, University of Arkansas, 2021",
      "AcreTrader, 2019–2024",
      "Joined Naviter Wealth, 2024"
    ]
  },
  {
    name: "Matt Estes",
    title: "Managing Director",
    phone: "501-333-9861",
    email: "mestes@naviterwealth.com",
    bullets: [
      "BA, Zoology, University of Arkansas, 1985",
      "Dean Witter, 1987–1989",
      "Stephens Inc., 1989–2011",
      "Morgan Stanley, 2012–2017",
      "Sowell Management, 2017–2020",
      "Level Four Financial, 2021–2025",
      "Joined Naviter Wealth, 2025"
    ]
  },
  {
    name: "Blane Brooks",
    title: "Affiliate Program Director",
    phone: "501-333-9751",
    email: "bbrooks@naviterwealth.com",
    bullets: [
      "BA, Economics, Sewanee, 1983",
      "Drexel Burnham Lambert, 1986–1989",
      "Robinson Humphrey, 1989–1993",
      "JC Bradford & Co., 1993–2000",
      "First Union Securities, 2000–2001",
      "Stillpoint Advisor, 2001–2006",
      "Fisher Investments, 2007–2020",
      "FinTrust Capital Advisors, 2020–2025",
      "Joined Naviter Wealth, 2025"
    ]
  },
  {
    name: "Danny Russell",
    title: "Chief Compliance Officer",
    phone: "501-333-9805",
    email: "drussell@naviterwealth.com",
    bullets: [
      "BBA, Financial Services and Risk Management, University of Arkansas – Little Rock, 2014",
      "MBA, University of Central Arkansas, 2020",
      "Licensed in Life and Property and Casualty Insurance",
      "Stephens Inc., 2015–2021",
      "Joined Naviter Wealth, 2021"
    ]
  },
  {
    name: "Blake Abston, CFP®",
    title: "Senior Financial Analyst",
    phone: "501-333-9802",
    email: "babston@naviterwealth.com",
    bullets: [
      "Finance B.S.B.A. with Concentration in Financial Management and Investment, Walton College of Business, University of Arkansas, 2019",
      "CERTIFIED FINANCIAL PLANNER™",
      "Licensed in Life & Health Insurance",
      "Encompass Financial Partners, 2019",
      "Garland & Greenwood Wealth Advisors, LLC, 2022",
      "Joined Naviter Wealth, 2023"
    ]
  },
  {
    name: "Carter Robinson",
    title: "Financial Analyst",
    phone: "501-333-9800",
    email: "crobinson@naviterwealth.com",
    bullets: [
      "BBA, Accounting & Finance, summa cum laude, Oklahoma Christian University, 2025",
      "Joined Naviter Wealth, 2024"
    ]
  },
  {
    name: "Noah Smith",
    title: "Financial Analyst",
    phone: "501-333-9752",
    email: "nsmith@naviterwealth.com",
    bullets: [
      "BBA, Finance, University of Central Arkansas, 2024",
      "First Arkansas Bank & Trust, 2023",
      "Joined Naviter Wealth, 2025"
    ]
  }
];

export function OverviewPage({
  onNavigateToFirm,
  onNavigateToContact,
}: {
  onNavigateToFirm: () => void;
  onNavigateToContact: () => void;
}) {
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('slides');
  const [currentSlide, setCurrentSlide] = useState(0);

  const chunkedBios = [];
  for (let i = 0; i < BIOS_DATA.length; i += 4) {
    chunkedBios.push(BIOS_DATA.slice(i, i + 4));
  }
  const [activeAllocation, setActiveAllocation] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [activeSuiteType, setActiveSuiteType] = useState<'core' | 'network'>('core');
  const [hoveredSuiteNode, setHoveredSuiteNode] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showIframePrintModal, setShowIframePrintModal] = useState(false);
  const [onScreenPrintPreview, setOnScreenPrintPreview] = useState(false);

  // Google Slides Live Integration States
  const [googleSlidesMode, setGoogleSlidesMode] = useState(false);
  const [googleSlidesUrl, setGoogleSlidesUrl] = useState('https://docs.google.com/presentation/d/1vNszf7_Vb3p6x8G1h9T3n7j2eUoBAnvjUv-I7l8q36Y/edit?usp=sharing');
  const [slideImages, setSlideImages] = useState<string[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(false);
  const [slideLoadError, setSlideLoadError] = useState<string | null>(null);
  const [gSlideCurrent, setGSlideCurrent] = useState(0);
  const [slideRenderingProgress, setSlideRenderingProgress] = useState<{ current: number, total: number } | null>(null);

  const loadGoogleSlides = async (urlOrId: string) => {
    const clean = urlOrId.trim();
    if (!clean) {
      setSlideLoadError("Please enter a valid Google Slides URL or Presentation ID.");
      return;
    }
    
    setLoadingSlides(true);
    setSlideLoadError(null);
    setSlideRenderingProgress(null);
    
    // Parse presentation ID
    let presentationId = '';
    if (!clean.includes('/') && clean.length > 15) {
      presentationId = clean;
    } else {
      const pubMatch = clean.match(/\/presentation\/d\/e\/([a-zA-Z0-9-_]+)/);
      if (pubMatch && pubMatch[1]) {
        presentationId = pubMatch[1];
      } else {
        const stdMatch = clean.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
        if (stdMatch && stdMatch[1]) {
          presentationId = stdMatch[1];
        }
      }
    }
    
    if (!presentationId) {
      setSlideLoadError("Could not extract a valid Presentation ID from the provided link. Ensure it contains /presentation/d/[ID]/...");
      setLoadingSlides(false);
      return;
    }
    
    const loadPdfjs = () => {
      return new Promise<any>((resolve, reject) => {
        if ((window as any).pdfjsLib) {
          resolve((window as any).pdfjsLib);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
        script.onload = () => {
          const pdfjsLib = (window as any).pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          resolve(pdfjsLib);
        };
        script.onerror = () => {
          reject(new Error("Failed to load PDF engine. Check connection or DNS."));
        };
        document.body.appendChild(script);
      });
    };
    
    try {
      const pdfjsLib = await loadPdfjs();
      const proxyUrl = `/api/proxy-slides-pdf?id=${presentationId}`;
      console.log("[Google Slides Integration] Fetching PDF payload via server:", proxyUrl);
      
      const loadingTask = pdfjsLib.getDocument({ url: proxyUrl });
      const pdfDoc = await loadingTask.promise;
      
      console.log(`[Google Slides Integration] Loaded PDF document with ${pdfDoc.numPages} pages.`);
      const images: string[] = [];
      
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        setSlideRenderingProgress({ current: pageNum, total: pdfDoc.numPages });
        const page = await pdfDoc.getPage(pageNum);
        
        // 1.5x scale offers gorgeous clarity on all devices (high quality print/screen)
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error("Canvas context construction failure.");
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        images.push(canvas.toDataURL('image/png'));
      }
      
      setSlideImages(images);
      setGSlideCurrent(0);
      setGoogleSlidesMode(true);
      setLoadingSlides(false);
    } catch (err: any) {
      console.error("[Google Slides Exception]", err);
      setSlideLoadError(err.message || "Failed to parse Google Slides. Verify that 'Anyone with the link can view' is turned on (sharing permissions) or 'Publish to web' has been configured.");
      setLoadingSlides(false);
    }
  };

  const handlePrint = () => {
    const isIframe = window.self !== window.top;
    if (isIframe) {
      setShowIframePrintModal(true);
    } else {
      try {
        window.print();
      } catch (e) {
        console.error("Direct printing failed, showing print helper modal", e);
        setShowIframePrintModal(true);
      }
    }
  };

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'slides') return;
      
      if (googleSlidesMode && slideImages.length > 0) {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
          setGSlideCurrent(prev => (prev < slideImages.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowLeft') {
          setGSlideCurrent(prev => (prev > 0 ? prev - 1 : prev));
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentSlide, googleSlidesMode, slideImages, gSlideCurrent]);

  const slides = [
    {
      id: 'cover',
      title: 'Naviter Wealth Overview',
      subtitle: 'Q2 2026',
      category: 'Cover',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-16 text-naviter-navy relative overflow-hidden bg-white">
          <div className="flex justify-between items-center border-b border-naviter-navy/15 pb-6">
            <span className="font-mono text-xs tracking-[0.4em] font-extrabold text-[#111e30]/40">NAVITER WEALTH RECORD</span>
            <img src="/Naviter logo-blue-1.svg" alt="Naviter Wealth" className="h-10 w-auto" referrerPolicy="no-referrer" />
          </div>

          <div className="my-auto space-y-8 max-w-4xl pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-naviter-gold/10 text-naviter-gold border border-naviter-gold/20 font-sans text-[10px] uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Deck Edition
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-[1.05] text-[#111e30]">
              Naviter Wealth <span className="text-naviter-blue font-light italic">Overview</span>
            </h1>
            <div className="h-1 w-32 bg-naviter-gold" />
            <p className="font-serif italic text-lg text-naviter-navy/70">
              A comprehensive digital blueprint of our fiduciary model, proprietary allocation framework, and boutique alternative sourcing pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-naviter-navy/15 pt-8 font-sans">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#111e30]/50 mb-1">Author & Advisor</p>
              <h4 className="font-serif text-base font-bold text-[#111e30]">Bentley Blackmon, CFA®, CFP®, CPA (inactive)</h4>
              <p className="text-xs text-naviter-blue mt-0.5">Chief Executive Officer</p>
            </div>
            <div className="text-left md:text-right text-xs text-naviter-navy/60 leading-relaxed">
              <p>1 Information Way, Suite 400 • Little Rock, AR 72202</p>
              <p>501-333-9800 • www.naviterwealth.com</p>
              <p className="font-semibold text-naviter-gold mt-1 font-mono text-[10px]">VERIFIED Q2 2026</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'intro',
      title: 'Introduction to Naviter Wealth',
      category: 'Introduction',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-16 text-[#e5e5f0] relative overflow-hidden bg-gradient-to-br from-[#111e30] to-naviter-navy">
          {/* Decorative SVG */}
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none w-96 h-96">
            <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="28" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="flex justify-between items-center border-b border-white/10 pb-6 relative z-10">
            <span className="font-mono text-xs tracking-[0.3em] font-bold text-naviter-gold">SECTION I</span>
            <img src="/Naviter logo-white-1.svg" alt="Naviter Wealth" className="h-10 w-auto" referrerPolicy="no-referrer" />
          </div>

          <div className="my-auto max-w-3xl space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
              Introduction to <span className="text-naviter-gold">Naviter Wealth</span>
            </h2>
            <div className="h-[2px] w-24 bg-naviter-gold" />
            <p className="text-sm md:text-base leading-relaxed text-white/85 font-sans">
              Formed as an independent, privately-owned boutique registered investment advisor (RIA), Naviter Wealth operates under a pure fiduciary standard. We construct bespoke, institutional-caliber asset allocations for families with significant wealth, heavily integrating structural alternative assets with direct indexing mechanisms.
            </p>
          </div>

          <div className="flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest text-white/40 border-t border-white/10 pt-6">
            <span>Naviter Key Tenet</span>
            <span>INTEGRITY • ACUMEN • ACCESS</span>
          </div>
        </div>
      )
    },
    {
      id: 'summary',
      title: 'Executive Summary',
      category: 'Introduction',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-naviter-navy/10 pb-4">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Naviter Wealth Executive Summary</h3>
            <span className="text-[10px] font-mono font-bold text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">SLIDE 03</span>
          </div>

          <div className="my-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
            {/* Our Team */}
            <div className="bg-slate-50/50 p-6 rounded border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-slate-200/60 pb-2">
                  <span className="text-naviter-blue"><Users className="w-5 h-5" /></span>
                  <h4 className="font-serif text-base font-bold text-naviter-navy uppercase tracking-wider">Our Team</h4>
                </div>
                <ul className="space-y-2 text-xs text-naviter-navy/80 leading-relaxed font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-blue font-bold text-base leading-none mt-0.5">•</span>
                    <span>Formed from the largest Private Client Group team at a major regional investment bank, managing highly complex family dynamics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-blue font-bold text-base leading-none mt-0.5">•</span>
                    <span><strong>Highly credentialed experts</strong>: 3 CPAs, 6 CFPs, 1 CFA, 2 MBAs, 1 CEPA, and 1 Doctor of Veterinary Medicine (DVM).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-blue font-bold text-base leading-none mt-0.5">•</span>
                    <span>Designed primarily as a comprehensive service engine rather than a business development sales force.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-blue font-bold text-base leading-none mt-0.5">•</span>
                    <span>Direct partner alignment: 24/7 availability with the entire ensemble team engaging on every capital decision.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Firm */}
            <div className="bg-[#111e30]/5 p-6 rounded border border-naviter-navy/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-naviter-navy/10 pb-2">
                  <span className="text-naviter-gold"><Shield className="w-5 h-5" /></span>
                  <h4 className="font-serif text-base font-bold text-[#111e30] uppercase tracking-wider">Our Firm</h4>
                </div>
                <ul className="space-y-2 text-xs text-naviter-navy/80 leading-relaxed font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-gold font-bold text-base leading-none mt-0.5">•</span>
                    <span>Pure, unbiased fiduciary alignment free from broker-dealer conflicts and proprietary product sale targets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-gold font-bold text-base leading-none mt-0.5">•</span>
                    <span>Heavily specialized alternative investment platform encompassing private hedge, real estate, and co-invest lines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-gold font-bold text-base leading-none mt-0.5">•</span>
                    <span>Over 1,700 SMA strategies, seamless trust integration through Naviter Trust, and nationwide insurance services.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-naviter-gold font-bold text-base leading-none mt-0.5">•</span>
                    <span>Securities-backed competitive lending networks with institutional pricing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-naviter-navy/40 font-mono italic text-center">
            * All stats reflect active operational metrics as of Q2 2026 disclosures.
          </p>
        </div>
      )
    },
    {
      id: 'why-formed',
      title: 'Why We Formed Naviter Wealth',
      category: 'Introduction',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-[#fafafc] relative">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Why We Formed Naviter Wealth</h3>
            <span className="text-[10px] font-mono text-naviter-navy/40">ALIGNMENT OVER SALES</span>
          </div>

          <div className="my-auto max-w-4xl space-y-6 py-4">
            <h4 className="font-serif text-xl md:text-2xl font-semibold leading-relaxed text-[#111e30] border-l-4 border-naviter-gold pl-4">
              "Traditional banks and brokerage firms have become too focused on scale, sales, and cross-selling proprietary products to objectively serve your needs."
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs text-naviter-navy/70 leading-relaxed">
              <div className="space-y-4">
                <p>
                  <strong>Internal Constraints of Large Firms</strong>: Wirehouses and regional banks inherently prioritize regional targets, internal product distribution channels, and scale. This corporate focus heavily restricts their advisors' ability to act flexibly, often requiring lengthy oversight committees for bespoke opportunities.
                </p>
                <p>
                  <strong>Fiduciary Status (RIAs vs Brokered Dealers)</strong>: Fee-only Registered Investment Advisors operate under a perpetual legal fiduciary standard. Traditional broker-dealers are only bound to standard suitability requirements.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <strong>Objectivity as a Practice</strong>: Objective planning requires a clean slate—free of secondary broker commissions, internal banking quotas, and investment product incentives. By removing corporate hierarchies, we select best-in-class third-party managers purely based on performance.
                </p>
                <p>
                  <strong>Holistic Multi-Family Scope</strong>: We designed our independent firm to provide multi-family support spanning custom taxes, alternative due diligence, entity optimization, and generational wealth transition under a single boutique structure.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-naviter-blue tracking-wider flex items-center justify-between border-t border-slate-200 pt-4">
            <span>SOLVING BROKER-DEALER FRICTIONS</span>
            <span>NAVITER WEALTH BLUEPRINT</span>
          </div>
        </div>
      )
    },
    {
      id: 'purpose',
      title: 'Our Purpose & Brand',
      category: 'Our Identity',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Our Purpose</h3>
            <span className="text-[10px] text-naviter-gold font-mono font-bold">BRAND SIGNIFICANCE</span>
          </div>

          <div className="my-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {/* Naviter Name */}
            <div className="p-6 border border-slate-100 rounded bg-[#111e30]/5 text-left flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#111e30] text-naviter-gold flex items-center justify-center mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#111e30] mb-2 uppercase">The Name Naviter</h4>
                <p className="text-xs text-naviter-navy/70 leading-relaxed font-sans">
                  Our name is a direct combination of two distinct Latin terms: <strong>navigare</strong> (to navigate, command a ship) and <strong>iter</strong> (a journey, a path). It stands as our legal and cultural pledge to navigate your family's complex generational wealth path with extreme focus.
                </p>
              </div>
            </div>

            {/* Fulfilling Purpose */}
            <div className="p-6 border border-slate-100 rounded bg-slate-50 text-left flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-full bg-naviter-blue text-white flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#111e30] mb-2 uppercase">Families as Partners</h4>
                <p className="text-xs text-naviter-navy/70 leading-relaxed font-sans">
                  We reject the standard broker-customer paradigm. Our clients are our absolute partners, sharing the same operational goals. We are deeply committed to absolute transparency across alternative underwriting, custody, and fee reporting.
                </p>
              </div>
            </div>

            {/* Our Service Scope */}
            <div className="p-6 border border-slate-100 rounded bg-[#111e30]/5 text-left flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-full bg-naviter-gold text-[#111e30] flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#111e30] mb-2 uppercase">Wealth Ecosystem</h4>
                <p className="text-xs text-naviter-navy/70 leading-relaxed font-sans">
                  Our comprehensive suite spans institutional asset management, liquidity structures, estate flowcharts, CPA tax coordination, and risk transfer. We align with families as a single-source private office or integrate with your current external professionals.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-naviter-navy/40 font-mono text-center">
            Latin Roots: <em>Navigare</em> (Navigate) + <em>Iter</em> (Journey) = Trusted Fiduciary Guide
          </p>
        </div>
      )
    },
    {
      id: 'suite-services',
      title: 'Our Suite of Services',
      category: 'Services',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Comprehensive Suite of Services</h3>
            <div className="flex bg-slate-100 rounded-sm p-1 gap-1">
              <button 
                onClick={() => setActiveSuiteType('core')} 
                className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded transition-all cursor-pointer ${
                  activeSuiteType === 'core' ? 'bg-[#111e30] text-white shadow-sm' : 'text-naviter-navy/60 hover:text-naviter-navy'
                }`}
              >
                Core Services
              </button>
              <button 
                onClick={() => setActiveSuiteType('network')} 
                className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded transition-all cursor-pointer ${
                  activeSuiteType === 'network' ? 'bg-naviter-gold text-white shadow-sm' : 'text-naviter-navy/60 hover:text-naviter-navy'
                }`}
              >
                Network Services
              </button>
            </div>
          </div>

          <div className="my-auto py-4">
            <p className="text-[11px] md:text-xs font-sans text-naviter-navy/80 max-w-4xl leading-relaxed mb-6">
              Our fiduciary responsibility extends far beyond traditional stock and bond portfolios. We offer directly integrated <strong>Core services</strong> paired with a heavily vetted <strong>Network of professionals</strong> to synthesize absolute tax, estate, and structural planning with your investment assets.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {activeSuiteType === 'core' ? (
                <>
                  <div className="p-5 border border-[#111e30]/10 rounded bg-[#111e30]/5 text-left hover:border-naviter-blue transition-all duration-300">
                    <span className="text-naviter-blue font-mono font-bold text-xs uppercase block mb-2">01. Service</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Asset Management</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Institutional wealth construction utilizing global liquid assets, active/passive separately managed accounts (SMAs), and direct indexing structures.
                    </p>
                  </div>
                  <div className="p-5 border border-[#111e30]/10 rounded bg-[#111e30]/5 text-left hover:border-naviter-blue transition-all duration-300">
                    <span className="text-naviter-blue font-mono font-bold text-xs uppercase block mb-2">02. Service</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Banking & Lending</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Structured loans, lines of credit, margin optimization, and competitive securities-backed cash platforms through top-tier partner banks.
                    </p>
                  </div>
                  <div className="p-5 border border-[#111e30]/10 rounded bg-[#111e30]/5 text-left hover:border-naviter-blue transition-all duration-300">
                    <span className="text-naviter-blue font-mono font-bold text-xs uppercase block mb-2">03. Service</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Trust Administration</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Consolidated estate, trust execution, and direct structural integration under our fiduciary umbrella via Naviter Trust resources.
                    </p>
                  </div>
                  <div className="p-5 border border-[#111e30]/10 rounded bg-[#111e30]/5 text-left hover:border-naviter-blue transition-all duration-300">
                    <span className="text-naviter-blue font-mono font-bold text-xs uppercase block mb-2">04. Service</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Risk Management</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Vetted risk transfer planning covering personal lines, property and casualty, cyber liability, and highly tailored life insurance.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-5 border border-naviter-gold/20 rounded bg-naviter-gold/5 text-left hover:border-naviter-gold transition-all duration-300">
                    <span className="text-naviter-gold font-mono font-bold text-xs uppercase block mb-2">01. Network</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Tax & Accounting</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Direct synchronization with elite CPAs, comprehensive pass-through audits, custom entity filings, and multi-state tax reporting.
                    </p>
                  </div>
                  <div className="p-5 border border-naviter-gold/20 rounded bg-naviter-gold/5 text-left hover:border-naviter-gold transition-all duration-300">
                    <span className="text-naviter-gold font-mono font-bold text-xs uppercase block mb-2">02. Network</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Corporate Finance</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Strategic business advisory, capital structuring, exit strategy planning, valuations, and corporate succession support.
                    </p>
                  </div>
                  <div className="p-5 border border-naviter-gold/20 rounded bg-naviter-gold/5 text-left hover:border-naviter-gold transition-all duration-300">
                    <span className="text-naviter-gold font-mono font-bold text-xs uppercase block mb-2">03. Network</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Family Office</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Concierge billing, customized travel insurance audit, luxury asset protection, and continuous family governance education.
                    </p>
                  </div>
                  <div className="p-5 border border-naviter-gold/20 rounded bg-naviter-gold/5 text-left hover:border-naviter-gold transition-all duration-300">
                    <span className="text-naviter-gold font-mono font-bold text-xs uppercase block mb-2">04. Network</span>
                    <h5 className="font-serif text-sm font-semibold text-[#111e30] mb-2 uppercase">Estate Planning</h5>
                    <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                      Elite legal network collaboration for generation-skipping trusts, structural entity formation, and major charitable allocations.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="text-[10px] font-mono text-naviter-navy/55 tracking-wide flex justify-between border-t border-slate-100 pt-4">
            <span>UNIFYING CLIENT ECOSYSTEM</span>
            <span>INTEGRATED NETWORK ARROWS FRAMEWORK</span>
          </div>
        </div>
      )
    },
    {
      id: 'pillars',
      title: 'Our Platform Pillars',
      category: 'Our Identity',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-[#fafafc]">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Naviter Platform Pillars</h3>
            <span className="text-[10px] font-mono font-semibold text-naviter-blue tracking-widest">3 CORE ATTRIBUTES</span>
          </div>

          <div className="my-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {/* Integrity */}
            <div className="bg-white p-6 rounded border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#111e30]">
                  <Scale className="w-6 h-6 text-naviter-gold" />
                  <h4 className="font-serif text-base font-bold uppercase tracking-wider">Integrity</h4>
                </div>
                <p className="text-xs text-naviter-navy/70 leading-relaxed font-sans">
                  "We are fiduciaries committed to serving your best interests. Our team members are conscientious and thoughtful about each decision made on your behalf—always accepting accountability for those decisions. We do the right thing—even when it is the hard thing."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[9px] uppercase tracking-widest text-[#111e30]/50 font-bold">
                Pure Legal Fiduciary Standard
              </div>
            </div>

            {/* Acumen */}
            <div className="bg-white p-6 rounded border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#111e30]">
                  <Lightbulb className="w-6 h-6 text-naviter-blue" />
                  <h4 className="font-serif text-base font-bold uppercase tracking-wider">Acumen</h4>
                </div>
                <p className="text-xs text-naviter-navy/70 leading-relaxed font-sans">
                  "For over 25 years our team has serviced families who have accumulated significant assets. We have continually aligned highly credentialed and knowledgeable professionals with our team to address the complex needs of the families we serve."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[9px] uppercase tracking-widest text-[#111e30]/50 font-bold">
                Extreme Professional Credentials
              </div>
            </div>

            {/* Access */}
            <div className="bg-white p-6 rounded border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[#111e30]">
                  <Key className="w-6 h-6 text-naviter-gold" />
                  <h4 className="font-serif text-base font-bold uppercase tracking-wider">Access</h4>
                </div>
                <p className="text-xs text-naviter-navy/70 leading-relaxed font-sans">
                  "We capitalize on many years of relationships across the financial industry to access the highest quality professionals, technology, investment strategies and other resources—many of which are inaccessible by our competitors."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 font-mono text-[9px] uppercase tracking-widest text-[#111e30]/50 font-bold">
                Exclusive Sourced Pipelines
              </div>
            </div>
          </div>

          <div className="text-[10px] text-naviter-navy/40 font-mono text-center">
            Integrity • Acumen • Access | The Foundation of Naviter Wealth
          </div>
        </div>
      )
    },
    {
      id: 'tenets',
      title: 'Core Investment Tenets',
      category: 'Investment',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Core Investment Tenets</h3>
            <span className="text-[10px] font-mono text-naviter-gold font-bold">SECTION II: INVESTMENT THEORY</span>
          </div>

          <div className="my-auto py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-150 rounded bg-[#111e30]/5">
                <div className="font-serif font-black text-xs text-naviter-blue mb-1 uppercase tracking-widest">01 • ALIGNED INTERESTS</div>
                <p className="text-[11px] text-naviter-navy/70 font-sans leading-relaxed">
                  We view client relationships as partnerships. We personally invest in the same strategies that we recommend to our clients.
                </p>
              </div>
              <div className="p-4 border border-slate-150 rounded bg-[#111e30]/5">
                <div className="font-serif font-black text-xs text-naviter-blue mb-1 uppercase tracking-widest">02 • CONSISTENT APPLICATION</div>
                <p className="text-[11px] text-naviter-navy/70 font-sans leading-relaxed">
                  Our ideas, views, and best strategies are made available and systematically integrated into every single portfolio. (1)
                </p>
              </div>
              <div className="p-4 border border-slate-150 rounded bg-[#111e30]/5">
                <div className="font-serif font-black text-xs text-naviter-blue mb-1 uppercase tracking-widest">03 • DIVERSIFY INTELLIGENTLY</div>
                <p className="text-[11px] text-naviter-navy/70 font-sans leading-relaxed">
                  Utilize assets that are lowly-correlated and truly differ from one another to effectively mitigate risk. Alternatives are imperative.
                </p>
              </div>
              <div className="p-4 border border-slate-150 rounded bg-[#111e30]/5">
                <div className="font-serif font-black text-xs text-naviter-blue mb-1 uppercase tracking-widest">04 • CONCENTRATION</div>
                <p className="text-[11px] text-naviter-navy/70 font-sans leading-relaxed">
                  Focus portfolios on our highest conviction strategies to avoid diluting overall long-term investment performance.
                </p>
              </div>
              <div className="p-4 border border-slate-150 rounded bg-[#111e30]/5">
                <div className="font-serif font-black text-xs text-naviter-blue mb-1 uppercase tracking-widest">05 • COST REDUCTION</div>
                <p className="text-[11px] text-naviter-navy/70 font-sans leading-relaxed">
                  Seek to aggressively lower administrative fees and operational expenses, especially where active differentiation is difficult.
                </p>
              </div>
              <div className="p-4 border border-slate-150 rounded bg-[#111e30]/5">
                <div className="font-serif font-black text-xs text-naviter-blue mb-1 uppercase tracking-widest">06 • TAXES MATTER</div>
                <p className="text-[11px] text-naviter-navy/70 font-sans leading-relaxed">
                  Focus on after-tax returns. Systematically tax loss harvest to create "tax alpha." *It's not what you make, it's what you keep.*
                </p>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-naviter-navy/50 font-mono tracking-wide flex justify-between border-t border-slate-100 pt-4">
            <span>(1) Subject to qualified purchaser rules and asset restrictions.</span>
            <span>NAVITER WEALTH ALLOCATION BENCHMARKS</span>
          </div>
        </div>
      )
    },
    {
      id: 'allocation-steps',
      title: 'Customized Asset Allocation Framework',
      category: 'Asset Allocation',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-slate-150 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#111e30] uppercase tracking-wide">Customized Asset Allocation (Steps 1 & 2)</h3>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2 py-0.5 rounded">DYNAMIC WEIGHTS</span>
          </div>

          <div className="my-auto py-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Steps Info */}
              <div className="space-y-4 lg:col-span-1 border-r border-slate-100 pr-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-naviter-gold block mb-1">Step 01</span>
                  <h4 className="font-serif text-sm font-semibold text-[#111e30] mb-1">Determine Liquidity Profile</h4>
                  <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                    We separate assets into two categories: <strong>Liquid Assets</strong> (daily liquidity) and <strong>Low-Liquidity Assets</strong> (structural locks like Private Equity or Credit to capture illiquidity premium).
                  </p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-naviter-gold block mb-1">Step 02</span>
                  <h4 className="font-serif text-sm font-semibold text-[#111e30] mb-1">Determine Risk Profile</h4>
                  <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                    We coordinate targeted risk matrices based on specific timelines. Select profiles below to view target baseline allocations.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2 select-none">
                  {['conservative', 'moderate', 'aggressive'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveAllocation(type as any)}
                      className={`px-3 py-1.5 text-left text-[10px] font-sans font-bold uppercase tracking-wider border rounded transition-all cursor-pointer ${
                        activeAllocation === type 
                          ? 'bg-[#111e30] border-naviter-gold text-white shadow-sm' 
                          : 'bg-white border-slate-200 text-[#111e30] hover:bg-slate-50'
                      }`}
                    >
                      {type} PROFILE
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Visualizer Ring & Progress Bars */}
              <div className="lg:col-span-2 flex flex-col md:flex-row items-center justify-center gap-8 bg-slate-50 p-6 rounded border border-slate-100">
                {/* Custom Sourced SVG Ring */}
                <div className="relative w-40 h-40 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                    
                    {activeAllocation === 'conservative' && (
                      <>
                        {/* Equity 20% (Red/Blue) */}
                        <circle cx="50" cy="50" r="40" stroke="#4a5568" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="200.96" />
                        {/* Fixed Income 40% (Light Blue) */}
                        <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[72deg]" />
                        {/* Liquid Alternatives 40% (Gold) */}
                        <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[216deg]" />
                      </>
                    )}

                    {activeAllocation === 'moderate' && (
                      <>
                        {/* Equity 45% */}
                        <circle cx="50" cy="50" r="40" stroke="#4a5568" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="138.16" />
                        {/* Fixed Income 15% */}
                        <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="213.52" className="origin-center rotate-[162deg]" />
                        {/* Liquid Alts 40% */}
                        <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[216deg]" />
                      </>
                    )}

                    {activeAllocation === 'aggressive' && (
                      <>
                        {/* Equity 60% */}
                        <circle cx="50" cy="50" r="40" stroke="#4a5568" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="100.48" />
                        {/* Fixed Income 0% */}
                        {/* Liquid Alts 40% */}
                        <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[216deg]" />
                      </>
                    )}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] uppercase tracking-wider text-naviter-navy/55 leading-none">Baseline</span>
                    <span className="font-serif text-lg font-black text-[#111e30] uppercase mt-0.5">{activeAllocation}</span>
                    <span className="text-[10px] font-mono font-bold text-naviter-gold leading-none mt-0.5">100% Total</span>
                  </div>
                </div>

                {/* Bars Details */}
                <div className="w-full space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider mb-1">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#4a5568]" /> Equity</span>
                      <span className="font-mono text-naviter-navy">{activeAllocation === 'conservative' ? '20%' : activeAllocation === 'moderate' ? '45%' : '60%'}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#4a5568] transition-all duration-500" style={{ width: activeAllocation === 'conservative' ? '20%' : activeAllocation === 'moderate' ? '45%' : '60%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider mb-1">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" /> Fixed Income</span>
                      <span className="font-mono text-naviter-navy">{activeAllocation === 'conservative' ? '40%' : activeAllocation === 'moderate' ? '15%' : '0%'}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#10b981] transition-all duration-500" style={{ width: activeAllocation === 'conservative' ? '40%' : activeAllocation === 'moderate' ? '15%' : '0%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider mb-1">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#b45309]" /> Liquid Alternatives</span>
                      <span className="font-mono text-naviter-navy">40%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#b45309] transition-all duration-500" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-naviter-navy/40 font-mono text-center border-t border-slate-100 pt-3">
            Source: Naviter Private Allocation Research Q2 2026. Custom portfolio locks are separately calibrated in Step 3.
          </div>
        </div>
      )
    },
    {
      id: 'allocation-step-3',
      title: 'Structural Overlay (Step 3)',
      category: 'Asset Allocation',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-slate-150 pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-[#111e30] uppercase tracking-wide">Complete Custom Allocation (Step 3)</h3>
            <span className="text-[10px] bg-naviter-gold/15 text-naviter-gold px-2.5 py-1 font-mono font-black rounded">SAMPLE MODEL</span>
          </div>

          <div className="my-auto py-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Detailed Left Legend */}
              <div className="space-y-3 lg:col-span-1">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-naviter-blue/10 text-naviter-blue px-2 py-0.5 rounded font-bold">Step 03</span>
                  <p className="text-xs text-naviter-navy/80 mt-2 leading-relaxed font-sans">
                    With locks determined, a full portfolio utilizes a structural blend of liquid allocations matched with alternative allocations. We use structural hedges, GP stakes, and litigation properties to isolate pure alpha.
                  </p>
                </div>

                <div className="border border-slate-200 bg-slate-50/50 p-4 rounded text-left">
                  <h4 className="font-serif text-[11px] font-bold text-[#111e30] uppercase mb-2">Liquidity Split</h4>
                  <div className="space-y-1.5 text-[11px] font-sans">
                    <div className="flex justify-between font-semibold text-[#111e30]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-naviter-blue" /> Liquid Assets</span>
                      <span>60.0%</span>
                    </div>
                    <div className="flex justify-between font-semibold text-naviter-gold">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-naviter-gold" /> Low-Liquidity Assets</span>
                      <span>40.0%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown List Column */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded border border-slate-100 max-h-72 overflow-y-auto">
                {/* Liquid Class */}
                <div className="space-y-2">
                  <h5 className="font-serif text-[10px] uppercase font-extrabold tracking-wider border-b border-slate-200 pb-1 text-naviter-blue flex items-center justify-between">
                    <span>Liquid Portfolio</span>
                    <span>60%</span>
                  </h5>
                  <div className="space-y-1 text-[11px] font-sans text-naviter-navy/80">
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Global Equity</span>
                      <strong className="text-naviter-navy">27.0%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Core-Plus Credit</span>
                      <strong className="text-naviter-navy">15.0%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>U.S. REITs (Liquid Alts)</span>
                      <strong className="text-naviter-navy">6.1%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Trend Following</span>
                      <strong className="text-naviter-navy">5.9%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>MLPs / Infrastructure</span>
                      <strong className="text-naviter-navy">3.6%</strong>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span>Tactical Cash</span>
                      <strong className="text-naviter-navy">0.5%</strong>
                    </div>
                  </div>
                </div>

                {/* Low-Liquidity Class */}
                <div className="space-y-2">
                  <h5 className="font-serif text-[10px] uppercase font-extrabold tracking-wider border-b border-slate-200 pb-1 text-naviter-gold flex items-center justify-between">
                    <span>Low-Liquidity (Alts)</span>
                    <span>40%</span>
                  </h5>
                  <div className="space-y-1 text-[11px] font-sans text-naviter-navy/80">
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>GP Interests / Private Equity</span>
                      <strong className="text-naviter-navy">8.0%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Life Settlements</span>
                      <strong className="text-naviter-navy">6.8%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Private Credit</span>
                      <strong className="text-naviter-navy">6.0%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Priv. Industrial Real Estate</span>
                      <strong className="text-naviter-navy">5.6%</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-dashed border-slate-200">
                      <span>Private Capital / VC</span>
                      <strong className="text-naviter-navy">5.2%</strong>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span>Private Markets Underlying</span>
                      <strong className="text-naviter-navy">3.2%</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="text-[10px] text-naviter-navy/40 font-mono text-center border-t border-slate-100 pt-3">
            Note: "Sample" pie allocation. Specific locks are fully dynamic depending on Net Worth & Qualified Purchaser status.
          </div>
        </div>
      )
    },
    {
      id: 'low-liq-alts',
      title: 'Low-Liquidity Custom Table',
      category: 'Asset Allocation',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-[#fafafc]">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <h3 className="font-serif text-base md:text-lg font-bold text-[#111e30] uppercase tracking-wide">Alternatives Registry Checklist</h3>
            <span className="text-[10px] font-mono text-naviter-gold font-bold">ALTS MATRIX RECORD</span>
          </div>

          <div className="my-auto py-2">
            <p className="text-[11px] font-sans text-naviter-navy/70 leading-relaxed mb-3">
              Low-liquidity alternatives enable access to pure institutional arbitrage markets. Our structured sub-asset access targets higher IRRs with lower volatility overlays.
            </p>

            <div className="overflow-x-auto rounded border border-slate-200 bg-white max-h-60 overflow-y-auto">
              <table className="w-full text-left font-sans text-[10px]">
                <thead className="bg-[#111e30] text-white uppercase text-[8px] tracking-wider sticky top-0">
                  <tr>
                    <th className="p-3">Sub Asset Class</th>
                    <th className="p-3">Target IRR</th>
                    <th className="p-3">Volatility</th>
                    <th className="p-3">Minimum Investment</th>
                    <th className="p-3">Taxation Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-naviter-navy/90 leading-relaxed">
                  <tr>
                    <td className="p-3 font-semibold">Private Equity—GP Stakes</td>
                    <td className="p-3 font-mono">15–25%</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-bold">Medium</span></td>
                    <td className="p-3 font-mono font-medium">$1,000,000</td>
                    <td className="p-3 font-mono">Ordinary / Capital Gains</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Private Real Estate</td>
                    <td className="p-3 font-mono">16–18%</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-bold">Low</span></td>
                    <td className="p-3 font-mono font-medium">$350,000</td>
                    <td className="p-3 font-mono">Ordinary / Capital Gains (K-1)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Litigation Finance</td>
                    <td className="p-3 font-mono">12–15%</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-bold">Low</span></td>
                    <td className="p-3 font-mono font-medium">$1,000,000</td>
                    <td className="p-3 font-mono">Ordinary Income (K-1)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Private Credit—Direct Lending</td>
                    <td className="p-3 font-mono">10.5–13.5%</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-bold">Low</span></td>
                    <td className="p-3 font-mono font-medium">$350,000</td>
                    <td className="p-3 font-mono">Ordinary Income (K-1)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Private Capital—Diversified</td>
                    <td className="p-3 font-mono">12–15%</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-bold">Low</span></td>
                    <td className="p-3 font-mono font-medium">$100,000</td>
                    <td className="p-3 font-mono">Ordinary & Capital Gains</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">PE Co-Investments</td>
                    <td className="p-3 font-mono">12–15%</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-bold">High</span></td>
                    <td className="p-3 font-mono font-medium">$5,000</td>
                    <td className="p-3 font-mono">Capital Gains (1099)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[9px] text-[#111e30]/50 font-mono flex items-center justify-between border-t border-slate-200 mt-2 pt-2">
            <span>* Minimums are fully waived for primary Naviter clients.</span>
            <span>SAMPLE MODEL ALTERNATIVE INDEX CHANNELS</span>
          </div>
        </div>
      )
    },
    {
      id: 'performance-reporting',
      title: 'Reporting & Client Portal',
      category: 'Performance',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-white">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-serif text-base md:text-lg font-bold text-[#111e30] uppercase tracking-wide">Performance Reporting</h3>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">ADDEPAR INTEGRAL</span>
          </div>

          <div className="my-auto py-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#111e30]/50 block">Audit & Tracking</span>
              <h4 className="font-serif text-sm font-semibold text-[#111e30] leading-snug">
                Best-in-Class Addepar Technology Integration Engines
              </h4>
              <p className="text-[11px] text-naviter-navy/70 leading-relaxed font-sans">
                Naviter utilizes Addepar to pull overnight data from custodial platforms globally. This ensures immediate performance calculations (TWR, IRR) net of all operational fees, updated with extreme visual precision.
              </p>
              <ul className="space-y-1.5 text-[10px] text-naviter-navy/80 font-sans">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-naviter-gold" /> Custom PDF audits sent directly each month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-naviter-gold" /> Comprehensive pass-through fee tracking transparency</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-naviter-gold" /> iOS and Android native apps with secure face/fingerprint authorization</li>
              </ul>
            </div>

            {/* Portal Graphic */}
            <div className="bg-[#111e30]/5 p-5 rounded border border-naviter-navy/5 flex flex-col justify-between font-mono text-[9px] text-[#111e30]/80">
              <div className="flex justify-between items-center border-b border-[#111e30]/15 pb-2 mb-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <Smartphone className="w-3.5 h-3.5 text-naviter-blue" />
                  <span>NAVITER MOBILE PORTAL</span>
                </div>
                <span className="bg-green-500/10 text-green-600 px-1.5 py-0.2 rounded text-[7px] font-bold">SECURE LIVE</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-serif">
                  <span>Unified Portfolio Balance</span>
                  <span className="font-black text-sm text-[#111e30]">$10,999,530.48</span>
                </div>
                <div className="flex justify-between border-b border-[#111e30]/5 pb-1">
                  <span>Weighted Net Return (TWR)</span>
                  <strong className="text-naviter-blue">+8.00%</strong>
                </div>

                <div className="space-y-1 text-[8px] text-[#111e30]/70">
                  <div className="flex justify-between">
                    <span>Low-Liquidity Locks</span>
                    <span>$7,612,056 (69.2%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Equity SMA</span>
                    <span>$1,540,354 (14.0%)</span>
                  </div>
                  <div className="flex justify-between w-full h-1 bg-slate-200 rounded-full overflow-hidden my-1">
                    <div className="h-full bg-naviter-gold" style={{ width: '69.2%' }} />
                    <div className="h-full bg-naviter-blue" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[8px] bg-white border border-[#111e30]/5 p-2 rounded">
                <span>Secure Face ID Authorized</span>
                <span className="font-bold underline text-naviter-blue cursor-pointer">Open Mobile Portal</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-naviter-navy/55 tracking-wide flex justify-between border-t border-slate-100 pt-3">
            <span>UNMATCHED REPORTING ARBITRAGE</span>
            <span>PORTAL VERIFICATION PLATFORM</span>
          </div>
        </div>
      )
    },
    {
      id: 'disclaimer',
      title: 'Disclaimers & Disclosures',
      category: 'Legals',
      render: () => (
        <div className="flex flex-col justify-between h-full p-8 md:p-14 text-naviter-navy bg-[#111e30] text-white">
          <div className="flex justify-between items-center border-b border-white/15 pb-4">
            <h3 className="font-serif text-base md:text-lg font-bold text-naviter-gold uppercase tracking-wide">Overview Disclaimers</h3>
            <span className="text-[9px] border border-white/20 text-white/50 px-2 py-0.5 rounded font-mono font-bold">SEC & FINRA DISCLOSURE</span>
          </div>

          <div className="my-auto py-2 max-h-56 overflow-y-auto leading-relaxed text-[10px] text-white/70 space-y-3 font-sans pr-2">
            <p>
              Naviter Wealth LLC ("Naviter") is a registered investment advisor with the U.S. Securities and Exchange Commission (SEC) under the Investment Advisors Act of 1940. Information regarding investment services are provided solely to gain an understanding of our investment philosophy, our strategies and to be able to contact us for further information. Advice may only be provided by Naviter's advisory persons after entering into an advisory agreement and provided Naviter with all requested background and account information.
            </p>
            <p>
              <strong>Risk Disclosure</strong>: Information provided in this material is for educational purposes only and not a recommendation of any investment, legal, tax, or financial product. It should not be considered a solicitation to buy or an offer to sell a security. There is no representation or warranty as to the current accuracy, reliability, or completeness of, or liability for, decisions based on such information, and it should not be relied on as such. <strong>Consult with a qualified professional before making any legal, tax, investment, or financial decision.</strong>
            </p>
            <p>
              An investment in a low-liquidity alternative involves significant risks and is suitable only for those persons who can bear the economic risk of the loss of their entire investment and who have limited need for liquidity in their investment. There can be no assurance that the low-liquidity alternative will achieve its investment objective.
            </p>
            <p>
              Past performance is no guarantee of future returns. Different types of investments involve varying degrees of risk. Therefore, it should not be assumed that future performance of any specific investment or investment strategy will be profitable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-white/10 pt-4 text-[9px] uppercase font-bold tracking-widest text-white/50">
            <span>Address: 1 Information Way, Suite 400 | Little Rock, AR 72202</span>
            <span>Verify of Q2 2026 filings</span>
          </div>
        </div>
      )
    }
  ];

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      {/* Proofing Studio Header bar on Screen */}
      {onScreenPrintPreview && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-[#111e30] border-b border-white/10 text-white z-50 px-6 flex justify-between items-center shadow-lg no-print">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#58aadb] animate-ping" />
            <div>
              <span className="font-serif font-black text-xs uppercase tracking-wide text-white flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-[#58aadb]" />
                Landscape Print Deck Proofing Studio
              </span>
              <p className="text-[10px] text-white/60 font-sans">
                Reviewing 20 pages at 11" x 8.5" letter size. Slides stack vertically. Scroll down to review.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-[10px] font-sans font-extrabold uppercase tracking-wide bg-[#58aadb] hover:bg-[#58aadb]/90 text-white border border-[#58aadb] rounded shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5 transition-all text-center"
            >
              <Printer className="w-3.5 h-3.5" />
              Print System Export
            </button>
            <button
              onClick={() => setOnScreenPrintPreview(false)}
              className="px-3.5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wide bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded cursor-pointer transition-colors"
            >
              Exit Proofing
            </button>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-[#fafafc] pt-24 pb-12 select-none no-print ${onScreenPrintPreview ? 'hidden' : ''}`}>
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-naviter-navy/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-naviter-gold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-naviter-gold" />
              Corporate Strategy Records
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-black text-[#111e30] tracking-tight mt-1">
              Naviter Wealth Overview <span className="font-light text-naviter-blue italic">Deck</span>
            </h1>
            <p className="text-xs text-naviter-navy/60 font-sans mt-0.5">
              Secure digital presentation of our proprietary allocation parameters and executive blueprints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Navigation Mode Toggle */}
            <div className="bg-slate-200/60 rounded p-1 flex gap-1 border border-slate-300/30">
              <button
                onClick={() => setViewMode('slides')}
                className={`flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === 'slides' 
                    ? 'bg-[#111e30] text-white shadow-sm' 
                    : 'text-naviter-navy/60 hover:text-naviter-navy'
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                Slides
              </button>
              <button
                onClick={() => setViewMode('scroll')}
                className={`flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === 'scroll' 
                    ? 'bg-[#111e30] text-white shadow-sm' 
                    : 'text-naviter-navy/60 hover:text-naviter-navy'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Document
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-[10px] font-sans font-extrabold uppercase tracking-wider bg-[#58aadb] hover:bg-[#58aadb]/90 text-white rounded shadow-sm flex items-center gap-1.5 cursor-pointer border border-[#58aadb] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Deck
            </button>
            
            <button 
              onClick={onNavigateToFirm}
              className="px-4 py-2 text-[10px] font-sans font-extrabold uppercase tracking-widest border border-naviter-blue/20 rounded bg-white text-naviter-navy hover:bg-[#111e30]/5 cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Exit Deck
            </button>
          </div>
        </div>
      </div>

      {/* Active Mode Render */}
      <div className="max-w-6xl mx-auto px-6">
        {viewMode === 'slides' ? (
          /* Presentation (Slide Deck) View */
          <div className="space-y-6">
            {/* Google Slides Integration Controller Box */}
            <div className="bg-white rounded-xl border border-naviter-navy/10 p-5 shadow-sm space-y-4 no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${googleSlidesMode && slideImages.length > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <div>
                    <h2 className="text-xs font-serif font-black uppercase tracking-wider text-[#111e30] flex items-center gap-1.5">
                      <Presentation className="w-3.5 h-3.5 text-naviter-gold animate-bounce" />
                      Google Slides Live Injection
                    </h2>
                    <p className="text-[10px] text-slate-500 font-sans">
                      Automatically stream, navigate, and print your real-time Google Slides presentation directly in this interface.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {googleSlidesMode && (
                    <button
                      onClick={() => {
                        setGoogleSlidesMode(false);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans text-[10px] uppercase font-bold rounded cursor-pointer transition-colors border border-slate-250"
                    >
                      Use Native Slides
                    </button>
                  )}
                  <button
                    onClick={() => loadGoogleSlides(googleSlidesUrl)}
                    disabled={loadingSlides}
                    className="px-3 py-1.5 bg-[#111e30] hover:bg-[#111e30]/90 text-white font-sans text-[10px] uppercase font-black tracking-wider rounded cursor-pointer disabled:opacity-50 transition-colors flex items-center gap-1.5 border border-[#111e30]"
                  >
                    {loadingSlides ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin text-[#58aadb]" />
                        Rendering...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3" />
                        {googleSlidesMode && slideImages.length > 0 ? 'Sync Presentation' : 'Activate Google Slides'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* URL input and dynamic instructions */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={googleSlidesUrl}
                    onChange={(e) => setGoogleSlidesUrl(e.target.value)}
                    placeholder="Paste Google Slides share link or web published URL"
                    disabled={loadingSlides}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-mono outline-none focus:ring-1 focus:ring-naviter-gold focus:bg-white transition-all"
                  />
                </div>

                {slideLoadError && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded text-[11px] font-sans flex items-start gap-2 animate-in fade-in duration-150">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{slideLoadError}</span>
                  </div>
                )}

                {loadingSlides && slideRenderingProgress && (
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-slate-500">
                      <span>Generating High-Resolution SVG/Vector assets</span>
                      <span>Page {slideRenderingProgress.current} of {slideRenderingProgress.total}</span>
                    </div>
                    <div className="h-1.5 bg-slate-205 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-naviter-gold transition-all duration-300 rounded-full" 
                        style={{ width: `${(slideRenderingProgress.current / slideRenderingProgress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {!googleSlidesMode && !loadingSlides && (
                  <p className="text-[10px] text-slate-400 font-sans italic">
                    💡 <strong>Quick Setup:</strong> In your Google Slides presentation, share as <strong className="text-slate-500">"Anyone with link can view"</strong>, copy the URL from your browser address bar, and paste it above!
                  </p>
                )}
              </div>
            </div>

            <div className="w-full bg-[#111e30] rounded-xl shadow-2xl border border-naviter-navy/5 overflow-hidden aspect-[16/10] max-h-[640px] relative flex items-center justify-center">
              {googleSlidesMode && slideImages.length > 0 ? (
                <div className="w-full h-full relative bg-[#111e30]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={gSlideCurrent}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      src={slideImages[gSlideCurrent]}
                      alt={`Slide ${gSlideCurrent + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>
                  
                  {/* Embedded Badge */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded border border-white/10 text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Custom Google Slides Live Siphon
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    {slides[currentSlide].render()}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Floating Slide Navigation Indicator Bars */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-1 z-30 pointer-events-none opacity-40 hover:opacity-105 transition-opacity">
                {googleSlidesMode && slideImages.length > 0 ? (
                  slideImages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        idx === gSlideCurrent ? 'bg-naviter-gold scale-y-125' : 'bg-white/20'
                      }`} 
                    />
                  ))
                ) : (
                  slides.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        idx === currentSlide ? 'bg-naviter-gold scale-y-125' : 'bg-slate-305/30'
                      }`} 
                    />
                  ))
                )}
              </div>
            </div>

            {/* Slides Controller Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-naviter-navy/5 shadow-md">
              <div className="flex gap-2 text-xs font-mono font-bold text-[#111e30]/60">
                {googleSlidesMode && slideImages.length > 0 ? (
                  <>
                    <span className="text-naviter-navy font-black text-sm">{String(gSlideCurrent + 1).padStart(2, '0')}</span>
                    <span>/</span>
                    <span>{String(slideImages.length).padStart(2, '0')}</span>
                    <span className="text-naviter-gold uppercase tracking-widest ml-4 hidden md:inline">Google Slides Stream</span>
                  </>
                ) : (
                  <>
                    <span className="text-naviter-navy font-black text-sm">{String(currentSlide + 1).padStart(2, '0')}</span>
                    <span>/</span>
                    <span>{String(slides.length).padStart(2, '0')}</span>
                    <span className="text-naviter-gold uppercase tracking-widest ml-4 hidden md:inline">{slides[currentSlide].category}</span>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  disabled={googleSlidesMode && slideImages.length > 0 ? gSlideCurrent === 0 : currentSlide === 0}
                  onClick={googleSlidesMode && slideImages.length > 0 ? () => setGSlideCurrent(prev => Math.max(0, prev - 1)) : goToPrevSlide}
                  className="w-10 h-10 rounded border border-naviter-navy/10 flex items-center justify-center bg-white text-naviter-navy hover:bg-[#111e30]/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  disabled={googleSlidesMode && slideImages.length > 0 ? gSlideCurrent === slideImages.length - 1 : currentSlide === slides.length - 1}
                  onClick={googleSlidesMode && slideImages.length > 0 ? () => setGSlideCurrent(prev => Math.min(slideImages.length - 1, prev + 1)) : goToNextSlide}
                  className="px-6 h-10 rounded bg-[#111e30] border border-[#111e30] text-white flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#111e30]/90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  Next Slide
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Biographies Panel (Integrated as detailed helper cards on active Bio screens) */}
            {slides[currentSlide].id === 'intro' && (
              <div className="p-6 bg-naviter-blue/5 border border-naviter-blue/10 rounded-xl space-y-2">
                <span className="text-[9px] font-mono uppercase text-naviter-blue font-bold">Interactive Navigation Tips</span>
                <p className="text-xs text-naviter-navy/80 font-sans leading-relaxed">
                  Use the left and right arrows on your keyboard to flip through the slides at your convenience. Toggle "Document Mode" in the top-right to browse the entire slide deck layout as a structured, searchable webpage.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Continuous Editorial Document View */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" ref={scrollRef}>
            {/* Sticky Navigation Left Sidebar index */}
            <div className="lg:col-span-1 space-y-2 sticky top-28 self-start">
              <div className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-naviter-navy/60 mb-3 px-3">
                Deck Index Topics
              </div>
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    const scrollElement = document.getElementById(`doc-slide-${slide.id}`);
                    if (scrollElement) {
                      scrollElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="w-full text-left p-3.5 border-l-4 border-transparent bg-white text-naviter-navy hover:bg-[#111e30]/5 hover:border-naviter-blue/50 font-serif text-xs transition-all duration-300 flex justify-between items-center group cursor-pointer"
                >
                  <span className="font-semibold">{slide.title}</span>
                  <span className="font-mono text-[9px] text-naviter-navy/30 group-hover:text-naviter-blue">{String(idx + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>

            {/* Main Scrolled Core Container list */}
            <div className="lg:col-span-3 space-y-12">
              {slides.map((slide, idx) => (
                <div 
                  key={slide.id}
                  id={`doc-slide-${slide.id}`}
                  className="border rounded-xl overflow-hidden shadow-md bg-white border-naviter-navy/5 relative"
                >
                  {/* Visual Divider Header */}
                  <div className="bg-slate-50 border-b border-slate-100 px-6 py-3.5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-naviter-navy/40 font-bold uppercase tracking-wider">
                      PAGE {String(idx + 1).padStart(2, '0')} • {slide.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-naviter-blue font-bold font-sans">
                      {slide.title}
                    </span>
                  </div>

                  <div className="aspect-[16/10] max-h-[580px] w-full bg-white">
                    {slide.render()}
                  </div>
                </div>
              ))}

              {/* Dynamic Interactive Team Biographies Block */}
              <div className="border border-naviter-navy/5 bg-white p-8 rounded-xl shadow-md space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono uppercase text-naviter-gold font-bold">Comprehensive Directory Supplement</span>
                  <h3 className="font-serif text-xl font-bold text-[#111e30] mt-1 uppercase">Naviter Executive Bios Registry</h3>
                  <p className="text-xs text-naviter-navy/60 font-sans mt-0.5">
                    Click to inspect detailed credentials and historic tenures of Naviter personnel.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-2">
                  {BIOS_DATA.map((bio) => (
                    <div key={bio.name} className="p-4 rounded border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between">
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#111e30]">{bio.name}</h4>
                          <span className="text-[10px] text-naviter-blue font-sans block mt-0.5">{bio.title}</span>
                        </div>
                        <ul className="space-y-1 text-[9px] text-naviter-navy/70 list-disc pl-4 font-sans leading-relaxed">
                          {bio.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/50 flex justify-between items-center text-[8px] font-mono">
                        <span className="text-naviter-navy/60">Phone: {bio.phone}</span>
                        <a href={`mailto:${bio.email}`} className="text-naviter-blue underline hover:text-naviter-navy">{bio.email}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Disclaimers & Disclosures Bottom Banner */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-[#111e30] p-8 rounded-xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h5 className="font-serif text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-naviter-gold" />
              Secure Record Preservation
            </h5>
            <p className="text-[11px] text-white/70 font-sans leading-relaxed">
              This digital overview deck represents verified SEC disclosures and proprietary portfolio weightings computed for Naviter Wealth LLC. All trademarks, assets under administration, and audit indices are current as of the Q2 2026 reporting window.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-2.5 bg-naviter-gold text-[#111e30] hover:bg-naviter-gold/90 transition-colors font-sans text-[10px] uppercase font-extrabold tracking-wider rounded cursor-pointer"
            >
              Contact Wealth Officer
            </button>
            <button
              onClick={onNavigateToFirm}
              className="px-6 py-2.5 bg-white/10 text-white hover:bg-white/15 transition-colors font-sans text-[10px] uppercase font-extrabold tracking-wider rounded cursor-pointer"
            >
              Read Disclosures
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Pristine high-fidelity printable slides list */}
    <div className={`print-only-container ${onScreenPrintPreview ? 'on-screen-preview-active pb-24' : 'hidden print:block'}`}>
      {googleSlidesMode && slideImages.length > 0 ? (
        slideImages.map((image, index) => (
          <div key={index} className="print-slide-page flex items-center justify-center bg-[#111e30] p-0 border-0" style={{ pageBreakAfter: 'always' }}>
            <img src={image} alt={`Print Slide ${index + 1}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
        ))
      ) : (
        <>
          {/* Page 1: COVER PAGE */}
        <div className="print-slide-page print-dark-bg">
          <div className="border-b border-white/10 pb-6">
            <span className="text-naviter-blue text-xs font-mono uppercase tracking-[0.3em] font-extrabold block mb-1">Naviter Wealth LLC</span>
            <h1 className="font-serif text-4xl font-extrabold text-white uppercase tracking-wide">Firm Overview</h1>
            <p className="text-[#58aadb] text-xs uppercase tracking-widest font-bold mt-1">Presentation & Strategy Portfolio Booklet</p>
          </div>

          <div className="my-auto py-8 space-y-4">
            <div className="text-sm border-l-2 border-[#58aadb] pl-4 text-white/80 max-w-xl font-sans leading-relaxed">
              "We built Naviter specifically for families requiring sophisticated wealth strategies and independent fiduciary care. This record documents our asset allocations, platforms, and executive team."
            </div>
            <div className="text-xs text-white/50 font-mono">
              PUBLISHED Q2 2026 • SEC REGISTERED RECORD • PRIVATE DOCUMENT
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[9px] uppercase font-mono tracking-wider text-white/45">
            <span>Portfolio & Strategy Registry</span>
            <span>Little Rock, AR</span>
            <span>NaviterWealth.com</span>
          </div>
        </div>

        {/* Page 2: INTRODUCTION */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-250 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Executive Introduction</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 02 • ABOUT US</span>
          </div>

          <div className="grid grid-cols-2 gap-8 items-center my-auto">
            <div className="space-y-4 font-sans text-xs text-slate-700 leading-relaxed">
              <p>
                We founded Naviter Wealth out of a shared conviction that high-net-worth clients deserve a truly aligned partner. Traditional brokerages are too often encumbered by internal product channels, sales quotas, and conflicting corporate directives.
              </p>
              <p>
                Our structure is built entirely around the fiduciary standard. We do not manufacture products. We offer independent, customized advice, combining proprietary macro underwriting with best-in-class third-party alternative managers.
              </p>
              <p>
                As partners, we invest our own capital in the same strategies we recommend. Alignment is not a tagline for us—it is our operating architecture. We invite you to explore this overview of our firm.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded border border-slate-150">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#111e30]/60 block">Management Execution</span>
              <div className="space-y-2.5 font-serif text-slate-800">
                <div>
                  <strong className="block text-sm">Bentley Black</strong>
                  <span className="text-xs text-naviter-blue font-sans">Executive Chairman & CEO</span>
                </div>
                <div>
                  <strong className="block text-sm">Phillip Worthen</strong>
                  <span className="text-xs text-naviter-blue font-sans">President</span>
                </div>
                <div>
                  <strong className="block text-sm">John Kornet, CFP®</strong>
                  <span className="text-xs text-naviter-blue font-sans">Chief Investment Officer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>SEC REGISTERED DIRECTORY</span>
            <span>FIDUCIARY STANDARD ASSURANCE</span>
          </div>
        </div>

        {/* Page 3: EXECUTIVE SUMMARY */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Executive Summary</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 03 • PLATFORM</span>
          </div>

          <div className="grid grid-cols-2 gap-8 my-auto">
            <div className="space-y-4 border-r border-slate-100 pr-5">
              <h4 className="font-serif text-base font-bold text-[#111e30] uppercase">Firm Philosophy</h4>
              <ul className="space-y-3">
                <li className="text-xs text-slate-700 leading-relaxed font-sans">
                  <strong>Independent Fiduciary Care</strong>: Our loyalty is 100% aligned with clients. No proprietary products, zero sales quotas, and clear cost disclosures.
                </li>
                <li className="text-xs text-slate-700 leading-relaxed font-sans">
                  <strong>Sophisticated Allocation</strong>: Direct-indexing strategies, institutional alternative access, and specialized private office overlays.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Professionals</span>
                <span className="text-xl font-bold text-[#111e30] font-serif">15 Team Members</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Average Experience</span>
                <span className="text-xl font-bold text-[#111e30] font-serif">23+ Years</span>
              </div>
              <div className="p-4 bg-[#111e30]/5 border border-[#58aadb]/10 rounded text-center col-span-2">
                <span className="text-[10px] font-mono text-[#58aadb] block uppercase font-bold">Assets Under Administration</span>
                <span className="text-2xl font-serif font-black text-[#111e30]">$1.9B+ AUA</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">As of June 2026 Reporting</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>DATA RECORD: VERIFIED METRICS</span>
            <span>EXECUTIVE BRIEF</span>
          </div>
        </div>

        {/* Page 4: WHY WE FORMED NAVITER */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Why We Formed Naviter</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 04 • STRUCTURE</span>
          </div>

          <div className="grid grid-cols-3 gap-6 my-auto">
            <div className="col-span-1 border-r border-slate-150 pr-4 flex flex-col justify-center">
              <blockquote className="font-serif text-base italic text-[#111e30] leading-relaxed">
                "If we were starting from scratch, what would a high-net-worth client's ideal investment advisory look like?"
              </blockquote>
              <span className="font-mono text-[9px] text-slate-400 mt-2 block">— Bentley Black, CEO</span>
            </div>

            <div className="col-span-2 space-y-4">
              <div className="p-4 rounded border border-slate-200/60 bg-red-50/20 text-xs">
                <span className="font-mono text-[9px] text-red-600 font-extrabold uppercase tracking-wide block mb-1">Traditional Model (The Challenge)</span>
                <p className="text-slate-700 leading-relaxed font-sans">
                  The traditional broker-dealer model is burdened by corporate product pushes, opaque broker commissions, sales targets, and proprietary asset traps that compromise objective wealth planning.
                </p>
              </div>

              <div className="p-4 rounded border border-[#58aadb]/20 bg-blue-50/20 text-xs">
                <span className="font-mono text-[9px] text-[#58aadb] font-extrabold uppercase tracking-wide block mb-1">Naviter Fiduciary Model (The Solution)</span>
                <p className="text-slate-700 leading-relaxed font-sans">
                  By operating as an independent RIA, our advice is uncorrupted. No broker custody commissions, transparent pass-through costs, and co-investment backing the exact blueprints recommended.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>FIDUCIARY FRAMEWORK VERIFICATION</span>
            <span>MODEL COMPARISONS</span>
          </div>
        </div>

        {/* Page 5: BUILT ON PURPOSE */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Built on Purpose</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 05 • PURPOSE</span>
          </div>

          <div className="grid grid-cols-3 gap-6 my-auto">
            <div className="p-5 border border-slate-150 rounded bg-slate-50">
              <div className="text-[#58aadb] font-bold text-xs uppercase mb-2">The Name</div>
              <h4 className="font-serif text-sm font-bold text-[#111e30] mb-1">Marine Astrolabe Guide</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Latin <em>Navigare</em> (Navigate) and <em>Iter</em> (Journey). It defines our promise: acting as a highly precise, multi-generational wealth-guide.
              </p>
            </div>

            <div className="p-5 border border-slate-150 rounded bg-slate-50">
              <div className="text-[#58aadb] font-bold text-xs uppercase mb-2">The Families</div>
              <h4 className="font-serif text-sm font-bold text-[#111e30] mb-1">Partners Not Accounts</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                We reject the basic broker-customer paradigm. Our clients are partners who share core operational targets and deserve absolute cost transparency.
              </p>
            </div>

            <div className="p-5 border border-slate-150 rounded bg-slate-50">
              <div className="text-[#58aadb] font-bold text-xs uppercase mb-2">The Ecosystem</div>
              <h4 className="font-serif text-sm font-bold text-[#111e30] mb-1">Complete Client Care</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                We align institutional portfolios with estate flows, tax optimization structures, CPA reporting, and low-cost cash management platforms.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>LATIN ROOTS DECK SLIDE</span>
            <span>BRAND MATRIX</span>
          </div>
        </div>

        {/* Page 6: SUITE OF SERVICES - CORE SERVICES */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Suite of Services — Core</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 06 • SERVICES A</span>
          </div>

          <div className="my-auto py-2">
            <p className="text-xs text-slate-600 mb-4 max-w-2xl">
              Our core wealth advisory comprises integrated services delivered directly under our primary fiduciary umbrella to ensure unified portfolio control.
            </p>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-[#58aadb] font-mono font-bold text-[9px] uppercase block mb-1">01. Service</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Asset Management</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Institutional wealth matrices with global liquid securities, separate tax harvesting, SMAs, and direct index setups.
                </p>
              </div>

              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-[#58aadb] font-mono font-bold text-[9px] uppercase block mb-1">02. Service</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Banking & Lending</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Securities-backed loans, lines of credit, debt optimizations, and highly competitive custodian cash interfaces.
                </p>
              </div>

              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-[#58aadb] font-mono font-bold text-[9px] uppercase block mb-1">03. Service</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Trust Management</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Fiduciary oversight, consolidated estate governance, and secure structural protection models via Naviter Trust.
                </p>
              </div>

              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-[#58aadb] font-mono font-bold text-[9px] uppercase block mb-1">04. Service</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Risk Management</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Rigorous audits of life protection, specialized entity property and casualty, cyber risks, and estate liquidity lines.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>CLIENT PORTFOLIO ADVOCACY</span>
            <span>CORE SERVICES BLUEPRINT</span>
          </div>
        </div>

        {/* Page 7: SUITE OF SERVICES - NETWORK SERVICES */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Suite of Services — Network</h2>
            <span className="text-[10px] font-mono bg-naviter-blue/5 text-[#58aadb] px-2.5 py-1 rounded">PAGE 07 • SERVICES B</span>
          </div>

          <div className="my-auto py-2">
            <p className="text-xs text-slate-600 mb-4 max-w-2xl">
              We coordinate seamlessly with heavily vetted external professionals to bridge estate, corporate advisory, and advanced tax services with your assets.
            </p>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-naviter-navy font-mono font-bold text-[9px] uppercase block mb-1">01. Network</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Tax Coordination</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Active tax loss sweeps, LLC filing assistance, CPA orchestration, and consolidated cost audit records.
                </p>
              </div>

              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-naviter-navy font-mono font-bold text-[9px] uppercase block mb-1">02. Network</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Corporate Finance</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Advanced corporate structures, liquidity transactions, valuations, exit architectures, and corporate succession support.
                </p>
              </div>

              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-naviter-navy font-mono font-bold text-[9px] uppercase block mb-1">03. Network</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Family Office</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Bespoke bill payments, health/cyber liability coverage reviews, high value cargo security, and next-gen stewardship.
                </p>
              </div>

              <div className="p-4 border border-slate-150 rounded bg-slate-50">
                <span className="text-naviter-navy font-mono font-bold text-[9px] uppercase block mb-1">04. Network</span>
                <h5 className="font-serif text-xs font-bold text-[#111e30] mb-1 uppercase">Estate Legal Support</h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  Coordination with specialized legal teams to form family trusts, generation skips, and elite philanthropic setups.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>WEALTH SYSTEM CONVERGENCE</span>
            <span>NETWORK DIRECT ADVISORY</span>
          </div>
        </div>

        {/* Page 8: PLATFORM PILLARS */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Firm Platform Pillars</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 08 • THE PILLARS</span>
          </div>

          <div className="grid grid-cols-3 gap-6 my-auto">
            <div className="p-5 border border-slate-150 rounded bg-slate-50">
              <div className="font-serif font-black text-xl text-naviter-blue mb-1">Pillar I: Trust</div>
              <h5 className="font-sans text-xs font-bold text-slate-700 uppercase mb-2">Absolute Alignment</h5>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Independent custodian vaults. We do not act as broker-dealers, eliminating internal commission quotas, exit fees, and proprietary product structures.
              </p>
            </div>

            <div className="p-5 border border-slate-150 rounded bg-slate-50">
              <div className="font-serif font-black text-xl text-naviter-blue mb-1">Pillar II: Acumen</div>
              <h5 className="font-sans text-xs font-bold text-slate-700 uppercase mb-2">Proven Underwriting</h5>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Proprietary allocations, structured hedges, and private equity stakes designed and scrutinized by our multi-decade investment committee.
              </p>
            </div>

            <div className="p-5 border border-slate-150 rounded bg-slate-50">
              <div className="font-serif font-black text-xl text-naviter-blue mb-1">Pillar III: Access</div>
              <h5 className="font-sans text-xs font-bold text-slate-700 uppercase mb-2">Exclusive Arbitrage</h5>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Access to highly restricted institutional private markets, litigation funding registries, and GP stakes with standard investment minimums waived.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>OPERATING ARCHITECTURE DECK INDEX</span>
            <span>THREE ATTRIBUTES</span>
          </div>
        </div>

        {/* Page 9: CORE INVESTMENT TENETS */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Core Investment Tenets</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 09 • PHILOSOPHY</span>
          </div>

          <div className="grid grid-cols-3 gap-4 my-auto">
            <div className="p-3 border border-slate-250 rounded bg-[#111e30]/5">
              <span className="font-serif font-black text-[10px] text-naviter-blue mb-1 block uppercase tracking-wider">01. ALIGNED INTERESTS</span>
              <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                Client relationships are absolute partnerships. We invest our capital in the same strategies we recommend.
              </p>
            </div>
            <div className="p-3 border border-slate-250 rounded bg-[#111e30]/5">
              <span className="font-serif font-black text-[10px] text-naviter-blue mb-1 block uppercase tracking-wider">02. CONSISTENT IMPLEMENTATION</span>
              <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                Our best-underwritten strategies are systematically integrated into every single portfolio, without exception.
              </p>
            </div>
            <div className="p-3 border border-slate-250 rounded bg-[#111e30]/5">
              <span className="font-serif font-black text-[10px] text-naviter-blue mb-1 block uppercase tracking-wider">03. INTELLIGENT DIVERSIFICATION</span>
              <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                Focus on low-correlation assets (Alternatives) that behave independently under volatile market overlays to mitigate systemic risk.
              </p>
            </div>
            <div className="p-3 border border-slate-250 rounded bg-[#111e30]/5">
              <span className="font-serif font-black text-[10px] text-naviter-blue mb-1 block uppercase tracking-wider">04. HIGHEST CONVICTION</span>
              <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                Concentrate and tilt portfolios toward top ideas to avoid diluting overall long-term investment performance.
              </p>
            </div>
            <div className="p-3 border border-slate-250 rounded bg-[#111e30]/5">
              <span className="font-serif font-black text-[10px] text-naviter-blue mb-1 block uppercase tracking-wider">05. COST REDUCTION</span>
              <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                Aggressively drive down platform administrative fees and transaction costs where active differentiation is unavailable.
              </p>
            </div>
            <div className="p-3 border border-slate-250 rounded bg-[#111e30]/5">
              <span className="font-serif font-black text-[10px] text-naviter-blue mb-1 block uppercase tracking-wider">06. TAX CONSCIOUS ALPHA</span>
              <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                Deliver tax-loss harvesting and custom overlays to create tax alpha. Performance matters Net-of-Taxes.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>SECTION II: THEORY VERDICT</span>
            <span>TENETS MATRIX</span>
          </div>
        </div>

        {/* Page 10: CONSERVATIVE PROFILE */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Asset Allocation — Conservative Profile</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 10 • ALLOCATIONS A</span>
          </div>

          <div className="grid grid-cols-3 gap-6 items-center my-auto">
            <div className="col-span-1 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#111e30]">Liquidity Profile</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Designed for families prioritizing near-term income and stability. Assets are split across high daily-liquidity cash/fixed programs paired with steady absolute alternative hedges.
              </p>
              <div className="bg-slate-50 p-3 rounded">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">Target Allocation Profile</span>
                <strong className="text-[#111e30] uppercase text-sm font-serif">CONSERVATIVE BLUEPRINT</strong>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-6 bg-slate-50 p-4 rounded border border-slate-150">
              <svg className="w-28 h-28 transform -rotate-90 shrink-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle cx="50" cy="50" r="40" stroke="#4a5568" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="200.96" />
                <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[72deg]" />
                <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[216deg]" />
              </svg>

              <div className="w-full space-y-2 text-xs font-sans">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span>Equity (Global Core)</span>
                  <strong className="font-bold">20.0%</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span>Fixed Income (High Grade)</span>
                  <strong className="font-bold">40.0%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Liquid Alternatives</span>
                  <strong className="font-bold">40.0%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>BASELINE WEIGHTS REPORT</span>
            <span>PLANNING STEP 01-02</span>
          </div>
        </div>

        {/* Page 11: MODERATE PROFILE */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Asset Allocation — Moderate Profile</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 11 • ALLOCATIONS B</span>
          </div>

          <div className="grid grid-cols-3 gap-6 items-center my-auto">
            <div className="col-span-1 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#111e30]">Balanced Profile</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Blends global equities with secure fixed-income positions and 40% absolute-return alternatives to target long-term capital appreciation while isolating downside market drawdowns.
              </p>
              <div className="bg-slate-50 p-3 rounded">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#111e30]/40 block mb-1">Target Allocation Profile</span>
                <strong className="text-[#111e30] uppercase text-sm font-serif">MODERATE BLUEPRINT</strong>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-6 bg-slate-50 p-4 rounded border border-slate-150">
              <svg className="w-28 h-28 transform -rotate-90 shrink-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle cx="50" cy="50" r="40" stroke="#4a5568" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="138.16" />
                <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="213.52" className="origin-center rotate-[162deg]" />
                <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[216deg]" />
              </svg>

              <div className="w-full space-y-2 text-xs font-sans">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span>Equity (Global Core)</span>
                  <strong className="font-bold">45.0%</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span>Fixed Income (Core Plus)</span>
                  <strong className="font-bold">15.0%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Liquid Alternatives</span>
                  <strong className="font-bold">40.0%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>BASELINE WEIGHTS REPORT</span>
            <span>PLANNING STEP 01-02</span>
          </div>
        </div>

        {/* Page 12: AGGRESSIVE PROFILE */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Asset Allocation — Aggressive Profile</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 12 • ALLOCATIONS C</span>
          </div>

          <div className="grid grid-cols-3 gap-6 items-center my-auto">
            <div className="col-span-1 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#111e30]">Growth Profile</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Devotes maximum exposure to global growth equity structures paired with a core 40% alternatives overlay, capturing institutional-grade growth premiums with zero fixed-income drag.
              </p>
              <div className="bg-slate-50 p-3 rounded">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#111e30]/40 block mb-1">Target Allocation Profile</span>
                <strong className="text-[#111e30] uppercase text-sm font-serif">AGGRESSIVE BLUEPRINT</strong>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-6 bg-slate-50 p-4 rounded border border-slate-150">
              <svg className="w-28 h-28 transform -rotate-90 shrink-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle cx="50" cy="50" r="40" stroke="#4a5568" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="100.48" />
                <circle cx="50" cy="50" r="40" stroke="#b45309" strokeWidth="12" fill="transparent" strokeDasharray="251.2" strokeDashoffset="150.72" className="origin-center rotate-[216deg]" />
              </svg>

              <div className="w-full space-y-2 text-xs font-sans">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span>Equity (Global Core)</span>
                  <strong className="font-bold">60.0%</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span>Fixed Income (Liquid Locks)</span>
                  <strong className="font-bold">0.0%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Liquid Alternatives</span>
                  <strong className="font-bold">40.0%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>BASELINE WEIGHTS REPORT</span>
            <span>PLANNING STEP 01-02</span>
          </div>
        </div>

        {/* Page 13: STRUCTURAL OVERLAY (STEP 3) */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Complete Custom Allocation Overlay (Step 3)</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 13 • STRUCTURAL ALTS</span>
          </div>

          <div className="grid grid-cols-2 gap-8 my-auto">
            <div className="space-y-4 font-sans text-xs">
              <h4 className="font-serif text-base font-bold text-[#111e30]">Liquidity Division Matrix</h4>
              <p className="text-slate-600 leading-relaxed">
                Step 3 overlays 40% low-liquidity institutional assets (Private Markets GP interests, direct bridge loans, life settlements, specialized industrial real estate) with 60% liquid assets to unlock premium, uncorrelated alpha.
              </p>
              <div className="p-4 rounded border border-slate-150 bg-slate-50 flex justify-between font-bold text-[#111e30]">
                <span>Liquid Portfolio Assets</span>
                <span className="text-naviter-blue">60.0%</span>
              </div>
              <div className="p-4 rounded border border-slate-150 bg-slate-50 flex justify-between font-bold text-[#111e30]">
                <span>Low-Liquidity Alternatives</span>
                <span className="text-naviter-gold">40.0%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[10px] font-sans">
              <div className="bg-slate-50 p-4 rounded border border-slate-100 space-y-1">
                <span className="font-bold text-naviter-blue block uppercase border-b border-slate-200 pb-1">Liquid Portfolio (60%)</span>
                <div className="flex justify-between"><span>Global Equity</span><strong>27.0%</strong></div>
                <div className="flex justify-between"><span>Core Credit</span><strong>15.0%</strong></div>
                <div className="flex justify-between"><span>REITs (Alts)</span><strong>6.1%</strong></div>
                <div className="flex justify-between"><span>Trend Following</span><strong>5.9%</strong></div>
                <div className="flex justify-between"><span>Infrastructure</span><strong>3.6%</strong></div>
              </div>

              <div className="bg-slate-50 p-4 rounded border border-slate-100 space-y-1">
                <span className="font-bold text-naviter-gold block uppercase border-b border-slate-200 pb-1">Alternative Locks (40%)</span>
                <div className="flex justify-between"><span>PE Stakes / Buyouts</span><strong>8.0%</strong></div>
                <div className="flex justify-between"><span>Life Settlements</span><strong>6.8%</strong></div>
                <div className="flex justify-between"><span>Private Credit</span><strong>6.0%</strong></div>
                <div className="flex justify-between"><span>Industrial RE</span><strong>5.6%</strong></div>
                <div className="flex justify-between"><span>VC & Growth</span><strong>5.2%</strong></div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>SAMPLE HIGH-NET-WORTH SPECS</span>
            <span>PORTFOLIO LOCK LAYERS</span>
          </div>
        </div>

        {/* Page 14: ALTERNATIVES REGISTRY TABLE */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Alternatives Registry Checklist</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 14 • MATRIX</span>
          </div>

          <div className="my-auto py-2">
            <table className="w-full text-left font-sans text-[8pt] border border-slate-200">
              <thead className="bg-[#111e30] text-white uppercase text-[7pt] tracking-wider">
                <tr>
                  <th className="p-2 border border-slate-300">Sub Asset Class</th>
                  <th className="p-2 border border-slate-300">Target IRR</th>
                  <th className="p-2 border border-slate-300">Volatility</th>
                  <th className="p-2 border border-slate-300">Minimum Investment</th>
                  <th className="p-2 border border-slate-300">Taxation Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 leading-tight">
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold">Private Equity—GP Stakes</td>
                  <td className="p-2 border border-slate-200 font-mono">15–25%</td>
                  <td className="p-2 border border-slate-200">Medium</td>
                  <td className="p-2 border border-slate-200 font-mono">$1,000,000</td>
                  <td className="p-2 border border-slate-200">Ordinary / Capital Gains</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold">Private Real Estate</td>
                  <td className="p-2 border border-slate-200 font-mono">16–18%</td>
                  <td className="p-2 border border-slate-200">Low</td>
                  <td className="p-2 border border-slate-200 font-mono">$350,000</td>
                  <td className="p-2 border border-slate-200">Ordinary / Capital Gains (K-1)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold">Litigation Finance</td>
                  <td className="p-2 border border-slate-200 font-mono">12–15%</td>
                  <td className="p-2 border border-slate-200">Low</td>
                  <td className="p-2 border border-slate-200 font-mono">$1,000,000</td>
                  <td className="p-2 border border-slate-200">Ordinary Income (K-1)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold">Private Credit—Direct Lending</td>
                  <td className="p-2 border border-slate-200 font-mono">10.5–13.5%</td>
                  <td className="p-2 border border-slate-200">Low</td>
                  <td className="p-2 border border-slate-200 font-mono">$350,000</td>
                  <td className="p-2 border border-slate-200">Ordinary Income (K-1)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-semibold">PE Co-Investments</td>
                  <td className="p-2 border border-slate-200 font-mono">12–15%</td>
                  <td className="p-2 border border-slate-200">High</td>
                  <td className="p-2 border border-slate-200 font-mono">$5,000</td>
                  <td className="p-2 border border-slate-200">Capital Gains (1099)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[7pt] text-slate-400 mt-2 font-mono">* Standard investment minimums are fully waived for primary Naviter clients.</p>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>SAMPLE PORTFOLIO CHANNELS</span>
            <span>ALTS INDEX LEDGER</span>
          </div>
        </div>

        {/* Page 15: CLIENT PORTAL PERFORMANCE REPORTING */}
        <div className="print-slide-page bg-white">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Reporting & Secure Client Portal</h2>
            <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE 15 • TECHNOLOGY</span>
          </div>

          <div className="grid grid-cols-2 gap-8 items-center my-auto">
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-[#111e30]">Addepar Technology Integration</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Naviter leverages Addepar engines to sync nightly transaction data from secure custodians across the globe. This generates instant, true TWR and IRR returns net of all fee calculations.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-sans">
                <li>• Comprehensive monthly custom PDF auditing suites</li>
                <li>• Full fee transparency report tracking</li>
                <li>• Secured mobile portfolio apps styled for iOS & Android</li>
              </ul>
            </div>

            <div className="bg-[#111e30]/5 p-5 rounded border border-[#111e30]/10 font-mono text-[8pt] text-slate-800 space-y-2">
              <div className="border-b border-slate-200 pb-1 flex justify-between font-bold">
                <span>Unified Holdings Balance</span>
                <span className="font-serif font-black text-sm text-[#111e30]">$10,999,530.48</span>
              </div>
              <div className="flex justify-between">
                <span>Weighted Net Return (TWR)</span>
                <strong className="text-green-600">+8.00%</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span>Low-Liquidity Locks</span>
                <span>$7,612,056 (69.2%)</span>
              </div>
              <div className="flex justify-between">
                <span>Global Equity SMA</span>
                <span>$1,540,354 (14.0%)</span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden my-1 flex">
                <div className="h-full bg-naviter-gold animate-none" style={{ width: '69.2%' }} />
                <div className="h-full bg-naviter-blue animate-none" style={{ width: '14%' }} />
              </div>
              <div className="text-[7pt] text-slate-405 text-right font-mono font-bold">PORTAL SECURE INTEGRATION</div>
            </div>
          </div>

          <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
            <span>UNMATCHED REPORTING ARBITRAGE</span>
            <span>PORTAL VERIFICATION PLATFORM</span>
          </div>
        </div>

        {/* Pages 16-19: PAGINATED STAFF DIRECTORY */}
        {chunkedBios.map((bioChunk, chunkIdx) => (
          <div key={chunkIdx} className="print-slide-page bg-white">
            <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
              <h2 className="font-serif text-2xl font-bold text-[#111e30] uppercase">Executive Professionals (Page {chunkIdx + 1} of {chunkedBios.length})</h2>
              <span className="text-[10px] font-mono text-naviter-blue bg-naviter-blue/5 px-2.5 py-1 rounded">PAGE {16 + chunkIdx} • BIOS</span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-auto">
              {bioChunk.map((bio) => (
                <div key={bio.name} className="p-4 rounded border border-slate-150 bg-slate-50 flex flex-col justify-between h-32">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#111e30]">{bio.name}</h4>
                    <span className="text-[9px] text-[#58aadb] font-bold block mt-0.5">{bio.title}</span>
                    <ul className="text-[7.5pt] text-slate-600 list-disc pl-4 mt-1 space-y-0.5 max-h-14 overflow-hidden">
                      {bio.bullets.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} className="truncate">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-1 pt-1 border-t border-slate-150 flex justify-between text-[7pt] font-mono text-slate-400">
                    <span>{bio.phone}</span>
                    <span>{bio.email}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-150 pt-3 flex justify-between text-[10px] font-mono text-slate-400">
              <span>NAVITER EXECUTIVE REGISTRY</span>
              <span>PROFESSIONALS COMPENDIUM</span>
            </div>
          </div>
        ))}

        {/* Page 20: DISCLAIMER */}
        <div className="print-slide-page print-dark-bg">
          <div className="border-b border-white/10 pb-3 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold text-[#58aadb] uppercase">Disclaimers & Disclosures</h2>
            <span className="text-[10px] font-mono text-white/50 border border-white/20 px-2 py-0.5 rounded">PAGE 20 • COGNITION</span>
          </div>

          <div className="my-auto py-2 space-y-2 text-[7.5pt] text-white/70 leading-relaxed max-w-4xl font-sans">
            <p>
              Naviter Wealth LLC ("Naviter") is a registered investment advisor with the U.S. Securities and Exchange Commission (SEC) under the Investment Advisors Act of 1940. Information regarding investment services are provided solely to gain an understanding of our investment philosophy and strategies. Advice may only be provided by Naviter's advisory persons after entering into an advisory agreement and providing all background records.
            </p>
            <p>
              <strong>Risk Disclosure</strong>: Information provided in this material is for educational purposes only and not a recommendation of any investment, legal, tax, or financial product. Consult with a qualified professional before making any financial decisions. <strong>Past performance is no guarantee of future returns. Every investment involves a degree of risk.</strong>
            </p>
            <p>
              An investment in a low-liquidity alternative involves significant risks and is suitable only for those persons who can bear the economic risk of the loss of their entire investment and who have limited need for liquidity in their investment.
            </p>
            <p>
              Address: 1 Information Way, Suite 400 | Little Rock, AR 72202 • Verify of Q2 2026 filings
            </p>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between text-[10px] font-mono text-white/40">
            <span>SEC & FINRA REGULATION DATA</span>
            <span>END OF DECK REGISTER RECORD</span>
          </div>
        </div>
        </>
      )}
      </div>

      {/* Pristine Fiduciary Print Helper Modal */}
      {showIframePrintModal && (
        <div className="fixed inset-0 bg-[#111e30]/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 no-print sm:p-6">
          <div className="bg-white rounded-xl shadow-2xl border border-naviter-navy/10 max-w-lg w-full overflow-hidden flex flex-col font-sans animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#111e30] px-6 py-4 flex items-center gap-3 border-b border-white/10 text-white">
              <span className="p-2 bg-[#58aadb]/20 rounded-lg text-[#58aadb]">
                <BadgeAlert className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="font-serif font-black text-sm uppercase tracking-wide text-white">Direct Print Integration</h3>
                <span className="text-[10px] text-[#58aadb] font-mono tracking-wider">Bypassing Sandbox Constraints</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-5 space-y-4 text-xs text-slate-700 leading-relaxed overflow-y-auto max-h-[65vh]">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded text-slate-600 font-medium">
                Modern browsers block printing and PDF exports when applications are displayed inside an <span className="text-[#111e30] font-bold">iFrame Sandbox</span>. We have built an effortless solution.
              </div>

              {/* ACTION: Launch Standalone */}
              <div className="bg-[#111e30]/5 p-4 rounded-lg border border-[#58aadb]/30 text-center space-y-3">
                <span className="text-[10px] uppercase font-mono font-black text-naviter-navy block tracking-wider">Step 1: Open in Standalone Tab</span>
                <p className="text-[11px] text-slate-600">
                  Open the full application in a clean, standalone browser window outside of the sandboxed workspace.
                </p>
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowIframePrintModal(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#58aadb] hover:bg-[#58aadb]/90 text-white font-sans text-xs uppercase font-extrabold tracking-wider rounded shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Standalone App
                </a>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-mono font-extrabold text-[#111e30]/50 tracking-wider block">Step 2: Print Settings in Standalone Mode:</span>
                <ol className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#58aadb]/10 text-naviter-navy flex items-center justify-center font-black text-[9px] shrink-0 mt-0.5 border border-[#58aadb]/30">A</span>
                    <span>In the standalone tab, simply click <strong>"Print Deck"</strong> on the main page.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#58aadb]/10 text-naviter-navy flex items-center justify-center font-black text-[9px] shrink-0 mt-0.5 border border-[#58aadb]/30">B</span>
                    <span>In your browser's print dialog, set layout to <strong>Landscape</strong>, choose <strong>Letter</strong> paper size, enable <strong>Background Graphics</strong>, and set margins to <strong>None</strong>.</span>
                  </li>
                </ol>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                <span className="text-[9px] uppercase font-mono font-bold text-slate-400 tracking-wider">Alternative Inspection:</span>
                <p className="text-slate-500 font-sans text-[11px]">
                  You can also preview the entire 20-page booklet on screen right now to verify alignments and biographies.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
              <button
                onClick={() => {
                  setShowIframePrintModal(false);
                  setOnScreenPrintPreview(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-[#111e30] hover:bg-[#111e30]/90 text-white font-sans text-[10px] uppercase font-extrabold tracking-wider rounded cursor-pointer transition-colors shadow-sm text-center"
              >
                Proof Booklet on Screen
              </button>
              
              <div className="w-full sm:w-auto flex items-center gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowIframePrintModal(false);
                    try {
                      window.print();
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="px-3 py-2 text-[10px] font-sans font-bold uppercase text-slate-500 hover:text-[#111e30] cursor-pointer"
                  title="Fails inside strict sandboxes"
                >
                  Force Print Here
                </button>
                <button
                  onClick={() => setShowIframePrintModal(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-sans text-[10px] uppercase font-extrabold tracking-wider rounded cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
