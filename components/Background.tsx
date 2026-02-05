
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

const Background: React.FC = () => {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Softer springs to prevent jitter
  const springX = useSpring(mouseX, { damping: 60, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 60, stiffness: 100 });

  // Subtle scroll parallax
  const scrollY1 = useTransform(scrollY, [0, 5000], [0, -150]);
  const scrollY2 = useTransform(scrollY, [0, 5000], [0, 100]);

  // Combined transforms for smooth movement
  const blob1Y = useTransform([springY, scrollY1], ([y, s]) => Number(y) + Number(s));
  const blob2Y = useTransform([springX, scrollY2], ([x, s]) => Number(x) + Number(s));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPct = (clientX / window.innerWidth - 0.5) * 30;
      const yPct = (clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-parchment dark:bg-parchment-dark transition-colors duration-700">
      {/* Soft Watercolor Blobs */}
      <motion.div
        style={{ x: springX, y: blob1Y }}
        className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-rose/10 blur-[120px] will-change-transform"
      />
      <motion.div
        style={{ x: springY, y: blob2Y }}
        className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] rounded-full bg-sage/10 blur-[140px] will-change-transform"
      />

      {/* Grid Lines - Ledger style */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] text-ink dark:text-white transition-opacity duration-700">
        <svg width="100%" height="100%">
          <pattern id="ledger" width="100%" height="32" patternUnits="userSpaceOnUse">
            <line x1="0" y1="32" x2="100%" y2="32" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ledger)" />
        </svg>
      </div>
    </div>
  );
};

export default Background;
