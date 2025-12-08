import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search } from 'lucide-react';
import ArchitectContact from './components/ArchitectContact';

export function MaxoLanding() {
  const [isPreloading, setIsPreloading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Trigger transition at 8s and SLOW the video instead of freezing
  useEffect(() => {
    const toNavbar = setTimeout(() => {
      setIsPreloading(false);
    }, 5000);

    return () => {
      clearTimeout(toNavbar);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* ----------------------------------------------------
          LAYER 1: The Video
          Use INLINE STYLES to force object-cover
      ----------------------------------------------------- */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        src="public/MAXO_1.mp4" // Ensure this path is correct
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // This is what removes black bars
          zIndex: 0
        }}
      />

      {/* Persistent dark overlay above video for contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* ----------------------------------------------------
          LAYER 2: Dark Overlay
      ----------------------------------------------------- */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%' }} // Slides UP
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 40
            }}
          />
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          LAYER 3: The "MAXO" Text (Shared Layout)
      ----------------------------------------------------- */}
      
      {/* PHASE A: Preloader (Centered) */}
      <AnimatePresence>
        {isPreloading && (
          <div style={{ 
            position: 'absolute', 
            inset: 0 as any, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 50,
            pointerEvents: 'none'
          }}>
            <motion.h1
              layoutId="brand-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} // Let layoutId handle movement, but fade out container
              transition={{ duration: 1 }}
              style={{
                fontSize: '9rem', // Forces huge text
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.05em',
                margin: 0,
                color: 'white'
              }}
            >
              MAXO
            </motion.h1>
          </div>
        )}
      </AnimatePresence>

      {/* PHASE B: Navbar (Top Center) */}
      {!isPreloading && (
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px'
        }}>
          {/* Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', mixBlendMode: 'difference' }}>
            <Menu size={24} />
            <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Menu</span>
          </div>

          {/* Logo (Centered in Nav) */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <motion.h1
              layoutId="brand-logo"
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontSize: '1.5rem', // Smaller size for navbar
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0,
                color: 'white'
              }}
            >
              MAXO
            </motion.h1>
          </div>

          {/* Search */}
          <div style={{ mixBlendMode: 'difference' }}>
            <Search size={24} />
          </div>
        </nav>
      )}

      {/* ----------------------------------------------------
          LAYER 4: Main Content
      ----------------------------------------------------- */}
      {!isPreloading && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            position: 'relative',
            zIndex: 20,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '80px',
            paddingLeft: '40px'
          }}
        >
          <h2 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.1, margin: 0 }}>
            We Create <br />
            <span style={{ fontWeight: 'bold' }}>Appealing Design.</span>
          </h2>
        </motion.div>
      )}
    </div>
  );
}

// Lightweight path-based switch without adding a router
export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/architect') {
    return <ArchitectContact />;
  }
  return <MaxoLanding />;
}

