import React from 'react';
import { motion } from 'motion/react';

export const RegenerativeSection: React.FC = () => {
  return (
    <section
      id="creative-innovation-section"
      className="relative min-h-[80vh] sm:min-h-screen w-full bg-transparent text-white flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-20 sm:py-28 overflow-hidden"
    >
      {/* Central Content Block */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto z-10">
        {/* Headline with exact italic serif style matching reference */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-normal text-white leading-[1.12] tracking-tight mb-6 sm:mb-8 select-none"
        >
          <span className="block not-italic">Moments worth</span>
          <span className="block italic text-white mt-1.5 sm:mt-2 font-editorial">
            remembering
          </span>
        </motion.h2>

        {/* Subtext in DM Sans, pure white */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal px-4"
        >
          Culture, adventure, and effortless luxury come together to create a journey that feels entirely your own.
        </motion.p>
      </div>
    </section>
  );
};
