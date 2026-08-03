import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function DisclosuresModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white p-8 w-full max-w-lg h-full overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-naviter-blue text-xs uppercase tracking-widest font-bold">naviter wealth / disclosures</h4>
                <h2 className="text-2xl text-naviter-navy mt-2">important disclaimers & disclosures</h2>
                <p className="text-xs text-gray-500 mt-1">EFFECTIVE DATE: MAY 2026</p>
                <div className="w-16 h-0.5 bg-naviter-blue mt-2" />
              </div>
              <button onClick={onClose} className="text-naviter-navy hover:text-naviter-blue">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-naviter-navy">
              <section className="pl-6">
                <h3 className="font-bold mb-2">1. regulatory registration & status</h3>
                <p>Naviter Wealth LLC ("Naviter") is a registered investment advisor with the U.S. Securities and Exchange Commission (SEC) under the Investment Advisers Act of 1940. Registration as an investment adviser does not imply any certain level of skill or training.</p>
                <p className="mt-2">The intelligence and materials provided on this platform are solely for informational purposes to enable a comprehensive understanding of our modular family office services, and should not be construed as investment, tax, legal, or accounting advice.</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2">2. portfolio performance & investment risks</h3>
                <p>All investments involve varying degrees of risk, and there can be no assurance that any specific investment strategy or portfolio model will be profitable, or prove suitable for your family's unique profile.</p>
                <p className="mt-2">Past performance is no guarantee of future results. Portfolio diversification, asset allocation, and private alternative structures do not guarantee a profit or protect against loss. Direct investments on specialized assets can carry significant liquidity limits and are subject to market forces of the high plateau.</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2">3. affiliations, code of ethics & business practice</h3>
                <p>Naviter operates under a rigorous fiduciary duty to put clients first. In alignment with this commitment, our representatives operate under a formal Code of Ethics restricting execution conflicts, private equity benefits, and proprietary brokerage programs.</p>
                <p className="mt-2">We do not participate in market-making or receipt of soft-dollar benefits that conflict with the delivery of objective modular guidance. Fiduciary alignment remains our fundamental core pillar.</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2">4. marketing, endorsements, and media materials</h3>
                <p>Any social media interactions, highlights, photography credits, publication links or whitepapers are for general context only. Mention of individual managers, firms, or historical cases should not be interpreted as an endorsement, recommendation, or professional testimony.</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2">5. sms outreach opt-in & privacy disclosures</h3>
                <p>By providing a phone number, you consent to receive informational messages from Naviter Wealth. Consent to receive SMS messages is not required to engage our services. You can reply STOP at any time to opt-out. Mobile phone information will never be sold, leased, or distributed to third parties for marketing purposes.</p>
                <p className="mt-2">We maintain state-of-the-art cybersecurity and identity confirmation protocols to manage and safeguard non-public personal information securely.</p>
              </section>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-naviter-navy text-white px-6 py-2 text-sm tracking-widest hover:bg-naviter-blue transition-colors"
              >
                close disclosures
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
