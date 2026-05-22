import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const cols = [
  {
    h: 'Explore',
    links: [
      { to: '/about', label: 'About',   icon: 'about' },
      { to: '/menu', label: 'Coffee Bar', icon: 'coffee' },
      { to: '/workspace', label: 'Study Spaces', icon: 'study' },
      { to: '/gallery', label: 'Gallery', icon: 'gallery' },
    ]
  },
  {
    h: 'Members',
    links: [
      { to: '/membership', label: 'Memberships', icon: 'membership' },
      { to: '/merch', label: 'Merch Store', icon: 'merch' },
      { to: '/workspace', label: 'Book a Pod', icon: 'calendar' },
      { to: '/contact', label: 'Contact', icon: 'contact' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="relative border-t border-anchor-stone/60 bg-anchor-coal/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Icon name="anchor" size={44} className="text-anchor-cream" />
            <div className="leading-tight">
              <div className="font-display text-xl tracking-[0.22em] uppercase text-anchor-paper">Anchor&apos;s Space</div>
              <div className="text-[10px] tracking-[0.42em] uppercase text-anchor-gold mt-1.5">Coffee · Focus · Purpose</div>
            </div>
          </div>
          <p className="mt-6 text-anchor-mist max-w-md leading-relaxed">
            A coffee & study studio for students, creators and quiet builders. Slow brews, fast Wi-Fi, deep focus.
          </p>
          <div className="mt-6 flex items-center gap-3 text-anchor-mist">
            <span className="inline-flex items-center gap-2 text-sm"><Icon name="hours" size={16} /> 07:00 — 23:00</span>
            <span className="w-1 h-1 rounded-full bg-anchor-stone" />
            <span className="inline-flex items-center gap-2 text-sm"><Icon name="wifi" size={16} /> 1 Gbps</span>
          </div>
        </div>

        {cols.map(c => (
          <div key={c.h}>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-anchor-gold mb-5">{c.h}</h4>
            <ul className="space-y-3">
              {c.links.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-2.5 text-sm text-anchor-mist hover:text-anchor-cream transition-colors">
                    <Icon name={l.icon} size={16} className="text-anchor-mist group-hover:text-anchor-cream" />
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-anchor-stone/60 py-6 text-center text-[11px] tracking-[0.3em] uppercase text-anchor-mist/70">
        © {new Date().getFullYear()} Anchor&apos;s Space · Coffee · Focus · Purpose
      </div>
    </footer>
  );
}
