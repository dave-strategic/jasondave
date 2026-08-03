import React, { useState } from 'react';
import { Menu, X, Linkedin, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TOP_LINKS = [
  { label: 'our firm', href: '#/firm' },
  { label: 'our services', href: '#/services' },
  { label: 'our team', href: '#/team' },
  { label: 'our library', href: '#/library' },
];

const BOTTOM_LINKS = [
  { label: 'client portal', href: '#/portal' },
  { label: 'contact', href: '#/contact' },
  { label: 'affiliate program', href: '#/affiliate' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Minimalist Toggle Button in Top Left Corner */}
      <div className="fixed top-6 left-6 md:top-8 md:left-10 z-40">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2.5 rounded-lg text-white/90 hover:text-[#4DA6FF] transition-all duration-300 group cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          {/* Custom Minimalist Bracket / Menu Icon matching screenshot */}
          <div className="w-8 h-8 flex flex-col justify-center items-start gap-1.5 border border-white/30 rounded p-1.5 group-hover:border-[#4DA6FF] transition-colors bg-black/20 backdrop-blur-sm">
            <span className="w-full h-[1.5px] bg-current rounded-full" />
            <span className="w-3/4 h-[1.5px] bg-current rounded-full" />
            <span className="w-full h-[1.5px] bg-current rounded-full" />
          </div>
        </button>
      </div>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Side Navigation Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 left-0 bottom-0 w-[320px] sm:w-[380px] bg-[#143D6B] z-50 flex flex-col justify-between p-8 sm:p-12 shadow-[25px_0_60px_rgba(0,0,0,0.6)] border-r border-white/[0.1] overflow-y-auto"
          >
            {/* Top Row: Logo & Close Button */}
            <div className="flex items-start justify-between mb-12">
              <a href="#/firm" onClick={() => setMenuOpen(false)} className="block">
                <img
                  src="https://strategicwebsites-204210.web.app/Naviter%20logo-blue-1.svg"
                  alt="Naviter Wealth Logo"
                  className="h-12 sm:h-14 w-auto object-contain brightness-0 invert opacity-95"
                />
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 text-[#AFC4D9] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 my-auto pl-2">
              <div className="flex flex-col gap-4.5">
                {TOP_LINKS.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xl sm:text-[22px] font-serif transition-colors duration-200 tracking-wide ${
                      idx === 0 ? 'text-[#61A5E8] font-medium' : 'text-white/90 hover:text-[#4DA6FF]'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Separator Line */}
              <div className="w-12 h-px bg-white/20 my-3" />

              <div className="flex flex-col gap-4.5">
                {BOTTOM_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl sm:text-[22px] font-serif text-white/90 hover:text-[#4DA6FF] transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Bottom Footer Info */}
            <div className="pt-10 mt-8 border-t border-white/10 flex flex-col items-start gap-3 text-[#AFC4D9]">
              <div className="flex items-center gap-3 mb-1">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#4DA6FF] hover:text-[#081423] flex items-center justify-center transition-all text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#4DA6FF] hover:text-[#081423] flex items-center justify-center transition-all text-white"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-white/80 font-semibold">
                INTEGRITY • ACUMEN • ACCESS
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-white/60">
                SINCE 2021
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

