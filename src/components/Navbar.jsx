import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Icon from './Icon';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/',           label: 'Home',      icon: 'home' },
  { to: '/about',      label: 'About',     icon: 'about' },
  { to: '/menu',       label: 'Coffee Bar',icon: 'coffee' },
  { to: '/workspace',  label: 'Spaces',    icon: 'study' },
  { to: '/membership', label: 'Membership',icon: 'membership' },
  { to: '/merch',      label: 'Merch',     icon: 'merch' },
  { to: '/gallery',    label: 'Gallery',   icon: 'gallery' },
  { to: '/tech',       label: 'Our Tech',  icon: 'beans' },
  { to: '/contact',    label: 'Contact',   icon: 'contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { user, openLogin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? 'bg-anchor-void/85 backdrop-blur-xl border-b border-anchor-stone/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <Icon name="anchor" size={34} className="text-anchor-cream" />
          <div className="leading-none">
            <div className="font-display text-sm tracking-[0.22em] uppercase text-anchor-paper">Anchor&apos;s</div>
            <div className="text-[10px] tracking-[0.42em] uppercase text-anchor-gold mt-1">Space</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `relative flex items-center gap-2 text-[13px] tracking-wide transition-colors ${isActive ? 'text-anchor-cream' : 'text-anchor-mist'}`}>
              {({ isActive }) => (
                <>
                  <Icon name={l.icon} size={18} className={isActive ? 'text-anchor-cream' : 'text-anchor-mist'} />
                  <span>{l.label}</span>
                  {isActive && <span className="absolute -bottom-2 left-0 right-0 h-px bg-anchor-gold" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 grid place-items-center rounded-full border border-anchor-stone/70 text-anchor-cream"
          >
            <Icon name="cart" size={18} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-anchor-gold text-anchor-void text-[10px] font-bold grid place-items-center">
                {count}
              </span>
            )}
          </button>

          {/* Auth button */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-anchor-mist hidden xl:block">{user.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="w-10 h-10 grid place-items-center rounded-full border border-anchor-stone/70 text-anchor-cream"
                title="Log out"
              >
                <Icon name="account" size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={openLogin}
              className="w-10 h-10 grid place-items-center rounded-full border border-anchor-stone/70 text-anchor-cream"
              title="Log in"
            >
              <Icon name="account" size={18} />
            </button>
          )}

          <Link to="/workspace" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-anchor-cream text-anchor-void text-sm font-medium">
            <Icon name="calendar" size={16} />
            Book a Pod
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => setCartOpen(true)} className="relative w-9 h-9 grid place-items-center text-anchor-cream">
            <Icon name="cart" size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-anchor-gold text-anchor-void text-[9px] font-bold grid place-items-center">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(o => !o)} className="w-10 h-10 grid place-items-center text-anchor-cream">
            <div className="space-y-1.5">
              <span className={`block w-6 h-px bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block w-6 h-px bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[700px]' : 'max-h-0'} bg-anchor-coal/95 backdrop-blur-xl`}>
        <nav className="grid grid-cols-2 px-6 py-6 gap-x-6 gap-y-3">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 py-2 ${isActive ? 'text-anchor-cream' : 'text-anchor-paper'}`}>
              <Icon name={l.icon} size={20} />
              <span className="text-sm">{l.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-6 pb-6 pt-2 border-t border-anchor-stone/60 flex gap-3">
          {user ? (
            <button onClick={() => { logout(); setOpen(false); }} className="flex-1 py-2.5 rounded-xl border border-anchor-stone/60 text-anchor-mist text-sm">
              Log out ({user.name.split(' ')[0]})
            </button>
          ) : (
            <button onClick={() => { openLogin(); setOpen(false); }} className="flex-1 py-2.5 rounded-xl border border-anchor-stone/60 text-anchor-cream text-sm">
              Log in / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
