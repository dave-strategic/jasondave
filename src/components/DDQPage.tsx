import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Scale, Landmark, BookOpen, Clock, 
  ArrowRight, Search, FileDown, CheckCircle2, 
  TrendingUp, Percent, ChevronRight, HelpCircle,
  Users, Briefcase, FileText, Lock, AlertTriangle, 
  Download, Database, Layers, CheckSquare, Square
} from 'lucide-react';
import { Seo } from './Seo';

interface TeamMember {
  name: string;
  title: string;
  credentials?: string;
  roles: string[];
}

interface ClientSegment {
  segment: string;
  aum: string;
  percent: string;
  focus: string;
}

interface DiligenceDomain {
  domain: string;
  focus: string;
  requirement: string;
}

interface QuestionAnswer {
  num: number;
  q: string;
  a: React.ReactNode;
  tags: string[];
}

export const DDQPage = ({ 
  onNavigateToContact, 
  onNavigateToFirm,
  onNavigateToPolicy
}: { 
  onNavigateToContact: () => void; 
  onNavigateToFirm: () => void; 
  onNavigateToPolicy: () => void;
}) => {
  const [activeTabSection, setActiveTabSection] = useState<string | null>('firm_profile');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeCards, setActiveCards] = useState<Record<string, boolean>>({});
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  const toggleQuestion = (num: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const expandSectionQuestions = (sectionId: string) => {
    const qList = allQuestionsAnswers[sectionId] || [];
    setExpandedQuestions(prev => {
      const next = { ...prev };
      qList.forEach(qa => {
        next[qa.num] = true;
      });
      return next;
    });
  };

  const collapseSectionQuestions = (sectionId: string) => {
    const qList = allQuestionsAnswers[sectionId] || [];
    setExpandedQuestions(prev => {
      const next = { ...prev };
      qList.forEach(qa => {
        next[qa.num] = false;
      });
      return next;
    });
  };

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const listener = (e: any) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  // Scroll listener to detect active cards in viewport center on mobile
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
        
        // Viewport center trigger band (within 22% height of screen center)
        const threshold = window.innerHeight * 0.22;
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

  const getViewportConfig = (amountOnDesktop = 0.35) => ({
    once: false,
    margin: "0px",
    amount: amountOnDesktop
  });

  const tabSections = [
    { id: 'firm_profile', label: 'Firm Profile & Team' },
    { id: 'philosophy', label: 'Investment & Diligence' },
    { id: 'risk_management', label: 'Risk & Operations' },
    { id: 'client_service', label: 'Client Service' },
    { id: 'fees_comp', label: 'Fees & Compensation' },
    { id: 'deliverables', label: 'Deliverables' }
  ];

  const clientSegments: ClientSegment[] = [
    { segment: "HNW / UHNW ($5MM+)", aum: "$1,400 MM", percent: "82.3%", focus: "Core Family Office & Bespoke Advisory" },
    { segment: "Retail (<$5MM)", aum: "$170 MM", percent: "10.0%", focus: "Multi-generational planning for HNW families" },
    { segment: "Institutional", aum: "$150 MM", percent: "8.8%", focus: "Endowments, Foundations, and Pensions" },
    { segment: "Total Firm AUM", aum: "$1,720 MM", percent: "100%", focus: "Focused on UHNW segment; Retail and Institutional are directly related to HNW families." }
  ];

  const teamMembers: TeamMember[] = [
    { name: "Bentley Blackmon", title: "CEO & Founder", credentials: "CFA®, CFP®, CEPA, CPA (inactive), MBA", roles: ["Leadership", "Client Service", "Investment Analysis"] },
    { name: "Phillip Worthen", title: "President", roles: ["Leadership", "Client Service", "Investment Analysis"] },
    { name: "Jordan Bauer", title: "Chief Operating Officer", credentials: "CFP®, CPA", roles: ["Leadership", "Client Service", "Investment Analysis", "Operations"] },
    { name: "John Kornet", title: "Chief Investment Officer", credentials: "CFP®", roles: ["Leadership", "Client Service", "Investment Analysis"] },
    { name: "Danny Russell", title: "Chief Compliance Officer", credentials: "MBA", roles: ["Compliance"] },
    { name: "Katie McDaniel", title: "Managing Director and Head of Operations", credentials: "CFP®, CPA", roles: ["Client Service", "Operations"] },
    { name: "Jackson Ratcliff", title: "Managing Director & Head of Advisory Services", roles: ["Business Development", "Client Service"] },
    { name: "Grant Stevenson", title: "Managing Director", roles: ["Business Development", "Client Service"] },
    { name: "Trevor Booth", title: "Managing Director", roles: ["Business Development", "Client Service"] },
    { name: "Matt Estes", title: "Managing Director", roles: ["Business Development", "Client Service"] },
    { name: "Nicole Hobbs", title: "Senior Tax Strategist", credentials: "CPA", roles: ["Tax Advisory", "Client Service"] },
    { name: "Blane Brooks", title: "Affiliate Program Director", roles: ["Business Development"] },
    { name: "Blake Abston", title: "Senior Financial Analyst", credentials: "CFP®", roles: ["Client Service", "Operations"] },
    { name: "Carter Robinson", title: "Financial Analyst", roles: ["Client Service", "Operations"] },
    { name: "Noah Smith", title: "Financial Analyst", roles: ["Client Service", "Operations"] }
  ];

  const diligenceDomains: DiligenceDomain[] = [
    { domain: "Management Quality", focus: "Evaluation of leadership stability and experience.", requirement: "Proven outperformance across multiple market cycles and fund vintages." },
    { domain: "Asset Specifics", focus: "Granular analysis of the underlying investment.", requirement: "Deep alignment with specific geographic and sector-specific growth drivers." },
    { domain: "Underwriting Standards", focus: "Verification of deal-sourcing competitive advantages.", requirement: "Evidence of exclusive industry partnerships or proprietary sourcing channels." },
    { domain: "Operational Excellence", focus: "Review post-acquisition value-add strategy.", requirement: "Demonstrable ability to drive multiple expansion through operational improvements." },
    { domain: "Risk Mitigation", focus: "Stress testing against macro disruptions.", requirement: "Robust contingency plans and clearly defined risk management frameworks." },
    { domain: "Track Record Verification", focus: "Quantitative auditing of historical performance.", requirement: "Detailed verification of IRR, MOIC, and DPI against relevant peer benchmarks." },
    { domain: "Correlation Analysis", focus: "Portfolio integration and macro-sensitivity.", requirement: "Must demonstrate low correlation to liquid markets and existing private holdings." },
    { domain: "Fee & Structure", focus: "Transparency and alignment of interest review.", requirement: "Institutional pricing with fair hurdles and preferred return structures." },
    { domain: "Reporting & Ops", focus: "Administrative and transparency requirements.", requirement: "Mandatory quarterly valuations and annual audited financial statements." },
    { domain: "Tax Efficiency", focus: "Structural optimization for private capital.", requirement: "Strategic use of 1031 exchanges, Opportunity Zones, or tax-efficient vehicles." }
  ];

  const feeSchedule = [
    { tier: "First $25,000,000", fee: "0.85%" },
    { tier: "Next $25,000,000 ($25M – $50M)", fee: "0.40%" },
    { tier: "Next $50,000,000 ($50M – $100M)", fee: "0.25%" },
    { tier: "Above $100,000,000", fee: "0.20%" }
  ];

  const secondaryRevenueStreams = [
    { label: "Spread on cash sweep accounts", hasRevenue: false },
    { label: "Proprietary products", hasRevenue: false },
    { label: "Commissions", hasRevenue: false },
    { label: "Principal trading markups/markdowns", hasRevenue: false },
    { label: "Securities lending (lending client shares to institutions for short selling)", hasRevenue: false },
    { label: "Revenue sharing (fees paid by investment managers to be on the firm's platform)", hasRevenue: false },
    { label: "Spreads on margin lending", hasRevenue: false },
    { label: "Ticket charges", hasRevenue: false },
    { label: "Selling order flow", hasRevenue: false },
    { label: "Soft dollar arrangements (receiving research or other services from broker-dealers in return for placing trades)", hasRevenue: false },
    { label: "Bank products (mortgages, bank accounts, credit cards)", hasRevenue: false }
  ];

  const allQuestionsAnswers: Record<string, QuestionAnswer[]> = {
    firm_profile: [
      {
        num: 1,
        q: "Provide a brief history of the parent firm, ownership structure, and any recent or anticipated changes in control. Is the firm entirely employee-owned, a publicly traded bank, or backed by private equity?",
        tags: ["history", "ownership", "principals", "independent", "private equity"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth was founded in January of 2021 by a team of highly experienced wealth management professionals seeking to build a true, uncompromised family office experience. The firm is strictly independent and closely held by its working principals. There is no outside private equity backing, nor are we a publicly traded entity.
          </p>
        )
      },
      {
        num: 2,
        q: "Is the parent firm a Broker-Dealer, an RIA, or a “Hybrid” (dual-registered)?",
        tags: ["ria", "broker-dealer", "hybrid", "fiduciary", "conflicts"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth is a pure, 100% independent Registered Investment Adviser (RIA). We act as a legal fiduciary at all times. We have no broker-dealer affiliation, completely eliminating the inherent conflicts of interest associated with suitability standards and commission-based investment products.
          </p>
        )
      },
      {
        num: 3,
        q: "Has the parent firm been subject to any regulatory, criminal, or civil actions in the past 5 years? If so, please list.",
        tags: ["regulatory", "civil", "criminal", "actions", "clean"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth maintains a clean regulatory record.
          </p>
        )
      },
      {
        num: 4,
        q: "Who is the Chief Compliance Officer (CCO)? Is this a dedicated role at the parent firm, and how does compliance oversight apply to your specific team?",
        tags: ["cco", "compliance", "danny russell", "oversight"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth’s Chief Compliance Officer is <strong>Danny Russell</strong>. This is a dedicated, independent professional role with the direct authority to enforce all regulatory standards. Because we operate as a fully integrated independent firm, compliance is localized and deeply integrated into our daily operations.
          </p>
        )
      },
      {
        num: 5,
        q: "Please classify your firm’s structural and operational independence:",
        tags: ["independence", "sovereign", "sec", "operations", "back-office"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed text-naviter-gold font-semibold uppercase tracking-wider text-xs">
              Classification: Fully Integrated Sovereign RIA
            </p>
            <p className="font-sans leading-relaxed">
              Naviter Wealth maintains independent SEC registration and manages all middle-office, client service, compliance, investment analysis, due diligence, and operational functions internally. This provides us with maximum fiduciary alignment, unrestricted technological flexibility, and unconstrained access to global investment opportunities without corporate interference.
            </p>
          </div>
        )
      },
      {
        num: 6,
        q: "List any regulatory, criminal, or civil actions involving the advisory team or any of its members for which the original date of infraction falls within the last 5 years.",
        tags: ["infraction", "advisory team", "civil", "actions"],
        a: (
          <p className="font-sans leading-relaxed">
            Zero.
          </p>
        )
      },
      {
        num: 7,
        q: "What is the current AUM (Assets Under Management) for both the Parent Firm AND your specific Advisory Team?",
        tags: ["aum", "assets", "billions", "growth"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth’s current AUM is <strong>$1.7B</strong> as of February 2026. Naviter Wealth operates as both the Parent Firm and the Advisory Team.
          </p>
        )
      },
      {
        num: 8,
        q: "Please break down your specific Team's AUM by client segments. Separately, note the percentage of your AUM held in any client-directed, concentrated equity positions above $10 Million.",
        tags: ["aum breakdown", "client segments", "uhnw", "retail", "institutional"],
        a: (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-naviter-navy/10 rounded-sm">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-naviter-navy/5 text-naviter-navy font-bold uppercase tracking-wider border-b border-naviter-navy/10">
                  <tr>
                    <th className="p-3">Client Segment</th>
                    <th className="p-3">AUM (Millions)</th>
                    <th className="p-3">% of Total Firm AUM</th>
                    <th className="p-3">Strategic Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-naviter-navy/5 text-naviter-navy/80">
                  {clientSegments.map((seg, idx) => (
                    <tr key={idx} className={idx === clientSegments.length - 1 ? 'font-semibold bg-naviter-navy/5' : ''}>
                      <td className="p-3">{seg.segment}</td>
                      <td className="p-3 font-mono">{seg.aum}</td>
                      <td className="p-3 font-mono">{seg.percent}</td>
                      <td className="p-3 text-naviter-navy/70 leading-normal">{seg.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs font-sans text-naviter-navy/60 italic leading-relaxed">
              Note: The “retail” and institutional assets of the firm are directly related to our UHNW families, as Naviter Wealth does not maintain a “retail” practice as most firms do. Our operational focus is entirely on the UHNW market.
            </p>
          </div>
        )
      },
      {
        num: 9,
        q: "Please provide the size of your specific Team and a breakdown of your team’s employees by primary function. Use the following classifications: Leadership, Business Development, Investment Analysis, Client Service, Client Operations, Other.",
        tags: ["team size", "employees", "functions", "leadership", "services", "operations"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed">
              Our highly specialized team consists of <strong>15 dedicated professionals</strong> with deep structural alignment across wealth management, operations, compliance, and custom tax strategies.
            </p>
            <div className="overflow-x-auto border border-naviter-navy/10 rounded-sm max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#111e30] text-white font-bold uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Credentials</th>
                    <th className="p-3">Roles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-naviter-navy/5 text-naviter-navy/85">
                  {teamMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-naviter-navy/5 transition-colors">
                      <td className="p-3 font-semibold text-naviter-navy">{member.name}</td>
                      <td className="p-3">{member.title}</td>
                      <td className="p-3 text-naviter-blue font-mono">{member.credentials || '—'}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {member.roles.map((r, rIdx) => (
                            <span key={rIdx} className="bg-naviter-navy/5 text-naviter-navy px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap">
                              {r.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        num: 10,
        q: "What is the professional turnover rate for your team over the last 3 years?",
        tags: ["turnover", "stability", "turnover rate", "staff"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth’s professional turnover rate over the last 3 years has been <strong>6.7%</strong>, and since inception, <strong>3.9%</strong>. We maintain a highly stable, integrated core advisory and investment team.
          </p>
        )
      },
      {
        num: 11,
        q: "What is the specific succession plan for the lead advisor(s) on this team?",
        tags: ["succession", "continuity", "next generation", "security"],
        a: (
          <p className="font-sans leading-relaxed">
            Next-generation advisors and operational leaders are heavily integrated into all client relationships. Multiple core team members fully support all lead advisors, ensuring a seamless transfer of institutional memory, technical insights, and consistent relationship continuity.
          </p>
        )
      },
      {
        num: 12,
        q: "What percentage of your team holds at least one of the following designations or degrees: CPA, CFP, CFA, MBA? Note these team members and their significant industry designations.",
        tags: ["credentials", "cpa", "cfp", "cfa", "mba", "degrees"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed">
              <strong>47%</strong> of Naviter Wealth’s professionals hold at least one of these highly-regarded industry credentials:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">Bentley Blackmon</span> (CEO):
                <div className="text-naviter-blue font-mono mt-0.5">CFA®, CFP®, CPA (inactive), MBA</div>
              </div>
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">Jordan Bauer</span> (COO):
                <div className="text-naviter-blue font-mono mt-0.5">CFP®, CPA</div>
              </div>
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">John Kornet</span> (CIO):
                <div className="text-naviter-blue font-mono mt-0.5">CFP®</div>
              </div>
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">Danny Russell</span> (CCO):
                <div className="text-naviter-blue font-mono mt-0.5">MBA</div>
              </div>
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">Katie McDaniel</span> (MD):
                <div className="text-naviter-blue font-mono mt-0.5">CFP®, CPA</div>
              </div>
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">Nicole Hobbs</span> (Tax Strategist):
                <div className="text-naviter-blue font-mono mt-0.5">CPA</div>
              </div>
              <div className="p-3 bg-naviter-navy/5 rounded border border-naviter-navy/5">
                <span className="font-semibold text-naviter-navy">Blake Abston</span> (Financial Analyst):
                <div className="text-naviter-blue font-mono mt-0.5">CFP®</div>
              </div>
            </div>
          </div>
        )
      }
    ],
    philosophy: [
      {
        num: 13,
        q: "Where does the Investment Committee reside? Is this committee at the parent firm’s 'home office' level, or does your specific team make the final discretionary and due diligence decisions?",
        tags: ["investment committee", "discretionary", "decisions", "internal"],
        a: (
          <p className="font-sans leading-relaxed">
            Naviter Wealth has its own dedicated, internal <strong>Investment Committee</strong>. All discretionary allocations, sourcing, and due diligence decisions are made in-house. This gives us complete flexibility to design and build bespoke portfolios tailored directly to individual tax situations, liquidity profiles, and generational goals, rather than adhering to rigid models forced by a corporate home office.
          </p>
        )
      },
      {
        num: 14,
        q: "Describe your internal Investment Due Diligence & Operational Due Diligence (ODD) process. Do you rely on corporate-recommended lists, or do you conduct proprietary research? Please link your virtual data room.",
        tags: ["due diligence", "odd", "proprietary", "data room", "research"],
        a: (
          <div className="space-y-6">
            <p className="font-sans leading-relaxed">
              Naviter Wealth conducts rigorous, proprietary research in-house and avoids pre-packaged corporate menus or feeder platforms like CAIS and iCapital, which add unnecessary costs and layer fees. Our approach is hands-on and institutional-grade, particularly in private markets.
            </p>
            <div className="flex justify-start">
              <a 
                href="https://naviterwealth.my.salesforce-sites.com/ClientDueDiligenceRoom" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-naviter-blue hover:bg-naviter-navy px-6 py-3 rounded-none transition-all cursor-pointer shadow-md"
              >
                <Database className="w-4 h-4" />
                Access Naviter Wealth Data Room
              </a>
            </div>
            <div className="space-y-4">
              <h5 className="font-serif text-lg text-naviter-navy font-semibold">Proprietary Due Diligence Framework</h5>
              <p className="font-sans leading-relaxed text-sm text-naviter-navy/70">
                Led by Chief Investment Officer John Kornet, our Investment Committee utilizes a rigorous <strong>10-point framework</strong> to vet every manager and specialized asset before portfolio inclusion:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diligenceDomains.map((domain, idx) => (
                  <div key={idx} className="p-4 bg-[#fcfcfe] rounded border border-naviter-navy/5 shadow-sm space-y-1 hover:border-naviter-blue/30 transition-all">
                    <div className="font-serif font-bold text-sm text-naviter-navy flex items-center justify-between">
                      <span>{idx + 1}. {domain.domain}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-naviter-gold shrink-0" />
                    </div>
                    <p className="text-xs text-naviter-navy/70 leading-relaxed"><strong className="text-naviter-navy/80">Focus:</strong> {domain.focus}</p>
                    <p className="text-xs text-naviter-blue/90 leading-relaxed"><strong className="text-naviter-navy/80">Requirement:</strong> {domain.requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        num: 15,
        q: "What specific investment vehicles do you utilize in your typical portfolio construction, e.g., Mutual Funds, ETFs, Direct Indexing, SMAs, Limited Partnerships, Structured Notes, Options/Derivatives? Please explain your rationale.",
        tags: ["vehicles", "etfs", "direct indexing", "limited partnerships", "smas", "fees"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed">
              We leverage highly cost- and tax-efficient vehicles: <strong>Direct Indexing, ETFs, Interval Funds, and Limited Partnerships</strong>.
            </p>
            <p className="font-sans leading-relaxed text-sm border-l-2 border-naviter-blue pl-4 text-naviter-navy/70 italic">
              <strong>Rationale:</strong> We aggressively avoid standard mutual funds due to capital gain inefficiencies, as well as highly structured notes or complex bank products that embed substantial, opaque fee structures.
            </p>
          </div>
        )
      },
      {
        num: 16,
        q: "What is your view of passive vs. active management regarding market efficiency?",
        tags: ["passive vs active", "efficiency", "alpha", "public equities", "private assets"],
        a: (
          <p className="font-sans leading-relaxed">
            We view global public equity markets as highly efficient, meaning structural consistent outperformance through active picking is unlikely and expensive. Therefore, we implement the public core of the portfolio through <strong>Direct Indexing</strong> for a passive, zero-cost, tax-optimized track. Conversely, active management is aggressively reserved for highly inefficient markets—such as Private Equity, Private Credit, and Real Estate—where structural asymmetric information and active operational value-add can generate genuine alpha.
          </p>
        )
      },
      {
        num: 17,
        q: "What is your tax-loss harvesting policy? Which assets do you harvest, and how frequently?",
        tags: ["tax-loss harvesting", "taxes", "tax alpha", "systematic"],
        a: (
          <p className="font-sans leading-relaxed">
            Tax drag is the single largest silent eroder of historical wealth. We implement systematic, automated, software-driven tax-loss harvesting at the individual tax-lot level across all eligible liquid security structures. This is managed as an <strong>ongoing, year-round process</strong> (typically monthly), rather than merely a year-end event.
          </p>
        )
      },
      {
        num: 18,
        q: "True Diversification: How does the firm prevent 'over-diversification' while still effectively mitigating portfolio risk?",
        tags: ["diversification", "closet indexing", "alternative assets", "correlation"],
        a: (
          <p className="font-sans leading-relaxed">
            We aggressively avoid "closet indexing" (owning multiple overlapping funds that merely mimic index averages). Instead, we prevent over-diversification by maintaining high-conviction sizes in distinct, non-correlated asset classes. We ensure our allocations are structurally non-correlated (e.g. pairing liquid global equities with specialized private credit and tangible real assets), ensuring that our highest conviction positions generate true structural protection instead of style box clutter.
          </p>
        )
      },
      {
        num: 19,
        q: "How do you source alternative investments? What are the specific requirements an illiquid asset must meet to be included in a portfolio? Do you have direct access to General Partners (GPs) of private funds, or are you utilizing an aggregator/feeder fund platform? If so, which ones?",
        tags: ["alternatives", "sourcing", "gp access", "feeder platforms", "icapital", "cais"],
        a: (
          <p className="font-sans leading-relaxed">
            Due to our institutional scale and national reputation, we maintain <strong>direct access to top-quartile General Partners (GPs)</strong> directly, avoiding retail feeder networks like iCapital or CAIS. This allows us to bypass their layered, expensive secondary aggregator fees. We actively negotiate lower base fees, preferential liquidity terms, and clear co-investment access, passing 100% of these structural economic benefits directly back to our client families.
          </p>
        )
      },
      {
        num: 20,
        q: "How does your team handle bespoke private asset requests that fall outside of your core recommended models? Are you willing and structurally able to provide fiduciary oversight and administrative support for assets you did not originally source, or are clients required to manage those 'away' from the firm?",
        tags: ["bespoke", "held-away", "family office", "fiduciary oversight", "capital calls"],
        a: (
          <p className="font-sans leading-relaxed">
            Operating as a holistic family office integrator, we routinely ingest, manage, and continuously report on "held-away" bespoke private investments, family business equities, and legacy real estate. We manage ongoing capital calls, integrate private valuations into our core client reporting, and incorporate these assets directly into the overall asset allocation and liquidity profile.
          </p>
        )
      },
      {
        num: 21,
        q: "What is your approach to asset allocation regarding liquid public markets vs. low-liquidity private assets? What is the typical allocation range for each?",
        tags: ["allocation", "liquidity", "private assets", "endowment model"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed">
              Our allocations are robustly customized using an <strong>institutional-quality endowment framework</strong>. For clients possessing suitable long-term horizons, we frequently apply private asset allocations of <strong>40%+</strong>, paired with optimized liquid instruments.
            </p>
            <p className="font-sans leading-relaxed text-sm bg-naviter-navy/5 p-4 border-l-2 border-naviter-blue">
              To review our structural investment policies, asset-liability pairings, and core portfolios, please explore our formal{' '}
              <button onClick={onNavigateToPolicy} className="text-naviter-blue hover:text-naviter-navy underline font-semibold font-serif cursor-pointer">
                Naviter Investment Policy Statement
              </button>.
            </p>
          </div>
        )
      },
      {
        num: 22,
        q: "Do the team's principals and advisors invest their personal capital in the exact same strategies, funds, and alternatives recommended to clients? If so, do they do so with the same fees and terms as the client? List any utilized or recommended strategies not currently owned personally by your team.",
        tags: ["alignment", "personal assets", "co-investment", "ethics"],
        a: (
          <p className="font-sans leading-relaxed">
            <strong>Yes. Complete alignment is a foundational mandate of our firm.</strong> Our principals and lead wealth advisors invest their own liquid net worth directly alongside our client families in the exact same holdings, strategies, and private alternatives, sharing identical lock-ups, capital call terms, and manager fee schedules.
          </p>
        )
      }
    ],
    risk_management: [
      {
        num: 23,
        q: "How do you define and measure risk beyond standard deviation?",
        tags: ["risk metrics", "downside risk", "drawdown", "sharpe", "sortino", "tracking error"],
        a: (
          <p className="font-sans leading-relaxed">
            We employ a multi-dimensional risk frame. Beyond simple standard deviation, our investment team tracks over <strong>50 distinct quantitative and operational metrics</strong>, focusing closely on Maximum Drawdown, Tracking Error, Sharpe Ratios, and Sortino Ratios. We actively model these at both individual strategy levels and consolidated portfolio coordinates.
          </p>
        )
      },
      {
        num: 24,
        q: "Do you conduct stress testing or scenario analysis on client portfolios?",
        tags: ["stress testing", "monte carlo", "simulations", "macro shocks", "interest rates"],
        a: (
          <p className="font-sans leading-relaxed">
            Yes. We routinely conduct advanced Monte Carlo simulations and historical stress tests against extreme structural macro disruptions. We map every portfolio against high-impact historical shocks (e.g., the 2008 Great Financial Crisis, the 2020 COVID shock, and severe stagflationary interest rate spikes) under full asset-liability constraints to understand downside vulnerabilities before volatility occurs.
          </p>
        )
      },
      {
        num: 25,
        q: "How do you manage liquidity risk, particularly with alternative investments?",
        tags: ["liquidity", "private capital", "capital calls", "distributions"],
        a: (
          <p className="font-sans leading-relaxed">
            We systematically pair private market capital call requirements with projected secondary distribution flows and investment yield. Additionally, we isolate a designated, highly liquid core component designed strictly with low correlations to private cycles to prevent forced asset sales during broader market stress.
          </p>
        )
      },
      {
        num: 26,
        q: "Which independent qualified custodians do you use to hold client assets? Are you required to custody assets at your parent firm?",
        tags: ["custody", "schwab", "fiduciary", "safekeeping"],
        a: (
          <p className="font-sans leading-relaxed">
            We partner with <strong>Charles Schwab</strong>, a premier, institutional-grade, independent third-party custodian. Naviter Wealth functions as the independent wealth advisor and maintains zero physical custody of or direct access to client holdings, ensuring absolute separation of duties and secure asset safekeeping.
          </p>
        )
      },
      {
        num: 27,
        q: "Do you have the authority to withdraw funds from client accounts?",
        tags: ["authority", "wire transfers", "controls", "security"],
        a: (
          <p className="font-sans leading-relaxed">
            No. Our structural authority is strictly limited to deducting agreed-upon advisory fees and executing trades. Any third-party wire transfers or standing disbursement directions undergo independent client verification, including absolute mandatory verbal confirmation.
          </p>
        )
      },
      {
        num: 28,
        q: "Describe your cybersecurity infrastructure. Do you use 2-Factor Authentication (2FA) and encryption? What is the limit of your E&O (Errors & Omissions) and Cyber Liability insurance coverage per occurrence?",
        tags: ["cybersecurity", "2fa", "encryption", "insurance", "limits"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed">
              We leverage multi-layered security controls, including mandatory <strong>Two-Factor Authentication (2FA)</strong> across all nodes, enterprise-grade end-to-end communication encryption, and secure internal systems. We undergo proactive network penetration tests and maintain robust liability coverages.
            </p>
            <div className="flex gap-4 text-xs font-sans font-semibold">
              <div className="px-4 py-2.5 bg-naviter-navy/5 border border-naviter-navy/10 rounded-sm">
                Cyber Liability Limit: <span className="text-naviter-blue font-mono">$2,000,000</span>
              </div>
              <div className="px-4 py-2.5 bg-naviter-navy/5 border border-naviter-navy/10 rounded-sm">
                E&O Insurance Limit: <span className="text-naviter-blue font-mono">$3,000,000</span>
              </div>
            </div>
          </div>
        )
      },
      {
        num: 29,
        q: "Who handles your trade reconciliation? How often is it performed?",
        tags: ["reconciliation", "operations", "trades", "daily"],
        a: (
          <p className="font-sans leading-relaxed">
            Trade reconciliation is automatically executed <strong>daily</strong> by our institutional Operations division directly matching secure custodial data feeds. This isolates portfolio managers and wealth planning advisors from manual transaction inputs. Compliance audits all billing and trade coordinates quarterly.
          </p>
        )
      }
    ],
    client_service: [
      {
        num: 30,
        q: "What is the ratio of clients to team members on your specific team?",
        tags: ["client ratio", "capacity", "attention", "service"],
        a: (
          <p className="font-sans leading-relaxed">
            To maintain the intense focus required to support ultra-high-net-worth schedules, we strictly limit our overall ratio to <strong>under 20 family relationships per team professional</strong>. Our actual operating density today is comfortably <strong>below 15:1</strong>.
          </p>
        )
      },
      {
        num: 31,
        q: "Do you provide integrated family office services for your clients? If so, describe which ones and how you deliver them.",
        tags: ["family office", "services", "tax", "trust", "estate", "insurance", "lending"],
        a: (
          <p className="font-sans leading-relaxed">
            Yes. We view wealth as a multi-generational structure, delivering a modular family office framework. Our core team coordinates advanced tax planning, corporate structuring, trust & estate frameworks, Property & Casualty and life insurance planning, custom lending access, integrated philanthropic directives, and consolidated asset aggregation.
          </p>
        )
      },
      {
        num: 32,
        q: "Do you have dedicated, in-house tax and estate planning experts on your local team, or do you rely on corporate support?",
        tags: ["tax planning", "cpas", "nicole hobbs", "estate plans"],
        a: (
          <p className="font-sans leading-relaxed">
            Yes. Our internal team includes <strong>four active CPAs</strong>, featuring our Senior Tax Strategist, <strong>Nicole Hobbs, CPA</strong>. We coordinate structural and trust strategies in-house directly alongside our client families' tax preparers and estate counsels, avoiding unaligned outsourced desks.
          </p>
        )
      },
      {
        num: 33,
        q: "Is comprehensive financial planning (Estate review, Tax strategy, Philanthropy) included in your stated advisory fee, or billed separately?",
        tags: ["planning cost", "included fees", "estate coordination"],
        a: (
          <p className="font-sans leading-relaxed">
            <strong>All family office plans, tax strategies, trust audits, estate coordination, and philanthropic planning are fully included</strong> within our standard, transparent asset-under-management fee structure. We charge zero hourly billing or secondary consultation premiums.
          </p>
        )
      },
      {
        num: 34,
        q: "What is the team's primary performance reporting software? Can you provide performance reporting on 'held-away' assets not custodied with your firm?",
        tags: ["addepar", "software", "twr", "irr", "held-away", "reporting"],
        a: (
          <p className="font-sans leading-relaxed">
            We utilize <strong>Addepar</strong>, the preeminent institutional reporting system built specifically for multi-family structures. Addepar executes daily data aggregation across all separate custodians and held-away allocations, translating public and private valuations into a unified view. The framework displays public market Time-Weighted Returns (TWR) alongside private asset Internal Rates of Return (IRR), TVPI, MOIC, and DPI in a clean, consolidated report.
          </p>
        )
      }
    ],
    fees_comp: [
      {
        num: 35,
        q: "Please provide your standard advisory fee schedule. Is it tiered, or does it have breakpoints?",
        tags: ["fee schedule", "standard fee", "breakpoints", "tiering"],
        a: (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-naviter-navy/10 rounded-sm">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#111e30] text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Assets Under Management (AUM) Tier</th>
                    <th className="p-3">Annual Advisory Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-naviter-navy/5 text-naviter-navy/85">
                  {feeSchedule.map((tier, idx) => (
                    <tr key={idx} className="hover:bg-naviter-navy/5 transition-colors">
                      <td className="p-3">{tier.tier}</td>
                      <td className="p-3 font-mono font-semibold text-naviter-blue">{tier.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs font-sans text-naviter-navy/60 italic leading-dashed">
              * The standard tiered schedule applies uniformly to all advisor-guided mandates.
            </p>
          </div>
        )
      },
      {
        num: 36,
        q: "Do you offer a performance-based fee schedule? If so, provide details.",
        tags: ["performance-based", "incentive fee", "carry", "qualified client"],
        a: (
          <p className="font-sans leading-relaxed">
            Yes. For qualifying client relationships of <strong>$25MM or above</strong>, we offer an optional performance-aligned fee track. Under this selection, the base asset-management fee is reduced by half of our stated standard rate, paired with a <strong>20% "carry" premium</strong> triggered exclusively over a net 7% return hurdle delivered directly back to the client.
          </p>
        )
      },
      {
        num: 37,
        q: "What is the weighted average fee for underlying funds in a typical portfolio? Additionally, break these out into marketable securities and private/alternative assets.",
        tags: ["underlying fees", "fund expense", "marketable", "alternatives"],
        a: (
          <p className="font-sans leading-relaxed">
            We construct portfolios with strict structural pricing discipline. The aggregate blended underlying vehicle cost for our liquid, marketable assets (direct indexes, plain-vanilla ETFs) sits <strong>well below 0.15%</strong>. For private alternative sleeves, institutional sourcing enables us to secure custom structures averaging <strong>~1.5%</strong>. Under an endowment-style 60% liquid / 40% private asset blend, consolidated underlying portfolio vehicle weightings average roughly <strong>0.70%</strong>.
          </p>
        )
      },
      {
        num: 38,
        q: "Besides the investment-related fees discussed above, what other services or products provide revenue for the parent firm or the team?",
        tags: ["fee-only", "hidden fees", "commissions", "fiduciary alignment", "revenue streams"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed font-semibold text-red-800">
              None. Naviter Wealth runs on a strict, pure "fee-only" fiduciary architecture.
            </p>
            <p className="font-sans leading-relaxed text-sm">
              We reject 100% of non-disclosed revenue streams, structural kickbacks, and soft product markups. Below is an audit of our structural separation from typical broker-dealer streams:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
              {secondaryRevenueStreams.map((stream, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-naviter-navy/5 rounded border border-naviter-navy/5 text-naviter-navy/70 uppercase tracking-wide">
                  <Square className="w-3.5 h-3.5 shrink-0 text-red-800" />
                  <span>{stream.label}</span>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs italic text-naviter-navy/60 pl-2 border-l border-naviter-gold leading-relaxed">
              * Our advisory fees represent our sole compensation track. Occasionally, we charge distinct hourly fees for standalone insurance structures (life, P&C) and client tax-prep coordination within separate licensed divisions.
            </p>
          </div>
        )
      }
    ],
    deliverables: [
      {
        num: 39,
        q: "Form ADV, Form CRS, and Disclosure Brochures",
        tags: ["form adv", "form crs", "disclosure", "brochure", "sec"],
        a: (
          <div className="space-y-3">
            <p className="font-sans leading-relaxed">
              We maintain active, public SEC registrations. You can access our complete, current disclosures via the links below:
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-sans font-semibold">
              <a href="https://adviserinfo.sec.gov/firm/summary/309489" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-naviter-blue transition-colors underline">
                <FileText className="w-4 h-4 text-naviter-blue" /> Form ADV Part 1
              </a>
              <a href="https://adviserinfo.sec.gov/IAPD/Content/Common/ia_approve_common.aspx?DetailDoc=309489_2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-naviter-blue transition-colors underline">
                <FileText className="w-4 h-4 text-naviter-blue" /> Form ADV Part 2A Brochure
              </a>
              <a href="/Naviter Form CRS.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-naviter-blue transition-colors underline">
                <FileText className="w-4 h-4 text-naviter-blue" /> Form CRS Disclosure
              </a>
            </div>
          </div>
        )
      },
      {
        num: 40,
        q: "Anonymized Client Case Study & Portal Demo",
        tags: ["case study", "portal demo", "addepar", "example", "proposal"],
        a: (
          <div className="space-y-4">
            <p className="font-sans leading-relaxed">
              We provide deep structural audits and transparent reporting tools. To evaluate how we monitor a complex multi-asset profile, explore our sample portals below:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans font-semibold">
              <div className="p-4 bg-[#fcfcfe] rounded border border-naviter-navy/5 shadow-sm space-y-2">
                <span className="text-naviter-navy block font-serif text-sm">Sample Client Proposal</span>
                <p className="text-naviter-navy/60 font-light text-xs font-sans leading-relaxed">
                  Interactive template mapping correlation metrics, cost metrics, and historical returns.
                </p>
                <a href="https://naviterwealth.my.salesforce-sites.com/ClientProposalRoom" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-naviter-blue hover:text-naviter-navy underline mt-1">
                  View Proposal Room <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="p-4 bg-[#fcfcfe] rounded border border-naviter-navy/5 shadow-sm space-y-2">
                <span className="text-naviter-navy block font-serif text-sm">Addepar Client Portal Demo</span>
                <p className="text-naviter-navy/60 font-light text-xs font-sans leading-relaxed">
                  Interactive interface of our multi-custodial client financial tracking and reporting.
                </p>
                <a href="https://naviterwealth.addepar.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-naviter-blue hover:text-naviter-navy underline mt-1">
                  Launch Portal Demo <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  const getActiveTabQuestions = () => {
    const qList = activeTabSection ? (allQuestionsAnswers[activeTabSection] || []) : [];
    if (!searchTerm.trim()) return qList;
    
    // Search across ALL sections if searching
    const filtered: QuestionAnswer[] = [];
    Object.keys(allQuestionsAnswers).forEach(key => {
      allQuestionsAnswers[key].forEach(qa => {
        const matchesText = 
          qa.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
          qa.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        if (matchesText) {
          filtered.push(qa);
        }
      });
    });
    return filtered;
  };

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'firm_profile': return <Users className="w-5 h-5 shrink-0" />;
      case 'philosophy': return <BookOpen className="w-5 h-5 shrink-0" />;
      case 'risk_management': return <Shield className="w-5 h-5 shrink-0" />;
      case 'client_service': return <Briefcase className="w-5 h-5 shrink-0" />;
      case 'fees_comp': return <Percent className="w-5 h-5 shrink-0" />;
      case 'deliverables': return <FileText className="w-5 h-5 shrink-0" />;
      default: return <HelpCircle className="w-5 h-5 shrink-0" />;
    }
  };

  const activeQuestions = getActiveTabQuestions();

  return (
    <div className="bg-[#fcfcfe] min-h-screen text-naviter-navy" id="ddq-page-root">
      <Seo 
        title="Due Diligence Questionnaire - Naviter Wealth" 
        description="Naviter Wealth due diligence questionnaire and firm information." 
      />
      {/* Decorative top header spacer */}
      <div className="h-28 bg-naviter-navy animate-fade-in" />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-b from-naviter-navy to-[#182a44] text-white py-14 md:py-20 px-6 relative overflow-hidden flex flex-col justify-center min-h-[50vh] md:min-h-0">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/20 rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="text-[10px] uppercase tracking-[0.6em] font-bold text-naviter-blue">
              last update: march 17, 2026
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight text-white max-w-4xl mx-auto">
              Wealth Management Standard: Due Diligence Questionnaire
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-lg text-left shadow-2xl relative"
          >
            {/* Naviter Box edge outline decor */}
            <div className="absolute top-0 right-0 w-8 h-8 text-naviter-blue opacity-50">
              <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
                <path d="M10 2H18V10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-serif text-naviter-gold mb-3 font-semibold uppercase tracking-wider">
              Document Purpose
            </h2>
            <p className="text-white/85 font-sans text-sm md:text-base leading-relaxed font-light">
              This interactive questionnaire serves as a rigorous, transparent evaluation tool for selecting a prospective wealth management firm (RFP) or conducting an ongoing fiduciary audit of current resources, operational controls, and team track records.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Questionnaire Interactive Engine */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Dynamic Search & Utility Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 bg-[#e5e5f0]/40 p-4 rounded-sm border border-naviter-navy/5">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-naviter-navy/40" />
            <input 
              type="text"
              placeholder="Search questionnaire keywords (e.g., AUM, custodian, fee, compliance)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-naviter-navy/10 rounded-sm font-sans text-xs text-naviter-navy focus:outline-none focus:border-naviter-blue transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-naviter-navy/60 hover:text-naviter-navy"
              >
                clear
              </button>
            )}
          </div>
          <div className="md:col-span-4 flex items-center md:justify-end gap-3 text-xs font-sans font-semibold">
            <span className="text-naviter-navy/60">Search active:</span>
            <span className="px-2 py-1 bg-[#111e30] text-white text-[10px] font-mono tracking-wider">
              {searchTerm ? 'ALL SECTIONS FILTERED' : 'SECTION ACTIVE'}
            </span>
          </div>
        </div>

        {/* Content Layout - Single Full Width Column */}
        <div className="max-w-5xl mx-auto w-full font-sans" id="ddq-content-anchor">
          
          {/* Stacked Vertical Sections Accordion (Only displayed when there's no search query) */}
          {!searchTerm && (
            <div className="space-y-4">
              {tabSections.map((tab) => {
                const isSectionExpanded = activeTabSection === tab.id;
                const questions = allQuestionsAnswers[tab.id] || [];
                return (
                  <div 
                    key={tab.id}
                    className={`border rounded overflow-hidden transition-all duration-500 bg-white ${
                      isSectionExpanded 
                        ? 'border-naviter-gold/30 shadow-md' 
                        : 'border-naviter-navy/5 shadow-sm hover:border-naviter-blue/30 hover:shadow-md'
                    }`}
                  >
                    {/* Section Accordion Header Button */}
                    <button
                      onClick={() => {
                        setActiveTabSection(isSectionExpanded ? null : tab.id);
                        if (!isSectionExpanded) {
                          setTimeout(() => {
                            const element = document.getElementById(`section-bar-${tab.id}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                          }, 100);
                        }
                      }}
                      id={`section-bar-${tab.id}`}
                      className={`w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none transition-all duration-500 relative group ${
                        isSectionExpanded 
                          ? 'bg-gradient-to-r from-[#111e30] to-naviter-navy text-white' 
                          : 'bg-white text-naviter-navy hover:bg-[#111e30]/5'
                      }`}
                    >
                      {/* Active highlight left indicator */}
                      {isSectionExpanded && (
                        <div className="absolute left-0 inset-y-0 w-1.5 bg-naviter-gold" />
                      )}

                      <div className="flex items-center gap-4">
                        <span className={`p-2.5 rounded-full shrink-0 transition-transform duration-500 group-hover:scale-110 ${
                          isSectionExpanded 
                            ? 'bg-white/10 text-naviter-gold' 
                            : 'bg-naviter-navy/5 text-naviter-blue'
                        }`}>
                          {getTabIcon(tab.id)}
                        </span>
                        <div>
                          <h2 className="font-serif text-sm md:text-base lg:text-lg font-bold tracking-wide uppercase leading-tight">
                            {tab.label}
                          </h2>
                          <p className={`text-[10px] md:text-xs font-mono mt-1 ${
                            isSectionExpanded ? 'text-white/60' : 'text-naviter-navy/40'
                          }`}>
                            {questions.length} Audit Questions & Verified Responses
                          </p>
                        </div>
                      </div>

                      {/* Chevron Indicator */}
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isSectionExpanded
                          ? 'border-white/20 text-naviter-gold bg-white/5'
                          : 'border-naviter-navy/10 text-naviter-navy/40 group-hover:border-naviter-blue/50 group-hover:text-naviter-blue'
                      }`}>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-500 ${
                          isSectionExpanded ? 'rotate-90 text-naviter-gold' : ''
                        }`} />
                      </div>
                    </button>

                    {/* Section Content (Questions List) */}
                    <AnimatePresence initial={false}>
                      {isSectionExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden bg-[#fafafc]"
                        >
                          <div className="p-6 md:p-8 space-y-4">
                            
                            {/* Actions Toolbar for this section */}
                            <div className="flex justify-between items-center bg-white p-3 border border-naviter-navy/5 rounded-sm mb-4">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-naviter-navy/50">
                                Sovereign Fiduciary Record Section
                              </span>
                              <div className="flex gap-3 text-xs">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    expandSectionQuestions(tab.id);
                                  }}
                                  className="text-[10px] font-sans font-bold tracking-wider text-naviter-blue hover:text-naviter-navy uppercase cursor-pointer"
                                >
                                  Expand All
                                </button>
                                <span className="text-naviter-navy/20">|</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    collapseSectionQuestions(tab.id);
                                  }}
                                  className="text-[10px] font-sans font-bold tracking-wider text-naviter-navy/50 hover:text-naviter-navy uppercase cursor-pointer"
                                >
                                  Collapse All
                                </button>
                              </div>
                            </div>

                            {/* Questions render */}
                            <div className="space-y-4">
                              {questions.map((qa) => {
                                const isExpanded = !!expandedQuestions[qa.num];
                                const cardId = `ddq-card-${qa.num}`;
                                const isActive = activeCards[cardId];
                                return (
                                  <div
                                    id={cardId}
                                    key={qa.num}
                                    className={`mobile-scroll-card border rounded shadow-sm overflow-hidden transition-all duration-500 relative ${
                                      isMobile && isActive
                                        ? 'border-transparent text-white shadow-xl bg-gradient-to-br from-[#111e30] to-naviter-navy'
                                        : isExpanded
                                          ? 'border-naviter-blue/20 bg-white shadow-md'
                                          : 'border-naviter-navy/5 bg-white hover:border-naviter-blue/30 hover:shadow-md'
                                    }`}
                                  >
                                    {/* Smooth Background for mobile */}
                                    {isMobile && (
                                      <div 
                                        className={`absolute inset-0 bg-gradient-to-br from-[#111e30] to-naviter-navy transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                                          isActive ? 'opacity-100' : 'opacity-0'
                                        }`}
                                      />
                                    )}

                                    {/* Top corner decor */}
                                    <div className={`absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none z-10 ${
                                      isMobile && isActive ? 'text-white' : 'text-naviter-blue'
                                    }`}>
                                      <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
                                        <path d="M14 2H18V6" stroke="currentColor" strokeWidth="1.5" />
                                      </svg>
                                    </div>

                                    <div className="relative z-10">
                                      {/* Accordion clickable header for individual question */}
                                      <button
                                        onClick={() => toggleQuestion(qa.num)}
                                        className="w-full text-left p-5 md:p-6 flex items-start gap-4 cursor-pointer focus:outline-none select-none group"
                                      >
                                        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-sm mt-0.5 tracking-wider shrink-0 transition-all duration-500 ${
                                          isMobile && isActive
                                            ? 'bg-naviter-blue text-white'
                                            : isExpanded
                                              ? 'bg-[#111e30] text-naviter-gold'
                                              : 'bg-naviter-navy/5 text-naviter-blue group-hover:bg-naviter-blue group-hover:text-white'
                                        }`}>
                                          Q. {qa.num}
                                        </span>

                                        <h3 className={`font-serif text-sm md:text-base leading-snug flex-1 font-semibold transition-colors duration-500 ${
                                          isMobile && isActive 
                                            ? 'text-white' 
                                            : isExpanded 
                                              ? 'text-[#111e30]' 
                                              : 'text-naviter-navy group-hover:text-naviter-blue'
                                        }`}>
                                          {qa.q}
                                        </h3>

                                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                                          isMobile && isActive
                                            ? 'border-white/20 text-white'
                                            : isExpanded
                                              ? 'border-[#111e30]/10 bg-[#111e30] text-white'
                                              : 'border-naviter-navy/10 text-naviter-navy/40 group-hover:border-naviter-blue/50 group-hover:text-naviter-blue'
                                        }`}>
                                          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-500 ${
                                            isExpanded ? 'rotate-90' : ''
                                          }`} />
                                        </div>
                                      </button>

                                      {/* Accordion Answer drawer */}
                                      <AnimatePresence initial={false}>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                          >
                                            <div className={`mx-5 md:mx-6 h-[1px] transition-colors duration-500 ${
                                              isMobile && isActive ? 'bg-white/10' : 'bg-naviter-navy/5'
                                            }`} />
                                            <div className={`p-5 md:p-6 pt-3 md:pt-4 text-xs md:text-sm leading-relaxed transition-colors duration-500 ${
                                              isMobile && isActive ? 'text-white/90' : 'text-naviter-navy/85'
                                            }`}>
                                              {qa.a}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* Search Result View (Only displayed when there's an active search query) */}
          {searchTerm && (
            <div className="space-y-4">
              <div className="p-4 bg-naviter-navy/5 border border-naviter-blue/10 rounded-sm mb-4">
                <p className="text-xs font-sans leading-relaxed text-naviter-navy/80">
                  Showing <strong>{activeQuestions.length}</strong> matching questions across the entire Due Diligence Questionnaire for "<strong>{searchTerm}</strong>".
                </p>
              </div>

              {activeQuestions.length === 0 ? (
                <div className="p-12 text-center bg-white border border-naviter-navy/15 rounded-lg space-y-3">
                  <p className="font-serif italic text-lg text-naviter-navy/70">No matching questions found.</p>
                  <p className="font-sans text-xs text-naviter-navy/55">Try modifying your search criteria or clear the query to browse all sections.</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-xs uppercase font-bold text-naviter-blue hover:text-naviter-navy underline cursor-pointer"
                  >
                    clear query
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeQuestions.map((qa) => {
                    const isExpanded = true;
                    const cardId = `ddq-card-search-${qa.num}`;
                    return (
                      <div
                        key={qa.num}
                        id={cardId}
                        className="border rounded shadow-sm overflow-hidden bg-white border-naviter-blue/20"
                      >
                        <div className="relative z-10">
                          <div className="p-5 md:p-6 flex items-start gap-4">
                            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm mt-0.5 tracking-wider shrink-0 bg-[#111e30] text-naviter-gold">
                              Q. {qa.num}
                            </span>
                            <h3 className="font-serif text-sm md:text-base leading-snug flex-1 font-semibold text-[#111e30]">
                              {qa.q}
                            </h3>
                          </div>
                          <div className="mx-5 md:mx-6 h-[1px] bg-naviter-navy/5" />
                          <div className="p-5 md:p-6 pt-3 md:pt-4 text-xs md:text-sm leading-relaxed text-naviter-navy/85">
                            {qa.a}
                          </div>
                          <div className="px-5 md:px-6 pb-4 flex flex-wrap gap-1">
                            {qa.tags.map((tag, idx) => (
                              <span key={idx} className="bg-naviter-navy/5 text-naviter-navy/50 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Explore Other Disclosures / Sections Box */}
        <div className="mt-16 border-t border-naviter-navy/10 pt-12 flex flex-col items-center">
          {(() => {
            const cardId = 'explore-card-policy';
            const isActive = activeCards[cardId];
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={getViewportConfig(0.25)}
                className="w-full max-w-4xl text-center"
              >
                <motion.button 
                  id={cardId}
                  onClick={onNavigateToPolicy}
                  animate={isMobile && isActive ? { scale: 1.05 } : { scale: 1 }}
                  className={`mobile-scroll-card group relative inline-flex items-center gap-6 px-12 py-6 overflow-hidden transition-all duration-1000 rounded-sm cursor-pointer border ${
                    isMobile 
                      ? isActive 
                        ? 'border-transparent text-white shadow-xl' 
                        : 'bg-white border-naviter-navy/10 text-naviter-navy shadow-sm'
                      : 'bg-[#154372] text-white border-transparent'
                  }`}
                >
                  {/* Hover gold layer */}
                  <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
                  
                  {/* Mobile active navy overlay */}
                  {isMobile && (
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br from-[#111e30] to-naviter-navy transition-opacity duration-1000 ease-in-out pointer-events-none z-0 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore policy statement</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </motion.button>
              </motion.div>
            );
          })()}
        </div>

      </section>
    </div>
  );
};
