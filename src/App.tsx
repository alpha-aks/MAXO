import React, { useState, useEffect, useRef, Suspense } from 'react';
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
import DomeGallery from './components/DomeGallery';
import Footer from './components/Footer';
import SharedHeader from './components/SharedHeader';



export function MaxoLanding() {
  const [isPreloading, setIsPreloading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  
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

  // Block scroll during preload
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPreloading]);

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
          LAYER 3: The "MAXO" Logo & Navbar (Shared Header)
      ----------------------------------------------------- */}
      <SharedHeader isMobile={isMobile} isPreloading={isPreloading} />

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
      {/* Background Image for Second Div */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/2nd div.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15, // Adjust opacity to make text readable
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AboutModern isMobile={isMobile} />
      </div>
    </div>

    {/* Third Section: Work Gallery */}
    <div style={{ position: 'sticky', top: 0, zIndex: 40, width: '100%' }}>
      <WorkGallery isMobile={isMobile} />
    </div>

    {/* Fourth Section: Dome Gallery */}
    <div style={{ height: '800px', width: '100%', position: 'sticky', top: 0, overflow: 'hidden', zIndex: 50, backgroundColor: '#1a1a1a' }}>
      <DomeGallery overlayBlurColor="#222222" />
    </div>

    {/* Fifth Section: Footer */}
    <Footer isMobile={isMobile} />

    </div>
  );
}

// Main App component with router
function AppRoutes() {
  // Helper wrapper to include SharedHeader on non-landing pages
  function PageWrapper({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
    
    useEffect(() => {
      const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);

    return (
      <>
        <SharedHeader isMobile={isMobile} />
        {children}
      </>
    );
  }

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
    return <OurWork />;
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
      <Routes>
        <Route path="/" element={<MaxoLanding />} />
        <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactWithNav /></PageWrapper>} />
        <Route path="/work" element={<PageWrapper><OurWorkWithNav /></PageWrapper>} />
        <Route path="/news" element={<PageWrapper><NewsWithNav /></PageWrapper>} />
        <Route path="/future" element={<PageWrapper><FutureWithNav /></PageWrapper>} />
        <Route path="/architect" element={<PageWrapper><ArchitectContact /></PageWrapper>} />
        <Route path="/projects/commercial-architecture" element={<PageWrapper><CommercialArchitecture /></PageWrapper>} />
        <Route path="/projects/residential-design" element={<PageWrapper><ResidentialDesign /></PageWrapper>} />
        <Route path="/projects/cultural-public" element={<PageWrapper><CulturalPublic /></PageWrapper>} />
        <Route path="/projects/hospitality" element={<PageWrapper><Hospitality /></PageWrapper>} />
        <Route path="/projects/urban-planning" element={<PageWrapper><UrbanPlanning /></PageWrapper>} />
        <Route path="/projects/educational-facilities" element={<PageWrapper><EducationalFacilities /></PageWrapper>} />
        <Route path="/projects/healthcare" element={<PageWrapper><Healthcare /></PageWrapper>} />
        <Route path="/projects/recreational-spaces" element={<PageWrapper><RecreationalSpaces /></PageWrapper>} />
        <Route path="/allproject" element={<PageWrapper><AllProject /></PageWrapper>} />
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

