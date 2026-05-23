import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../components/Icon';

/* ─────────────────────────────────────────
   MACHINE CONFIG
   frame range 0-239 (zero-indexed)
   Labels appear when frameIdx falls inside [from, to]
   dot: {x,y} = percentage position on the image
───────────────────────────────────────── */
const MACHINE = {
  name: 'Espresso Machine',
  sub: 'La Marzocco Linea Strada — Custom Anchor Edition',
  totalFrames: 240,
  frameUrl: (i) => `/tech/machine/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`,
  labels: [
    {
      from: 0, to: 28,
      part: 'Portafilters',
      stat: '58 mm',
      statSub: 'basket diameter',
      desc: 'Solid brass 58mm portafilters with Anchor-engraved wooden handles. A quarter-turn lock into the group head — satisfying every time.',
      dot: { x: 36, y: 72 },
      side: 'right',
    },
    {
      from: 29, to: 65,
      part: 'Control Panel',
      stat: 'PID',
      statSub: '±0.5 °C variance',
      desc: 'OLED display with programmable shot volumes, temperature offset, and pre-infusion timing. Every parameter is dialled per bean origin.',
      dot: { x: 42, y: 32 },
      side: 'right',
    },
    {
      from: 66, to: 105,
      part: 'Group Heads',
      stat: '93 °C',
      statSub: 'constant brew temp',
      desc: 'Saturated group heads ensure thermal stability from the first shot to the last. Copper inner sleeve holds temperature to within half a degree.',
      dot: { x: 48, y: 55 },
      side: 'left',
    },
    {
      from: 106, to: 145,
      part: 'Dual Copper Boilers',
      stat: '2 boilers',
      statSub: 'brew + steam independent',
      desc: 'Two separate copper boilers — one dedicated to espresso extraction at 93 °C, one for steam at 130 °C. Simultaneous, never a wait.',
      dot: { x: 55, y: 42 },
      side: 'right',
    },
    {
      from: 146, to: 185,
      part: 'Thermosyphon System',
      stat: 'Passive',
      statSub: 'circulation loop',
      desc: 'Hot water circulates through the group head continuously via convection — no pump required. The machine is always at temperature.',
      dot: { x: 50, y: 38 },
      side: 'left',
    },
    {
      from: 186, to: 215,
      part: 'Rotary Pump',
      stat: '9 bar',
      statSub: 'extraction pressure',
      desc: 'Commercial rotary vane pump runs silently at 9 bar. Quieter, more durable and more consistent than vibration pumps found in home machines.',
      dot: { x: 62, y: 55 },
      side: 'left',
    },
    {
      from: 216, to: 239,
      part: 'Full Disassembly',
      stat: '47 parts',
      statSub: 'precision engineered',
      desc: 'Every component machined or cast to specification — drip tray, chassis, panels and internals. Nothing is off-the-shelf.',
      dot: { x: 50, y: 50 },
      side: 'right',
    },
  ],
};

const GRINDER = {
  name: 'Coffee Grinder',
  sub: 'Mazzer Major V Electronic',
  totalFrames: 0, // frames not yet provided
  frameUrl: () => '/cup.webp',
  labels: [],
};

const TECH_DATA = { machine: MACHINE, grinder: GRINDER };

/* ── Animated label overlay ── */
function Label({ label, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={label.part}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              left: `${label.dot.x}%`,
              top: `${label.dot.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="absolute inset-0 rounded-full bg-anchor-gold/40 animate-ping" style={{ animationDuration: '1.8s' }} />
            <span className="relative block w-3.5 h-3.5 rounded-full bg-anchor-gold border-2 border-anchor-void shadow-lg shadow-anchor-gold/50" />
          </motion.div>

          {/* Line + label card */}
          <motion.div
            initial={{ opacity: 0, x: label.side === 'right' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute flex items-center gap-0 ${label.side === 'right' ? 'flex-row' : 'flex-row-reverse'}`}
            style={{
              left: label.side === 'right'
                ? `calc(${label.dot.x}% + 14px)`
                : 'auto',
              right: label.side === 'left'
                ? `calc(${100 - label.dot.x}% + 14px)`
                : 'auto',
              top: `${label.dot.y}%`,
              transform: 'translateY(-50%)',
            }}
          >
            {/* Connector line */}
            <div className="w-8 h-px bg-anchor-gold/70 shrink-0" />
            {/* Card */}
            <div className="ml-2 mr-2 px-3 py-2 rounded-xl bg-anchor-void/90 border border-anchor-gold/40 backdrop-blur-md shadow-2xl whitespace-nowrap">
              <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold font-medium leading-none">{label.part}</p>
              <p className="text-sm font-display text-anchor-cream mt-0.5 leading-none">{label.stat}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Back to top ── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-anchor-coal/90 border border-anchor-stone/60 text-anchor-mist text-[10px] tracking-[0.25em] uppercase backdrop-blur-md shadow-xl"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M4.5 7.5 L4.5 1.5 M2 4 L4.5 1.5 L7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Top
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function TechDetail() {
  const { id } = useParams();
  const tech = TECH_DATA[id];
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef([]);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const currentFrameRef = useRef(0);

  /* Preload frames — first 12 eagerly, then stream the rest */
  useEffect(() => {
    if (!tech || tech.totalFrames === 0) return;

    // Pre-allocate slots
    imagesRef.current = Array.from({ length: tech.totalFrames }, () => null);

    function loadFrame(i, onDone) {
      const img = new Image();
      img.onload = () => { imagesRef.current[i] = img; onDone?.(); };
      img.onerror = () => onDone?.();
      img.src = tech.frameUrl(i);
    }

    // Load first 12 frames immediately so the user sees frame 0 fast
    const EAGER = Math.min(12, tech.totalFrames);
    let eagerDone = 0;
    for (let i = 0; i < EAGER; i++) {
      loadFrame(i, () => {
        eagerDone++;
        if (eagerDone === 1) setLoaded(true);          // first frame ready → show canvas
        if (eagerDone === EAGER) drawFrame(currentFrameRef.current); // redraw when batch done
      });
    }

    // Stream remaining frames in the background with a small concurrency limit
    const BATCH = 8;
    let next = EAGER;
    function loadNext() {
      for (let b = 0; b < BATCH && next < tech.totalFrames; b++, next++) {
        loadFrame(next, () => {
          // Redraw if the user has scrolled to this frame and it wasn't ready yet
          if (currentFrameRef.current === next - 1) drawFrame(currentFrameRef.current);
          if (next <= tech.totalFrames) loadNextSingle();
        });
      }
    }
    function loadNextSingle() {
      if (next >= tech.totalFrames) return;
      const i = next++;
      loadFrame(i, loadNextSingle);
    }
    // Start background loading after a short yield so eager frames get priority
    setTimeout(loadNext, 200);

    return () => { imagesRef.current = []; };
  }, [id]);

  function drawFrame(idx) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  /* Scroll → frame index */
  useEffect(() => {
    if (!tech || tech.totalFrames === 0) return;

    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const idx = Math.min(tech.totalFrames - 1, Math.floor(progress * tech.totalFrames));

      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        setFrameIdx(idx);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(idx));
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [id, tech]);

  /* Draw initial frame when canvas mounts */
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded]);

  if (!tech) {
    return (
      <div className="pt-40 text-center text-anchor-mist">
        <p>Machine not found.</p>
        <Link to="/tech" className="text-anchor-gold mt-4 block">← Back to Our Tech</Link>
      </div>
    );
  }

  /* Active label */
  const activeLabel = tech.labels.find(l => frameIdx >= l.from && frameIdx <= l.to) || null;

  /* Progress: 0–1 */
  const progress = tech.totalFrames > 0 ? frameIdx / (tech.totalFrames - 1) : 0;

  /* Scroll height: 8px per frame so 240 frames = 1920px + 100vh */
  const scrollHeight = tech.totalFrames * 8;

  return (
    <div className="bg-anchor-void">
      <BackToTop />

      {/* ── Sticky scroll container ── */}
      <div ref={containerRef} style={{ height: `calc(${scrollHeight}px + 100vh)` }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 lg:px-12 pt-6">
            <Link
              to="/tech"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anchor-void/70 border border-anchor-stone/60 text-anchor-mist text-xs tracking-[0.3em] uppercase backdrop-blur-md"
            >
              <Icon name="chevronLeft" size={13} /> Our Tech
            </Link>

            {/* Frame counter */}
            <div className="px-4 py-2 rounded-full bg-anchor-void/70 border border-anchor-stone/60 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-anchor-mist">
              {Math.round(progress * 100)}% disassembled
            </div>
          </div>

          {/* Canvas — frame sequence */}
          <div className="relative flex-1">
            {tech.totalFrames > 0 ? (
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ background: '#0a0a0b' }}
              />
            ) : (
              <img src={tech.frameUrl(0)} alt={tech.name} className="absolute inset-0 w-full h-full object-cover" />
            )}

            {/* Label overlays */}
            {tech.labels.map(label => (
              <Label key={label.part} label={label} visible={activeLabel?.part === label.part} />
            ))}

            {/* Dark gradient bottom */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-anchor-void to-transparent pointer-events-none" />

            {/* Scroll hint — only at very start */}
            <AnimatePresence>
              {frameIdx < 5 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-anchor-mist"
                >
                  <span className="text-[10px] tracking-[0.4em] uppercase">Scroll to disassemble</span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <rect x="1" y="1" width="14" height="18" rx="7" stroke="currentColor" strokeWidth="1.2"/>
                      <motion.rect
                        x="6.5" y="4" width="3" height="5" rx="1.5" fill="currentColor"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 px-6 lg:px-12 pb-6">
            {/* Progress bar */}
            <div className="w-full h-px bg-anchor-stone/40 mb-5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-anchor-gold rounded-full"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            <div className="flex items-end justify-between gap-6 flex-wrap">
              {/* Machine name */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-anchor-gold mb-1">{tech.sub}</p>
                <h1 className="font-display text-3xl md:text-4xl text-anchor-paper">{tech.name}</h1>
              </div>

              {/* Active part detail */}
              <AnimatePresence mode="wait">
                {activeLabel && (
                  <motion.div
                    key={activeLabel.part}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-sm bg-anchor-void/80 border border-anchor-stone/60 rounded-2xl px-5 py-4 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 rounded-full bg-anchor-gold" />
                      <span className="text-[10px] uppercase tracking-[0.35em] text-anchor-gold">{activeLabel.part}</span>
                      <span className="ml-auto font-display text-anchor-cream text-sm">{activeLabel.stat}</span>
                    </div>
                    <p className="text-xs text-anchor-mist leading-relaxed">{activeLabel.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Part chips */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {tech.labels.map((l, i) => (
                <div
                  key={l.part}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                    activeLabel?.part === l.part
                      ? 'bg-anchor-gold text-anchor-void border-anchor-gold'
                      : frameIdx > l.to
                      ? 'border-anchor-stone/40 text-anchor-stone'
                      : 'border-anchor-stone/60 text-anchor-mist'
                  }`}
                >
                  {l.part}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Part detail cards (below scroll section) ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-24">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-anchor-gold mb-3">Annotated</p>
          <h2 className="font-display text-4xl text-anchor-paper">Every part, explained.</h2>
          <p className="mt-4 text-anchor-mist max-w-lg">Scroll back up to watch the machine disassemble. Each part below corresponds to a stage in the animation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tech.labels.map((l, i) => (
            <motion.div
              key={l.part}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-anchor-coal/60 border border-anchor-stone/60"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border border-anchor-gold/40 grid place-items-center text-anchor-gold text-[10px] font-display shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold">{l.part}</span>
                </div>
                <div className="text-right">
                  <p className="font-display text-anchor-cream">{l.stat}</p>
                  <p className="text-[10px] text-anchor-mist">{l.statSub}</p>
                </div>
              </div>
              <p className="text-sm text-anchor-mist leading-relaxed">{l.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-anchor-stone/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Icon name="anchor" size={28} className="text-anchor-gold/30 mb-3" />
            <p className="text-anchor-mist text-sm max-w-sm">That's every layer of the {tech.name.toLowerCase()}. You now know more about this machine than most baristas.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/tech" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-anchor-stone/60 text-anchor-cream text-sm">
              <Icon name="chevronLeft" size={14} /> Our Tech
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-anchor-coal border border-anchor-stone/60 text-anchor-mist text-sm"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 9 L5.5 2 M2.5 5 L5.5 2 L8.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
