import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import AvatarImage from '../components/AvatarImage';
import CupImage from '../components/CupImage';

import Icon from '../components/Icon';

const POSES = [
  { src: '/avatars/sitting-laptop.webp',  label: 'Deep Work',   icon: 'workspace' },
  { src: '/avatars/leaning.webp',         label: 'Studio Mode', icon: 'study' },
  { src: '/avatars/standing-cup.webp',    label: 'Coffee Run',  icon: 'coffee' },
  { src: '/avatars/drinking.webp',        label: 'First Sip',   icon: 'mug' },
  { src: '/avatars/sitting-cream.webp',   label: 'Focus Mode',  icon: 'nightPass' }
];

const PILLARS = [
  { icon: 'coffee',    t: 'Slow Brew Bar',  d: 'Single-origin pour-overs, espresso, and seasonal lattes — pulled by student baristas.' },
  { icon: 'study',     t: 'Studio Tables',  d: 'Solo nooks, group desks, and a silent reading mezzanine bathed in soft ember light.' },
  { icon: 'nightPass', t: 'Late Night Mode',d: 'After 21:00, lights dim, jazz drops in, and the studio belongs to the night-owls.' },
];

const QUICK = [
  { to: '/workspace',  icon: 'calendar',    t: 'Book a Pod' },
  { to: '/menu',       icon: 'order',       t: 'Order Coffee' },
  { to: '/workspace',  icon: 'singlePod',   t: 'Tour the Space' },
  { to: '/membership', icon: 'premium',     t: 'Memberships' },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative min-h-[92vh] grid lg:grid-cols-2 items-center px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="relative z-10 py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="anchor" size={14} />
            Coffee · Focus · Purpose
          </div>
          <h1 className="mt-7 font-display text-5xl md:text-7xl leading-[1.05] font-semibold text-anchor-paper">
            <span className="text-anchor-gold">Anchor</span> your day.<br />
            Brew your <span className="italic text-anchor-cream">purpose.</span>
          </h1>
          <p className="mt-6 max-w-md text-anchor-mist leading-relaxed">
            A quiet studio built for students, creators and quiet builders — slow-brewed coffee, fast Wi-Fi, deep focus.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/workspace" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-anchor-cream text-anchor-void font-medium hover:bg-anchor-gold transition-colors">
              <Icon name="calendar" size={16} /> Book a Study Pod
            </Link>
            <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-anchor-stone text-anchor-cream hover:border-anchor-gold transition-colors">
              <Icon name="order" size={16} /> Order Coffee
            </Link>
            <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-anchor-stone text-anchor-cream hover:border-anchor-gold transition-colors">
              <Icon name="gallery" size={16} /> Explore Space
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md">
            {[
              ['hours', '07:00', 'open daily'],
              ['wifi',  '1Gbps', 'studio Wi-Fi'],
              ['seating','100+', 'quiet seats']
            ].map(([i, k, v]) => (
              <div key={k} className="flex items-start gap-3">
                <Icon name={i} size={22} className="text-anchor-gold mt-1" />
                <div>
                  <div className="font-display text-2xl text-anchor-paper">{k}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-anchor-mist mt-1">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="w-full rounded-2xl overflow-hidden h-[70vh] lg:h-[88vh]">
          <AvatarImage src="/avatars/standing-poster.webp" className="w-full h-full" eager />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <Section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK.map((q) => (
            <Link key={q.t} to={q.to} className="group relative p-6 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60 hover:border-anchor-gold/50 transition-all flex items-center gap-4">
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-anchor-void border border-anchor-stone/60 group-hover:border-anchor-gold/50 transition-colors">
                <Icon name={q.icon} size={22} className="text-anchor-cream group-hover:text-anchor-gold" />
              </div>
              <div>
                <p className="font-display text-anchor-paper">{q.t}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-mist mt-1">Open →</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* PILLARS */}
      <Section className="py-24">
        <div className="grid md:grid-cols-3 gap-5">
          {PILLARS.map((c) => (
            <div key={c.t} className="group relative p-8 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60 hover:border-anchor-gold/50 transition-colors overflow-hidden">
              <Icon name={c.icon} size={200} className="absolute -right-8 -bottom-10 text-anchor-cream/[0.04] pointer-events-none" />
              <Icon name={c.icon} size={32} className="text-anchor-gold mb-6" />
              <h3 className="font-display text-2xl text-anchor-paper mb-3">{c.t}</h3>
              <p className="text-anchor-mist leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* INTERIOR BANNER */}
      <div className="relative h-[55vh] overflow-hidden my-4">
        <img src="/hallway/coffee-bar.webp" alt="Anchor's Space Coffee Bar" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-anchor-void via-anchor-void/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-anchor-void/60 to-transparent" />
        <div className="absolute bottom-10 left-10 lg:left-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-anchor-gold mb-2">The Space</p>
          <h2 className="font-display text-3xl md:text-4xl text-anchor-paper max-w-md">Where the coffee bar meets<br /> the quiet side of campus.</h2>
        </div>
      </div>

      {/* BRAND GALLERY */}
      <Section className="py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-anchor-gold mb-3">
              <Icon name="community" size={14} /> A day at Anchor&apos;s
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-anchor-paper">Five moods. One studio.</h2>
          </div>
          <p className="text-anchor-mist max-w-sm">Our brand avatar moves through the studio the way you will — coffee, code, quiet, repeat.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {POSES.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-anchor-stone/60"
            >
              <img src={p.src} alt={p.label} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-anchor-void/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold">0{i + 1}</p>
                  <p className="font-display text-anchor-paper">{p.label}</p>
                </div>
                <Icon name={p.icon} size={20} className="text-anchor-cream/70" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* COFFEE FEATURE */}
      <Section className="py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="h-[60vh] order-2 lg:order-1 rounded-2xl overflow-hidden">
          <CupImage src="/cup.webp" className="w-full h-full" />
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-anchor-gold mb-4">
            <Icon name="coffee" size={14} /> House Brew
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-anchor-paper">A cup is a quiet contract<br /> between you and the page.</h2>
          <p className="mt-6 text-anchor-mist leading-relaxed max-w-lg">
            We roast in small batches, dose by gram, and pour with intention. Each cup is a soft anchor for the next idea.
          </p>
          <Link to="/menu" className="inline-flex items-center gap-2 mt-8 text-anchor-gold hover:text-anchor-cream font-medium">
            View the full menu <Icon name="menu" size={16} />
          </Link>
        </div>
      </Section>

      {/* MEMBERSHIP CTA */}
      <Section className="py-24">
        <div className="relative overflow-hidden rounded-3xl border border-anchor-stone/60 bg-gradient-to-br from-anchor-gold/10 to-anchor-coal p-10 md:p-16">
          <Icon name="premium" size={300} className="absolute -right-10 -bottom-10 text-anchor-cream/[0.05]" />
          <div className="relative">
            <Icon name="premium" size={32} className="text-anchor-gold mb-5" />
            <h2 className="font-display text-3xl md:text-5xl text-anchor-paper max-w-2xl">Become a member. Anchor every week.</h2>
            <p className="mt-4 text-anchor-mist max-w-xl">Free drinks, priority booking, locker storage and night-owl access from R199 / month.</p>
            <Link to="/membership" className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-anchor-cream text-anchor-void font-medium hover:bg-anchor-gold transition-colors">
              <Icon name="membership" size={16} /> Explore Passes
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
