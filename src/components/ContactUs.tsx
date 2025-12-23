import { useState } from 'react';
import finalLogo from '../assets/finalemaxologo.png';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Footer from './Footer';
import BenoyMenu from './BenoyMenu';

export default function ContactUs({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });

  // menuItems removed (not used in this component)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
   {
      icon: MapPin,
      title: 'Visit Our Studio',
      details: [
        '1205, Maple Trade Centre',
        'Surdhara Circle, Maple Trade Ctr Rd',
        'Thaltej, Ahmedabad, Gujarat 380052'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        'Main: +91 7778881060',
        'Projects: +91 9227001016'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@maxo.co.in',
        'projects@maxo.co.in'
      ]
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
          Contact <span style={{ fontWeight: 'bold' }}>Us</span>
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
          Ready to start your next project? We'd love to hear from you. 
          Get in touch to discuss how we can bring your vision to life.
        </motion.p>
      </motion.section>

      {/* Contact Form & Info */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'flex-start'
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              margin: '0 0 40px 0'
            }}>
              Start Your Project
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    color: 'black',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    color: 'black',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                />
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  style={{
                    padding: '15px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    color: 'black',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <option value="" style={{ backgroundColor: 'white', color: 'black' }}>Project Type</option>
                  <option value="residential" style={{ backgroundColor: 'white', color: 'black' }}>Residential</option>
                  <option value="commercial" style={{ backgroundColor: 'white', color: 'black' }}>Commercial</option>
                  <option value="hospitality" style={{ backgroundColor: 'white', color: 'black' }}>Hospitality</option>
                  <option value="cultural" style={{ backgroundColor: 'white', color: 'black' }}>Cultural</option>
                  <option value="consultation" style={{ backgroundColor: 'white', color: 'black' }}>Consultation</option>
                </select>
              </div>
              
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                style={{
                  padding: '15px 20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  color: 'black',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
              />
              
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                style={{
                  padding: '15px 20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  color: 'black',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
              />
              
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '18px 40px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              margin: '0 0 40px 0'
            }}>
              Get in Touch
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                  >
                    <div style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}>
                      <IconComponent size={24} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        margin: '0 0 10px 0'
                      }}>
                        {info.title}
                      </h3>
                      <div style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} style={{ margin: '5px 0', fontSize: '0.95rem' }}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
