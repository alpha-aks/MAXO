import { useNavigate } from 'react-router-dom';
import './projects.css';

const RecreationalSpaces = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "Sports & Fitness Centers", slug: "sports-fitness", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" },
    { id: 2, title: "Parks & Outdoor Spaces", slug: "parks-outdoor", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop" },
    { id: 3, title: "Entertainment Complexes", slug: "entertainment", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1493514789921-586cb221d7d7?w=600&h=400&fit=crop" },
    { id: 4, title: "Community Recreation", slug: "community-recreation", links: [{ id: 1 }, { id: 2 }], image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', { 
      state: { 
        project: { 
          ...item, 
          category: 'Recreational Spaces'
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
          <h1 className="section-title">Recreational Spaces</h1>
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

export default RecreationalSpaces;
