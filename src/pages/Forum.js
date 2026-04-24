import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Users, 
  Clock, 
  Sparkles,
  Leaf,
  Heart,
  Share2
} from 'lucide-react';

const Forum = () => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]);
  const [openShareMenu, setOpenShareMenu] = useState(null);

  // Generate random 4-digit number
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Get or generate random number for each answer
  const getDisplayId = (answerId) => {
    const storedNumbers = JSON.parse(localStorage.getItem('gudskul_display_numbers') || '{}');
    if (!storedNumbers[answerId]) {
      storedNumbers[answerId] = generateRandomNumber();
      localStorage.setItem('gudskul_display_numbers', JSON.stringify(storedNumbers));
    }
    return storedNumbers[answerId];
  };

  useEffect(() => {
    // Fetch answers from localStorage (mock API)
    const fetchAnswers = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const storedAnswers = JSON.parse(localStorage.getItem('gudskul_answers') || '[]');
        // Add likes count to each answer if not present
        const answersWithLikes = storedAnswers.map(answer => ({
          ...answer,
          likes: answer.likes || 0
        }));
        setAnswers(answersWithLikes);
        setTotalCount(storedAnswers.length);
        
        // Load liked posts from localStorage
        const storedLikedPosts = JSON.parse(localStorage.getItem('gudskul_liked_posts') || '[]');
        setLikedPosts(storedLikedPosts);
        
        setIsLoading(false);
      }, 800);
    };

    fetchAnswers();
  }, [setAnswers, setIsLoading, setLikedPosts, setTotalCount]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.share-menu-container')) {
        setOpenShareMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setOpenShareMenu]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Baru saja';
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else if (diffInHours < 48) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const handleLike = (answerId) => {
    const isLiked = likedPosts.includes(answerId);
    let updatedLikedPosts;
    let updatedAnswers;

    if (isLiked) {
      // Unlike
      updatedLikedPosts = likedPosts.filter(id => id !== answerId);
      updatedAnswers = answers.map(answer => 
        answer.id === answerId 
          ? { ...answer, likes: (answer.likes || 0) - 1 }
          : answer
      );
    } else {
      // Like
      updatedLikedPosts = [...likedPosts, answerId];
      updatedAnswers = answers.map(answer => 
        answer.id === answerId 
          ? { ...answer, likes: (answer.likes || 0) + 1 }
          : answer
      );
    }

    setLikedPosts(updatedLikedPosts);
    setAnswers(updatedAnswers);

    // Save to localStorage
    localStorage.setItem('gudskul_liked_posts', JSON.stringify(updatedLikedPosts));
    localStorage.setItem('gudskul_answers', JSON.stringify(updatedAnswers));
  };

  const toggleShareMenu = (answerId) => {
    setOpenShareMenu(openShareMenu === answerId ? null : answerId);
  };

  const handleShare = (answer, platform, answerId) => {
    // Close menu after selection
    setOpenShareMenu(null);
    const text = `"${answer.content.substring(0, 100)}${answer.content.length > 100 ? '...' : ''}" - Visi dari Selarasa Geng`;
    const url = window.location.href;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(text + '\n\n' + url);
        alert('Teks berhasil disalin ke clipboard!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-earth-sand/10">
      {/* Header */}
      <div className="bg-earth-dark text-earth-cream pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-earth-sand hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-earth-sand/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-earth-sand" />
                </div>
                <Sparkles className="w-5 h-5 text-earth-sand/60" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Forum Visi Gudskul
              </h1>
              <p className="text-earth-sand/80 text-lg max-w-2xl">
                Kumpulan harapan, mimpi, dan visi dari teman-teman komunitas tentang masa depan Gudskul.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-earth-sand" />
                <span>{totalCount} visi terkumpul</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-earth-green to-leaf-500 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Visi</p>
              <p className="text-xl font-bold text-earth-dark">{totalCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Diperbarui secara real-time</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-earth-sand border-t-earth-dark rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Memuat visi komunitas...</p>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {answers.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum Ada Visi
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Jadilah yang pertama berbagi visi Anda tentang masa depan Gudskul!
                </p>
                <button 
                  onClick={() => {
                    localStorage.removeItem('gudskul_entry_answer');
                    window.location.href = '/';
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-earth-dark text-white rounded-full hover:bg-earth-brown transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Mulai Berbagi Visi
                </button>
                
                {/* Reset Option */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (window.confirm('Hapus semua data dan reset?')) {
                        localStorage.removeItem('gudskul_entry_answer');
                        localStorage.removeItem('gudskul_answers');
                        localStorage.removeItem('gudskul_liked_posts');
                        localStorage.removeItem('gudskul_display_numbers');
                        window.location.reload();
                      }
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    Reset Data
                  </button>
                </div>
              </div>
            ) : (
              /* Answers Grid */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {answers.map((answer, index) => (
                  <div
                    key={answer.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-earth-green to-leaf-500 flex items-center justify-center text-white font-semibold text-sm">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Selarasa Geng #{getDisplayId(answer.id)}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(answer.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed text-sm line-clamp-6">
                        "{answer.content}"
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLike(answer.id)}
                          className={`flex items-center gap-1 transition-colors text-sm ${
                            likedPosts.includes(answer.id) 
                              ? 'text-red-500' 
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.includes(answer.id) ? 'fill-current' : ''}`} />
                          <span>{answer.likes || 0}</span>
                        </button>
                        
                        {/* Share Dropdown - Click Based */}
                        <div className="relative share-menu-container">
                          <button 
                            onClick={() => toggleShareMenu(answer.id)}
                            className={`flex items-center gap-1 transition-colors text-sm ${
                              openShareMenu === answer.id 
                                ? 'text-earth-green' 
                                : 'text-gray-400 hover:text-earth-green'
                            }`}
                          >
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                          
                          {/* Share Menu */}
                          {openShareMenu === answer.id && (
                            <div className="absolute bottom-full left-0 mb-2 flex flex-col gap-1 bg-white rounded-lg shadow-lg border border-gray-100 p-2 min-w-[140px] z-10 animate-fade-in">
                              <button
                                onClick={() => handleShare(answer, 'whatsapp', answer.id)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors text-left"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.607.951.964-3.526-.229-.375a9.865 9.865 0 01-1.525-5.318c0-5.506 4.475-9.981 9.982-9.981 2.668 0 5.176 1.04 7.062 2.927a9.923 9.923 0 012.917 7.063c0 5.506-4.475 9.981-9.981 9.981m8.392-14.046c-2.289-2.289-5.334-3.551-8.574-3.551-6.693 0-12.14 5.447-12.14 12.141 0 2.14.558 4.229 1.614 6.073l-1.716 6.27 6.422-1.684a12.144 12.144 0 006.073 1.615c6.693 0 12.141-5.448 12.141-12.142 0-3.239-1.262-6.284-3.551-8.574z"/>
                                </svg>
                                WhatsApp
                              </button>
                              <button
                                onClick={() => handleShare(answer, 'twitter', answer.id)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-md transition-colors text-left"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                X / Twitter
                              </button>
                              <button
                                onClick={() => handleShare(answer, 'facebook', answer.id)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors text-left"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                              </button>
                              <button
                                onClick={() => handleShare(answer, 'copy', answer.id)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors text-left"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Salin Link
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Section */}
            {answers.length > 0 && (
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-earth-dark to-earth-brown rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    Punya Visi Lain?
                  </h3>
                  <p className="text-earth-sand/80 mb-6">
                    Setiap visi berharga. Bagikan juga harapan Anda untuk Gudskul.
                  </p>
                  <button
                    onClick={() => {
                      localStorage.removeItem('gudskul_entry_answer');
                      window.location.href = '/';
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-earth-sand text-earth-dark font-medium rounded-full hover:bg-earth-cream transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Tulis Visi Baru
                  </button>
                </div>
              </div>
            )}

            {/* Reset Entry Gate (untuk testing) */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  if (window.confirm('Hapus semua data dan reset Entry Gate?')) {
                    localStorage.removeItem('gudskul_entry_answer');
                    localStorage.removeItem('gudskul_answers');
                    localStorage.removeItem('gudskul_liked_posts');
                    localStorage.removeItem('gudskul_display_numbers');
                    window.location.href = '/';
                  }
                }}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Reset Data & Entry Gate
              </button>
            </div>
          </>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-earth-sand/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-48 h-48 bg-earth-green/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Forum;
