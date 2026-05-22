import React, { useState } from 'react';
import Section from '../components/Section';
import AvatarImage from '../components/AvatarImage';
import CupImage from '../components/CupImage';
import Icon from '../components/Icon';

const HOURS = [
  ['Mon — Thu', '07:00 — 22:00'],
  ['Fri',       '07:00 — 23:00'],
  ['Sat',       '08:00 — 23:00'],
  ['Sun',       '08:00 — 21:00']
];

const CHANNELS = [
  { i: 'location', t: '21 Quiet Lane, Campus East' },
  { i: 'contact',  t: '+27 21 555 0142' },
  { i: 'about',    t: 'hello@anchorsspace.co' }
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  }

  return (
    <div className="pt-32 pb-24">
      <Section className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="contact" size={14} />
            Say Hi
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">
            Pull up a seat<br /> at the anchor.
          </h1>
          <p className="mt-6 text-anchor-mist leading-relaxed max-w-lg">
            Reserve a pod, plan a study group, or just send us a quick hello. We usually reply within a few hours over a fresh pot.
          </p>

          <div className="mt-10 space-y-3">
            {CHANNELS.map(c => (
              <div key={c.t} className="flex items-center gap-3 text-anchor-paper">
                <div className="w-10 h-10 grid place-items-center rounded-xl bg-anchor-coal border border-anchor-stone/60">
                  <Icon name={c.i} size={18} className="text-anchor-gold" />
                </div>
                <span className="text-sm">{c.t}</span>
              </div>
            ))}
          </div>

          {/* Hours card */}
          <div className="mt-8 p-6 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="hours" size={18} className="text-anchor-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold">Opening hours</span>
            </div>
            <ul className="space-y-2">
              {HOURS.map(([d, h]) => (
                <li key={d} className="flex justify-between text-sm">
                  <span className="text-anchor-mist">{d}</span>
                  <span className="text-anchor-paper">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="mt-10 space-y-3 max-w-md">
            <div className="relative">
              <Icon name="account" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
              <input required type="text" placeholder="Your name" className="w-full bg-anchor-coal border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold transition-colors" />
            </div>
            <div className="relative">
              <Icon name="contact" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
              <input required type="email" placeholder="Email" className="w-full bg-anchor-coal border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold transition-colors" />
            </div>
            <div className="relative">
              <Icon name="menu" size={16} className="absolute left-4 top-4 text-anchor-mist" />
              <textarea required rows="4" placeholder="What's brewing?" className="w-full bg-anchor-coal border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium hover:bg-anchor-gold transition-colors">
              <Icon name="notifications" size={16} />
              {sent ? 'Sent — thanks for writing in' : 'Send message'}
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="h-[60vh] relative">
            <AvatarImage src="/avatars/drinking.png" glow={0.7} className="absolute inset-0 z-10" />
            <CupImage className="absolute top-10 -right-4 w-36 h-48 z-20" glow={0.65} />
          </div>

          {/* Map card */}
          <div className="mt-6 rounded-2xl border border-anchor-stone/60 bg-anchor-coal/60 overflow-hidden">
            <div className="relative aspect-[16/10]">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(198,168,125,0.10), transparent 55%), linear-gradient(160deg, #141416 0%, #0F0F10 70%)' }} />
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(245,239,230,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,230,0.05) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
                <div className="w-14 h-14 grid place-items-center rounded-full bg-anchor-cream text-anchor-void shadow-2xl">
                  <Icon name="location" size={24} />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-anchor-void/80 border border-anchor-stone/60 text-[10px] tracking-[0.3em] uppercase text-anchor-cream">Anchor&apos;s Space</div>
              </div>
            </div>
            <div className="p-4 border-t border-anchor-stone/60 flex items-center justify-between">
              <span className="text-xs text-anchor-mist">Campus East · 4 min from station</span>
              <button className="inline-flex items-center gap-2 text-xs text-anchor-cream hover:text-anchor-gold">
                <Icon name="location" size={14} /> Open in Maps
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
