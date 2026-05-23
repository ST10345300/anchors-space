import React, { useState } from 'react';

/**
 * Clean cup image — rounded corners, object-cover, lazy-loaded with fade-in.
 */
export default function CupImage({ src = '/cup.webp', className = '', alt = "Anchor's Space cup", eager = false }) {
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
        className={`w-full h-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
