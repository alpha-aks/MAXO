import { useState, useEffect } from 'react';
import finalLogo from '../assets/finalemaxologo.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BenoyMenu from './BenoyMenu';
import './OurWork.css';

// Project data with images
const projectItems = [
  {
    id: 1,
    title: 'Commercial Architecture',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop',
    description: 'Creating innovative commercial spaces that inspire productivity and collaboration.',
    links: [
      { id: 1, name: 'Office Towers' },
      { id: 2, name: 'Retail Spaces' },
      { id: 3, name: 'Mixed-Use' },
      { id: 4, name: 'Corporate HQ' }
    ]
  },
  {
    id: 2,
    title: 'Residential Design',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop',
    description: 'Crafting homes that blend luxury with functionality and sustainable living.',
    links: [
      { id: 1, name: 'Luxury Villas' },
      { id: 2, name: 'Apartments' },
      { id: 3, name: 'Townhouses' },
      { id: 4, name: 'Penthouses' }
    ]
  },
  {
    id: 3,
    title: 'Cultural & Public',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2707&auto=format&fit=crop',
    description: 'Designing museums, galleries, and public spaces that enrich communities.',
    links: [
      { id: 1, name: 'Museums' },
      { id: 2, name: 'Galleries' },
      { id: 3, name: 'Libraries' },
      { id: 4, name: 'Civic Centers' }
    ]
  },
  {
    id: 4,
    title: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2677&auto=format&fit=crop',
    description: 'Creating memorable hospitality experiences through thoughtful architecture.',
    links: [
      { id: 1, name: 'Hotels' },
      { id: 2, name: 'Resorts' },
      { id: 3, name: 'Restaurants' },
      { id: 4, name: 'Spas' }
    ]
  },
  {
    id: 5,
    title: 'Urban Planning',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2670&auto=format&fit=crop',
    description: 'Innovative urban planning for sustainable and vibrant cities.',
    links: [
      { id: 1, name: 'City Centers' },
      { id: 2, name: 'Parks' },
      { id: 3, name: 'Transit Hubs' },
      { id: 4, name: 'Public Squares' }
    ]
  },
  {
    id: 6,
    title: 'Educational Facilities',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2670&auto=format&fit=crop',
    description: 'Designing schools and universities that foster learning and growth.',
    links: [
      { id: 1, name: 'Schools' },
      { id: 2, name: 'Colleges' },
      { id: 3, name: 'Universities' },
      { id: 4, name: 'Research Centers' }
    ]
  },
  {
    id: 7,
    title: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2670&auto=format&fit=crop',
    description: 'Modern healthcare facilities designed for wellness and efficiency.',
    links: [
      { id: 1, name: 'Hospitals' },
      { id: 2, name: 'Clinics' },
      { id: 3, name: 'Medical Offices' },
      { id: 4, name: 'Wellness Centers' }
    ]
  },
  {
    id: 8,
    title: 'Recreational Spaces',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=2670&auto=format&fit=crop',
    description: 'Spaces for leisure, sports, and recreation for all ages.',
    links: [
      { id: 1, name: 'Sports Complexes' },
      { id: 2, name: 'Playgrounds' },
      { id: 3, name: 'Community Centers' },
      { id: 4, name: 'Arenas' }
    ]
  }
];

// Tag component
const Tag = ({ name, isHovered }: { name: string; isHovered: boolean }) => (
  <motion.span
    className="ourwork-tag"
    whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
    animate={{ 
      backgroundColor: isHovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
    }}
    transition={{ duration: 0.3 }}
  >
    {name}
  </motion.span>
);

// Project Card component
const ProjectCard = ({ 
  item, 
  isHovered, 
  onHover, 
  onLeave,
  onRedirect
}: { 
  item: typeof projectItems[0]; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onRedirect: () => void;
}) => (
  <motion.div
    className="ourwork-card"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    onClick={onRedirect}
    style={{ cursor: 'pointer' }}
  >
    <div className="ourwork-card-image-wrapper">
      <motion.img
        src={item.image}
        alt={item.title}
        className="ourwork-card-image"
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div 
        className="ourwork-card-overlay"
        animate={{ opacity: isHovered ? 0.3 : 0.5 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* View Project Button */}
      <motion.div
        className="ourwork-view-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        onClick={e => { e.stopPropagation(); onRedirect(); }}
        style={{ cursor: 'pointer' }}
      >
        <span>View Projects</span>
        <ArrowUpRight size={18} />
      </motion.div>
    </div>
    
    <p className="ourwork-card-description">{item.description}</p>
  </motion.div>
);

interface OurWorkProps {
  navigateTo?: (page: string) => void;
}

export default function OurWork({ navigateTo: _navigateTo }: OurWorkProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  // activeProject state removed (not used)
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // menuItems removed (not used in this component)

  // Redirect handler for each project
  const handleRedirect = (item: typeof projectItems[0]) => {
    let slug = '';
    switch (item.title) {
      case 'Commercial Architecture':
        slug = 'commercial-architecture';
        break;
      case 'Residential Design':
        slug = 'residential-design';
        break;
      case 'Cultural & Public':
        slug = 'cultural-public';
        break;
      case 'Hospitality':
        slug = 'hospitality';
        break;
      case 'Urban Planning':
        slug = 'urban-planning';
        break;
      case 'Educational Facilities':
        slug = 'educational-facilities';
        break;
      case 'Healthcare':
        slug = 'healthcare';
        break;
      case 'Recreational Spaces':
        slug = 'recreational-spaces';
        break;
      default:
        slug = '';
    }
    const target = slug ? `/projects/${slug}` : '/work';
    navigate(target);
  };

  return (
    <section className="ourwork-section">
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

      {/* Header */}
      <motion.div 
        className="ourwork-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="ourwork-header-content">
          <span className="ourwork-label">Our Services</span>
          <h1 className="ourwork-title">
            Architectural <span className="italic">Excellence</span>
          </h1>
          <p className="ourwork-subtitle">
            We bring visionary designs to life through innovative architecture and sustainable solutions.
          </p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="ourwork-grid">
        {projectItems.map((item) => (
          <div className="ourwork-item" key={item.id}>
            {/* Title with dot */}
            <div className="ourwork-item-header">
              <span className="ourwork-dot" />
              <h2 className="ourwork-item-title">{item.title}</h2>
            </div>
            
            {/* Project Card */}
            <ProjectCard
              item={item}
              isHovered={hoveredId === item.id}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
              onRedirect={() => handleRedirect(item)}
            />
            
            {/* Tags */}
            <div className="ourwork-tags">
              {item.links.map((link) => (
                <Tag 
                  key={link.id} 
                  name={link.name} 
                  isHovered={hoveredId === item.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
    </section>
  );
}
