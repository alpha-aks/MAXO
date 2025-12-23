import { useState, useEffect } from 'react';
import finalLogo from '../assets/finalemaxologo.png';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Globe, Cpu, Leaf, Users } from 'lucide-react';
import Footer from './Footer';
import BenoyMenu from './BenoyMenu';

export default function FutureThinking({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  
  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const innovations = [
    {
      icon: Cpu,
      title: 'AI-Powered Design',
      description: 'Integrating artificial intelligence to optimize space planning, energy efficiency, and user experience in real-time.',
      timeline: 'Next 2-3 years'
    },
    {
      icon: Leaf,
      title: 'Sustainable Materials',
      description: 'Pioneering the use of bio-based and recycled materials that reduce environmental impact while maintaining aesthetic appeal.',
      timeline: 'Already implementing'
    },
    {
      icon: Globe,
      title: 'Virtual Reality Design',
      description: 'Immersive VR experiences that allow clients to walk through and modify designs before construction begins.',
      timeline: 'Current technology'
    },
    {
      icon: Zap,
      title: 'Smart Building Integration',
      description: 'Seamless integration of IoT devices and smart systems that learn and adapt to occupant behavior patterns.',
      timeline: 'Expanding rapidly'
    },
    {
      icon: Users,
      title: 'Collaborative Spaces',
      description: 'Designing flexible environments that adapt to changing work patterns and promote human connection.',
      timeline: 'Post-pandemic evolution'
    },
    {
      icon: Lightbulb,
      title: 'Biophilic Integration',
      description: 'Advanced integration of natural elements to improve mental health and productivity in built environments.',
      timeline: 'Growing trend'
    }
  ];

  const insights = [
    {
      title: 'The Future of Work Environments',
      date: 'November 2024',
      content: 'As remote work becomes permanent for many, office spaces are evolving into collaboration hubs rather than individual workstations. We\'re designing spaces that prioritize flexibility, wellness, and community building.',
      author: 'Sarah Johnson, Creative Director'
    },
    {
      title: 'Climate-Responsive Architecture',
      date: 'October 2024',
      content: 'Buildings of the future will actively respond to environmental conditions. From self-cooling facades to rain-harvesting systems, architecture is becoming a living, breathing organism.',
      author: 'Michael Chen, Lead Architect'
    },
    {
      title: 'Digital-Physical Integration',
      date: 'September 2024',
      content: 'The boundary between digital and physical spaces is dissolving. We\'re creating environments where digital interfaces seamlessly blend with physical architecture to enhance user experience.',
      author: 'Emily Rodriguez, Interior Designer'
    }
  ];

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      {/* Left shutter on desktop; right hamburger on mobile */}
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
            right: 0,
            top: 0,
            bottom: 0,
            width: '48px',
            backgroundColor: 'transparent',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
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
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="hover:opacity-70 transition-opacity"
          >
            <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
            <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
            <span style={{ width: '18px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
          </button>
        </motion.div>
      )}

      {/* Navbar with MAXO Logo */}
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
        <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <motion.img
            src={finalLogo}
            alt="MAXO"
            layoutId="brand-logo"
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              width: isMobile ? '60px' : '90px',
              height: 'auto',
            }}
          />
        </a>
      </motion.div>

      <BenoyMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />



      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          padding: '120px 40px 80px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(245,245,245,0.9) 0%, rgba(230,230,230,0.9) 100%)'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: '4rem',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 30px 0'
          }}
        >
          Future <span style={{ fontWeight: 'bold' }}>Thinking</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: '1.2rem',
            color: 'rgba(0, 0, 0, 0.8)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Exploring emerging trends, innovative technologies, and visionary concepts 
          that will shape the future of design and architecture.
        </motion.p>
      </motion.section>

      {/* Innovation Areas */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            textAlign: 'center',
            margin: '0 0 60px 0'
          }}
        >
          Innovation <span style={{ fontWeight: 'bold' }}>Areas</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {innovations.map((innovation, index) => {
            const IconComponent = innovation.icon;
            return (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                style={{
                  padding: '30px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <IconComponent size={32} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    margin: 0
                  }}>
                    {innovation.title}
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0'
                }}>
                  {innovation.description}
                </p>
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  color: 'rgba(0, 0, 0, 0.9)',
                  display: 'inline-block'
                }}>
                  {innovation.timeline}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Future Vision Statement */}
      <section style={{ 
        padding: '80px 40px', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              margin: '0 0 40px 0'
            }}
          >
            Our <span style={{ fontWeight: 'bold' }}>Vision</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{
              fontSize: '1.3rem',
              lineHeight: 1.7,
              color: 'rgba(0, 0, 0, 0.8)',
              fontStyle: 'italic',
              margin: 0
            }}
          >
            "We envision a future where design seamlessly integrates with technology, 
            sustainability, and human well-being. Our goal is to create spaces that not only 
            respond to current needs but anticipate and adapt to the evolving ways we live, 
            work, and interact with our environment."
          </motion.p>
        </div>
      </section>

      {/* Insights & Research */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            textAlign: 'center',
            margin: '0 0 60px 0'
          }}
        >
          Research & <span style={{ fontWeight: 'bold' }}>Insights</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gap: '40px'
        }}>
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
              style={{
                padding: '40px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '15px'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  margin: 0,
                  flex: 1
                }}>
                  {insight.title}
                </h3>
                <span style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap'
                }}>
                  {insight.date}
                </span>
              </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'rgba(0, 0, 0, 0.8)',
                margin: '0 0 20px 0'
              }}>
                {insight.content}
              </p>
              <p style={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                margin: 0
              }}>
                — {insight.author}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}