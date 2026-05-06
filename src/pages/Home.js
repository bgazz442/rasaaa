import React from 'react';
import { Sprout, BookOpen, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import MediaCarousel from '../components/MediaCarousel';

const Home = () => {
  return (
    <div className="animate-fade-in w-full">
      {/* Hero Section */}
      <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 lg:pt-20 lg:pb-20 w-full">
        <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-8 flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
        <div className="lg:w-1/2 z-10 lg:pr-12 pt-16 md:pt-0">
          <div className="inline-flex items-center space-x-2 bg-earth-sand/20 text-earth-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sprout className="w-4 h-4" />
            <span>Kolektif Pangan & Urban Farming</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif text-earth-dark leading-tight mb-6 hidden md:block">
            Merawat Tanah,<br/>
            <span className="text-earth-brown italic">Menumbuhkan Cerita.</span>
          </h1>
          <h1 className="text-3xl sm:text-4xl font-serif text-earth-dark leading-tight mb-6 md:hidden">
            Merawat Tanah, <span className="text-earth-brown italic">Menumbuhkan Cerita.</span>
          </h1>
          <p className="text-base md:text-lg text-earth-dark/70 mb-8 md:mb-10 max-w-xl leading-relaxed">
            Selarasa bukan sekadar kebun. Kami adalah ruang kolektif yang menjelajahi hubungan antara manusia, pangan lokal, dan praktik bertumbuh bersama.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/about" className="bg-earth-dark text-earth-cream px-6 py-3 md:px-8 md:py-4 rounded-full font-medium hover:bg-earth-brown transition-colors text-center shadow-lg shadow-earth-dark/20 text-sm md:text-base">
              Kenali Kami
            </Link>
            <Link to="/contact" className="bg-transparent border border-earth-brown/30 text-earth-dark px-6 py-3 md:px-8 md:py-4 rounded-full font-medium hover:bg-earth-sand/10 transition-colors text-center text-sm md:text-base">
              Hubungi Kami
            </Link>
          </div>
        </div>
        
        
        {/* Media Carousel */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
          <div className="aspect-square bg-earth-sand/30 rounded-full absolute -top-10 -right-10 blur-3xl opacity-50 w-full h-full"></div>
          <MediaCarousel />
          
                    </div>
        </div>
      </section>

      {/* Nilai & Praktik Highlight Section */}
      <section className="py-16 md:py-24 bg-earth-sand/10">
        <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-earth-dark mb-6">Praktik Keseharian Kami</h2>
            <p className="text-earth-dark/70">
              Lebih dari sekadar berproduksi, kami percaya pada proses edukasi, dokumentasi, dan ruang eksplorasi publik yang menghidupkan ekosistem lokal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-earth-cream border border-earth-brown/10 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-earth-sand/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="w-7 h-7 text-earth-green" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-earth-dark mb-3">Urban Farming</h3>
              <p className="text-earth-dark/70 text-sm leading-relaxed mb-6">
                Menghidupkan lahan sempit di perkotaan untuk kemandirian pangan. Kami membagikan praktik tanam yang adaptif.
              </p>
              <Link to="/program" className="text-earth-brown font-medium text-sm hover:text-earth-green inline-flex items-center">
                Lihat Program &rarr;
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-earth-cream border border-earth-brown/10 rounded-2xl p-8 hover:shadow-lg transition-shadow group mt-0 md:mt-8">
              <div className="w-14 h-14 rounded-xl bg-earth-sand/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-earth-green" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-earth-dark mb-3">Edukasi Pangan</h3>
              <p className="text-earth-dark/70 text-sm leading-relaxed mb-6">
                Belajar bersama tentang proses dari benih hingga ke meja makan. Memahami jejak ekologis dan narasi di baliknya.
              </p>
              <Link to="/pameran" className="text-earth-brown font-medium text-sm hover:text-earth-green inline-flex items-center">
                Lihat Pameran &rarr;
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-earth-cream border border-earth-brown/10 rounded-2xl p-8 hover:shadow-lg transition-shadow group mt-0 md:mt-16">
              <div className="w-14 h-14 rounded-xl bg-earth-sand/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HandHeart className="w-7 h-7 text-earth-green" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-earth-dark mb-3">Kolektif Solidaritas</h3>
              <p className="text-earth-dark/70 text-sm leading-relaxed mb-6">
                Menumbuhkan hubungan antarmanusia melalui kolaborasi seni, dan distribusi surplus pangan lokal.
              </p>
              <Link to="/member" className="text-earth-brown font-medium text-sm hover:text-earth-green inline-flex items-center">
                Lihat Member &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-earth-dark text-earth-cream overflow-hidden">
         <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 relative">
               <Link to="/profil" className="block group">
                 <div className="aspect-[4/5] bg-earth-brown rounded-full w-full max-w-sm mx-auto flex items-center justify-center overflow-hidden border-8 border-earth-cream/5 relative cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]">
                    <img 
                      src="/foto-kegiatan-1.jpg" 
                      alt="Selarasa Kolektif"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-center">
                      <p className="font-serif italic text-lg text-earth-sand">Profil Kami</p>
                      <p className="text-xs text-earth-cream/50 mt-2">Klik untuk melihat</p>
                    </div>
                 </div>
               </Link>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight">
                Mengenal lebih dekat<br/>
                <span className="text-earth-sand italic">Selarasa Kolektif.</span>
              </h2>
              <p className="text-earth-cream/70 mb-8 max-w-lg leading-relaxed">
                Kami bukan sekadar komunitas. Selarasa adalah pergerakan kolektif yang merawat hubungan antara manusia dan pangan lokal di Jagakarsa.
              </p>
              <Link to="/profil" className="inline-block bg-earth-sand text-earth-dark px-6 py-3 md:px-8 md:py-4 rounded-full font-medium hover:bg-earth-cream transition-colors shadow-lg text-sm md:text-base text-center w-full md:w-auto">
                Jelajahi Profil Kami
              </Link>
            </div>
         </div>
      </section>
      
    </div>
  );
};

export default Home;
