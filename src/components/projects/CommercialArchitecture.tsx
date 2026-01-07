import { useNavigate } from 'react-router-dom';
import './projects.css';

const CommercialArchitecture = () => {
  const navigate = useNavigate();

  const projectItem = [
    { id: 1, title: "SARDHAV FARM HOUSE", image: "/SARDHAV.jpeg" },
    { id: 2, title: "PODIUM INDORE", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop" },
    { id: 3, title: "MIXED USE DEVELOPMENT (VERAVAL)", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" },
    { id: 4, title: "ZUNDAL CORPORATE HOUSE 225_226", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop" },
    { id: 5, title: "ZUNDAL_228 (FACADE )", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop" },
    { id: 6, title: "USMANPURA 4BHK", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop" },
    { id: 7, title: "SIKHAR BANGLOW", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?w=600&h=400&fit=crop" },
    { id: 8, title: "DIVINE HIGHLAND", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop" },
    { id: 9, title: "UTSAV DEVELOPERS", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop" },
    { id: 10, title: "VARDHAN INDAUSTRIAL PARK OFFICE", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop" },
    { id: 11, title: "VARDHAN SITE OFFICE", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop" },
  ];

  const handleImageClick = (item: typeof projectItem[0]) => {
    navigate('/allproject', {
      state: {
        project: {
          ...item,
          slug: item.title, // Pass title as slug for description lookup
          category: 'Commercial Architecture'
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
          <h1 className="section-title">Commercial Architecture</h1>
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

export default CommercialArchitecture;
