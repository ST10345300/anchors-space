import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

export default function AuthModal() {
  const { authOpen, setAuthOpen, authMode, setAuthMode, login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setError(''); }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (authMode === 'login') {
        login(form.email, form.password);
      } else {
        if (!form.name.trim()) throw new Error('Please enter your name.');
        if (form.password.length < 6) throw new Error('Password must be at least 6 characters.');
        if (form.password !== form.confirm) throw new Error('Passwords do not match.');
        register(form.name, form.email, form.password);
      }
      setForm({ name: '', email: '', password: '', confirm: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isLogin = authMode === 'login';

  return (
    <AnimatePresence>
      {authOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setAuthOpen(false)}
            className="fixed inset-0 z-50 bg-anchor-void/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 grid place-items-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-anchor-coal rounded-2xl border border-anchor-stone/60 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-anchor-stone/60">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="anchor" size={18} className="text-anchor-gold" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-anchor-gold">Anchor&apos;s Space</span>
                  </div>
                  <h2 className="font-display text-2xl text-anchor-paper">
                    {isLogin ? 'Welcome back.' : 'Join the studio.'}
                  </h2>
                </div>
                <button onClick={() => setAuthOpen(false)} className="w-9 h-9 grid place-items-center rounded-full border border-anchor-stone/60 text-anchor-mist">
                  <Icon name="close" size={16} />
                </button>
              </div>

              {/* Toggle tabs */}
              <div className="flex mx-7 mt-6 rounded-xl overflow-hidden border border-anchor-stone/60">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2.5 text-sm transition-colors ${isLogin ? 'bg-anchor-cream text-anchor-void font-medium' : 'text-anchor-mist'}`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2.5 text-sm transition-colors ${!isLogin ? 'bg-anchor-cream text-anchor-void font-medium' : 'text-anchor-mist'}`}
                >
                  Register
                </button>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="px-7 py-6 space-y-3">
                {!isLogin && (
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
                )}
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
                <div className="relative">
                  <Icon name="lockers" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    className="w-full bg-anchor-void border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold text-sm"
                  />
                </div>
                {!isLogin && (
                  <div className="relative">
                    <Icon name="lockers" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-anchor-mist" />
                    <input
                      required
                      type="password"
                      placeholder="Confirm password"
                      value={form.confirm}
                      onChange={e => set('confirm', e.target.value)}
                      className="w-full bg-anchor-void border border-anchor-stone/60 rounded-xl pl-11 pr-4 py-3 text-anchor-paper placeholder:text-anchor-mist focus:outline-none focus:border-anchor-gold text-sm"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2.5">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-anchor-cream text-anchor-void font-medium text-sm mt-2 disabled:opacity-60"
                >
                  {loading ? 'Please wait…' : isLogin ? 'Log In' : 'Create Account'}
                </button>

                <p className="text-center text-xs text-anchor-mist pt-1">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button type="button" onClick={() => setAuthMode(isLogin ? 'register' : 'login')} className="text-anchor-gold underline-offset-2 underline">
                    {isLogin ? 'Register' : 'Log in'}
                  </button>
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
