import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * The real Anchor's Space cup photo, floating with parallax + glow.
 * Save the cup photo to /public/cup.png (transparent or dark background — both blend).
 */
export default function CupImage({ src = '/cup.png', className = '', glow = 0.55, alt = "Anchor's Space cup" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 14 });

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Ember radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 55%, rgba(201,123,74,${glow * 0.55}), transparent 60%)`,
          filter: 'blur(40px)'
        }}
      />
      {/* Floor shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-6 rounded-full bg-black/70 blur-2xl" />

      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
      />
    </div>
  );
}
