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
  { name: 'Tentang', path: '/about' },
  { name: 'Program', path: '/program' },
  { name: 'Proyek', path: '/proyek' },
  { name: 'Fokus', path: '/fokus' },
  { name: 'Proses', path: '/proses' },
  { name: 'Artikel', path: '/artikel' },
  { name: 'Katalog', path: '/katalog' },
  { name: 'Forum', path: '/forum' },
];

const CardNav = () => {
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
      {/* Overlay backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
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
          style={{
            background: 'rgba(250, 247, 242, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '24px',
            border: '1px solid rgba(139, 115, 85, 0.15)',
            boxShadow: isOpen
              ? '0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(139, 115, 85, 0.15)'
              : '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(139, 115, 85, 0.1)'
          }}
        >
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
              <span className="font-serif font-bold text-earth-dark tracking-tight" style={{ fontSize: '14px' }}>
                Selarasa
              </span>
            </Link>

            {/* Buttons Group - AI & Menu side by side */}
            <div className="flex items-center gap-2">
              {/* AI Button - Mobile Only */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAi();
                }}
                className="md:hidden p-2 rounded-full transition-all duration-300"
                style={{
                  background: isAiOpen
                    ? 'rgba(139, 115, 85, 0.2)'
                    : 'rgba(139, 115, 85, 0.08)',
                  color: isAiOpen ? '#8B7355' : '#5C5548'
                }}
              >
                <Bot className="h-5 w-5" />
              </button>

              {/* Menu Toggle Button */}
              <button
                className="p-2 rounded-full transition-all duration-300"
                style={{
                  background: isOpen
                    ? 'rgba(139, 115, 85, 0.15)'
                    : 'rgba(139, 115, 85, 0.08)',
                  color: '#5C5548'
                }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
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
                    >
                      <Link
                        to={link.path}
                        onClick={handleLinkClick}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                            ? 'bg-earth-brown/10 text-earth-dark'
                            : 'text-earth-dark/70 hover:bg-earth-sand/10 hover:text-earth-dark'
                          }`}
                      >
                        <span className={isActive ? 'font-semibold' : ''}>
                          {link.name}
                        </span>
                        {isActive && (
                          <span className="ml-2 text-earth-green">●</span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div ref={ctaRef} className="mt-4 pt-4 border-t border-earth-brown/10">
                <Link
                  to="/partisipasi"
                  onClick={handleLinkClick}
                  className="block w-full text-center px-4 py-3.5 rounded-xl text-base font-medium transition-transform duration-200 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #8B7355 0%, #6B5344 100%)',
                    color: '#FAF7F2',
                    boxShadow: '0 4px 15px rgba(139, 115, 85, 0.3)'
                  }}
                >
                  Terlibat
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Mobile Panel */}
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
              background: 'rgba(26, 26, 26, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 115, 85, 0.3)'
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

export default CardNav;
