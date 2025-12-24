import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Search } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import BenoyMenu from './components/BenoyMenu';
import MobileMenu from './components/MobileMenu';
import finalLogo from './assets/finalemaxologo.png';
import ArchitectContact from './components/ArchitectContact';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OurWork from './components/OurWork';
import News from './components/News';
import FutureThinking from './components/FutureThinking';
import AboutModern from './components/AboutModern';
import WorkGallery from './components/WorkGallery';
import DomeGallery from './components/DomeGallery';
import Footer from './components/Footer';



export function MaxoLanding() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  // const location = useLocation();
  // const navigate = useNavigate();

  // Trigger transition when assets are loaded
  useEffect(() => {
    // Pause video initially to "freeze" until loaded
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // 1. Wait for Video to be ready
    const videoPromise = new Promise((resolve) => {
      const video = videoRef.current;
      if (!video) {
        resolve(true);
        return;
      }
      if (video.readyState >= 3) {
        resolve(true);
      } else {
        const handleCanPlay = () => resolve(true);
        video.addEventListener('canplaythrough', handleCanPlay, { once: true });
        video.addEventListener('error', () => resolve(true), { once: true });
      }
    });

    // 2. Wait for Window load (images, scripts, etc.)
    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', () => resolve(true), { once: true });
      }
    });

    // Wait for assets to load
    Promise.all([videoPromise, windowLoadPromise]).then(() => {
      // Once loaded, play video and start the 5s timer (configured with video)
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Handle autoplay block if necessary
        });
      }
      
      setTimeout(() => {
        setIsPreloading(false);
      }, 5000);
    });

  }, []);

  // Detect mobile to switch to side-drawer behavior
  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Prevent page scrolling while preloader/video is active
  useEffect(() => {
    const prevent = (e: Event) => {
      // allow pointer events inside overlays but block default scrolling
      e.preventDefault();
    };

    if (isPreloading) {
      // hide overflow on document and body
      try {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } catch (err) {
        // ignore in SSR or restricted environments
      }
      document.addEventListener('touchmove', prevent, { passive: false });
      document.addEventListener('wheel', prevent, { passive: false });
    } else {
      try {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      } catch (err) {}
      document.removeEventListener('touchmove', prevent as EventListener);
      document.removeEventListener('wheel', prevent as EventListener);
    }

    return () => {
      try {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      } catch (err) {}
      document.removeEventListener('touchmove', prevent as EventListener);
      document.removeEventListener('wheel', prevent as EventListener);
    };
  }, [isPreloading]);

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
        muted
        playsInline
        src={isMobile ? "https://alphas.cdn.prismic.io/alphas/aTxyfXNYClf9oINE_Sky_to_Ground_Video_Generation.mp4" : "/MAXO_1.mp4"}
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
      {/* Black overlay that animates up with logo */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 49 // just below logo
            }}
          />
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          LAYER 3: The "MAXO" Logo (Shared Layout)
      ----------------------------------------------------- */}
      
      {/* Shared Logo Container for smooth move-up effect */}
      <motion.div
        layout
        style={{
          position: isPreloading ? 'absolute' : 'fixed',
          top: isPreloading ? 0 : 0,
          left: isPreloading ? 0 : (isMobile ? '16px' : '40px'),
          right: isPreloading ? 0 : 0,
          bottom: isPreloading ? 0 : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isPreloading ? 'center' : (isMobile ? 'flex-start' : 'center'),
          zIndex: 50,
          pointerEvents: 'none',
          height: isPreloading ? '100vh' : 'auto',
          padding: isPreloading ? 0 : (isMobile ? '20px 16px' : '30px 60px'),
        }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={finalLogo}
          alt="MAXO"
          layoutId="brand-logo"
          style={{
            width: isPreloading ? (isMobile ? '220px' : '340px') : (isMobile ? '140px' : '140px'),
            height: 'auto',
          }}
        />
      </motion.div>

      {/* PHASE B: Navbar with Centered Logo and Left Shutter */}
      {!isPreloading && (
        <>
          {/* Left shutter on desktop; right hamburger on mobile (centralized in pages) */}
          {!isMobile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: '40px',
                backgroundColor: '#000',
                zIndex: 45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <button
                onClick={() => setIsMenuOpen(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                className="hover:opacity-70 transition-opacity"
              >
                <span style={{ width: '2px', height: '20px', backgroundColor: 'white' }} />
                <span style={{ width: '2px', height: '20px', backgroundColor: 'white' }} />
              </button>
            </motion.div>
            ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                backgroundColor: 'transparent',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto',
              }}
            >
              <button
                onClick={() => setIsMenuOpen((s) => !s)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
                className="hover:opacity-70 transition-opacity"
              >
                {isMenuOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <>
                    <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
                    <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
                    <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Navbar Container (no logo, logo is now shared above) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              position: 'fixed',
              top: 0,
              left: isMobile ? '30px' : '40px',
              right: 0,
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '20px 24px' : '30px 60px',
            }}
          >
            {/* Center: MAXO Logo is now handled by shared container above */}
          </motion.div>

          {/* Benoy Menu Overlay */}
          <BenoyMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
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
        </motion.div>
      )}
    </div>

    {/* Second Section: Modern About Section */}
    <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: 'white', width: '100%' }}>
      <AboutModern isMobile={isMobile} />
    </div>

    {/* Third Section: Work Gallery */}
    <WorkGallery isMobile={isMobile} />

    {/* Fourth Section: Dome Gallery */}
    <div style={{ height: '800px', width: '100%', position: 'relative', overflow: 'hidden', zIndex: 50, backgroundColor: 'black' }}>
      <DomeGallery />
    </div>

    {/* Fifth Section: Footer */}
    <Footer isMobile={isMobile} />

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

  // Lazy load project pages
  const CommercialArchitecture = React.lazy(() => import('./components/projects/CommercialArchitecture'));
  const ResidentialDesign = React.lazy(() => import('./components/projects/ResidentialDesign'));
  const CulturalPublic = React.lazy(() => import('./components/projects/CulturalPublic'));
  const Hospitality = React.lazy(() => import('./components/projects/Hospitality'));
  const UrbanPlanning = React.lazy(() => import('./components/projects/UrbanPlanning'));
  const EducationalFacilities = React.lazy(() => import('./components/projects/EducationalFacilities'));
  const Healthcare = React.lazy(() => import('./components/projects/Healthcare'));
  const RecreationalSpaces = React.lazy(() => import('./components/projects/RecreationalSpaces'));
  const AllProject = React.lazy(() => import('./components/projects/allproject'));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Global header shown on all pages except landing (/) */}
      <HeaderWrapper />

      <Routes>
        <Route path="/" element={<MaxoLanding />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactWithNav />} />
        <Route path="/work" element={<OurWorkWithNav />} />
        <Route path="/news" element={<NewsWithNav />} />
        <Route path="/future" element={<FutureWithNav />} />
        <Route path="/architect" element={<ArchitectContact />} />
        <Route path="/projects/commercial-architecture" element={<CommercialArchitecture />} />
        <Route path="/projects/residential-design" element={<ResidentialDesign />} />
        <Route path="/projects/cultural-public" element={<CulturalPublic />} />
        <Route path="/projects/hospitality" element={<Hospitality />} />
        <Route path="/projects/urban-planning" element={<UrbanPlanning />} />
        <Route path="/projects/educational-facilities" element={<EducationalFacilities />} />
        <Route path="/projects/healthcare" element={<Healthcare />} />
        <Route path="/projects/recreational-spaces" element={<RecreationalSpaces />} />
        <Route path="/allproject" element={<AllProject />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

// HeaderWrapper placed at module bottom to keep AppRoutes focused
function HeaderWrapper() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Don't show on landing page since MaxoLanding has its own header/hamburger
  if (location.pathname === '/') return null;

  return (
    <>
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'fixed', top: isMobile ? '16px' : '20px', left: isMobile ? '16px' : '40px', zIndex: 60 }}
        >
          <a href="/" style={{ display: 'block' }}>
            <motion.img src={finalLogo} alt="MAXO" layoutId="brand-logo" style={{ width: isMobile ? '140px' : '140px', height: 'auto' }} />
          </a>
        </motion.div>
      )}

      {/* Left shutter button for desktop pages */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: '40px',
            backgroundColor: '#000',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '100%'
            }}
          >
            <span style={{ width: '2px', height: '20px', backgroundColor: 'white' }} />
            <span style={{ width: '2px', height: '20px', backgroundColor: 'white' }} />
          </button>
        </motion.div>
      )}

      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 999 }}
        >
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            {isMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <>
                <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
                <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
                <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
              </>
            )}
          </button>
        </motion.div>
      )}

      {isMobile ? (
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      ) : (
        <BenoyMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}

