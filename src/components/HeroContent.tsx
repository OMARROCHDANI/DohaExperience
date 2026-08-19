import React, { useState } from 'react';
import { ArrowRight, Edit3, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroContentProps {
  onPlanTrip: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onPlanTrip }) => {
  const [agencyName, setAgencyName] = useState<string>('The Doha Experience');
  const [isEditingAgency, setIsEditingAgency] = useState<boolean>(false);
  const [tempAgencyInput, setTempAgencyInput] = useState<string>('The Doha Experience');

  const handleSaveAgency = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tempAgencyInput.trim()) {
      setAgencyName(tempAgencyInput.trim());
    }
    setIsEditingAgency(false);
  };

  return (
    <div id="hero-banner" className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 sm:py-10 md:py-12 z-10">
      {/* Small top line: ✦ Discover Doha with [Agency Name] */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 sm:mb-5 text-xs sm:text-sm text-white/85 select-none group"
      >
        <span className="text-white text-xs leading-none">✦</span>
        {isEditingAgency ? (
          <form onSubmit={handleSaveAgency} className="inline-flex items-center gap-1">
            <span className="text-white/80">Discover Doha with</span>
            <input
              type="text"
              autoFocus
              value={tempAgencyInput}
              onChange={(e) => setTempAgencyInput(e.target.value)}
              onBlur={() => handleSaveAgency()}
              className="bg-white/10 text-white font-medium border border-white/30 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="p-0.5 text-white hover:text-white/70"
              title="Save Agency Name"
            >
              <Check className="w-3 h-3" />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-1">
            <span>
              Discover Doha with{' '}
              <span className="font-semibold text-white tracking-tight">{agencyName}</span>
            </span>
            <button
              onClick={() => {
                setTempAgencyInput(agencyName);
                setIsEditingAgency(true);
              }}
              className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity p-0.5 ml-0.5 text-white/70 cursor-pointer"
              title="Edit Agency Name"
              aria-label="Edit Agency Name"
            >
              <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Main Headline:
          Discover Doha,
          Experience Luxury,
          Travel Without Limits
      */}
      <motion.h1
        id="hero-main-title"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-white font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.12] tracking-tight max-w-3xl mx-auto mb-5 sm:mb-6"
      >
        <span className="block">Discover Doha,</span>
        <span className="block">Experience Luxury,</span>
        <span className="block italic font-normal text-white mt-0.5 tracking-[-0.02em] font-serif sm:font-sans">
          Travel Without Limits
        </span>
      </motion.h1>

      {/* Button: Plan Your Trip → */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          id="hero-plan-trip-cta"
          onClick={onPlanTrip}
          className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-black font-semibold text-xs sm:text-sm px-4 sm:px-7 py-2.5 sm:py-3 min-h-[40px] sm:min-h-[44px] rounded-full transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.14)] cursor-pointer"
        >
          <span>Plan Your Trip</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  );
};
