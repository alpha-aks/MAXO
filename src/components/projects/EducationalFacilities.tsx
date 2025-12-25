import { useNavigate } from 'react-router-dom';
import './projects.css';

const EducationalFacilities = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Universities & Colleges", slug: "universities-colleges", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop" },
    { id: 2, title: "Schools & Learning Centers", slug: "schools-learning", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1427504494785-cdaf8fcd87b3?w=600&h=400&fit=crop" },
    { id: 3, title: "Research & Labs", slug: "research-labs", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1532535360828-9c33265c8310?w=600&h=400&fit=crop" },
    { id: 4, title: "Training Centers", slug: "training-centers", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Educational Facilities'
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
          <h1 className="section-title">Educational Facilities</h1>
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

export default EducationalFacilities;
