import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function FormCRSModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
                <h4 className="text-naviter-blue text-xs uppercase tracking-widest font-bold">naviter wealth / form crs</h4>
                <h2 className="text-2xl text-naviter-navy mt-2">form crs: client relationship summary</h2>
                <p className="text-xs text-gray-500 mt-1">EFFECTIVE DATE: MAY 2026</p>
                <div className="w-16 h-0.5 bg-naviter-blue mt-2" />
              </div>
              <button onClick={onClose} className="text-naviter-navy hover:text-naviter-blue">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-naviter-navy font-sans">
              <section className="pl-6">
                <h3 className="font-bold mb-2 uppercase">INTRODUCTION</h3>
                <p>Our firm, Naviter Wealth LLC, is registered as an investment adviser with the U.S. Securities and Exchange Commission. Brokerage and investment advisory services and fees differ and it is important for you to understand these differences. Free and simple tools are available to research firms and financial professionals at <a href="https://www.investor.gov/CRS" target="_blank" rel="noopener noreferrer" className="text-naviter-blue hover:underline">Investor.gov/CRS</a>, which also provides educational materials about broker-dealers, investment advisers, and investing.</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2 uppercase">RELATIONSHIPS AND SERVICES</h3>
                <h4 className="font-bold text-naviter-blue mb-2.5">What investment services and advice can you provide me?</h4>
                <p><strong>Services:</strong> We offer investment advisory services to retail investors. These services include investment management and financial planning services. We work closely with you to identify your investment goals and objectives, as well as risk tolerance and financial situation in order to develop an investment approach.</p>
                <p className="mt-3"><strong>Accounts, Investments, and Monitoring:</strong> We provide services to individual, joint, retirement, trust, estate accounts, limited liability companies, partnerships and non-profits. We primarily use exchange-traded funds, individual stocks, and mutual funds in constructing portfolios. We also use private investments, bonds, and independent managers. We may utilize margin, options contracts, and lines of credit. We provide investment supervision, including monitor portfolios and securities in accounts on a regular and continuous basis. We also offer to meet with you at least annually, or more frequently, depending on your needs.</p>
                <p className="mt-3"><strong>Investment Authority:</strong> We provide our services on a perpetual and discretionary basis. We execute investment recommendations in accordance with your investment objectives without your prior approval of each specific transaction. Our engagement will continue until you notify us otherwise in writing.</p>
                <p className="mt-3"><strong>Account Minimums & Other Requirements:</strong> We do not require an account or relationship size minimum in order for you to open/maintain an account or establish a relationship. However, we do require that you have at least $25,000,000 in assets under management with us in order to utilize a performance fee structure. This minimum may be waived at our sole discretion.</p>
                <p className="mt-3"><strong>Additional Information:</strong> For more detailed information on our relationships and services, please see Item 4 – Advisory Services, Item 13 – Review of Accounts and Item 7 – Types of Clients of our Form ADV Part 2A available via our firm’s <a href="https://adviserinfo.sec.gov/firm/brochure/311508" target="_blank" rel="noopener noreferrer" className="text-naviter-blue hover:underline">Investment Adviser Public Disclosure Page</a>.</p>
              </section>

              <section className="pl-6 bg-gray-50 p-4 rounded-md">
                <h4 className="text-naviter-blue font-bold text-xs uppercase tracking-widest mb-2">conversation starters</h4>
                <ul className="list-disc pl-5 mt-2 text-sm italic space-y-2">
                  <li className="text-naviter-blue">Given my financial situation, should I choose an investment advisory service? Why or why not?</li>
                  <li className="text-naviter-blue">How will you choose investments to recommend to me?</li>
                  <li className="text-naviter-blue">What is your relevant experience, including your licenses, education and other qualifications? What do these qualifications mean?</li>
                </ul>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2 uppercase">FEES, COSTS, CONFLICTS, AND STANDARD OF CONDUCT</h3>
                <h4 className="font-bold text-naviter-blue mb-2.5">What fees will I pay?</h4>
                <p><strong>Asset-Based Fees:</strong> Our asset-based fees for wealth management services range from 0.20% to 0.85% annually. These fees are collected on a quarterly basis and calculated as a percentage of the value of the cash and investments in your account[s] that we manage. This presents a conflict of interest as we are financially incentivized to encourage you to place more assets in your advisory account as you will pay more in advisory fees.</p>
                <p className="mt-3"><strong>Performance-Based Fees:</strong> In certain instances, we may enter into an agreement with a client to charge an annual performance-based fee on certain assets we manage. Clients under a performance-based fee agreement must be qualified purchasers, and are charged an asset-based fee at a reduced rate ranging from 0.10% to 0.425% annually. Performance fees are based on gains within your accounts. Our performance-based fee will equal up to 20% of any gains (both realized and unrealized) in your account[s] for the year. This presents a conflict of interest as we are financially incentivized to make investments that are riskier or more speculative than might otherwise be the case in the absence of such an arrangement.</p>
                <p className="mt-3"><strong>Other Fees & Costs:</strong> In addition to our advisory fee, you will also be responsible for custody fees, account administrative fees, third-party manager fees, fees and expenses related to mutual funds and exchange-traded funds and applicable securities transaction fees.</p>
                <p className="mt-3"><strong>Additional Information:</strong> You will pay fees and costs whether you make or lose money on your investments. Fees and costs will reduce any amount of money you make on your investments over time. Please make sure you understand what fees and costs you are paying. For more detailed information on our fees, please see Item 5 – Fees and Compensation of our Form ADV Part 2A available via our firm’s <a href="https://adviserinfo.sec.gov/firm/brochure/311508" target="_blank" rel="noopener noreferrer" className="text-naviter-blue hover:underline">Investment Adviser Public Disclosure Page</a>.</p>
              </section>

              <section className="pl-6 bg-gray-50 p-4 rounded-md">
                <h4 className="text-naviter-blue font-bold text-xs uppercase tracking-widest mb-2">conversation starters</h4>
                <p className="text-sm italic text-naviter-blue">Help me understand how these fees and costs might affect my investments. If I give you $10,000 to invest, how much will go to fees and costs, and how much will be invested for me?</p>
              </section>

              <section className="pl-6">
                <h4 className="font-bold text-naviter-blue mb-2.5">What are your legal obligations to me when acting as my investment adviser? How else does your firm make money and what conflicts of interest do you have?</h4>
                <p>When we act as your investment adviser, we have to act in your best interest and not put our interests ahead of yours. At the same time, the way we make money creates some conflicts with your interests. You should understand and ask us about these conflicts because they can affect the investment advice we provide you. Here is an example to help you understand what this means.</p>
                <p className="mt-3">Certain financial professionals are licensed as insurance agents. In addition to our services, your financial professional may offer you insurance products in their separate capacity as an insurance agent. The fees charged for the implementation of insurance products are separate from our advisory fees, where your financial professional will earn commission-based compensation for the implementation of an insurance product. Therefore, there is a financial incentive to recommend that you implement insurance through our financial professionals.</p>
                <p className="mt-3"><strong>Additional Information:</strong> For more detailed information, please see Item 10 – Financial Industry Activities and Affiliations, Item 12 – Brokerage Practices and Item 14 – Client Referrals and Other Compensation of our Form ADV Part 2A available via our firm’s <a href="https://adviserinfo.sec.gov/firm/brochure/311508" target="_blank" rel="noopener noreferrer" className="text-naviter-blue hover:underline">Investment Adviser Public Disclosure Page</a>.</p>
              </section>

              <section className="pl-6 bg-gray-50 p-4 rounded-md">
                <h4 className="text-naviter-blue font-bold text-xs uppercase tracking-widest mb-2">conversation starters</h4>
                <p className="text-sm italic text-naviter-blue">How might your conflicts of interest affect me, and how will you address them?</p>
              </section>

              <section className="pl-6">
                <h4 className="font-bold text-naviter-blue mb-2.5">How do your financial professionals make money?</h4>
                <p>Our financial professionals are compensated based on the revenue generated from advisory services, which is distributed in accordance with our partnership agreement. This means our financial professionals have an incentive to increase the asset size in the relationship or solicit new business, taking time away from the day-to-day servicing of existing clients.</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2 uppercase">DISCIPLINARY HISTORY</h3>
                <h4 className="font-bold text-naviter-blue mb-2.5">Do you or your financial professionals have legal or disciplinary history?</h4>
                <p>Yes. You can visit <a href="https://www.investor.gov/CRS" target="_blank" rel="noopener noreferrer" className="text-naviter-blue hover:underline">Investor.gov/CRS</a> for a free and simple search tool to research our firm and our financial professionals.</p>
              </section>

              <section className="pl-6 bg-gray-50 p-4 rounded-md">
                <h4 className="text-naviter-blue font-bold text-xs uppercase tracking-widest mb-2">conversation starters</h4>
                <p className="text-sm italic text-naviter-blue">As a financial professional, do you have any disciplinary history? For what type of conduct?</p>
              </section>

              <section className="pl-6">
                <h3 className="font-bold mb-2 uppercase">ADDITIONAL INFORMATION</h3>
                <p>You can find additional information about our investment advisory services by viewing our Form ADV Part 2A available via our firm’s <a href="https://adviserinfo.sec.gov/firm/brochure/311508" target="_blank" rel="noopener noreferrer" className="text-naviter-blue hover:underline">Investment Adviser Public Disclosure Page</a>. You can request up to date information and a copy of our client relationship summary by contacting us at (501) 333-9800.</p>
              </section>

              <section className="pl-6 bg-gray-50 p-4 rounded-md">
                <h4 className="text-naviter-blue font-bold text-xs uppercase tracking-widest mb-2">conversation starters</h4>
                <ul className="list-disc pl-5 mt-2 text-sm italic space-y-2">
                  <li className="text-naviter-blue">Who is my primary contact person? Is he or she a representative of an investment advisor?</li>
                  <li className="text-naviter-blue">Who can I talk to if I have concerns about how this person is treating me?</li>
                </ul>
              </section>

              <section className="pl-6 p-4 border border-naviter-blue/20 rounded-md">
                <h3 className="font-bold mb-2 uppercase">EXHIBIT MATERIAL CHANGES</h3>
                <p>The following material changes have been made to our Form CRS:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>We have amended the asset-based fees charged under the Performance-Based Fees section.</li>
                  <li>We now require that you have at least $25,000,000 in assets under management with us in order to utilize a performance-based fee structure.</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 flex gap-4 justify-end">
              <a 
                href="https://naviterwealth.com/wp-content/uploads/2025/07/Naviter-Wealth-FormCRS-3.25.25.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-naviter-navy border border-naviter-navy px-6 py-2 text-sm tracking-widest hover:bg-naviter-navy hover:text-white transition-colors flex items-center gap-2"
              >
                download pdf
              </a>
              <button 
                onClick={onClose}
                className="bg-naviter-navy text-white px-6 py-2 text-sm tracking-widest hover:bg-naviter-blue transition-colors"
              >
                close form crs
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
