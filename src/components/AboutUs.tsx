import { useRef, useEffect, useState } from 'react';
import finalLogo from '../assets/finalemaxologo.png';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { ArrowUpRight, Award, Users, Building, Target } from 'lucide-react';
import TiltedCard, { Orb } from './TiltedCard';
import BenoyMenu from './BenoyMenu';
import './AboutUs.css';

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

// Animated counter component
const AnimatedCounter = ({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, to]);

  useEffect(() => {
    rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

export default function AboutUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const statsRef = useRef(null);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

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

  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 1.1]);
  const heroTextY = useTransform(heroProgress, [0, 0.8], [0, 100]);
  
  // Keep scroll progress refs for potential future animations
  void scrollYProgress;
  void storyProgress;
  void statsProgress;

  const stats = [
    { number: 25, suffix: "+", label: "Years Experience", icon: Award },
    { number: 500, suffix: "+", label: "Projects Completed", icon: Building },
    { number: 120, suffix: "+", label: "Team Members", icon: Users },
    { number: 15, suffix: "", label: "Countries Served", icon: Target }
  ];

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

  // menuItems removed (not used in this component)

  return (
    <div ref={containerRef} className="about-container">
      
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
          justifyContent: isMobile ? 'flex-start' : 'center',
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
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
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
                <span style={{ fontStyle: 'italic' }}>Since 1999</span>
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

      {/* Stats Section */}
      <section ref={statsRef} className="about-stats">
        <motion.div className="about-stats-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-stats-header"
          >
            <h2 className="about-stats-title">
              Numbers That <span style={{ fontStyle: 'italic' }}>Define Us</span>
            </h2>
          </motion.div>

          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="about-stat-item"
              >
                <stat.icon size={24} className="about-stat-icon" />
                <div className="about-stat-number">
                  <AnimatedCounter from={0} to={stat.number} suffix={stat.suffix} />
                </div>
                <p className="about-stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
            <p className="about-section-label">Leadership</p>
            <h2 className="about-team-title">
              Meet Our <span style={{ fontStyle: 'italic' }}>Team</span>
            </h2>
          </motion.div>

          <div className="about-team-grid">
            {[
              { name: "Alexander Chen", role: "Founder & Principal", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
              { name: "Sarah Mitchell", role: "Design Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" },
              { name: "Marcus Williams", role: "Technical Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop" }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="about-team-member"
              >
                {/* Mobile Image */}
                <div className="about-team-image-mobile">
                  <img src={member.image} alt={member.name} />
                </div>
                
                {/* Desktop TiltedCard */}
                <div className="about-team-image-desktop">
                  <TiltedCard
                    imageSrc={member.image}
                    altText={member.name}
                    captionText={member.role}
                    containerHeight={isTablet ? '320px' : '380px'}
                    containerWidth="100%"
                    imageHeight={isTablet ? '300px' : '350px'}
                    imageWidth={isTablet ? '240px' : '280px'}
                    scaleOnHover={1.05}
                    rotateAmplitude={12}
                    showMobileWarning={false}
                    showTooltip={true}
                  />
                </div>
                
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
