import { 
  Code, 
  Layers, 
  ShoppingBag, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  Maximize2, 
  Smartphone, 
  Compass, 
  Palette, 
  Terminal, 
  Rocket 
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Our Firm', href: '#/firm' },
  { label: 'Our Services', href: '#/services' },
  { label: 'Our Team', href: '#/team' },
  { label: 'Our Library', href: '#/library' },
  { label: 'Client Portal', href: '#/portal' },
  { label: 'Contact', href: '#/contact' },
  { label: 'Affiliate Program', href: '#/affiliate' },
];

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export const STATISTICS: StatItem[] = [
  { id: 'projects', label: 'Projects Delivered', value: 350, suffix: '+', description: 'Enterprise platforms & SaaS products' },
  { id: 'clients', label: 'Satisfied Clients', value: 180, suffix: '+', description: 'From high-growth startups to Fortune 500' },
  { id: 'years', label: 'Years of Excellence', value: 12, suffix: '+', description: 'Continuous innovation in web technology' },
  { id: 'success', label: 'Client Success Rate', value: 99.8, suffix: '%', description: 'On-time delivery & revenue impact' },
];

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  tag: string;
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-design',
    title: 'Website Design & UI/UX',
    description: 'Immersive, award-winning digital design systems built with precision typography, glassmorphism, and intuitive micro-interactions.',
    icon: Layers,
    tag: 'Design Systems',
    features: ['Interactive Prototypes', 'Framer / Figma to Code', 'High-Conversion Architecture']
  },
  {
    id: 'wordpress-dev',
    title: 'Custom WordPress Development',
    description: 'Blazing fast, headless and modular WordPress solutions engineered for enterprise scale without bloat or security vulnerabilities.',
    icon: Code,
    tag: 'CMS Architecture',
    features: ['Custom Gutenberg Blocks', 'API & CRM Integrations', 'Core Web Vitals Optimized']
  },
  {
    id: 'shopify-dev',
    title: 'High-Scale Shopify Development',
    description: 'Next-generation commerce storefronts optimized for maximum conversion rate, seamless checkout, and global sub-second load speeds.',
    icon: ShoppingBag,
    tag: 'E-Commerce',
    features: ['Liquid & Hydrogen Headless', 'Custom Checkout Flows', 'ERP & Inventory Sync']
  },
  {
    id: 'seo-growth',
    title: 'Technical SEO & Performance',
    description: 'Data-driven search engineering that guarantees top rankings through semantic HTML structure, lightning SSR, and authority building.',
    icon: Search,
    tag: 'Growth Engineering',
    features: ['Technical Audit & Schema', 'Programmatic SEO', 'Lighthouse 100 Score Guarantee']
  },
  {
    id: 'branding',
    title: 'Enterprise Branding & Identity',
    description: 'Timeless visual positioning that communicates authority and innovation, uniting your product suite under a cohesive visual language.',
    icon: Sparkles,
    tag: 'Brand Strategy',
    features: ['Identity Guidelines', '3D & Motion Assets', 'Verbal Tone & Copywriting']
  },
  {
    id: 'maintenance',
    title: 'SLA Maintenance & Cloud Ops',
    description: '24/7 dedicated engineering support, automated security patching, uptime monitoring, and continuous deployment pipelines.',
    icon: ShieldCheck,
    tag: 'DevOps & Support',
    features: ['Sub-15m Response Time', 'Automated Backups', 'Continuous A/B Optimization']
  }
];

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover & Strategize',
    subtitle: 'Deep dive into business architecture',
    description: 'We audit your existing ecosystem, analyze competitors, and map out user conversion funnels to establish a concrete architectural roadmap.',
    icon: Compass
  },
  {
    number: '02',
    title: 'Design & Prototype',
    subtitle: 'High-fidelity visual systems',
    description: 'Crafting bespoke design tokens, fluid layouts, and interactive prototypes that combine Apple-tier aesthetic with Stripe-level functional clarity.',
    icon: Palette
  },
  {
    number: '03',
    title: 'Engineer & Integrate',
    subtitle: 'Clean TypeScript & Next.js code',
    description: 'Developing modular components with React, Tailwind CSS, and Framer Motion. Every API connection and database query is rigorously tested.',
    icon: Terminal
  },
  {
    number: '04',
    title: 'Launch & Accelerate',
    subtitle: 'Global edge deployment',
    description: 'Deploying to enterprise CDN edge servers with automated QA. We monitor real-user telemetry to continuously drive growth post-launch.',
    icon: Rocket
  }
];

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  metrics: string;
  tags: string[];
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'lumina-ai',
    title: 'Lumina Cloud Analytics Platform',
    client: 'Lumina Data Corp',
    category: 'AI SaaS Web Application',
    description: 'Complete overhaul of an enterprise AI analytics dashboard. Replaced a sluggish legacy monolith with a real-time Next.js frontend, reducing latency by 74% and increasing active daily users by 140%.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    metrics: '+140% User Retention',
    tags: ['Next.js', 'TypeScript', 'WebGL Data Viz', 'Tailwind']
  },
  {
    id: 'pulse-pay',
    title: 'PulsePay Global FinTech Portal',
    client: 'Pulse Financial Labs',
    category: 'FinTech Marketing & App',
    description: 'Engineered a hyper-secure, conversion-focused marketing site and developer portal. Integrated interactive live sandbox testing and dynamic currency calculation engines directly into the hero experience.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metrics: '$42M Processed in Q1',
    tags: ['React', 'Framer Motion', 'Stripe API', 'Design System']
  },
  {
    id: 'velox-commerce',
    title: 'Velox Luxury Athletic Flagship',
    client: 'Velox Athletics',
    category: 'Headless E-Commerce',
    description: 'Built a bespoke headless Shopify Plus experience with sub-second page transitions. Featuring custom 3D shoe customizers and instant checkout routing that boosted mobile sales conversion by 85%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: '85% Mobile Conversion Lift',
    tags: ['Shopify Hydrogen', 'GraphQL', 'Three.js', 'Edge Cache']
  }
];

export interface ChooseItem {
  title: string;
  description: string;
  icon: any;
}

export const WHY_CHOOSE_ITEMS: ChooseItem[] = [
  { title: 'Fast Performance', description: 'Sub-second page loads guaranteed with 100/100 Google Core Web Vitals scores across all devices.', icon: Zap },
  { title: 'Modern Design', description: 'Stripe & Apple inspired aesthetic that elevates your brand perception above legacy competitors.', icon: Sparkles },
  { title: 'SEO Friendly', description: 'Built-in semantic HTML5, dynamic XML sitemaps, and programmatic meta tags for top organic reach.', icon: Search },
  { title: 'Enterprise Secure', description: 'Bank-grade SSL encryption, strict CSP headers, and zero reliance on vulnerable third-party plugins.', icon: Lock },
  { title: 'Infinite Scalability', description: 'Edge cloud infrastructure capable of handling millions of concurrent visitors without downtime.', icon: Cpu },
  { title: 'Perfectly Responsive', description: 'Flawless layout stacking and fluid typography engineered for desktops, tablets, and mobile phones.', icon: Smartphone }
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    quote: "Apex transformed our entire web presence. Our new Next.js platform loads instantly, and within 60 days of launch, our inbound enterprise leads grew by over 210%. They operate with the speed and precision of an elite internal team.",
    author: "Elena Rostova",
    role: "VP of Product",
    company: "Vanguard AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: '2',
    quote: "The visual aesthetic is breathtaking. They captured the exact balance of dark minimalist luxury and high-tech credibility we needed for our Series B announcement. Best agency investment we've ever made.",
    author: "Marcus Chen",
    role: "Co-Founder & CTO",
    company: "Hyperion Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: '3',
    quote: "We migrated our flagship e-commerce store from a legacy monolith to headless Shopify with Apex. Our bounce rate dropped from 54% to 18%, and our average order value hit an all-time high.",
    author: "Sarah Jenkins",
    role: "Head of Growth",
    company: "Aethel Luxury",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  description: string;
  features: string[];
  cta: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Growth',
    tagline: 'Ideal for emerging startups & modern rebrands',
    price: '$12,500',
    period: 'one-time investment',
    description: 'High-conversion marketing site engineered with pristine modern aesthetics and blazing speed.',
    features: [
      'Up to 8 Custom Designed Pages',
      'React & Tailwind CSS Frontend',
      'CMS Integration (Sanity / WP / Contentful)',
      'Basic On-Page SEO & Analytics Setup',
      'Mobile & Tablet Responsive',
      '30 Days Post-Launch Warranty'
    ],
    cta: 'Select Starter Plan'
  },
  {
    id: 'professional',
    name: 'Professional Scale',
    tagline: 'For established brands seeking market dominance',
    price: '$28,000',
    period: 'one-time investment',
    popular: true,
    description: 'Comprehensive digital flagship combining bespoke UI/UX, complex integrations, and animations.',
    features: [
      'Unlimited Custom Designed Pages',
      'Advanced Framer Motion Micro-Interactions',
      'Headless E-Commerce or Custom Web App',
      'CRM, ERP & Custom API Integrations',
      'Full Technical SEO & Schema Architecture',
      'Lighthouse 100 Speed Optimization',
      'Priority 24/7 Slack Channel Support'
    ],
    cta: 'Start Professional Project'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Retainer',
    tagline: 'Dedicated engineering & continuous evolution',
    price: '$8,500',
    period: 'per month retainer',
    description: 'An elite on-demand product team dedicated to continuous feature deployment and A/B optimization.',
    features: [
      'Dedicated Senior Full-Stack Pod (2 Engineers + Designer)',
      'Weekly Sprint Cycles & Roadmap Execution',
      'Continuous Conversion Rate Optimization (CRO)',
      'Automated Cloud Ops & Security Audits',
      'Custom AI & LLM Workflow Integrations',
      'Sub-2 Hour SLA Emergency Response'
    ],
    cta: 'Inquire Enterprise Retainer'
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What is your typical project timeline from kickoff to launch?",
    answer: "For standard marketing flagships (Starter / Professional), timelines typically range between 4 to 8 weeks. This includes thorough discovery, high-fidelity Figma prototyping, iterative review cycles, rigorous TypeScript development, and automated edge deployment. Enterprise custom web applications or headless e-commerce builds may take 8 to 12 weeks depending on third-party API integration scope."
  },
  {
    question: "How do your websites achieve 100/100 Google Lighthouse speed scores?",
    answer: "We strictly reject bloated legacy builders and unoptimized plugins. We build using modern React/Next.js architectures with Server-Side Rendering (SSR) and Static Site Generation (SSG). Images are automatically converted to next-gen AVIF/WebP formats with explicit sizing, fonts are self-hosted with zero layout shift, and JavaScript bundles are aggressively code-split."
  },
  {
    question: "Do we own the full intellectual property and codebase after launch?",
    answer: "Yes, 100%. Upon final delivery and project completion, all design assets (Figma files), custom code repositories, licensing rights, and cloud configurations are completely transferred to your organization. There are no proprietary vendor lock-ins or hidden licensing fees."
  },
  {
    question: "Can our internal content team easily update text and images?",
    answer: "Absolutely. We integrate intuitive, modern Headless CMS solutions (such as Sanity.io, Strapi, or headless WordPress) configured specifically to your page structures. Your marketing team can edit copy, publish blog posts, swap imagery, and launch landing pages instantly with live visual previewing without needing developer intervention."
  },
  {
    question: "What happens after the website is launched?",
    answer: "Every project includes a complimentary 30-day post-launch warranty period covering any edge-case bug fixes or minor adjustments. Beyond that, most clients transition to our SLA Maintenance or Enterprise Retainer plans for continuous feature development, security monitoring, and conversion optimization."
  }
];
