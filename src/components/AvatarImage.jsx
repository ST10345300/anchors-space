import React, { useState } from 'react';

/**
 * Clean avatar image — rounded corners, crops from top, lazy-loaded with
 * a smooth fade-in once ready. No hover or animation effects.
 */
export default function AvatarImage({ src, alt = "Anchor's Space avatar", className = '', eager = false }) {
  const [ready, setReady] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl bg-anchor-coal ${className}`}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setReady(true)}
        className={`w-full h-full object-cover object-top transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
