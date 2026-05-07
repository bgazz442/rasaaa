import React from 'react';
import { Mail, Phone, MapPin, Navigation, Store } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 text-earth-cream overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/10.jpg" 
            alt="Background" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <Navigation className="w-10 h-10 md:w-12 md:h-12 text-earth-sand mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-blue-400">Contact</h1>
          <p className="text-earth-cream/90 max-w-2xl mx-auto text-sm md:text-base">
            Hubungi kami atau kunjungi langsung lokasi Selarasa Kolektif di Jagakarsa.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {/* Email */}
            <a
              href="mailto:selarasagudskul@gmail.com"
              className="group bg-white rounded-2xl p-6 shadow-md border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-serif font-bold text-earth-dark mb-1">Email</h3>
              <p className="text-earth-dark/60 text-sm">selarasagudskul@gmail.com</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6285811213937"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-6 shadow-md border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-serif font-bold text-earth-dark mb-1">WhatsApp</h3>
              <p className="text-earth-dark/60 text-sm">+62 858 1121 3937</p>
              <span className="inline-block mt-2 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                Chat sekarang →
              </span>
            </a>

            {/* Alamat */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Gudskul+Jakarta"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-6 shadow-md border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-serif font-bold text-earth-dark mb-1">Alamat</h3>
              <p className="text-earth-dark/60 text-sm">
                Jl. Durian No.30A, RT.4/RW.4, Jagakarsa, Kec. Jagakarsa, Jakarta Selatan 12620
              </p>
            </a>
          </div>

          {/* Google Maps */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden mb-12">
            <div className="p-4 md:p-6 border-b border-stone-100">
              <h2 className="font-serif text-xl font-bold text-earth-dark flex items-center gap-2">
                <MapPin className="w-5 h-5 text-earth-green" />
                Lokasi Kami
              </h2>
              <p className="text-earth-dark/50 text-sm mt-1">
                Gudskul — Jl. Durian No.30A, Jagakarsa, Jakarta Selatan
              </p>
            </div>
            <div className="aspect-video md:aspect-[21/9] w-full">
              <iframe
                title="Lokasi Gudskul - Selarasa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5738462040465!2d106.8285!3d-6.3366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed7d0e5e0001%3A0x0!2sGudskul!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Navigation Actions */}
            <div className="p-4 md:p-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Gudskul+Jakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-earth-green text-white text-center py-3 px-4 rounded-xl font-medium hover:bg-earth-dark transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Navigasi Rute
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Gudskul+Jakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-earth-sand/30 text-earth-dark text-center py-3 px-4 rounded-xl font-medium hover:bg-earth-sand/50 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>
          </div>

          {/* Foto Toko */}
          <div className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-stone-100">
              <h2 className="font-serif text-xl font-bold text-earth-dark flex items-center gap-2">
                <Store className="w-5 h-5 text-earth-green" />
                Foto Lokasi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/foto-kegiatan-1.jpg"
                  alt="Lokasi Selarasa 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="aspect-video overflow-hidden">
                <img
                  src="/foto-kegiatan-2.png"
                  alt="Lokasi Selarasa 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
