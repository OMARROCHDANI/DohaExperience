import React from 'react';
import { motion } from 'motion/react';

interface BenefitsSectionProps {
  onLearnMore?: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onLearnMore }) => {
  const cards = [
    {
      id: '01',
      title: 'Tailored experiences',
      description: 'Every journey is designed around your interests, pace, and way of travelling.',
      imageUrl: '/images/card_tailored.jpg',
    },
    {
      id: '02',
      title: 'Local expertise',
      description: 'Discover Doha through experiences chosen by people who know Qatar best.',
      imageUrl: '/images/card_local.jpg',
    },
    {
      id: '03',
      title: 'Seamless planning',
      description: 'From accommodation to activities, we make every part of your trip effortless.',
      imageUrl: '/images/card_seamless.jpg',
    },
    {
      id: '04',
      title: 'Unforgettable moments',
      description: "Go beyond sightseeing and create memories you'll carry long after you leave.",
      imageUrl: '/images/card_unforgettable.jpg',
    },
  ];

  return (
    <section
      id="benefits-section"
      className="relative min-h-screen w-full bg-transparent text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-24 sm:py-32 overflow-hidden"
    >
      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col items-center">
        {/* Small label: ✦ Why travel with us */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-white/90 text-xs sm:text-sm font-sans mb-6 backdrop-blur-md select-none"
        >
          <span className="text-white text-xs leading-none">✦</span>
          <span>Why travel with us</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-normal text-white text-center tracking-tight leading-[1.12] mb-4 select-none"
        >
          <span className="block not-italic">Your journey,</span>
          <span className="block italic text-white mt-1 font-editorial">
            beautifully taken care of.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-white/80 text-sm sm:text-base md:text-lg text-center max-w-xl mx-auto leading-relaxed mb-12 sm:mb-16 font-normal px-4"
        >
          From carefully planned itineraries to authentic local experiences, we take care of every detail so you can focus on enjoying the journey.
        </motion.p>

        {/* Four Cards with Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * idx }}
              className="group relative h-[420px] sm:h-[480px] flex flex-col justify-end rounded-[22px] bg-black border border-white/[0.12] hover:border-white/[0.25] transition-all duration-500 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${card.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Gradual Blur Overlay */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  maskImage: 'linear-gradient(to bottom, transparent 67%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 67%, black 100%)'
                }}
              />
              
              {/* Velvet tint overlay for readability */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#260511]/40 to-[#140108]/95" />

              {/* Bottom Content */}
              <div className="relative z-20 p-6 sm:p-7 flex flex-col transition-transform duration-700 ease-out group-hover:-translate-y-2">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white drop-shadow-lg leading-tight">
                    {card.title}
                  </h3>
                  <span className="font-sans text-[10px] sm:text-xs font-semibold text-white/70 mt-1 uppercase tracking-[0.2em] border border-white/20 rounded-full px-3 py-1.5 bg-white/5 backdrop-blur-md shadow-sm">
                    {card.id}
                  </span>
                </div>
                
                <p className="font-sans text-sm text-white/70 leading-relaxed font-light">
                  {card.description}
                </p>
                
                {/* Decorative Line */}
                <div className="w-8 h-[1px] bg-white/30 mt-6 group-hover:w-full group-hover:bg-white/70 transition-all duration-700 ease-out" />
              </div>

              {/* Inner subtle specular light reflection with velvet tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#99284f]/20 to-transparent pointer-events-none rounded-[22px] z-30 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
