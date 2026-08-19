import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { RegenerativeSection } from './components/RegenerativeSection';
import { BenefitsSection } from './components/BenefitsSection';
import { StatsSection } from './components/StatsSection';
import { FinaleSection } from './components/FinaleSection';
import { PlanTripModal } from './components/PlanTripModal';
import { AssistantModal } from './components/AssistantModal';
import { InfoDrawer } from './components/InfoDrawer';
import { ScrollCanvas } from './components/ScrollCanvas';

export default function App() {
  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [isPlanTripOpen, setIsPlanTripOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [selectedDrawerTab, setSelectedDrawerTab] = useState<string | null>(null);

  // Preloader states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState<boolean>(true);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'Home') {
      setSelectedDrawerTab(tab);
    } else {
      setSelectedDrawerTab(null);
    }
  };

  const handleLoadingProgress = useCallback((progress: number) => {
    setLoadingProgress(progress);
  }, []);

  const handleLoaded = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsPreloaderVisible(false);
      }, 800); // Match index.css preloader transition duration
    }, 400); // Tiny buffer for smoothness
  }, []);

  return (
    <main
      id="doha-luxury-banner-app"
      className="relative min-h-screen w-full text-white flex flex-col overflow-x-hidden selection:bg-white selection:text-black font-sans bg-transparent"
    >
      {/* Background Plane Flight Scroll Canvas */}
      <ScrollCanvas
        onLoadingProgress={handleLoadingProgress}
        onLoaded={handleLoaded}
      />

      {/* Premium Preloader Overlay */}
      {isPreloaderVisible && (
        <div id="preloader" className={!isLoading ? 'fade-out' : ''} aria-live="polite" aria-busy={isLoading}>
          <div className="flex flex-col items-center justify-center w-full max-w-sm px-6">
            <h1 className="font-serif text-4xl sm:text-5xl tracking-[0.3em] sm:tracking-[0.5em] text-white font-light uppercase mb-12 ml-4 opacity-90">
              Doha
            </h1>
            
            <div className="w-full relative h-[1px] bg-white/10 mb-8 overflow-hidden rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ width: `${loadingProgress}%` }}
              >
                {/* Glow effect at the tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white blur-[2px]" />
              </div>
            </div>
            
            <div className="flex justify-center items-center w-full text-white/40 font-sans text-[10px] tracking-widest uppercase">
              <span>Preparing Journey</span>
            </div>
          </div>
        </div>
      )}

      {/* Page Content - Stacked above the fixed canvas with z-10 */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {/* SECTION 1: Top Floating Capsule Navbar & Hero Banner */}
        <div className="relative min-h-screen flex flex-col justify-between pt-16 sm:pt-20">
          <Navbar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />

          <HeroContent onPlanTrip={() => setIsPlanTripOpen(true)} />

          <div className="h-6 sm:h-10 w-full" aria-hidden="true" />
        </div>

        {/* SECTION 2: Moments Worth Remembering */}
        <RegenerativeSection />

        {/* SECTION 3: Benefits & What's In It For You Glassmorphism Section */}
        <BenefitsSection onLearnMore={() => setSelectedDrawerTab('Services')} />

        {/* SECTION 4: Approach & Expertise Bento Glassmorphism Section */}
        <StatsSection
          onStartJourney={() => setIsPlanTripOpen(true)}
          onDiscoverQatar={() => setSelectedDrawerTab('Experiences')}
        />

        {/* SECTION 5: Finale Section framing the skyline focal point */}
        <FinaleSection
          onPlanTrip={() => setIsPlanTripOpen(true)}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />
      </div>

      {/* Interactive Dialogs / Modals */}
      <PlanTripModal
        isOpen={isPlanTripOpen}
        onClose={() => setIsPlanTripOpen(false)}
      />

      <AssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      <InfoDrawer
        tab={selectedDrawerTab}
        onClose={() => {
          setSelectedDrawerTab(null);
          setActiveTab('Home');
        }}
        onPlanTrip={() => {
          setSelectedDrawerTab(null);
          setIsPlanTripOpen(true);
        }}
      />
    </main>
  );
}
