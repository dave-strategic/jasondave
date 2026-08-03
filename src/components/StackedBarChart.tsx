
import React from 'react';

const chartsData = [
  { name: 'Conservative', equity: 20, fixed: 40, alternatives: 40 },
  { name: 'Moderate', equity: 45, fixed: 15, alternatives: 40 },
  { name: 'Aggressive', equity: 60, fixed: 0, alternatives: 40 },
];

export const StackedBarChart = () => (
  <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
    <div className="flex h-80 items-end gap-6 justify-between pt-8 pb-4">
      {chartsData.map((data) => (
        <div key={data.name} className="flex-1 flex flex-col items-center h-full justify-end gap-1">
          {/* Chart Bars */}
          <div className="w-full flex flex-col flex-grow justify-end gap-0.5">
            {/* Liquid Alternatives (Top) */}
            <div className="w-full bg-[#5c8dbd] text-white flex items-center justify-center text-xs font-bold font-sans rounded-t" style={{ height: `${data.alternatives}%` }}>
              {data.alternatives > 0 ? `${data.alternatives}%` : ''}
            </div>
            {/* Fixed Income (Middle) */}
            <div className="w-full bg-[#d1d5db] text-slate-800 flex items-center justify-center text-xs font-bold font-sans" style={{ height: `${data.fixed}%` }}>
              {data.fixed > 0 ? `${data.fixed}%` : ''}
            </div>
            {/* Global Equity (Bottom) */}
            <div className="w-full bg-[#0d1626] text-white flex items-center justify-center text-xs font-bold font-sans rounded-b" style={{ height: `${data.equity}%` }}>
              {data.equity > 0 ? `${data.equity}%` : ''}
            </div>
          </div>
          <span className="text-xs font-sans font-bold text-slate-600 mt-3">{data.name}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-6 mt-8 text-[10px] font-sans uppercase tracking-widest font-bold text-slate-600">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#0d1626]"></div> Global Equity</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#d1d5db]"></div> Fixed Income</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#5c8dbd]"></div> Liquid Alternatives</div>
    </div>
  </div>
);
