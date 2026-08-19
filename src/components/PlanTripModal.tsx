import React, { useState } from 'react';
import { X, Calendar, Compass, CheckCircle2, ArrowRight, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelDates: 'Oct 2026',
    travelers: '2 Adults',
    interests: ['Luxury Yacht Charter', 'Desert Safari & Inland Sea'],
    customNotes: '',
  });

  const experienceOptions = [
    'Private Yacht Charter (The Pearl-Qatar)',
    'Desert Safari & Inland Sea Luxury Camp',
    'VIP Souq Waqif Heritage & Falconry',
    'Katara Cultural Village & Private Dining',
    'Museum of Islamic Art Curated Tour',
    'Helicopter Skyline & Architectural Tour',
  ];

  const toggleInterest = (exp: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(exp);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((item) => item !== exp)
          : [...prev.interests, exp],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      travelDates: 'Oct 2026',
      travelers: '2 Adults',
      interests: ['Luxury Yacht Charter', 'Desert Safari & Inland Sea'],
      customNotes: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              id="close-plan-trip-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-black stroke-[2.2]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Itinerary Request Received</h3>
                <p className="text-white/70 text-sm max-w-sm mx-auto mb-6">
                  Thank you, <strong className="text-white">{formData.name || 'Traveler'}</strong>. Our Doha luxury concierge has received your request for <strong className="text-white">{formData.travelDates}</strong>. We are curating a bespoke itinerary tailored to your selected experiences.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-white text-black font-semibold px-6 py-2.5 rounded-full hover:bg-neutral-200 transition-colors text-sm"
                >
                  Close & Explore
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                    Bespoke Doha Itinerary
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-1">Plan Your Trip to Doha</h2>
                <p className="text-sm text-white/70 mb-6">
                  Experience seamless Arabian hospitality, Michelin-caliber gastronomy, and private excursions crafted without limits.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Sophia Laurent"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="sophia@luxurytravel.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Travel Window
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Nov 2026"
                          value={formData.travelDates}
                          onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Travel Party
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full bg-[#111111] border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50"
                      >
                        <option value="1 Solo Traveler">1 Solo Traveler</option>
                        <option value="2 Adults">2 Adults (Couple)</option>
                        <option value="Family (3-5)">Family (3-5 Guests)</option>
                        <option value="Private VIP Delegation">VIP Group / Delegation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-2">
                      Selected Curated Experiences
                    </label>
                    <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {experienceOptions.map((exp) => {
                        const isSelected = formData.interests.includes(exp);
                        return (
                          <button
                            type="button"
                            key={exp}
                            onClick={() => toggleInterest(exp)}
                            className={`text-left text-xs p-2 rounded-lg border transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-white text-black border-white font-medium'
                                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <span className="truncate">{exp}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-plan-trip-form"
                      className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-sm cursor-pointer shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Request Bespoke Itinerary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
