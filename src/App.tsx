/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Asterisk, Heart, Sparkles } from 'lucide-react';

import Tabs from './components/Tabs';
import LinksTab from './components/LinksTab';
import MentorshipTab from './components/MentorshipTab';
import ApplicationsAdmin from './components/ApplicationsAdmin';
import ShareModal from './components/ShareModal';

import { BIO_DATA } from './data';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('links');
  const [adminRefresh, setAdminRefresh] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 flex flex-col items-center justify-center bg-[#f2d5d8] relative overflow-x-hidden">
      {/* Decorative ambient background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f2d5d8]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#ccafb1]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main interactive mobile mockup frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[430px] bg-[#f2eaea] rounded-[40px] shadow-2xl border border-white/20 overflow-hidden flex flex-col relative"
        id="applet-phone-mockup"
      >
        {/* Banner Area (Pastel Pink) */}
        <div className="bg-[#f2d5d8] h-36 w-full relative transition-colors duration-300">
          {/* Header Action Row */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
            {/* Left Button: Asterisk/Quote */}
            <motion.button
              id="btn-asterisk"
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsQuoteOpen(true)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#3a3232] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <Asterisk className="w-5 h-5" />
            </motion.button>

            {/* Right Button: Share */}
            <motion.button
              id="btn-share"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsShareOpen(true)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#3a3232] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Profile Avatar & Info Section */}
        <div className="px-6 pb-6 pt-1 flex flex-col items-center text-center relative z-10 -mt-12">
          {/* Avatar frame */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
              className="w-24 h-24 rounded-full overflow-hidden shadow-md bg-white"
            >
              <img
                src={BIO_DATA.avatar}
                alt={BIO_DATA.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Tiny verification sparkle */}
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#ccafb1] rounded-full border-2 border-[#f2eaea] flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          {/* User Profile Title */}
          <h1 className="mt-3 text-lg font-bold text-[#3a3232] font-display tracking-widest uppercase">
            {BIO_DATA.name}
          </h1>

          {/* Custom Phrase */}
          <p className="mt-1 text-xs font-bold text-[#8a7373] tracking-wide uppercase">
            Ganhe Dinheiro com Meus Links
          </p>


        </div>

        {/* Tabs navigation */}
        <div className="px-6">
          <Tabs activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Central Content Area */}
        <div className="flex-1 px-6 pb-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="min-h-[320px]">
              <AnimatePresence mode="wait">
                {activeTab === 'links' ? (
                  <motion.div
                    key="links"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LinksTab onNotify={showToast} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mentorship"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MentorshipTab
                      onNotify={showToast}
                      onApplicationSuccess={() => setAdminRefresh((prev) => prev + 1)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer of the card */}
          <div className="mt-12 text-center text-[10px] text-[#3a3232]/40 space-y-1">
          </div>
        </div>
      </motion.div>

      {/* Applications Admin View (Visible outside/below the mobile mockup) */}
      <ApplicationsAdmin onNotify={showToast} refreshTrigger={adminRefresh} />

      {/* Quote/Asterisk Modal */}
      <AnimatePresence>
        {isQuoteOpen && (
          <motion.div
            id="quote-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQuoteOpen(false)}
            className="fixed inset-0 bg-[#3a3232]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              id="quote-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl relative border border-[#3a3232]/5"
            >
              <div className="w-12 h-12 bg-[#f2d5d8] text-[#ccafb1] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 fill-current text-[#3a3232]" />
              </div>
              <h3 className="font-bold text-sm text-[#3a3232] tracking-wider uppercase font-display">Mensagem Diária</h3>
              <p className="text-sm text-[#3a3232]/70 italic mt-3 leading-relaxed font-light">
                "O progresso acontece fora da sua zona de conforto. Seja mais forte que as suas desculpas e comece hoje mesmo!"
              </p>
              <button
                id="btn-close-quote"
                onClick={() => setIsQuoteOpen(false)}
                className="mt-5 w-full py-2 bg-[#3a3232] text-white rounded-xl text-xs font-semibold hover:bg-[#3a3232]/90 transition-colors cursor-pointer"
              >
                Vamos pra cima! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal popup */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        onNotify={showToast}
      />

      {/* Global custom Toast notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3a3232] text-white px-5 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 text-sm max-w-sm w-[90%] font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-[#f2d5d8] animate-pulse" />
            <span className="flex-1 text-center sm:text-left">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
