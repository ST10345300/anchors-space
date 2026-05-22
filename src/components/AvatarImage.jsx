import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Floating brand-avatar PNG that blends into the dark page.
 * - radial ember glow behind
 * - soft drop shadow + slight mask-fade at the feet
 * - parallax tilt on mouse move
 */
export default function AvatarImage({ src, alt = 'Anchors Space avatar', className = '', glow = 0.55 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 14 });

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
          background: `radial-gradient(circle at 50% 55%, rgba(201,123,74,${glow * 0.5}), transparent 55%)`,
          filter: 'blur(30px)'
        }}
      />
      {/* Floor shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-6 rounded-full bg-black/60 blur-2xl" />

      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
      />

      {/* Feet fade into the page */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-anchor-void to-transparent pointer-events-none" />
    </div>
  );
}
