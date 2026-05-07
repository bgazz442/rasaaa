import React, { useState } from 'react';
import { 
  Sprout, 
  TreePine, 
  ChevronDown, 
  Target,
  Camera,
  Leaf,
  Bus
} from 'lucide-react';
import odongOdong1 from '../assets/images/odong-odong-1.jpg';
import odongOdong2 from '../assets/images/odong-odong-2.jpg';
import odongOdong3 from '../assets/images/odong-odong-3.jpg';
import programHeroBg from '../assets/images/program-hero-bg.jpg';
import kultumKokedama from '../assets/images/kultum-kokedama.jpeg';
import kultumWhatsapp1 from '../assets/images/kultum-whatsapp-1.jpeg';
import kultumWhatsapp2 from '../assets/images/kultum-whatsapp-2.jpeg';
import kultumWhatsapp3 from '../assets/images/kultum-whatsapp-3.jpeg';
import kultumWhatsapp4 from '../assets/images/kultum-whatsapp-4.jpeg';

const programsData = [
  {
    id: 'kuliah-tumbuhan',
    title: 'Kuliah Tumbuhan',
    icon: <Sprout className="w-7 h-7" />,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-700',
    tagline: 'Belajar dari Alam, Tumbuh Bersama',
    description: `Kuliah Tumbuhan adalah program edukasi berkala yang mengajak peserta mendalami ilmu tentang tumbuhan, pertanian urban, dan ekosistem pangan lokal. Program ini diselenggarakan secara kolaboratif antara Selarasa dan berbagai narasumber dari kalangan akademisi, petani, hingga praktisi lingkungan.`,
    tujuan: [
      'Meningkatkan literasi masyarakat urban tentang tumbuhan dan pertanian',
      'Membangun kesadaran tentang pentingnya kemandirian pangan',
      'Menciptakan ruang belajar terbuka yang inklusif',
      'Mendokumentasikan pengetahuan lokal tentang tumbuhan',
    ],
    dokumentasi: [
      {
        image: kultumKokedama,
        caption: 'Workshop Kokedama',
        description: 'Peserta Kuliah Tumbuhan belajar membuat kokedama, teknik menanam tanaman Jepang menggunakan bola lumut. Workshop ini mengajarkan cara merawat tanaman dengan metode yang estetis dan ramah lingkungan.'
      },
      {
        image: kultumWhatsapp1,
        caption: 'Sesi Diskusi Tumbuhan Lokal',
        description: 'Diskusi interaktif tentang tumbuhan lokal Indonesia dan manfaatnya. Peserta berbagi pengalaman dan pengetahuan tentang tanaman obat tradisional yang tumbuh di sekitar lingkungan mereka.'
      },
      {
        image: kultumWhatsapp2,
        caption: 'Praktik Identifikasi Tanaman',
        description: 'Kegiatan lapangan untuk mengidentifikasi berbagai jenis tanaman. Peserta belajar mengenali ciri-ciri tanaman, habitat, dan cara pemanfaatannya dalam kehidupan sehari-hari.'
      },
      {
        image: kultumWhatsapp3,
        caption: 'Sharing Session dengan Petani',
        description: 'Sesi berbagi pengalaman langsung dengan petani lokal. Peserta mendengarkan cerita tentang praktik pertanian tradisional dan tantangan yang dihadapi petani urban.'
      },
      {
        image: kultumWhatsapp4,
        caption: 'Dokumentasi Pengetahuan Lokal',
        description: 'Kegiatan mendokumentasikan pengetahuan lokal tentang tumbuhan melalui catatan, foto, dan wawancara. Hasil dokumentasi ini menjadi arsip pengetahuan yang dapat diakses oleh komunitas.'
      },
    ],
  },
  {
    id: 'tur-odong-odong',
    title: 'Tur Odong-Odong',
    icon: <Bus className="w-7 h-7" />,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    tagline: 'Jelajahi Kebun, Rasakan Ceritanya',
    description: `Tur Odong-Odong adalah program tur keliling yang mengajak peserta menjelajahi kebun-kebun komunitas dan lokasi pertanian urban di sekitar Jagakarsa menggunakan kendaraan odong-odong. Sebuah pengalaman unik yang menggabungkan wisata, edukasi, dan interaksi langsung dengan petani lokal.`,
    aktivitas: [
      'Keliling kebun komunitas dengan odong-odong',
      'Panen langsung sayur dan buah bersama petani',
      'Workshop singkat tentang teknik menanam',
      'Sharing session dengan warga dan komunitas lokal',
      'Mencicipi hasil olahan pangan lokal',
    ],
    dokumentasi: [
      {
        image: odongOdong1,
        caption: 'Perjalanan Odong-Odong',
        description: 'Peserta tur menikmati perjalanan keliling kebun komunitas menggunakan odong-odong yang dihias meriah. Suasana ceria dan penuh tawa mengiringi perjalanan menuju lokasi kebun pertama.'
      },
      {
        image: odongOdong2,
        caption: 'Kunjungan ke Kebun Komunitas',
        description: 'Peserta tiba di kebun komunitas dan disambut oleh petani lokal. Mereka diajak berkeliling melihat berbagai tanaman sayur dan buah yang ditanam secara organik.'
      },
      {
        image: odongOdong3,
        caption: 'Aktivitas Panen Bersama',
        description: 'Peserta berkesempatan panen langsung sayuran segar dari kebun. Pengalaman hands-on ini memberikan apresiasi lebih terhadap proses produksi pangan lokal.'
      },
    ],
  },
];

const Program = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Disable body scroll when popup is open
  React.useEffect(() => {
    if (previewImage || fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewImage, fullscreenImage]);

  const toggleProgram = (id) => {
    setExpandedProgram(prev => prev === id ? null : id);
  };

  const openPreview = (doc) => {
    console.log('Opening preview with doc:', doc);
    setPreviewImage(doc);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const openFullscreenImage = (imageUrl) => {
    console.log('Opening fullscreen image:', imageUrl);
    setFullscreenImage(imageUrl);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 text-earth-cream overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/90 via-earth-dark/80 to-earth-brown/90">
          <img
            src={programHeroBg}
            alt="Program Selarasa Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <TreePine className="w-10 h-10 md:w-12 md:h-12 text-earth-sand mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent">Program</h1>
          <p className="text-earth-cream/90 max-w-2xl mx-auto text-sm md:text-base">
            Program-program unggulan Selarasa yang menghubungkan masyarakat urban 
            dengan alam dan pangan lokal.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {programsData.map((program) => {
            const isExpanded = expandedProgram === program.id;
            
            return (
              <div
                key={program.id}
                className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden transition-all duration-500"
              >
                {/* Header - Clickable */}
                <button
                  onClick={() => toggleProgram(program.id)}
                  className="w-full p-6 md:p-8 flex items-center gap-4 md:gap-6 text-left hover:bg-stone-50/50 transition-colors"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 ${program.lightColor} rounded-2xl flex items-center justify-center ${program.textColor} flex-shrink-0`}>
                    {program.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-earth-dark">
                      {program.title}
                    </h2>
                    <p className="text-earth-dark/50 text-sm mt-1">{program.tagline}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full ${program.lightColor} flex items-center justify-center ${program.textColor} flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Expandable Content */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-6">
                    {/* Divider */}
                    <div className="border-t border-stone-100" />
                    
                    {/* Description */}
                    <div>
                      <h3 className="font-bold text-earth-dark mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-earth-green" />
                        Penjelasan
                      </h3>
                      <p className="text-earth-dark/70 text-sm md:text-base leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Tujuan / Aktivitas */}
                    <div>
                      <h3 className="font-bold text-earth-dark mb-3 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-earth-green" />
                        {program.tujuan ? 'Tujuan Program' : 'Aktivitas'}
                      </h3>
                      <ul className="space-y-2">
                        {(program.tujuan || program.aktivitas || []).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-earth-dark/70">
                            <span className={`w-1.5 h-1.5 rounded-full ${program.color} mt-1.5 flex-shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dokumentasi */}
                    <div>
                      <h3 className="font-bold text-earth-dark mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-earth-green" />
                        Dokumentasi
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {program.dokumentasi.map((doc, idx) => (
                          <div 
                            key={idx} 
                            className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-xl transition-shadow"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Image clicked:', doc);
                              openPreview(doc);
                            }}
                          >
                            <img
                              src={doc.image}
                              alt={doc.caption}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="text-white text-xs font-medium line-clamp-2">
                                  {doc.caption}
                                </p>
                              </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-earth-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Preview Popup with Description - Modern Premium Responsive */}
      {previewImage && (
        <div 
          className="program-popup-overlay fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4 animate-fadeIn"
          onClick={closePreview}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Close Button - Sticky Top Right */}
          <button
            className="fixed top-3 right-3 md:top-4 md:right-4 z-[10001] text-white hover:text-white/80 transition-all bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2.5 md:p-3 shadow-xl hover:scale-110 active:scale-95"
            onClick={closePreview}
            aria-label="Close preview"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content Container - Modern Premium Card */}
          <div 
            className="program-popup-container relative w-full md:w-auto md:max-w-4xl bg-white md:rounded-3xl shadow-2xl overflow-hidden animate-popupIn"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '100vh' }}
          >
            {/* Mobile: Vertical Layout | Desktop: Horizontal Layout */}
            <div className="flex flex-col md:flex-row h-full" style={{ maxHeight: '100vh' }}>
              
              {/* Image Section - Clickable for fullscreen */}
              <div 
                className="program-popup-image w-full md:w-[62%] bg-gradient-to-br from-stone-900 to-stone-800 flex items-center justify-center overflow-hidden relative cursor-pointer group p-0 md:p-6"
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreenImage(previewImage.image);
                }}
              >
                <img
                  src={previewImage.image}
                  alt={previewImage.caption}
                  className="w-full h-full object-cover md:object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ 
                    maxHeight: '45vh',
                    minHeight: '260px'
                  }}
                />
                {/* Subtle overlay gradient for depth on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none md:hidden" />
                
                {/* Hover indicator for desktop */}
                <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4 shadow-xl">
                    <svg className="w-8 h-8 text-earth-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                
                {/* Mobile tap hint */}
                <div className="md:hidden absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span className="text-white text-xs font-medium">Tap untuk zoom</span>
                </div>
              </div>

              {/* Text Section */}
              <div className="program-popup-text w-full md:w-[38%] bg-white flex flex-col overflow-hidden">
                {/* Scrollable Content Area */}
                <div className="program-popup-content flex-1 overflow-y-auto p-5 md:p-10 space-y-5">
                  {/* Title with decorative line */}
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-earth-dark leading-tight pr-8">
                      {previewImage.caption}
                    </h3>
                    <div className="w-12 md:w-20 h-1.5 bg-gradient-to-r from-earth-green to-earth-lightgreen rounded-full" />
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm md:text-base lg:text-lg text-earth-dark/75 leading-relaxed">
                    {previewImage.description}
                  </p>
                </div>
                
                {/* Bottom fade effect for scroll indication */}
                <div className="h-8 md:h-16 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Preview */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeFullscreenImage}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Close Button */}
          <button
            className="fixed top-4 right-4 z-[10002] text-white hover:text-white/80 transition-all bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 shadow-xl hover:scale-110 active:scale-95"
            onClick={closeFullscreenImage}
            aria-label="Close fullscreen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fullscreen Image */}
          <div className="relative max-w-7xl max-h-[95vh] animate-popupIn">
            <img
              src={fullscreenImage}
              alt="Fullscreen preview"
              className="w-full h-full object-contain"
              style={{ maxHeight: '95vh' }}
            />
          </div>

          {/* Hint text */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            Klik di luar gambar untuk menutup
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-earth-green to-earth-lightgreen rounded-3xl p-8 md:p-12 text-center text-white">
            <Sprout className="w-10 h-10 mx-auto mb-4 text-white/80" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
              Tertarik Ikut Program?
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto mb-6">
              Hubungi kami untuk informasi jadwal program selanjutnya dan cara pendaftaran.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-earth-green px-6 py-3 rounded-xl font-semibold hover:bg-earth-cream transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Program;
