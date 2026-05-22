import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const DOCK = [
  { to: '/',           icon: 'home',       label: 'Home' },
  { to: '/menu',       icon: 'coffee',     label: 'Bar' },
  { to: '/workspace',  icon: 'calendar',   label: 'Book' },
  { to: '/merch',      icon: 'merch',      label: 'Shop' },
  { to: '/account',    icon: 'account',    label: 'Me', fallback: '/contact' }
];

export default function MobileDock() {
  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-anchor-coal/85 backdrop-blur-xl border border-anchor-stone/60 rounded-full px-3 py-2 flex items-center gap-1 shadow-2xl">
      {DOCK.map(d => (
        <NavLink
          key={d.to}
          to={d.fallback || d.to}
          end={d.to === '/'}
          className={({ isActive }) => `relative px-3 py-2 rounded-full flex flex-col items-center gap-0.5 transition-colors ${isActive ? 'text-anchor-void bg-anchor-cream' : 'text-anchor-cream hover:text-anchor-gold'}`}
        >
          <Icon name={d.icon} size={20} />
          <span className="text-[9px] tracking-[0.18em] uppercase">{d.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
