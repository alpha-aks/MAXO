import { useNavigate } from 'react-router-dom';
import './projects.css';

const UrbanPlanning = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Smart City Development", slug: "smart-city", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=600&h=400&fit=crop" },
    { id: 2, title: "Transportation Infrastructure", slug: "transportation", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=600&h=400&fit=crop" },
    { id: 3, title: "Urban Renewal Projects", slug: "urban-renewal", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop" },
    { id: 4, title: "City Planning", slug: "city-planning", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Urban Planning'
        } 
      } 
    });
  };

  return (
    <div className="project-page">
      <button
        onClick={() => navigate('/work')}
        className="return-to-work"
        aria-label="Return to Work"
        type="button"
      >
        <span className="return-to-work-arrow">←</span>
        <span>Return to Work</span>
      </button>

      <section className="project-section">
        <div className="section-header">
          <h1 className="section-title">Urban Planning</h1>
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

export default UrbanPlanning;
