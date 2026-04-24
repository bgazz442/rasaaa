import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Media items configuration - video first, then images
const mediaItems = [
  {
    type: 'video',
    src: '/video-kegiatan.mp4',
    title: 'Video Kegiatan Selarasa',
    poster: '/foto-kegiatan-1.jpg' // Use image as poster
  },
  {
    type: 'image',
    src: '/foto-kegiatan-1.jpg',
    title: 'Foto Kegiatan 1',
    alt: 'Kegiatan Selarasa'
  },
  {
    type: 'image',
    src: '/foto-kegiatan-2.png',
    title: 'Foto Kegiatan 2',
    alt: 'Aktivitas Selarasa'
  }
];

const MediaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Unmute on user interaction (required for mobile audio)
        videoRef.current.muted = false;
        videoRef.current.volume = 0.3;
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error('[Video] Play failed:', err.message);
        });
      }
    }
  };

  // Auto-play video when it's the current slide (muted autoplay required for mobile)
  useEffect(() => {
    const currentItem = mediaItems[currentIndex];
    if (currentItem.type === 'video' && videoRef.current) {
      // Ensure video is muted for mobile autoplay
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        console.log('[Video] Autoplay success on mobile');
      }).catch((err) => {
        console.log('[Video] Autoplay blocked:', err.message);
        // Auto-play blocked, show play button
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

  // Handle video ended - move to next slide
  const handleVideoEnded = () => {
    nextSlide();
  };

  const currentItem = mediaItems[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Main Media Container */}
      <div className="relative aspect-[4/3] bg-earth-brown/10 rounded-2xl overflow-hidden shadow-2xl border border-earth-sand/20">
        
        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-earth-sand/20">
            <div className="w-10 h-10 border-4 border-earth-green/30 border-t-earth-green rounded-full animate-spin"></div>
          </div>
        )}

        {/* Video Content */}
        {currentItem.type === 'video' && (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={currentItem.src}
              poster={currentItem.poster}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnded}
              onLoadedData={(e) => {
                setIsLoaded(true);
                // Set volume to 30% (not too loud)
                e.target.volume = 0.3;
              }}
              onError={(e) => {
                console.error('[Video] Error loading video:', e);
                setIsLoaded(true);
              }}
              playsInline
              webkit-playsinline="true"
              muted
              loop={false}
              preload="auto"
              controls={false}
              style={{ willChange: 'transform' }}
            />
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-earth-dark" />
                ) : (
                  <Play className="w-8 h-8 text-earth-dark ml-1" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Image Content */}
        {currentItem.type === 'image' && (
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
            loading="eager"
            decoding="async"
            style={{ willChange: 'transform' }}
          />
        )}

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-earth-cream to-white hover:from-white hover:to-earth-sand rounded-full flex items-center justify-center shadow-xl shadow-earth-dark/20 hover:shadow-2xl hover:shadow-earth-dark/30 hover:scale-110 transition-all duration-300 z-10 border border-earth-sand/30 group"
          aria-label="Previous"
        >
          <ChevronLeft className="w-7 h-7 text-earth-dark group-hover:text-earth-green transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-earth-cream to-white hover:from-white hover:to-earth-sand rounded-full flex items-center justify-center shadow-xl shadow-earth-dark/20 hover:shadow-2xl hover:shadow-earth-dark/30 hover:scale-110 transition-all duration-300 z-10 border border-earth-sand/30 group"
          aria-label="Next"
        >
          <ChevronRight className="w-7 h-7 text-earth-dark group-hover:text-earth-green transition-colors" />
        </button>

        {/* Slide Indicators - Minimalist Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-white shadow-lg' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Media Type Label */}
        <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
          <span className="text-white text-xs font-medium tracking-wide">
            {currentItem.type === 'video' ? 'Video' : 'Foto'} {currentIndex + 1}/{mediaItems.length}
          </span>
        </div>
      </div>

    </div>
  );
};

export default MediaCarousel;
