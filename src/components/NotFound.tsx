import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';
import Footer from './Footer';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#e8e8e8', color: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Menu */}
      <StaggeredMenu 
        items={[
          { label: 'Home', ariaLabel: 'Home', link: '/' },
          { label: 'About', ariaLabel: 'About', link: '/about' },
          { label: 'Our Work', ariaLabel: 'Our Work', link: '/work' },
          { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
        ]} 
        position="left"
        colors={['#fff', '#fff', '#fff']}
        menuButtonColor="white"
        openMenuButtonColor="black"
        accentColor="#888"
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        {/* Large 404 Number with Blueprint Style */}
        <div style={{
          position: 'relative',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '180px',
            fontWeight: '900',
            margin: '0',
            color: 'rgba(0, 0, 0, 0.08)',
            lineHeight: 1,
            letterSpacing: '-10px'
          }}>
            404
          </h1>
          
          {/* Blueprint Grid Overlay */}
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.3
            }}
          >
            <defs>
              <style>{`
                @keyframes fadeGrid {
                  0%, 100% {
                    opacity: 0.2;
                  }
                  50% {
                    opacity: 0.6;
                  }
                }
                .grid-line {
                  stroke: #000;
                  fill: none;
                  stroke-width: 1;
                  animation: fadeGrid 3s ease-in-out infinite;
                }
              `}</style>
            </defs>
            {[0, 50, 100, 150, 200].map((x) => (
              <line 
                key={`v${x}`}
                x1={x} 
                y1="0" 
                x2={x} 
                y2="200" 
                className="grid-line"
              />
            ))}
            {[0, 50, 100, 150, 200].map((y) => (
              <line 
                key={`h${y}`}
                x1="0" 
                y1={y} 
                x2="200" 
                y2={y} 
                className="grid-line"
              />
            ))}
          </svg>
        </div>

        {/* Heading */}
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          margin: '0 0 20px 0',
          color: '#000'
        }}>
          Page Not Found
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '40px',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '1rem',
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
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px',
              backgroundColor: 'transparent',
              color: '#000',
              border: '2px solid #000',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#000';
            }}
          >
            Home
          </button>
        </div>

        {/* Helpful Links */}
        <div style={{
          marginTop: '80px',
          paddingTop: '60px',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '500'
          }}>
            Explore Our Pages
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px'
          }}>
            {[
              { label: 'Home', link: '/' },
              { label: 'About Us', link: '/about' },
              { label: 'Our Work', link: '/work' },
              { label: 'Future Thinking', link: '/future' },
              { label: 'News', link: '/news' },
              { label: 'Contact', link: '/contact' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.link)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: 'transparent',
                  color: '#333',
                  border: 'none',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 0.2s',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer navigateTo={(page) => navigate(page.startsWith('/') ? page : `/${page}`)} />
    </div>
  );
}
