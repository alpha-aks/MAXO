import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (typeof document === 'undefined') return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          className="fixed left-0 top-0 z-[9999] bg-black text-white"
          style={{ width: '100vw', height: '100dvh', touchAction: 'none', right: 0, bottom: 0, transform: 'none' }}
          onClick={onClose}
        >
          <div className="w-full h-full flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6">
              <div className="text-white font-sans text-lg tracking-wider">MAXO</div>
              <button onClick={onClose} aria-label="Close menu" className="text-white p-2 rounded hover:opacity-80 focus:outline-none">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="flex-0 px-6" style={{ paddingTop: 24, paddingBottom: 24 }}>
              <ul className="flex flex-col gap-4 items-start">
                <li><a onClick={onClose} className="block text-5xl font-serif leading-tight">About</a></li>
                <li><a onClick={onClose} className="block text-5xl font-serif leading-tight">Studio life</a></li>
                <li><a onClick={onClose} className="block text-5xl font-serif leading-tight">Our work</a></li>
                <li><a onClick={onClose} className="block text-5xl font-serif leading-tight">Future Thinking</a></li>
                <li><a onClick={onClose} className="block text-5xl font-serif leading-tight">News</a></li>
                <li><a onClick={onClose} className="block text-5xl font-serif leading-tight">Contact</a></li>
              </ul>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm font-sans opacity-90">中文</div>
                <div className="h-[1px] bg-white/20 mt-2 w-12" />
              </div>

              <div className="flex flex-col gap-2 mb-4 text-sm font-sans">
                <button className="text-white/90 text-left">Twitter</button>
                <button className="text-white/90 text-left">Instagram</button>
                <button className="text-white/90 text-left">Vimeo</button>
                <button className="text-white/90 text-left">LinkedIn</button>
              </div>

              <div className="text-xs text-white/70 mb-4">All rights reserved. Cookies, privacy...</div>

              <div className="text-sm font-sans">
                <div className="font-semibold">Career opportunities</div>
                <div className="text-white/90">Current listings</div>
                <div className="mt-2 text-white/90">Marketing and Press enquiries</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
