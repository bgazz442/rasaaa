import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Sprout, 
  ArrowRight, 
  X,
  Heart,
  Leaf,
  Trophy,
  Target,
  Quote,
  Plus
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Program = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const programsRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Statistics data
  const stats = [
    { label: 'Program Terlaksana', value: 24, suffix: '+', icon: <Target className="w-6 h-6" /> },
    { label: 'Total Peserta', value: 850, suffix: '+', icon: <Users className="w-6 h-6" /> },
    { label: 'Hasil Panen', value: 2.5, suffix: ' Ton', icon: <Sprout className="w-6 h-6" /> },
    { label: 'Lokasi Kegiatan', value: 15, suffix: '', icon: <MapPin className="w-6 h-6" /> },
  ];

  // Programs data
  const programs = [
    {
      id: 1,
      title: 'Urban Farming 101: Workshop Dasar',
      description: 'Workshop edukasi lengkap untuk pemula yang ingin memulai urban farming di rumah. Peserta belajar teknik menanam, perawatan, dan panen.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
      date: '15-17 Maret 2024',
      location: 'Kebun Komunitas Selarasa, Jakarta',
      participants: 45,
      category: 'Workshop',
      impact: {
        harvest: '150 kg',
        participants: 45,
        satisfaction: '4.8/5'
      },
      gallery: [
        'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
      ],
      details: 'Program ini dirancang khusus untuk pemula yang ingin memahami dasar-dasar urban farming. Selama 3 hari, peserta belajar dari teori hingga praktik langsung di kebun. Materi meliputi persiapan media tanam, penyemaian, perawatan, hingga teknik panen yang benar.'
    },
    {
      id: 2,
      title: 'Green Rooftop: Transformasi Atap Gedung',
      description: 'Proyek transformasi rooftop gedung perkantoran menjadi kebun produktif yang menghasilkan sayuran segar untuk karyawan.',
      image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&q=80',
      date: 'Januari - Maret 2024',
      location: 'Gedung Eco Tower, Jakarta Selatan',
      participants: 120,
      category: 'Proyek',
      impact: {
        harvest: '500 kg',
        participants: 120,
        satisfaction: '4.9/5'
      },
      gallery: [
        'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&q=80',
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
      ],
      details: 'Proyek kolaborasi dengan Green Building Council Indonesia untuk mengubah rooftop gedung perkantoran menjadi space produktif. Hasil panen digunakan untuk kantin gedung dan didistribusikan ke komunitas sekitar.'
    },
    {
      id: 3,
      title: 'School Garden: Edukasi Anak Sekolah',
      description: 'Program edukasi berkelanjutan di 10 sekolah dasar untuk mengajarkan anak-anak tentang pertanian dan keberlanjutan.',
      image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&q=80',
      date: 'Februari - Juni 2024',
      location: '10 SD di Jakarta & Tangerang',
      participants: 350,
      category: 'Edukasi',
      impact: {
        harvest: '300 kg',
        participants: 350,
        satisfaction: '4.7/5'
      },
      gallery: [
        'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&q=80',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
        'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=400&q=80',
      ],
      details: 'Program edukasi jangka panjang yang mengajarkan anak-anak tentang sumber pangan, pentingnya makanan sehat, dan dasar-dasar bercocok tanam. Setiap sekolah mendapatkan pendampingan selama 1 semester penuh.'
    },
    {
      id: 4,
      title: 'Community Harvest: Panen Bersama Warga',
      description: 'Kegiatan panen bersama yang melibatkan warga RW dalam merawat dan memanen hasil kebun komunitas.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
      date: 'Setiap Bulan',
      location: 'Berbagai RW di Jakarta',
      participants: 80,
      category: 'Komunitas',
      impact: {
        harvest: '200 kg/bulan',
        participants: 80,
        satisfaction: '4.9/5'
      },
      gallery: [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80',
        'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80',
        'https://images.unsplash.com/photo-1574943320219-553f6ed7e27e?w=400&q=80',
      ],
      details: 'Kegiatan rutin bulanan yang mempertemukan warga untuk bersama-sama merawat kebun komunitas dan memanen hasilnya. Hasil panen didistribusikan ke warga yang membutuhkan dan digunakan untuk acara komunitas.'
    },
    {
      id: 5,
      title: 'Hidroponik Masterclass: Teknik Modern',
      description: 'Kelas intensif tentang sistem hidroponik modern untuk petani urban yang ingin meningkatkan produktivitas.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      date: '20-22 April 2024',
      location: 'Ruang Kreasi Selarasa',
      participants: 30,
      category: 'Workshop',
      impact: {
        harvest: 'N/A',
        participants: 30,
        satisfaction: '4.8/5'
      },
      gallery: [
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
        'https://images.unsplash.com/photo-1574943320219-553f6ed7e27e?w=400&q=80',
      ],
      details: 'Masterclass untuk peserta yang sudah memiliki pengalaman dasar dan ingin mendalami teknik hidroponik. Meliputi sistem NFT, DWC, aeroponik, dan manajemen nutrisi yang presisi.'
    },
    {
      id: 6,
      title: 'Zero Waste Garden: Kebun Tanpa Sampah',
      description: 'Program komposting dan zero waste untuk mengubah sampah organik menjadi pupuk berkualitas tinggi.',
      image: 'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=800&q=80',
      date: 'Maret - Mei 2024',
      location: '5 Komunitas di Jakarta',
      participants: 125,
      category: 'Proyek',
      impact: {
        harvest: '1.2 Ton kompos',
        participants: 125,
        satisfaction: '4.6/5'
      },
      gallery: [
        'https://images.unsplash.com/photo-1584479898061-15742e14f50d?w=400&q=80',
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80',
        'https://images.unsplash.com/photo-1615811362139-4a5a0f062507?w=400&q=80',
      ],
      details: 'Program edukasi dan implementasi komposting skala komunitas. Peserta belajar mengolah sampah dapur dan kebun menjadi kompos berkualitas premium untuk digunakan kembali di kebun mereka.'
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Budi Santoso',
      role: 'Peserta Urban Farming 101',
      content: 'Programnya sangat praktis! Saya yang awalnya tidak punya pengalaman bercocok tanam, sekarang punya kebun hidroponik produktif di balkon rumah.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
    },
    {
      id: 2,
      name: 'Dewi Kusuma',
      role: 'Ketua RW 05',
      content: 'Community Harvest membantu mempererat hubungan antar warga. Kami sekarang punya kebun komunitas yang menghasilkan sayuran segar setiap bulan.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
    },
    {
      id: 3,
      name: 'Ahmad Fauzi',
      role: 'Guru SD Harapan Bangsa',
      content: 'School Garden mengubah cara pandang anak-anak terhadap pangan. Mereka sekarang lebih menghargai makanan dan mengerti proses pertanian.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.animate-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      statItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Program cards animation
      const programCards = programsRef.current?.querySelectorAll('.program-card');
      programCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: programsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Testimonials animation
      const testimonialCards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
      testimonialCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Workshop': return 'bg-amber-100 text-amber-800';
      case 'Proyek': return 'bg-blue-100 text-blue-800';
      case 'Edukasi': return 'bg-green-100 text-green-800';
      case 'Komunitas': return 'bg-rose-100 text-rose-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-green-50 via-emerald-50/50 to-[#FAF7F2]"
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="animate-item inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Aktivitas & Kegiatan
          </span>
          <h1 className="animate-item text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5C5548] mb-6 leading-tight">
            Program Kami
          </h1>
          <p className="animate-item text-lg md:text-xl text-[#5C5548]/70 max-w-2xl mx-auto leading-relaxed">
            Berbagai kegiatan nyata yang telah kami laksanakan untuk membangun 
            komunitas urban farming yang berkelanjutan dan berdampak positif.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="stat-item bg-white rounded-2xl p-6 text-center shadow-lg shadow-stone-200/50 border border-stone-100"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#5C5548] mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-[#5C5548]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section ref={programsRef} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h2 className="text-xl font-bold text-[#5C5548]">Program Terlaksana</h2>
            </div>
            <span className="text-sm text-[#5C5548]/60">{programs.length} program</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div 
                key={program.id}
                className="program-card group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(program.category)}`}>
                    {program.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{program.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-[#5C5548] mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm text-[#5C5548]/60 line-clamp-2 mb-4">
                    {program.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[#5C5548]/50">
                      <Users className="w-3.5 h-3.5" />
                      <span>{program.participants} peserta</span>
                    </div>
                    <button className="flex items-center gap-1 text-green-600 text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Detail</span>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-16 px-4 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Testimoni</span>
            <h2 className="text-3xl font-serif font-bold text-[#5C5548] mt-2">
              Apa Kata Mereka?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testi) => (
              <div 
                key={testi.id}
                className="testimonial-card bg-white rounded-2xl p-6 shadow-md border border-stone-100"
              >
                <Quote className="w-8 h-8 text-green-200 mb-4" />
                <p className="text-[#5C5548]/80 leading-relaxed mb-6 italic">
                  "{testi.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testi.image} 
                    alt={testi.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#5C5548]">{testi.name}</div>
                    <div className="text-xs text-[#5C5548]/60">{testi.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-700 to-emerald-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Ingin Bergabung?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8">
                Jadilah bagian dari pergerakan urban farming. Ikuti program kami 
                selanjutnya dan mulai bertani bersama komunitas.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/partisipasi"
                  className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                >
                  <span>Ikuti Program</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/program"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  <Leaf className="w-4 h-4" />
                  <span>Gabung Sekarang</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProgram(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-56 md:h-64">
              <img 
                src={selectedProgram.image} 
                alt={selectedProgram.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button 
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(selectedProgram.category)}`}>
                  {selectedProgram.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {selectedProgram.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-stone-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-xs text-[#5C5548]/60">Tanggal</div>
                  <div className="text-sm font-semibold text-[#5C5548]">{selectedProgram.date}</div>
                </div>
                <div className="text-center p-3 bg-stone-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-xs text-[#5C5548]/60">Lokasi</div>
                  <div className="text-sm font-semibold text-[#5C5548] line-clamp-1">{selectedProgram.location}</div>
                </div>
                <div className="text-center p-3 bg-stone-50 rounded-xl">
                  <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-xs text-[#5C5548]/60">Peserta</div>
                  <div className="text-sm font-semibold text-[#5C5548]">{selectedProgram.participants}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-bold text-[#5C5548] mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  Deskripsi Program
                </h4>
                <p className="text-[#5C5548]/70 leading-relaxed">
                  {selectedProgram.details}
                </p>
              </div>

              {/* Impact */}
              <div className="mb-6">
                <h4 className="font-bold text-[#5C5548] mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-green-600" />
                  Dampak Program
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-green-700">{selectedProgram.impact.harvest}</div>
                    <div className="text-xs text-green-600">Hasil/Output</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-green-700">{selectedProgram.impact.participants}</div>
                    <div className="text-xs text-green-600">Total Peserta</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-green-700">{selectedProgram.impact.satisfaction}</div>
                    <div className="text-xs text-green-600">Rating</div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h4 className="font-bold text-[#5C5548] mb-3 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-green-600" />
                  Dokumentasi
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProgram.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden">
                      <img src={img} alt={`Dokumentasi ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Program;
