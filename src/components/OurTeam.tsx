import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { X, Mail, Linkedin, ArrowRight, User, Phone } from 'lucide-react';
import { Seo } from './Seo';

interface TeamMember {
  name: string;
  title: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  linkedin: string;
  education: string[];
  background: string[];
  keyFacts: string[];
  committees?: string[];
}

const TeamMemberCard = ({ member, idx, onClick }: { member: TeamMember, idx: number, onClick: () => void, key?: string }) => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const listener = (e: any) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  // On mobile, trigger color when the card is 50% in view
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.5 
  });

  const isActive = isMobile ? isInView : false;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onClick={onClick}
      className={`bg-white rounded-2xl border border-naviter-navy/5 overflow-hidden shadow-[0_10px_30px_rgba(21,67,114,0.03)] hover:shadow-[0_30px_60px_rgba(21,67,114,0.1)] transition-all duration-500 group cursor-pointer flex flex-col h-full ${
        isActive ? 'shadow-[0_30px_60px_rgba(21,67,114,0.1)] scale-[1.02]' : ''
      }`}
    >
      <div className="relative h-80/ w-full overflow-hidden aspect-[4/5] bg-slate-100">
        <motion.img 
          src={member.image} 
          alt={member.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out [transform:translate3d(0,0,0)] [backface-visibility:hidden] ${
            isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
          } ${
            member.name === 'Jackson Ratcliff' ? `scale-115 ${isActive ? 'scale-[1.17]' : 'group-hover:scale-120'} object-center` :
            member.name === 'Danny Russell' ? `scale-100 ${isActive ? 'scale-[1.02]' : 'group-hover:scale-105'} object-bottom` :
            member.name === 'Trevor Booth' ? `scale-120 ${isActive ? 'scale-[1.22]' : 'group-hover:scale-125'} object-top` :
            member.name === 'Matt Estes' ? `scale-105 ${isActive ? 'scale-[1.07]' : 'group-hover:scale-110'} object-top` :
            member.name === 'Dean Rogers, CFA®' ? `scale-105 ${isActive ? 'scale-[1.07]' : 'group-hover:scale-110'} object-top` :
            member.name === 'Blane Brooks' ? `scale-120 ${isActive ? 'scale-[1.22]' : 'group-hover:scale-125'} object-top` :
            `scale-100 ${isActive ? 'scale-[1.02]' : 'group-hover:scale-105'} object-center`
          }`}
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 bg-naviter-navy/10 transition-opacity duration-500 pointer-events-none ${
          isActive ? 'opacity-0' : 'group-hover:opacity-0'
        }`} />
        
        {/* View Bio Hover Prompt */}
        <div className={`absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-naviter-navy px-4 py-2 text-xs font-serif italic rounded-full shadow-lg transition-all duration-500 flex items-center gap-1.5 border border-naviter-navy/5 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
        }`}>
          view profile
          <ArrowRight className="w-3.5 h-3.5 text-naviter-navy" />
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-serif text-naviter-navy mb-1 leading-tight tracking-tight">
          {member.name}
        </h3>
        <p className="text-sm text-naviter-blue font-sans mt-auto border-t border-slate-100 pt-4">
          {member.title}
        </p>
      </div>
    </motion.div>
  );
};

export const OurTeam = ({ onNavigateToLibrary }: { onNavigateToLibrary: () => void }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const team: TeamMember[] = [
    {
      name: 'Bentley Blackmon, CFA®, CFP®, CPA (inactive)',
      title: 'Chief Executive Officer',
      role: 'Leadership Team',
      image: '/Bentley Blackmon.jpg',
      email: 'bblackmon@naviterwealth.com',
      phone: '501-333-9800',
      linkedin: 'https://www.linkedin.com/in/bentley-blackmon-naviter/',
      committees: ['Leadership Team', 'Investment Committee', 'Compliance Committee'],
      education: [
        'BA, Accounting, Business Administration, Economics (magna cum laude), Ouachita Baptist University, 1994',
        'MBA, Webster University, 1998',
        'Chartered Financial Analyst®',
        'CERTIFIED FINANCIAL PLANNER™',
        'Certified Exit Planning Advisor',
        'Certified Public Accountant (inactive)',
        'Licensed in Life & Health Insurance'
      ],
      background: [
        'Bentley Blackmon serves as the Chief Executive Officer of Naviter Wealth, joining the firm in 2021 as a founding member. He directs the firm’s strategic leadership and overarching vision, bringing decades of institutional wealth advisory, exit planning, and capital markets experience to families, entrepreneurs, and founders.',
        'In addition to his firm-wide leadership, Bentley is an active member of both the Investment Committee and the Compliance Committee. In these roles, he provides critical oversight on portfolio model architectures, external manager selection, and monthly firm-wide investment research reviews, while also identifying regulatory risk thresholds to ensure the firm maintains the highest fiduciary standards.',
        'A highly credentialed professional, Bentley holds the Chartered Financial Analyst® (CFA®) charter, the CERTIFIED FINANCIAL PLANNER™ (CFP®) certification, and the Certified Exit Planning Advisor (CEPA) designation. He also maintains inactive CPA status and active Life & Health insurance licensing. Beyond his credentials, he is deeply involved in key client relationships across the firm, leveraging our Modular Family Office framework to deliver tailored guidance and bespoke solutions for the families we serve.'
      ],
      keyFacts: [
        'Morgan Stanley (1995-2003)',
        'Stephens Inc. (2003-2020)',
        'Joined Naviter Wealth in 2021'
      ]
    },
    {
      name: 'Phillip Worthen',
      title: 'President',
      role: 'Leadership Team',
      image: '/Phillip Worthen.jpg',
      email: 'pworthen@naviterwealth.com',
      phone: '501-333-9801',
      linkedin: 'https://www.linkedin.com/in/phillip-worthen-naviter/',
      committees: ['Leadership Team', 'Investment Committee', 'Compliance Committee'],
      education: [
        'BA, Business Administration, Biology, Ouachita Baptist University, 1994',
        'Doctor of Veterinary Medicine, LSU, 2001',
        'Licensed in Life & Health Insurance'
      ],
      background: [
        'Phillip Worthen serves as the President of Naviter Wealth, joining the firm in 2021 as a founding member. Spanning back to his time at their former firm, he was instrumental in building the core team that defines the practice today. He remains deeply engaged in key client relationships, implementing bespoke solutions for business owners, professionals, and multi-generational families.',
        'Phillip maintains active oversight across multiple aspects of the firm, serving as a core member of both the Investment Committee and the Compliance Committee. In this capacity, he plays a vital role in integrating key strategic initiatives across the organization, ensuring that the firm’s operational execution remains in lockstep with its long-term vision and commitment to client service.',
        'With a professional history spanning corporate, clinical, and investment environments, Phillip brings an extraordinarily broad perspective to multi-generational wealth management. He provides a unique vantage point that allows him to translate complex, multi-layered financial challenges into clear, actionable strategies for the families we serve.'
      ],
      keyFacts: [
        'Alltel (1994-1996)',
        'Wyeth Pharmaceuticals (2002-2008)',
        'Stephens Inc. (2008-2021)',
        'Joined Naviter Wealth in 2021'
      ]
    },
    {
      name: 'Jordan Bauer, CFP®, CPA',
      title: 'Chief Operating Officer',
      role: 'Leadership Team',
      image: '/Jordan Bauer.jpg',
      email: 'jbauer@naviterwealth.com',
      phone: '501-333-9804',
      linkedin: 'https://www.linkedin.com/in/jordan-bauer-naviter/',
      committees: ['Leadership Team', 'Investment Committee', 'Compliance Committee'],
      education: [
        'BBA, Accounting, University of Central Arkansas, 2011',
        'Certified Public Accountant',
        'CERTIFIED FINANCIAL PLANNER™'
      ],
      background: [
        'Jordan Bauer serves as the Chief Operating Officer of Naviter Wealth, joining the firm in 2021 as a founding member. In this multi-faceted role, he leads the firm\'s Finance and Administration functions, directing financial modeling, cash flows, corporate budgeting, human resources, facilities, and technology implementations.',
        'Within the firm\'s family office service model, Jordan manages complex client relationships, maintaining an intimate understanding of all strategies and services to ensure they are executed in alignment with Naviter and industry guidelines. He serves as a trusted advisor, coordinating across the firm to ensure that our comprehensive service offerings meet the sophisticated needs of the families we serve.',
        'Additionally, Jordan contributes significantly to the firm\'s overarching governance and investment direction by maintaining a core seat on both the Investment Committee and the Compliance Committee. Leveraging his CPA and CFP® credentials, he leads internal risk assessments, performs rigorous compliance program effectiveness testing, and participates in manager selection and performance audits to ensure institutional-grade oversight across all operations.'
      ],
      keyFacts: [
        'Practice Plus (2011-2012)',
        'Stephens Inc. (2012-2021)',
        'Joined Naviter Wealth in 2021'
      ]
    },
    {
      name: 'John Kornet, CFP®',
      title: 'Chief Investment Officer',
      role: 'Leadership Team',
      image: '/John Kornet.jpg',
      email: 'jkornet@naviterwealth.com',
      phone: '501-333-9803',
      linkedin: 'https://www.linkedin.com/in/john-kornet-naviter/',
      committees: ['Leadership Team', 'Investment Committee', 'Compliance Committee'],
      education: [
        'BA, Business Administration (summa cum laude), Ouachita Baptist University, 2014',
        'CERTIFIED FINANCIAL PLANNER™',
        'Licensed in Life & Health Insurance'
      ],
      background: [
        'John Kornet serves as the Chief Investment Officer of Naviter Wealth, joining the firm in 2021 as a founding member. He directs the firm\'s overarching investment strategies, asset allocation models, and quantitative due diligence frameworks, structuring portfolios designed specifically for the unique complexities of ultra-high-net-worth families.',
        'John functions as Chairman of the Investment Committee, leading manager research, modeling, asset performance reviews, and monthly firm-wide updates. Additionally, he directs the firm\'s marketing and external communications channel, orchestrating investment content, digital media outreach, and agency partnerships under strict CCO governance.',
        'As a Certified Financial Planner (CFP®) professional, John plays a central role in client relationships, translating technical market opportunities into personalized, actionable investment strategies. He works closely with families to ensure their portfolios remain aligned with their long-term objectives, while also serving as a member of the Compliance Committee, where he contributes to firm-wide risk identification and regulatory alignment.'
      ],
      keyFacts: [
        'Stephens Inc. (2014-2021)',
        'Joined Naviter Wealth in 2021'
      ]
    },
    {
      name: 'Katie McDaniel, CFP®, CPA',
      title: 'Managing Director and Head of Operations',
      role: 'Leadership Team',
      image: '/Katie McDaniel.jpg',
      email: 'kmcdaniel@naviterwealth.com',
      phone: '501-333-9656',
      linkedin: 'https://www.linkedin.com/in/katie-mcdaniel-28351b150/',
      committees: ['Leadership Team'],
      education: [
        'BA, Accounting, Finance (magna cum laude), Benedictine College, 2018',
        'CERTIFIED FINANCIAL PLANNER™',
        'Certified Public Accountant'
      ],
      background: [
        'Katie McDaniel serves as Managing Director and Head of Operations at Naviter Wealth, joining the firm in 2021. She coordinates the Client Operations department, holding primary accountability for trading execution, billing audits, client cash flows, complex transactions, and middle-office regulatory conformance.',
        'As a Senior Advisor with central banking and professional auditing experience, Katie coordinates advanced wealth transition workflows, managing existing client partnerships with deep strategic alignment and technical precision.',
        'A dual-credential holder, Katie is a Certified Public Accountant (CPA) and a CERTIFIED FINANCIAL PLANNER™ (CFP®) professional, bringing institutional-grade discipline, transparency, and administrative security to multi-generational family office clients.'
      ],
      keyFacts: [
        'Federal Reserve Bank of Kansas City (2018-2021)',
        'Joined Naviter Wealth in 2021'
      ]
    },
    {
      name: 'Jackson Ratcliff',
      title: 'Managing Director and Head of Advisory Services',
      role: 'Leadership Team',
      image: '/Jackson Ratcliff.jpg',
      email: 'jratcliff@naviterwealth.com',
      phone: '501-333-9860',
      linkedin: 'https://www.linkedin.com/in/jackson-ratcliff-0573441a/',
      committees: ['Leadership Team'],
      education: [
        'BSBA, Economics, Transportation & Logistics, University of Arkansas, 2010'
      ],
      background: [
        'Jackson Ratcliff serves as Managing Director and Head of Advisory Services at Naviter Wealth, joining the firm in 2023. As Head of Advisory Services, he is accountable for the leadership and management of all firm wealth advisors, providing onboarding guidance, coaching, and strategic mentorship.',
        'Jackson leads top-tier business development initiatives, cultivating strategic long-term partnerships with mergers and acquisitions (M&A) advisors, CPAs, estate attorneys, and key professional centers of influence (COIs) to support entrepreneurs and family founders.',
        'Drawing on over a decade of distinguished institutional equity experience, Jackson works directly with clients to design balanced, highly bespoke strategies that seamlessly integrate complex transaction timelines with the multi-generational wealth preservation structures core to our Modular Family Office.'
      ],
      keyFacts: [
        'Garrison Financial (2008-2010)',
        'Noble Corporation (2010-2011)',
        'Stephens Inc. (2011-2023)',
        'Joined Naviter Wealth in 2023'
      ]
    },
    {
      name: 'Danny Russell',
      title: 'Chief Compliance Officer',
      role: 'Compliance',
      image: '/Danny Russell.jpg',
      email: 'drussell@naviterwealth.com',
      phone: '501-333-9805',
      linkedin: 'https://www.linkedin.com/in/daniel-russell-naviter/',
      committees: ['Compliance Committee'],
      education: [
        'BBA, Financial Services and Risk Management, UALR, 2014',
        'MBA, UCA, 2020',
        'Licensed in Life and Property and Casualty Insurance'
      ],
      background: [
        'Danny Russell serves as the Chief Compliance Officer at Naviter Wealth, joining the firm in 2021 as a founding member. He is fully accountable for the firm\'s regulatory and risk management structures, maintaining registration documents (Form ADV and disclosures), and supervising partnerships with external compliance consultants.',
        'Danny chairs the Compliance Committee and provides advisory supervision across the firm. His responsibilities include reviewing marketing materials for regulatory adherence, overseeing cybersecurity protections for all technology platforms, and monitoring the quality of external vendors.',
        'With academic training specializing in financial services risk management, Danny provides detailed compliance governance that ensures client protection remains the absolute focal point of our modular family office.'
      ],
      keyFacts: [
        'Stephens Inc. (2015-2021)',
        'Joined Naviter Wealth in 2021'
      ]
    },
    {
      name: 'Nicole Hobbs, CPA',
      title: 'Senior Tax Strategist',
      role: 'Tax Strategy',
      image: '/Nicole Hobbs.jpg',
      email: 'nhobbs@naviterwealth.com',
      phone: '501-333-9748',
      linkedin: 'https://www.linkedin.com/in/nicole-hobbs-naviter/',
      education: [
        'BBA, Accounting (2007), Master of Accountancy with Emphasis in Tax (2008), UCA',
        'Certified Public Accountant'
      ],
      background: [
        'Nicole Hobbs serves as the Senior Tax Strategist at Naviter Wealth, joining the firm in 2025. She acts as the primary analytical liaison between the firm\'s clients and their external CPA and legal networks, facilitating transaction-level tax strategies and clarifying tax exposures across complex portfolio layouts.',
        'Nicole researches cutting-edge wealth and after-tax strategies deployed by ultra-high-net-worth (UNHW) family offices. She translates these findings into high-level advisory insights, educates the internal advisory team on legislative shifts, and collaborates with the CIO to structure tax-aware client reviews.',
        'With nearly twenty years of specialized public accounting experience advising corporate boards and family office entities, Nicole designs targeted tax planning frameworks that maximize after-tax outcomes while ensuring strict compliance across state and federal boundaries.'
      ],
      keyFacts: [
        'JPMS Cox (2008-2017)',
        'HCJ CPAs & Advisors (2017-2025)',
        'Joined Naviter Wealth in 2025'
      ]
    },
    {
      name: 'Grant Stevenson',
      title: 'Managing Director',
      role: 'Business Development',
      image: '/Grant Stevenson.jpg',
      email: 'gstevenson@naviterwealth.com',
      phone: '501-333-9746',
      linkedin: 'https://www.linkedin.com/in/grant-stevenson-naviter/',
      education: [
        'BSBA, Finance, University of Arkansas, 2019'
      ],
      background: [
        'Grant Stevenson serves as a Managing Director at Naviter Wealth, joining the firm in 2024. Focused on client-facing business development, his role centers on proactive market outreach and relationship management, specifically targeting families preparing for or transitioning from a major liquidity event. In addition, he maintains deep, strategic partnerships with key professional centers of influence (COIs) such as mergers and acquisitions (M&A) advisors, CPAs, and estate/transaction attorneys.',
        'Grant manages existing client portfolios with a comprehensive understanding of the firm\'s modular services, coordinating with specialists to align generational wealth transition strategies.',
        'Drawing from years in corporate finance and investment banking advisory, Grant brings a technical, sell-side understanding to pre-liquidity positioning and balance sheet optimization for private business owners.'
      ],
      keyFacts: [
        'Stephens Inc., Corporate Finance (2019-2024)',
        'Joined Naviter Wealth in 2024'
      ]
    },
    {
      name: 'Trevor Booth',
      title: 'Managing Director',
      role: 'Business Development',
      image: '/Trevor Booth.jpeg',
      email: 'tbooth@naviterwealth.com',
      phone: '501-333-9747',
      linkedin: 'https://www.linkedin.com/in/trevor-booth-naviter/',
      education: [
        'BSBA, Finance, University of Arkansas, 2021'
      ],
      background: [
        'Trevor Booth serves as a Managing Director at Naviter Wealth, joining the firm in 2024. He focuses on relationship-based business development, cultivating collaborative pipelines with accountants, transactional M&A attorneys, corporate advisors, and external centers of influence (COIs).',
        'Trevor coordinates with family offices to manage portfolio client alignments, drawing on a comprehensive understanding of the firm\'s modular services, private markets, and non-correlated asset options.',
        'With a deep-seated background in specialty land assets, private placement deals, and online capital networks, Trevor implements tailored private investment strategies designed to expand diversification and provide robust cash flows.'
      ],
      keyFacts: [
        'AcreTrader (2019-2024)',
        'Joined Naviter Wealth in 2024'
      ]
    },
    {
      name: 'Matt Estes',
      title: 'Managing Director',
      role: 'Business Development',
      image: '/Matt Estes.jpg',
      email: 'mestes@naviterwealth.com',
      phone: '501-333-9861',
      linkedin: 'https://www.linkedin.com/in/matt-estes-naviter/',
      education: [
        'BA, Zoology, University of Arkansas, 1985'
      ],
      background: [
        'Matt Estes serves as Managing Director at Naviter Wealth, joining the firm in 2025. With a career in wealth advisory and investment consulting spanning nearly four decades, Matt brings extensive industry experience to the team. He has held leadership roles with several wealth management firms, where he has helped clients navigate complex financial decisions.',
        'Focused on strategic relationship management, Matt directs advisor-led business development, cultivating partnerships with M&A specialists, accounting groups, legal counselors, and professional centers of influence (COIs). In his work with clients, he coordinates multi-generational family accounts, utilizing a detailed understanding of the firm’s strategy spectrum to match individuals with appropriate tax mitigation and asset protection models. By combining fiduciary oversight with a strategic advisory style, Matt establishes trusted legacy frameworks designed to serve the needs of the firm’s clients.'
      ],
      keyFacts: [
        'Dean Witter (1987-1989)',
        'Stephens Inc. (1989-2011)',
        'Morgan Stanley (2012-2017)',
        'Sowell Management (2017-2020)',
        'Level Four Financial (2021-2025)',
        'Joined Naviter Wealth in 2025'
      ]
    },
    {
      name: 'Dean Rogers, CFA®',
      title: 'Managing Director',
      role: 'Business Development',
      image: '/Dean Rogers.jpg',
      email: 'drogers@naviterwealth.com',
      phone: '501-333-9753',
      linkedin: 'https://www.linkedin.com/in/dean-rogers-cfa-16164186/',
      education: [
        'Chartered Financial Analyst®'
      ],
      background: [
        'Dean Rogers serves as Managing Director at Naviter Wealth, joining the firm in 2026. He drives relationship-focused business development, cultivating networks with corporate advisors, accounting groups, transaction attorneys, and select centers of influence (COIs).',
        'Dean leverages a deep history operating directly within the family office ecosystem to manage complex client relationships and onboarding structures. Most recently, Dean served as a Founding Partner at a boutique merchant banking platform, where he provided transactional and capital advisory services for family-backed hospitality and real estate projects. Prior to this role, he acted as the Chief Investment Officer for a single-family office, overseeing a complex, multi-generational investment program.',
        'A Chartered Financial Analyst® (CFA®) charterholder, Dean combines his institutional investment background with a comprehensive understanding of portfolio strategies and services to craft mathematically robust, client-centric wealth models. His specialized expertise is specifically tailored to navigate the nuanced needs of the ultra-high-net-worth families, business owners, and private investors served by the firm.'
      ],
      keyFacts: [
        'Joined Naviter Wealth in 2026'
      ]
    },
    {
      name: 'Blane Brooks',
      title: 'Affiliate Program Director',
      role: 'Affiliate Program',
      image: '/Blane Brooks.jpg',
      email: 'bbrooks@naviterwealth.com',
      phone: '501-333-9751',
      linkedin: 'https://www.linkedin.com/in/blane-brooks-naviter/',
      education: [
        'BA, Economics, Sewanee, 1983'
      ],
      background: [
        'Blane Brooks serves as Affiliate Program Director, joining Naviter Wealth in 2025. In this key role, he heads the recruitment and onboarding of qualified affiliates, primarily M&A firms and transaction professionals focused on selling businesses, connecting them directly to the Head of Advisory Services and wealth coverage teams.',
        'With more than forty years of top-tier institutional execution in client development across national investment firms, Blane brings deep-seated industry connections and experience to our growing affiliate program.'
      ],
      keyFacts: [
        'Various roles including Drexel Burnham Lambert, Fisher Investments, and FinTrust Capital Advisors',
        'Joined Naviter Wealth in 2025'
      ]
    },
    {
      name: 'Blake Abston, CFP®',
      title: 'Senior Financial Analyst',
      role: 'Client Operations',
      image: '/Blake Abston.jpg',
      email: 'babston@naviterwealth.com',
      phone: '501-333-9802',
      linkedin: 'https://www.linkedin.com/in/blake-abston-naviter/',
      education: [
        'BSBA, Finance, Concentration in Financial Management and Investment, University of Arkansas, 2019',
        'CERTIFIED FINANCIAL PLANNER™',
        'Licensed in Life & Health Insurance'
      ],
      background: [
        'Blake Abston serves as a Senior Financial Analyst on the Client Operations desk at Naviter Wealth, joining the firm in 2023. Blake assists in mentoring, training, and guiding new financial analyst cohorts.',
        'Blake handles key middle-office workflows, including trading executions, cash and custody transaction controls, and client document compilation, maintaining strict administrative accuracy.',
        'As a CERTIFIED FINANCIAL PLANNER™ (CFP®) professional, Blake blends his analytical depth with comprehensive planning strategies to execute robust, cash-flow-driven portfolio diagnostics for client reviews.'
      ],
      keyFacts: [
        'Encompass Financial Partners (2019)',
        'Garland & Greenwood Wealth Advisors (2022)',
        'Joined Naviter Wealth in 2023'
      ]
    },
    {
      name: 'Carter Robinson',
      title: 'Financial Analyst',
      role: 'Client Operations',
      image: '/Carter Robinson.png',
      email: 'crobinson@naviterwealth.com',
      phone: '501-333-9749',
      linkedin: 'https://www.linkedin.com/in/carter-robinson-naviter/',
      education: [
        'BBA, Accounting, Finance, Oklahoma Christian University (Expected 2025)'
      ],
      background: [
        'Carter Robinson serves as a Financial Analyst at Naviter Wealth, joining the firm in 2024. In his role within Client Operations, he manages critical backend infrastructure, trading execution, transaction setups, and custody systems management.',
        'Beyond his operational duties, Carter coordinates the firm’s marketing communications and client newsletters. He co-creates investment and strategy content alongside the Chief Investment Officer, and ensures all creative assets maintain regulatory standards. Having completed his professional degrees in accounting and finance, Carter bridges the gap between academic theory and real-world application, integrating rigorous operational logistics with sophisticated, multi-channel communication strategies.'
      ],
      keyFacts: [
        'Joined Naviter Wealth in 2024'
      ]
    },
    {
      name: 'Noah Smith',
      title: 'Financial Analyst',
      role: 'Client Operations',
      image: '/Noah Smith.jpeg',
      email: 'nsmith@naviterwealth.com',
      phone: '501-333-9752',
      linkedin: 'https://www.linkedin.com/in/noah-smith-naviter/',
      education: [
        'BBA, Finance, UCA, 2024'
      ],
      background: [
        'Noah Smith serves as a Financial Analyst with the Client Operations team at Naviter Wealth, joining the firm in 2025. He provides administrative and technical support, focusing on client document preparation, trading, transaction tracking, and internal database management.',
        'Noah coordinates with the Advisory Team and the custodial desk on operational workflows, ensuring client cash allocations, account transfers, and account onboarding systems run smoothly and with meticulous detail.',
        'Noah holds a BBA in Finance, combining a strong foundation in banking services with quantitative skills to assist the operations desk in delivering streamlined, compliant, and prompt execution.'
      ],
      keyFacts: [
        'First Arkansas Bank & Trust (2023)',
        'Joined Naviter Wealth in 2025'
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      <Seo 
        title="Our Team - Naviter Wealth" 
        description="Meet the Naviter Wealth team—experienced professionals dedicated to guiding families through every aspect of their financial journey." 
      />
      {/* Page Header */}
      <section 
        className="relative min-h-screen flex flex-col justify-center pt-36 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-naviter-navy/5"
        style={{
          backgroundImage: "linear-gradient(rgba(232, 235, 239, 0.85), rgba(232, 235, 239, 0.85)), url('/Bison heard-1.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif text-naviter-navy tracking-tight mb-4"
          >
            Navigating Complexities via a Modular Family Office
          </motion.h1>
          <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our team</h2>
          <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl font-serif text-naviter-navy/90 max-w-3xl mx-auto leading-relaxed mt-6"
          >
            Founders and entrepreneurs serving founders and entrepreneurs. We left institutional constraints to build an elite, independent practice engineered for complex wealth.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              idx={idx}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </section>

      {/* Our Mascot Section */}
      <section className="pt-12 pb-32 md:pt-16 md:pb-48 bg-white px-6 border-t border-naviter-navy/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our mascot</h2>
          <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          <p className="text-4xl font-serif text-naviter-navy mb-6">Sentinel</p>
           <p className="text-lg md:text-xl font-sans text-[#58aadb] leading-relaxed mb-6">
            Sentinel serves as the enduring mascot of Naviter. Just as the American bison stands firm against the subfreezing winds of the high plateau, we believe in providing the steady, unwavering support our clients need to navigate their own complex journeys. Sentinel is our reminder to stay strong, keep moving forward, and always keep our eyes on the horizon.
          </p>
          <div className="pt-8">
            <p className="text-[9px] font-mono text-naviter-navy/50 tracking-widest uppercase mb-4">Captured by photographer Joseph Filer in the heart of Yellowstone National Park</p>
            <img 
              src="/Bison-Winter-0598-Edit.jpg"
              alt="Sentinel, the bison"
              className="w-4/5 mx-auto rounded-2xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Our Alignment Section */}
      <section className="pt-12 pb-32 md:pt-16 md:pb-48 bg-naviter-navy/5 px-6 border-t border-naviter-navy/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our alignment</h2>
          <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          <p className="text-2xl md:text-3xl font-serif text-naviter-navy/80 leading-relaxed mb-6">
            We built a firm where the traditional advisor-client relationship doesn't exist. Instead, we form true partnerships with a select group of families who have accumulated significant wealth.
          </p>
          <p className="text-2xl md:text-3xl font-serif text-naviter-navy/80 leading-relaxed mb-6">
            By design, our families utilize the same Modular Family Office services and own the same investments. Operating strictly as fiduciaries, we ensure that our infrastructure, our capital, and our legal obligations are aligned with yours. We don't just manage your path forward—we share it.
          </p>
          <div className="mt-16 flex justify-center">
            <motion.button 
              onClick={onNavigateToLibrary}
              initial={{ backgroundColor: "#58aadb" }}
              whileInView={{ backgroundColor: "#154372" }}
              transition={{ duration: 0.6 }}
              className="group relative inline-flex items-center gap-6 px-12 py-6 text-white overflow-hidden transition-all duration-500 rounded-sm hover:bg-naviter-navy"
            >
              <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore our library</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Profile Detail Slide-out Overlay */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-naviter-navy/40 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-white h-full shadow-[-40px_0_100px_rgba(21,67,114,0.15)] overflow-y-auto flex flex-col z-10"
            >
              {/* Header Close Button */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-6 py-4 flex items-center justify-end border-b border-slate-100">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 text-slate-400 hover:text-naviter-navy hover:bg-slate-50 transition-colors rounded-full"
                  aria-label="Close Profile"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bio Content */}
              <div className="p-8 md:p-16 space-y-12">
                {/* Visual Header */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 overflow-hidden rounded-full border border-naviter-navy/5 shadow-inner bg-slate-100">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-serif text-naviter-navy leading-none">
                      {selectedMember.name}
                    </h2>
                    {selectedMember.committees && selectedMember.committees.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedMember.committees.map((committee) => (
                          <span key={committee} className="text-[9px] font-mono tracking-widest uppercase text-naviter-blue border border-naviter-blue/20 bg-naviter-blue/5 px-2 py-0.5 rounded">
                            {committee}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick Access Channels */}
                    <div className="flex items-center gap-4 pt-4">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center gap-1.5 text-xs text-naviter-navy/50 hover:text-naviter-blue transition-colors font-sans"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedMember.email}
                      </a>
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="norereferrer"
                        className="flex items-center gap-1.5 text-xs text-naviter-navy/50 hover:text-naviter-blue transition-colors font-sans"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${selectedMember.phone}`}
                        className="flex items-center gap-1.5 text-xs text-naviter-navy/50 hover:text-naviter-blue transition-colors font-sans"
                      >
                        <Phone className="w-4 h-4" />
                        {selectedMember.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Grid of details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                  {/* Left Bio columns */}
                  <div className="md:col-span-2 space-y-6">
                    <h4 className="text-naviter-navy font-serif text-lg lowercase tracking-wide font-medium">background</h4>
                    {selectedMember.background.map((par, pIdx) => (
                      <p key={pIdx} className="text-naviter-navy/80 font-sans text-base leading-relaxed">
                        {par}
                      </p>
                    ))}
                  </div>

                  {/* Right facts column */}
                  <div className="space-y-8 bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
                    <div>
                      <h4 className="text-naviter-navy font-serif text-base lowercase mb-4 font-medium">career highlights</h4>
                      <ul className="space-y-4">
                        {selectedMember.keyFacts.map((fact, fIdx) => (
                          <li key={fIdx} className="flex gap-2.5 items-start text-xs text-naviter-navy/70 leading-normal font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-naviter-blue shrink-0 mt-1.5" />
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                      <h4 className="text-naviter-navy font-serif text-base lowercase mb-4 font-medium">education & credentialing</h4>
                      <ul className="space-y-3">
                        {selectedMember.education.map((edu, eIdx) => (
                          <li key={eIdx} className="flex gap-2.5 items-start text-xs text-naviter-navy/70 leading-normal font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-naviter-gold shrink-0 mt-1.5" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide-out footer */}
              <div className="mt-auto border-t border-slate-100 p-8 bg-slate-50 flex justify-center items-center text-slate-400 text-[9px] tracking-[0.25em] font-sans font-bold uppercase">
                <div>INTEGRITY • ACUMEN • ACCESS</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
