import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';

export default function News({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(() => (typeof window === 'undefined' ? false : window.innerWidth <= 768));

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const heroBgUrl = '/future-contact-bg.png';

  const menuItems = [
    { label: 'About', ariaLabel: 'About', link: '/about' },
    { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
    { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
    { label: 'News', ariaLabel: 'News', link: '/news' },
    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'MAXO Wins International Design Award',
      category: 'Awards',
      date: 'December 5, 2024',
      excerpt: 'Our Modern Villa Residence project has been recognized with the prestigious International Architecture Award for innovative residential design.',
      content: 'We are thrilled to announce that our Modern Villa Residence project has been honored with the International Architecture Award. This recognition celebrates our commitment to sustainable design and innovative architectural solutions.',
      image: '/news-1.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Sustainable Building Materials: The Future is Here',
      category: 'Sustainability',
      date: 'November 28, 2024',
      excerpt: 'Exploring the latest innovations in eco-friendly building materials and their impact on modern architecture.',
      content: 'As the construction industry evolves, we are seeing remarkable innovations in sustainable building materials. From bio-based composites to recycled steel, these materials are reshaping how we approach design.',
      image: '/news-2.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'New Partnership with Green Tech Solutions',
      category: 'Company News',
      date: 'November 22, 2024',
      excerpt: 'MAXO announces strategic partnership to integrate cutting-edge smart building technologies into our design process.',
      content: 'We are excited to announce our new partnership with Green Tech Solutions, a leading provider of smart building technologies. This collaboration will enable us to offer even more innovative and efficient design solutions.',
      image: '/news-3.jpg',
      featured: false
    },
    {
      id: 4,
      title: 'The Rise of Biophilic Design in Urban Spaces',
      category: 'Trends',
      date: 'November 15, 2024',
      excerpt: 'How incorporating natural elements into urban architecture is improving mental health and productivity.',
      content: 'Biophilic design is more than just a trend—it\'s a fundamental shift in how we think about the relationship between built environments and human well-being. Our latest research explores the measurable benefits.',
      image: '/news-4.jpg',
      featured: false
    },
    {
      id: 5,
      title: 'MAXO Expands to West Coast',
      category: 'Company News',
      date: 'November 8, 2024',
      excerpt: 'Opening new offices in Los Angeles and San Francisco to better serve our growing client base.',
      content: 'To meet growing demand for our services on the West Coast, we are proud to announce the opening of new offices in Los Angeles and San Francisco. These locations will allow us to work more closely with clients.',
      image: '/news-5.jpg',
      featured: false
    },
    {
      id: 6,
      title: 'Virtual Reality in Architecture: A Game Changer',
      category: 'Technology',
      date: 'October 30, 2024',
      excerpt: 'How VR technology is revolutionizing the way we design and present architectural projects to clients.',
      content: 'Virtual Reality has transformed our design process, allowing clients to experience spaces before they are built. This technology has not only improved our design process but also enhanced client satisfaction.',
      image: '/news-6.jpg',
      featured: false
    }
  ];

  const categories = ['All', 'Awards', 'Sustainability', 'Company News', 'Trends', 'Technology'];
  
  const filteredArticles = selectedCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = newsArticles.find(article => article.featured);

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      {/* Navigation */}
      <StaggeredMenu 
        items={menuItems} 
        position="left"
        colors={['#333', '#111', '#000']}
        menuButtonColor="white"
        openMenuButtonColor="white"
        accentColor="#888"
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          padding: isMobile ? '96px 20px 56px' : '120px 40px 80px',
          textAlign: 'center',
          color: 'white',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("${heroBgUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '2.6rem' : '4rem',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 30px 0'
          }}
        >
          Latest <span style={{ fontWeight: 'bold' }}>News</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Stay updated with the latest developments, insights, and achievements 
          from MAXO and the world of innovative design.
        </motion.p>
      </motion.section>

      {/* Featured Article */}
      {featuredArticle && (
        <section style={{ padding: isMobile ? '0 20px 50px' : '0 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              alignItems: 'center',
              minHeight: '400px'
            }}>
              <div style={{
                height: isMobile ? '240px' : '400px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>[Featured Image]</p>
              </div>
              <div style={{ padding: isMobile ? '24px' : '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    textTransform: 'uppercase'
                  }}>
                    Featured
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontSize: '0.9rem'
                  }}>
                    <Tag size={14} />
                    {featuredArticle.category}
                  </div>
                </div>
                <h2 style={{
                  fontSize: isMobile ? '1.6rem' : '2rem',
                  fontWeight: '600',
                  margin: '0 0 15px 0',
                  lineHeight: 1.3
                }}>
                  {featuredArticle.title}
                </h2>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.9rem',
                  marginBottom: '20px'
                }}>
                  <Calendar size={14} />
                  {featuredArticle.date}
                </div>
                <p style={{
                  color: 'rgba(0, 0, 0, 0.8)',
                  lineHeight: 1.6,
                  margin: '0 0 25px 0'
                }}>
                  {featuredArticle.excerpt}
                </p>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
                >
                  Read Full Article
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Category Filter */}
      <section style={{ padding: isMobile ? '0 20px 40px' : '0 40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: selectedCategory === category ? 'black' : 'transparent',
                color: selectedCategory === category ? 'white' : 'black',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '20px' : '30px'
          }}
        >
          <AnimatePresence>
            {filteredArticles.filter(article => !article.featured).map((article, index) => (
              <motion.article
                key={article.id}
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
              >
                <div style={{
                  height: '200px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>[Article Image]</p>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {article.category}
                  </div>
                </div>
                
                <div style={{ padding: '25px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '0.9rem',
                    marginBottom: '15px'
                  }}>
                    <Calendar size={14} />
                    {article.date}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    margin: '0 0 15px 0',
                    lineHeight: 1.4
                  }}>
                    {article.title}
                  </h3>
                  
                  <p style={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0'
                  }}>
                    {article.excerpt}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    Read More
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}