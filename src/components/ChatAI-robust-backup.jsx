import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

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
      content: 'Halo! Nama saya **Selarasa AI**. Ada yang bisa saya bantu supaya harimu lebih selaras?',
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
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesan: userMessage })
      });
      
      const data = await response.json();

      if (data.reply) {
        // Add AI response
        const assistantMsg = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.reply,
          isTyping: true,
          isNew: true
        };

        setTypingMessageId(assistantMsg.id);
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('Tidak ada respons dari AI');
      }
    } catch (error) {
      console.error('[ChatAI] Error:', error);
      
      // Add error message
      const errorMsg = {
        id: Date.now() + 2,
        role: 'assistant',
        content: 'Duh, otaknya lagi muter nih. Coba tanya lagi ya!',
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
      
      if (isUser) {
        return (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-end gap-2 justify-end"
          >
            <div className="bg-green-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm max-w-[85%]">
              {isCurrentlyTyping ? (
                <TypewriterText 
                  content={msg.content} 
                  onComplete={() => handleTypingComplete(msg.id)}
                />
              ) : (
                <p className="text-[14px] leading-relaxed">{msg.content}</p>
              )}
            </div>
          </motion.div>
        );
      }
      
      return (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-end gap-2"
        >
          <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%]">
            {isCurrentlyTyping ? (
              <TypewriterText 
                content={msg.content} 
                onComplete={() => handleTypingComplete(msg.id)}
              />
            ) : (
              <p 
                className="text-[14px] text-gray-700 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ 
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }}
              />
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
        className="flex items-end gap-2"
      >
        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%] flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-gray-400">Mengetik...</span>
        </div>
      </motion.div>
    );
  }, [isTyping, typingMessageId]);

  if (!isOpen) return null;

  // Robust Mobile Design
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-0 right-0 z-[999] w-full sm:bottom-6 sm:right-6 sm:w-[380px] h-[90vh] sm:h-[600px] flex flex-col bg-white shadow-2xl rounded-t-[2.5rem] sm:rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-500"
      >
        {/* Header with Jumbo Safe Area */}
        <div className="relative bg-gradient-to-br from-green-600 to-green-700 pt-12 pb-6 px-6 sm:pt-7 shadow-lg flex-shrink-0">
          {/* Mobile Handle Indicator */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full sm:hidden"></div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-green-600 bg-emerald-400"></span>
            </div>

            <div className="flex flex-col">
              <h3 className="font-extrabold text-white text-lg tracking-tight leading-none mb-1">Selarasa AI</h3>
              <p className="text-[10px] text-green-100 font-bold uppercase tracking-[0.15em]">Sistem Online</p>
            </div>
            
            <button 
              onClick={onClose}
              className="ml-auto bg-white/10 hover:bg-white/20 p-2 rounded-xl text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#F8FAFB] flex flex-col gap-5">
          {chatMessages}
          {typingIndicator}
          <div ref={messagesEndRef} />
        </div>

        {/* Input with Enhanced Styling */}
        <div className="p-4 pb-10 sm:pb-6 bg-white border-t border-gray-100">
          <div className="relative flex items-center shadow-sm">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tulis pesan..."
              className="w-full rounded-2xl border-none bg-gray-100 py-4 pl-5 pr-14 text-[14px] focus:ring-2 focus:ring-green-600/20 transition-all outline-none text-gray-700"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2.5 bg-green-600 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="w-4 h-4 transform rotate-90" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatAI;
