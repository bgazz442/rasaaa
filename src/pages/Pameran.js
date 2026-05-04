import React, { useState } from 'react';
import { X, Calendar, Image, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import pameranHeroVideo from '../assets/videos/pameran-hero-bg.mp4';
import pameran1 from '../assets/images/pameran-1.jpg';
import pameran2 from '../assets/images/pameran-2.jpg';
import pameran3 from '../assets/images/pameran-3.jpg';
import pameran4 from '../assets/images/pameran-4.jpg';
import pameran5 from '../assets/images/pameran-5.jpg';
import festivalPangan1 from '../assets/images/festival-pangan-1.jpg';
import festivalPangan2 from '../assets/images/festival-pangan-2.jpg';
import festivalPangan3 from '../assets/images/festival-pangan-3.jpg';
import ruangrupa1 from '../assets/images/ruangrupa-1.jpeg';
import ruangrupa2 from '../assets/images/ruangrupa-2.jpeg';
import ruangrupa3 from '../assets/images/ruangrupa-3.jpeg';
import ruangrupa4 from '../assets/images/ruangrupa-4.jpeg';
import ruangrupa5 from '../assets/images/ruangrupa-5.jpeg';
import kenduriRasaVideo from '../assets/videos/kenduri-rasa.mp4';
import tumbuhDariHulu1 from '../assets/images/tumbuh-dari-hulu-1.jpeg';
import tumbuhDariHulu2 from '../assets/images/tumbuh-dari-hulu-2.jpeg';
import tumbuhDariHulu3 from '../assets/images/tumbuh-dari-hulu-3.jpeg';

const exhibitionsData = [
  {
    id: 1,
    name: 'FESTIVAL KIAMAT EKOSISTEM',
    date: 'July 2024',
    description: 'Pameran yang menampilkan keberagaman pangan lokal dari Kecamatan Jagakarsa. Menghadirkan hasil panen warga, olahan makanan tradisional, dan instalasi seni tentang rantai pangan.',
    gallery: [
      pameran1,
      pameran2,
      pameran3,
      pameran4,
      pameran5,
    ],
  },
  {
    id: 2,
    name: 'Festival Pangan',
    date: 'Oktober 2024',
    description: 'Pameran kolaborasi antara seniman dan petani urban. Menggabungkan karya seni visual, instalasi tanaman, dan dokumentasi proses kreatif di kebun komunitas.',
    gallery: [
      festivalPangan1,
      festivalPangan2,
      festivalPangan3,
    ],
  },
  {
    id: 3,
    name: 'Ulang Tahun Ruang Rupa Yang Ke 25',
    date: 'Oktober 2025',
    description: 'Perayaan ulang tahun ke-25 Ruang Rupa yang menampilkan 25 tahun perjalanan seni rupa kontemporer di Indonesia. Menghadirkan karya-karya ikonik, dokumentasi, dan refleksi perjalanan seni kolektif.',
    gallery: [
      ruangrupa1,
      ruangrupa2,
      ruangrupa3,
      ruangrupa4,
      ruangrupa5,
    ],
  },
  {
    id: 4,
    name: 'Pameran kenduri rasa',
    date: 'November 2024',
    description: 'Pameran kuliner dan seni yang merayakan keberagaman rasa lokal. Menghadirkan hidangan tradisional, instalasi seni rasa, dan dokumentasi proses kreatif komunitas.',
    video: kenduriRasaVideo,
  },
  {
    id: 5,
    name: 'Tumbuh Dari Hulu',
    date: 'Desember 2025',
    description: 'Pameran yang mengeksplorasi konsep pertumbuhan dari sumbernya. Menampilkan dokumentasi proses budidaya, perjalanan benih menjadi tanaman, dan cerita di balik setiap panen yang tumbuh dari hulu hingga hilir.',
    gallery: [
      tumbuhDariHulu1,
      tumbuhDariHulu2,
      tumbuhDariHulu3,
    ],
  },
];

const Pameran = () => {
  const [lightbox, setLightbox] = useState({ open: false, images: [], currentIndex: 0 });
  const [videoRef, setVideoRef] = useState(null);
  const [videoRefs, setVideoRefs] = useState(new Set());

  const openLightbox = (images, index) => {
    setLightbox({ open: true, images, currentIndex: index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ open: false, images: [], currentIndex: 0 });
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction) => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + direction + prev.images.length) % prev.images.length,
    }));
  };

  const addVideoRef = (ref) => {
    if (ref && !videoRefs.has(ref)) {
      setVideoRefs(prev => new Set(prev).add(ref));
    }
  };

  // Handle page visibility dan user interaction untuk kontrol semua video
  React.useEffect(() => {
    let hasUserInteracted = false;
    
    const handleUserInteraction = () => {
      hasUserInteracted = true;
      // Enable autoplay after user interaction - hanya untuk video yang visible
      videoRefs.forEach(video => {
        if (video) {
          const rect = video.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            video.muted = false;
            video.play().catch(error => {
              console.log('Autoplay prevented:', error.message);
            });
          }
        }
      });
    };

    const handleVisibilityChange = () => {
      if (hasUserInteracted) {
        videoRefs.forEach(video => {
          if (video) {
            if (document.hidden) {
              video.pause();
            } else {
              video.play().catch(error => {
                console.log('Autoplay prevented:', error.message);
              });
            }
          }
        });
      }
    };

    // Intersection Observer untuk mengontrol video saat scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting && !document.hidden) {
            // Video visible, coba play (setelah user interaction)
            if (hasUserInteracted) {
              // Pause semua video lain terlebih dahulu
              videoRefs.forEach(otherVideo => {
                if (otherVideo && otherVideo !== video) {
                  otherVideo.pause();
                  otherVideo.muted = true;
                }
              });
              
              // Play video yang visible dengan suara
              video.muted = false;
              video.play().catch(error => {
                console.log('Autoplay prevented:', error.message);
              });
            }
          } else {
            // Video tidak visible, pause dan mute
            video.pause();
            video.muted = true;
          }
        });
      },
      {
        threshold: 0.1 // Video mulai bermain saat 10% terlihat
      }
    );

    // Observe all videos
    videoRefs.forEach(video => {
      if (video) {
        observer.observe(video);
      }
    });

    // Add event listeners for user interaction
    const events = ['click', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      videoRefs.forEach(video => {
        if (video) {
          observer.unobserve(video);
        }
      });
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [videoRefs]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-36 md:pt-32 md:pb-40 text-earth-cream overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/90 via-earth-dark/80 to-earth-brown/90">
          <video
            ref={(ref) => {
              setVideoRef(ref);
              if (ref) addVideoRef(ref);
            }}
            src={pameranHeroVideo}
            alt="Pameran Selarasa Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            autoPlay
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-amber-400 to-white bg-clip-text text-transparent">Pameran</h1>
          <p className="text-earth-cream/90 max-w-2xl mx-auto text-sm md:text-base">
            Dokumentasi pameran dan kegiatan yang pernah diselenggarakan oleh Selarasa Kolektif.
          </p>
        </div>
      </section>

      {/* Exhibition List */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {exhibitionsData.map((exhibition, idx) => (
            <div key={exhibition.id} className="space-y-6">
              {/* Exhibition Info */}
              <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-start`}>
                <div className="md:w-2/5 space-y-3">
                  <div className="inline-flex items-center gap-2 text-earth-brown text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{exhibition.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-dark">
                    {exhibition.name}
                  </h2>
                  <p className="text-earth-dark/60 text-sm md:text-base leading-relaxed">
                    {exhibition.description}
                  </p>
                </div>

                {/* Gallery Grid */}
                <div className="md:w-3/5 w-full">
                  {exhibition.gallery ? (
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      {exhibition.gallery.map((img, imgIdx) => (
                      <button
                        key={imgIdx}
                        onClick={() => openLightbox(exhibition.gallery, imgIdx)}
                        className={`group relative overflow-hidden rounded-xl ${
                          imgIdx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${exhibition.name} - ${imgIdx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </button>
                    ))}
                    </div>
                  ) : exhibition.video ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <video
                        ref={addVideoRef}
                        src={exhibition.video}
                        alt={`${exhibition.name} - Video Documentation`}
                        className="w-full h-full object-cover"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        disablePictureInPicture
                        controlsList="nodownload"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Divider */}
              {idx < exhibitionsData.length - 1 && (
                <div className="border-b border-earth-sand/30 pt-8" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-2 md:left-6 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-2 md:right-6 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.currentIndex]}
              alt={`Preview ${lightbox.currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pameran;
