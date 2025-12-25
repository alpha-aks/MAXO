import { useNavigate } from 'react-router-dom';
import './projects.css';

const Hospitality = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Luxury Hotels & Resorts", slug: "luxury-hotels", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop" },
    { id: 2, title: "Fine Dining Restaurants", slug: "fine-dining", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1504674900152-cd4628902d4a?w=600&h=400&fit=crop" },
    { id: 3, title: "Event Venues", slug: "event-venues", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop" },
    { id: 4, title: "Spa & Wellness", slug: "spa-wellness", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1544367567-0d5fcfdbae90?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Hospitality Spaces'
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
          <h1 className="section-title">Hospitality Spaces</h1>
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

export default Hospitality;
