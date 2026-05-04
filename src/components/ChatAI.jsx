import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';

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
      }, 20);
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

const getPageContext = () => {
  try {
    const pageName = window.location.pathname.replace('/', '') || 'home';
    const pageTitles = document.querySelectorAll('h1, h2, h3');
    const pageText = document.body.innerText?.substring(0, 3000) || '';
    return { pageName, pageText: pageText.slice(0, 2000) };
  } catch (e) {
    return { pageName: 'unknown', pageText: '' };
  }
};

const callGeminiDirect = async (question, pageContext = '') => {
  try {
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyCEVNDo_e9wuITobhZn61PLJtvdjukznsU";
    
    const systemPrompt = `You are an assistant for the Selarasa Jagakarsa Foodlab website.

STRICT RULES - MUST FOLLOW:
- Answer using ONLY the provided CONTEXT below
- Do NOT generate answers from general knowledge if context is available
- Do NOT add extra explanations outside the context
- Do NOT guess or assume
- If the answer is not found in the context, say exactly: "Informasi tersebut belum tersedia di halaman ini."
- Do NOT mention AI, system, or your capabilities
- Do NOT explain what you are
- No meta explanation

ANSWER STYLE:
- Short, clear, and straight to the point
- Use wording similar to the context
- Natural, friendly, and community-oriented
- Use "kita" dan "kamu" seperti anggota komunitas
- No AI-related statements

SAPAAN & INTERAKSI:
- "hai" → "hai" atau "hai, ada yang bisa dibantu?"
- "oy" → "oy" atau "oy, butuh info apa?"
- "p" → "p apa?" atau "p, ada yang bisa dibantu?"
- "hi" → "hi" atau "hi, selamat datang di Selarasa"
- "hello" → "hello" atau "hello, mau tahu apa tentang Selarasa?"

PRIORITY:
1. Context (highest priority - MUST use this first)
2. Only if context doesn't contain answer, use base knowledge about Selarasa

BASE KNOWLEDGE (only if context insufficient):
- Selarasa Jagakarsa Foodlab, Gudskul, Jl. Durian No.30A, Jagakarsa
- 5 Member: Julian Riezki, Tahlia Motik, Bellina Erby, Risya Ayunindya, Anita Bonit
- Kontak: selarasa.kolektif@gmail.com, WhatsApp +62 812 9281 6844
- Kegiatan: Majelis Sayur Jagakarsa, Hutan Jakarta (since 2016), Food Lab`;

    const finalPrompt = `${systemPrompt}

CONTEXT FROM CURRENT PAGE:
${pageContext || 'Tidak ada konteks halaman tersedia.'}

USER QUESTION:
${question}

Jawab berdasarkan CONTEXT di atas. Jika tidak ada di context, katakan "Informasi tersebut belum tersedia di halaman ini."`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: finalPrompt }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      const answer = data.candidates[0]?.content?.parts[0]?.text;
      if (answer && answer.trim()) {
        return answer;
      }
    }
    
    // Fallback: search in page context manually
    const q = question.toLowerCase().trim();
    const context = (pageContext || '').toLowerCase();
    
    // Helper to find relevant sentence in context
    const findInContext = (keywords) => {
      const sentences = pageContext.split(/[.!?\n]+/);
      for (const keyword of keywords) {
        if (context.includes(keyword)) {
          const relevant = sentences.find(s => s.toLowerCase().includes(keyword));
          if (relevant && relevant.trim().length > 10) {
            return relevant.trim();
          }
        }
      }
      return null;
    };
    
    // Respon sapaan (tidak perlu context)
    if (q === 'hai' || q === 'halo' || q === 'hallo') {
      return `Hai! Selamat datang di Selarasa. Ada yang bisa dibantu tentang komunitas kita?`;
    }
    
    if (q === 'oy' || q === 'oi') {
      return `Oy! Butuh info apa nih tentang Selarasa?`;
    }
    
    if (q === 'p' || q === 'pe') {
      return `P apa? Ada yang bisa dibantu?`;
    }
    
    if (q === 'hi') {
      return `Hi! Selamat datang di Selarasa. Mau tahu apa tentang kita?`;
    }
    
    if (q === 'hello') {
      return `Hello! Mau tahu apa tentang Selarasa?`;
    }
    
    if (q === 'hey' || q === 'helo') {
      return `Hey! Ada yang bisa dibantu?`;
    }
    
    // Cari di context terlebih dahulu untuk pertanyaan spesifik
    if (q.includes('selarasa') || q.includes('tentang')) {
      const found = findInContext(['selarasa', 'komunitas', 'foodlab', 'jagakarsa']);
      if (found) return found;
      return `Selarasa itu komunitas kita di Jagakarsa yang fokus ke pangan lokal dan urban farming. Kita mulai tahun 2019 sebagai bagian dari Gudskul.`;
    }
    
    if (q.includes('member') || q.includes('siapa') || q.includes('anggota')) {
      const found = findInContext(['member', 'anggota', 'julian', 'tahlia', 'bellina', 'risya', 'anita']);
      if (found) return found;
      return `Kita punya 5 member inti: Julian Riezki, Tahlia Motik, Bellina Erby, Risya Ayunindya, dan Anita Bonit. Mereka aktif di berbagai kegiatan komunitas.`;
    }
    
    if (q.includes('lokasi') || q.includes('alamat') || q.includes('dimana')) {
      const found = findInContext(['lokasi', 'alamat', 'gudskul', 'jagakarsa', 'durian']);
      if (found) return found;
      return `Kita berbasis di Gudskul, Jl. Durian No.30A, Jagakarsa, Jakarta Selatan.`;
    }
    
    if (q.includes('kontak') || q.includes('whatsapp') || q.includes('hubungi') || q.includes('telepon')) {
      const found = findInContext(['kontak', 'whatsapp', 'email', 'telepon']);
      if (found) return found;
      return `Kamu bisa hubungi kita lewat WhatsApp di +62 812 9281 6844 atau email selarasa.kolektif@gmail.com.`;
    }
    
    if (q.includes('kegiatan') || q.includes('program') || q.includes('kegiatan') || q.includes('aktivitas')) {
      const found = findInContext(['kegiatan', 'program', 'majelis sayur', 'hutan jakarta', 'food lab']);
      if (found) return found;
      return `Kita punya Majelis Sayur Jagakarsa rutin setiap minggu, Hutan Jakarta (gerakan urban farming sejak 2016), dan Food Lab untuk eksperimen pangan lokal.`;
    }
    
    if (q.includes('gabung') || q.includes('join') || q.includes('daftar')) {
      const found = findInContext(['gabung', 'join', 'daftar', 'member']);
      if (found) return found;
      return `Kamu bisa mulai dengan datang ke Majelis Sayur Jagakarsa atau hubungi kita lewat WhatsApp di +62 812 9281 6844.`;
    }
    
    // Jika ada context tapi tidak ketemu jawaban yang relevan
    if (pageContext && pageContext.length > 50) {
      return `Informasi tersebut belum tersedia di halaman ini.`;
    }
    
    // Jika tidak ada context, gunakan base knowledge
    return `Selarasa itu komunitas urban farming di Jagakarsa yang fokus ke pangan lokal. Ada yang bisa dibantu?`;
    
  } catch (err) {
    return `Maaf, lagi ada kendala teknis. Kalau urgent, coba hubungi langsung lewat WhatsApp +62 812 9281 6844 ya.`;
  }
};

const ChatAI = ({ isOpen, onClose, isMobile, pageContext = '' }) => {
  const [messages, setMessages] = useState([
    { 
      id: Date.now(), 
      role: 'ai', 
      content: 'Hai! Selamat datang di Selarasa. Mau tahu apa tentang komunitas kita?',
      isTyping: false,
      isNew: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const [currentPageContext, setCurrentPageContext] = useState(pageContext);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Update context when page changes or prop updates
  useEffect(() => {
    const updateContext = () => {
      const { pageText } = getPageContext();
      setCurrentPageContext(pageText || pageContext);
    };
    
    updateContext();
    
    // Listen for route changes
    const interval = setInterval(updateContext, 2000);
    return () => clearInterval(interval);
  }, [pageContext]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleTypingComplete = useCallback((msgId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === msgId ? { ...msg, isNew: false } : msg
    ));
    setIsTyping(false);
    setTypingMessageId(null);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userContent = input.trim();
    const userId = Date.now();
    
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
      const answer = await callGeminiDirect(userContent, currentPageContext);

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
      const errorId = Date.now() + 1;
      setMessages(prev => [...prev, { 
        id: errorId, 
        role: 'ai', 
        content: `Maaf, lagi ada kendala. Kalau urgent, hubungi WhatsApp +62 812 9281 6844 ya.`,
        isTyping: false,
        isNew: false
      }]);
      setIsTyping(false);
    }
  }, [input, isTyping]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

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
          <span className="text-xs text-gray-400">Mengetik...</span>
        </div>
      </motion.div>
    );
  }, [isTyping, typingMessageId]);

  const chatContent = useMemo(() => (
    <div className="flex flex-col h-full bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-2xl text-white">
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#6B5344] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[14px] font-sans">Selarasa</h3>
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-0">
        {chatMessages}
        {typingIndicator}
        <div ref={messagesEndRef} />
      </div>

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
