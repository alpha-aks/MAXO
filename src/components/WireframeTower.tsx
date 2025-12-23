import React from 'react';
import { motion } from 'framer-motion';

interface WireframeTowerProps {
  className?: string;
}

const paths: string[] = [
  // outer silhouette (tapering)
  'M100 780 L90 600 L85 480 L82 360 L80 240 L78 150 L76 90 L74 60 L72 40 L70 20',
  'M100 780 L110 600 L115 480 L118 360 L120 240 L122 150 L124 90 L126 60 L128 40 L130 20',
  // central spire
  'M100 20 L100 0',
  // internal vertical grid lines
  'M92 780 L92 240',
  'M96 780 L96 300',
  'M100 780 L100 200',
  'M104 780 L104 300',
  'M108 780 L108 240',
  // cross-sections (floors)
  'M70 600 L130 600',
  'M76 520 L124 520',
  'M78 440 L122 440',
  'M80 360 L120 360',
  'M82 280 L118 280',
  'M84 200 L116 200',
  'M86 140 L114 140',
];

export default function WireframeTower({ className }: WireframeTowerProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 200 800"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        style={{ overflow: 'visible' }}
        aria-hidden
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="black"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3.5, ease: [0.33, 1, 0.68, 1], delay: i * 0.12 }}
          />
        ))}
        {/* small decorative diagonal lines near base */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}>
          <path d="M72 720 L78 700" stroke="black" strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M128 720 L122 700" stroke="black" strokeWidth={1.2} fill="none" strokeLinecap="round" />
        </motion.g>
      </svg>
    </div>
  );
}
