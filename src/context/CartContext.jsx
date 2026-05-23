import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('as_cart') || '[]'); } catch { return []; }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('as_cart', JSON.stringify(items));
  }, [items]);

  function addItem(product, size = 'One Size') {
    setItems(prev => {
      const key = product.name + '_' + size;
      const exists = prev.find(i => i.key === key);
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1, key }];
    });
    setOpen(true);
  }

  function removeItem(key) {
    setItems(prev => prev.filter(i => i.key !== key));
  }

  function updateQty(key, qty) {
    if (qty < 1) { removeItem(key); return; }
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }

  function clearCart() { setItems([]); }

  const total = items.reduce((sum, i) => {
    const n = parseFloat(i.price.replace('R', '').replace(',', ''));
    return sum + n * i.qty;
  }, 0);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
