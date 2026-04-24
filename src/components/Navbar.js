import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

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

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-2 md:py-3' : 'bg-transparent py-3 md:py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="Logo Selarasa" className="h-8 md:h-10 object-contain transition-transform group-hover:scale-105" />
            <span className="font-serif text-2xl font-bold text-earth-dark tracking-tight">Selarasa</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-earth-green px-2 py-1 rounded-md
                  ${location.pathname === link.path ? 'text-earth-green font-semibold' : 'text-earth-dark/80'}
                `}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/partisipasi"
              className="bg-earth-brown text-earth-cream px-5 py-2 rounded-full text-sm font-medium hover:bg-earth-dark transition-all transform hover:-translate-y-0.5"
            >
              Terlibat
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-earth-dark hover:text-earth-green focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="md:hidden bg-earth-cream/95 backdrop-blur-lg shadow-xl border-l border-earth-brown/10 fixed top-0 right-0 h-full mobile-menu-container z-50">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-earth-dark hover:text-earth-green p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mobile-menu-grid menu-list">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`mobile-menu-item font-medium transition-colors hover:bg-earth-sand/20 hover:text-earth-green rounded-md
                    ${location.pathname === link.path ? 'text-earth-green font-semibold bg-earth-sand/10' : 'text-earth-dark/80'}
                  `}
                  style={{
                    textAlign: index % 2 === 0 ? 'left' : 'right',
                    justifySelf: index % 2 === 0 ? 'start' : 'end'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-menu-cta pt-2">
                 <Link 
                    to="/partisipasi"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-earth-brown text-earth-cream px-4 py-3 rounded-lg text-sm font-medium hover:bg-earth-dark transition-all"
                  >
                    Ajakan Terlibat
                  </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
