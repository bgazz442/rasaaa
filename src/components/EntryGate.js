import React, { useState, useEffect, useMemo } from 'react';
import { Sprout, Send, Sparkles, Leaf, TreePine } from 'lucide-react';

const questions = [
  {
    id: 'kebun-jagakarsa',
    text: 'Menurut kamu, berapa jumlah kebun yang ada di Kecamatan Jagakarsa?',
    subtitle: 'Tebak jumlahnya dan ceritakan pendapatmu',
    icon: <TreePine className="w-5 h-5 md:w-6 md:h-6 text-earth-sand" />,
  },
  {
    id: 'masa-depan',
    text: 'Menurutmu, seperti apa masa depan Selarasa?',
    subtitle: 'Bagikan visi dan harapan Anda',
    icon: <Sprout className="w-5 h-5 md:w-6 md:h-6 text-earth-sand" />,
  },
  {
    id: 'urban-farming',
    text: 'Salah satu manfaat urban farming bagi masyarakat kota adalah',
    subtitle: 'Bagikan pendapat Anda tentang pertanian kota',
    icon: <Leaf className="w-5 h-5 md:w-6 md:h-6 text-earth-sand" />,
  },
];

const EntryGate = ({ onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Random question selection (stable per mount)
  const selectedQuestion = useMemo(() => {
    return questions[Math.floor(Math.random() * questions.length)];
  }, []);

  const MIN_CHARS = 5;
  const MAX_CHARS = 500;

  // Lock body scroll
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
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
      setError(`Jawaban minimal ${MIN_CHARS} karakter.`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const answerData = {
        id: Date.now().toString(),
        questionId: selectedQuestion.id,
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
      }, 1800);
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

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-auto bg-gradient-to-br from-earth-dark via-earth-brown to-earth-dark"
      style={{ overscrollBehavior: 'none' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-earth-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-earth-sand/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-earth-lightgreen/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-4 py-8">
        <div className="w-full max-w-[500px] mx-auto">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-earth-sand to-earth-cream rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 md:w-8 md:h-8 text-earth-dark" />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/20 shadow-2xl">
            {!showSuccess ? (
              <>
                {/* Question */}
                <div className="text-center mb-5 md:mb-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    {selectedQuestion.icon}
                    <Sparkles className="w-4 h-4 text-earth-sand/60" />
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-serif font-semibold text-white leading-relaxed">
                    "{selectedQuestion.text}"
                  </h2>
                  <p className="mt-2 text-earth-cream/50 text-xs md:text-sm">
                    {selectedQuestion.subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={answer}
                      onChange={handleChange}
                      placeholder="Tulis jawabanmu di sini..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-earth-sand/50 focus:border-transparent transition-all resize-none text-sm leading-relaxed"
                      disabled={isSubmitting}
                      autoFocus
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
                    className="w-full py-3 px-6 bg-gradient-to-r from-earth-sand to-earth-cream text-earth-dark font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-earth-dark/30 border-t-earth-dark rounded-full animate-spin" />
                        <span className="text-sm">Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Kirim & Masuk</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-earth-cream/40">
                    Jawaban Anda akan menjadi bagian dari koleksi Selarasa
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-2">
                  Terima Kasih!
                </h3>
                <p className="text-earth-cream/70 text-sm mb-2">
                  Jawaban Anda telah tersimpan.
                </p>
                <p className="text-earth-sand text-xs">
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
    </div>
  );
};

export default EntryGate;
