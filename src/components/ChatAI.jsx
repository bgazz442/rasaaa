import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';

// ============================================
// COMPONENT: TypewriterText
// Efek mengetik yang smooth dan stabil
// ============================================
const TypewriterText = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
    setDisplayedContent('');
    setCurrentIndex(0);
  }, [content]);

  useEffect(() => {
    if (currentIndex < contentRef.current.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + contentRef.current[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Kecepatan mengetik: 20ms per karakter
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, onComplete]);

  return (
    <span 
      dangerouslySetInnerHTML={{ 
        __html: displayedContent.replace(/\n/g, '<br/>') 
      }} 
    />
  );
};

// ============================================
// FUNCTION: Smart AI Response (Local)
// ============================================
const getAIResponse = async (question) => {
  // Smart response berdasarkan keywords (tanpa API call)
  const q = question.toLowerCase();
  
  if (q.includes('selarasa') || q.includes('tentang') || q.includes('siapa')) {
    return `Selarasa adalah platform kuliner yang menghubungkan petani lokal, produsen, dan konsumen. Kami berfokus pada:

• Mendukung petani lokal Indonesia  
• Menyediakan bahan makanan berkualitas
• Membangun ekosistem kuliner berkelanjutan

Anda dapat mengunjungi laman "Tentang" untuk informasi lebih lengkap.`;
  }
  
  if (q.includes('menu') || q.includes('produk') || q.includes('makanan')) {
    return `Selarasa menawarkan berbagai produk:

• Sayur & Buah Organik - Langsung dari petani
• Bahan Pokok Lokal - Beras, kacang-kacangan, rempah  
• Produk Olahan - Sambal, keripik, manisan
• Minuman Tradisional - Jamu, kopi lokal, teh herbal

Kunjungi laman "Katalog" untuk melihat produk lengkap.`;
  }
  
  if (q.includes('program') || q.includes('kegiatan')) {
    return `Selarasa memiliki beberapa program unggulan:

• Program Petani Mitra - Kolaborasi dengan petani lokal
• Workshop Kuliner - Edukasi memasak dan olahan pangan
• Festival Pangan Lokal - Event promosi produk petani
• Konsultasi Bisnis - Pendampingan UMKM kuliner

Kunjungi laman "Program" untuk detail kegiatan.`;
  }
  
  if (q.includes('proyek') || q.includes('dokumentasi') || q.includes('foto')) {
    return `Proyek-proyek Selarasa mencakup:

• Pembangunan pusat distribusi pangan lokal
• Pengembangan aplikasi marketplace petani  
• Penyediaan cold storage untuk petani
• Program edukasi pertanian berkelanjutan

Lihat dokumentasi lengkap di laman "Proyek".`;
  }
  
  if (q.includes('gabung') || q.includes('partisipasi') || q.includes('daftar')) {
    return `Anda bisa bergabung dengan Selarasa sebagai:

• Petani Mitra - Jika Anda memiliki hasil pertanian
• Konsumen - Membeli produk lokal berkualitas  
• Relawan - Mengikuti program edukasi dan event
• Investor - Mendukung ekosistem pangan lokal

Klik tombol "Terlibat" atau kunjungi laman "Partisipasi".`;
  }
  
  if (q.includes('forum') || q.includes('komunitas') || q.includes('diskusi')) {
    return `Forum Selarasa adalah tempat berdiskusi:

• Berbagi resep dan tips memasak
• Tanya jawab seputar pertanian
• Diskusi bisnis kuliner UMKM
• Update info pasar dan tren pangan

Kunjungi laman "Forum" untuk bergabung dalam komunitas kami.`;
  }
  
  if (q.includes('artikel') || q.includes('blog') || q.includes('berita')) {
    return `Artikel Selarasa mencakup:

• Kisah sukses petani lokal
• Tips pertanian organik
• Resep tradisional Indonesia
• Analisis tren pangan dan kuliner

Kunjungi laman "Artikel" untuk membaca konten inspiratif kami.`;
  }
  
  if (q.includes('kontak') || q.includes('alamat') || q.includes('lokasi')) {
    return `Hubungi Selarasa melalui:

• Email: halo@selarasa.id
• Telepon: +62 812-XXXX-XXXX
• Alamat: [Alamat Kantor Selarasa]
• Media Sosial: @selarasa.id

Kunjungi laman "Kontak" untuk informasi lengkap dan form pertanyaan.`;
  }
  
  // Default response
  return `Halo! Saya AI Selarasa. Saya bisa membantu informasi tentang:

• Profil dan tentang Selarasa
• Program dan kegiatan  
• Proyek dan dokumentasi
• Katalog produk
• Cara bergabung/partisipasi
• Forum komunitas
• Artikel dan konten
• Kontak dan lokasi

Tanyakan apa saja, saya akan coba jawab sebaik mungkin!`;
};

// ============================================
// COMPONENT: ChatAI
// Chat AI dengan optimasi performa maksimal
// ============================================
const ChatAI = ({ isOpen, onClose, isMobile }) => {
  // State utama
  const [messages, setMessages] = useState([
    { 
      id: Date.now(), 
      role: 'ai', 
      content: 'Halo! Saya asisten AI Selarasa. Tanyakan apa saja dan saya akan langsung membantu Anda.',
      isTyping: false,
      isNew: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll ke bawah
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);


  // ============================================
  // HANDLER: Finish Typing
  // Menandai message selesai mengetik
  // ============================================
  const handleTypingComplete = useCallback((msgId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === msgId ? { ...msg, isNew: false } : msg
    ));
    setIsTyping(false);
    setTypingMessageId(null);
  }, []);

  // ============================================
  // HANDLER: Send Message (Call Gemini API)
  // ============================================
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userContent = input.trim();
    const userId = Date.now();
    
    // Tambah user message
    setMessages(prev => [...prev, { 
      id: userId, 
      role: 'user', 
      content: userContent,
      isTyping: false,
      isNew: false
    }]);
    
    setInput('');
    setIsTyping(true);

    try {
      // Langsung pakai smart response (local)
      console.log("[ChatAI] Menggunakan AI response...");
      const answer = await getAIResponse(userContent);
      console.log("[ChatAI] AI Response:", answer?.substring(0, 50));

      const aiId = Date.now() + 1;
      
      setTypingMessageId(aiId);
      setMessages(prev => [...prev, { 
        id: aiId, 
        role: 'ai', 
        content: answer,
        isTyping: true,
        isNew: true
      }]);

    } catch (err) {
      console.error("[ChatAI] Error:", err);
      
      // Cek apakah ada response dari API dengan error message
      let errorContent = "Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi nanti.";
      
      if (err.message) {
        if (err.message.includes("API Key") || err.message.includes("GEMINI")) {
          errorContent = "⚠️ API Key belum diatur atau invalid. Pastikan:\n1. File .env.local sudah dibuat\n2. GEMINI_API_KEY sudah diisi\n3. Server backend sudah jalan (npm run server)";
        } else if (err.message.includes("quota") || err.message.includes("limit")) {
          errorContent = "⚠️ Kuota Gemini habis. Coba lagi nanti atau gunakan API key lain.";
        } else if (err.message.includes("network") || err.message.includes("fetch") || err.message.includes("connect")) {
          errorContent = "⚠️ Tidak bisa terhubung ke server AI (port 5000). Pastikan server backend sudah jalan dengan: npm run server";
        }
      }
      
      // Fallback message jika API error
      const errorId = Date.now() + 1;
      setMessages(prev => [...prev, { 
        id: errorId, 
        role: 'ai', 
        content: errorContent,
        isTyping: false,
        isNew: false
      }]);
      setIsTyping(false);
    }
  }, [input, isTyping]);

  // ============================================
  // HANDLER: Keyboard Input
  // ============================================
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  // ============================================
  // MEMOIZED: Chat Messages (Performa Optimal)
  // Hanya re-render jika messages berubah
  // ============================================
  const chatMessages = useMemo(() => {
    return messages.map((msg) => {
      const isUser = msg.role === 'user';
      const isCurrentlyTyping = msg.id === typingMessageId && msg.isNew;
      
      return (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
              isUser
                ? 'bg-gradient-to-br from-[#8B7355] to-[#6B5344] text-white rounded-br-none'
                : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
            }`}
          >
            {isCurrentlyTyping ? (
              <TypewriterText 
                content={msg.content} 
                onComplete={() => handleTypingComplete(msg.id)}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ 
                __html: msg.content.replace(/\n/g, '<br/>') 
              }} />
            )}
          </div>
        </motion.div>
      );
    });
  }, [messages, typingMessageId, handleTypingComplete]);

  // ============================================
  // MEMOIZED: Typing Indicator
  // ============================================
  const typingIndicator = useMemo(() => {
    if (!isTyping || typingMessageId) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex justify-start"
      >
        <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white/10 text-gray-100 rounded-bl-none flex items-center gap-3 border border-white/5">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-gray-400">AI sedang mengetik...</span>
        </div>
      </motion.div>
    );
  }, [isTyping, typingMessageId]);

  // ============================================
  // MEMOIZED: Main Chat Content
  // ============================================
  const chatContent = useMemo(() => (
    <div className="flex flex-col h-full bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-2xl text-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#6B5344] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[14px] font-sans">AI Selarasa</h3>
            <span className="text-[11px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Online
            </span>
          </div>
        </div>
        {!isMobile && (
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-0">
        {chatMessages}
        {typingIndicator}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/20 border-t border-white/10 shrink-0">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="relative flex items-end bg-white/5 rounded-xl border border-white/10 focus-within:border-[#8B7355]/50 transition-colors"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya tentang Selarasa..."
            className="w-full bg-transparent text-sm text-white resize-none max-h-24 p-3 pr-12 outline-none scrollbar-hide flex-1 placeholder:text-gray-500"
            rows={1}
            style={{ minHeight: '44px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-2 rounded-lg text-[#8B7355] hover:bg-[#8B7355]/20 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-gray-500 mt-2 text-center">
          AI dapat membuat kesalahan. Verifikasi informasi penting.
        </p>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(139,115,85,0.3);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(139,115,85,0.5);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  ), [chatMessages, typingIndicator, input, isTyping, isMobile, onClose, sendMessage, handleKeyDown]);

  // ============================================
  // RENDER: Mobile vs Desktop
  // ============================================
  if (isMobile) {
    return chatContent;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          drag
          dragMomentum={false}
          dragElastic={0.1}
          onDragStart={() => { document.body.style.cursor = 'grabbing'; }}
          onDragEnd={() => { document.body.style.cursor = 'auto'; }}
          className="fixed z-[100] cursor-grab active:cursor-grabbing w-[400px] h-[550px]"
          style={{
            bottom: '24px',
            right: '24px',
            touchAction: 'none'
          }}
        >
          {chatContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatAI;
