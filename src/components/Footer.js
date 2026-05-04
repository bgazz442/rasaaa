import React from 'react';
import { Leaf, Camera, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login', { state: { from: { pathname: '/admin' } } });
  };

  return (
    <footer className="bg-earth-dark text-earth-cream pt-8 md:pt-16 pb-4 md:pb-8 border-t border-earth-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-12">

          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-3 md:mb-4">
              <Leaf className="h-5 md:h-6 w-5 md:w-6 text-earth-sand" />
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">Selarasa Jagakarsa Foodlab</span>
            </Link>
            <p className="text-earth-cream/70 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-sans">
              Inisiatif kolektif berbasis komunitas yang bergerak di bidang pangan lokal, urban farming, dan ruang eksplorasi publik.
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-earth-sand hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                aria-label="Instagram"
              >
                <Camera className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-earth-sand hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </button>
              <span
                onClick={handleAdminClick}
                className="inline-flex items-center justify-center cursor-pointer hover:opacity-70 hover:scale-110 transition-all duration-300 select-none"
                role="button"
                aria-label="Admin"
              >
                ⚜️
              </span>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold mb-2 md:mb-4 text-earth-sand">Navigasi</h3>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-earth-cream/80">
              <li><Link to="/profil" className="hover:text-white transition-colors">Profil</Link></li>
              <li><Link to="/member" className="hover:text-white transition-colors">Member</Link></li>
              <li><Link to="/pameran" className="hover:text-white transition-colors">Pameran</Link></li>
              <li><Link to="/program" className="hover:text-white transition-colors">Program</Link></li>
            </ul>
          </div>

          {/* Halaman */}
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold mb-2 md:mb-4 text-earth-sand">Halaman</h3>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-earth-cream/80">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Tentang</Link></li>
              <li><Link to="/thumbnail" className="hover:text-white transition-colors">Thumbnail</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold mb-2 md:mb-4 text-earth-sand">Kontak</h3>
            
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-earth-cream/80">
              <li>
                <a href="mailto:selarasa.kolektif@gmail.com" className="hover:text-white transition-colors">
                  selarasa.kolektif@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-earth-cream/10 pt-4 md:pt-8 mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-earth-cream/50">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Selarasa Kolektif. Diperkuat oleh semangat komunitas.</p>
          <p className="mt-1 md:mt-0">Ditanam dan dirawat dengan sepenuh hati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
