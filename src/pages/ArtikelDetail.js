import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import PixelBlast from "../components/PixelBlast";

// Data artikel lengkap
const articlesData = {
  "reboisasi-hutan": {
    title: "Reboisasi Hutan",
    desc: "Upaya penanaman kembali hutan untuk menjaga keseimbangan ekosistem dan mengurangi dampak perubahan iklim.",
    content: `
Reboisasi adalah proses penanaman kembali pohon-pohon di area yang sebelumnya ditutupi hutan namun mengalami degradasi akibat aktivitas manusia atau bencana alam.

Mengapa Reboisasi Penting?

1. Mengatasi Perubahan Iklim
Hutan menyerap karbon dioksida dari atmosfer dan menyimpannya dalam biomassa. Satu pohon dewasa dapat menyerup hingga 22 kg CO2 per tahun.

2. Menjaga Keanekaragaman Hayati
Hutan merupakan rumah bagi 80% spesies darat di dunia. Reboisasi membantu melestarikan habitat satwa liar.

3. Mencegah Erosi dan Banjir
Akar pohon menstabilkan tanah dan meningkatkan daya resap air, mengurangi risiko banjir dan longsor.

Program Kami

Selarasa Kolektif bekerja sama dengan komunitas lokal untuk:
- Menanam pohon-pohon endemik
- Melakukan pemulihan lahan kritis
- Memberikan edukasi konservasi kepada masyarakat

Bergabunglah dengan kami dalam program reboisasi untuk masa depan yang lebih hijau.
    `,
    author: "Tim Selarasa",
    date: "15 April 2024",
    readTime: "5 menit baca"
  },
  "energi-terbarukan": {
    title: "Energi Terbarukan",
    desc: "Pemanfaatan energi ramah lingkungan seperti matahari, angin, dan biomassa untuk masa depan berkelanjutan.",
    content: `
Energi terbarukan adalah energi yang dihasilkan dari sumber daya alam yang dapat diperbarui secara terus-menerus, seperti sinar matahari, angin, air, panas bumi, dan biomassa.

Jenis-jenis Energi Terbarukan

1. Energi Surya
Panel surya mengubah sinar matahari menjadi listrik. Indonesia mendapatkan 4-5 kWh/m² per hari, potensi yang sangat besar.

2. Energi Angin
Turbin angin mengubah energi kinetik angin menjadi listrik. Area pesisir Indonesia memiliki potensi angin yang baik.

3. Biomassa
Menggunakan limbah organik seperti sekam padi, batang jagung, atau tandan kelapa sawit untuk menghasilkan energi.

Manfaat Energi Terbarukan

- Mengurangi emisi gas rumah kaca
- Energi tidak akan habis
- Mengurangi ketergantungan pada bahan bakar fosil
- Menciptakan lapangan kerja baru

Selarasa mengembangkan energi surya di pusat-pusat komunitas dan memberikan pelatihan pemeliharaan sistem.
    `,
    author: "Tim Selarasa",
    date: "12 April 2024",
    readTime: "6 menit baca"
  },
  "pengolahan-sampah": {
    title: "Pengolahan Sampah",
    desc: "Strategi pengelolaan sampah modern berbasis daur ulang dan teknologi waste-to-energy terkini.",
    content: `
Pengelolaan sampah yang efektif merupakan kunci untuk mengurangi pencemaran lingkungan dan menciptakan ekonomi sirkular.

Hierarki Pengelolaan Sampah

1. Refuse (Menolak)
Mengurangi penggunaan produk sekali pakai dan kemasan berlebihan.

2. Reduce (Mengurangi)
Meminimalkan konsumsi barang yang tidak diperlukan.

3. Reuse (Menggunakan Ulang)
Memanfaatkan kembali barang sebelum dibuang.

4. Recycle (Mendaur Ulang)
Mengolah sampah menjadi produk baru.

5. Recovery (Pemulihan)
Mengekstrak energi dari sampah yang tidak dapat didaur ulang.

Inovasi Teknologi

- Waste-to-Energy: Mengubah sampah menjadi listrik
- Biogas: Menggunakan anaerobic digestion untuk limbah organik
- Pirrolisis: Mengubah plastik menjadi bahan bakar

Program Komunitas

Selarasa membantu komunitas mengimplementasikan:
- Bank sampah
- Pengomposan rumah tangga
- Daur ulang kreatif
    `,
    author: "Tim Selarasa",
    date: "10 April 2024",
    readTime: "4 menit baca"
  },
  "konservasi-air": {
    title: "Konservasi Air",
    desc: "Menjaga ketersediaan air bersih melalui teknologi filtrasi modern dan pengelolaan sumber daya air.",
    content: `
Air adalah sumber kehidupan yang semakin langka. Konservasi air bertujuan untuk mengelola sumber daya air secara berkelanjutan.

Teknik Konservasi Air

1. Sumur Resapan
Mengembalikan air hujan ke dalam tanah untuk mengisi cadangan air tanah.

2. Penampungan Air Hujan
Menyimpan air hujan untuk digunakan saat musim kemarau.

3. Irigasi Tetes
Mengurangi penggunaan air untuk pertanian hingga 50%.

4. Penggunaan Ulang Air Greywater
Menggunakan air bekas mandi dan cuci untuk menyiram tanaman.

Rehabilitasi Mata Air

Program Selarasa meliputi:
- Penanaman pohon di kawasan resapan
- Pembangunan biopori
- Edukasi penghematan air kepada masyarakat

Mari bersama-sama menjaga ketersediaan air bersih untuk generasi mendatang.
    `,
    author: "Tim Selarasa",
    date: "8 April 2024",
    readTime: "5 menit baca"
  },
  "urban-farming": {
    title: "Urban Farming",
    desc: "Bercocok tanam di perkotaan dengan teknologi vertikal farming dan hydroponik untuk ketahanan pangan.",
    content: `
Urban farming atau pertanian perkotaan adalah praktik bercocok tanam di dalam atau di sekitar kota, memanfaatkan lahan terbatas secara maksimal.

Metode Urban Farming

1. Hydroponik
Menanam tanaman tanpa tanah, menggunakan larutan nutrisi dalam air. Cocok untuk sayuran daun dan tomat.

2. Vertikultur
Menanam secara vertikal pada dinding atau rak bertingkat, menghemat ruang hingga 90%.

3. Container Gardening
Menggunakan pot dan kontainer untuk menanam di balkon atau teras.

4. Aquaponics
Sistem terintegrasi antara ikan dan tanaman, di mana limbah ikan menjadi nutrisi untuk tanaman.

Manfaat Urban Farming

- Ketahanan pangan lokal
- Mengurangi jejak karbon transportasi makanan
- Ruang hijau di perkotaan
- Edukasi lingkungan untuk anak-anak

Selarasa membantu komunitas membangun kebun komunal dan menyediakan pelatihan teknis.
    `,
    author: "Tim Selarasa",
    date: "5 April 2024",
    readTime: "6 menit baca"
  },
  "green-technology": {
    title: "Green Technology",
    desc: "Inovasi teknologi ramah lingkungan yang mengubah cara kita hidup dan berinteraksi dengan alam.",
    content: `
Green technology atau teknologi hijau adalah aplikasi ilmu pengetahuan untuk menciptakan produk dan layanan yang ramah lingkungan.

Bidang Green Technology

1. Energi
Panel surya, turbin angin, baterai penyimpanan energi, dan smart grid.

2. Transportasi
Kendaraan listrik, sepeda listrik, dan sistem transportasi publik berkelanjutan.

3. Bangunan
Green building dengan efisiensi energi, pencahayaan alami, dan ventilasi silang.

4. Pertanian
Precision farming menggunakan IoT untuk mengoptimalkan penggunaan air dan pupuk.

5. Material Biodegradable
Plastik dari tapioka, kemasan dari jamur, dan tekstil dari serat alam.

Inovasi Terkini

- Perovskite solar cells dengan efisiensi lebih tinggi
- Baterai solid-state untuk EV
- AI untuk optimasi energi bangunan
- Drone untuk monitoring hutan dan pertanian

Masa Depan

Green technology akan menjadi tulang punggung ekonomi berkelanjutan. Investasi di sektor ini tumbuh 20% per tahun.

Selarasa terus mengadopsi teknologi hijau dalam operasional dan program edukasi.
    `,
    author: "Tim Selarasa",
    date: "1 April 2024",
    readTime: "7 menit baca"
  }
};

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 30
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function ArtikelDetail() {
  const { slug } = useParams();
  const article = articlesData[slug];

  if (!article) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Artikel tidak ditemukan</h1>
          <Link 
            to="/artikel" 
            className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={20} />
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="relative min-h-screen overflow-hidden bg-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#7c3aed"
          patternScale={4}
          patternDensity={1.5}
          pixelSizeJitter={0.8}
          enableRipples={true}
          rippleSpeed={0.6}
          rippleThickness={0.15}
          rippleIntensityScale={2}
          liquid={true}
          liquidStrength={0.2}
          liquidRadius={1.5}
          liquidWobbleSpeed={6}
          speed={0.8}
          edgeFade={0.3}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-black/50 backdrop-blur-sm pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20">
        
        {/* Back Button */}
        <motion.div variants={contentVariants} className="mb-8">
          <Link 
            to="/artikel" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Artikel</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div variants={contentVariants} className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User size={16} className="text-purple-400" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-purple-400" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article 
          variants={contentVariants}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10"
        >
          <div className="prose prose-invert prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => {
              // Check if it's a heading (starts without spaces and is short)
              if (!paragraph.startsWith(' ') && paragraph.length < 50 && !paragraph.includes('.')) {
                return (
                  <h2 key={index} className="text-xl sm:text-2xl font-semibold text-purple-300 mt-8 mb-4">
                    {paragraph}
                  </h2>
                );
              }
              
              // Check if it's a numbered list item
              if (/^\d+\./.test(paragraph)) {
                const lines = paragraph.split('\n');
                return (
                  <div key={index} className="my-4">
                    {lines.map((line, i) => {
                      const match = line.match(/^(\d+)\.\s*(.+)$/);
                      if (match) {
                        return (
                          <div key={i} className="flex gap-3 mb-2">
                            <span className="text-purple-400 font-semibold min-w-[24px]">{match[1]}.</span>
                            <span className="text-gray-300">{match[2]}</span>
                          </div>
                        );
                      }
                      return <p key={i} className="text-gray-300 mb-2">{line}</p>;
                    })}
                  </div>
                );
              }
              
              // Regular paragraph
              return (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </motion.article>

        {/* Navigation Footer */}
        <motion.div 
          variants={contentVariants}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <Link 
            to="/artikel" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all hover:scale-105"
          >
            <ArrowLeft size={18} />
            <span>Lihat Artikel Lainnya</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
