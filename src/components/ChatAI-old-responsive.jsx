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
      content: 'Halo! Ada yang bisa saya bantu agar harimu lebih selaras?',
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
            <div className="bg-green-600 text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-[85%] text-sm">
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
          <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700">
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
        <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700 flex items-center gap-3">
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

  // Mobile: Full screen overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          style={{ padding: '1rem' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full h-full flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 transition-all duration-300"
            style={{ height: 'calc(100vh - 2rem)', maxHeight: 'calc(100vh - 2rem)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 pt-8 pb-5 px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Selarasa Hub</h3>
                  <p className="text-[10px] text-green-100 uppercase tracking-widest">AI Assistant</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="text-white/80 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50 flex flex-col gap-4">
              {chatMessages}
              {typingIndicator}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 pb-6 bg-white border-t border-gray-50">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tanya sesuatu..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-4 pr-12 text-sm focus:border-green-400 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md disabled:opacity-40 disabled:hover:bg-green-600"
                >
                  <Send className="w-4 h-4 transform rotate-90" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Desktop: Fixed position popup
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-10 right-6 z-50 w-full max-w-[360px] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 transition-all duration-300"
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 pt-8 pb-5 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Selarasa Hub</h3>
              <p className="text-[10px] text-green-100 uppercase tracking-widest">AI Assistant</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50 flex flex-col gap-4">
          {chatMessages}
          {typingIndicator}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 pb-6 bg-white border-t border-gray-50">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanya sesuatu..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-4 pr-12 text-sm focus:border-green-400 focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="absolute right-1.5 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md disabled:opacity-40 disabled:hover:bg-green-600"
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
