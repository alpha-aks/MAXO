import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type MenuItem = {
  label: string;
  href: string;
};

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const menuItems: MenuItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Future Thinking', href: '/future' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 80,
            backgroundColor: '#000000',
            color: '#ffffff',
            overflow: 'hidden',
          }}
        >
          {/* Content Grid */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gridTemplateRows: 'auto 1fr auto',
              padding: isMobile ? '40px 24px' : '60px 80px',
              gap: isMobile ? '40px' : '0',
            }}
          >
            {/* Top Left: Logo */}
            <div style={{ gridColumn: '1', gridRow: '1' }}>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/');
                }}
                style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                MAXO
              </Link>
            </div>

            {/* Top Right: Contact Locations */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                gridColumn: isMobile ? '1' : '2',
                gridRow: isMobile ? 'auto' : '1',
                textAlign: isMobile ? 'left' : 'right',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', marginBottom: '12px', opacity: 0.6 }}>
                CONTACT
              </div>
              <div style={{ fontSize: '13px', lineHeight: 1.8, opacity: 0.8 }}>
                Dubai / Hong Kong / London / Mumbai / Nottinghamshire / Shanghai / Singapore
              </div>
            </motion.div>

            {/* Center Left: Main Menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                gridColumn: '1',
                gridRow: '2',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: isMobile ? '24px' : '32px',
                fontFamily: "'Playfair Display', 'Georgia', serif",
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: isMobile ? '32px' : '48px',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                    lineHeight: 1.2,
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            {/* Bottom Left: Socials & Language */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                gridColumn: '1',
                gridRow: '3',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                letterSpacing: '0.05em',
                opacity: 0.7,
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <span style={{ marginRight: '16px', cursor: 'pointer' }}>中文</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>Instagram</a>
                <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>Vimeo</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>LinkedIn</a>
              </div>
              <div style={{ fontSize: '10px', opacity: 0.5 }}>
                © All rights reserved. Cookies, privacy and terms of use.
              </div>
            </motion.div>

            {/* Bottom Right: Career & Marketing Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                gridColumn: isMobile ? '1' : '2',
                gridRow: isMobile ? 'auto' : '3',
                textAlign: isMobile ? 'left' : 'right',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                lineHeight: 2,
                opacity: 0.8,
              }}
            >
              <div><a href="/careers" style={{ color: '#ffffff', textDecoration: 'none' }}>Career opportunities</a></div>
              <div><a href="/careers" style={{ color: '#ffffff', textDecoration: 'none' }}>Current listings</a></div>
              <div><a href="mailto:marketing@maxo.com" style={{ color: '#ffffff', textDecoration: 'none' }}>Marketing and Press enquiries<br />(marketing@maxo.com)</a></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
