import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsSectionProps {
  onStartJourney?: () => void;
  onDiscoverQatar?: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  onStartJourney,
  onDiscoverQatar,
}) => {
  return (
    <section
      id="approach-stats-section"
      className="relative min-h-screen w-full bg-transparent text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-20 sm:py-32 overflow-hidden"
    >
      <div className="relative max-w-6xl w-full mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Large Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-[26px] border border-white/[0.12] hover:border-white/[0.25] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: 'url(/images/card_stats_left_1787082927802.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none rounded-[26px]" />
            
            {/* Inner subtle specular light reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[26px] z-10" />

            {/* Top-Right Button: ↗ Start your journey */}
            <div className="flex justify-end w-full relative z-10">
              <button
                id="start-your-journey-btn"
                onClick={onStartJourney}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-white text-black font-sans text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>↗ Start your journey</span>
              </button>
            </div>

            {/* Bottom-Left Area */}
            <div className="relative z-10 mt-auto pt-16">
              {/* Bottom-left small label */}
              <span className="font-sans text-xs uppercase tracking-wider text-white/50 font-semibold mb-3 block">
                ✦ OUR APPROACH & EXPERTISE
              </span>

              {/* Bottom-left main heading */}
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-normal text-white leading-[1.18] tracking-tight">
                <span>Thoughtfully crafted journeys </span>
                <span className="italic text-white font-editorial block sm:inline mt-1 sm:mt-0">
                  for curious travelers.
                </span>
              </h3>
            </div>
          </motion.div>

          {/* Right Column with 3 Staggered Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            {/* Top-right statistic: 563 km / Qatar coastline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full sm:w-[85%] lg:w-[85%] self-start group relative p-6 sm:p-7 rounded-[22px] velvet-glass backdrop-blur-2xl transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[22px]" />
              <div className="relative z-10 py-3 sm:py-4">
                <div className="font-sans text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-2">
                  563 km
                </div>
                <div className="font-sans text-xs sm:text-sm text-white/70 tracking-wide font-normal">
                  Qatar coastline
                </div>
              </div>
            </motion.div>

            {/* Middle-right statistic: 100+ / nationalities call Qatar home */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full sm:w-[85%] lg:w-[85%] self-end group relative p-6 sm:p-7 rounded-[22px] velvet-glass backdrop-blur-2xl transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[22px]" />
              <div className="relative z-10 py-3 sm:py-4">
                <div className="font-sans text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-2">
                  100+
                </div>
                <div className="font-sans text-xs sm:text-sm text-white/70 tracking-wide font-normal">
                  nationalities call Qatar home
                </div>
              </div>
            </motion.div>

            {/* Bottom-right card: Beyond the expected. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full sm:w-[92%] lg:w-[92%] self-end group relative p-6 sm:p-7 rounded-[22px] velvet-glass backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[22px]" />

              {/* Top Icons Row: 4 circular indicators matching reference */}
              <div className="flex items-center justify-end gap-1.5 mb-5 relative z-10">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <X className="w-3 h-3 text-white/70" />
                </div>
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <X className="w-3 h-3 text-white/70" />
                </div>
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  ✕
                </div>
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <X className="w-3 h-3 text-white/70" />
                </div>
              </div>

              {/* Bottom Content: Heading, Supporting Text, and Link */}
              <div className="relative z-10">
                <h4 className="font-sans text-lg sm:text-xl font-medium text-white mb-2 leading-snug tracking-tight">
                  Beyond the expected.
                </h4>
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-4">
                  Discover Qatar through experiences that go beyond the usual itinerary.
                </p>
                <button
                  id="discover-qatar-link-btn"
                  onClick={onDiscoverQatar}
                  className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-white hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all cursor-pointer group-hover:translate-x-0.5 duration-200"
                >
                  <span>Discover Qatar ↗</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
