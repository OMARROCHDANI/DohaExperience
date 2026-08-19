import React, { useState } from 'react';
import { X, Send, Bot, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user'; text: string }>>([
    {
      role: 'assistant',
      text: 'Marhaban! I am your Doha Luxury Travel Concierge. How may I assist you with private aviation, bespoke desert glamping, superyacht charters around The Pearl, or curated cultural access in Qatar?',
    },
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'Best 5-star private suites in Doha',
    'Desert safari & Inland Sea luxury camp',
    'Private yacht charter in The Pearl-Qatar',
    'Curated cultural tour at Katara & MIA',
  ];

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg = { role: 'user' as const, text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let reply = 'Doha offers an unmatched blend of ultra-modern luxury, authentic Arabian hospitality, and serene desert landscapes. We can curate a tailored itinerary with VIP fast-track airport concierge, private chauffeurs, and exclusive reservations.';
      const lower = messageText.toLowerCase();

      if (lower.includes('suite') || lower.includes('hotel') || lower.includes('stay')) {
        reply = 'We recommend the private villas at Katara Hills, the presidential suites at Mandarin Oriental Msheireb Downtown, or the royal overwater villas at Banana Island Resort by Anantara.';
      } else if (lower.includes('desert') || lower.includes('safari') || lower.includes('inland sea')) {
        reply = 'The Khor Al Adaid (Inland Sea) excursion is UNESCO-recognized, where golden dunes meet the turquoise sea. We arrange luxury 4x4 dune drives, falconry demonstrations, private air-conditioned Bedouin tents, and stargazing banquets.';
      } else if (lower.includes('yacht') || lower.includes('pearl')) {
        reply = 'We provide private 70ft to 120ft yacht charters departing from Porto Arabia at The Pearl, featuring onboard private chefs, sunset skyline cruises by West Bay, and water sports.';
      } else if (lower.includes('cultural') || lower.includes('katara') || lower.includes('mia') || lower.includes('museum')) {
        reply = 'We arrange private curator-led tours through the I.M. Pei-designed Museum of Islamic Art, private fragrance blending workshops in Souq Waqif, and VIP gallery viewings at Katara Cultural Village.';
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-xl bg-[#0d0d0d] border border-white/20 rounded-2xl flex flex-col h-[560px] text-white shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Doha Luxury Concierge</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span>VIP Travel Assistant Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white text-black font-medium rounded-tr-none'
                        : 'bg-white/10 border border-white/15 text-white/90 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="pt-2">
                  <div className="text-[11px] text-white/50 mb-2 font-medium uppercase tracking-wider">
                    Recommended queries:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-2.5 rounded-xl text-white/80 hover:text-white transition-all flex items-center justify-between"
                      >
                        <span className="truncate">{prompt}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Input */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-black">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about private itineraries, hotels, desert camps..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 bg-white text-black rounded-xl hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
