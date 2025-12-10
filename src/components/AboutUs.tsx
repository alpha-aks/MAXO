import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, X, Users, Target, Award, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import MenuOverlay from './MenuOverlay';
import DarkLuxuryMenu from './DarkLuxuryMenu';

export default function AboutUs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Helper to navigate to a named page used by menu and footer
  const navigateTo = (page: string) => {
    switch (page) {
      case 'about':
        navigate('/about');
        break;
      case 'work':
        navigate('/work');
        break;
      case 'future':
        navigate('/future');
        break;
      case 'news':
        navigate('/news');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
    }
  };

  const values = [
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collaborative design processes that bring out the best in every project.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing boundaries and exploring new possibilities in design to create unique and impactful solutions.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality work that exceeds expectations and stands the test of time.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every project is approached with genuine enthusiasm and dedication to creating meaningful design experiences.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
      image: '/team-1.jpg',
      bio: 'With over 15 years of experience in design, Sarah leads our creative vision.'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Architect',
      image: '/team-2.jpg',
      bio: 'Michael brings innovative architectural solutions to every project.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Interior Designer',
      image: '/team-3.jpg',
      bio: 'Emily specializes in creating beautiful and functional interior spaces.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Menu */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            zIndex: 60
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} style={{ color: 'black' }} /> : <Menu size={24} style={{ color: 'black' }} />}
          <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: 'black' }}>Menu</span>
        </div>

        {/* Logo */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0,
              color: 'black'
            }}>
              MAXO
            </h1>
          </button>
        </div>

        {/* Search */}
        <div style={{ color: 'black' }}>
          <Search size={24} />
        </div>
      </nav>

      {/* Menu Components - Same as home page */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <DarkLuxuryMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={(path) => navigate(path)} />

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
            margin: '0 0 30px 0',
            textAlign: 'center'
          }}
        >
          About <span style={{ fontWeight: 'bold' }}>MAXO</span>
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
          We are a creative design studio passionate about transforming spaces and creating 
          meaningful experiences through innovative design solutions.
        </motion.p>
      </motion.section>

      {/* Story Section */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              margin: '0 0 30px 0'
            }}>
              Our <span style={{ fontWeight: 'bold' }}>Story</span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(0, 0, 0, 0.8)',
              margin: '0 0 25px 0'
            }}>
              Founded in 2015, MAXO began as a small team of passionate designers with a vision 
              to create spaces that inspire and elevate the human experience. What started as a 
              local studio has grown into a recognized name in the design industry.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(0, 0, 0, 0.8)',
              margin: 0
            }}>
              Today, we continue to push boundaries, explore new possibilities, and create 
              designs that not only look beautiful but also function seamlessly in the real world.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              height: '400px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>[Studio Image Placeholder]</p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '80px 40px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              textAlign: 'center',
              margin: '0 0 60px 0'
            }}
          >
            Our <span style={{ fontWeight: 'bold' }}>Values</span>
          </motion.h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                  style={{
                    padding: '30px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <IconComponent size={48} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    margin: '0 0 15px 0'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
          Meet Our <span style={{ fontWeight: 'bold' }}>Team</span>
        </motion.h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
              style={{
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>[Photo]</p>
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                margin: '0 0 10px 0'
              }}>
                {member.name}
              </h3>
              <p style={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '1rem',
                margin: '0 0 15px 0'
              }}>
                {member.role}
              </p>
              <p style={{
                color: 'rgba(0, 0, 0, 0.7)',
                lineHeight: 1.6,
                margin: 0
              }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}