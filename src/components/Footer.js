import React from 'react';
import { Leaf, Camera, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArtikelPage = location.pathname === '/artikel' || location.pathname.startsWith('/artikel/');
  const isProyekPage = location.pathname === '/proyek';

  const handleAdminClick = () => {
    // Navigate to login page with redirect state to admin
    navigate('/login', { state: { from: { pathname: '/admin' } } });
  };

  return (
    <footer className={`${isArtikelPage ? 'bg-[#0a0a0a] text-white border-white/10' : isProyekPage ? 'bg-[#052e16] text-white border-green-500/20' : 'bg-earth-dark text-earth-cream'} pt-8 md:pt-16 pb-4 md:pb-8 border-t ${isArtikelPage ? 'border-white/10' : isProyekPage ? 'border-green-500/20' : 'border-earth-cream/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-12">

          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-3 md:mb-4">
              <Leaf className="h-5 md:h-6 w-5 md:w-6 text-earth-sand" />
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">Selarasa</span>
            </Link>
            <p className={`${isArtikelPage ? 'text-gray-400' : isProyekPage ? 'text-green-200/70' : 'text-earth-cream/70'} text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-sans`}>
              Inisiatif kolektif berbasis komunitas yang bergerak di bidang pangan lokal, urban farming, dan ruang eksplorasi publik.
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-earth-sand hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                aria-label="Instagram"
              >
                <Camera className={`h-5 w-5 ${isArtikelPage ? 'text-gray-400 hover:text-white' : isProyekPage ? 'text-green-300 hover:text-white' : 'text-earth-sand hover:text-white'} transition-colors`} />
              </button>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="text-earth-sand hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                aria-label="Email"
              >
                <Mail className={`h-5 w-5 ${isArtikelPage ? 'text-gray-400 hover:text-white' : isProyekPage ? 'text-green-300 hover:text-white' : 'text-earth-sand hover:text-white'} transition-colors`} />
              </button>
              <span
                onClick={handleAdminClick}
                className="inline-flex items-center justify-center cursor-pointer hover:opacity-70 hover:scale-110 transition-all duration-300 select-none"
                title=""
                role="button"
                aria-label="Admin"
              >
                ⚜️
              </span>
            </div>
          </div>

          <div>
            <h3 className={`font-serif text-base md:text-lg font-semibold mb-2 md:mb-4 ${isArtikelPage ? 'text-gray-300' : isProyekPage ? 'text-green-200' : 'text-earth-sand'}`}>Navigasi</h3>
            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isArtikelPage ? 'text-gray-400' : isProyekPage ? 'text-green-300/80' : 'text-earth-cream/80'}`}>
              <li><Link to="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/program" className="hover:text-white transition-colors">Program & Praktik</Link></li>
              <li><Link to="/proyek" className="hover:text-white transition-colors">Karya & Kolaborasi</Link></li>
              <li><Link to="/katalog" className="hover:text-white transition-colors">Katalog Produk</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={`font-serif text-base md:text-lg font-semibold mb-2 md:mb-4 ${isArtikelPage ? 'text-gray-300' : isProyekPage ? 'text-green-200' : 'text-earth-sand'}`}>Fokus</h3>
            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isArtikelPage ? 'text-gray-400' : isProyekPage ? 'text-green-300/80' : 'text-earth-cream/80'}`}>
              <li><Link to="/fokus" className="hover:text-white transition-colors">Pangan Lokal</Link></li>
              <li><Link to="/fokus" className="hover:text-white transition-colors">Urban Farming</Link></li>
              <li><Link to="/fokus" className="hover:text-white transition-colors">Praktik Kolektif</Link></li>
              <li><Link to="/jaringan" className="hover:text-white transition-colors">Jaringan Komunitas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={`font-serif text-base md:text-lg font-semibold mb-2 md:mb-4 ${isArtikelPage ? 'text-gray-300' : isProyekPage ? 'text-green-200' : 'text-earth-sand'}`}>Kontak</h3>
            
            {/* Peta Jagakarsa - Hidden on mobile */}
            <div className="hidden md:block mb-4 rounded-xl overflow-hidden">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Jl.+Durian+No.30A,+RT.4%2FRW.4,+Jagakarsa,+Kec.+Jagakarsa,+Kota+Jakarta+Selatan,+Daerah+Khusus+Ibukota+Jakarta+12620"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform"
              >
                <img 
                  src="/peta-jagakarsa.png" 
                  alt="Peta Lokasi Jagakarsa - Selarasa Kolektif"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </a>
            </div>

            <ul className={`space-y-2 md:space-y-3 text-xs md:text-sm ${isArtikelPage ? 'text-gray-400' : isProyekPage ? 'text-green-300/80' : 'text-earth-cream/80'} relative`}>
              <li className={`md:mt-2 md:pt-3 md:border-t ${isArtikelPage ? 'md:border-white/10' : isProyekPage ? 'md:border-green-500/20' : 'md:border-earth-cream/10'}`}>
                <Link 
                  to="/partisipasi" 
                  className={`inline-flex items-center gap-2 ${isArtikelPage ? 'text-gray-300 hover:text-white decoration-gray-500' : isProyekPage ? 'text-green-300 hover:text-white decoration-green-500/50' : 'text-earth-sand hover:text-white decoration-earth-sand/50'} underline underline-offset-4 hover:decoration-white transition-all font-medium`}
                >
                  <span>Form Kolaborasi & Barter</span>
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className={`border-t ${isArtikelPage ? 'border-white/10' : isProyekPage ? 'border-green-500/20' : 'border-earth-cream/10'} pt-4 md:pt-8 mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs ${isArtikelPage ? 'text-gray-500' : isProyekPage ? 'text-green-400/60' : 'text-earth-cream/50'}`}>
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Selarasa Kolektif. Diperkuat oleh semangat komunitas.</p>
          <p className="mt-1 md:mt-0">Ditanam dan dirawat dengan sepenuh hati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
