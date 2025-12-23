import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  { id: '01', title: 'The Vertex Tower', loc: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop' },
  { id: '02', title: 'Mono Residence', loc: 'Oslo, Norway', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop' },
  { id: '03', title: 'Carbon Museum', loc: 'Berlin, Germany', img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2707&auto=format&fit=crop' },
  { id: '04', title: 'Aero Terminal', loc: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2677&auto=format&fit=crop' }
];

export default function WorkGallery({ isMobile }: { isMobile?: boolean }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map scroll to frame (1 to 80)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 80]);
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      setCurrentFrame(Math.min(80, Math.max(1, Math.floor(latest))));
    });
    return () => unsubscribe();
  }, [frameIndex]);

  const frameFileName = String(currentFrame).padStart(3, '0');
  const bgImage = `/ezgif-8fe967c091b2ac91-jpg/ezgif-frame-${frameFileName}.jpg`;

  // Horizontal scroll for projects
  const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-150%" : "-60%"]);

  return (
    <section ref={targetRef} style={{ height: '400vh', position: 'relative', zIndex: 40 }}>
      
      <div style={{ 
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* Background Animation */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
           <img 
             src={bgImage} 
             alt="Background Animation" 
             style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
           />
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9))' }} />
        </div>

        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 10, paddingLeft: isMobile ? '24px' : '5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <div style={{ marginBottom: '4vh' }}>
             <h2 style={{ color: 'white', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Selected Works</h2>
             <h1 style={{ color: 'white', fontSize: isMobile ? '3rem' : 'clamp(3rem, 5vw, 6rem)', margin: 0, lineHeight: 1 }}>Architectural<br/>Excellence</h1>
          </div>

          <motion.div style={{ x, display: 'flex', gap: isMobile ? '24px' : '4vw' }}>
            {projects.map((p) => (
              <div key={p.id} style={{ width: isMobile ? '70vw' : '18vw', minWidth: isMobile ? '260px' : '180px', aspectRatio: '3/4', position: 'relative', flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px' }}>
                  <motion.img 
                    src={p.img} 
                    alt={p.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div style={{ position: 'absolute', bottom: '-40px', left: 0 }}>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', margin: 0 }}>{p.title}</h3>
                  <p style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{p.loc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
