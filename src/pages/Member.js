import React, { useState } from 'react';
import { X, Users, Briefcase, Camera } from 'lucide-react';
import DarkVeil from '../components/DarkVeil';
import LightRays from '../components/LightRays';
import memberJulian from '../assets/images/member-julian.jpg';
import memberTahlia from '../assets/images/member-tahlia.jpg';
import memberBellina from '../assets/images/member-bellina.jpg';
import memberRisya from '../assets/images/member-risya.jpg';
import memberAnita from '../assets/images/member-anita.jpg';

const membersData = [
  {
    id: 1,
    name: 'Julian Riezki',
    photo: memberJulian,
    bio: 'Julian Riezki aka Juli Berskema adalah seorang seniman yang berfokus diri di bidang musik yang telah memulai berkarya sejak tahun 2007. Setelah merantau di beberapa kota di Indonesia Timur, Juli kembali tinggal di kota kelahirannya Jakarta pada tahun 2016. Ia melihat banyak perubahan terjadi di Jakarta seperti polusi yang parah, kualitas tanah yang rusak karena pencemaran lingkungan dan juga banyak area terbuka hijau yang telah hilang. Dari keresahan ini ia membuat gerakan bernama "Hutan Jakarta" dengan tujuan agar masyarakat bisa mengakses dan menjadikan ruang terbuka hijau seperti hutan kota untuk dimanfaatkan seperti melakukan praktik pertanian sejak 2016.Selama menjalankan gerakan "Hutan Jakarta" tersebut, Julian melakukan penelitian akan tumbuhan-tumbuhan yang memiliki kandungan antioksidan yang tinggi untuk menyembuhkan Ibu nya yang mengidap penyakit asma. Dari penelitian ini, ia akhirnya terkoneksi dengan beberapa petani urban, aktivis lingkungan hingga para seniman yang memiliki keresahan dan minat yang sama akan konteks pangan, sosial, lingkungan baik di dalam maupun diluar Jakarta.Pada tahun 2019, bersama Bellina Erby, Risya Ayunindya, Tahlia Motik dan Anita Bonit membuat kolektif seni bernama Selarasa Jagakarsa Foodlab dan menjadi bagian dari ekosistem seni rupa bernama Gudskul yang aktif hingga saat ini.Semangat untuk saling terhubung, berbagi pengetahuan dan pengalaman sesama petani memantiknya untuk membuat pertemuan rutin bersama para petani di Jagakarsa, Jakarta Selatan sejak tahun 2020 hingga saat ini yang diberi nama "Majelis Sayur Jagakarsa".',
    kontribusi: 'Founder Hutan Jakarta, Majelis Sayur Jagakarsa, Selarasa Food Lab',
    dokumentasi: [
      memberJulian,
    ],
  },
  {
    id: 2,
    name: 'Tahlia Motik',
    photo: memberTahlia,
    bio: 'Tahlia Motik adalah seorang filmmaker dengan ketertarikan pada isu pangan dan ketahanan pangan berbasis komunitas. Ia terlibat dalam Selarasa FoodLab, sebuah inisiatif yang berfokus pada eksplorasi pangan lokal, riset, serta pengembangan praktik konsumsi yang lebih sadar dan berbasis komunitas.Pada tahun 2019, ia mengikuti Permaculture Design Course untuk memperdalam pemahamannya tentang sistem pangan yang resilien. Tahlia mengembangkan pendekatan yang menghubungkan pangan, komunitas, seni, dan film.',
    kontribusi: 'Filmmaker, Permaculture Design Course, Eksplorasi Pangan Lokal',
    dokumentasi: [
      memberTahlia,
    ],
  },
  {
    id: 3,
    name: 'Bellina Erby',
    photo: memberBellina,
    bio: 'Adalah seorang Periset pangan dan Pekerja Budaya asal Jakarta, Indonesia. Ia memperoleh gelar Sarjana dalam bidang Filsafat Seni dari Universitas Indonesia dan penerima beasiswa program The Gramounce-Alternative Master 2024/2025 untuk studi pangan berbasis riset seni. Erby mendedikasikan riset dan karyanya untuk menghubungkan individu dan kolektif dalam proyek kolaboratif, dengan fokus pada praktik Kolektif, Budaya Kuliner, Isu Migrasi, dan Perempuan.Pada tahun 2017, ia menjadi bagian dari tim kuratorial untuk ok. Pangan - Festival Seni Media Indonesia ke-8, OK. Video, yang merupakan biennale seni media yang didirikan oleh ruangrupa pada tahun 2003. Pada tahun 2018, Bellina mengkurasi proyek riset kolaboratif antara Inggris dan Indonesia mengenai pelestarian pangan lokal bagi masyarakat Dayak Iban di Sungai Utik, Kalimantan Barat.Sejak tahun 2019, ia telah mengoordinasikan proyek solidaritas keadilan pangan dengan delapan inisiatif pangan di SWANA, Asia, Afrika, dan Amerika Latin sembari mendirikan ruang kolaboratif interdisipliner bersama seniman, petani urban, dan warga Jagakarsa bernama Selarasa - Jagakarsa Food Lab.Erby juga pernah menjabat sebagai asisten direktur artistik dan asisten kuratorial untuk program musik di documenta fifteen, dan sejak itu menetap di Kassel, Jerman. Ia juga merupakan bagian dari Gudskul: Studi Kolektif dan Ekosistem Seni Rupa Kontemporer.Saat ini, dengan para perempuan seniman berlatar belakang migrasi, ia mendirikan misprints in riso, sebuah studio risography dan perpustakaan alternatif di Kassel untuk koleksi risografi dari negara-negara bumi bagian Selatan.',
    kontribusi: 'Periset Pangan, Kurator, Gudskul, documenta fifteen, misprints in riso',
    dokumentasi: [
      memberBellina,
    ],
  },
  {
    id: 4,
    name: 'Ayunin Widya Risya',
    photo: memberRisya,
    bio: 'Ayunin Widya Risya, also known as Risya Ayudya, is an art manager, artist and cook - based in Surabaya and Jakarta. Received Bachelor\'s degree of Pedagogy of Art from Faculty of Art and Literature at Surabaya State University, Indonesia (2015). Her latest works around fiber art, focused on macrame and plants. Also about food, land, climate change, and circular economy about food chains. She likes cooking and exploring local ingredients from any area. She is also manager for the collectives, organizing an art project, research and exhibition.Ayunin Widya Risya, atau biasa dikenal dengan Risya Ayudya adalah seorang seniman dan manajer seni yang berasal dari Surabaya, Jawa Timur. Mengemban Pendidikan di Universitas Negeri Surabaya dengan jurusan Pendidikan Seni Rupa. Karyanya berkisar tentang pangan, lahan, perubahan iklim dan ekonomi sirkular pada rantai makanan. Risya gemar memasak dan mengeksplorasi bahan pangan lokal yang ia jumpai dari risetnya di wilayah-wilayah Indonesia menjadi menu yang memiliki nilai tambah. Risya juga sering mengambil peran sebagai manajer di beberapa inisiatif, dan institusi, serta pada proyek, riset dan pameran.',
    kontribusi: 'Seniman Fiber Art, Manajer Seni, Macrame, Plants, Cooking, Local Ingredients',
    dokumentasi: [
      memberRisya,
    ],
  },
  {
    id: 5,
    name: 'Anita Bonit',
    photo: memberAnita,
    bio: 'Anita Bonit adalah seorang ibu, manajer seni, kurator, dan seniman yang berfokus pada seni cetak, refleksi diri, humor, dan kerja kolektif. Pada tahun 2012, ia mendirikan Grafis Huru Hara (GHH), sebuah kolektif seni grafis di Jakarta, dan berperan sebagai manajer hingga 2018. Sejak 2008, ia aktif mengikuti pameran, membuat proyek kolaboratif, serta mengembangkan studio seni cetak sebagai ruang alternatif untuk berkarya dan belajar.Dalam karyanya, Bonit sering menampilkan figur perempuan dan hewan sebagai cara bercerita tentang pengalaman hidup sehari-hari. Ia menggunakan pendekatan yang ringan dan humoris, namun tetap dekat dengan hal-hal personal. Banyak karyanya mengangkat kehidupan domestik dan rutinitas rumah tangga, yang ia lihat bukan hanya sebagai pekerjaan sehari-hari, tetapi juga sebagai ruang untuk berpikir dan berkreasi.Makanan dan bahan dapur juga sering muncul dalam karyanya, sebagai cara untuk menghubungkan cerita pribadi dengan isu budaya dan ekonomi yang lebih luas. Dari hal-hal sederhana seperti memasak atau pekerjaan rumah, ia melihat adanya cerita tentang perawatan, ketahanan hidup, dan ingatan bersama.Bonit telah terlibat dalam berbagai pameran dan proyek seni di Indonesia dan luar negeri seperti Jakarta Biennale, Pekan Kebudayaan Nasional, documenta fifteen di Kassel, Momentum Biennale di Norwegia, serta proyek di Toronto, Tokyo, Seoul, Kyoto, Nagoya, Yamaguchi, Bangkok, Singapore dan Sydney.Bonit juga merupakan bagian dari Selarasa Jagakarsa Food Lab, sebuah kelompok yang bergerak di isu pangan, pertanian kota, dan seni. Di Selarasa, ia berperan di bagian artistik, yaitu menerjemahkan proses dan hasil riset menjadi bentuk visual agar lebih mudah dipahami dan dinikmati oleh publik.Sejak 2016, Bonit terlibat dalam Gudskul di Jakarta sebagai manajer program. Ia juga menjadi Koordinator Workshop dalam Program Studi Kolektif Gudskul, yang berfokus pada kerja studio cara berkarya dan eksplorasi media dalam praktik seni.',
    kontribusi: 'Manajer Seni, Kurator, Seniman Cetak, Grafis Huru Hara, Gudskul, Selarasa Food Lab',
    dokumentasi: [
      memberAnita,
    ],
  },
];

const Member = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 text-earth-cream overflow-hidden">
        {/* DarkVeil Background */}
        <div className="absolute inset-x-0 md:inset-0 top-32 md:top-0 bottom-0">
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
        <div className="absolute inset-x-0 md:inset-0 top-32 md:top-0 bottom-0 bg-gradient-to-b from-earth-dark/70 via-earth-dark/60 to-earth-brown/70" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="pt-16 md:pt-8 min-h-[200px] md:min-h-[150px] flex flex-col justify-center">
            <Users className="w-10 h-10 md:w-12 md:h-12 text-earth-sand mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Member</h1>
            <p className="text-earth-cream/90 max-w-2xl mx-auto text-sm md:text-base">
              Kenali anggota komunitas Selarasa yang turut merawat dan menumbuhkan ekosistem pangan lokal.
            </p>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            {/* Baris pertama - 3 member */}
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              {membersData.slice(0, 3).map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 hover:-translate-y-1 text-left flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      Lihat Portfolio →
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-serif font-bold text-earth-dark text-sm md:text-base truncate">
                    {member.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Baris kedua - 2 member */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-4 md:mt-6">
              {membersData.slice(3, 5).map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 hover:-translate-y-1 text-left flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
                >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      Lihat Portfolio →
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-serif font-bold text-earth-dark text-sm md:text-base truncate">
                    {member.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Single Photo */}
            <div className="relative h-64 md:h-80">
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  Anggota Komunitas Selarasa
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Biodata */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-earth-green/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-earth-green" />
                  </div>
                  <h4 className="font-bold text-earth-dark text-lg">Biodata</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Kontribusi */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-earth-green/10 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-earth-green" />
                  </div>
                  <h4 className="font-bold text-earth-dark text-lg">Hasil Karya & Kontribusi</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.kontribusi}
                </p>
              </div>

              {/* Dokumentasi - Single Featured Photo */}
              {selectedMember.dokumentasi && selectedMember.dokumentasi.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-earth-green/10 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-earth-green" />
                    </div>
                    <h4 className="font-bold text-earth-dark text-lg">Dokumentasi</h4>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="aspect-video md:aspect-[16/9] rounded-xl overflow-hidden">
                      <img
                        src={selectedMember.dokumentasi[0]}
                        alt={`Dokumentasi ${selectedMember.name}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
