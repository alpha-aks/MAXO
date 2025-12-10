import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, X, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import MenuOverlay from './MenuOverlay';
import DarkLuxuryMenu from './DarkLuxuryMenu';

export default function OurWork({ navigateTo }: { navigateTo: (page: string) => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const projects = [
    {
      id: 1,
      title: 'Modern Villa Residence',
      category: 'Residential',
      location: 'Los Angeles, CA',
      year: '2024',
      description: 'A stunning modern villa that seamlessly blends indoor and outdoor living spaces with clean lines and sustainable materials.',
      image: '/project-1.jpg',
      details: 'This 5,000 sq ft villa features floor-to-ceiling windows, an infinity pool, and smart home integration throughout.'
    },
    {
      id: 2,
      title: 'Corporate Headquarters',
      category: 'Commercial',
      location: 'New York, NY',
      year: '2023',
      description: 'A contemporary office space designed to inspire collaboration and productivity in the heart of Manhattan.',
      image: '/project-2.jpg',
      details: 'The 50,000 sq ft space includes flexible workspaces, wellness areas, and rooftop gardens.'
    },
    {
      id: 3,
      title: 'Boutique Hotel Design',
      category: 'Hospitality',
      location: 'Miami, FL',
      year: '2024',
      description: 'A luxury boutique hotel that captures the essence of Miami\'s vibrant culture and beachfront lifestyle.',
      image: '/project-3.jpg',
      details: '120 rooms designed with local artwork, ocean views, and sustainable luxury amenities.'
    },
    {
      id: 4,
      title: 'Urban Loft Renovation',
      category: 'Residential',
      location: 'Chicago, IL',
      year: '2023',
      description: 'A complete transformation of an industrial loft into a modern living space while preserving its historic character.',
      image: '/project-4.jpg',
      details: 'Exposed brick walls, steel beams, and contemporary furnishings create a perfect urban retreat.'
    },
    {
      id: 5,
      title: 'Art Gallery & Studio',
      category: 'Cultural',
      location: 'Portland, OR',
      year: '2024',
      description: 'A minimalist gallery space that allows art to take center stage while providing flexible exhibition areas.',
      image: '/project-5.jpg',
      details: 'Natural lighting, movable walls, and integrated audio-visual systems enhance the viewing experience.'
    },
    {
      id: 6,
      title: 'Sustainable Office Complex',
      category: 'Commercial',
      location: 'Seattle, WA',
      year: '2023',
      description: 'An environmentally conscious office building featuring green roofs, solar panels, and energy-efficient systems.',
      image: '/project-6.jpg',
      details: 'LEED Platinum certified with rainwater collection and geothermal heating systems.'
    }
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Cultural'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

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

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <button 
            onClick={() => navigateTo('home')}
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
          background: 'linear-gradient(135deg, rgba(250,250,250,0.9) 0%, rgba(240,240,240,0.9) 100%)'
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
          Our <span style={{ fontWeight: 'bold' }}>Work</span>
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
          Explore our portfolio of innovative design projects that showcase our commitment 
          to creating exceptional spaces and experiences.
        </motion.p>
      </motion.section>

      {/* Filter Categories */}
      <section style={{ padding: '0 40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: activeCategory === category ? 'black' : 'transparent',
                color: activeCategory === category ? 'white' : 'black',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px'
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                <div style={{
                  height: '250px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>[Project Image]</p>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {project.category}
                  </div>
                </div>
                
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    margin: '0 0 15px 0'
                  }}>
                    {project.title}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '15px',
                    fontSize: '0.9rem',
                    color: 'rgba(0, 0, 0, 0.7)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} />
                      {project.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} />
                      {project.year}
                    </div>
                  </div>
                  
                  <p style={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {project.description}
                  </p>
                  
                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          marginTop: '20px',
                          paddingTop: '20px',
                          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <p style={{
                          color: 'rgba(0, 0, 0, 0.7)',
                          lineHeight: 1.6,
                          margin: '0 0 15px 0'
                        }}>
                          {project.details}
                        </p>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(0, 0, 0, 0.3)',
                          borderRadius: '20px',
                          color: 'black',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        >
                          View Full Project
                          <ExternalLink size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}