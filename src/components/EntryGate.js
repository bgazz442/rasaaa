import React, { useState, useEffect } from 'react';
import { Sprout, Send, Sparkles, Leaf } from 'lucide-react';

const EntryGate = ({ onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const MIN_CHARS = 10;
  const MAX_CHARS = 500;

  // Lock body scroll when EntryGate is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Restore
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('gudskul_entry_answer');
    if (hasSubmitted) {
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setAnswer(value);
      setCharCount(value.length);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError('Silakan tulis jawaban Anda terlebih dahulu.');
      return;
    }

    if (answer.trim().length < MIN_CHARS) {
      setError(`Jawaban minimal ${MIN_CHARS} karakter. (${answer.trim().length}/${MIN_CHARS})`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const answerData = {
        id: Date.now().toString(),
        content: answer.trim(),
        timestamp: new Date().toISOString(),
        deviceId: localStorage.getItem('gudskul_device_id') || generateDeviceId(),
      };

      const existingAnswers = JSON.parse(localStorage.getItem('gudskul_answers') || '[]');
      existingAnswers.unshift(answerData);
      localStorage.setItem('gudskul_answers', JSON.stringify(existingAnswers));
      localStorage.setItem('gudskul_entry_answer', JSON.stringify(answerData));

      setShowSuccess(true);

      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  const generateDeviceId = () => {
    const id = 'device_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('gudskul_device_id', id);
    return id;
  };

  // Overlay styles - using inline styles for guaranteed positioning
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    minHeight: '100dvh',
    zIndex: 9999,
    overflow: 'auto',
    overscrollBehavior: 'none',
    touchAction: 'pan-y',
    WebkitOverflowScrolling: 'touch',
  };

  const contentStyle = {
    zIndex: 10,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    boxSizing: 'border-box',
    overflow: 'visible',
    textAlign: 'center',
  };

  const boxStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    flexShrink: 0,
    textAlign: 'center',
  };

  return (
    <>
      {/* Mobile-only CSS for perfect centering */}
      <style>{`
        @media (max-width: 768px) {
          .entrygate-content-mobile {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .entrygate-box-mobile {
            width: 90% !important;
            max-width: 400px !important;
            margin: 0 auto !important;
            flex-shrink: 0 !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
          .entrygate-box-mobile > * {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    <div style={overlayStyle} className="bg-gradient-to-br from-earth-dark via-earth-brown to-earth-dark">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-earth-green/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-earth-sand/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-leaf-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute inset-0 opacity-5 pattern-dots"></div>
      </div>

      {/* Content */}
      <div style={contentStyle} className="entrygate-content-mobile">
        <div style={boxStyle} className="entrygate-box-mobile">
          {/* Logo */}
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-flex items-center justify-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-earth-sand to-earth-cream rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 md:w-8 md:h-8 text-earth-dark" />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl w-full">
            {!showSuccess ? (
              <>
                {/* Question */}
                <div className="text-center mb-4 md:mb-6">
                  <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
                    <Sprout className="w-5 h-5 md:w-6 md:h-6 text-earth-sand" />
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-earth-sand/60" />
                  </div>
                  <h2 className="text-base sm:text-lg md:text-2xl font-serif font-semibold text-white leading-relaxed">
                    "Menurutmu, seperti apa
                    <br className="hidden sm:block" />
                    <span className="text-earth-sand">masa depan Selarasa?</span>"
                  </h2>
                  <p className="mt-2 md:mt-3 text-earth-cream/60 text-xs md:text-sm">
                    Bagikan visi dan harapan Anda
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={answer}
                      onChange={handleChange}
                      placeholder="Tulis jawabanmu di sini... (min 10 karakter)"
                      rows={3}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-white/20 rounded-xl md:rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-earth-sand/50 focus:border-transparent transition-all resize-none text-sm leading-relaxed"
                      disabled={isSubmitting}
                    />
                    <div className="absolute bottom-2 right-3 text-xs text-white/40">
                      <span className={charCount < MIN_CHARS ? 'text-red-400' : 'text-green-400'}>
                        {charCount}
                      </span>
                      <span>/{MAX_CHARS}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-xs text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-4 px-6 bg-gradient-to-r from-earth-sand to-earth-cream text-earth-dark font-semibold rounded-xl md:rounded-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-earth-dark/30 border-t-earth-dark rounded-full animate-spin"></div>
                        <span className="text-sm">Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm md:text-base">Kirim & Masuk</span>
                        <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-earth-cream/40">
                    Jawaban Anda akan menjadi bagian dari koleksi visi Selarasa
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-6 md:py-8 animate-fade-in">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-2 md:mb-4">
                  Terima Kasih!
                </h3>
                <p className="text-earth-cream/70 text-sm mb-2">
                  Visi Anda telah tersimpan.
                </p>
                <p className="text-earth-sand text-xs md:text-sm">
                  Mengarahkan ke website...
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-earth-cream/30">
              Selarasa Kolektif • Jagakarsa
            </p>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          if (window.confirm('Reset Entry Gate?')) {
            localStorage.removeItem('gudskul_entry_answer');
            localStorage.removeItem('gudskul_answers');
            localStorage.removeItem('gudskul_liked_posts');
            localStorage.removeItem('gudskul_display_numbers');
            window.location.reload();
          }
        }}
        style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 20 }}
        className="text-xs text-white/20 hover:text-white/50 transition-colors"
        title="Reset (Testing)"
      >
        Reset
      </button>
    </div>
    </>
  );
};

export default EntryGate;
