import PixelBlast from "../components/PixelBlast";
import ArticleCard from "../components/ArticleCard";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Reboisasi Hutan",
    desc: "Upaya penanaman kembali hutan untuk menjaga keseimbangan ekosistem dan mengurangi dampak perubahan iklim."
  },
  {
    title: "Energi Terbarukan",
    desc: "Pemanfaatan energi ramah lingkungan seperti matahari, angin, dan biomassa untuk masa depan berkelanjutan."
  },
  {
    title: "Pengolahan Sampah",
    desc: "Strategi pengelolaan sampah modern berbasis daur ulang dan teknologi waste-to-energy terkini."
  },
  {
    title: "Konservasi Air",
    desc: "Menjaga ketersediaan air bersih melalui teknologi filtrasi modern dan pengelolaan sumber daya air."
  },
  {
    title: "Urban Farming",
    desc: "Bercocok tanam di perkotaan dengan teknologi vertikal farming dan hydroponik untuk ketahanan pangan."
  },
  {
    title: "Green Technology",
    desc: "Inovasi teknologi ramah lingkungan yang mengubah cara kita hidup dan berinteraksi dengan alam."
  }
];

export default function Artikel() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      
      {/* Layer 1: PixelBlast Background */}
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

      {/* Layer 2: Dark Overlay untuk kontras */}
      <div className="absolute inset-0 z-1 bg-black/50 backdrop-blur-sm pointer-events-none" />

      {/* Layer 3: Content */}
      <div className="relative z-10 w-full px-4 md:max-w-5xl md:mx-auto md:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Artikel Lingkungan
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Temukan wawasan dan pengetahuan tentang pelestarian lingkungan untuk masa depan yang lebih baik.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {articles.map((item, i) => (
            <ArticleCard key={i} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
