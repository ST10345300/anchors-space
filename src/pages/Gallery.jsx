import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import Icon from '../components/Icon';

const TILES = [
  { label: 'Coffee Bar',     img: '/hallway/coffee-bar.webp',  ratio: 'tall'   },
  { label: 'Study Pods',     img: '/pods/pod-hallway.webp',    ratio: 'wide'   },
  { label: 'Solo Pod',       img: '/pods/solo-pod.webp',       ratio: 'square' },
  { label: 'Group Study',    img: '/avatars/group-study.webp', ratio: 'tall'   },
  { label: 'Round Room',     img: '/pods/round-room.webp',     ratio: 'wide'   },
  { label: 'Group Room',     img: '/pods/group-room.webp',     ratio: 'square' },
  { label: 'Quiet Hallway',  img: '/hallway/hallway.webp',     ratio: 'square' },
  { label: 'The Entrance',   img: '/hallway/entrance.webp',    ratio: 'tall'   },
  { label: 'Night Studio',   img: '/pods/hallway-bar.webp',    ratio: 'wide'   },
];

const ratioCls = { tall: 'row-span-2 aspect-[3/4]', wide: 'aspect-[16/10]', square: 'aspect-square' };

export default function Gallery() {
  const [open, setOpen] = useState(null);

  return (
    <div className="pt-32 pb-24">
      <Section className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
          <Icon name="gallery" size={14} />
          Gallery
        </div>
        <h1 className="mt-5 font-display text-5xl md:text-6xl text-anchor-paper leading-tight max-w-3xl">
          A slow walk through the <span className="text-anchor-gold">studio</span>.
        </h1>
        <p className="mt-4 text-anchor-mist max-w-xl">Every corner is intentional. Explore the spaces before you arrive.</p>
      </Section>

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
          {TILES.map((t, i) => (
            <motion.button
              key={t.label}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl overflow-hidden border border-anchor-stone/60 ${ratioCls[t.ratio]}`}
            >
              <img src={t.img} alt={t.label} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-anchor-void/70 via-transparent to-transparent" />
              {/* corner ticks */}
              <span className="absolute top-3 left-3 w-3 h-px bg-anchor-cream/50" /><span className="absolute top-3 left-3 w-px h-3 bg-anchor-cream/50" />
              <span className="absolute top-3 right-3 w-3 h-px bg-anchor-cream/50" /><span className="absolute top-3 right-3 w-px h-3 bg-anchor-cream/50" />
              <span className="absolute bottom-3 left-3 w-3 h-px bg-anchor-cream/50" /><span className="absolute bottom-3 left-3 w-px h-3 bg-anchor-cream/50" />
              <span className="absolute bottom-3 right-3 w-3 h-px bg-anchor-cream/50" /><span className="absolute bottom-3 right-3 w-px h-3 bg-anchor-cream/50" />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-anchor-cream/90">{t.label}</div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 bg-anchor-void/92 backdrop-blur-2xl grid place-items-center p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-anchor-stone/60"
            >
              <img src={TILES[open].img} alt={TILES[open].label} className="w-full max-h-[80vh] object-cover" />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-anchor-void/80 to-transparent flex items-end justify-between">
                <span className="text-[11px] tracking-[0.35em] uppercase text-anchor-cream/90">{TILES[open].label}</span>
                <div className="flex gap-2">
                  <button onClick={() => setOpen(i => Math.max(0, i - 1))} className="w-9 h-9 grid place-items-center rounded-full bg-anchor-coal/80 text-anchor-cream border border-anchor-stone/60">
                    <Icon name="chevronLeft" size={16} />
                  </button>
                  <button onClick={() => setOpen(i => Math.min(TILES.length - 1, i + 1))} className="w-9 h-9 grid place-items-center rounded-full bg-anchor-coal/80 text-anchor-cream border border-anchor-stone/60">
                    <Icon name="chevronRight" size={16} />
                  </button>
                </div>
              </div>
              <button onClick={() => setOpen(null)} className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-anchor-void/80 text-anchor-cream border border-anchor-stone/60">
                <Icon name="close" size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
