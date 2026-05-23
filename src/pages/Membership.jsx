import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Icon from '../components/Icon';
import MembershipModal from '../components/MembershipModal';
import { useAuth } from '../context/AuthContext';

const TIERS = [
  {
    name: 'Student Pass',
    icon: 'studentPass',
    price: 'R249',
    cadence: '/ month',
    tag: 'For undergrads & postgrads',
    perks: [
      { i: 'coffee',     t: '1 free drink daily' },
      { i: 'wifi',       t: '1 Gbps studio Wi-Fi' },
      { i: 'singlePod',  t: 'Single pod access' },
      { i: 'focusTimer', t: 'Focus timer rituals' },
    ]
  },
  {
    name: 'Creator Pass',
    icon: 'rewards',
    price: 'R449',
    cadence: '/ month',
    featured: true,
    tag: 'For freelancers & founders',
    perks: [
      { i: 'coffee',    t: '2 free drinks daily' },
      { i: 'groupPod',  t: 'Group pod priority' },
      { i: 'lockers',   t: 'Private locker' },
      { i: 'offers',    t: '10% off merch' },
    ]
  },
  {
    name: 'Night Owl Pass',
    icon: 'nightPass',
    price: 'R199',
    cadence: '/ month',
    tag: '18:00 — 23:00 only',
    perks: [
      { i: 'coffee',  t: '1 free brew nightly' },
      { i: 'quiet',   t: 'Silent mezzanine access' },
      { i: 'seating', t: 'Lounge seating' },
      { i: 'hours',   t: 'Late-close priority' },
    ]
  },
  {
    name: 'Unlimited Focus',
    icon: 'premium',
    price: 'R899',
    cadence: '/ month',
    tag: 'For deep work, daily',
    perks: [
      { i: 'coffee',     t: 'Unlimited brews' },
      { i: 'privateRoom',t: 'Private room hours' },
      { i: 'workspace',  t: 'Reserved desk' },
      { i: 'premium',    t: 'Priority everything' },
    ]
  }
];

export default function Membership() {
  const [joinTier, setJoinTier] = useState(null);
  const { user } = useAuth();

  return (
    <div className="pt-32 pb-24">
      <Section className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-anchor-stone/60 text-[10px] tracking-[0.4em] uppercase text-anchor-gold">
          <Icon name="membership" size={14} />
          Memberships
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-6xl text-anchor-paper leading-tight">
          A pass that <span className="text-anchor-gold">anchors</span> your week.
        </h1>
        <p className="mt-5 text-anchor-mist max-w-xl mx-auto leading-relaxed">
          Four tiers shaped around how you actually work. No contracts, cancel anytime, drinks included.
        </p>

        {user?.membership && (
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-anchor-gold/10 border border-anchor-gold/40 text-anchor-cream text-sm">
            <Icon name="anchor" size={16} className="text-anchor-gold" />
            Active: <strong className="text-anchor-gold">{user.membership}</strong>
          </div>
        )}
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {TIERS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative p-7 rounded-2xl border ${t.featured ? 'bg-gradient-to-b from-anchor-gold/10 to-anchor-coal/80 border-anchor-gold/50' : 'bg-anchor-coal/60 border-anchor-stone/60'}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-anchor-gold text-anchor-void text-[10px] tracking-[0.3em] uppercase">Most loved</span>
              )}
              {user?.membership === t.name && (
                <span className="absolute -top-3 right-5 px-3 py-1 rounded-full bg-anchor-cream text-anchor-void text-[10px] tracking-[0.3em] uppercase">Active</span>
              )}

              <Icon name={t.icon} size={32} className="text-anchor-cream" />
              <h3 className="mt-4 font-display text-2xl text-anchor-paper">{t.name}</h3>
              <p className="text-xs text-anchor-mist mt-1">{t.tag}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-anchor-cream">{t.price}</span>
                <span className="text-anchor-mist text-sm">{t.cadence}</span>
              </div>

              <ul className="mt-6 space-y-3">
                {t.perks.map(p => (
                  <li key={p.t} className="flex items-center gap-3 text-sm text-anchor-paper/90">
                    <Icon name={p.i} size={18} className="text-anchor-gold" />
                    {p.t}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setJoinTier(t.name)}
                className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors ${t.featured ? 'bg-anchor-cream text-anchor-void' : 'border border-anchor-stone/60 text-anchor-cream'}`}
              >
                <Icon name="signup" size={16} />
                {user?.membership === t.name ? 'Manage Pass' : 'Join Now'}
              </button>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="py-24">
        <h2 className="font-display text-3xl text-anchor-paper mb-10">Every pass includes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ['wifi', '1 Gbps Wi-Fi'],
            ['power', 'Plug at every seat'],
            ['lockers', 'Day lockers'],
            ['quiet', 'Silent mezzanine'],
            ['hours', '07:00 — 23:00'],
            ['community', 'Community events'],
            ['focusTimer', 'Focus rituals'],
            ['notifications', 'Booking alerts']
          ].map(([i, t]) => (
            <div key={t} className="p-5 rounded-xl bg-anchor-coal/60 border border-anchor-stone/60 flex items-center gap-3">
              <Icon name={i} size={22} className="text-anchor-gold" />
              <span className="text-sm text-anchor-paper">{t}</span>
            </div>
          ))}
        </div>
      </Section>

      {joinTier && (
        <MembershipModal defaultTier={joinTier} onClose={() => setJoinTier(null)} />
      )}
    </div>
  );
}
