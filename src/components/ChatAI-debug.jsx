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

const ChatAI = ({ isMobile, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: Date.now(), 
      role: 'assistant', 
      content: 'Hai! Selamat datang di Selarasa. Mau tahu apa tentang komunitas kita?',
      isTyping: false,
      isNew: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTypingComplete = useCallback((msgId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === msgId ? { ...msg, isNew: false } : msg
    ));
    setIsTyping(false);
    setTypingMessageId(null);
  }, []);

  // Send message to AI
  const sendMessage = useCallback(async () => {
    const userMessage = input.trim();
    if (!userMessage || isTyping) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      isTyping: false,
      isNew: false
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      console.log('[ChatAI] Sending message:', userMessage);
      
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesan: userMessage })
      });
      
      console.log('[ChatAI] Response status:', response.status);
      console.log('[ChatAI] Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('[ChatAI] Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('[ChatAI] Parsed data:', data);
      } catch (parseError) {
        console.error('[ChatAI] JSON parse error:', parseError);
        console.error('[ChatAI] Response that failed to parse:', responseText);
        throw new Error('Invalid response from server');
      }

      if (data.status === "error") {
        throw new Error(data.message);
      }

      // Add AI response
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply || 'Tidak ada respons',
        isTyping: true,
        isNew: true
      };

      setTypingMessageId(assistantMsg.id);
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('[ChatAI] Error:', error);
      
      // Add error message
      const errorMsg = {
        id: Date.now() + 2,
        role: 'assistant',
        content: `Error: ${error.message}`,
        isTyping: false,
        isNew: false
      };

      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
    }
  }, [input, isTyping]);

  // Handle Enter key
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isMobile ? 'bg-black/90' : 'bg-black/50'
        }`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full h-full flex flex-col ${
            isMobile ? 'max-w-full max-h-full' : 'max-w-md max-h-[80vh]'
          } bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-2xl text-white`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#6B5344] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[14px] font-sans">Selarasa AI (Debug)</h3>
                <span className="text-[11px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-0">
            {chatMessages}
            {typingIndicator}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatAI;
