import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  MoveRight, 
  Wheat,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Proses = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const galleryRef = useRef(null);
  const tipsRef = useRef(null);

  // Process steps data
  const processSteps = [
    {
      id: 1,
      title: 'Persiapan Media Tanam',
      description: 'Campurkan tanah, kompos, dan cocopeat dengan perbandingan 2:1:1. Pastikan media tanam gembur dan kaya nutrisi.',
      icon: <Sprout className="w-6 h-6" />,
      duration: '3-5 hari',
      tips: ['Gunakan kompos matang minimal 2 bulan', 'Sterilkan media tanam dengan sinar matahari'],
      color: 'from-green-600 to-emerald-700'
    },
    {
      id: 2,
      title: 'Penyemaian Benih',
      description: 'Taburkan benih ke tray semai, tutup tipis dengan tanah, dan siram dengan sprayer. Simpan di tempat teduh.',
      icon: <Wheat className="w-6 h-6" />,
      duration: '7-14 hari',
      tips: ['Benih akan mulai berkecambah dalam 3-7 hari', 'Jaga kelembaban media tanam'],
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 3,
      title: 'Perawatan Tanaman',
      description: 'Siram pagi dan sore, beri pupuk cair organik setiap 2 minggu, dan pantau kesehatan tanaman secara rutin.',
      icon: <Droplets className="w-6 h-6" />,
      duration: '21-30 hari',
      tips: ['Waktu terbaik menyiram: 6-7 pagi & 4-5 sore', 'Periksa daun dari serangan hama'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 4,
      title: 'Pemindahan Tanaman',
      description: 'Pindahkan bibit ke pot/polybag yang lebih besar saat sudah memiliki 4-6 daun sejati.',
      icon: <MoveRight className="w-6 h-6" />,
      duration: '1-2 hari',
      tips: ['Hati-hati jangan sampai merusak akar', 'Siram setelah pemindahan untuk mengurangi stres'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 5,
      title: 'Panen',
      description: 'Petik sayuran saat ukuran optimal, biasanya 30-60 hari setelah tanam tergantung jenis sayur.',
      icon: <Sun className="w-6 h-6" />,
      duration: '30-60 hari',
      tips: ['Panen pagi hari untuk kesegaran maksimal', 'Gunakan gunting tajam untuk memotong batang'],
      color: 'from-rose-500 to-pink-600'
    }
  ];

  // Gallery images (placeholder - will be replaced with actual images)
  const galleryImages = [
    { id: 1, alt: 'Persiapan media tanam', caption: 'Mencampur kompos dan tanah' },
    { id: 2, alt: 'Penyemaian benih', caption: 'Benih mulai berkecambah' },
    { id: 3, alt: 'Perawatan', caption: 'Menyiram tanaman pagi hari' },
    { id: 4, alt: 'Pemindahan', caption: 'Memindahkan ke polybag' },
    { id: 5, alt: 'Tanaman tumbuh', caption: 'Sayuran tumbuh subur' },
    { id: 6, alt: 'Panen', caption: 'Memetik hasil panen' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.animate-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );

      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Gallery animation
      const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item');
      galleryItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Tips animation
      const tipsItems = tipsRef.current?.querySelectorAll('.tip-card');
      tipsItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tipsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-emerald-800/70 to-[#FAF7F2]" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80)',
            zIndex: -1 
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="animate-item text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Proses Penanaman
          </h1>
          <p className="animate-item text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Dari benih hingga panen, pelajari tahapan urban farming yang sistematis 
            dan berkelanjutan untuk hasil optimal di lahan terbatas.
          </p>
          <div className="animate-item mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              <Sprout className="w-4 h-4" />
              <span>5 Tahapan</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              <Sun className="w-4 h-4" />
              <span>30-60 Hari</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/70 rotate-90" />
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Tahapan</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C5548] mt-2">
              Perjalanan Urban Farming
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-emerald-400 to-green-600 md:-translate-x-1/2" />

            {processSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`timeline-item relative flex items-start gap-8 mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-green-500 rounded-full md:-translate-x-1/2 z-10 mt-6 shadow-lg" />
                
                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="bg-white rounded-2xl shadow-lg shadow-green-900/5 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Card header with gradient */}
                    <div className={`bg-gradient-to-r ${step.color} p-4 flex items-center gap-3`}>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                          Tahap {step.id}
                        </span>
                        <h3 className="text-white font-bold text-lg">{step.title}</h3>
                      </div>
                    </div>
                    
                    {/* Card body */}
                    <div className="p-5">
                      <p className="text-[#5C5548]/80 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                        <Sun className="w-4 h-4" />
                        <span>Durasi: {step.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section ref={tipsRef} className="py-16 px-4 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Tips</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C5548] mt-2">
              Tips Praktis Tiap Tahap
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div 
                key={`tip-${step.id}`}
                className="tip-card bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-stone-100"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${step.color} text-white mb-4`}>
                  {step.icon}
                </div>
                <h4 className="font-bold text-[#5C5548] mb-3">{step.title}</h4>
                <ul className="space-y-2">
                  {step.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#5C5548]/70">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Dokumentasi</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5C5548] mt-2">
              Galeri Proses
            </h2>
            <p className="text-[#5C5548]/60 mt-3 max-w-xl mx-auto">
              Lihat dokumentasi visual dari setiap tahapan penanaman
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div 
                key={img.id}
                className="gallery-item group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-stone-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                  <Sprout className="w-12 h-12 text-green-300" />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-[#5C5548]/50 mt-6">
            * Gambar akan ditambahkan dari dokumentasi nyata
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-700 to-emerald-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <Sprout className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Siap Memulai Urban Farming?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8">
                Bergabung dengan program kami untuk belajar bertani secara praktis 
                dengan pendampingan dari ahlinya.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/program"
                  className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                >
                  <span>Lihat Program</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/partisipasi"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  <span>Mulai Tanam</span>
                  <Sprout className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proses;
