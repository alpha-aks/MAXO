import { useNavigate } from 'react-router-dom';
import './projects.css';

const CulturalPublic = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Museums & Galleries", slug: "museums-galleries", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop" },
    { id: 2, title: "Performance Theaters", slug: "performance-theaters", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1514306688772-e0e6670c0b4e?w=600&h=400&fit=crop" },
    { id: 3, title: "Public Gathering Spaces", slug: "public-gathering-spaces", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" },
    { id: 4, title: "Cultural Centers", slug: "cultural-centers", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Cultural Public Spaces'
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
          <h1 className="section-title">Cultural Public Spaces</h1>
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

export default CulturalPublic;
