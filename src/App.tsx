import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, Search } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import MenuOverlay from './components/MenuOverlay';
import DarkLuxuryMenu from './components/DarkLuxuryMenu';
import ArchitectContact from './components/ArchitectContact';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OurWork from './components/OurWork';
import News from './components/News';
import FutureThinking from './components/FutureThinking';
import AboutModern from './components/AboutModern';
import WorkGallery from './components/WorkGallery';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

// Frame Animation Component
function FrameAnimation({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  // Map scroll progress to frame number (0-79 for 80 frames) - slowed down
  // Using a range that stretches the animation across more scroll distance
  const frameNumber = useTransform(scrollYProgress, [0, 1], [0, 79]);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    // Add throttling to prevent too frequent updates
    let timeout: ReturnType<typeof setTimeout>;
    const unsubscribe = frameNumber.onChange((value) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCurrentFrame(Math.min(Math.floor(value), 79));
      }, 16); // ~60fps throttle
    });
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [frameNumber]);

  // Generate frame filename (001-080)
  const frameFileName = String(currentFrame + 1).padStart(3, '0');
  const imageSrc = `/ezgif-8fe967c091b2ac91-jpg/ezgif-frame-${frameFileName}.jpg`;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
      viewport={{ once: false, amount: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        order: isMobile ? 1 : 0
      }}
    >
      <img
        src={imageSrc}
        alt={`Frame ${currentFrame + 1}`}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: isMobile ? '400px' : '650px',
          borderRadius: '12px',
          objectFit: 'contain',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
      />
    </motion.div>
  );
}

export function MaxoLanding() {
  const [isPreloading, setIsPreloading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Trigger transition at 8s and SLOW the video instead of freezing
  useEffect(() => {
    const toNavbar = setTimeout(() => {
      setIsPreloading(false);
    }, 5000);

    return () => {
      clearTimeout(toNavbar);
    };
  }, []);

  // Detect mobile to switch to side-drawer behavior
  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: 'black', color: 'white', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      
      {/* Main Landing Container - Full Screen */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      {/* ----------------------------------------------------
          LAYER 1: The Video
          Use INLINE STYLES to force object-cover
      ----------------------------------------------------- */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        src="/MAXO_1.mp4" // Vercel/Vite public assets must use root path
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
                fontSize: isMobile ? '4.5rem' : '9rem', // smaller on phones
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
          padding: isMobile ? '15px 20px' : '20px 40px'
        }}>
          {/* Menu (left) - clickable */}
          <button
            aria-label="Open menu"
            onClick={() => setIsMenuOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: isMobile ? '6px 8px' : '6px 10px',
              borderRadius: 12,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))',
              border: '1px solid rgba(255,255,255,0.22)',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.12))';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))';
            }}
          >
            <Menu size={isMobile ? 20 : 18} />
            {/* Hide Menu text on mobile to keep logo centered */}
            {!isMobile && <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Menu</span>}
          </button>

          {/* Logo (center absolute) */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <motion.h1
              layoutId="brand-logo"
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontSize: isMobile ? '1.2rem' : '1.5rem',
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

          {/* Search (right) */}
          <div>
            <Search size={isMobile ? 20 : 24} />
          </div>
        </nav>
      )}

      {/* Full-screen white strip overlay menu */}
      <AnimatePresence>
        {!isPreloading && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 80, overflow: 'hidden' }}
          >
            {/* Strips */}
            {Array.from({ length: isMobile ? 5 : 7 }).map((_, i, arr) => {
              const h = 100 / arr.length;
              const delay = 0.05 * i;
              return (
                <motion.div
                  key={i}
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${i * h}%`,
                    height: `${h}%`,
                    background: '#ffffff',
                    boxShadow: '0 -8px 24px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.12)',
                    transform: 'translateZ(0)',
                  }}
                />
              );
            })}

            {/* Content layer */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', inset: 0, zIndex: 81,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                padding: isMobile ? '24px 20px' : '80px 64px',
                gap: isMobile ? 24 : 40,
              }}
            >
              {/* Left: Menu items */}
              <div style={{ flex: isMobile ? 'none' : '0 0 45%', display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 18 }}>
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Our Work', href: '/work' },
                  { label: 'Future Thinking', href: '/future' },
                  { label: 'News', href: '/news' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Architect', href: '/architect' },
                ].map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.06, duration: 0.3 }}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: '#111',
                      textDecoration: 'none',
                      fontSize: isMobile ? 24 : 42,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Right column removed: photo tiles intentionally removed */}

              </div>

            {/* Click anywhere to close */}
            <div
              onClick={() => setIsMenuOpen(false)}
              style={{ position: 'absolute', inset: 0, zIndex: 79 }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Toggle Button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={24} />
      </motion.button>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Dark Luxury Menu - New Strip Layout */}
      <DarkLuxuryMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={(path) => navigate(path)} />

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
        </motion.div>
      )}
    </div>

    {/* Second Section: Modern About Section */}
    <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: 'white', width: '100%' }}>
      <AboutModern isMobile={isMobile} />
    </div>

    {/* Third Section: Work Gallery */}
    <WorkGallery />

    {/* Fourth Section: News Journal */}
    <NewsSection />

    {/* Fifth Section: Footer */}
    <Footer />

    </div>
  );
}

// Main App component with router
function AppRoutes() {
  // Wrapper components that provide a `navigateTo` helper via `useNavigate`.
  function ContactWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <ContactUs navigateTo={navigateTo} />;
  }

  function OurWorkWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <OurWork navigateTo={navigateTo} />;
  }

  function NewsWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <News navigateTo={navigateTo} />;
  }

  function FutureWithNav() {
    const nav = useNavigate();
    const navigateTo = (page: string) => {
      switch (page) {
        case 'about': nav('/about'); break;
        case 'work': nav('/work'); break;
        case 'future': nav('/future'); break;
        case 'news': nav('/news'); break;
        case 'contact': nav('/contact'); break;
        default: nav('/');
      }
    };
    return <FutureThinking navigateTo={navigateTo} />;
  }

  return (
    <Routes>
      <Route path="/" element={<MaxoLanding />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactWithNav />} />
      <Route path="/work" element={<OurWorkWithNav />} />
      <Route path="/news" element={<NewsWithNav />} />
      <Route path="/future" element={<FutureWithNav />} />
      <Route path="/architect" element={<ArchitectContact />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

