import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';

export default function SharedHeader({ isMobile, isPreloading = false }: { isMobile: boolean, isPreloading?: boolean }) {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsMenuVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50 && !isMenuOpen) {
        setIsMenuVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsMenuVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  return (
    <>
      {/* Logo */}
      <div style={{ 
        position: 'fixed', 
        zIndex: 60, 
        pointerEvents: 'none',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', justifyContent: 'center'
      }}>
        <motion.div
          initial={false}
          animate={{
            top: isPreloading ? '50%' : (isMenuVisible ? '30px' : '-150px'),
            y: isPreloading ? '-50%' : '0%',
            width: isPreloading ? (isMobile ? '200px' : '400px') : '120px'
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', pointerEvents: 'auto', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src="/maxo logo.png" alt="MAXO" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </motion.div>
      </div>

      {/* Menu */}
      {!isPreloading && (
        <>
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '20px', 
              zIndex: 999,
            }}
            onMouseEnter={() => setIsMenuVisible(true)}
          />

          <motion.div
            animate={{ y: (isMenuVisible || isMenuOpen) ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              zIndex: 100,
              pointerEvents: 'none' 
            }}
          >
            <StaggeredMenu 
              items={menuItems} 
              socialItems={[
                { label: 'Instagram', link: 'https://instagram.com' },
                { label: 'Twitter', link: 'https://twitter.com' },
                { label: 'YouTube', link: 'https://youtube.com' }
              ]}
              position="left"
              colors={['#333', '#111', '#000']}
              menuButtonColor="black"
              openMenuButtonColor="white"
              accentColor="#888"
              onMenuOpen={() => setIsMenuOpen(true)}
              onMenuClose={() => setIsMenuOpen(false)}
            />
          </motion.div>
        </>
      )}
    </>
  );
}