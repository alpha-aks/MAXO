import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Easing curves for that premium feel ---
const transition = { duration: 1.2, ease: [0.33, 1, 0.68, 1] as const };

// --- VARIANTS FOR TEXT MASKING REVEAL ---
const maskContainerVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
  }
};

const maskChildVariant = {
  hidden: { y: "110%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1,
    transition: transition
  }
};

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

// --- HELPER COMPONENT: ANIMATED COUNTER ---
const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, from, to]);

  useEffect(() => {
    rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
};

export default function AboutModern({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef(null);
  
  // --- PARALLAX SETUP ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={containerRef} style={{
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: isMobile ? '80px 24px' : '128px 96px',
      overflow: 'hidden',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
          gap: isMobile ? '64px' : '96px',
          alignItems: 'flex-start'
        }}>
          
          {/* --- LEFT COLUMN: IMAGE WITH PARALLAX REVEAL --- */}
          <div style={{ position: 'relative' }}>
            <motion.div 
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                backgroundColor: '#f4f4f4',
                overflow: 'hidden'
              }}
              initial={{ clipPath: "inset(100% 0 0 0)" }} 
              whileInView={{ clipPath: "inset(0% 0 0 0)" }} 
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" 
                alt="Architecture Sketch" 
                style={{ 
                  y: yParallax, 
                  scale: scaleParallax,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transformOrigin: 'bottom'
                }} 
              />
              
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 1 }}
                 style={{
                   position: 'absolute',
                   inset: 0,
                   border: '1px solid rgba(0,0,0,0.05)',
                   pointerEvents: 'none'
                 }}
              >
                <div style={{ position: 'absolute', top: '32px', left: '32px', width: '48px', height: '1px', backgroundColor: '#000' }}></div>
                <div style={{ position: 'absolute', top: '32px', left: '32px', width: '1px', height: '48px', backgroundColor: '#000' }}></div>
                <div style={{ position: 'absolute', bottom: '32px', right: '32px', width: '48px', height: '1px', backgroundColor: '#000' }}></div>
                <div style={{ position: 'absolute', bottom: '32px', right: '32px', width: '1px', height: '48px', backgroundColor: '#000' }}></div>
              </motion.div>
            </motion.div>

            <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
               viewport={{ once: true }}
               style={{
                 position: 'absolute',
                 bottom: '-24px',
                 right: '-24px',
                 backgroundColor: '#000',
                 color: '#fff',
                 padding: '16px 32px',
                 zIndex: 10
               }}
            >
              <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Est. 2014</span>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: STAGGERED TEXT REVEAL --- */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', paddingTop: isMobile ? '0' : '32px' }}>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={maskContainerVariant}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
                {/* Label */}
                <motion.div variants={fadeInUpVariant} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '1px', backgroundColor: '#000' }}></div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280' }}>Who We Are</span>
                </motion.div>

                {/* Headline */}
                <h2 style={{ 
                  fontSize: isMobile ? '48px' : '72px', 
                  fontWeight: 300, 
                  lineHeight: 0.95, 
                  letterSpacing: '-0.025em',
                  margin: 0
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div variants={maskChildVariant}>About</motion.div>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div variants={maskChildVariant} style={{ fontWeight: 'bold' }}>MAXO.</motion.div>
                  </div>
                </h2>

                {/* Description */}
                <div style={{ 
                  fontSize: isMobile ? '20px' : '24px', 
                  lineHeight: 1.6, 
                  color: '#4b5563', 
                  maxWidth: '672px', 
                  fontWeight: 300 
                }}>
                  <div style={{ overflow: 'hidden' }}>
                     <motion.div variants={maskChildVariant}>
                      We are a forward-thinking architecture studio committed to transforming spaces into meaningful experiences.
                     </motion.div>
                  </div>
                  <div style={{ overflow: 'hidden', marginTop: '8px' }}>
                     <motion.div variants={maskChildVariant}>
                      Blending <span style={{ color: '#000', fontWeight: 500 }}>innovation</span> with timeless aesthetics.
                     </motion.div>
                  </div>
                </div>

                {/* Stats Grid */}
                <motion.div variants={fadeInUpVariant} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '32px', 
                  borderTop: '1px solid rgba(0,0,0,0.1)', 
                  paddingTop: '48px', 
                  marginTop: '16px' 
                }}>
                  {/* Stat 1 */}
                  <div>
                    <h3 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', margin: 0 }}>
                      <AnimatedCounter from={0} to={120} /><span style={{ fontSize: '24px', verticalAlign: 'top', color: '#9ca3af' }}>+</span>
                    </h3>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', margin: 0 }}>Projects</p>
                  </div>
                  {/* Stat 2 */}
                  <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '32px' }}>
                    <h3 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', margin: 0 }}>
                      <AnimatedCounter from={0} to={85} /><span style={{ fontSize: '24px', verticalAlign: 'top', color: '#9ca3af' }}>+</span>
                    </h3>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', margin: 0 }}>Happy Clients</p>
                  </div>
                  {/* Stat 3 */}
                  <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '32px' }}>
                    <h3 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', margin: 0 }}>
                      <AnimatedCounter from={0} to={42} />
                    </h3>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', margin: 0 }}>Design Awards</p>
                  </div>
                </motion.div>
                
                {/* CTA Button */}
                <motion.div variants={fadeInUpVariant} style={{ marginTop: '32px' }}>
                   <button 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      fontSize: '14px', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      padding: 0,
                      color: '#000'
                    }}
                    className="group"
                   >
                     Read Our Full Story
                     <div style={{ 
                       backgroundColor: '#000', 
                       color: '#fff', 
                       padding: '8px', 
                       borderRadius: '50%', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center',
                       transition: 'transform 0.3s ease'
                     }}
                     className="arrow-icon"
                     >
                       <ArrowUpRight size={16} />
                     </div>
                   </button>
                   <style>{`
                     .group:hover { opacity: 0.6; }
                     .group:hover .arrow-icon { transform: rotate(45deg); }
                   `}</style>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
