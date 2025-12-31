import { useNavigate } from 'react-router-dom';
import './projects.css';

const Healthcare = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Hospitals & Medical Centers", slug: "hospitals-medical", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1631217314830-4f8217c53cc8?w=600&h=400&fit=crop" },
    { id: 2, title: "Clinics & Wellness Centers", slug: "clinics-wellness", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop" },
    { id: 3, title: "Diagnostic Centers", slug: "diagnostic-centers", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop" },
    { id: 4, title: "Medical Labs", slug: "medical-labs", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1576668219002-53ae47e72e0b?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Healthcare Facilities'
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
          <h1 className="section-title">Healthcare Facilities</h1>
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

export default Healthcare;
