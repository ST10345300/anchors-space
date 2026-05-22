import React, { useState } from 'react';
import Section from '../components/Section';
import CupImage from '../components/CupImage';
import Icon from '../components/Icon';

const TABS = [
  { k: 'Espresso',   icon: 'coffee' },
  { k: 'Slow Brew',  icon: 'beans' },
  { k: 'Comfort',    icon: 'drinks' },
  { k: 'Bites',      icon: 'food' }
];

const ITEMS = {
  Espresso: [
    { n: 'Anchor Espresso', d: 'Double shot, syrupy and bold.', p: 'R28', i: 'coffee' },
    { n: 'Cortado',         d: 'Equal parts espresso & warm milk.', p: 'R34', i: 'mug' },
    { n: 'Flat White',      d: 'Velvet microfoam, ristretto base.',   p: 'R38', i: 'mug' },
    { n: 'Cappuccino',      d: 'Classic 1:1:1 with cocoa dust.',     p: 'R38', i: 'mug' },
  ],
  'Slow Brew': [
    { n: 'V60 Pour-Over', d: 'Bright, tea-like, single origin.', p: 'R45', i: 'beans' },
    { n: 'Chemex',        d: 'Clean cup, served in carafe for two.', p: 'R65', i: 'beans' },
    { n: 'Cold Brew',     d: '18-hour steep, served over ice.',  p: 'R42', i: 'drinks' },
  ],
  Comfort: [
    { n: 'Anchor Mocha', d: 'Dark chocolate ganache & espresso.', p: 'R48', i: 'mug' },
    { n: 'Ember Latte',  d: 'Honey, cinnamon, oat milk.',          p: 'R46', i: 'drinks' },
    { n: 'Matcha Latte', d: 'Ceremonial-grade, lightly sweetened.',p: 'R50', i: 'drinks' },
  ],
  Bites: [
    { n: 'Sourdough Toast', d: 'Olive oil, sea salt, smashed avo.', p: 'R55', i: 'food' },
    { n: 'Banana Bread',    d: 'Brown butter, walnut crumble.',     p: 'R32', i: 'desserts' },
    { n: 'Study Bowl',      d: 'Granola, yoghurt, seasonal fruit.', p: 'R58', i: 'desserts' },
  ]
};

export default function Menu() {
  const [tab, setTab] = useState('Espresso');

  return (
    <div className="pt-32 pb-24">
      <Section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
            <Icon name="coffee" size={14} />
            Coffee Bar
          </div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">
            Crafted for the<br /> long sit-down.
          </h1>
          <p className="mt-6 text-anchor-mist leading-relaxed max-w-lg">
            Espresso classics, a rotating slow-brew bar, and a handful of bites that don&apos;t crumble on your keyboard.
          </p>
        </div>
        <div className="h-[60vh] relative">
          <CupImage className="absolute inset-0" glow={0.7} />
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map(t => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.25em] transition-all ${tab === t.k ? 'bg-anchor-cream text-anchor-void' : 'bg-anchor-coal text-anchor-mist hover:text-anchor-cream border border-anchor-stone/60'}`}
            >
              <Icon name={t.icon} size={14} />
              {t.k}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
          {ITEMS[tab].map((it) => (
            <div key={it.n} className="flex items-start gap-4 py-5 border-b border-anchor-stone/60 group">
              <div className="w-11 h-11 grid place-items-center rounded-xl bg-anchor-coal border border-anchor-stone/60 group-hover:border-anchor-gold/60 transition-colors shrink-0">
                <Icon name={it.i} size={20} className="text-anchor-cream group-hover:text-anchor-gold" />
              </div>
              <div className="flex-1 flex items-baseline justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl text-anchor-paper group-hover:text-anchor-gold transition-colors">{it.n}</h3>
                  <p className="text-sm text-anchor-mist mt-1">{it.d}</p>
                </div>
                <div className="font-display text-anchor-gold">{it.p}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
