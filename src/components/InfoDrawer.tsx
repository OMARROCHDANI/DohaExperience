import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfoDrawerProps {
  tab: string | null;
  onClose: () => void;
  onPlanTrip: () => void;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({ tab, onClose, onPlanTrip }) => {
  if (!tab || tab === 'Home') return null;

  const renderContent = () => {
    switch (tab) {
      case 'Projects':
      case 'Experiences':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Curated Doha Experiences</h3>
            <p className="text-sm text-white/70">
              Handcrafted VIP journeys across the Arabian Gulf, desert sanctuaries, and cultural landmarks.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">The Pearl-Qatar Superyacht Sunset</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white">Private Charter</span>
                </div>
                <p className="text-xs text-white/60">Cruising Porto Arabia and West Bay skyline with private Michelin-trained chef.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">Khor Al Adaid Inland Sea Glam-Camp</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white">Desert Sanctuary</span>
                </div>
                <p className="text-xs text-white/60">UNESCO natural wonder where sand dunes plunge into turquoise ocean waters.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">Katara Cultural Village & MIA Gallery</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white">Private Curator</span>
                </div>
                <p className="text-xs text-white/60">After-hours museum access, oud perfumery masters, and VIP falconry experience.</p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onPlanTrip();
              }}
              className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors mt-2"
            >
              Request Itinerary
            </button>
          </div>
        );

      case 'Pricing':
      case 'Packages':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Luxury Itinerary Tiers</h3>
            <p className="text-sm text-white/70">
              Bespoke travel programs inclusive of 5-star palatial accommodations, VIP fast-track airport concierge, and private transport.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Signature Doha</div>
                  <div className="text-2xl font-bold mb-2">Bespoke</div>
                  <ul className="text-xs space-y-2 text-white/70 mb-4">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> 5-Star Hotel or Villa suite</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> Chauffeur-driven luxury fleet</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> VIP Souq & Katara tours</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onPlanTrip();
                  }}
                  className="w-full py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200"
                >
                  Inquire Now
                </button>
              </div>
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white mb-1 font-semibold">Sovereign Royal</div>
                  <div className="text-2xl font-bold mb-2">Ultra-VIP</div>
                  <ul className="text-xs space-y-2 text-white/80 mb-4">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> Private jet / tarmac fast-track</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> Superyacht charter & Inland Sea</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> 24/7 dedicated lifestyle concierge</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onPlanTrip();
                  }}
                  className="w-full py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200"
                >
                  Plan Sovereign Trip
                </button>
              </div>
            </div>
          </div>
        );

      case 'About':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Our Travel Agency</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              We specialize in curating high-touch, discreet luxury experiences in Doha and throughout the Arabian Peninsula. From private island escapes to bespoke desert odysseys, our mission is to deliver travel without limits.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-white mb-0.5">100%</div>
                <div className="text-xs text-white/60">Tailored Itineraries</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-white mb-0.5">24/7</div>
                <div className="text-xs text-white/60">On-Ground VIP Concierge</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold">{tab}</h3>
            <p className="text-sm text-white/70">
              Discover Doha luxury travel with seamless curation.
            </p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/20 rounded-2xl p-6 text-white shadow-2xl z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {renderContent()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
