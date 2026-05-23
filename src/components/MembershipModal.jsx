import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

const TIERS = [
  { name: 'Student Pass',    price: 'R249/mo', icon: 'studentPass', tag: 'For undergrads & postgrads' },
  { name: 'Creator Pass',    price: 'R449/mo', icon: 'rewards',     tag: 'For freelancers & founders' },
  { name: 'Night Owl Pass',  price: 'R199/mo', icon: 'nightPass',   tag: '18:00 — 23:00 only' },
  { name: 'Unlimited Focus', price: 'R899/mo', icon: 'premium',     tag: 'For deep work, daily' },
];

export default function MembershipModal({ defaultTier, onClose }) {
  const { user, updateMembership, openLogin } = useAuth();
  const [tier, setTier] = useState(defaultTier || 'Student Pass');
  const [step, setStep] = useState(1); // 1 = pick tier, 2 = fill form, 3 = success
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', studentNo: '', payment: 'card', agree: false });
  const [error, setError] = useState('');
  const selected = TIERS.find(t => t.name === tier) || TIERS[0];

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setError(''); }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.agree) { setError('Please accept the terms to continue.'); return; }
    if (!user) { onClose(); openLogin(); return; }
    updateMembership(tier);
    setStep(3);
  }

  return (
    <AnimatePresence>
      {true && (
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
              className="w-full max-w-lg bg-anchor-coal rounded-2xl border border-anchor-stone/60 overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-anchor-stone/60">
                <div className="flex items-center gap-2">
                  <Icon name="membership" size={18} className="text-anchor-gold" />
                  <span className="font-display text-xl text-anchor-paper">
                    {step === 3 ? 'You\'re in.' : 'Join the Studio'}
                  </span>
                </div>
                <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-full border border-anchor-stone/60 text-anchor-mist">
                  <Icon name="close" size={16} />
                </button>
              </div>

              {/* Step 1 — Pick tier */}
              {step === 1 && (
                <div className="px-7 py-6 space-y-4">
                  <p className="text-sm text-anchor-mist">Choose the pass that fits your rhythm.</p>
                  <div className="space-y-2">
                    {TIERS.map(t => (
                      <button
                        key={t.name}
                        onClick={() => setTier(t.name)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${tier === t.name ? 'border-anchor-gold/60 bg-anchor-gold/10' : 'border-anchor-stone/60'}`}
                      >
                        <Icon name={t.icon} size={22} className="text-anchor-gold shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-anchor-paper">{t.name}</p>
                          <p className="text-xs text-anchor-mist mt-0.5">{t.tag}</p>
                        </div>
                        <span className="font-display text-anchor-gold shrink-0">{t.price}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm mt-2"
                  >
                    Continue with {selected.name}
                  </button>
                </div>
              )}

              {/* Step 2 — Fill form */}
              {step === 2 && (
                <form onSubmit={onSubmit} className="px-7 py-6 space-y-4">
                  {/* Selected tier summary */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-anchor-void border border-anchor-stone/60">
                    <Icon name={selected.icon} size={20} className="text-anchor-gold" />
                    <div className="flex-1">
                      <p className="font-display text-anchor-paper text-sm">{selected.name}</p>
                      <p className="text-xs text-anchor-mist">{selected.price}</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-anchor-gold underline">Change</button>
                  </div>

                  {!user && (
                    <p className="text-xs text-anchor-mist bg-anchor-void/60 rounded-xl px-4 py-3 border border-anchor-stone/60">
                      You&apos;ll need an account to activate your membership.{' '}
                      <button type="button" onClick={() => { onClose(); openLogin(); }} className="text-anchor-gold underline">Log in or register</button>
                    </p>
                  )}

                  <div className="relative">
                    <Icon name="account" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      className="w-full bg-anchor-void border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold text-sm"
                    />
                  </div>

                  <div className="relative">
                    <Icon name="contact" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      className="w-full bg-anchor-void border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold text-sm"
                    />
                  </div>

                  {tier === 'Student Pass' && (
                    <div className="relative">
                      <Icon name="study" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
                      <input
                        required
                        type="text"
                        placeholder="Student number"
                        value={form.studentNo}
                        onChange={e => set('studentNo', e.target.value)}
                        className="w-full bg-anchor-void border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold text-sm"
                      />
                    </div>
                  )}

                  {/* Payment */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold mb-2">Payment method</p>
                    <div className="flex gap-2">
                      {['card', 'eft', 'snapscan'].map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => set('payment', p)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm capitalize transition-all ${form.payment === p ? 'border-anchor-gold bg-anchor-gold/10 text-anchor-cream' : 'border-anchor-stone/60 text-anchor-mist'}`}
                        >
                          {p === 'eft' ? 'EFT' : p === 'snapscan' ? 'SnapScan' : 'Card'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => set('agree', !form.agree)}
                      className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${form.agree ? 'bg-anchor-gold border-anchor-gold' : 'border-anchor-stone/60'}`}
                    >
                      {form.agree && <span className="text-anchor-void text-xs font-bold">✓</span>}
                    </div>
                    <span className="text-xs text-anchor-mist">
                      I agree to the Anchor&apos;s Space{' '}
                      <span className="text-anchor-gold underline cursor-pointer">membership terms</span>.
                      Cancel anytime, no fees.
                    </span>
                  </label>

                  {error && <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2.5">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm"
                  >
                    Activate {selected.name} · {selected.price}
                  </button>
                </form>
              )}

              {/* Step 3 — Success */}
              {step === 3 && (
                <div className="px-7 py-12 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-anchor-gold/20 border border-anchor-gold/40 grid place-items-center">
                    <Icon name="anchor" size={28} className="text-anchor-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-anchor-paper">Welcome aboard.</h3>
                    <p className="text-anchor-mist mt-2 text-sm max-w-xs mx-auto">
                      Your <strong className="text-anchor-cream">{tier}</strong> is now active. See you at the studio.
                    </p>
                  </div>
                  <button onClick={onClose} className="px-8 py-3 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm">
                    Let&apos;s go
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
