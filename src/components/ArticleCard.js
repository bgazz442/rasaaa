import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Helper to convert title to slug
const toSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export default function ArticleCard({ title, desc }) {
  const slug = toSlug(title);
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/15 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {title}
      </h2>
      <p className="text-gray-300 text-sm mb-5 leading-relaxed">
        {desc}
      </p>
      <Link 
        to={`/artikel/${slug}`}
        className="text-sm font-medium text-purple-300 hover:text-white transition-colors flex items-center gap-1 inline-flex"
      >
        Baca Selengkapnya 
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </motion.div>
  );
}
