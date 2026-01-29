const projects = [
  { id: '01', title: 'arch', loc: 'Tokyo, Japan', img: 'https://iili.io/figeAsp.jpg' },
  { id: '02', title: 'branded envi', loc: 'Oslo, Norway', img: 'https://iili.io/figg0k7.jpg' },
  { id: '03', title: 'Master Plan', loc: 'Berlin, Germany', img: 'https://iili.io/figb1yJ.jpg' },
  { id: '04', title: 'land arch', loc: 'Dubai, UAE', img: 'https://iili.io/figi3Kb.jpg' },
  { id: '05', title: 'Product', loc: 'New York, USA', img: 'https://iili.io/figbMjR.jpg' },
  { id: '06', title: 'Research', loc: 'Singapore', img: 'https://iili.io/figb0va.jpg' },
  { id: '07', title: 'Interior Design', loc: 'Zurich, Switzerland', img: 'https://iili.io/figbGTv.jpg' }
];

export default function WorkGallery() {
  return (
    <section style={{ position: 'relative', zIndex: 40, backgroundColor: '#e8e8e8', padding: '100px 0', overflow: 'hidden' }}>
      
      {/* Internal CSS for Responsiveness */}
      <style>{`
        /* Desktop Default */
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          padding: 0 5vw;
          max-width: 1600px;
          margin: 0 auto;
        }
        .section-header {
          padding-left: 5vw;
          margin-bottom: 60px;
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Tablet View */
        @media (max-width: 1024px) {
          .gallery-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile View (Phone) */
        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: 1fr;
            padding: 0;
            gap: 24px;
            /* Keeps the card small (65% width) */
            width: 65%; 
            /* Moves it to the LEFT (24px from edge) instead of center */
            margin-left: 24px; 
            margin-right: auto;
          }
          .section-header {
            /* Aligns text to the LEFT (24px from edge) */
            padding-left: 24px;
            text-align: left; 
            margin-bottom: 40px;
            margin-left: 0;
          }
        }
      `}</style>

      {/* Background Animation */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        zIndex: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.1 
      }}>
        <img 
          src="https://media.tenor.com/2QGQnXlI3p8AAAAC/teach-me-how-to-dougie.gif" 
          alt="Animation" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="section-header">
          <h1 className="ourwork-title" style={{ marginTop: 0 }}>
             Our <span className="italic">Expertise</span>
          </h1>
        </div>
        
        {/* Grid Container */}
        <div className="gallery-container">
          {projects.map(p => (
            <Card key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ project }: { project: any }) {
  return (
    <div
      style={{ 
        width: '100%', 
        aspectRatio: '12/8', 
        position: 'relative', 
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', position: 'relative' }}>
        <img 
          src={project.img} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
        />
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ color: 'white', fontSize: 'clamp(1rem, 2vw, 1.3rem)', margin: 0 }}>{project.title}</h3>
      </div>
    </div>
  );
}
