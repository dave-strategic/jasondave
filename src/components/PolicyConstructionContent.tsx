import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { StackedBarChart } from './StackedBarChart';

export const PolicyConstructionContent = () => (
  <div className="space-y-12">
    {/* Liquid Assets vs. Low-Liquidity Assets */}
    <div className="space-y-6">
      <h4 className="text-2xl font-serif text-naviter-navy">Liquid Assets vs. Low-Liquidity Assets</h4>
      <StackedBarChart />
      <p className="text-naviter-navy/80 leading-relaxed text-base font-sans">
        Broadly we view investment assets in two categories: liquid assets and low-liquidity assets. Liquid assets are those that have daily liquidity while low-liquidity assets include assets with monthly and quarterly liquidity or assets with lock-ups.
      </p>
      <p className="text-naviter-navy/80 leading-relaxed text-base font-sans">
        When low-liquidity assets are properly selected—with low correlations to liquid assets—their inclusion can have two long-term positive effects on a diversified portfolio:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-naviter-navy/80 font-sans">
        <li>An increase in return</li>
        <li>A decrease in volatility (risk)</li>
      </ul>
      <p className="text-naviter-navy/80 leading-relaxed text-base font-sans">
        Given these benefits, the decision to include low-liquidity assets in a portfolio has less to do with risk preference and more to do with tolerance for illiquidity. Cash flow needs from the portfolio and investment time horizon are the primary factors in determining the proper balance between liquid and low-liquidity assets.
      </p>
    </div>

    {/* Liquid Assets */}
    <div className="space-y-6">
      <h4 className="text-2xl font-serif text-naviter-navy">Liquid Assets</h4>
      <p className="text-naviter-navy/80 leading-relaxed font-sans">
        We view liquid assets in three categories: <strong className="text-naviter-navy">Equity</strong>, <strong className="text-naviter-navy">Fixed income</strong>, and <strong className="text-naviter-navy">Liquid alternatives</strong>. The common characteristic is that each of these has at least daily, if not intraday liquidity, i.e., the ability to be sold quickly for cash.
      </p>

      {/* Equities */}
      <h5 className="text-xl font-serif text-naviter-navy pt-4">Equities</h5>
      <p className="text-naviter-navy/80 leading-relaxed font-sans">
        We have three broad views on owning equities:
      </p>
      <ul className="list-decimal pl-6 space-y-2 text-naviter-navy/80 font-sans">
        <li>Global equities are one asset class</li>
        <li>Passive management wins over active management (after trading costs/fees)</li>
        <li>True value exists in tax-loss harvesting</li>
      </ul>
      <p className="text-naviter-navy/80 leading-relaxed font-sans">
        Rather than implement our passive approach to global equities through ETFs or mutual funds that track an index, we utilize <strong className="text-naviter-navy">Direct Indexing</strong> which provides a greater after-tax benefit.
      </p>
      
      {/* Fixed Income */}
      <h5 className="text-xl font-serif text-naviter-navy pt-4">Fixed Income</h5>
      <p className="text-naviter-navy/80 leading-relaxed font-sans">
          We believe active management produces the best risk-adjusted returns in fixed income. Our fixed income allocation is managed by a single institutional manager through a “Core-Plus” portfolio. We access this strategy through a separately managed account (SMA) structure.
      </p>

      {/* Liquid Alternatives */}
      <h5 className="text-xl font-serif text-naviter-navy pt-4">Liquid Alternatives</h5>
      <p className="text-naviter-navy/80 leading-relaxed font-sans">
          This allocation represents lowly-correlated liquid alternative investments designed to complement the equity and fixed income allocations.
      </p>
    </div>
    
    {/* Low-Liquidity Assets */}
    <div className="space-y-6">
      <h4 className="text-2xl font-serif text-naviter-navy">Low-Liquidity Assets</h4>
      <p className="text-naviter-navy/80 leading-relaxed text-base font-sans">
        We define this set of strategies as “low-liquidity” assets rather than illiquid assets. Properly selected alternative investments can provide the elusive “have my cake and eat it too” investment properties sought after by so many investors.
      </p>
    </div>
  </div>
);
