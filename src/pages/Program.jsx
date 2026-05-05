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
      kultumKokedama,
      kultumWhatsapp1,
      kultumWhatsapp2,
      kultumWhatsapp3,
      kultumWhatsapp4,
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
      odongOdong1,
      odongOdong2,
      odongOdong3,
    ],
  },
];

const Program = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const toggleProgram = (id) => {
    setExpandedProgram(prev => prev === id ? null : id);
  };

  const openPreview = (imageSrc) => {
    console.log('Opening preview with image:', imageSrc);
    setPreviewImage(imageSrc);
  };

  const closePreview = () => {
    setPreviewImage(null);
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
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {program.dokumentasi.map((img, idx) => (
                          <div 
                            key={idx} 
                            className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Image clicked:', img);
                              openPreview(img);
                            }}
                          >
                            <img
                              src={img}
                              alt={`${program.title} - ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Preview Popup */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={closePreview}
        >
          <div 
            className="relative max-w-4xl max-h-[85vh] md:max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 md:top-2 right-2 md:right-2 text-white/80 hover:text-white transition-colors z-[10000] bg-black/50 rounded-full p-2 md:p-3"
              onClick={closePreview}
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImage}
              alt="Preview documentation"
              className="w-full h-full object-contain rounded-lg"
              style={{ maxHeight: 'calc(85vh - 48px)' }}
            />
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
