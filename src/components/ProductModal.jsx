import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Icon from './Icon';

const SIZE_OPTIONS = {
  apparel: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  drinkware: ['One Size'],
  stationery: ['One Size'],
  coffee: ['250g', '500g'],
};

const DESCRIPTIONS = {
  'Anchor Cap':      'Classic 6-panel cap with embroidered anchor logo. Adjustable strap, pre-curved brim. One size fits all.',
  'Studio Cap':      'Cream colourway 6-panel cap with tone-on-tone anchor embroidery. Clean, minimal, everyday.',
  'Anchor Beanie':   'Chunky-ribbed knit beanie with embroidered anchor logo. Warm, oversized fit. 100% acrylic.',
  'Studio Beanie':   'Off-white ribbed beanie — wears as well in the library as on the way there. Soft and structured.',
  'Focus Beanie':    'Sky-blue edition. Limited run. Same great fit as the studio beanie with a lighter, cooler tone.',
  'Anchor Hoodie':   'Heavyweight 400gsm fleece hoodie. Screen-printed chest logo, drop shoulders, kangaroo pocket. Washes beautifully.',
  'Studio Hoodie':   'Cream colourway heavyweight hoodie. Tone-on-tone anchor print. Made for long sessions and longer winters.',
  'Sky Hoodie':      'Sky-blue limited edition. Same heavyweight build — a soft pop of colour in an otherwise muted wardrobe.',
  'House Mug':       '300ml ceramic mug in matte cream. Dishwasher-safe. The official vessel of a good morning.',
  'Matte Mug':       '300ml matte black ceramic. Gold anchor decal. Heavy-bottomed, satisfying to hold. Dishwasher-safe.',
  'Focus Tumbler':   '900ml insulated stainless tumbler. Keeps coffee hot 6 hrs, cold 12 hrs. Handle grip. Leak-proof lid.',
  'Studio Tumbler':  'Cream colourway 900ml tumbler. Same great insulation, warmer aesthetic for warmer days.',
  'House Blend':     'Medium roast, smooth and balanced. Notes of brown sugar, milk chocolate and walnut. 250g ground or whole bean.',
  'Dark Roast':      'Full-bodied dark roast for mornings that need a statement. Rich, low-acid, heavy crema. 250g or 500g.',
  'Focus Notebook':  'A5 hardcover notebook, 240 dotted pages. Lay-flat binding, ribbon bookmark. Designed for deep thinking.',
  'Studio Notebook': 'Cream linen cover, 240 dotted pages. Light, refined, understated. A quiet place for your best ideas.',
};

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const sizes = SIZE_OPTIONS[product.tag] || ['One Size'];
  const [size, setSize] = useState(sizes[0]);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-anchor-void/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="w-full max-w-3xl bg-anchor-coal rounded-2xl border border-anchor-stone/60 overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Image panel */}
              <div className="md:w-1/2 aspect-square md:aspect-auto shrink-0 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detail panel */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top bar */}
                <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-anchor-stone/60 shrink-0">
                  <span className="text-[10px] tracking-[0.35em] uppercase text-anchor-gold">{product.tag} · {product.color}</span>
                  <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-full border border-anchor-stone/60 text-anchor-mist">
                    <Icon name="close" size={16} />
                  </button>
                </div>

                <div className="px-7 py-6 flex flex-col gap-5 flex-1">
                  {/* Name + price */}
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-3xl text-anchor-paper leading-tight">{product.name}</h2>
                    <span className="font-display text-2xl text-anchor-gold shrink-0">{product.price}</span>
                  </div>

                  {/* Description */}
                  <p className="text-anchor-mist leading-relaxed text-sm">
                    {DESCRIPTIONS[product.name] || 'Quality Anchor\'s Space merchandise. Made to last, designed to travel.'}
                  </p>

                  {/* Size selector */}
                  {sizes.length > 1 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold mb-3">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map(s => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`px-4 py-2 rounded-full text-sm border transition-all ${size === s ? 'bg-anchor-cream text-anchor-void border-anchor-cream' : 'border-anchor-stone/60 text-anchor-paper'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Perks row */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-anchor-mist">
                    <div className="flex items-center gap-2"><Icon name="community" size={14} className="text-anchor-gold" /> Free delivery over R700</div>
                    <div className="flex items-center gap-2"><Icon name="hours" size={14} className="text-anchor-gold" /> 14-day returns</div>
                    <div className="flex items-center gap-2"><Icon name="anchor" size={14} className="text-anchor-gold" /> Anchor's Space branded</div>
                    <div className="flex items-center gap-2"><Icon name="premium" size={14} className="text-anchor-gold" /> Members get 10% off</div>
                  </div>

                  {/* Add to cart */}
                  <div className="mt-auto pt-2">
                    <button
                      onClick={handleAdd}
                      className="w-full py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Icon name="cart" size={16} />
                      {added ? '✓ Added to cart' : `Add to Cart · ${product.price}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
