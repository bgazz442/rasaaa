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
      content: 'Halo! Senang bertemu kamu. Ada yang bisa saya bantu agar semuanya lebih selaras hari ini?',
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
            className="flex items-start gap-2 justify-end"
          >
            <div className="bg-green-600 text-white p-4 rounded-2xl rounded-br-none shadow-sm max-w-[85%] text-sm">
              {isCurrentlyTyping ? (
                <TypewriterText 
                  content={msg.content} 
                  onComplete={() => handleTypingComplete(msg.id)}
                />
              ) : (
                <p>{msg.content}</p>
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
          className="flex items-start gap-2"
        >
          <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%] text-[14px] text-gray-700 leading-relaxed">
            {isCurrentlyTyping ? (
              <TypewriterText 
                content={msg.content} 
                onComplete={() => handleTypingComplete(msg.id)}
              />
            ) : (
              <p>{msg.content}</p>
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
        className="flex items-start gap-2"
      >
        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%] text-[14px] text-gray-700 leading-relaxed flex items-center gap-3">
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

  // Fully Responsive Design
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-0 right-0 z-50 w-full sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-h-[600px] h-[85vh] sm:h-auto flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-gray-100 transition-all duration-300"
      >
        {/* Header with Safe Area */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 pt-12 pb-4 px-6 sm:pt-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white border border-white/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">Selarasa AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
                <p className="text-[10px] text-green-100 uppercase tracking-widest font-medium">Online</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#f9fbfb] flex flex-col gap-4">
          {chatMessages}
          {typingIndicator}
          <div ref={messagesEndRef} />
        </div>

        {/* Input with Keyboard Friendly Padding */}
        <div className="p-4 pb-8 sm:pb-6 bg-white border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
          <div className="relative flex items-center bg-gray-50 rounded-full border border-gray-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-50 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanya sesuatu..."
              className="w-full bg-transparent py-3.5 pl-5 pr-12 text-[14px] focus:outline-none text-gray-700"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="absolute right-1.5 p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 active:scale-95 transition shadow-md disabled:opacity-40 disabled:hover:bg-green-600"
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
