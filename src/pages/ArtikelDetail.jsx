import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/ScrollReveal';
import '../components/ScrollReveal.css';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark,
  ArrowRight,
  Leaf,
  Target
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Sample article data - in real app, fetch from API
const articleData = {
  'pertanian-urban-jakarta': {
    title: 'Revolusi Pertanian Urban di Jakarta: Masa Depan Pangan Berkelanjutan',
    excerpt: 'Bagaimana kota metropolitan Jakarta bertransformasi menjadi pusat pertanian urban yang produktif dan berkelanjutan.',
    date: '15 Maret 2024',
    author: 'Tim Selarasa',
    readTime: '8 menit',
    category: 'Urban Farming',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80',
    content: {
      intro: [
        'Jakarta, kota metropolitan dengan jutaan penduduknya, kini sedang mengalami transformasi yang menakjubkan. Di tengah hiruk-pikuk kehidupan urban, muncul sebuah gerakan yang mengubah cara pandang kita terhadap pangan dan keberlanjutan.',
        'Pertanian urban bukan lagi sekadar tren, melainkan solusi nyata untuk ketahanan pangan dan kualitas hidup yang lebih baik. Dari rooftop gedung perkantoran hingga lahan sempit di pemukiman padat, warga Jakarta mulai mengubah setiap ruang kosong menjadi kebun produktif.'
      ]
    }
  },
  'hidroponik-rumahan': {
    title: 'Panduan Lengkap Berkebun Hidroponik di Rumah untuk Pemula',
    excerpt: 'Langkah demi langkah memulai kebun hidroponik sendiri dengan modal minimal dan hasil maksimal.',
    date: '10 Maret 2024',
    author: 'Tim Selarasa',
    readTime: '6 menit',
    category: 'Tips Berkebun',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    content: {
      intro: [
        'Memiliki kebun sayuran segar di rumah impian banyak orang, terutama yang tinggal di kota besar dengan lahan terbatas. Hidroponik hadir sebagai solusi cerdas yang memungkinkan siapa saja menanam tanpa memerlukan tanah yang luas.',
        'Teknik ini tidak hanya hemat tempat, tetapi juga lebih efisien dalam penggunaan air dan nutrisi. Dalam artikel ini, kita akan menjelajahi cara memulai kebun hidroponik dari nol, bahkan untuk Anda yang sama sekali belum pernah bercocok tanam sebelumnya.'
      ]
    }
  },
  'kompos-rumah': {
    title: 'Zero Waste Living: Mengubah Sampah Dapur Jadi Kompos Berkualitas',
    excerpt: 'Panduan praktis komposting rumahan yang efektif untuk mengurangi limbah dan menghasilkan pupuk organik premium.',
    date: '5 Maret 2024',
    author: 'Tim Selarasa',
    readTime: '5 menit',
    category: 'Lingkungan',
    image: 'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=1200&q=80',
    content: {
      intro: [
        'Setiap tahun, jutaan ton sampah organik dari dapur rumah tangga dibuang begitu saja ke tempat pembuangan akhir. Padahal, sampah ini sebenarnya adalah sumber daya berharga yang bisa diubah menjadi pupuk organik berkualitas tinggi.',
        'Komposting rumahan adalah jawaban untuk masalah ini. Dengan teknik yang tepat, Anda bisa mengubah sisa makanan dan daun kering menjadi kompos hitam yang kaya nutrisi, sempurna untuk menyuburkan tanaman di kebun atau pot Anda.'
      ]
    }
  }
};

const ArtikelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const headerRef = useRef(null);
  const introRef = useRef(null);
  const imagesRef = useRef([]);

  // Get article data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      const data = articleData[slug];
      if (data) {
        setArticle(data);
      } else {
        // Fallback to default article
        setArticle(articleData['pertanian-urban-jakarta']);
      }
      setIsLoading(false);
    }, 300);
  }, [slug]);

  // GSAP Animations
  useEffect(() => {
    if (!article || isLoading) return;

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.header-animate'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      // Intro paragraphs fade in
      gsap.fromTo(
        introRef.current?.querySelectorAll('.intro-para'),
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15, 
          ease: 'power2.out',
          delay: 0.3
        }
      );

      // Images fade in on scroll
      imagesRef.current.forEach((img) => {
        if (img) {
          gsap.fromTo(
            img,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [article, isLoading]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading || !article) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="animate-pulse text-[#5C5548]">Memuat artikel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#FAF7F2]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#5C5548] hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-[#5C5548]" />
            </button>
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <Bookmark className="w-5 h-5 text-[#5C5548]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header ref={headerRef} className="px-4 pt-8 pb-6">
        <div className="max-w-3xl mx-auto">
          {/* Category Badge */}
          <div className="header-animate mb-4">
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
              <Leaf className="w-4 h-4" />
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="header-animate text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#5C5548] leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="header-animate flex flex-wrap items-center gap-4 text-sm text-[#5C5548]/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} baca</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Image */}
      <div className="px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={(el) => (imagesRef.current[0] = el)}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Intro Section - NO ANIMATION (static for immediate reading) */}
          <div ref={introRef} className="mb-12">
            {article.content.intro.map((para, index) => (
              <p 
                key={index}
                className="intro-para text-lg md:text-xl text-[#5C5548]/80 leading-relaxed mb-6"
              >
                {para}
              </p>
            ))}
          </div>

          {/* ===== STORY MODE: SECTION 1 ===== */}
          <div className="mb-16 py-8">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.1}
              baseRotation={3}
              blurStrength={8}
              containerClassName="mb-8"
              textClassName="font-serif"
            >
              Urban farming bukan sekadar tren. Ini adalah solusi nyata untuk kehidupan kota yang semakin padat dan penuh tantangan.
            </ScrollReveal>
          </div>

          {/* ===== BREAK SECTION: IMAGE (NO ANIMATION) ===== */}
          <div 
            ref={(el) => (imagesRef.current[1] = el)}
            className="my-16"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80" 
                alt="Urban farming community"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="text-sm text-[#5C5548]/50 mt-4 text-center italic">
              Komunitas urban farming di rooftop Jakarta Barat
            </p>
          </div>

          {/* ===== STORY MODE: SECTION 2 ===== */}
          <div className="mb-16 py-8">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.1}
              baseRotation={2}
              blurStrength={6}
              containerClassName="mb-8"
            >
              Dengan memanfaatkan lahan sempit seperti balkon, atap, atau bahkan dinding, masyarakat bisa mulai menanam sayuran sendiri. Tomat, selada, basil, dan cabai tumbuh subur di pot-pot kecil yang tersusun rapi.
            </ScrollReveal>
          </div>

          {/* ===== BREAK SECTION: QUOTE / FACT (NO ANIMATION) ===== */}
          <div className="my-16 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-2xl p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-green-800 mb-3 text-xl">Fakta Menarik</h3>
                <p className="text-green-700/80 leading-relaxed text-lg">
                  Studi menunjukkan bahwa setiap 1 meter persegi pertanian urban dapat mengurangi suhu lingkungan sekitarnya hingga 2-3 derajat Celsius. Ini adalah solusi adaptasi perubahan iklim yang konkret dan dapat diimplementasikan oleh siapa saja.
                </p>
              </div>
            </div>
          </div>

          {/* ===== STORY MODE: SECTION 3 ===== */}
          <div className="mb-16 py-8">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.1}
              baseRotation={2}
              blurStrength={6}
              containerClassName="mb-8"
            >
              Selain itu, kegiatan ini juga membantu mengurangi polusi dan meningkatkan kualitas udara. Tanaman menyerap karbon dioksida dan melepaskan oksigen, menciptakan ruang hijau yang sehat di tengah hiruk pikuk kota.
            </ScrollReveal>
          </div>

          {/* ===== BREAK SECTION: IMAGE 2 (NO ANIMATION) ===== */}
          <div 
            ref={(el) => (imagesRef.current[2] = el)}
            className="my-16"
          >
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80" 
                alt="Hidroponik modern"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="text-sm text-[#5C5548]/50 mt-4 text-center italic">
              Sistem hidroponik modern dengan teknologi monitoring otomatis
            </p>
          </div>

          {/* ===== STORY MODE: SECTION 4 (FINAL) ===== */}
          <div className="mb-16 py-8">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.1}
              baseRotation={1}
              blurStrength={4}
              containerClassName="mb-8"
              textClassName="font-serif"
            >
              Perubahan dimulai dari langkah kecil. Anda bisa mulai dengan satu pot, satu benih, dan satu tekad untuk hidup lebih berkelanjutan.
            </ScrollReveal>
          </div>

          {/* ===== CONCLUSION: STATIC TEXT (NO ANIMATION) ===== */}
          <div className="mb-12 pt-12 border-t-2 border-stone-200">
            <p className="text-xl md:text-2xl font-serif text-[#5C5548] leading-relaxed text-center">
              Revolusi pertanian urban di Jakarta membuktikan bahwa perubahan besar selalu dimulai dari langkah-langkah kecil. Anda juga bisa menjadi bagian dari gerakan ini.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8">
            <Link 
              to="/artikel"
              className="inline-flex items-center gap-2 bg-[#5C5548] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#4a4439] transition-colors w-full sm:w-auto justify-center"
            >
              <span>Baca Artikel Lain</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/program"
              className="inline-flex items-center gap-2 bg-white border-2 border-[#5C5548]/20 text-[#5C5548] px-6 py-3.5 rounded-xl font-semibold hover:bg-stone-50 transition-colors w-full sm:w-auto justify-center"
            >
              <Leaf className="w-4 h-4" />
              <span>Lihat Program Kami</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles Preview */}
      <section className="px-4 py-16 bg-gradient-to-b from-[#FAF7F2] to-white border-t border-stone-200/50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#5C5548] mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            Artikel Terkait
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(articleData)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, related]) => (
                <Link 
                  key={key}
                  to={`/artikel/${key}`}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-stone-100"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-green-600 font-medium">{related.category}</span>
                      <h4 className="font-semibold text-[#5C5548] text-sm line-clamp-2 group-hover:text-green-700 transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-xs text-[#5C5548]/50 mt-1">{related.readTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtikelDetail;
