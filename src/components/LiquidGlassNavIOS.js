import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot } from 'lucide-react';
import logo from '../assets/logo.png';
import FuzzyText from './FuzzyText';
import ChatAI from './ChatAI';

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

// Ultra Smooth Spring - More precise transitions
const iOSSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 25,
  mass: 1,
};

// Text sync spring - Matches indicator perfectly
const textSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 25,
  mass: 1,
};

// Morph transition - Ultra smooth entry/exit
const morphSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
  mass: 0.8,
};

const LiquidGlassNavIOS = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for none
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const prevIndexRef = useRef(0);
  const moveTimeoutRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get active index
  const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
  const showIndicatorForIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Handle hover with direction tracking for continuous motion
  const handleMouseEnter = (index) => {
    if (index !== prevIndexRef.current) {
      // Calculate direction: positive = moving right, negative = moving left
      const moveDirection = index > prevIndexRef.current ? 1 : -1;
      setDirection(moveDirection);
      setIsMoving(true);

      // Clear previous timeout
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);

      // Reset after animation completes
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        setDirection(0);
      }, 600);
    }
    prevIndexRef.current = index;
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (hoveredIndex !== null && hoveredIndex !== activeIndex) {
      const moveDirection = activeIndex > hoveredIndex ? 1 : -1;
      setDirection(moveDirection);
      setIsMoving(true);

      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        setDirection(0);
      }, 600);
    }
    setHoveredIndex(null);
    prevIndexRef.current = activeIndex;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  // RESET STATE & TRIGGER ROUTE CHANGE ANIMATION
  useEffect(() => {
    setIsRouteChanging(true);
    setHoveredIndex(null);
    setIsMoving(false);
    setDirection(0);
    prevIndexRef.current = activeIndex;

    // Reset route change flag after navbar transition completes (longer duration for safety)
    const timer = setTimeout(() => {
      setIsRouteChanging(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, activeIndex]);

  // Liquid Indicator Component - Clean fade-in on route change, smooth on hover
  const LiquidIndicator = ({ isMoving, direction, isRouteChanging }) => {
    const skewX = isMoving ? (direction > 0 ? 2 : -2) : 0;
    const scaleX = isMoving ? 1.05 : 1;

    return (
      <motion.div
        layout={!isRouteChanging}
        layoutId={isRouteChanging ? undefined : "ios-liquid-indicator"}
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={isRouteChanging ? { opacity: 0, scale: 0.9 } : { opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          scaleX: scaleX,
          skewX: skewX,
        }}
        transition={{
          layout: isRouteChanging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
          layoutId: isRouteChanging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: isRouteChanging ? 0.3 : 0.2, ease: [0.25, 0.1, 0.25, 1] },
          scale: { duration: isRouteChanging ? 0.35 : 0.25, ease: [0.25, 0.1, 0.25, 1] },
          scaleX: morphSpring,
          skewX: morphSpring,
        }}
        style={{
          background: 'rgba(139, 115, 85, 0.15)',
          boxShadow: 'inset 0 0 0 0.5px rgba(139, 115, 85, 0.2)',
          border: '0.5px solid rgba(139, 115, 85, 0.1)',
          zIndex: 0,
          transformOrigin: direction > 0 ? 'left center' : direction < 0 ? 'right center' : 'center center',
        }}
      />
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'
          }`}
        style={{
          background: 'rgba(250, 247, 242, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Left Side: Logo */}
            <Link to="/" className="flex items-center space-x-1 group z-10">
              <img
                src={logo}
                alt="Logo Selarasa"
                className="h-8 md:h-10 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex items-center -ml-2">
                <FuzzyText
                  fontSize={24}
                  fontWeight={700}
                  fontFamily="'Cactus Classical Serif', Georgia, serif"
                  color="#3D3B36"
                  baseIntensity={0.08}
                  hoverIntensity={0.25}
                  fuzzRange={8}
                  fps={60}
                  direction="horizontal"
                  transitionDuration={8}
                  enableHover={true}
                  className="cursor-pointer"
                >
                  Selarasa
                </FuzzyText>
              </div>
            </Link>{/* ==================== DESKTOP NAV ==================== */}
            <div className="hidden md:flex items-center gap-4">
              {/* Menu Items */}
              <div className="relative flex items-center px-1 py-1 rounded-full bg-transparent">
                {navLinks.map((link, index) => {
                  const isActive = showIndicatorForIndex === index;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="relative px-4 py-2 rounded-full whitespace-nowrap"
                    >
                      {isActive && <LiquidIndicator isMoving={isMoving} direction={direction} isRouteChanging={isRouteChanging} />}
                      <motion.span
                        className="relative z-10 text-sm font-medium block origin-center"
                        animate={{
                          scale: isActive ? 1.08 : 1,
                          opacity: isActive ? 1 : 0.75,
                        }}
                        whileHover={{ opacity: 1 }}
                        transition={textSpring}
                        style={{ color: isActive ? '#1A1A1A' : '#4A4A4A' }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  );
                })}
              </div>

              {/* Desktop AI Button */}
              <button
                onClick={() => {
                  setHoveredIndex(null);
                  setIsAiOpen(prev => {
                    if (!prev) setIsMobileMenuOpen(false);
                    return !prev;
                  });
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-[#8B7355]/10 border border-[#8B7355]/20 text-[#8B7355] hover:bg-[#8B7355]/20 hover:text-[#6B5344] transition-all"
              >
                <Bot className="w-4 h-4" />
                <span className="text-sm font-medium">AI</span>
              </button>

              <Link
                to="/partisipasi"
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #8B7355 0%, #6B5344 100%)',
                  color: '#FAF7F2',
                  boxShadow: '0 4px 15px rgba(139, 115, 85, 0.25)',
                }}
              >
                Terlibat
              </Link>
            </div>

            {/* ==================== MOBILE BUTTONS ==================== */}
            <div className="flex gap-2 md:hidden items-center z-10">
              {/* Mobile AI Button (Styled exactly like Desktop, scaled for mobile) */}
              <button
                onClick={() => {
                  setIsAiOpen(prev => {
                    if (!prev) setIsMobileMenuOpen(false);
                    return !prev;
                  });
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-[#8B7355]/10 border border-[#8B7355]/20 text-[#8B7355] hover:bg-[#8B7355]/20 hover:text-[#6B5344] transition-all"
                style={{ backdropFilter: 'blur(12px)' }}
              >
                <Bot className="w-4 h-4" />
                <span className="text-xs font-medium">AI</span>
              </button>
              
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(prev => {
                    if (!prev) setIsAiOpen(false);
                    return !prev;
                  });
                }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full text-earth-dark hover:text-earth-green bg-white/25 border border-white/30"
                style={{ backdropFilter: 'blur(12px)' }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={textSpring}>
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={textSpring}>
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
              transition={iOSSpring}
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

              {/* Mobile Menu Items dengan Vertical Indicator */}
              <div className="px-5 py-2">
                {navLinks.map((link, index) => {
                  const isMobileActive = activeIndex === index;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.03, ...morphSpring }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 180)}
                        className="relative block px-4 py-3.5 rounded-xl mb-1"
                      >
                        {/* Mobile Vertical Indicator */}
                        {isMobileActive && (
                          <motion.div
                            layout={!isRouteChanging}
                            layoutId={isRouteChanging ? undefined : "mobile-indicator"}
                            className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
                            initial={isRouteChanging ? { opacity: 0, scale: 0.9 } : false}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              layout: isRouteChanging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                              layoutId: isRouteChanging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: isRouteChanging ? 0.25 : 0.2 },
                              scale: { duration: isRouteChanging ? 0.3 : 0.25 },
                            }}
                            style={{
                              background: 'rgba(250, 247, 242, 0.9)',
                              boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
                            }}
                          />
                        )}

                        {/* Mobile Text dengan ZOOM */}
                        <motion.span
                          className="relative z-10 text-base font-medium block origin-left"
                          animate={{
                            scale: isMobileActive ? 1.12 : 1,
                            opacity: isMobileActive ? 1 : 0.75,
                            x: isMobileActive ? 4 : 0,
                          }}
                          transition={iOSSpring}
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
                  transition={{ delay: navLinks.length * 0.03, ...morphSpring }}
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

      {/* ==================== AI MOBILE DROPDOWN ==================== */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed left-0 right-0 z-40 overflow-hidden"
            style={{
              top: '70px',
              background: 'rgba(250, 247, 242, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="p-4" style={{ height: '70vh' }}>
              <ChatAI isMobile={true} isOpen={true} onClose={() => setIsAiOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== AI DESKTOP ==================== */}
      <div className="hidden md:block">
        <ChatAI isMobile={false} isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </div>
    </>
  );
};

export default LiquidGlassNavIOS;
