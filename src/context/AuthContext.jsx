import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('as_user') || 'null'); } catch { return null; }
  });
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    localStorage.setItem('as_user', JSON.stringify(user));
  }, [user]);

  function openLogin()    { setAuthMode('login');    setAuthOpen(true); }
  function openRegister() { setAuthMode('register'); setAuthOpen(true); }

  function login(email, password) {
    const stored = JSON.parse(localStorage.getItem('as_users') || '[]');
    const found = stored.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password.');
    const { password: _, ...safe } = found;
    setUser(safe);
    setAuthOpen(false);
    return safe;
  }

  function register(name, email, password) {
    const stored = JSON.parse(localStorage.getItem('as_users') || '[]');
    if (stored.find(u => u.email === email)) throw new Error('Email already registered.');
    const newUser = { id: Date.now(), name, email, password, membership: null, joined: new Date().toISOString() };
    localStorage.setItem('as_users', JSON.stringify([...stored, newUser]));
    const { password: _, ...safe } = newUser;
    setUser(safe);
    setAuthOpen(false);
    return safe;
  }

  function logout() { setUser(null); }

  function updateMembership(tier) {
    const updated = { ...user, membership: tier };
    setUser(updated);
    const stored = JSON.parse(localStorage.getItem('as_users') || '[]');
    localStorage.setItem('as_users', JSON.stringify(
      stored.map(u => u.id === updated.id ? { ...u, membership: tier } : u)
    ));
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateMembership, authOpen, setAuthOpen, authMode, setAuthMode, openLogin, openRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
