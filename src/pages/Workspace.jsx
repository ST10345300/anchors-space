import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import AvatarImage from '../components/AvatarImage';
import CupImage from '../components/CupImage';
import Icon from '../components/Icon';

const ZONES = [
  { n: 'Single Pod',     icon: 'singlePod',   s: '24 seats', d: 'Solo focus capsule. Acoustic walls, soft pendant, plug at the desk.' },
  { n: 'Group Pod',      icon: 'groupPod',    s: '6 pods',   d: 'Bookable 4-person room with whiteboard wall and a TV.' },
  { n: 'Open Hall',      icon: 'openHall',    s: '40 seats', d: 'Long oak desks with built-in plugs and adjustable lamps.' },
  { n: 'Private Room',   icon: 'privateRoom', s: '3 rooms',  d: 'Door closes, world quiets. Ideal for calls, deep edits or interviews.' },
  { n: 'Reading Lounge', icon: 'seating',     s: '18 seats', d: 'Sink into a chair. Quiet conversation welcome.' },
  { n: 'Quiet Mezzanine',icon: 'quiet',       s: '24 seats', d: 'Library-quiet. Headphones encouraged. Pendant lighting only.' },
];

const TIMES = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

export default function Workspace() {
  const [zone, setZone] = useState(ZONES[0]);
  const [time, setTime] = useState('10:00');

  return (
    <div className="pt-32 pb-24">
      <Section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="study" size={14} />
            Study Spaces
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">
            A room shaped<br /> around <span className="text-anchor-gold">deep work.</span>
          </h1>
          <p className="mt-6 text-anchor-mist leading-relaxed max-w-lg">
            Six distinct zones, each tuned for a different kind of focus. Pick the one that matches your mood — or move between them as the day shifts.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anchor-coal border border-anchor-stone/60 text-xs text-anchor-paper"><Icon name="wifi" size={14} className="text-anchor-gold" /> 1 Gbps</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anchor-coal border border-anchor-stone/60 text-xs text-anchor-paper"><Icon name="power" size={14} className="text-anchor-gold" /> Plug at every seat</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anchor-coal border border-anchor-stone/60 text-xs text-anchor-paper"><Icon name="lockers" size={14} className="text-anchor-gold" /> Day lockers</span>
          </div>
        </div>
        <div className="h-[70vh] relative">
          <AvatarImage src="/avatars/sitting-laptop.png" glow={0.7} className="absolute inset-0 z-10" />
          <CupImage className="absolute top-6 -left-2 w-32 h-44 z-20" glow={0.6} />
        </div>
      </Section>

      {/* ZONE GRID */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ZONES.map((z, i) => (
            <motion.button
              key={z.n}
              onClick={() => setZone(z)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`relative text-left p-7 rounded-2xl border transition-all overflow-hidden ${zone.n === z.n ? 'bg-gradient-to-b from-anchor-gold/10 to-anchor-coal border-anchor-gold/50' : 'bg-anchor-coal/60 border-anchor-stone/60 hover:border-anchor-gold/40'}`}
            >
              <Icon name={z.icon} size={180} className="absolute -right-6 -bottom-8 text-anchor-cream/[0.04] pointer-events-none" />
              <div className="flex items-center justify-between">
                <Icon name={z.icon} size={28} className="text-anchor-gold" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold">{z.s}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-anchor-paper">{z.n}</h3>
              <p className="mt-2 text-sm text-anchor-mist leading-relaxed">{z.d}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-anchor-paper text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-anchor-gold animate-pulse" />
                Available now
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* BOOKING UI */}
      <Section className="py-24">
        <div className="rounded-3xl border border-anchor-stone/60 bg-anchor-coal/60 p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Icon name="calendar" size={22} className="text-anchor-gold" />
            <h2 className="font-display text-2xl text-anchor-paper">Reserve a slot</h2>
            <span className="ml-auto inline-flex items-center gap-2 text-xs text-anchor-mist"><Icon name="hours" size={14} /> Today · 07:00 — 23:00</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold mb-3">Space</p>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-anchor-stone/60 bg-anchor-void">
                <Icon name={zone.icon} size={24} className="text-anchor-cream" />
                <div>
                  <p className="font-display text-anchor-paper">{zone.n}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-anchor-mist mt-0.5">{zone.s}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold mb-3">Time slot</p>
              <div className="flex flex-wrap gap-2">
                {TIMES.map(t => (
                  <button key={t} onClick={() => setTime(t)} className={`px-3.5 py-2 rounded-full text-xs transition-all ${time === t ? 'bg-anchor-cream text-anchor-void' : 'bg-anchor-void border border-anchor-stone/60 text-anchor-paper hover:border-anchor-gold/50'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3 text-anchor-mist text-sm">
              <Icon name="membership" size={16} className="text-anchor-gold" />
              Members ride free · Guests R45/hr
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-anchor-cream text-anchor-void font-medium hover:bg-anchor-gold transition-colors">
              <Icon name="calendar" size={16} /> Confirm Booking
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
