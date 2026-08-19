import React, { useState } from 'react';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAssistant,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  // Best practice: use framer-motion's scroll listener instead of raw useEffect event listeners
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Add background/shadow when not at the very top
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide navbar when scrolling down past 150px, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { id: 'Home', label: 'Home', sectionId: 'hero-banner' },
    { id: 'Experiences', label: 'Experiences', sectionId: 'benefits-section' },
    { id: 'Approach', label: 'Approach', sectionId: 'approach-stats-section' },
    { id: 'About', label: 'About', sectionId: 'doha-horizon-finale-section' },
  ];

  const handleNavClick = (item: { id: string; label: string; sectionId: string }) => {
    onSelectTab(item.id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(item.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full flex justify-center items-center pt-3 sm:pt-6 px-3 sm:px-4 z-50 pointer-events-none"
      >
        {/* Main Floating Capsule for Desktop & Mobile */}
        <motion.nav
          variants={{
            visible: { 
              y: 0, 
              opacity: 1, 
              scale: 1,
            },
            hidden: { 
              y: -50, 
              opacity: 0, 
              scale: 0.95,
            }
          }}
          initial="hidden"
          animate={hidden ? "hidden" : "visible"}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1]
          }}
          id="main-floating-navbar"
          aria-label="Main Navigation"
          className={`pointer-events-auto flex items-center justify-between sm:justify-start gap-1 sm:gap-2.5 bg-[#0d0d0d]/90 border ${
            scrolled ? 'border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : 'border-white/15 shadow-2xl'
          } rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 backdrop-blur-2xl transition-all duration-300 w-full max-w-[94%] sm:max-w-max mx-auto`}
        >
          {/* Logo / Brand Mark Icon */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => {
              onSelectTab('Home');
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-1.5 sm:p-2 text-white hover:text-white/80 transition-colors flex items-center justify-center rounded-full hover:bg-white/5 cursor-pointer"
            aria-label="Home Logo"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C10.5 4.5 9 7.5 9 9C7.5 9 4.5 10.5 2 12C4.5 13.5 7.5 15 9 15C9 16.5 10.5 19.5 12 22C13.5 19.5 15 16.5 15 15C16.5 15 19.5 13.5 22 12C19.5 10.5 16.5 9 15 9C15 7.5 13.5 4.5 12 2Z" />
            </svg>
          </button>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id.toLowerCase()}`}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Concierge Button (Always visible) */}
            <button
              id="nav-concierge-btn"
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 bg-white text-black font-semibold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full transition-all duration-200 hover:bg-neutral-200 hover:scale-[1.03] active:scale-[0.98] shadow-sm cursor-pointer min-h-[36px]"
            >
              <span>Concierge</span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.2]" />
            </button>

            {/* Mobile Hamburger Toggle (Visible only on mobile/tablet < md) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-white/90 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Full-Screen Frosted Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Slide-down Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative mt-20 mx-4 bg-[#0d0d0d]/95 border border-white/15 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-3">
                <span className="font-serif text-sm tracking-wide text-white">
                  DOHA <span className="italic font-editorial">Navigation</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-white/60 hover:text-white bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items List */}
              <div className="flex flex-col gap-1.5">
                {navItems.map((item, idx) => {
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleNavClick(item)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-left font-sans text-sm transition-all min-h-[48px] cursor-pointer ${
                        isActive
                          ? 'bg-white/15 text-white font-medium border border-white/20'
                          : 'text-white/75 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Action in Mobile Menu */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm py-3 px-4 rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer min-h-[48px]"
                >
                  <Sparkles className="w-4 h-4 text-black stroke-[2]" />
                  <span>Ask AI Concierge</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
