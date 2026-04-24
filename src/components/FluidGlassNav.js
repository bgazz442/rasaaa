import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

// FluidGlass 3D Component (Lazy loaded)
const FluidGlass3D = React.lazy(() => import('./FluidGlass3D'));

// Navigation items
const navLinks = [
  { name: 'Tentang', path: '/about' },
  { name: 'Program', path: '/program' },
  { name: 'Proyek', path: '/proyek' },
  { name: 'Fokus', path: '/fokus' },
  { name: 'Proses', path: '/proses' },
  { name: 'Artikel', path: '/artikel' },
  { name: 'Katalog', path: '/katalog' },
  { name: 'Forum', path: '/forum' },
];

// Ultra Smooth iOS Spring - No Stutter
const liquidSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 32,
  mass: 1.2,
};

// Quick response for UI elements - Smooth
const quickSpring = {
  type: 'spring',
  stiffness: 280,
  damping: 36,
  mass: 0.8,
};

// Morph animation config - Ultra Smooth
const morphTransition = {
  type: 'spring',
  stiffness: 150,
  damping: 28,
  mass: 1.2,
};

// 2D Liquid Indicator Component with morph effect
const LiquidIndicator = ({ direction }) => (
  <motion.div
    layoutId="liquid-indicator"
    className="absolute inset-0 rounded-full pointer-events-none -z-10"
    initial={{ scale: 0.96, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      scaleX: direction !== 0 ? 1.05 : 1,
    }}
    exit={{ scale: 0.96, opacity: 0 }}
    style={{
      background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 50%, rgba(255,255,255,0.88) 100%)',
      boxShadow: '0 0 20px rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.02)',
      willChange: 'transform',
    }}
    transition={liquidSpring}
  />
);

const FluidGlassNav = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const prevIndexRef = useRef(0);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get active index
  const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
  const showIndicatorForIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Handle hover with direction tracking
  const handleMouseEnter = (index) => {
    const prev = prevIndexRef.current;
    if (index !== prev) {
      setDirection(index > prev ? 1 : -1);
      prevIndexRef.current = index;
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (hoveredIndex !== null && hoveredIndex !== activeIndex) {
      setDirection(activeIndex > hoveredIndex ? 1 : -1);
      prevIndexRef.current = activeIndex;
    }
    setHoveredIndex(null);
  };

  // Update direction on route change
  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      setDirection(activeIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  // Prepare nav items for 3D component
  const navItems3D = navLinks.map(link => ({
    label: link.name,
    link: link.path
  }));

  return (
    <>
      {/* 3D Fluid Glass Effect - Desktop Only */}
      <div 
        className="hidden md:block fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none"
        style={{ 
          opacity: isScrolled ? 0.9 : 0.7,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Suspense fallback={null}>
          <FluidGlass3D 
            navItems={navItems3D}
            activeIndex={showIndicatorForIndex}
            onItemHover={(index) => setHoveredIndex(index)}
            onItemLeave={() => setHoveredIndex(null)}
            isLoaded={is3DLoaded}
            setIsLoaded={setIs3DLoaded}
          />
        </Suspense>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-nav py-2 md:py-3' 
            : 'bg-transparent py-3 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group z-10">
              <img
                src={logo}
                alt="Logo Selarasa"
                className="h-8 md:h-10 object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-serif text-2xl font-bold text-earth-dark tracking-tight">
                Selarasa
              </span>
            </Link>

            {/* ==================== DESKTOP NAV - 2D + 3D HYBRID ==================== */}
            <div className="hidden md:flex items-center relative">
              {/* 2D Navigation Layer (interactive) */}
              <motion.div
                layout
                className="flex items-center px-2 py-2 rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = showIndicatorForIndex === index;
                  
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="relative px-4 py-2 rounded-full whitespace-nowrap pointer-events-auto"
                    >
                      {/* 2D Liquid Indicator */}
                      {isActive && <LiquidIndicator direction={direction} />}
                      
                      {/* Text with ZOOM */}
                      <motion.span
                        className="relative z-10 text-sm font-medium block origin-center"
                        animate={{
                          scale: isActive ? 1.08 : 1,
                          opacity: isActive ? 1 : 0.7,
                          color: isActive ? '#1A1A1A' : '#4A4A4A',
                        }}
                        whileHover={{ 
                          scale: isActive ? 1.08 : 1.04,
                          opacity: 0.9,
                        }}
                        transition={liquidSpring}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  );
                })}
              </motion.div>

              {/* CTA */}
              <Link
                to="/partisipasi"
                className="ml-4 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 pointer-events-auto"
                style={{
                  background: 'linear-gradient(135deg, #8B7355 0%, #6B5344 100%)',
                  color: '#FAF7F2',
                  boxShadow: '0 4px 15px rgba(139, 115, 85, 0.25)',
                }}
              >
                Terlibat
              </Link>
            </div>

            {/* ==================== MOBILE MENU BUTTON ==================== */}
            <div className="md:hidden flex items-center z-10">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full text-earth-dark hover:text-earth-green"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={quickSpring}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={quickSpring}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== MOBILE MENU PANEL ==================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/35"
              style={{ backdropFilter: 'blur(8px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={liquidSpring}
              className="md:hidden fixed top-0 right-0 h-full z-50 w-[300px] max-w-[85vw]"
              style={{
                background: 'rgba(250, 247, 242, 0.95)',
                backdropFilter: 'blur(40px) saturate(180%)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* Close */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-full text-earth-dark hover:text-earth-green bg-white/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="px-5 py-2">
                {navLinks.map((link, index) => {
                  const isMobileActive = activeIndex === index;
                  
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.03, ...morphTransition }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 180)}
                        className="relative block px-4 py-3.5 rounded-xl mb-1"
                      >
                        {/* Mobile Liquid Indicator */}
                        {isMobileActive && (
                          <motion.div
                            layoutId="mobile-liquid-indicator"
                            className="absolute inset-0 rounded-xl pointer-events-none -z-10"
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            style={{
                              background: 'rgba(255, 255, 255, 0.98)',
                              boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
                              willChange: 'transform',
                            }}
                            transition={liquidSpring}
                          />
                        )}
                        
                        {/* Mobile Text with ZOOM */}
                        <motion.span
                          className="relative z-10 text-base font-medium block origin-left"
                          animate={{
                            scale: isMobileActive ? 1.08 : 1,
                            opacity: isMobileActive ? 1 : 0.7,
                            x: isMobileActive ? 4 : 0,
                          }}
                          transition={liquidSpring}
                          style={{
                            color: isMobileActive ? '#2D5A3D' : '#5C5548',
                          }}
                        >
                          {link.name}
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.03, ...morphTransition }}
                  className="pt-5 mt-4 border-t border-earth-brown/10"
                >
                  <Link
                    to="/partisipasi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-4 rounded-xl text-base font-medium bg-gradient-to-br from-[#8B7355] to-[#6B5344] text-[#FAF7F2]"
                  >
                    Ajakan Terlibat
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FluidGlassNav;
