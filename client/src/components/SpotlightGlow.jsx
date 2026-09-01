import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const SpotlightGlow = () => {
  const mouseX = useSpring(0, { damping: 40, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 40, stiffness: 200 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[120px] will-change-transform"
      />
    </div>
  );
};

export default SpotlightGlow;
