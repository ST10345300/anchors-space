import React from 'react';
import Section from '../components/Section';
import AvatarImage from '../components/AvatarImage';
import Icon from '../components/Icon';

const BELIEFS = [
  { i: 'quiet',      t: 'Quiet is a feature',  d: 'We protect silence the way other places protect Wi-Fi passwords.' },
  { i: 'beans',      t: 'Coffee is craft',     d: 'Every cup is weighed, timed, and tasted. No shortcuts at the bar.' },
  { i: 'studentPass',t: 'Students first',      d: 'Discounted refills, free water, slow tables — defaults built around you.' },
];

const TIMELINE = [
  { y: '2022', i: 'coffee',    t: 'A stovetop and a thesis', d: 'Anchor\'s Space began in a dorm kitchen with a moka pot and a half-finished thesis.' },
  { y: '2023', i: 'community', t: 'The first studio',         d: 'Six tables, one espresso machine, a hand-painted anchor on the wall.' },
  { y: '2024', i: 'study',     t: 'Pods, rooms, mezzanine',   d: 'We added quiet zones, private rooms, and the silent mezzanine.' },
  { y: '2025', i: 'premium',   t: 'Memberships launch',       d: 'Student, Creator, Night Owl and Unlimited Focus passes go live.' },
];

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <Section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="about" size={14} />
            Our Story
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">
            Built by students,<br /> for the long study nights.
          </h1>
          <p className="mt-6 text-anchor-mist leading-relaxed max-w-lg">
            Anchor&apos;s Space began in a dorm kitchen with a stovetop moka pot and a half-finished thesis. We wanted a place that respected silence, took coffee seriously, and gave students room to think.
          </p>
          <p className="mt-4 text-anchor-mist leading-relaxed max-w-lg">
            Today, our studio is part café, part library, part launch pad. Everything is intentional — the warm cream tones, the slow music, the way light falls on your laptop at 4pm.
          </p>
        </div>
        <div className="h-[70vh] relative">
          <AvatarImage src="/avatars/cross-legged.png" glow={0.7} className="absolute inset-0" />
          <Icon name="anchor" size={420} className="absolute inset-0 m-auto text-anchor-cream/[0.04] pointer-events-none" />
        </div>
      </Section>

      {/* BELIEFS */}
      <Section className="py-16">
        <h2 className="font-display text-3xl md:text-4xl text-anchor-paper mb-12">What we believe</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {BELIEFS.map(b => (
            <div key={b.t} className="relative p-8 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60 hover:border-anchor-gold/50 transition-colors overflow-hidden">
              <Icon name={b.i} size={180} className="absolute -right-6 -bottom-8 text-anchor-cream/[0.04] pointer-events-none" />
              <Icon name={b.i} size={28} className="text-anchor-gold mb-5" />
              <h3 className="font-display text-xl text-anchor-paper mb-2">{b.t}</h3>
              <p className="text-anchor-mist leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section className="py-20">
        <div className="flex items-center gap-3 mb-12">
          <Icon name="hours" size={22} className="text-anchor-gold" />
          <h2 className="font-display text-3xl md:text-4xl text-anchor-paper">A short timeline</h2>
        </div>
        <div className="relative grid md:grid-cols-4 gap-4">
          <div className="hidden md:block absolute left-0 right-0 top-7 h-px bg-anchor-stone/60" />
          {TIMELINE.map(t => (
            <div key={t.y} className="relative p-6 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-anchor-gold">{t.y}</span>
                <Icon name={t.i} size={20} className="text-anchor-cream" />
              </div>
              <h3 className="font-display text-anchor-paper">{t.t}</h3>
              <p className="text-sm text-anchor-mist mt-2 leading-relaxed">{t.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
