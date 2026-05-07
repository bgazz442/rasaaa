import React from 'react';
import { Users, School, Phone, MapPin, Globe, ExternalLink, Code } from 'lucide-react';

const teamMembers = [
  { name: 'Anggota 1', role: 'Frontend Developer' },
  { name: 'Anggota 2', role: 'UI/UX Designer' },
  { name: 'Anggota 3', role: 'Backend Developer' },
];

const portfolioItems = [
  {
    title: 'Website Selarasa',
    description: 'Website komunitas kolektif pangan lokal dan urban farming berbasis React.',
    tech: 'React, Tailwind CSS, Node.js',
    url: '/',
  },
  {
    title: 'Portfolio SMKN 20',
    description: 'Website profil sekolah dengan informasi jurusan, kegiatan, dan galeri.',
    tech: 'HTML, CSS, JavaScript',
    url: '#',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-earth-dark via-earth-brown to-earth-dark text-earth-cream overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-earth-sand/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-earth-green/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-earth-sand/20 px-4 py-1.5 rounded-full text-sm text-earth-sand font-medium mb-6">
            <Code className="w-4 h-4" />
            <span>Behind the Scene</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Tentang</h1>
          <p className="text-earth-cream/70 max-w-2xl mx-auto text-sm md:text-base">
            Cerita di balik pembuatan website ini — dari program magang hingga tim yang membangunnya.
          </p>
        </div>
      </section>

      {/* Profil Adibali */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-stone-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-earth-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <School className="w-7 h-7 text-earth-green" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-dark">
                  Profil Adibali
                </h2>
                <p className="text-earth-dark/50 text-sm mt-1">Program Magang SMKN 20 Jakarta</p>
              </div>
            </div>
            
            <div className="space-y-4 text-earth-dark/70 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-earth-dark">Adibali</strong> adalah nama tim magang dari SMKN 20 Jakarta 
                yang ditugaskan untuk membangun website Selarasa Kolektif. Program magang ini merupakan 
                bagian dari kurikulum Praktik Kerja Lapangan (PKL) yang bertujuan memberikan pengalaman 
                nyata kepada siswa dalam membangun proyek teknologi informasi.
              </p>
              <p>
                Selama masa magang, tim Adibali bekerja langsung dengan komunitas Selarasa untuk memahami 
                kebutuhan website, merancang desain yang sesuai dengan identitas komunitas, dan mengimplementasikan 
                fitur-fitur yang dibutuhkan menggunakan teknologi modern seperti React dan Tailwind CSS.
              </p>
              <p>
                Program ini tidak hanya mengasah kemampuan teknis, tetapi juga mengajarkan tentang 
                kolaborasi, komunikasi dengan klien, dan pemahaman konteks sosial dari sebuah proyek teknologi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Pembuat Web */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-earth-brown text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>Tim Adibali</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-dark mb-4">
            Tim Pembuat Website
          </h2>
          <p className="text-earth-dark/60 text-sm md:text-base max-w-xl mx-auto mb-10">
            Tiga siswa SMKN 20 Jakarta yang bekerja sama membangun website ini dari nol.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-[#FAF7F2] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-stone-100"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-earth-sand to-earth-brown flex items-center justify-center text-white text-2xl font-serif font-bold shadow-lg group-hover:scale-105 transition-transform">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-serif font-bold text-earth-dark text-lg">{member.name}</h3>
                <p className="text-earth-dark/50 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informasi SMKN 20 */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-earth-dark to-earth-brown rounded-3xl p-6 md:p-10 text-earth-cream">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent">
              Informasi SMKN 20 Jakarta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-earth-sand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-earth-sand" />
                  </div>
                  <div>
                    <p className="text-earth-cream/50 text-sm">Telepon</p>
                    <p className="font-medium">(021) 7694223</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-earth-sand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-earth-sand" />
                  </div>
                  <div>
                    <p className="text-earth-cream/50 text-sm">Alamat</p>
                    <a
                      href="https://maps.google.com/?q=Jl.+Melati+No.+24,+Cilandak+Barat,+Jakarta+Selatan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-earth-sand hover:text-white transition-colors inline-block"
                    >
                      Jl. Melati No. 24, Cilandak Barat, Jakarta Selatan
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-earth-sand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-earth-sand" />
                  </div>
                  <div>
                    <p className="text-earth-cream/50 text-sm">Website</p>
                    <a 
                      href="https://smkn20jkt.sch.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-earth-sand hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      smkn20jkt.sch.id
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-earth-sand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <School className="w-5 h-5 text-earth-sand" />
                  </div>
                  <div>
                    <p className="text-earth-cream/50 text-sm">Jurusan Terkait</p>
                    <p className="font-medium">Rekayasa Perangkat Lunak (RPL)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-dark mb-3">
              Portfolio
            </h2>
            <p className="text-earth-dark/60 text-sm md:text-base">
              Website yang pernah dibuat oleh tim Adibali
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group bg-[#FAF7F2] rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Preview placeholder */}
                <div className="aspect-video bg-gradient-to-br from-earth-sand/30 to-earth-brown/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <Code className="w-8 h-8 text-earth-brown/40 mx-auto mb-2" />
                    <p className="text-xs text-earth-dark/30">Preview</p>
                  </div>
                </div>
                
                <h3 className="font-serif font-bold text-earth-dark text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-earth-dark/60 text-sm mb-3 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-earth-brown bg-earth-sand/30 px-2 py-1 rounded-full">
                    {item.tech}
                  </span>
                  {item.url !== '#' && (
                    <a
                      href={item.url}
                      className="text-sm text-earth-green font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Lihat
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
