import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Leaf, 
  Droplets, 
  Lightbulb,
  Filter,
  ChevronRight,
  Sprout,
  BookOpen
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Fokus = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const articlesRef = useRef(null);

  // Categories
  const categories = [
    { id: 'Semua', name: 'Semua', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'urban-farming', name: 'Urban Farming', icon: <Sprout className="w-4 h-4" /> },
    { id: 'lingkungan', name: 'Lingkungan', icon: <Leaf className="w-4 h-4" /> },
    { id: 'tips', name: 'Tips Berkebun', icon: <Droplets className="w-4 h-4" /> },
    { id: 'inovasi', name: 'Inovasi', icon: <Lightbulb className="w-4 h-4" /> },
  ];

  // Featured article (main news)
  const featuredArticle = {
    id: 1,
    title: 'Urban Farming: Solusi Ketahanan Pangan di Era Perubahan Iklim',
    excerpt: 'Bagaimana pertanian perkotaan dapat menjadi jawaban atas tantangan pangan global, mengurangi jejak karbon, dan membangun ketahanan komunitas lokal. Pelajari bagaimana kota-kota di seluruh dunia mengadopsi praktik pertanian berkelanjutan.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80',
    category: 'Urban Farming',
    date: '15 April 2024',
    readTime: '8 menit',
    author: 'Tim Selarasa'
  };

  // Articles list
  const articles = [
    {
      id: 2,
      title: '5 Teknik Hidroponik Sederhana untuk Pemula',
      excerpt: 'Panduan lengkap memulai hidroponik di rumah dengan peralatan minimal dan biaya terjangkau.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      category: 'Tips Berkebun',
      date: '12 April 2024',
      readTime: '5 menit'
    },
    {
      id: 3,
      title: 'Kompos Rumahan: Mengubah Sampah Jadi Emas Hijau',
      excerpt: 'Cara membuat kompos berkualitas tinggi dari sampah dapur dan manfaatnya untuk tanaman.',
      image: 'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=800&q=80',
      category: 'Lingkungan',
      date: '10 April 2024',
      readTime: '6 menit'
    },
    {
      id: 4,
      title: 'Inovasi Vertical Farming di Jakarta',
      excerpt: 'Melihat lebih dekat proyek vertical farming yang mengubah gedung tua menjadi kebun produktif.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
      category: 'Inovasi',
      date: '8 April 2024',
      readTime: '7 menit'
    },
    {
      id: 5,
      title: 'Tanaman Sayur yang Cocok untuk Iklim Tropis',
      excerpt: 'Daftar sayuran yang tumbuh optimal di Indonesia dengan perawatan minimal.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
      category: 'Tips Berkebun',
      date: '5 April 2024',
      readTime: '4 menit'
    },
    {
      id: 6,
      title: 'Dampak Positif Rooftop Garden bagi Lingkungan Kota',
      excerpt: 'Studi menunjukkan rooftop garden dapat menurunkan suhu kota hingga 3 derajat Celsius.',
      image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&q=80',
      category: 'Lingkungan',
      date: '3 April 2024',
      readTime: '6 menit'
    },
    {
      id: 7,
      title: 'Smart Farming dengan IoT: Masa Depan Pertanian Indonesia',
      excerpt: 'Bagaimana teknologi IoT dan AI mengubah cara petani mengelola tanaman secara presisi.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80',
      category: 'Inovasi',
      date: '1 April 2024',
      readTime: '9 menit'
    },
  ];

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'Semua' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.animate-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );

      // Featured article animation
      gsap.fromTo(
        featuredRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Articles grid animation
      const articleCards = articlesRef.current?.querySelectorAll('.article-card');
      articleCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: articlesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [activeCategory, searchQuery]);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Urban Farming': return 'bg-green-100 text-green-800';
      case 'Lingkungan': return 'bg-emerald-100 text-emerald-800';
      case 'Tips Berkebun': return 'bg-amber-100 text-amber-800';
      case 'Inovasi': return 'bg-blue-100 text-blue-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-green-50 to-[#FAF7F2]"
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="animate-item inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Pusat Informasi & Edukasi
          </span>
          <h1 className="animate-item text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5C5548] mb-6 leading-tight">
            Fokus Kami
          </h1>
          <p className="animate-item text-lg md:text-xl text-[#5C5548]/70 max-w-2xl mx-auto leading-relaxed">
            Kumpulan berita, artikel, dan edukasi seputar urban farming, 
            keberlanjutan lingkungan, dan inovasi pertanian modern.
          </p>

          {/* Search Bar */}
          <div className="animate-item mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5548]/40" />
              <input
                type="text"
                placeholder="Cari disini"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-stone-100 focus:border-green-400 focus:outline-none text-[#5C5548] placeholder:text-[#5C5548]/40 transition-all shadow-lg shadow-stone-200/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-stone-100 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-[#5C5548]/50 shrink-0 mr-2" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.name
                    ? 'bg-[#5C5548] text-white shadow-md'
                    : 'bg-white text-[#5C5548]/70 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section ref={featuredRef} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-lg font-bold text-[#5C5548]">Berita Utama</h2>
          </div>

          <article className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredArticle.category)}`}>
                  {featuredArticle.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-[#5C5548]/60 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.readTime} baca
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#5C5548] mb-4 leading-tight group-hover:text-green-700 transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-[#5C5548]/70 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5C5548]/60">
                    Oleh {featuredArticle.author}
                  </span>
                  <button className="flex items-center gap-2 bg-[#5C5548] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors group/btn">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Articles Grid */}
      <section ref={articlesRef} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h2 className="text-lg font-bold text-[#5C5548]">
                {activeCategory === 'Semua' ? 'Artikel Terbaru' : `Artikel ${activeCategory}`}
              </h2>
            </div>
            <span className="text-sm text-[#5C5548]/60">
              {filteredArticles.length} artikel
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article 
                  key={article.id}
                  className="article-card group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-[#5C5548]/50 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#5C5548] mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#5C5548]/60 line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>

                    <button className="flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Baca Selengkapnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <p className="text-[#5C5548]/60">
                Tidak ada artikel yang sesuai dengan pencarian Anda.
              </p>
              <button 
                onClick={() => {setActiveCategory('Semua'); setSearchQuery('');}}
                className="mt-4 text-green-600 font-medium hover:underline"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#5C5548] to-green-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <Sprout className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Ingin Belajar Lebih?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8">
                Jelajahi program dan workshop kami untuk pengalaman belajar urban farming secara praktis.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/artikel"
                  className="inline-flex items-center gap-2 bg-white text-[#5C5548] px-6 py-3 rounded-xl font-semibold hover:bg-stone-50 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Baca Lebih Banyak</span>
                </Link>
                <Link 
                  to="/program"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  <Leaf className="w-4 h-4" />
                  <span>Ikuti Program Kami</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fokus;
