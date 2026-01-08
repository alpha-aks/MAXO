import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Linkedin, Instagram } from 'lucide-react';
import { Orb } from './TiltedCard';
import StaggeredMenu from './StaggeredMenu';
import './AboutUs.css';
import Footer from './Footer';

// Easing curves for premium feel
const transition = { duration: 1.2, ease: [0.33, 1, 0.68, 1] as const };

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const maskReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition }
};

const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as const } }
};



export default function AboutUs() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const navigate = useNavigate();
  const navigateTo = (page: string) => {
    // Accept both 'contact' and '/contact'
    navigate(page.startsWith('/') ? page : `/${page}`);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });



  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 1.1]);
  const heroTextY = useTransform(heroProgress, [0, 0.8], [0, 100]);
  
  // Keep scroll progress refs for potential future animations
  void scrollYProgress;
  void storyProgress;



  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge design solutions that redefine architectural possibilities."
    },
    {
      title: "Sustainability",
      description: "Creating environmentally conscious spaces that harmonize with nature and reduce ecological footprint."
    },
    {
      title: "Excellence",
      description: "Delivering exceptional quality in every project through meticulous attention to detail."
    }
  ];

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  return (
    <div ref={containerRef} className="about-container">
      
      {/* Navigation Menu */}
      <StaggeredMenu 
        items={menuItems} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="about-hero">
        {/* Orb Background */}
        <motion.div
          className="about-hero-bg"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <Orb hue={220} hoverIntensity={0.3} rotateOnHover={true} forceHoverState={false} />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="about-hero-gradient" />

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="about-hero-content"
          style={{ y: heroTextY }}
        >
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="about-scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="about-scroll-line"
            />
            <span className="about-scroll-text">Scroll</span>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="about-hero-subtitle">
           <h3>About MAXO</h3>
          </motion.p>

          <div className="about-hero-title-wrapper">
            <motion.h1 variants={maskReveal} className="about-hero-title">
              Crafting Spaces
            </motion.h1>
          </div>

          <div className="about-hero-title-wrapper">
            <motion.h1 variants={maskReveal} className="about-hero-title">
              That <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Inspire</span>
            </motion.h1>
          </div>

          <motion.p variants={fadeInUp} className="about-hero-description">
            We are a team of passionate architects and designers dedicated to 
            transforming visions into extraordinary built environments.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="about-story">
        <div className="about-story-container">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-story-image-wrapper"
          >
            <img
              src="/home.gif"
              alt="Architecture Design"
              className="about-story-image"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="about-story-text"
          >
            <motion.p variants={fadeInUp} className="about-section-label">
              Our Story
            </motion.p>

            <motion.div style={{ overflow: 'hidden', marginBottom: '32px' }}>
              <motion.h2 variants={fadeInUp} className="about-story-title">
                Redefining Architecture
                <br />
              </motion.h2>
            </motion.div>
            
            <motion.div variants={lineReveal} className="about-story-line" />

            <motion.p variants={fadeInUp} className="about-story-paragraph">
              Founded with a vision to create meaningful spaces, MAXO has grown from a 
              small studio into an internationally recognized architectural practice. 
              Our journey has been defined by a relentless pursuit of design excellence 
              and innovation.
            </motion.p>

            <motion.p variants={fadeInUp} className="about-story-paragraph">
              We believe architecture has the power to transform lives. Every project 
              we undertake is an opportunity to create spaces that inspire, function 
              beautifully, and stand the test of time.
            </motion.p>

            <motion.a href="/work" whileHover={{ x: 8 }} className="about-story-link">
              View Our Work
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-values-header"
          >
            {/* Title */}
            <div>
              <p className="about-section-label">Our Values</p>
              <h2 className="about-values-title">
                What Drives <span style={{ fontStyle: 'italic' }}>Our Vision</span>
              </h2>
            </div>

            {/* Values Grid */}
            <div className="about-values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="about-value-item"
                >
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="about-team">
        <div className="about-team-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-team-header"
          >
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-team-content"
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '3rem',
              maxWidth: '1400px',
              margin: '0 auto',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row'
            }}
          >
            {/* Image Section - Left */}
            <div style={{ flex: '0 0 300px', textAlign: 'center' }}>
              <img 
                src="/founder.jpeg"
                alt="Divya"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}
              />
              
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a 
                  href="https://www.linkedin.com/company/maxo12/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    color: '#333',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#333';
                  }}
                >
                  <Linkedin size={20} />
                </a>
                
                <a 
                  href="https://www.instagram.com/maxo.co.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    color: '#333',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#333';
                  }}
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            {/* First Paragraph - Middle */}
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                Divya Patel
              </h3>
              
              <p style={{ 
                fontSize: '1.2rem', 
                fontWeight: '500', 
                color: '#666',
                marginBottom: '1.5rem'
              }}>
                Founder & Principal Architect
              </p>
              
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.6', 
                color: '#555'
              }}>
                Divya has experienced architecture and art across diverse cultures through extensive travel, bringing a global perspective to design, one that emphasizes boundless creative and technological possibilities within art, architecture, and design. He seamlessly blends innovative design thinking with diverse research methodologies, while challenging existing disciplinary boundaries and contributing to emerging spatial design practice and knowledge.
              </p>
            </div>
            
            {/* Second Paragraph - Right */}
            <div style={{ flex: '1', minWidth: '250px' }}>
              <p style={{ 
                fontSize: '1rem', 
                lineHeight: '1.6', 
                color: '#555'
              }}>
               <br /> <br /> <br /> <br /><br /> <br /> Divya pursued his Bachelor's in architecture degree in 2014, after which he worked in India as an architect, then he decided to pursue Masters in architecture from Bartlett School of Architecture, London. Subsequently, he worked as an architect and urban designer at Benoy, London for three years, before establishing MAXO Architects & Designers in 2024.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
       <Footer navigateTo={navigateTo} />
    </div>
  );
}
