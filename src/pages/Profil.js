import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Leaf, Building2, MapPin, Sprout, ExternalLink, ChevronDown, HandHeart } from 'lucide-react';
import TeamProfileModal from '../components/TeamProfileModal';
import awalMulaTumbuh from '../assets/images/awal-mula-tumbuh.jpg';
import profilSelarasa from '../assets/images/profil-selarasa.jpg';
import profilHeroBg from '../assets/images/profil-hero-bg.png';

const profilLinks = [
  { name: 'Profil Selarasa', hash: '#selarasa', icon: <Leaf className="w-4 h-4" /> },
  { name: 'Profil Gudskul', hash: '#gudskul', icon: <Building2 className="w-4 h-4" /> },
  { name: 'Profil Kecamatan Jagakarsa', hash: '#jagakarsa', icon: <MapPin className="w-4 h-4" /> },
  { name: 'Profil Majelis Sayur', hash: '#majelis-sayur', icon: <Sprout className="w-4 h-4" />, isExternal: true, externalUrl: 'https://majelissayur.id' },
];

const profileSections = [
  {
    id: 'selarasa',
    title: 'Profil Selarasa',
    icon: <Leaf className="w-6 h-6" />,
    color: 'from-earth-green to-earth-lightgreen',
    bgColor: 'bg-earth-green/10',
    textColor: 'text-earth-green',
    summary: 'Inisiatif kolektif berbasis komunitas yang bergerak di bidang pangan lokal dan urban farming.',
    description: `Selarasa adalah sebuah inisiatif kolektif berbasis komunitas yang bergerak di bidang pangan lokal, urban farming, dan praktik bertumbuh bersama. Didirikan dengan semangat mendekatkan masyarakat urban dengan sumber pangan mereka, Selarasa menjadi ruang eksplorasi publik yang menghidupkan ekosistem lokal.

Melalui berbagai program edukasi, workshop, dan kegiatan komunitas, Selarasa mengajak siapa saja untuk terlibat dalam gerakan kemandirian pangan. Dari menanam di lahan sempit hingga mengolah hasil panen bersama, setiap langkah adalah bagian dari cerita kolektif yang lebih besar.`,
    image: profilSelarasa,
  },
  {
    id: 'gudskul',
    title: 'Profil Gudskul',
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-earth-brown to-earth-sand',
    bgColor: 'bg-earth-brown/10',
    textColor: 'text-earth-brown',
    summary: 'Ekosistem pendidikan kontemporer dan ruang kolaborasi berbasis kolektif.',
    description: `Gudskul (Gudang Sarinah Ekosistem) adalah sebuah ruang belajar publik dan ekosistem pendidikan kontemporer yang didirikan oleh kolektif-kolektif seni di Jakarta. Gudskul menjadi tempat di mana gagasan-gagasan tentang kolektivisme, berbagi pengetahuan, dan praktik bersama dapat tumbuh.

Sebagai mitra strategis Selarasa, Gudskul menyediakan ruang fisik dan jaringan untuk berbagai kegiatan edukasi, diskusi, dan proyek kolaboratif yang berkaitan dengan pangan lokal dan keberlanjutan lingkungan.`,
    image: '/foto-kegiatan-2.png',
  },
  {
    id: 'jagakarsa',
    title: 'Profil Kecamatan Jagakarsa',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-emerald-600 to-green-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600',
    summary: 'Kecamatan di Jakarta Selatan yang menjadi basis kegiatan komunitas Selarasa.',
    description: `Kecamatan Jagakarsa terletak di bagian selatan Jakarta dan dikenal sebagai salah satu kawasan yang masih memiliki banyak ruang hijau. Dengan berbagai kebun dan lahan pertanian urban yang tersebar di wilayahnya, Jagakarsa menjadi lokasi ideal untuk kegiatan komunitas berbasis pangan lokal.

Selarasa memilih Jagakarsa sebagai basis kegiatannya karena potensi pertanian urban yang masih besar. Berbagai program Selarasa dilaksanakan di wilayah ini, melibatkan warga lokal dalam praktik menanam, merawat, dan memanen hasil kebun bersama.`,
    image: '/peta-jagakarsa.jpg',
  },
  {
    id: 'majelis-sayur',
    title: 'Profil Majelis Sayur',
    icon: <Sprout className="w-6 h-6" />,
    color: 'from-lime-600 to-green-500',
    bgColor: 'bg-lime-500/10',
    textColor: 'text-lime-600',
    summary: 'Komunitas berbagi sayur dan pangan lokal di Jagakarsa.',
    description: 'Majelis Sayur adalah komunitas yang bergerak dalam distribusi sayur dan pangan lokal secara kolektif. Klik untuk mengunjungi website Majelis Sayur.',
    isExternal: true,
    externalUrl: 'https://majelissayur.id',
    image: null,
  },
];

const Profil = () => {
  const location = useLocation();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeProfileModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProfile(null), 300);
  };

  // Handle anchor scroll from other pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [location]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 text-earth-cream">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/90 via-earth-dark/80 to-earth-brown/90">
          <img 
            src={profilHeroBg} 
            alt="Profil Selarasa Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <Leaf className="w-10 h-10 md:w-12 md:h-12 text-earth-sand mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">Profil</h1>
          <p className="text-earth-cream/70 max-w-2xl mx-auto text-sm md:text-base">
            Mengenal lebih dekat komunitas dan mitra yang menjadi bagian dari ekosistem Selarasa.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8 animate-bounce">
          <ChevronDown className="w-6 h-6 text-earth-sand/50" />
        </div>
      </section>

      {/* Profile Navigation */}
      <section className="py-8 md:py-12 px-4 bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {profilLinks.map((item) => (
              item.isExternal ? (
                <a
                  key={item.name}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-earth-sand/10 hover:bg-earth-sand/20 text-earth-dark px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  {item.icon}
                  <span className="truncate">{item.name}</span>
                  <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 text-earth-dark/40" />
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.hash.replace('#', ''))}
                  className="flex items-center gap-2 bg-earth-sand/10 hover:bg-earth-sand/20 text-earth-dark px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  {item.icon}
                  <span className="truncate">{item.name}</span>
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Cerita Selarasa Section - Konten lama dari About */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-earth-sand/5 -skew-x-12 transform origin-top hidden md:block"></div>
        <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-earth-dark mb-4">Cerita Tentang Selarasa</h2>
            <p className="text-earth-dark/70 max-w-2xl mx-auto text-sm md:text-base">
              Lebih dari sekadar nama, Selarasa adalah praktik kolektif di mana pangan, manusia, dan tanah bertemu dalam satu jalinan relasi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-earth-dark mb-4 md:mb-6">Awal Mula Tumbuh</h3>
              <p className="text-earth-dark/80 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Selarasa bermula dari kesadaran tentang jarak yang semakin jauh antara masyarakat urban dengan piring makan mereka. Tumbuh di tengah kota, inisiatif ini dirancang sebagai eksperimen ruang hidup.
              </p>
              <p className="text-earth-dark/80 leading-relaxed">
                Melalui kolaborasi lintas disiplin—dari petani, seniman, hingga ibu rumah tangga—kami mulai mengolah lahan yang tersisa, membagikan benih, dan menata ulang narasi tentang kemandirian pangan lokal.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={awalMulaTumbuh}
                  alt="Awal Mula Tumbuh"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Utama */}
      <section className="py-16 md:py-24 bg-earth-cream">
        <div className="w-full px-4 md:max-w-7xl md:mx-auto md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-earth-dark mb-3 md:mb-4">Nilai yang Kami Hidupi</h2>
            <p className="text-earth-dark/70 text-sm md:text-base max-w-2xl mx-auto">
              Fondasi yang menjadi akar dari setiap inisiatif dan program Selarasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 border-b-2 border-earth-green/20 hover:border-earth-green transition-colors">
              <div className="w-16 h-16 bg-earth-sand/30 rounded-full flex justify-center items-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-earth-green" />
              </div>
              <h3 className="text-xl font-serif font-bold text-earth-dark mb-4">Keberlanjutan Organik</h3>
              <p className="text-earth-dark/70 text-sm">Merawat tanah dan menolak ekstraksi yang merusak. Mengembalikan apa yang kita ambil ke dalam ekosistem.</p>
            </div>

            <div className="text-center p-6 border-b-2 border-earth-brown/20 hover:border-earth-brown transition-colors">
              <div className="w-16 h-16 bg-earth-sand/30 rounded-full flex justify-center items-center mx-auto mb-6">
                <HandHeart className="w-8 h-8 text-earth-brown" />
              </div>
              <h3 className="text-xl font-serif font-bold text-earth-dark mb-4">Solidaritas Kolektif</h3>
              <p className="text-earth-dark/70 text-sm">Percaya bahwa praktik pangan tidak bisa berjalan sendiri. Kami merawat hubungan sama pentingnya dengan merawat tanaman.</p>
            </div>

            <div className="text-center p-6 border-b-2 border-earth-lightgreen/20 hover:border-earth-lightgreen transition-colors">
              <div className="w-16 h-16 bg-earth-sand/30 rounded-full flex justify-center items-center mx-auto mb-6">
                <Sprout className="w-8 h-8 text-earth-lightgreen" />
              </div>
              <h3 className="text-xl font-serif font-bold text-earth-dark mb-4">Edukasi Terbuka</h3>
              <p className="text-earth-dark/70 text-sm">Menjadikan kebun sebagai ruang kelas tanpa dinding, memproduksi pengetahuan bersama yang terbuka untuk publik.</p>
            </div>
          </div>
        </div>
      </section>

      
      
      {/* Detail Sections */}
      {profileSections.filter(p => !p.isExternal).map((profile, index) => (
        <section
          key={profile.id}
          id={profile.id}
          className={`py-16 md:py-24 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F2]'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
              {/* Image */}
              {profile.image && (
                <div className="lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                    <img
                      src={profile.image}
                      alt={profile.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${profile.color} opacity-10`} />
                  </div>
                </div>
              )}

              {/* Text */}
              <div className={`${profile.image ? 'lg:w-1/2' : 'w-full max-w-3xl mx-auto'}`}>
                <div className={`inline-flex items-center gap-2 ${profile.bgColor} ${profile.textColor} px-3 py-1.5 rounded-full text-sm font-medium mb-4`}>
                  {profile.icon}
                  <span>{profile.title}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-dark mb-6">
                  {profile.title}
                </h2>
                <div className="space-y-4">
                  {profile.description.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-earth-dark/70 leading-relaxed text-sm md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Team Profile Modal */}
      <TeamProfileModal
        profile={selectedProfile}
        isOpen={isModalOpen}
        onClose={closeProfileModal}
      />
    </div>
  );
};

export default Profil;
