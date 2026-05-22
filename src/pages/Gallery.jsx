import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import Icon from '../components/Icon';

// Procedurally styled "frames" — each one is a layered gradient that
// suggests a cinematic interior shot, so the gallery looks complete
// before real photos arrive. Drop /public/gallery/*.jpg and swap below.
const TILES = [
  { label: 'Coffee Bar',     icon: 'coffee',     ratio: 'tall'  },
  { label: 'Single Pod',     icon: 'singlePod',  ratio: 'wide'  },
  { label: 'Open Hall',      icon: 'openHall',   ratio: 'square'},
  { label: 'Reading Lounge', icon: 'seating',    ratio: 'tall'  },
  { label: 'Group Pod',      icon: 'groupPod',   ratio: 'wide'  },
  { label: 'Private Room',   icon: 'privateRoom',ratio: 'square'},
  { label: 'Quiet Mezzanine',icon: 'quiet',      ratio: 'square'},
  { label: 'Brew Bar',       icon: 'beans',      ratio: 'tall'  },
  { label: 'Night Studio',   icon: 'nightPass',  ratio: 'wide'  }
];

const ratioCls = { tall: 'row-span-2 aspect-[3/4]', wide: 'aspect-[16/10]', square: 'aspect-square' };

function FrameVisual({ icon, label }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* layered "lighting" */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(198,168,125,0.18), transparent 55%), radial-gradient(circle at 80% 90%, rgba(111,78,55,0.20), transparent 60%), linear-gradient(160deg, #141416 0%, #0F0F10 70%)' }} />
      {/* faint grid */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(245,239,230,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,230,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* feature icon */}
      <div className="absolute inset-0 grid place-items-center">
        <Icon name={icon} size={84} className="text-anchor-cream/70" />
      </div>
      {/* corner ticks */}
      <span className="absolute top-3 left-3 w-3 h-px bg-anchor-cream/40" /><span className="absolute top-3 left-3 w-px h-3 bg-anchor-cream/40" />
      <span className="absolute top-3 right-3 w-3 h-px bg-anchor-cream/40" /><span className="absolute top-3 right-3 w-px h-3 bg-anchor-cream/40" />
      <span className="absolute bottom-3 left-3 w-3 h-px bg-anchor-cream/40" /><span className="absolute bottom-3 left-3 w-px h-3 bg-anchor-cream/40" />
      <span className="absolute bottom-3 right-3 w-3 h-px bg-anchor-cream/40" /><span className="absolute bottom-3 right-3 w-px h-3 bg-anchor-cream/40" />
      {/* label */}
      <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-anchor-cream/80">{label}</div>
    </div>
  );
}

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
              whileHover={{ scale: 1.01 }}
              className={`group relative rounded-2xl overflow-hidden border border-anchor-stone/60 hover:border-anchor-gold/50 transition-all ${ratioCls[t.ratio]}`}
            >
              <FrameVisual icon={t.icon} label={t.label} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-anchor-void/30 grid place-items-center">
                <div className="w-10 h-10 grid place-items-center rounded-full bg-anchor-cream text-anchor-void">
                  <Icon name="gallery" size={18} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 bg-anchor-void/90 backdrop-blur-2xl grid place-items-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden border border-anchor-stone/60"
            >
              <FrameVisual icon={TILES[open].icon} label={TILES[open].label} />
              <button onClick={() => setOpen(null)} className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-anchor-cream text-anchor-void">
                <Icon name="menu" size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
