import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Search } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import StaggeredMenu from './components/StaggeredMenu';
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



export function MaxoLanding() {
  const [isPreloading, setIsPreloading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

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
        <StaggeredMenu 
          items={menuItems} 
          position="left"
          colors={['#333', '#111', '#000']}
          menuButtonColor="white"
          openMenuButtonColor="white"
          accentColor="#888"
        />
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

    {/* Fourth Section: News Journal */}
    <NewsSection isMobile={isMobile} />

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

