import React from 'react';
import { motion } from 'motion/react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white text-[#1E293B] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: USA Map Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative flex flex-col items-center"
          >
            <div className="w-full relative px-2 sm:px-6 py-4">
              {/* Stylized USA Vector Map */}
              <svg 
                viewBox="0 0 800 520" 
                className="w-full h-auto drop-shadow-sm select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mainland States Outlines / Polygons */}
                <g stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round">
                  {/* Northwest: WA, OR, ID */}
                  <path d="M 60 40 L 150 50 L 140 130 L 50 140 Z" fill="#4B8DDE" />
                  <path d="M 50 140 L 140 130 L 130 220 L 40 230 Z" fill="#5A9BE8" />
                  <path d="M 150 50 L 220 60 L 210 180 L 140 130 Z" fill="#245592" />
                  
                  {/* California & Nevada & Utah & Arizona */}
                  <path d="M 40 230 L 130 220 L 160 330 L 90 380 L 50 330 Z" fill="#204981" />
                  <path d="M 130 220 L 210 180 L 230 280 L 160 330 Z" fill="#69A3EC" />
                  <path d="M 210 180 L 280 190 L 270 270 L 230 280 Z" fill="#183864" />
                  <path d="M 160 330 L 230 280 L 260 370 L 190 390 Z" fill="#3D7ECA" />
                  
                  {/* Mountain: MT, WY, CO, NM */}
                  <path d="M 220 60 L 340 70 L 330 140 L 210 180 Z" fill="#4084D2" />
                  <path d="M 210 180 L 330 140 L 320 220 L 280 190 Z" fill="#5898E4" />
                  <path d="M 280 190 L 380 200 L 370 280 L 270 270 Z" fill="#1C4174" />
                  <path d="M 260 370 L 270 270 L 370 280 L 360 380 L 290 390 Z" fill="#4E8FDC" />
                  
                  {/* Plains: ND, SD, NE, KS, OK, TX */}
                  <path d="M 340 70 L 440 80 L 430 130 L 330 140 Z" fill="#2E62A2" />
                  <path d="M 330 140 L 430 130 L 420 190 L 320 220 Z" fill="#64A0EA" />
                  <path d="M 320 220 L 420 190 L 410 250 L 380 200 Z" fill="#15335D" />
                  <path d="M 380 200 L 480 210 L 470 270 L 370 280 Z" fill="#3674C0" />
                  <path d="M 370 280 L 470 270 L 480 320 L 420 330 L 360 380 Z" fill="#25518D" />
                  <path d="M 360 380 L 420 330 L 480 320 L 510 400 L 460 480 L 390 440 Z" fill="#1A3E6E" />
                  
                  {/* Midwest: MN, IA, MO, WI, IL, MI, IN, OH */}
                  <path d="M 440 80 L 510 85 L 500 160 L 430 130 Z" fill="#5697E5" />
                  <path d="M 430 130 L 500 160 L 490 210 L 420 190 Z" fill="#3979C5" />
                  <path d="M 420 190 L 490 210 L 510 280 L 470 270 Z" fill="#1D4378" />
                  <path d="M 500 160 L 550 140 L 560 200 L 490 210 Z" fill="#488AD9" />
                  <path d="M 490 210 L 560 200 L 550 280 L 510 280 Z" fill="#609BE8" />
                  <path d="M 550 140 L 610 120 L 630 190 L 560 200 Z" fill="#15355F" />
                  <path d="M 550 280 L 600 270 L 590 320 L 540 330 L 510 280 Z" fill="#2C5F9F" />
                  <path d="M 600 270 L 640 260 L 630 310 L 590 320 Z" fill="#4E8EDB" />
                  
                  {/* South: AR, LA, KY, TN, MS, AL, GA, FL */}
                  <path d="M 470 270 L 540 330 L 530 380 L 480 320 Z" fill="#3F82CE" />
                  <path d="M 480 320 L 530 380 L 520 430 L 460 480 L 510 400 Z" fill="#629EEA" />
                  <path d="M 550 280 L 630 310 L 620 340 L 540 330 Z" fill="#193B67" />
                  <path d="M 540 330 L 620 340 L 610 380 L 530 380 Z" fill="#316DB5" />
                  <path d="M 530 380 L 570 375 L 560 430 L 520 430 Z" fill="#1F467B" />
                  <path d="M 570 375 L 610 380 L 600 435 L 560 430 Z" fill="#4B8DDC" />
                  <path d="M 610 380 L 660 370 L 650 430 L 600 435 Z" fill="#25518D" />
                  <path d="M 650 430 L 690 490 L 640 480 L 600 435 Z" fill="#132E52" />
                  
                  {/* East: PA, NY, New England, Mid-Atlantic, Carolinas */}
                  <path d="M 630 190 L 690 180 L 680 230 L 640 260 Z" fill="#3A7BC7" />
                  <path d="M 690 180 L 740 160 L 760 210 L 680 230 Z" fill="#5294E3" />
                  <path d="M 740 160 L 780 130 L 790 180 L 760 210 Z" fill="#1C4071" />
                  <path d="M 640 260 L 680 230 L 730 260 L 690 290 Z" fill="#5F9BE7" />
                  <path d="M 630 310 L 690 290 L 730 340 L 660 370 Z" fill="#2C5D9B" />
                  <path d="M 660 370 L 730 340 L 710 400 L 650 430 Z" fill="#4284D0" />
                  
                  {/* Alaska & Hawaii */}
                  <path d="M 80 410 L 160 410 L 180 470 L 130 490 L 70 460 Z" fill="#4487D4" />
                  <ellipse cx="230" cy="460" rx="15" ry="8" transform="rotate(-20 230 460)" fill="#183864" />
                  <ellipse cx="270" cy="480" rx="20" ry="10" transform="rotate(-20 270 480)" fill="#2E62A2" />
                </g>

                {/* Dotted Pins: Affiliates (Dark Squares) & Clients (Light Blue Circles) */}
                <g>
                  {/* Affiliates (Dark Navy Squares) */}
                  {[
                    [95, 80], [180, 110], [80, 310], [240, 220], [330, 110], [400, 230],
                    [440, 410], [490, 180], [580, 160], [530, 300], [670, 210], [710, 280],
                    [630, 410], [120, 440]
                  ].map(([x, y], idx) => (
                    <rect 
                      key={`aff-${idx}`} 
                      x={x - 6} 
                      y={y - 6} 
                      width="12" 
                      height="12" 
                      rx="2" 
                      fill="#0B1D3A" 
                      stroke="#ffffff" 
                      strokeWidth="1.5"
                      className="hover:scale-125 transition-transform origin-center cursor-pointer" 
                    >
                      <title>Affiliate Location</title>
                    </rect>
                  ))}

                  {/* Clients (Light Blue Circles with Dot inside) */}
                  {[
                    [70, 170], [110, 190], [160, 80], [110, 280], [190, 310], [250, 330],
                    [310, 230], [350, 180], [430, 160], [400, 300], [460, 350], [520, 120],
                    [530, 240], [580, 230], [620, 150], [660, 260], [700, 190], [760, 180],
                    [570, 310], [600, 360], [580, 410], [670, 460], [360, 90], [280, 130]
                  ].map(([x, y], idx) => (
                    <g key={`cli-${idx}`} transform={`translate(${x}, ${y})`} className="hover:scale-125 transition-transform cursor-pointer">
                      <title>Client Location</title>
                      <circle r="7.5" fill="#E0F2FE" stroke="#3b82f6" strokeWidth="1.5" />
                      <circle r="2.5" fill="#3b82f6" />
                    </g>
                  ))}
                </g>
              </svg>

              {/* Legend at Bottom Right */}
              <div className="flex flex-col gap-2 text-xs font-medium text-[#475569] ml-auto mt-2 pr-4 max-w-[130px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 bg-[#0B1D3A] rounded-[2px] flex-shrink-0 shadow-sm" />
                  <span>Affiliates</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#E0F2FE] border border-[#3b82f6] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full" />
                  </div>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Built with Purpose Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center lg:pl-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#3b82f6] mb-8 font-sans">
              Built with Purpose
            </h2>
            
            <p className="text-base sm:text-lg md:text-[18px] text-[#1e293b] leading-[1.75] mb-6 font-sans font-normal">
              Naviter Wealth is an independent wealth management firm with a national presence committed to helping you navigate your financial journey—we dedicate time to select vendors that we are confident will provide top-quality resources, so we can provide you bespoke solutions.
            </p>

            <p className="text-base sm:text-lg md:text-[18px] text-[#1e293b] leading-[1.75] font-sans font-normal">
              The name <span className="font-semibold text-[#3b82f6]">Naviter</span> is a direct reflection of that purpose, combining two Latin words—<span className="font-semibold text-[#3b82f6]">navigare (navigate)</span> and <span className="font-semibold text-[#3b82f6]">iter (journey)</span>—to reinforce our commitment to being your trusted guide.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

