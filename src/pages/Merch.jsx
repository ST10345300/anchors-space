import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Icon from '../components/Icon';

const PRODUCTS = [
  { name: 'Anchor Hoodie',     price: 'R849', icon: 'hoodie',     tag: 'apparel' },
  { name: 'Studio Tee',        price: 'R349', icon: 'apparel',    tag: 'apparel' },
  { name: 'Focus Notebook',    price: 'R189', icon: 'notebook',   tag: 'stationery' },
  { name: 'House Mug',         price: 'R149', icon: 'mug',        tag: 'drinkware' },
  { name: 'Studio Bottle',     price: 'R249', icon: 'bottle',     tag: 'drinkware' },
  { name: 'Single Origin Bag', price: 'R220', icon: 'coffeeBags', tag: 'coffee' },
  { name: 'House Blend Bag',   price: 'R180', icon: 'coffeeBags', tag: 'coffee' },
  { name: 'Studio Tote',       price: 'R220', icon: 'merch',      tag: 'apparel' },
];

const FILTERS = ['all', 'apparel', 'drinkware', 'stationery', 'coffee'];

export default function Merch() {
  const [tab, setTab] = useState('all');
  const items = tab === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.tag === tab);

  return (
    <div className="pt-32 pb-24">
      <Section className="flex flex-wrap justify-between items-end gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="merch" size={14} />
            Merch
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">The Studio Shop.</h1>
          <p className="mt-4 text-anchor-mist max-w-lg">Quiet branding, honest materials. Made for long study sessions and slow mornings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 grid place-items-center rounded-full border border-anchor-stone/60 text-anchor-cream hover:border-anchor-gold transition-colors">
            <Icon name="wishlist" size={18} />
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-anchor-stone/60 text-anchor-cream hover:border-anchor-gold transition-colors text-sm">
            <Icon name="cart" size={16} />
            Cart · 0
          </button>
        </div>
      </Section>

      <Section className="mb-10">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setTab(f)} className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em] transition-all ${tab === f ? 'bg-anchor-cream text-anchor-void' : 'bg-anchor-coal text-anchor-mist hover:text-anchor-cream border border-anchor-stone/60'}`}>
              {f}
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60 hover:border-anchor-gold/50 transition-all overflow-hidden"
            >
              <div className="aspect-square grid place-items-center relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: 'radial-gradient(circle at 50% 50%, rgba(198,168,125,0.18), transparent 60%)' }} />
                <Icon name={p.icon} size={88} className="text-anchor-cream relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="px-5 py-4 border-t border-anchor-stone/60 flex items-center justify-between">
                <div>
                  <p className="font-display text-anchor-paper">{p.name}</p>
                  <p className="text-xs text-anchor-mist uppercase tracking-[0.2em] mt-1">{p.tag}</p>
                </div>
                <p className="text-anchor-gold font-display">{p.price}</p>
              </div>
              <button className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-anchor-void/70 text-anchor-cream backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:text-anchor-gold">
                <Icon name="wishlist" size={16} />
              </button>
              <button className="absolute bottom-20 right-4 w-10 h-10 grid place-items-center rounded-full bg-anchor-cream text-anchor-void translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <Icon name="cart" size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
