import { useNavigate } from 'react-router-dom';
import './projects.css';

const ResidentialDesign = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Luxury Apartments", slug: "luxury-apartments", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop" },
    { id: 2, title: "Modern Villas", slug: "modern-villas", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=600&h=400&fit=crop" },
    { id: 3, title: "Community Developments", slug: "community-dev", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" },
    { id: 4, title: "Townhouses", slug: "townhouses", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Residential Design'
        } 
      } 
    });
  };

  return (
    <div className="project-page">
      <button 
        onClick={() => navigate(-1)} 
        className="back-button"
      >
        ← Back
      </button>

      <section className="project-section">
        <div className="section-header">
          <h1 className="section-title">Residential Design</h1>
        </div>
        
        <div className="projects-grid">
          {projectItem.map((item) => (
            <div className="project-card-wrapper" key={item.id}>
              <div className="project-card-label">
                <span className="label-dot" />
                <h2 className="label-title">
                  {item.title}
                </h2>
              </div>
              
              <div 
                className="project-card-image"
                onClick={() => handleImageClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={item.image}
                  alt={item.title}
                />
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default ResidentialDesign;
