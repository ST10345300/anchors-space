import React from 'react';
import { motion } from 'framer-motion';

/**
 * Anchor's Space icon system — thin-line, rounded caps, currentColor.
 * All icons share viewBox 0 0 32 32 and stroke-width 1.25 for a consistent look.
 * Wrap with <Icon name="home" size={28} className="text-anchor-cream" /> for
 * a hover-glow + lift micro-interaction.
 */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const ICONS = {
  // NAV ----------------------------------------------------------------
  home: (
    <>
      <path {...S} d="M5 14 L16 5 L27 14" />
      <path {...S} d="M7 13 V26 H25 V13" />
      <path {...S} d="M14 26 V19 H18 V26" />
    </>
  ),
  about: (
    <>
      <circle {...S} cx="16" cy="16" r="11" />
      <line {...S} x1="16" y1="14" x2="16" y2="22" />
      <circle cx="16" cy="10.5" r="1.2" fill="currentColor" />
    </>
  ),
  coffee: (
    <>
      <path {...S} d="M7 12 H22 V20 A4 4 0 0 1 18 24 H11 A4 4 0 0 1 7 20 Z" />
      <path {...S} d="M22 14 H25 A2.5 2.5 0 0 1 25 19 H22" />
      <path {...S} d="M11 6 C 11 8 13 8 13 10" />
      <path {...S} d="M15 6 C 15 8 17 8 17 10" />
      <path {...S} d="M19 6 C 19 8 21 8 21 10" />
    </>
  ),
  study: (
    <>
      <path {...S} d="M8 6 V26" />
      <path {...S} d="M24 6 V26" />
      <path {...S} d="M8 6 L24 6" />
      <path {...S} d="M8 26 L24 26" />
      <path {...S} d="M12 11 L20 11" />
      <path {...S} d="M12 15 L20 15" />
      <path {...S} d="M12 19 L18 19" />
    </>
  ),
  calendar: (
    <>
      <rect {...S} x="5" y="7" width="22" height="20" rx="2" />
      <line {...S} x1="5" y1="12" x2="27" y2="12" />
      <line {...S} x1="11" y1="4" x2="11" y2="9" />
      <line {...S} x1="21" y1="4" x2="21" y2="9" />
      <circle cx="10" cy="17" r="1.1" fill="currentColor" />
      <circle cx="16" cy="17" r="1.1" fill="currentColor" />
      <circle cx="22" cy="17" r="1.1" fill="currentColor" />
      <circle cx="10" cy="22" r="1.1" fill="currentColor" />
      <circle cx="16" cy="22" r="1.1" fill="currentColor" />
    </>
  ),
  membership: (
    <>
      <rect {...S} x="4" y="8" width="24" height="16" rx="2" />
      <circle {...S} cx="11" cy="15" r="2.5" />
      <path {...S} d="M7 21 C 8 18 14 18 15 21" />
      <line {...S} x1="18" y1="14" x2="24" y2="14" />
      <line {...S} x1="18" y1="18" x2="22" y2="18" />
    </>
  ),
  merch: (
    <>
      <path {...S} d="M8 11 L8 24 A2 2 0 0 0 10 26 H22 A2 2 0 0 0 24 24 V11" />
      <path {...S} d="M8 11 H24 L23 8 H9 Z" />
      <path {...S} d="M13 14 a3 3 0 0 0 6 0" />
      {/* anchor mark on bag */}
      <circle {...S} cx="16" cy="20" r="0.9" />
      <line {...S} x1="16" y1="20.9" x2="16" y2="23" />
    </>
  ),
  gallery: (
    <>
      <rect {...S} x="5" y="7" width="22" height="18" rx="2" />
      <path {...S} d="M5 21 L12 15 L17 19 L22 14 L27 19" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </>
  ),
  contact: (
    <>
      <path {...S} d="M8 6 H12 L14 11 L11 13 C 12 17 15 20 19 21 L21 18 L26 20 V24 A2 2 0 0 1 24 26 C 13 26 6 19 6 8 A2 2 0 0 1 8 6 Z" />
    </>
  ),
  location: (
    <>
      <path {...S} d="M16 4 C 10 4 6 8 6 14 C 6 20 16 28 16 28 C 16 28 26 20 26 14 C 26 8 22 4 16 4 Z" />
      <circle {...S} cx="16" cy="14" r="3" />
    </>
  ),
  community: (
    <>
      <circle {...S} cx="11" cy="12" r="3" />
      <circle {...S} cx="21" cy="12" r="3" />
      <path {...S} d="M5 23 C 6 19 16 19 17 23" />
      <path {...S} d="M15 23 C 16 19 26 19 27 23" />
    </>
  ),
  wifi: (
    <>
      <path {...S} d="M4 12 C 11 5 21 5 28 12" />
      <path {...S} d="M8 16 C 13 11 19 11 24 16" />
      <path {...S} d="M12 20 C 15 17 17 17 20 20" />
      <circle cx="16" cy="24" r="1.4" fill="currentColor" />
    </>
  ),
  power: (
    <>
      <path {...S} d="M14 4 L11 14 H16 L13 28 L21 16 H16 L19 4 Z" />
    </>
  ),
  lockers: (
    <>
      <rect {...S} x="7" y="4" width="18" height="24" rx="1.5" />
      <line {...S} x1="16" y1="4" x2="16" y2="28" />
      <line {...S} x1="11" y1="11" x2="13" y2="11" />
      <line {...S} x1="19" y1="11" x2="21" y2="11" />
      <line {...S} x1="11" y1="20" x2="13" y2="20" />
      <line {...S} x1="19" y1="20" x2="21" y2="20" />
    </>
  ),
  quiet: (
    <>
      <path {...S} d="M9 13 C 9 9 12 6 16 6 C 20 6 23 9 23 13 V16 L26 19 H6 L9 16 Z" />
      <path {...S} d="M13 22 C 14 24 18 24 19 22" />
    </>
  ),
  hours: (
    <>
      <circle {...S} cx="16" cy="16" r="11" />
      <path {...S} d="M16 9 V16 L21 19" />
    </>
  ),

  // USER ---------------------------------------------------------------
  login: (
    <>
      <circle {...S} cx="16" cy="12" r="4" />
      <path {...S} d="M6 26 C 8 20 24 20 26 26" />
    </>
  ),
  signup: (
    <>
      <circle {...S} cx="13" cy="12" r="4" />
      <path {...S} d="M3 26 C 5 20 21 20 23 26" />
      <line {...S} x1="25" y1="9" x2="25" y2="15" />
      <line {...S} x1="22" y1="12" x2="28" y2="12" />
    </>
  ),
  account: (
    <>
      <circle {...S} cx="16" cy="16" r="11" />
      <circle {...S} cx="16" cy="13" r="3.5" />
      <path {...S} d="M9 24 C 10 20 22 20 23 24" />
    </>
  ),
  payment: (
    <>
      <rect {...S} x="4" y="8" width="24" height="16" rx="2" />
      <line {...S} x1="4" y1="13" x2="28" y2="13" />
      <line {...S} x1="8" y1="19" x2="14" y2="19" />
    </>
  ),
  cart: (
    <>
      <path {...S} d="M4 6 H7 L10 22 H24 L26 11 H10" />
      <circle {...S} cx="12" cy="26" r="1.6" />
      <circle {...S} cx="22" cy="26" r="1.6" />
    </>
  ),
  wishlist: (
    <>
      <path {...S} d="M16 26 C 6 19 4 13 8 9 C 12 5 16 9 16 11 C 16 9 20 5 24 9 C 28 13 26 19 16 26 Z" />
    </>
  ),
  rewards: (
    <>
      <path {...S} d="M6 10 L8 6 H24 L26 10 L16 22 Z" />
      <line {...S} x1="6" y1="10" x2="26" y2="10" />
      <line {...S} x1="12" y1="10" x2="16" y2="6" />
      <line {...S} x1="20" y1="10" x2="16" y2="6" />
      <line {...S} x1="12" y1="10" x2="16" y2="22" />
      <line {...S} x1="20" y1="10" x2="16" y2="22" />
    </>
  ),
  offers: (
    <>
      <path {...S} d="M5 13 V19 H8 V22 L16 26 L24 22 V19 H27 V13 H24 V10 L16 6 L8 10 V13 Z" />
      <line {...S} x1="13" y1="14" x2="19" y2="20" />
      <circle cx="13" cy="14" r="1.2" fill="currentColor" />
      <circle cx="19" cy="20" r="1.2" fill="currentColor" />
    </>
  ),

  // COFFEE BAR ---------------------------------------------------------
  favorite: (
    <>
      <path {...S} d="M16 5 L19 12 L26 13 L21 18 L22 25 L16 22 L10 25 L11 18 L6 13 L13 12 Z" />
    </>
  ),
  notifications: (
    <>
      <path {...S} d="M8 21 V14 A8 8 0 0 1 24 14 V21 L26 23 H6 Z" />
      <path {...S} d="M13 26 C 14 28 18 28 19 26" />
    </>
  ),
  order: (
    <>
      <path {...S} d="M10 11 H22 L20 26 H12 Z" />
      <line {...S} x1="11" y1="11" x2="13" y2="6" />
      <line {...S} x1="21" y1="11" x2="19" y2="6" />
    </>
  ),
  food: ( // croissant
    <>
      <path {...S} d="M5 19 C 8 22 24 22 27 19 C 24 13 8 13 5 19 Z" />
      <line {...S} x1="11" y1="15" x2="12" y2="22" />
      <line {...S} x1="16" y1="14" x2="16" y2="22" />
      <line {...S} x1="21" y1="15" x2="20" y2="22" />
    </>
  ),
  beans: (
    <>
      <ellipse {...S} cx="13" cy="16" rx="4.5" ry="7" transform="rotate(-18 13 16)" />
      <path {...S} d="M11 11 C 12 14 14 18 14 21" transform="rotate(-18 13 16)" />
      <ellipse {...S} cx="20" cy="16" rx="4.5" ry="7" transform="rotate(18 20 16)" />
      <path {...S} d="M18 11 C 19 14 21 18 21 21" transform="rotate(18 20 16)" />
    </>
  ),
  drinks: ( // takeaway cup
    <>
      <path {...S} d="M10 11 H22 L20 26 H12 Z" />
      <path {...S} d="M9 11 H23 L22 8 H10 Z" />
      <line {...S} x1="14" y1="8" x2="14" y2="6" />
      <line {...S} x1="18" y1="8" x2="18" y2="6" />
    </>
  ),
  desserts: ( // cake slice
    <>
      <path {...S} d="M6 22 L16 8 L26 22 Z" />
      <path {...S} d="M9 18 L23 18" />
      <circle cx="16" cy="11" r="1.2" fill="currentColor" />
    </>
  ),
  menu: (
    <>
      <line {...S} x1="6" y1="11" x2="26" y2="11" />
      <line {...S} x1="6" y1="16" x2="26" y2="16" />
      <line {...S} x1="6" y1="21" x2="26" y2="21" />
    </>
  ),
  mug: (
    <>
      <path {...S} d="M7 10 H21 V22 A3 3 0 0 1 18 25 H10 A3 3 0 0 1 7 22 Z" />
      <path {...S} d="M21 13 H24 A2.5 2.5 0 0 1 24 18 H21" />
    </>
  ),

  // SPACES -------------------------------------------------------------
  seating: ( // armchair
    <>
      <path {...S} d="M7 14 V21 H25 V14" />
      <path {...S} d="M7 14 C 7 11 10 11 10 14 V19 H22 V14 C 22 11 25 11 25 14" />
      <line {...S} x1="10" y1="21" x2="10" y2="25" />
      <line {...S} x1="22" y1="21" x2="22" y2="25" />
    </>
  ),
  singlePod: (
    <>
      <path {...S} d="M8 26 V10 L16 6 L24 10 V26" />
      <line {...S} x1="16" y1="12" x2="16" y2="26" />
    </>
  ),
  groupPod: (
    <>
      <circle {...S} cx="16" cy="16" r="3" />
      <path {...S} d="M11 12 H8 V20 H11" />
      <path {...S} d="M21 12 H24 V20 H21" />
      <circle {...S} cx="11" cy="11" r="2" />
      <circle {...S} cx="21" cy="11" r="2" />
    </>
  ),
  privateRoom: (
    <>
      <path {...S} d="M8 6 V26 H22 V6 Z" />
      <circle cx="19" cy="16" r="1" fill="currentColor" />
    </>
  ),
  openHall: ( // desk lamp
    <>
      <path {...S} d="M10 7 L18 11 L14 18 L6 14 Z" />
      <line {...S} x1="14" y1="18" x2="16" y2="22" />
      <path {...S} d="M14 25 H22" />
      <line {...S} x1="16" y1="22" x2="20" y2="22" />
    </>
  ),
  workspace: (
    <>
      <rect {...S} x="5" y="7" width="22" height="14" rx="1.5" />
      <line {...S} x1="11" y1="25" x2="21" y2="25" />
      <line {...S} x1="16" y1="21" x2="16" y2="25" />
    </>
  ),

  // MEMBERSHIP / PASSES ------------------------------------------------
  studentPass: (
    <>
      <path {...S} d="M4 13 L16 8 L28 13 L16 18 Z" />
      <line {...S} x1="22" y1="14.5" x2="22" y2="20" />
      <path {...S} d="M9 16 V22 C 11 25 21 25 23 22 V16" />
    </>
  ),
  nightPass: (
    <>
      <path {...S} d="M22 18 A8 8 0 1 1 14 8 A6.5 6.5 0 0 0 22 18 Z" />
      <circle cx="25" cy="9" r="0.8" fill="currentColor" />
      <circle cx="22" cy="6" r="0.6" fill="currentColor" />
    </>
  ),
  premium: ( // crown
    <>
      <path {...S} d="M5 22 L7 10 L13 16 L16 8 L19 16 L25 10 L27 22 Z" />
      <line {...S} x1="5" y1="22" x2="27" y2="22" />
    </>
  ),
  focusTimer: (
    <>
      <circle {...S} cx="16" cy="18" r="9" />
      <line {...S} x1="13" y1="5" x2="19" y2="5" />
      <line {...S} x1="16" y1="5" x2="16" y2="9" />
      <line {...S} x1="16" y1="18" x2="16" y2="13" />
      <line {...S} x1="16" y1="18" x2="20" y2="18" />
    </>
  ),

  // STORE --------------------------------------------------------------
  notebook: (
    <>
      <rect {...S} x="7" y="5" width="18" height="22" rx="1.5" />
      <line {...S} x1="11" y1="5" x2="11" y2="27" />
      <line {...S} x1="14" y1="10" x2="22" y2="10" />
      <line {...S} x1="14" y1="14" x2="22" y2="14" />
      <line {...S} x1="14" y1="18" x2="22" y2="18" />
    </>
  ),
  hoodie: (
    <>
      <path {...S} d="M6 14 L11 8 C 12 11 20 11 21 8 L26 14 L23 17 V25 H9 V17 Z" />
      <path {...S} d="M12 9 C 13 11 19 11 20 9" />
      <line {...S} x1="14" y1="14" x2="14" y2="22" />
      <line {...S} x1="18" y1="14" x2="18" y2="22" />
    </>
  ),
  apparel: ( // tshirt
    <>
      <path {...S} d="M6 11 L11 6 L13 9 H19 L21 6 L26 11 L23 15 V25 H9 V15 Z" />
    </>
  ),
  bottle: (
    <>
      <path {...S} d="M13 5 H19 V8 L21 11 V25 A2 2 0 0 1 19 27 H13 A2 2 0 0 1 11 25 V11 Z" />
      <line {...S} x1="11" y1="14" x2="21" y2="14" />
    </>
  ),
  coffeeBags: (
    <>
      <path {...S} d="M9 9 L23 9 L25 27 H7 Z" />
      <line {...S} x1="9" y1="9" x2="11" y2="6" />
      <line {...S} x1="23" y1="9" x2="21" y2="6" />
      <line {...S} x1="11" y1="6" x2="21" y2="6" />
      <line {...S} x1="13" y1="14" x2="19" y2="14" />
    </>
  ),

  // BRANDMARK ----------------------------------------------------------
  anchor: (
    <>
      <path d="M16 4 L17.2 7.4 L20.8 7.5 L17.9 9.7 L19 13.1 L16 11 L13 13.1 L14.1 9.7 L11.2 7.5 L14.8 7.4 Z" fill="currentColor" />
      <circle {...S} cx="16" cy="15" r="1.6" />
      <line {...S} x1="16" y1="17" x2="16" y2="26" />
      <line {...S} x1="11" y1="19" x2="21" y2="19" />
      <path {...S} d="M7 23 Q 16 30 25 23" />
      <path d="M7 23 L 5 20 L 9 21 Z" fill="currentColor" />
      <path d="M25 23 L 27 20 L 23 21 Z" fill="currentColor" />
    </>
  )
};

export default function Icon({ name, size = 24, className = '', strokeWidth, ...rest }) {
  const content = ICONS[name];
  if (!content) {
    if (typeof console !== 'undefined') console.warn(`[Icon] Unknown name: ${name}`);
    return null;
  }
  // Optional per-instance stroke override
  const styled = strokeWidth
    ? React.Children.map(content.props.children || content, (child) => child)
    : content;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`inline-block transition-[filter,transform] duration-300 ease-out hover:[filter:drop-shadow(0_0_10px_rgba(198,168,125,0.55))] hover:-translate-y-0.5 ${className}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {styled}
    </motion.svg>
  );
}

export const ICON_NAMES = Object.keys(ICONS);
