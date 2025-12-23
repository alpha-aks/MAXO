import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import finalLogo from '../assets/finalemaxologo.png';

interface BenoyMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BenoyMenu({ isOpen, onClose }: BenoyMenuProps) {
  const menuItems = [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Future Thinking', href: '/future' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { label: 'Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Vimeo', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ];

  const locations = 'Dubai / Hong Kong / London / Mumbai / Nottinghamshire / Shanghai / Singapore';

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              left: '40px',
              top: 0,
              bottom: 0,
              width: 'calc(75% - 40px)',
              zIndex: 101,
              backgroundColor: '#000',
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
            }}
          >
          {/* Main Container with Grid Layout */}
          <div style={{ position: 'relative', minHeight: '100%', width: '100%', display: 'flex' }}>
            {/* Left Content Area - Full Height Grid */}
            <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', padding: '50px 48px 30px 48px' }}>
              {/* Logo - Top Left */}
              <div style={{ marginBottom: '40px' }}>
                <img
                  src={finalLogo}
                  alt="MAXO Logo"
                  style={{ width: '160px', height: 'auto', display: 'block', marginBottom: '60px' }}
                />
              </div>

              {/* Main Menu - Center Left */}
              <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px', maxWidth: '500px', marginBottom: '40px' }}>
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={onClose}
                    style={{
                      display: 'block',
                      fontSize: '42px',
                      fontWeight: 300,
                      color: '#fff',
                      textDecoration: 'none',
                      fontFamily: "'Playfair Display', 'Times New Roman', serif",
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom Left - Socials & Language */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Language */}
                <div style={{ fontSize: '12px', fontWeight: 300, letterSpacing: '0.05em', fontFamily: 'Inter, Arial, sans-serif' }}>
                  <a href="#" style={{ color: '#fff', textDecoration: 'none', transition: 'opacity 0.3s' }}
                     onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                     onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                    中文
                  </a>
                </div>

                {/* Social Links */}
                <div style={{ display: 'flex', gap: '24px', fontSize: '12px', fontWeight: 300, letterSpacing: '0.05em', fontFamily: 'Inter, Arial, sans-serif' }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      style={{ color: '#fff', textDecoration: 'none', transition: 'opacity 0.3s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>

                {/* Copyright */}
                <div style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.05em', opacity: 0.6, fontFamily: 'Inter, Arial, sans-serif' }}>
                  © All rights reserved. Cookies, privacy and terms of use.
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div style={{ width: '33.333%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '50px 48px 30px 48px' }}>
              {/* Top Right - Contact Locations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, Arial, sans-serif' }}>
                  Contact
                </h3>
                <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: '1.8', opacity: 0.8, fontFamily: 'Inter, Arial, sans-serif' }}>
                  {locations}
                </p>
              </div>

              {/* Bottom Right - Terms, Privacy & Marketing Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', fontWeight: 300, fontFamily: 'Inter, Arial, sans-serif' }}>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', transition: 'opacity 0.3s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                   onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Terms and Conditions
                </a>
                <a href="#" style={{ color: '#fff', textDecoration: 'none', transition: 'opacity 0.3s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                   onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Privacy Policy
                </a>
                <a href="mailto:marketing@benoy.com" style={{ color: '#fff', textDecoration: 'none', transition: 'opacity 0.3s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                   onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Marketing and Press enquiries
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
