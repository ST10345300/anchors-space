import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Icon from './Icon';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, total, clearCart, count } = useCart();
  const [checkout, setCheckout] = useState(false);

  function handleCheckout() {
    setOpen(false);
    setTimeout(() => setCheckout(true), 200);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-anchor-void/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-anchor-coal border-l border-anchor-stone/60 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-anchor-stone/60 shrink-0">
                <div className="flex items-center gap-3">
                  <Icon name="cart" size={20} className="text-anchor-gold" />
                  <span className="font-display text-lg text-anchor-paper">Your Cart</span>
                  {count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-anchor-gold text-anchor-void text-[10px] font-bold">
                      {count}
                    </span>
                  )}
                </div>
                <button onClick={() => setOpen(false)} className="w-9 h-9 grid place-items-center rounded-full border border-anchor-stone/60 text-anchor-mist">
                  <Icon name="close" size={16} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                    <Icon name="cart" size={48} className="text-anchor-stone" />
                    <p className="text-anchor-mist">Your cart is empty.</p>
                    <button onClick={() => setOpen(false)} className="text-anchor-gold text-sm">Browse merch →</button>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={item.key} className="flex gap-4 p-4 rounded-xl bg-anchor-void border border-anchor-stone/60">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-anchor-paper text-sm truncate">{item.name}</p>
                        <p className="text-[10px] text-anchor-mist uppercase tracking-[0.2em] mt-0.5">{item.color} · {item.size}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-6 h-6 rounded-full border border-anchor-stone/60 text-anchor-cream text-xs grid place-items-center">−</button>
                            <span className="text-anchor-paper text-sm w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-6 h-6 rounded-full border border-anchor-stone/60 text-anchor-cream text-xs grid place-items-center">+</button>
                          </div>
                          <span className="text-anchor-gold font-display text-sm">{item.price}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.key)} className="text-anchor-mist shrink-0 self-start mt-1">
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-anchor-stone/60 space-y-3 shrink-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-anchor-mist">Subtotal</span>
                    <span className="text-anchor-paper">R{total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-anchor-mist">Delivery</span>
                    <span className="text-anchor-paper">{total >= 700 ? 'Free' : 'R80.00'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-display text-anchor-cream">Total</span>
                    <span className="font-display text-xl text-anchor-gold">R{(total + (total >= 700 ? 0 : 80)).toFixed(2)}</span>
                  </div>

                  {total >= 700 && (
                    <p className="text-[10px] text-anchor-gold text-center tracking-[0.2em]">✓ FREE DELIVERY UNLOCKED</p>
                  )}

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-2xl bg-anchor-cream text-anchor-void font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Icon name="anchor" size={16} />
                    Proceed to Checkout
                  </button>
                  <button onClick={clearCart} className="w-full text-center text-xs text-anchor-mist pt-1">
                    Clear cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout modal */}
      {checkout && (
        <CheckoutModal onClose={() => setCheckout(false)} />
      )}
    </>
  );
}
