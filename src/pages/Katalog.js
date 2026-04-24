import React from 'react';
import { PackageOpen, ArrowRight, Wheat } from 'lucide-react';
import Stack from '../components/Stack';

// Stack images - 3 gambar untuk card stack Katalog Cerita
const stackImages = [
  "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop",
];

const products = [
  {
    id: 1,
    name: "Benih Sayur Pusaka",
    origin: "Petani Lokal Lembang",
    story: "Benih ini diselamatkan dari kepunahan berkat ketekunan Kang Yadi, petani generasi ketiga yang masih memilih merawat benih lokal dibanding hibrida pabrik.",
    price: "Sistem Donasi",
    color: "bg-earth-sand/20"
  },
  {
    id: 2,
    name: "Kompos Organik Rumahan",
    origin: "Kompos Kolektif Warga",
    story: "Dihasilkan dari sisa organik dapur 15 keluarga di kawasan Jakarta Selatan yang difermentasi dengan racikan lokal. Tanah Anda akan sangat menyukainya.",
    price: "Rp 35.000 / Karung",
    color: "bg-earth-brown/10"
  },
  {
    id: 3,
    name: "Teh Bunga Telang Kerajinan",
    origin: "Ibu-ibu Kebun Komunitas",
    story: "Ditanam di pekarangan sempit, dipetik saat embun masih menempel, dan dijemur perlahan di bawah sinar matahari pagi. Sebuah teh yang menyeduh cerita.",
    price: "Rp 45.000 / Toples",
    color: "bg-earth-lightgreen/20"
  }
];

const Katalog = () => {
  return (
    <div className="animate-fade-in w-full pb-16 pt-24 md:pb-24 md:pt-32 min-h-screen bg-earth-cream">
      
      <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 border-b border-earth-brown/20 pb-6 md:pb-8">
           <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-earth-dark leading-tight mb-3 md:mb-4">
                Katalog <span className="italic text-earth-brown">Cerita</span>
              </h1>
              <p className="text-earth-dark/70 max-w-xl">
                Bukan sekadar etalase barang, ini adalah dokumentasi perjalanan bahan dan keringat pembuatnya. Setiap produk memiliki asalnya sendiri.
              </p>
           </div>
           <div className="mt-8 md:mt-0 flex items-center space-x-2 text-sm font-medium text-earth-green bg-earth-green/10 px-4 py-2 rounded-full">
              <PackageOpen className="w-4 h-4" />
              <span>Tersedia untuk Donasi</span>
           </div>
        </div>

        {/* Stack Interactive Card Section */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left: Stack Card - EXPLICIT FIXED SIZE */}
            <div className="flex flex-col items-center md:items-start">
              {/* Wrapper dengan fixed size LEBIH BESAR dan background untuk visibility */}
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{ 
                  width: '260px', 
                  height: '260px',
                  background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
                }}
              >
                <Stack
                  randomRotation={false}
                  sensitivity={150}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={2500}
                  pauseOnHover={true}
                  animationConfig={{ stiffness: 260, damping: 20 }}
                  cards={stackImages.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`katalog-${i + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '1rem'
                      }}
                    />
                  ))}
                />
              </div>
              <p className="mt-5 text-sm text-earth-dark/60 text-center md:text-left" style={{ maxWidth: '260px' }}>
                Geser atau ketuk kartu untuk melihat cerita lainnya
              </p>
            </div>
            
            {/* Right: Description */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-serif text-earth-dark mb-4">
                Cerita di Balik Setiap <span className="italic text-earth-green">Produk</span>
              </h2>
              <p className="text-earth-dark/70 leading-relaxed mb-6">
                Setiap produk di katalog ini membawa cerita unik dari petani, pengrajin, dan komunitas 
                yang telah berkontribusi. Jelajahi kisah mereka melalui kartu interaktif di samping.
              </p>
              <div className="inline-flex items-center space-x-2 text-sm font-medium text-earth-green bg-earth-green/10 px-4 py-2 rounded-full">
                <PackageOpen className="w-4 h-4" />
                <span>Tersedia untuk Donasi</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-earth-sand/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
               
               <div className={`aspect-square w-full ${product.color} flex items-center justify-center relative overflow-hidden`}>
                  <Wheat className="w-20 h-20 text-earth-dark/20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-earth-dark">
                    {product.origin}
                  </div>
               </div>
               
               <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-earth-dark mb-3 leading-tight">{product.name}</h3>
                  <p className="text-earth-dark/70 text-sm leading-relaxed mb-6 flex-grow">
                    "{product.story}"
                  </p>
                  
                  <div className="pt-6 border-t border-earth-sand/30 flex justify-between items-center mt-auto">
                     <span className="font-sans font-medium text-earth-brown">
                       {product.price}
                     </span>
                     <button className="text-earth-green hover:text-earth-dark transition-colors flex items-center space-x-1 font-semibold text-sm">
                       <span>Pesan</span>
                       <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>

            </div>
          ))}
        </div>


      </div>

    </div>
  );
};

export default Katalog;
