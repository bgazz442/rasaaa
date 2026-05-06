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
      content: 'Halo! Ada yang bisa saya bantu tentang layanan Selarasa hari ini?',
      isTyping: false,
      isNew: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState(null);
  
  // Draggable states
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

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
      // Send to backend API with standard format
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      // CEK RESPONSE VALID
      if (!res.ok) {
        throw new Error('Server error');
      }

      const data = await res.json();

      // Standard format validation
      if (!data.success) {
        throw new Error(data.error || 'AI error');
      }

      // Add AI response
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer || 'Tidak ada respons',
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
        content: `Maaf, ${error.message}. Coba lagi ya.`,
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

  // Drag handlers for desktop
  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    
    // Only drag from header area
    const header = e.currentTarget.querySelector('[data-drag-handle]');
    if (!header || !header.contains(e.target)) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    e.preventDefault();
  }, [isMobile, position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isMobile) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart, isMobile]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
            className="flex items-start gap-3 justify-end"
          >
            <div className="bg-green-600 text-white p-4 rounded-3xl rounded-br-none shadow-sm max-w-[80%]">
              {isCurrentlyTyping ? (
                <TypewriterText 
                  content={msg.content} 
                  onComplete={() => handleTypingComplete(msg.id)}
                />
              ) : (
                <p className="text-sm leading-relaxed">{msg.content}</p>
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
          className="flex items-start gap-3"
        >
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="bg-white p-4 rounded-3xl rounded-bl-none shadow-sm border border-gray-100 max-w-[80%]">
            {isCurrentlyTyping ? (
              <TypewriterText 
                content={msg.content} 
                onComplete={() => handleTypingComplete(msg.id)}
              />
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">{msg.content}</p>
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
        className="flex items-start gap-3"
      >
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="bg-white p-4 rounded-3xl rounded-bl-none shadow-sm border border-gray-100 max-w-[80%] flex items-center gap-3">
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
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full h-full max-w-sm flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-in-out border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              data-drag-handle="true"
              className="bg-gradient-to-r from-green-600 to-green-700 p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Selarasa Hub</h3>
                  <p className="text-xs text-green-100">Siap bantu kamu selaras.</p>
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
            <div className="h-96 overflow-y-auto p-6 bg-gray-50/50 flex flex-col gap-5">
              {chatMessages}
              {typingIndicator}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pesanmu di sini..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-5 pr-12 text-sm focus:border-green-300 focus:ring-green-100 focus:ring-2 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-600 p-2.5 text-white hover:bg-green-700 transition shadow-sm disabled:opacity-40 disabled:hover:bg-green-600"
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

  // Desktop: Draggable modal
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        ref={chatRef}
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          width: '400px',
          height: '520px',
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: 9999,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        className="overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-in-out border border-gray-100"
        onMouseDown={handleMouseDown}
      >
        {/* Header */}
        <div 
          data-drag-handle="true"
          className="bg-gradient-to-r from-green-600 to-green-700 p-5 flex items-center justify-between"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Selarasa Hub</h3>
              <p className="text-xs text-green-100">Siap bantu kamu selaras.</p>
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
        <div className="h-96 overflow-y-auto p-6 bg-gray-50/50 flex flex-col gap-5">
          {chatMessages}
          {typingIndicator}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesanmu di sini..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-5 pr-12 text-sm focus:border-green-300 focus:ring-green-100 focus:ring-2 focus:outline-none transition"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-600 p-2.5 text-white hover:bg-green-700 transition shadow-sm disabled:opacity-40 disabled:hover:bg-green-600"
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
