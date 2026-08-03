import { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Youtube } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = memo(({ activePage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsAtTop(currentScrollY < window.innerHeight / 2);

      // Always keep visible at the top of the page (within 80px)
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else {
        // If scrolling down, hide the menu trigger (require a small scroll down offset of 8px to make it less sensitive)
        if (currentScrollY > lastScrollY.current + 8) {
          setIsVisible(false);
        } 
        // If scrolling up, show the menu trigger (require a small scroll up offset of 8px to feel smooth and intentional)
        else if (currentScrollY < lastScrollY.current - 8) {
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'firm', label: 'our firm' },
    { id: 'services', label: 'our services' },
    { id: 'team', label: 'our team' },
    { id: 'library', label: 'our library' },
    { id: 'separator', label: 'separator' },
    { id: 'portal', label: 'client portal' },
    { id: 'contact', label: 'contact' },
    { id: 'affiliate', label: 'affiliate program' },
  ];

  return (
    <>
      {/* Combined Header Trigger Container */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          pointerEvents: isVisible ? 'auto' : 'none' 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-12 left-0 right-0 z-50 flex justify-between items-start px-12 pointer-events-none"
      >
        {/* Hamburger Trigger */}
        <motion.button
          animate={{ 
            opacity: isVisible ? 1 : 0, 
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsOpen(true)}
          className="w-9.5 h-9.5 bg-transparent flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group rounded-none border-none outline-none cursor-pointer relative pointer-events-auto"
          aria-label="Open Menu"
        >
          {/* Custom Naviter Box SVG Border with Left Gap in Navy Blue/White */}
          <svg 
            className={`absolute inset-0 w-full h-full pointer-events-none transform transition-all duration-300 group-hover:scale-105 ${(activePage === 'policystatement' || activePage === 'ddq') ? 'text-white' : 'text-naviter-navy'}`} 
            viewBox="0 0 44 44" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 10 V1.5 H42.5 V42.5 H1.5 V34"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </motion.button>

        {/* Top Right Logo */}
        <motion.div
          animate={{ 
            opacity: isVisible && !(activePage === 'firm' && isAtTop) ? 1 : 0, 
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none"
        >
          <img 
            src={(activePage === 'policystatement' || activePage === 'ddq') ? "/Naviter logo-white-1.svg" : "/Naviter logo-blue-1.svg"} 
            alt="Naviter Wealth Logo"
            className="h-[44px] w-auto object-contain brightness-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm"
            />

            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed top-0 left-0 bottom-0 h-full w-full max-w-[380px] sm:max-w-[420px] bg-naviter-navy z-[70] shadow-2xl flex flex-col justify-between p-8 sm:p-12 border-r border-white/5"
            >
              {/* Background Decorative Circles */}
              <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] border border-white rounded-full" />
              </div>

              {/* Panel Header */}
              <div className="flex justify-between items-center relative z-10">
                <img 
                  src="/Naviter logo-white-1.svg" 
                  alt="Naviter Wealth Logo"
                  className="h-16 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-naviter-gold transition-colors p-2 group"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-5 mt-16 mb-auto relative z-10 text-left">
                {menuItems.map((item, idx) => {
                  if (item.id === 'separator') {
                    return <div key="separator" className="h-[1px] w-12 bg-naviter-blue/30 my-3" />;
                  }
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      onClick={() => {
                        if (item.id === 'firm' && activePage === 'firm') {
                          document.getElementById('foundation')?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        } else if (item.id === 'portal') {
                          window.open('https://naviterwealth.addepar.com/', '_blank');
                          setIsOpen(false);
                        } else if (item.id !== 'separator') {
                          onNavigate(item.id);
                          setIsOpen(false);
                        }
                      }}
                      className={`flex items-center gap-4 text-lg sm:text-xl font-serif tracking-wide transition-all text-left group w-full ${
                        activePage === item.id ? 'text-naviter-gold' : 'text-white hover:text-naviter-gold'
                      }`}
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Panel Footer */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-3 text-white/45 text-[10px] tracking-[0.25em] font-semibold uppercase font-mono relative z-10">
                <div className="flex gap-5 mb-2">
                  <a href="https://www.linkedin.com/company/naviterwealth" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-naviter-gold transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.youtube.com/@NaviterWealth" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-naviter-gold transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
                <div className="leading-relaxed">integrity • acumen • access</div>
                <div className="text-white/30 text-[9px] tracking-[0.2em] mt-0.5">since 2021</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
