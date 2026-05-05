import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X, Bot } from 'lucide-react';
import logo from '../assets/logo.png';
import ChatAI from './ChatAI';

// Optimize GSAP defaults for performance
gsap.defaults({
  overwrite: 'auto'
});

const navLinks = [
  { name: 'Profil', path: '/profil' },
  { name: 'Member', path: '/member' },
  { name: 'Pameran', path: '/pameran' },
  { name: 'Program', path: '/program' },
  { name: 'Contact', path: '/contact' },
  { name: 'Tentang', path: '/about' },
  { name: 'Forum', path: '/forum' },
];

const EnhancedCardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const location = useLocation();
  const cardRef = useRef(null);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);
  const tl = useRef(null);
  const activeIndex = navLinks.findIndex(link => link.path === location.pathname);

  // Create single timeline for open/close
  useLayoutEffect(() => {
    if (!cardRef.current) return;

    // Set initial states
    gsap.set(cardRef.current, {
      width: '92%',
      maxWidth: '500px',
      borderRadius: '24px',
      force3D: true,
      transformOrigin: 'top'
    });

    // Hide menu content initially
    if (menuRef.current) {
      gsap.set(menuRef.current, { display: 'none' });
    }

    // Set items and CTA to opacity 0 initially
    gsap.set(itemsRef.current, { opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0 });

    // Create timeline (paused initially)
    tl.current = gsap.timeline({ paused: true });

    // Build timeline - OPEN sequence (all synchronized)
    tl.current
      // Overlay fade in
      .fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'expo.out' }
      )
      // Card slide down + expand
      .fromTo(cardRef.current,
        { y: -12, scale: 0.98 },
        { y: 0, scale: 1, duration: 0.5, ease: 'expo.out' },
        0
      )
      // Menu items fade in WITH the card (synchronized)
      .fromTo(itemsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.06 },
        '-=0.35'
      )
      // CTA fade in together with items
      .fromTo(ctaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        '-=0.25'
      );

    // Set reverse callback - hide menu content when close finishes
    tl.current.eventCallback('onReverseComplete', () => {
      setIsOpen(false);
      if (menuRef.current) {
        gsap.set(menuRef.current, { display: 'none' });
      }
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  // Toggle menu using timeline play/reverse
  const toggleMenu = () => {
    if (!tl.current) return;

    if (!isOpen) {
      // Close AI when opening menu
      setIsAiOpen(false);
      if (menuRef.current) {
        gsap.set(menuRef.current, { display: 'block' });
      }
      tl.current.play();
      setIsOpen(true);
    } else {
      tl.current.reverse();
    }
  };

  // Toggle AI panel
  const toggleAi = () => {
    setIsAiOpen(prev => {
      // Close menu when opening AI
      if (!prev && isOpen) {
        tl.current?.reverse();
      }
      return !prev;
    });
  };

  const handleLinkClick = () => {
    toggleMenu();
  };

  return (
    <>
      {/* iOS-style Overlay backdrop with blur */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: 0,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        onClick={toggleMenu}
      />

      {/* Card Nav Container - Fixed and centered */}
      <div
        className="fixed z-50 card-nav-container"
        style={{
          top: '24px',
          left: '50%',
          transform: 'translateX(calc(-50% + 16px))',
          width: '92%',
          maxWidth: '480px'
        }}
      >
        <div
          ref={cardRef}
          className="relative overflow-hidden"
        >
          {/* iOS-style Glass Background with Enhanced Blur */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(25px) saturate(180%)',
              WebkitBackdropFilter: 'blur(25px) saturate(180%)',
              borderRadius: '24px',
              border: '1px solid rgba(139, 115, 85, 0.3)',
              boxShadow: isOpen
                ? '0 20px 60px rgba(139, 115, 85, 0.15), 0 8px 24px rgba(139, 115, 85, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 4px 20px rgba(139, 115, 85, 0.06), 0 2px 8px rgba(139, 115, 85, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
            }}
          />

          {/* Content Layer */}
          <div className="relative">
            {/* Header - Always visible */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={toggleMenu}
            >
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isOpen) toggleMenu();
                }}
              >
                <img
                  src={logo}
                  alt="Logo Selarasa"
                  className="object-contain"
                  style={{ height: '20px', width: 'auto', maxWidth: '40px' }}
                />
                <span className="font-serif font-bold text-[#2D2D2D] tracking-tight truncate ml-1" style={{ fontSize: '13px', maxWidth: '160px' }}>
                  Selarasa Jagakarsa Foodlab
                </span>
              </Link>

              {/* Buttons Group - AI & Menu side by side */}
              <div className="flex items-center gap-2">
                {/* AI Button with Enhanced iOS Glass */}
                <div 
                  className="rounded-full overflow-hidden"
                  style={{
                    background: isAiOpen
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAi();
                    }}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                    style={{
                      color: isAiOpen ? '#6B5344' : '#4A4A4A'
                    }}
                  >
                    <Bot className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Toggle Button with Enhanced iOS Glass */}
                <div 
                  className="rounded-full overflow-hidden"
                  style={{
                    background: isOpen
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <button
                    className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                    style={{ color: '#4A4A4A' }}
                  >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Content - Only visible when open */}
            {isOpen && (
              <div ref={menuRef} className="px-4 pb-4">
                {/* Navigation Links */}
                <div className="space-y-1 pt-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <div
                        key={link.name}
                        ref={(el) => (itemsRef.current[index] = el)}
                        className="relative overflow-hidden rounded-xl"
                      >
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              backdropFilter: 'blur(12px)',
                              WebkitBackdropFilter: 'blur(12px)',
                              border: '0.5px solid rgba(139, 115, 85, 0.4)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                            }}
                          />
                        )}
                        <Link
                          to={link.path}
                          onClick={handleLinkClick}
                          className={`relative block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                            isActive
                              ? 'text-[#2D2D2D]'
                              : 'text-[#4A4A4A] hover:bg-white/20 hover:text-[#2D2D2D]'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button with Enhanced iOS Glass */}
                <div ref={ctaRef} className="mt-4 pt-4 border-t border-gray-200/40">
                  <div 
                    className="overflow-hidden rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.95) 0%, rgba(107, 83, 68, 1) 100%)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 16px rgba(139, 115, 85, 0.3)',
                    }}
                  >
                    <Link
                      to="/contact"
                      onClick={handleLinkClick}
                      className="block w-full text-center px-4 py-3.5 text-base font-semibold text-white transition-transform duration-200 active:scale-95"
                    >
                      Hubungi Kami
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Mobile Panel with iOS Glass Blur */}
      {isAiOpen && (
        <div 
          className="fixed z-50 md:hidden"
          style={{
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '92%',
            maxWidth: '480px'
          }}
        >
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(26, 26, 26, 0.9)',
              backdropFilter: 'blur(25px) saturate(180%)',
              WebkitBackdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="p-3" style={{ height: '60vh' }}>
              <ChatAI isMobile={true} isOpen={true} onClose={() => setIsAiOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* AI Desktop */}
      <div className="hidden md:block">
        <ChatAI isMobile={false} isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </div>
    </>
  );
};

export default EnhancedCardNav;