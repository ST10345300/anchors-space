import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileDock from './components/MobileDock';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Workspace from './pages/Workspace';
import Membership from './pages/Membership';
import Merch from './pages/Merch';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Tech from './pages/Tech';
import TechDetail from './pages/TechDetail';

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function AppInner() {
  const location = useLocation();
  return (
    <div className="grain min-h-screen bg-anchor-void text-anchor-paper">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <AuthModal />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit" className="relative">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/menu"       element={<Menu />} />
            <Route path="/workspace"  element={<Workspace />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/merch"      element={<Merch />} />
            <Route path="/gallery"    element={<Gallery />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/tech"       element={<Tech />} />
            <Route path="/tech/:id"   element={<TechDetail />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileDock />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </AuthProvider>
  );
}
