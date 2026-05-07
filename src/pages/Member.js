import React, { useState, useEffect } from 'react';
import { X, Users } from 'lucide-react';
import DarkVeil from '../components/DarkVeil';
import memberJulian from '../assets/images/member-julian.jpg';
import memberTahlia from '../assets/images/member-tahlia.jpg';
import memberBellina from '../assets/images/member-bellina.jpg';
import memberRisya from '../assets/images/member-risya.jpg';
import memberAnita from '../assets/images/member-anita.jpg';

const membersData = [
  {
    id: 1,
    name: 'Bellina Erby',
    photo: memberBellina,
    bio: [
      'Adalah seorang Peneliti pangan dan Pekerja Budaya asal Jakarta, Indonesia. Ia memperoleh gelar Sarjana dalam bidang Filsafat Seni dari Universitas Indonesia dan penerima beasiswa program The Gramounce-Alternative Master 2024/2025 untuk studi pangan berbasis riset seni. Erby mendedikasikan riset dan karyanya untuk menghubungkan individu dan kolektif dalam proyek kolaboratif, dengan fokus pada praktik Kolektif, Budaya Kuliner, Isu Migrasi, dan Perempuan.',
      'Pada tahun 2017, ia menjadi bagian dari tim kuratorial untuk ok. Pangan - Festival Seni Media Indonesia ke-8, OK. Video, yang merupakan biennale seni media yang didirikan oleh ruangrupa pada tahun 2003. Pada tahun 2018, Bellina mengkoordinasikan proyek riset kolaboratif antara Inggris dan Indonesia mengenai pelestarian pangan lokal bagi masyarakat Dayak Iban di Sungai Utik, Kalimantan Barat.',
      'Sejak tahun 2019, ia telah mengoordinasikan proyek solidaritas keadilan pangan dengan delapan inisiatif pangan di SWANA, Asia, Afrika, dan Amerika Latin sembari mendirikan ruang kolaboratif interdisipliner bersama seniman, petani urban, dan warga Jagakarsa bernama Selarasa - Jagakarsa Food Lab.',
      'Erby juga pernah menjabat sebagai asisten direktur artistik dan asisten kuratorial untuk program musik di documenta fifteen, dan sejak itu menetap di Kassel, Jerman. Ia juga merupakan bagian dari Gudskul: Studi Kolektif dan Ekosistem Seni Rupa Kontemporer.',
      'Saat ini, dengan para perempuan seniman berlatar belakang migrasi, ia mendirikan misprints in riso, sebuah studio risografi dan perpustakaan alternatif di Kassel untuk koleksi risografi dari negara-negara bumi bagian Selatan.'
    ],
    kontribusi: 'Peneliti Pangan, Kurator, Gudskul, documenta fifteen, misprints in riso',
    dokumentasi: [
      memberBellina,
    ],
  },
  {
    id: 2,
    name: 'Anita Bonit',
    photo: memberAnita,
    bio: [
      'Anita Bonit adalah seorang ibu, manajer seni, kurator, dan seniman yang berfokus pada seni cetak, refleksi diri, humor, dan kerja kolektif. Pada tahun 2012, ia mendirikan Grafis Huru Hara (GHH), sebuah kolektif seni grafis di Jakarta, dan berperan sebagai manajer hingga 2018. Sejak 2008, ia aktif mengikuti pameran, membuat proyek kolaboratif, serta mengembangkan studio seni cetak sebagai ruang alternatif untuk berkarya dan belajar.',
      'Dalam karyanya, Bonit sering menampilkan figur perempuan dan hewan sebagai cara bercerita tentang pengalaman hidup sehari-hari. Ia menggunakan pendekatan yang ringan dan humoris, namun tetap dekat dengan hal-hal personal. Banyak karyanya mengangkat kehidupan domestik dan rutinitas rumah tangga, yang ia lihat bukan hanya sebagai pekerjaan sehari-hari, tetapi juga sebagai ruang untuk berpikir dan berkreasi.',
      'Makanan dan bahan dapur juga sering muncul dalam karyanya, sebagai cara untuk menghubungkan cerita pribadi dengan isu budaya dan ekonomi yang lebih luas. Dari hal-hal sederhana seperti memasak atau pekerjaan rumah, ia melihat adanya cerita tentang perawatan, ketahanan hidup, dan ingatan bersama.',
      'Bonit telah terlibat dalam berbagai pameran dan proyek seni di Indonesia dan luar negeri seperti Jakarta Biennale, Pekan Kebudayaan Nasional, documenta fifteen di Kassel, Momentum Biennale di Norwegia, serta proyek di Toronto, Tokyo, Seoul, Kyoto, Nagoya, Yamaguchi, Bangkok, Singapore dan Sydney.',
      'Bonit juga merupakan bagian dari Selarasa Jagakarsa Food Lab, sebuah Kelompok yang bergerak di isu pangan, pertanian kota, dan seni. Di Selarasa, ia berperan di bagian artistik, yaitu menerjemahkan proses dan hasil riset menjadi bentuk visual agar lebih mudah dipahami dan dinikmati oleh publik.',
      'Sejak 2016, Bonit terlibat dalam Gudskul di Jakarta sebagai manajer program. Ia juga menjadi Koordinator Workshop dalam Program Studi Kolektif Gudskul, yang berfokus pada kerja studio cara berkarya dan eksplorasi media dalam praktik seni.'
    ],
    kontribusi: 'Manajer Seni, Kurator, Seniman Cetak, Grafis Huru Hara, Gudskul, Selarasa Food Lab',
    dokumentasi: [
      memberAnita,
    ],
  },
  {
    id: 3,
    name: 'Risya Ayunindya',
    photo: memberRisya,
    bio: [
      'Ayunin Widya Risya, atau biasa dikenal dengan Risya Ayudya adalah seorang seniman dan manajer seni yang berasal dari Surabaya, Jawa Timur. Mengemban Pendidikan di Universitas Negeri Surabaya dengan jurusan Pendidikan Seni Rupa. Karyanya berkisar tentang pangan, lahan, perubahan iklim dan ekonomi sirkular pada rantai makanan. Risya gemar memasak dan mengeksplorasi bahan pangan lokal yang ia jumpai dari risetnya di wilayah-wilayah Indonesia menjadi menu yang memiliki nilai tambah. Risya juga sering mengambil peran sebagai manajer di beberapa inisiatif, dan institusi, serta pada proyek, riset dan pameran.'
    ],
    kontribusi: 'Seniman Fiber Art, Manajer Seni, Macrame, Plants, Cooking, Local Ingredients',
    dokumentasi: [
      memberRisya,
    ],
  },
  {
    id: 4,
    name: 'Julian Riezki',
    photo: memberJulian,
    bio: [
      'Julian Riezki aka Juli Berskema adalah seorang seniman yang berfokus diri di bidang musik yang telah memulai berkarya sejak tahun 2007. Setelah merantau di beberapa kota di Indonesia Timur, Juli kembali tinggal di kota kelahirannya Jakarta pada tahun 2016. Ia melihat banyak perubahan terjadi di Jakarta seperti polusi yang parah, kualitas tanah yang rusak karena pencemaran lingkungan dan juga banyak area terbuka hijau yang telah hilang. Dari keresahan ini ia membuat gerakan bernama "Hutan Jakarta" dengan tujuan agar masyarakat bisa mengakses dan menjadikan ruang terbuka hijau seperti hutan kota untuk dimanfaatkan seperti melakukan praktik pertanian sejak 2016.',
      'Selama menjalankan gerakan "Hutan Jakarta" tersebut, Julian melakukan penelitian akan tumbuhan-tumbuhan yang memiliki kandungan antioksidan yang tinggi untuk menyembuhkan Ibu nya yang mengidap penyakit asma. Dari penelitian ini, ia akhirnya terkoneksi dengan beberapa petani urban, aktivis lingkungan hingga para seniman yang memiliki keresahan dan minat yang sama akan konteks pangan, sosial, lingkungan baik di dalam maupun diluar Jakarta.',
      'Pada tahun 2019, bersama Bellina Erby, Risya Ayunindya, Tahlia Motik dan Anita Bonit membuat kolektif seni bernama Selarasa Jagakarsa Foodlab dan menjadi bagian dari ekosistem seni rupa bernama Gudskul yang aktif hingga saat ini.',
      'Semangat untuk saling terhubung, berbagi pengetahuan dan pengalaman sesama petani memantiknya untuk membuat pertemuan rutin bersama para petani di Jagakarsa, Jakarta Selatan sejak tahun 2020 hingga saat ini yang diberi nama "Majelis Sayur Jagakarsa".'
    ],
    kontribusi: 'Founder Hutan Jakarta, Majelis Sayur Jagakarsa, Selarasa Food Lab',
    dokumentasi: [
      memberJulian,
    ],
  },
  {
    id: 5,
    name: 'Tahlia Motik',
    photo: memberTahlia,
    bio: [
      'Tahlia Motik adalah seorang filmmaker dengan ketertarikan pada isu pangan dan ketahanan pangan berbasis komunitas. Ia terlibat dalam Selarasa FoodLab, sebuah inisiatif yang berfokus pada eksplorasi pangan lokal, riset, serta pengembangan praktik konsumsi yang lebih sadar dan berbasis komunitas.',
      'Pada tahun 2019, ia mengikuti Permaculture Design Course untuk memperdalam pemahamannya tentang sistem pangan yang resilien. Tahlia mengembangkan pendekatan yang menghubungkan pangan, komunitas, seni, dan film.'
    ],
    kontribusi: 'Filmmaker, Permaculture Design Course, Eksplorasi Pangan Lokal',
    dokumentasi: [
      memberTahlia,
    ],
  },
];

const Member = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  // Inject animation styles
  useEffect(() => {
    const modalStyles = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes modalScale {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
      }
      
      .animate-modal-scale {
        animation: modalScale 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 text-earth-cream overflow-hidden">
        {/* DarkVeil Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil 
            hueShift={20}
            noiseIntensity={0.1}
            scanlineIntensity={0.3}
            speed={0.5}
            scanlineFrequency={2}
            warpAmount={0.5}
            resolutionScale={1}
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-earth-dark/70 via-earth-dark/60 to-earth-brown/70" />
        
        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
          <div className="pt-16 md:pt-8 min-h-[200px] md:min-h-[150px] flex flex-col justify-center">
            <Users className="w-10 h-10 md:w-12 md:h-12 text-earth-sand mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Member</h1>
            <p className="text-earth-cream/90 max-w-2xl mx-auto text-sm md:text-base">
              Kenali member selarasa jagakarsa foodlab yang turut merawat dan menumbuhkan ekosistem pangan lokal.
            </p>
          </div>
        </div>
      </section>

      {/* Members Grid - Mobile: 2-1-2 Layout | Desktop: Horizontal Row */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* MOBILE LAYOUT - 2-1-2 (unchanged) */}
          <div className="md:hidden">
            {/* Top Row - 2 Members */}
            <div className="flex justify-center gap-6 mb-6">
              {membersData.filter(m => m.name === 'Bellina Erby' || m.name === 'Anita Bonit').map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform shadow-lg" 
                    onClick={() => setSelectedMember(member)}
                  />
                  <p className="text-xs mt-3 font-medium">{member.name}</p>
                </div>
              ))}
            </div>

            {/* Middle Row - Tahlia (Center) */}
            <div className="flex justify-center mb-6">
              {membersData.filter(m => m.name === 'Tahlia Motik').map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform shadow-lg" 
                    onClick={() => setSelectedMember(member)}
                  />
                  <p className="text-xs mt-3 font-medium">{member.name}</p>
                </div>
              ))}
            </div>

            {/* Bottom Row - 2 Members */}
            <div className="flex justify-center gap-6">
              {membersData.filter(m => m.name === 'Risya Ayunindya' || m.name === 'Julian Riezki').map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform shadow-lg" 
                    onClick={() => setSelectedMember(member)}
                  />
                  <p className="text-xs mt-3 font-medium">{member.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP LAYOUT - Horizontal Row (Erby to Tahlia) */}
          <div className="hidden md:flex justify-center gap-8 lg:gap-12">
            {membersData.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <img 
                  src={member.photo} 
                  alt={member.name}
                  className="w-32 h-32 lg:w-36 lg:h-36 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform shadow-lg" 
                  onClick={() => setSelectedMember(member)}
                />
                <p className="text-sm mt-3 font-medium">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Detail Modal - MODERN DESIGN */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-modal-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-50 to-white border-b border-amber-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Profil Member</h2>
                <p className="text-sm text-gray-500">Selarasa Jagakarsa Foodlab</p>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
              <div className="p-6 md:p-8">
                {/* Member Name - Large and prominent */}
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 text-center md:text-left">
                  {selectedMember.name}
                </h3>

                {/* Main Content Layout - Special for Erby, Bonit, Julian: scroll indicator beside photo */}
                {['Bellina Erby', 'Anita Bonit', 'Julian Riezki'].includes(selectedMember.name) ? (
                  /* Special layout: Photo with scroll indicator beside it, then bio below */
                  <div className="flex flex-col gap-6">
                    {/* Photo + Scroll Indicator Row */}
                    <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6">
                      {/* Photo */}
                      <div className="relative max-w-[260px] sm:max-w-[280px] md:max-w-[320px] mx-auto md:mx-0">
                        <img
                          src={selectedMember.photo}
                          alt={selectedMember.name}
                          className="w-full aspect-[4/5] object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                      </div>

                      {/* Scroll Indicator - Desktop only */}
                      <div className="hidden md:flex flex-col items-center justify-center gap-3 text-gray-500 flex-1">
                        <span className="text-sm font-medium text-center">Scroll ke bawah</span>
                        <svg 
                          className="w-8 h-8 animate-bounce" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Bio Sections - Below photo */}
                    <div className="flex flex-col gap-5">
                      {/* Biodata Section */}
                      <div className="bg-gradient-to-br from-amber-50/80 to-white rounded-2xl p-5 border border-amber-100/50">
                        <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-8 h-0.5 bg-amber-400 rounded-full" />
                          Tentang
                        </h4>
                        <div className="space-y-3">
                          {Array.isArray(selectedMember.bio) ? (
                            selectedMember.bio.map((paragraph, idx) => (
                              <p 
                                key={idx} 
                                className="text-gray-700 leading-relaxed text-[15px]"
                              >
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-700 leading-relaxed text-[15px]">
                              {selectedMember.bio}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Kontribusi Section */}
                      <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-5 border border-stone-200/50">
                        <h4 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-8 h-0.5 bg-stone-400 rounded-full" />
                          Bidang & Kontribusi
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-[15px]">
                          {selectedMember.kontribusi}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard layout: Side by side */
                  <div className="grid md:grid-cols-[280px_1fr] gap-6 md:gap-8">
                    {/* Left Column - Photo */}
                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <img
                          src={selectedMember.photo}
                          alt={selectedMember.name}
                          className="w-full aspect-[4/5] object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                      </div>
                    </div>

                    {/* Right Column - Info */}
                    <div className="flex flex-col gap-5">
                      {/* Biodata Section */}
                      <div className="bg-gradient-to-br from-amber-50/80 to-white rounded-2xl p-5 border border-amber-100/50">
                        <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-8 h-0.5 bg-amber-400 rounded-full" />
                          Tentang
                        </h4>
                        <div className="space-y-3">
                          {Array.isArray(selectedMember.bio) ? (
                            selectedMember.bio.map((paragraph, idx) => (
                              <p 
                                key={idx} 
                                className="text-gray-700 leading-relaxed text-[15px]"
                              >
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-700 leading-relaxed text-[15px]">
                              {selectedMember.bio}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Kontribusi Section */}
                      <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-5 border border-stone-200/50">
                        <h4 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-8 h-0.5 bg-stone-400 rounded-full" />
                          Bidang & Kontribusi
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-[15px]">
                          {selectedMember.kontribusi}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
