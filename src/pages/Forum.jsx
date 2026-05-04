import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, ThumbsUp, Clock, Heart, Share2, Filter, Search, TrendingUp } from 'lucide-react';

// Data dummy untuk jawaban pengunjung
const forumData = [
  {
    id: 1,
    name: "Andi Wijaya",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    question: "Apa yang membuat Anda tertarik dengan pertanian berkelanjutan?",
    answer: "Saya tertarik karena pertanian berkelanjutan tidak hanya menjaga kesehatan tanah, tetapi juga memastikan kita bisa memberikan makanan sehat untuk generasi mendatang. Ini adalah investasi jangka panjang untuk bumi kita.",
    date: "2 hari yang lalu",
    likes: 24,
    category: "Pertanian",
    verified: true
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    question: "Bagaimana cara Anda mulai berkebun di rumah?",
    answer: "Saya mulai dengan tanaman yang mudah seperti cabai dan tomat. Penting untuk memulai dari hal yang kecil dan konsisten. Sekarang saya sudah memiliki kebun sayur kecil di halaman belakang rumah.",
    date: "3 hari yang lalu",
    likes: 18,
    category: "Berkebun",
    verified: false
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    question: "Apa manfaat terbesar dari bergabung dengan komunitas Selarasa?",
    answer: "Manfaat terbesarnya adalah sharing knowledge dan networking. Saya belajar banyak tentang teknik pertanian modern dari para anggota lain. Selain itu, kita juga bisa saling membantu dalam hal pemasaran produk.",
    date: "1 minggu yang lalu",
    likes: 32,
    category: "Komunitas",
    verified: true
  },
  {
    id: 4,
    name: "Maya Putri",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    question: "Bagaimana Anda mengatasi tantangan dalam pertanian organik?",
    answer: "Tantangan terbesar adalah pest control, tapi saya menggunakan metode alami seperti tanaman companion dan pest repellent alami. Hasilnya lebih sehat dan lingkungan juga terlindungi.",
    date: "2 minggu yang lalu",
    likes: 27,
    category: "Pertanian Organik",
    verified: true
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    question: "Apa harapan Anda untuk masa depan pertanian Indonesia?",
    answer: "Saya harap pertanian Indonesia bisa menjadi lebih modern dan sustainable. Dengan teknologi yang tepat dan dukungan pemerintah, kita bisa menjadi swasembada pangan dan ekspor produk pertanian berkualitas.",
    date: "3 minggu yang lalu",
    likes: 45,
    category: "Visi",
    verified: true
  },
  {
    id: 6,
    name: "Dewi Lestari",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    question: "Bagaimana cara Anda membangun kebun komunitas?",
    answer: "Mulai dari tetangga terdekat, ajak mereka untuk bergabung. Buat kegiatan rutin seperti kerja bakti setiap akhir pekan. Perlahan tapi pasti, komunitas akan tumbuh dengan sendirinya.",
    date: "1 bulan yang lalu",
    likes: 19,
    category: "Komunitas",
    verified: false
  },
  {
    id: 7,
    name: "Ahmad Fauzi",
    avatar: "https://images.unsplash.com/photo-1507591064348-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
    question: "Apa tips untuk pemula yang ingin mulai bertani?",
    answer: "Mulai dengan tanaman yang mudah, pelajari tentang tanah lokal, jangan takut gagal, dan yang terpenting adalah konsisten. Setiap kegagalan adalah pembelajaran berharga.",
    date: "1 bulan yang lalu",
    likes: 38,
    category: "Tips",
    verified: true
  },
  {
    id: 8,
    name: "Rina Permata",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
    question: "Bagaimana dampak Selarasa terhadap ekonomi lokal?",
    answer: "Selarasa membantu petani lokal untuk mendapatkan harga yang lebih baik dengan menghubungkan langsung ke konsumen. Ini meningkatkan pendapatan mereka dan memotong rantai distribusi yang panjang.",
    date: "2 bulan yang lalu",
    likes: 29,
    category: "Ekonomi",
    verified: true
  }
];

const categories = ["Semua", "Pertanian", "Berkebun", "Komunitas", "Pertanian Organik", "Visi", "Tips", "Ekonomi"];

const Forum = () => {
  const [posts, setPosts] = useState(forumData);
  const [filteredPosts, setFilteredPosts] = useState(forumData);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "terbaru") {
      filtered.sort((a, b) => {
        const timeA = getTimeValue(a.date);
        const timeB = getTimeValue(b.date);
        return timeA - timeB;
      });
    } else if (sortBy === "populer") {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm, sortBy]);

  const getTimeValue = (dateStr) => {
    if (dateStr.includes("hari")) {
      return parseInt(dateStr) * 24;
    } else if (dateStr.includes("minggu")) {
      return parseInt(dateStr) * 24 * 7;
    } else if (dateStr.includes("bulan")) {
      return parseInt(dateStr) * 24 * 30;
    }
    return 0;
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <MessageCircle className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Forum Komunitas</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Bagikan pengalaman, belajar bersama, dan bangun jaringan pertanian berkelanjutan
            </p>
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{posts.length}</div>
                <div className="text-sm text-white/80">Diskusi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{posts.reduce((sum, p) => sum + p.likes, 0)}</div>
                <div className="text-sm text-white/80">Suka</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{categories.length - 1}</div>
                <div className="text-sm text-white/80">Kategori</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari jawaban atau nama pengguna..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="terbaru">Terbaru</option>
              <option value="populer">Terpopuler</option>
            </select>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow p-6 md:p-8"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{post.name}</h3>
                        {post.verified && (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Pertanyaan:</h4>
                    <p className="text-slate-600 italic">"{post.question}"</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Jawaban:</h4>
                    <p className="text-slate-800 leading-relaxed">{post.answer}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Simpan</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Bagikan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Belum ada jawaban</h3>
              <p className="text-slate-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Forum;
