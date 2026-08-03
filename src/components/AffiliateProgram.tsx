import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Handshake, Building, Scale, Calculator, Users, TrendingUp, Briefcase, Sparkles, RefreshCw, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const PartnerCard = ({ partner, isMobile, index }: { partner: any, isMobile: boolean, index: number, key?: any }) => {
// ... (rest of the component - skipping to handleSubmit implementation, need to see the file to know what to keep/replace)
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.65, // Activates when 65% of the card is in view
  });

  const active = isMobile ? isInView : false;

  return (
    <motion.div 
      ref={ref}
      whileHover={!isMobile ? { y: -10 } : undefined}
      animate={{
        y: active ? -10 : 0,
        backgroundColor: active ? "#154372" : "#ffffff",
        borderColor: active ? "transparent" : "rgb(243, 244, 246)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-20px)] min-w-[200px] max-w-[320px] lg:max-w-none p-8 rounded-lg shadow-sm border space-y-4 group transition-colors duration-300 ${active ? 'shadow-md border-transparent' : 'border-gray-100'} ${!active && !isMobile ? 'hover:bg-naviter-navy' : ''}`}
    >
      <div className={`w-12 h-12 rounded flex items-center justify-center transition-colors duration-300 ${
        active 
          ? "bg-white text-naviter-navy" 
          : "bg-blue-50 text-naviter-navy group-hover:bg-white group-hover:text-naviter-navy"
      }`}>
        <partner.icon size={24} />
      </div>
      <h3 className={`font-bold text-lg transition-colors duration-300 ${
        active 
          ? "text-naviter-blue" 
          : "text-naviter-navy group-hover:text-[#58aadb]"
      }`}>
        {partner.title}
      </h3>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
        active 
          ? "text-white" 
          : "text-gray-600 group-hover:text-white"
      }`}>
        {partner.desc}
      </p>
    </motion.div>
  );
};

const TakeawayCard = ({ takeaway, isMobile, index }: { takeaway: any, isMobile: boolean, index: number, key?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.65,
  });

  const active = isMobile ? isInView : false;

  return (
    <motion.div 
      ref={ref}
      whileHover={!isMobile ? { y: -10 } : undefined}
      animate={{
        y: active ? -10 : 0,
        backgroundColor: active ? "#ffffff" : "#154372",
        borderColor: active ? "rgb(243, 244, 246)" : "transparent",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] max-w-[360px] p-10 rounded-lg shadow-sm border space-y-4 group transition-colors duration-300 ${
        active ? 'border-gray-100 shadow-md' : 'border-transparent shadow-sm'
      } ${!active && !isMobile ? 'hover:bg-white hover:border-gray-100' : ''}`}
    >
      <div className={`w-12 h-12 rounded flex items-center justify-center transition-colors duration-300 ${
        active 
          ? "bg-blue-50 text-naviter-blue" 
          : "bg-white text-naviter-navy group-hover:bg-blue-50 group-hover:text-naviter-blue"
      }`}>
        <takeaway.icon size={24} />
      </div>
      <h3 className={`font-bold text-lg transition-colors duration-300 ${
        active 
          ? "text-naviter-blue" 
          : "text-white group-hover:text-naviter-blue"
      }`}>
        {takeaway.title}
      </h3>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
        active 
          ? "text-gray-600" 
          : "text-blue-100 group-hover:text-gray-600"
      }`}>
        {takeaway.desc}
      </p>
    </motion.div>
  );
};

export const AffiliateProgram = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({                
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const mql = window.matchMedia('(max-width: 767px)');
        setIsMobile(mql.matches);
        const listener = (e: any) => setIsMobile(e.matches);
        mql.addEventListener('change', listener);
        return () => mql.removeEventListener('change', listener);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email) {
            setErrorMessage('Please fill in your name and email address.');
            setStatus('error');
            return;
        }
        
        setStatus('submitting');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    inquiryType: 'Affiliate Program Inquiry'
                }),
            });
            
            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
                setStatus('error');
            }
        } catch (err) {
            setErrorMessage('A network error occurred. Please check your connection and try again.');
            setStatus('error');
        }
    };

    const partners = [
        { icon: Handshake, title: 'M&A Advisory Firms', desc: 'Engage with business-owner clients of M&A firms who require complex pre- and post-transaction tax advisory and asset management.' },
        { icon: Building, title: 'Private Equity Managers', desc: 'Work with founders and entrepreneurs of portfolio companies of private equity managers, providing sophisticated advice around transactions.' },
        { icon: Scale, title: 'Transaction Attorneys', desc: 'Partner with legal counsel assisting ultra-high-net-worth sellers looking to minimize taxes and structure wealth pre- and post-closing.' },
        { icon: Calculator, title: 'Accountants & CPA Firms', desc: 'Coordinate with tax practices needing an institutional wealth management arm to upgrade their clients for more tax-centric strategic planning.' },
        { icon: Users, title: 'Retail-Focused RIAs', desc: 'Partner with advisory practices seeking to refer complex ultra-high-net-worth cases outside of their core retail scope.' },
    ];

    const takeaways = [
        { icon: TrendingUp, title: 'significant, recurring revenue', desc: 'Affiliates earn 25% of revenue in perpetuity, creating a substantial long-term income stream.' },
        { icon: Briefcase, title: 'deal-enhancing, not deal-breaking', desc: 'Naviter supports the M&A process with pre-transaction planning and tax strategies that give sellers the financial confidence to close.' },
        { icon: Sparkles, title: 'low friction & high support', desc: 'There is no cost to join, regulatory hurdles are minimized, and once a referral becomes a client, the affiliate has zero obligation for ongoing service.' },
        { icon: RefreshCw, title: 'reciprocal partnership', desc: 'We view this as a two-way street, actively seeking opportunities to refer liquidity events and acquisition targets back to our partners.' },
        { icon: Scale, title: 'fiduciary standard', desc: 'As an SEC-registered investment advisor, we offer objective advice that aligns with the best interests of the families we serve.' },
    ];

  return (
    <motion.div 
      className="pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Text Section mimicking the screenshot */}
      <div className="max-w-5xl mx-auto px-10 text-center mb-20">
        <h1 className="font-serif text-3xl md:text-5xl text-naviter-navy mb-6">
          Navigating Complexities via a Modular Family Office
        </h1>
        <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">our affiliate program</h2>
        <div className="h-px w-16 bg-naviter-blue mx-auto mb-12" />
        <p className="font-serif text-2xl md:text-3xl text-naviter-navy max-w-4xl mx-auto leading-relaxed">
          Your clients count on you to provide them with comprehensive support. By becoming one of our affiliate partners, you’ll add bespoke wealth management to your toolkit.
        </p>
        <p className="font-sans text-xs md:text-xl text-[#58aadb] max-w-4xl mx-auto leading-relaxed mt-4 md:mt-6">
          Our affiliate program may not be like others you’ve seen in the industry. In return for utilizing your network to introduce us to qualified potential clients, we will share <span className="font-bold">25%</span> of any revenue generated from that relationship with you in perpetuity. If you regularly work closely with individuals or families with investable assets of <span className="font-bold">$10MM+</span>, we’d love to have a conversation. We work with partners who can provide introductions on a recurring basis and are permitted to receive referrals according to SEC and state regulations.
        </p>
      </div>
      
      {/* Full-screen width image */}
      <div className="w-full h-[600px] overflow-hidden mb-20">
        <img src="/3411d59e1d64763af71da5d126d88c84.jpeg" alt="Affiliate Program" className="w-full h-full object-cover" />
      </div>

      {/* Our Affiliate Partners Section */}
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center space-y-6 mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-4">our affiliate partners</h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
            <h2 className="font-serif text-2xl md:text-3xl text-naviter-navy max-w-3xl mx-auto leading-tight">
                We built our platform to align beautifully with advisors and transactional professionals handling significant liquidity events.
            </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
            {partners.map((partner, index) => (
                <PartnerCard 
                    key={index}
                    partner={partner}
                    isMobile={isMobile}
                    index={index}
                />
            ))}
        </div>
      </div>
      
      {/* Prismatic Image Section */}
      <div className="w-full mt-20">
        <img src="/Prismatic.jpg" alt="Prismatic" className="w-full h-auto object-cover" />
      </div>

      {/* Our Key Takeaways Section */}
      <div className="max-w-7xl mx-auto px-10 py-20 bg-gray-50">
        <div className="text-center space-y-6 mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-4">our key takeaways</h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
            <h2 className="font-serif text-2xl md:text-3xl text-naviter-navy max-w-3xl mx-auto leading-tight">
                Designing structural advantages for our affiliate network.
            </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-16">
            {takeaways.map((takeaway, index) => (
                <TakeawayCard 
                    key={index}
                    takeaway={takeaway}
                    isMobile={isMobile}
                    index={index}
                />
            ))}
        </div>

        <div className="text-center">
            <motion.a 
                href="https://www.naviterwealth.com/affiliate"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ backgroundColor: "#58aadb" }}
                whileInView={{ backgroundColor: "#154372" }}
                transition={{ duration: 0.6 }}
                className="group relative inline-flex items-center gap-6 px-12 py-6 text-white overflow-hidden transition-all duration-500 rounded-sm hover:bg-naviter-navy"
            >
                <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore our affiliate program overview</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </motion.a>
        </div>
      </div>

      {/* Our Invitation Section */}
      <div className="max-w-4xl mx-auto px-10 py-20 text-center">
        <div className="space-y-6 mb-16">
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-4">our invitation</h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
            <h2 className="font-serif text-2xl md:text-3xl text-naviter-navy leading-tight">
                Submit your contact information below, and we will schedule an initial alignment call.
            </h2>
        </div>

        {status === 'success' ? (
            <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6 border border-naviter-navy/10 rounded-lg p-8"
            >
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif text-naviter-navy lowercase">request submitted</h3>
            <p className="text-slate-600 max-w-md mx-auto font-sans text-sm leading-relaxed">
                Thank you for your interest in the Naviter affiliate program. Your request has been routed to our team at <span className="text-naviter-blue font-semibold">team@naviterwealth.com</span>. We will review your context and reach out shortly.
            </p>
            <div className="pt-6">
                <button 
                onClick={() => setStatus('idle')}
                className="font-serif text-naviter-blue text-sm uppercase tracking-wider hover:opacity-85 transition-opacity bg-transparent border-0 cursor-pointer underline underline-offset-4"
                >
                submit another request
                </button>
            </div>
            </motion.div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
            {status === 'error' && (
                <div id="error-message-banner" className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-sm text-sm border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-naviter-blue font-sans font-bold">first name *</label>
                    <input 
                        name="firstName"
                        type="text" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-b border-naviter-navy/20 bg-transparent focus:border-naviter-navy outline-none text-naviter-navy font-sans transition-colors" 
                        placeholder="Jane" 
                        required
                        disabled={status === 'submitting'}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-naviter-blue font-sans font-bold">last name *</label>
                    <input 
                        name="lastName"
                        type="text" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-b border-naviter-navy/20 bg-transparent focus:border-naviter-navy outline-none text-naviter-navy font-sans transition-colors" 
                        placeholder="Doe" 
                        required
                        disabled={status === 'submitting'}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-naviter-blue font-sans font-bold">email address *</label>
                    <input 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border-b border-naviter-navy/20 bg-transparent focus:border-naviter-navy outline-none text-naviter-navy font-sans transition-colors" 
                        placeholder="jane.doe@firm.com" 
                        required
                        disabled={status === 'submitting'}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-naviter-blue font-sans font-bold">phone number *</label>
                    <input 
                        name="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border-b border-naviter-navy/20 bg-transparent focus:border-naviter-navy outline-none text-naviter-navy font-sans transition-colors" 
                        placeholder="(555) 000-0000" 
                        disabled={status === 'submitting'}
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-naviter-blue font-sans font-bold">message / collaboration context</label>
                <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border-b border-naviter-navy/20 bg-transparent focus:border-naviter-navy outline-none h-32 text-naviter-navy font-sans transition-colors resize-none" 
                    placeholder="Provide background on your firm's core networks or general referral scope."
                    disabled={status === 'submitting'}
                />
            </div>

            <div className="text-center pt-8">
                <motion.button 
                    type="submit"
                    disabled={status === 'submitting'}
                    initial={{ backgroundColor: "#58aadb" }}
                    whileInView={{ backgroundColor: "#154372" }}
                    transition={{ duration: 0.6 }}
                    className="group relative inline-flex items-center gap-6 px-12 py-6 text-white overflow-hidden transition-all duration-500 rounded-sm hover:bg-naviter-navy text-lg font-serif lowercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 font-serif text-lg lowercase tracking-widest flex items-center gap-2">
                        {status === 'submitting' ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                submitting...
                            </>
                        ) : (
                            'submit request'
                        )}
                    </span>
                    {status !== 'submitting' && (
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    )}
                </motion.button>
            </div>
        </form>
        )}
      </div>
    </motion.div>
  );
};
