import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const proyekData = [
  {
    id: 0,
    title: 'Reboisasi Hutan',
    description: 'Program penanaman kembali hutan yang gundul untuk menjaga ekosistem dan mengurangi perubahan iklim. Kami bekerja sama dengan komunitas lokal untuk menanam pohon-pohon endemik dan memulihkan lahan kritis.',
    icon: '🌲'
  },
  {
    id: 1,
    title: 'Konservasi Air',
    description: 'Pengelolaan sumber daya air secara berkelanjutan untuk menjaga ketersediaan air bersih. Proyek ini mencakup pembuatan sumur resapan, rehabilitasi mata air, dan edukasi penghematan air.',
    icon: '💧'
  },
  {
    id: 2,
    title: 'Energi Terbarukan',
    description: 'Pengembangan energi ramah lingkungan seperti tenaga surya dan angin untuk mengurangi ketergantungan pada bahan bakar fosil. Kami memasang panel surya di pusat komunitas dan memberikan pelatihan pemeliharaan.',
    icon: '⚡'
  },
  {
    id: 3,
    title: 'Edukasi Lingkungan',
    description: 'Edukasi masyarakat tentang pentingnya menjaga alam. Program ini meliputi workshop, seminar, dan kegiatan praktik seperti daur ulang dan pengomposan untuk meningkatkan kesadaran lingkungan.',
    icon: '📚'
  },
  {
    id: 4,
    title: 'Urban Farming',
    description: 'Pemanfaatan lahan kota untuk pertanian modern. Kami membantu masyarakat perkotaan menanam sayuran organik di lahan terbatas menggunakan teknik hidroponik dan vertikultur.',
    icon: '🌿'
  }
];

const AccordionProyek = forwardRef(({ activeIndex, setActiveIndex }, ref) => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  // Expose scrollToItem function to parent
  useImperativeHandle(ref, () => ({
    scrollToItem: (index) => {
      if (itemRefs.current[index]) {
        itemRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }));

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="detail-proyek"
      className="min-h-screen py-16 md:py-24 px-4 bg-gradient-to-b from-[#052e16] to-[#022c22]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-4">
            Detail Proyek
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Jelajahi Lebih Dalam
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
            Klik untuk membaca detail setiap proyek yang kami jalankan
          </p>
        </div>

        {/* Accordion Items dengan Framer Motion */}
        <div className="space-y-4">
          {proyekData.map((proyek, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div
                key={proyek.id}
                ref={(el) => itemRefs.current[index] = el}
                layout
                className={`
                  rounded-2xl border overflow-hidden
                  ${isActive 
                    ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/20' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-500/30'
                  }
                `}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl">{proyek.icon}</span>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-white">
                      {proyek.title}
                    </h3>
                  </div>
                  
                  <motion.div 
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${isActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-white/70'
                      }
                    `}
                  >
                    {isActive ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>

                {/* Accordion Content dengan Framer Motion */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.4, 0, 0.2, 1] 
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8">
                        <div className="pt-2 border-t border-white/10">
                          <p className="text-white/80 text-lg md:text-xl lg:text-2xl leading-relaxed mt-4">
                            {proyek.description}
                          </p>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 mt-6">
                            <button className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-500/30">
                              Lihat Detail
                            </button>
                            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-all border border-white/20">
                              Dokumentasi
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-white/50 text-sm mb-4">
            Tertarik berkolaborasi dalam proyek kami?
          </p>
          <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-medium transition-all hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
});

export default AccordionProyek;
