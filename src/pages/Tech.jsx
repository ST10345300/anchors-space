import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Icon from '../components/Icon';

const ITEMS = [
  {
    id: 'machine',
    name: 'Espresso Machine',
    sub: 'La Marzocco Linea Micra',
    tag: 'Brew tech',
    desc: 'The heart of the bar. A dual-boiler precision instrument that keeps extraction at a steady 93 °C and pressure at 9 bar — every single shot.',
    img: '/hallway/coffee-bar.webp',   // ← swap with /tech/machine/cover.jpg when frames arrive
    parts: 8,
    color: 'from-anchor-gold/10',
  },
  {
    id: 'grinder',
    name: 'Coffee Grinder',
    sub: 'Mazzer Major V Electronic',
    tag: 'Grind tech',
    desc: 'Flat burrs, stepless micrometric adjustment. Grinds single doses with near-zero retention — so every gram hits the portafilter fresh.',
    img: '/cup.webp',                  // ← swap with /tech/grinder/cover.jpg when frames arrive
    parts: 6,
    color: 'from-anchor-stone/20',
  },
];

export default function Tech() {
  return (
    <div className="pt-32 pb-28 lg:pb-24">
      <Section className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
          <Icon name="beans" size={14} />
          Our Tech
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">
          The tools behind<br /> every <span className="text-anchor-gold">great cup</span>.
        </h1>
        <p className="mt-5 text-anchor-mist max-w-xl mx-auto leading-relaxed">
          Two machines. Zero shortcuts. Tap either one to explore every part up close.
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/tech/${item.id}`}
                className={`group relative block rounded-3xl overflow-hidden border border-anchor-stone/60 bg-gradient-to-b ${item.color} to-anchor-coal`}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anchor-void via-anchor-void/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="relative px-8 pb-8 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-anchor-gold">{item.tag}</span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-anchor-mist">{item.parts} parts annotated</span>
                  </div>
                  <h2 className="font-display text-3xl text-anchor-paper">{item.name}</h2>
                  <p className="text-sm text-anchor-gold mt-1">{item.sub}</p>
                  <p className="mt-4 text-anchor-mist text-sm leading-relaxed">{item.desc}</p>

                  <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-anchor-cream text-anchor-void text-sm font-medium">
                    <Icon name="study" size={15} />
                    Explore parts
                    <Icon name="chevronRight" size={15} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Spec comparison strip */}
      <Section className="pt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ['coffee',   '93 °C',     'Brew temp'],
            ['beans',    '9 bar',     'Pressure'],
            ['focusTimer','<1s',      'Grind dose'],
            ['premium',  'Single-origin', 'Beans only'],
          ].map(([icon, val, label]) => (
            <div key={label} className="p-6 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60 text-center">
              <Icon name={icon} size={24} className="text-anchor-gold mx-auto mb-3" />
              <p className="font-display text-2xl text-anchor-cream">{val}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-mist mt-1">{label}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
