import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface FinaleSectionProps {
  onPlanTrip?: () => void;
  onOpenAssistant?: () => void;
}

export const FinaleSection: React.FC<FinaleSectionProps> = ({
  onPlanTrip,
  onOpenAssistant,
}) => {
  const [dohaTime, setDohaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Qatar',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setDohaTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="doha-horizon-finale-section"
      className="relative min-h-[100dvh] w-full bg-transparent text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-16 sm:py-24 overflow-hidden gap-12 sm:gap-16"
    >
      {/* Top Header & Invitation */}
      <div className="relative max-w-4xl w-full mx-auto z-10 flex flex-col items-center text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-white/90 text-xs sm:text-sm font-sans mb-5 backdrop-blur-md select-none"
        >
          <span className="text-white text-xs">✦</span>
          <span>An Unrivaled Destination</span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-normal text-white tracking-tight leading-[1.12] mb-4 select-none"
        >
          <span className="block not-italic">Where the desert meets the skies,</span>
          <span className="block italic text-white mt-1 font-editorial">
            your journey awaits.
          </span>
        </motion.h2>
      </div>

      {/* 
        Central Floating Framing Zone
        Crafted with expansive negative space to showcase the city skyline as the primary focal point
      */}
      <div className="relative w-full max-w-5xl mx-auto z-10 flex flex-col items-center justify-center px-2">
        {/* Sleek Frosted Action Capsule - Designed to stay sleek and horizontal across all viewports */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex flex-row items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/15 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.8)] transition-all duration-300 max-w-full"
        >
          <button
            id="finale-plan-trip-btn"
            onClick={onPlanTrip}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-black font-sans text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap min-h-[40px] sm:min-h-[44px]"
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.2]" />
            <span>Plan Your Journey</span>
          </button>

          <button
            id="finale-ai-concierge-btn"
            onClick={onOpenAssistant}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 font-sans text-xs sm:text-sm font-medium transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap min-h-[40px] sm:min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
            <span>AI Concierge</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
