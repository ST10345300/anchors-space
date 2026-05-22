import React from 'react';

/**
 * The Anchor's Space brandmark: star + anchor, scalable SVG.
 * Stroke + fill use currentColor so you can tint via Tailwind text-* classes.
 */
export default function AnchorMark({ className = '', size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Star */}
      <path
        d="M32 4 L34.2 10.4 L41 10.6 L35.6 14.8 L37.6 21.2 L32 17.4 L26.4 21.2 L28.4 14.8 L23 10.6 L29.8 10.4 Z"
        fill="currentColor"
      />
      {/* Anchor ring */}
      <circle cx="32" cy="26" r="3" stroke="currentColor" strokeWidth="2.4" />
      {/* Shaft */}
      <line x1="32" y1="29" x2="32" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="22" y1="33" x2="42" y2="33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Curved flukes */}
      <path
        d="M16 46 Q 32 60 48 46"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Fluke tips */}
      <path d="M16 46 L 12 41 L 19 43 Z" fill="currentColor" />
      <path d="M48 46 L 52 41 L 45 43 Z" fill="currentColor" />
    </svg>
  );
}
