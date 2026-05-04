import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot } from 'lucide-react';
import logo from '../assets/logo.png';
import ChatAI from './ChatAI';

// Navigation items
const navLinks = [
  { name: 'Profil', path: '/profil' },
  { name: 'Member', path: '/member' },
  { name: 'Pameran', path: '/pameran' },
  { name: 'Program', path: '/program' },
  { name: 'Contact', path: '/contact' },
  { name: 'Tentang', path: '/about' },
  { name: 'Forum', path: '/forum' },
];

// Optimized spring for smooth performance
const textSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 25,
  mass: 1,
};

const iOSSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 28,
  mass: 0.8,
};

const EnhancedLiquidGlassNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Get active index
  const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
  const showIndicatorForIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Ultra Smooth Glass Indicator - Fixed Sync Issue
  const UltraSmoothGlassIndicator = () => {
    return (
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255, 255, 255, 0.5)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    );
  };

  return (
    <>
      {/* Optimized Navbar - Fixed Height & Performance */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: '72px',
          willChange: 'transform',
        }}
      >
        {/* Optimized Glass Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center justify-between">
            {/* Logo - Clean */}
            <Link to="/" className="flex items-center space-x-2 group z-10">
              <img
                src={logo}
                alt="Logo Selarasa"
                className="h-8 md:h-9 object-contain transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <span className="font-serif text-[17px] font-bold text-[#2D2D2D] cursor-pointer whitespace-nowrap hover:opacity-80 transition-all duration-300">
                Selarasa Jagakarsa Foodlab
              </span>
            </Link>

            {/* Desktop Navigation - Optimized */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative flex items-center px-2 py-2">
                {/* Glass Container */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                />

                {/* Menu Items - Stable Positioning */}
                <div className="relative flex items-center px-1">
                  {navLinks.map((link, index) => {
                    const isActive = showIndicatorForIndex === index;
                    return (
                      <div
                        key={link.name}
                        className="relative"
                      >
                        <Link
                          to={link.path}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="relative px-4 py-2.5 rounded-full whitespace-nowrap block"
                        >
                          {isActive && <UltraSmoothGlassIndicator />}
                          <span
                            className="relative z-10 text-sm font-semibold block origin-center transition-all duration-300"
                            style={{ 
                              color: isActive ? '#1A1A1A' : '#4A4A4A',
                              fontWeight: isActive ? '600' : '500',
                              transform: isActive ? 'scale(1.05)' : 'scale(1)',
                              opacity: isActive ? 1 : 0.85,
                            }}
                          >
                            {link.name}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Button - Optimized */}
              <div
                className="overflow-hidden rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 2px 6px rgba(0, 0, 0, 0.06)',
                }}
              >
                <button
                  onClick={() => {
                    setHoveredIndex(null);
                    setIsAiOpen(prev => {
                      if (!prev) setIsMobileMenuOpen(false);
                      return !prev;
                    });
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-[#3A3A3A] hover:text-[#1A1A1A] transition-all font-medium"
                >
                  <Bot className="w-4 h-4" />
                  <span className="text-sm">AI</span>
                </button>
              </div>

              {/* CTA Button - Optimized */}
              <div
                className="overflow-hidden rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.95) 0%, rgba(107, 83, 68, 1) 100%)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(139, 115, 85, 0.3)',
                }}
              >
                <Link
                  to="/contact"
                  className="block px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>

            {/* Mobile Buttons - Optimized */}
            <div className="flex gap-2 md:hidden items-center z-10">
              {/* Mobile AI Button */}
              <div 
                className="rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <button
                  onClick={() => {
                    setIsAiOpen(prev => {
                      if (!prev) setIsMobileMenuOpen(false);
                      return !prev;
                    });
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-[#3A3A3A] hover:text-[#1A1A1A] transition-all font-medium"
                >
                  <Bot className="w-4 h-4" />
                  <span className="text-xs">AI</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div 
                className="rounded-full overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(prev => {
                      if (!prev) setIsAiOpen(false);
                      return !prev;
                    });
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#1A1A1A]"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div 
                        key="close" 
                        initial={{ rotate: -90, opacity: 0 }} 
                        animate={{ rotate: 0, opacity: 1 }} 
                        exit={{ rotate: 90, opacity: 0 }} 
                        transition={textSpring}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="menu" 
                        initial={{ rotate: 90, opacity: 0 }} 
                        animate={{ rotate: 0, opacity: 1 }} 
                        exit={{ rotate: -90, opacity: 0 }} 
                        transition={textSpring}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel - Optimized */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/35"
              style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={iOSSpring}
              className="md:hidden fixed top-0 right-0 h-full z-50 w-[300px] max-w-[85vw] overflow-hidden"
            >
              {/* Glass Background */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: 'inset 1px 0 0 rgba(255, 255, 255, 0.9), -20px 0 60px rgba(0, 0, 0, 0.15)',
                }}
              />

              <div className="relative h-full">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <div
                    className="rounded-full overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-10 h-10 flex items-center justify-center text-[#3A3A3A] hover:text-[#1A1A1A]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Menu Items - NO DOTS, Darker Text */}
                <div className="px-5 py-2">
                  {navLinks.map((link, index) => {
                    const isMobileActive = activeIndex === index;

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 180)}
                          className="relative block px-4 py-3.5 rounded-xl mb-1 overflow-hidden"
                        >
                          {isMobileActive && (
                            <motion.div
                              layoutId="mobile-ultra-clean-indicator"
                              className="absolute inset-0 rounded-xl"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 40,
                                mass: 0.5,
                              }}
                              style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '0.5px solid rgba(255, 255, 255, 0.8)',
                                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 2px 8px rgba(0, 0, 0, 0.06)',
                              }}
                            />
                          )}

                          <motion.span
                            className="relative z-10 text-base font-semibold block origin-left"
                            animate={{
                              scale: isMobileActive ? 1.05 : 1,
                              opacity: 1,
                              x: isMobileActive ? 4 : 0,
                            }}
                            transition={iOSSpring}
                            style={{
                              color: isMobileActive ? '#1A1A1A' : '#4A4A4A',
                              fontWeight: isMobileActive ? '600' : '500'
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
                    transition={{ delay: navLinks.length * 0.03 }}
                    className="pt-5 mt-4 border-t border-gray-200/40"
                  >
                    <div 
                      className="overflow-hidden rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.95) 0%, rgba(107, 83, 68, 1) 100%)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 16px rgba(139, 115, 85, 0.3)',
                      }}
                    >
                      <Link
                        to="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center px-4 py-4 text-base font-semibold text-white"
                      >
                        Hubungi Kami
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Mobile Dropdown */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed left-0 right-0 z-40 overflow-hidden"
            style={{ top: '70px' }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                height: '70vh',
              }}
            >
              <div className="p-4 h-full">
                <ChatAI isMobile={true} isOpen={true} onClose={() => setIsAiOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Desktop */}
      <div className="hidden md:block">
        <ChatAI isMobile={false} isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </div>
    </>
  );
};

export default EnhancedLiquidGlassNav;