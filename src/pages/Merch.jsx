import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Icon from '../components/Icon';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  { name: 'Anchor Cap',       price: 'R299', img: '/merch/cap-black.webp',      tag: 'apparel',    color: 'Black' },
  { name: 'Studio Cap',       price: 'R299', img: '/merch/cap-cream.webp',      tag: 'apparel',    color: 'Cream' },
  { name: 'Anchor Beanie',    price: 'R249', img: '/merch/beanie-black.webp',   tag: 'apparel',    color: 'Black' },
  { name: 'Studio Beanie',    price: 'R249', img: '/merch/beanie-cream.webp',   tag: 'apparel',    color: 'Cream' },
  { name: 'Focus Beanie',     price: 'R249', img: '/merch/beanie-blue.webp',    tag: 'apparel',    color: 'Sky'   },
  { name: 'Anchor Hoodie',    price: 'R849', img: '/merch/hoodie-black.webp',   tag: 'apparel',    color: 'Black' },
  { name: 'Studio Hoodie',    price: 'R849', img: '/merch/hoodie-cream.webp',   tag: 'apparel',    color: 'Cream' },
  { name: 'Sky Hoodie',       price: 'R849', img: '/merch/hoodie-blue.webp',    tag: 'apparel',    color: 'Sky'   },
  { name: 'House Mug',        price: 'R149', img: '/merch/mug-cream.webp',      tag: 'drinkware',  color: 'Cream' },
  { name: 'Matte Mug',        price: 'R149', img: '/merch/mug-black.webp',      tag: 'drinkware',  color: 'Black' },
  { name: 'Focus Tumbler',    price: 'R349', img: '/merch/tumbler-black.webp',  tag: 'drinkware',  color: 'Black' },
  { name: 'Studio Tumbler',   price: 'R349', img: '/merch/tumbler-cream.webp',  tag: 'drinkware',  color: 'Cream' },
  { name: 'House Blend',      price: 'R220', img: '/merch/beans-cream.webp',    tag: 'coffee',     color: 'Light' },
  { name: 'Dark Roast',       price: 'R220', img: '/merch/beans-black.webp',    tag: 'coffee',     color: 'Dark'  },
  { name: 'Focus Notebook',   price: 'R189', img: '/merch/notebook-black.webp', tag: 'stationery', color: 'Black' },
  { name: 'Studio Notebook',  price: 'R189', img: '/merch/notebook-cream.webp', tag: 'stationery', color: 'Cream' },
];

const FILTERS = ['all', 'apparel', 'drinkware', 'stationery', 'coffee'];

export default function Merch() {
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const { count, setOpen } = useCart();
  const items = tab === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.tag === tab);

  return (
    <div className="pt-32 pb-28 lg:pb-24">
      <Section className="flex flex-wrap justify-between items-end gap-4 mb-8 lg:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="merch" size={14} />
            Merch
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-6xl text-anchor-paper leading-tight">The Studio Shop.</h1>
          <p className="mt-4 text-anchor-mist max-w-lg">Quiet branding, honest materials. Made for long study sessions and slow mornings.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-anchor-stone/60 text-anchor-cream text-sm relative"
        >
          <Icon name="cart" size={16} />
          View Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-anchor-gold text-anchor-void text-[10px] font-bold grid place-items-center">
              {count}
            </span>
          )}
        </button>
      </Section>

      <Section className="mb-10">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setTab(f)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em] transition-all ${tab === f ? 'bg-anchor-cream text-anchor-void' : 'bg-anchor-coal text-anchor-mist border border-anchor-stone/60'}`}
            >
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
              transition={{ delay: i * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelected(p)}
              className="rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60 overflow-hidden cursor-pointer"
            >
              {/* Product photo */}
              <div className="aspect-square overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>

              {/* Info row */}
              <div className="px-3 py-3 border-t border-anchor-stone/60">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-anchor-paper text-sm truncate">{p.name}</p>
                  <span className="text-anchor-gold font-display text-sm shrink-0">{p.price}</span>
                </div>
                <p className="text-[10px] text-anchor-mist uppercase tracking-[0.2em] mt-0.5">{p.color} · tap to view</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Product detail modal */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
