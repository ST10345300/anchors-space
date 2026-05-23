import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

const STEPS = ['Review', 'Delivery', 'Payment', 'Confirmed'];

function StepBar({ step }) {
  return (
    <div className="flex items-center gap-0 px-7 py-4 border-b border-anchor-stone/60">
      {STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold transition-colors ${i < step ? 'bg-anchor-gold text-anchor-void' : i === step ? 'bg-anchor-cream text-anchor-void' : 'bg-anchor-stone/40 text-anchor-mist'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[11px] uppercase tracking-[0.25em] hidden sm:block ${i === step ? 'text-anchor-cream' : 'text-anchor-mist'}`}>{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-2 transition-colors ${i < step ? 'bg-anchor-gold' : 'bg-anchor-stone/40'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function InputField({ icon, label, type = 'text', value, onChange, placeholder, required, maxLength, pattern }) {
  return (
    <div>
      {label && <label className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold block mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <Icon name={icon} size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          pattern={pattern}
          className={`w-full bg-anchor-void border border-anchor-stone/60 rounded-xl ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold text-sm`}
        />
      </div>
    </div>
  );
}

export default function CheckoutModal({ onClose }) {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [method, setMethod] = useState('delivery');   // 'delivery' | 'pickup'
  const [payMethod, setPayMethod] = useState('card'); // 'card' | 'eft' | 'snapscan'
  const [orderRef] = useState('AS-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  const [info, setInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postal: '',
  });

  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  function setF(key, val) { setInfo(f => ({ ...f, [key]: val })); }
  function setC(key, val) { setCard(c => ({ ...c, [key]: val })); }

  function formatCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExpiry(v) {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d;
  }

  function validateDelivery() {
    const e = {};
    if (!info.name.trim()) e.name = 'Required';
    if (!info.email.trim()) e.email = 'Required';
    if (!info.phone.trim()) e.phone = 'Required';
    if (method === 'delivery') {
      if (!info.address.trim()) e.address = 'Required';
      if (!info.city.trim()) e.city = 'Required';
      if (!info.postal.trim()) e.postal = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePayment() {
    if (payMethod !== 'card') return true;
    const e = {};
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter a valid 16-digit card number';
    if (!card.name.trim()) e.cardName = 'Required';
    if (card.expiry.length < 5) e.expiry = 'Enter MM/YY';
    if (card.cvv.length < 3) e.cvv = 'Enter 3-digit CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateDelivery()) return;
    if (step === 2 && !validatePayment()) return;
    if (step === 2) clearCart();
    setStep(s => s + 1);
  }

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={step === 3 ? onClose : undefined}
          className="fixed inset-0 z-[60] bg-anchor-void/85 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] grid place-items-center p-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full max-w-2xl bg-anchor-coal rounded-2xl border border-anchor-stone/60 overflow-hidden max-h-[92vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-anchor-stone/60 shrink-0">
              <div className="flex items-center gap-3">
                <Icon name="anchor" size={18} className="text-anchor-gold" />
                <span className="font-display text-xl text-anchor-paper">Checkout</span>
              </div>
              {step !== 3 && (
                <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-full border border-anchor-stone/60 text-anchor-mist">
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>

            {/* Step bar */}
            <StepBar step={step} />

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">

              {/* ── STEP 0: Review ── */}
              {step === 0 && (
                <div className="px-7 py-6 space-y-4">
                  <p className="text-sm text-anchor-mist">Review your items before continuing.</p>
                  {items.map(item => (
                    <div key={item.key} className="flex gap-4 p-4 rounded-xl bg-anchor-void border border-anchor-stone/60">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-anchor-paper text-sm">{item.name}</p>
                        <p className="text-[10px] text-anchor-mist uppercase tracking-[0.2em] mt-0.5">{item.color} · {item.size}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-anchor-gold font-display text-sm">{item.price}</p>
                        <p className="text-[10px] text-anchor-mist mt-1">× {item.qty}</p>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <div className="rounded-xl border border-anchor-stone/60 divide-y divide-anchor-stone/40 overflow-hidden">
                    <div className="flex justify-between px-5 py-3 text-sm">
                      <span className="text-anchor-mist">Subtotal</span>
                      <span className="text-anchor-paper">R{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between px-5 py-3 text-sm">
                      <span className="text-anchor-mist">Delivery</span>
                      <span className="text-anchor-paper">{total >= 700 ? 'Free' : 'R80.00'}</span>
                    </div>
                    <div className="flex justify-between px-5 py-3">
                      <span className="font-display text-anchor-cream">Total</span>
                      <span className="font-display text-xl text-anchor-gold">
                        R{(total + (total >= 700 ? 0 : 80)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 1: Delivery ── */}
              {step === 1 && (
                <div className="px-7 py-6 space-y-5">
                  {/* Delivery / Pickup toggle */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold mb-3">Fulfilment</p>
                    <div className="flex gap-2">
                      {[['delivery', 'location', 'Delivery'], ['pickup', 'study', 'Pickup in-store']].map(([val, icon, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setMethod(val)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm transition-all ${method === val ? 'border-anchor-gold bg-anchor-gold/10 text-anchor-cream' : 'border-anchor-stone/60 text-anchor-mist'}`}
                        >
                          <Icon name={icon} size={16} /> {label}
                        </button>
                      ))}
                    </div>
                    {method === 'pickup' && (
                      <p className="mt-2 text-xs text-anchor-mist px-1">📍 21 Quiet Lane, Campus East · Ready in 2–3 days</p>
                    )}
                  </div>

                  <InputField label="Full name"     icon="account" value={info.name}  onChange={v => setF('name', v)}  placeholder="Jane Anchor" required />
                  {errors.name && <p className="text-xs text-red-400 -mt-3">{errors.name}</p>}

                  <InputField label="Email"         icon="contact" type="email" value={info.email} onChange={v => setF('email', v)} placeholder="jane@example.com" required />
                  {errors.email && <p className="text-xs text-red-400 -mt-3">{errors.email}</p>}

                  <InputField label="Phone"         icon="contact" type="tel" value={info.phone} onChange={v => setF('phone', v)} placeholder="+27 82 000 0000" required />
                  {errors.phone && <p className="text-xs text-red-400 -mt-3">{errors.phone}</p>}

                  {method === 'delivery' && (
                    <>
                      <InputField label="Street address" value={info.address} onChange={v => setF('address', v)} placeholder="12 Main Road, Apt 3" required />
                      {errors.address && <p className="text-xs text-red-400 -mt-3">{errors.address}</p>}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <InputField label="City" value={info.city} onChange={v => setF('city', v)} placeholder="Cape Town" required />
                          {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <InputField label="Postal code" value={info.postal} onChange={v => setF('postal', v)} placeholder="8001" required />
                          {errors.postal && <p className="text-xs text-red-400 mt-1">{errors.postal}</p>}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── STEP 2: Payment ── */}
              {step === 2 && (
                <div className="px-7 py-6 space-y-5">
                  {/* Method tabs */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-anchor-gold mb-3">Payment method</p>
                    <div className="flex gap-2">
                      {[['card', 'Card'], ['eft', 'EFT'], ['snapscan', 'SnapScan']].map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPayMethod(val)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm transition-all ${payMethod === val ? 'border-anchor-gold bg-anchor-gold/10 text-anchor-cream' : 'border-anchor-stone/60 text-anchor-mist'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card fields */}
                  {payMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <InputField
                          label="Card number"
                          value={card.number}
                          onChange={v => setC('number', formatCard(v))}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                        {errors.number && <p className="text-xs text-red-400 mt-1">{errors.number}</p>}
                      </div>
                      <div>
                        <InputField
                          label="Name on card"
                          value={card.name}
                          onChange={v => setC('name', v)}
                          placeholder="Jane Anchor"
                        />
                        {errors.cardName && <p className="text-xs text-red-400 mt-1">{errors.cardName}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <InputField
                            label="Expiry"
                            value={card.expiry}
                            onChange={v => setC('expiry', formatExpiry(v))}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiry && <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <InputField
                            label="CVV"
                            value={card.cvv}
                            onChange={v => setC('cvv', v.replace(/\D/g, '').slice(0, 3))}
                            placeholder="000"
                            maxLength={3}
                          />
                          {errors.cvv && <p className="text-xs text-red-400 mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-anchor-mist px-1">
                        <Icon name="lockers" size={13} className="text-anchor-gold" />
                        256-bit SSL encryption · Your card is never stored
                      </div>
                    </div>
                  )}

                  {/* EFT details */}
                  {payMethod === 'eft' && (
                    <div className="rounded-xl border border-anchor-stone/60 divide-y divide-anchor-stone/40 overflow-hidden text-sm">
                      {[
                        ['Bank', 'First National Bank'],
                        ['Account name', "Anchor's Space (Pty) Ltd"],
                        ['Account no.', '62 8834 5610'],
                        ['Branch code', '250 655'],
                        ['Reference', orderRef],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between px-5 py-3">
                          <span className="text-anchor-mist">{k}</span>
                          <span className="text-anchor-paper font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SnapScan */}
                  {payMethod === 'snapscan' && (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="w-40 h-40 rounded-2xl bg-white grid place-items-center border-4 border-anchor-gold/40">
                        <div className="grid grid-cols-4 gap-1 p-3">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={`w-6 h-6 rounded-sm ${Math.random() > 0.4 ? 'bg-anchor-void' : 'bg-white'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-anchor-mist text-center max-w-xs">
                        Open SnapScan, scan the code, and enter <strong className="text-anchor-cream">R{(total + (total >= 700 ? 0 : 80)).toFixed(2)}</strong> · Ref: <strong className="text-anchor-cream">{orderRef}</strong>
                      </p>
                    </div>
                  )}

                  {/* Order summary mini */}
                  <div className="rounded-xl border border-anchor-stone/60 px-5 py-4 flex justify-between items-center">
                    <span className="text-anchor-mist text-sm">Total due</span>
                    <span className="font-display text-xl text-anchor-gold">R{(total + (total >= 700 ? 0 : 80)).toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Confirmed ── */}
              {step === 3 && (
                <div className="px-7 py-12 flex flex-col items-center text-center gap-6">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="w-20 h-20 rounded-full bg-anchor-gold/20 border-2 border-anchor-gold/50 grid place-items-center"
                  >
                    <Icon name="anchor" size={36} className="text-anchor-gold" />
                  </motion.div>

                  <div>
                    <h2 className="font-display text-3xl text-anchor-paper">Order confirmed.</h2>
                    <p className="text-anchor-mist mt-2 text-sm max-w-sm mx-auto">
                      Thanks {info.name.split(' ')[0] || 'friend'} — your order is anchored.
                      {method === 'delivery' ? ' Expect delivery in 3–5 business days.' : ' Your order will be ready for pickup in 2–3 days.'}
                    </p>
                  </div>

                  <div className="w-full rounded-xl border border-anchor-stone/60 divide-y divide-anchor-stone/40 overflow-hidden text-sm text-left">
                    <div className="flex justify-between px-5 py-3">
                      <span className="text-anchor-mist">Order ref</span>
                      <span className="text-anchor-cream font-medium">{orderRef}</span>
                    </div>
                    <div className="flex justify-between px-5 py-3">
                      <span className="text-anchor-mist">Email</span>
                      <span className="text-anchor-paper">{info.email}</span>
                    </div>
                    <div className="flex justify-between px-5 py-3">
                      <span className="text-anchor-mist">Method</span>
                      <span className="text-anchor-paper capitalize">{method}</span>
                    </div>
                    <div className="flex justify-between px-5 py-3">
                      <span className="text-anchor-mist">Total paid</span>
                      <span className="text-anchor-gold font-display">R{(total + (total >= 700 ? 0 : 80)).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm"
                  >
                    Back to the studio
                  </button>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            {step < 3 && (
              <div className="px-7 py-5 border-t border-anchor-stone/60 shrink-0 flex gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="px-5 py-3 rounded-xl border border-anchor-stone/60 text-anchor-mist text-sm"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={goNext}
                  className="flex-1 py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm flex items-center justify-center gap-2"
                >
                  {step === 0 && <><Icon name="location" size={16} /> Continue to Delivery</>}
                  {step === 1 && <><Icon name="lockers" size={16} /> Continue to Payment</>}
                  {step === 2 && <><Icon name="anchor" size={16} /> Place Order · R{(total + (total >= 700 ? 0 : 80)).toFixed(2)}</>}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
