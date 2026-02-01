import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from './Footer';
import StaggeredMenu from './StaggeredMenu';

interface Insight {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  author: string;
  image: string;
  gallery?: any[];
  link?: string;
  data?: any;
}

export default function ResearchInsightPage() {
  const { insightId } = useParams<{ insightId: string }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, [insightId]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const loadInsight = async () => {
      try {
        // Get insights from sessionStorage or localStorage where FutureThinking stored them
        const storedInsights = sessionStorage.getItem('researchInsights');
        if (storedInsights) {
          const insights = JSON.parse(storedInsights);
          const found = insights.find((i: Insight) => i.id === insightId);
          if (found) {
            setInsight(found);
            setLoading(false);
            return;
          }
        }
        
        // If not in storage, show error
        setLoading(false);
      } catch (error) {
        console.error('Error loading insight:', error);
        setLoading(false);
      }
    };

    loadInsight();
  }, [insightId]);

  const navigateTo = (page: string) => {
    navigate(page.startsWith('/') ? page : `/${page}`);
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#e8e8e8',
        color: 'black',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!insight) {
    return (
      <div style={{
        backgroundColor: '#e8e8e8',
        color: 'black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <h1>Insight not found</h1>
        <button
          onClick={() => navigate('/future')}
          style={{
            marginTop: '20px',
            padding: '12px 30px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Future Thinking
        </button>
      </div>
    );
  }

  const contentParagraphs = (insight.content || insight.data?.content || '')
    .split('\n\n')
    .filter((paragraph: string) => paragraph.trim().length > 0);

  const galleryImages = (insight.gallery || insight.data?.gallery || [])
    .map((item: any) => {
      // Handle different possible structures from Prismic
      const imageUrl = item?.image?.url || item?.url || null;
      console.log('Gallery item:', item, 'URL:', imageUrl);
      return imageUrl;
    })
    .filter((url: string | null) => url !== null);
  
  const hasGalleryImages = galleryImages.length > 0;

  return (
    <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh' }}>
      {/* Navigation */}
      <StaggeredMenu 
        items={[
          { label: 'About', ariaLabel: 'About', link: '/about' },
          { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
          { label: 'Future Thinking', ariaLabel: 'Future Thinking', link: '/future' },
          { label: 'News', ariaLabel: 'News', link: '/news' },
          { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
        ]} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Back Button */}
      <div style={{ padding: isMobile ? '80px 20px 20px' : '100px 40px 20px' }}>
        <button
          onClick={() => navigate('/future')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            color: '#333',
            padding: '8px 0'
          }}
        >
          <ArrowLeft size={20} />
          Back to Insights
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        padding: isMobile ? '20px' : '60px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? '24px' : '48px',
          alignItems: 'stretch',
          marginBottom: isMobile ? '32px' : '60px'
        }}>
          {/* Left: Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#666',
              fontWeight: '500',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              {insight.date}
            </span>

            <h1 style={{
              fontSize: isMobile ? '2rem' : '3.2rem',
              fontWeight: 'bold',
              lineHeight: 1.1,
              marginTop: '18px',
              marginBottom: '18px',
              color: '#000'
            }}>
              {insight.title}
            </h1>

            <p style={{
              fontSize: '1rem',
              color: 'rgba(0, 0, 0, 0.6)',
              fontStyle: 'italic',
              marginBottom: '24px'
            }}>
              By {insight.author}
            </p>

            {(insight.description || insight.data?.description) && (
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: '#333',
                marginBottom: '24px',
                fontWeight: '500'
              }}>
                {insight.description || insight.data?.description}
              </p>
            )}

            <div style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#444'
            }}>
              {contentParagraphs.map((paragraph: string, index: number) => (
                <p key={index} style={{ marginBottom: '20px' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right: 16:9 Image */}
          <div style={{
            width: '100%',
            height: '100%',
            minHeight: isMobile ? '220px' : '420px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#ddd',
            aspectRatio: '16 / 9'
          }}>
            <img
              src={insight.image || insight.data?.image?.url}
              alt={insight.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* View More Images */}
        {hasGalleryImages && (
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setShowImages((prev) => !prev)}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {showImages ? 'HIDE IMAGES' : 'VIEW MORE IMAGES'}
              </button>
            </div>

            {showImages && (
              <div>
                <h2 style={{
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  marginBottom: '20px'
                }}>
                  Gallery
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '16px'
                }}>
                  {galleryImages.map((imageUrl: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        width: '100%',
                        aspectRatio: '16 / 9',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        backgroundColor: '#ddd'
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`${insight.title} gallery ${i + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {(insight.link || insight.data?.link) && (
          <div style={{
            padding: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <p style={{ fontSize: '1rem', marginBottom: '20px', color: '#666' }}>
              Learn more about this research insight
            </p>
            <a
              href={insight.link || insight.data?.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 40px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = '1';
              }}
            >
              VIEW FULL ARTICLE
            </a>
          </div>
        )}
      </div>

      {/* Related Insights Navigation */}
      <div style={{
        padding: isMobile ? '40px 20px' : '80px 40px',
        backgroundColor: '#f0f0f0',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>
          Explore More Insights
        </h2>
        <button
          onClick={() => navigate('/future')}
          style={{
            padding: '12px 40px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Back to All Insights
        </button>
      </div>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
