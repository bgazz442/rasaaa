import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  // Add CSS styles untuk root fix mobile scroll
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* ROOT FIX: Nonaktifkan semua efek overlay yang menangkap touch */
      * {
        -webkit-tap-highlight-color: transparent;
      }
      
      html, body {
        overflow-x: hidden !important;
        overflow-y: auto !important;
        touch-action: pan-y !important;
        -webkit-overflow-scrolling: touch !important;
      }
      
      /* Nonaktifkan semua efek overlay yang mungkin menangkap touch */
      .nav-item-wrapper::before,
      .nav-item-wrapper::after,
      .effect,
      .effect *,
      .gooey-nav-container,
      .gooey-nav-container *:not(a),
      .filter,
      .filter *,
      .overlay,
      .overlay * {
        pointer-events: none !important;
      }
      
      /* Aktifkan hanya link/menu yang bisa diklik */
      .nav-item-wrapper,
      .nav-item-link,
      .nav-item-wrapper a,
      button,
      a {
        pointer-events: auto !important;
      }
      
      /* Pastikan tidak ada elemen fullscreen yang menangkap touch */
      div[style*="position: fixed"],
      div[style*="position: absolute"] {
        pointer-events: none !important;
      }
      
      /* Exception untuk elemen yang memanggil perlu interaksi */
      .mobile-menu-overlay:not(.pointer-events-none),
      .mobile-menu-panel:not(.pointer-events-none),
      button:not(.pointer-events-none),
      a:not(.pointer-events-none) {
        pointer-events: auto !important;
      }
      
      /* Navbar styles */
      .nav-item-wrapper {
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
        pointer-events: auto !important;
      }
      
      .nav-item-wrapper::before {
        content: '';
        position: absolute;
        inset: 0;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background: rgba(255, 255, 255, 0);
        border: 1px solid transparent;
        border-radius: 0.5rem;
        transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: -1;
        pointer-events: none !important;
      }
      
      .nav-item-link {
        position: relative;
        color: rgb(120 120 120 / 0.75);
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        display: block;
        transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 1;
        pointer-events: auto !important;
      }
      
      .nav-item-wrapper:hover .nav-item-link {
        color: rgb(92 85 72);
      }
      
      .nav-item-wrapper:hover::before {
        background: rgba(255, 255, 255, 0.03);
      }
      
      .nav-item-wrapper.active::before {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }
      
      .nav-item-wrapper.active .nav-item-link {
        color: rgb(92 85 72);
      }
      
      .nav-indicator {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 1rem;
        height: 0.125rem;
        background: rgb(92 85 72);
        border-radius: 9999px;
        transform: translateX(-50%);
        z-index: 2;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Debouncing function untuk animasi smooth
  const handleNavClick = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Lock animation untuk 500ms
  }, [isAnimating]);

  const navLinks = [
    { name: 'Profil', path: '/profil' },
    { name: 'Member', path: '/member' },
    { name: 'Pameran', path: '/pameran' },
    { name: 'Program', path: '/program' },
    { name: 'Contact', path: '/contact' },
    { name: 'Tentang', path: '/about' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'navbar-scrolled py-2'
          : 'bg-transparent py-3 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group z-10 min-w-0">
            <span className="font-serif font-bold text-earth-dark tracking-tight leading-tight min-w-0">
              <span className="block md:hidden text-sm">Selarasa</span>
              <span className="hidden md:block text-lg lg:text-xl">Selarasa Jagakarsa Foodlab</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                className={`nav-item-wrapper ${location.pathname === link.path ? 'active' : ''}`}
                whileHover={{ 
                  scale: 1.015,
                  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                }}
                whileTap={{ 
                  scale: 0.985,
                  transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] }
                }}
                onClick={handleNavClick}
              >
                <Link
                  to={link.path}
                  className="nav-item-link"
                  style={{
                    pointerEvents: isAnimating ? 'none' : 'auto'
                  }}
                >
                  {link.name}
                </Link>
                {location.pathname === link.path && (
                  <div className="nav-indicator" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg text-earth-dark hover:bg-earth-sand/20 transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-[9px] rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-[9px] -rotate-45' : 'top-[17px]'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ 
          zIndex: isMobileMenuOpen ? 40 : -1
        }}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] max-w-[80vw] bg-earth-cream/98 backdrop-blur-xl shadow-2xl transition-all duration-400 ease-out ${
          isMobileMenuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible pointer-events-none'
        }`}
        style={{ 
          zIndex: isMobileMenuOpen ? 50 : -1
        }}
      >
        {/* Close button area */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-earth-dark/60 hover:text-earth-dark hover:bg-earth-sand/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Links */}
        <div className="px-4 py-2 flex flex-col space-y-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-300
                ${
                  location.pathname === link.path
                    ? 'text-earth-green bg-earth-green/10 font-semibold'
                    : 'text-earth-dark/70 hover:text-earth-dark hover:bg-earth-sand/15'
                }
              `}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sand/40 mr-3 flex-shrink-0" />
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-earth-brown/10">
          <p className="text-xs text-earth-dark/40 text-center">
            Selarasa Jagakarsa Foodlab
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
