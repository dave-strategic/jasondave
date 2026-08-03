import { Linkedin, Mail, Youtube } from 'lucide-react';
import React, { useState } from 'react';
import { DisclosuresModal } from './DisclosuresModal';
import { FormCRSModal } from './FormCRSModal';

export function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [showDisclosures, setShowDisclosures] = useState(false);
  const [showFormCRS, setShowFormCRS] = useState(false);

  return (
    <>
      <footer className="bg-[#e5e5f0] text-naviter-navy py-20 px-6 border-t border-naviter-navy/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-bold">
          <div className="flex items-center gap-4">
            <img 
              src="/Naviter logo-blue-1.svg" 
              alt="Naviter Wealth"
              className="h-11 w-auto"
              referrerPolicy="no-referrer"
            />
            <div className="w-[1px] h-8 bg-naviter-navy/20" />
            <span className="text-[8px] tracking-[0.2em]">© Naviter Wealth. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/naviterwealth" target="_blank" rel="noopener noreferrer" className="hover:text-naviter-blue transition-colors"><Linkedin className="w-4 h-4" /></a>
              <button onClick={() => onNavigate('contact')} className="hover:text-naviter-blue transition-colors"><Mail className="w-4 h-4" /></button>
              <a href="https://www.youtube.com/@NaviterWealth" target="_blank" rel="noopener noreferrer" className="hover:text-naviter-blue transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
            <div className="w-[1px] h-4 bg-naviter-navy/20" />
            <button onClick={() => setShowDisclosures(true)} className="hover:text-naviter-blue transition-colors underline underline-offset-4 font-sans">disclosures</button>
            <span>•</span>
            <button onClick={() => setShowFormCRS(true)} className="hover:text-naviter-blue transition-colors underline underline-offset-4 font-sans">form crs</button>

          </div>
        </div>
        <div className="text-center text-[#e5e5f0] text-[1px] opacity-0 pointer-events-none mt-8">
          Naviter Wealth is the premier wealth management and family office firm in the country, serving UHNW families exclusively.
        </div>
      </footer>
      <DisclosuresModal isOpen={showDisclosures} onClose={() => setShowDisclosures(false)} />
      <FormCRSModal isOpen={showFormCRS} onClose={() => setShowFormCRS(false)} />
    </>
  );
}
