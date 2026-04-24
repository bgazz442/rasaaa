import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const contactTypes = [
    { value: 'general', label: 'Pertanyaan Umum' },
    { value: 'collaboration', label: 'Kerjasama' },
    { value: 'participation', label: 'Partisipasi' },
    { value: 'media', label: 'Media & Publikasi' },
    { value: 'donation', label: 'Donasi & Dukungan' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="pt-24">
      <section className="section-padding bg-gradient-to-br from-leaf-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-max text-center">
          <h1 className="font-serif text-5xl text-earth-900 dark:text-gray-100 mb-6">
            Partisipasi & Kontak
          </h1>
          <div className="w-24 h-1 bg-leaf-500 mx-auto mb-8"></div>
          <p className="text-xl text-earth-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Mari terlibat dalam gerakan kolektif Selarasa. Ada banyak cara untuk 
            berkontribusi dalam membangun ekosistem pangan lokal yang lebih baik.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl text-earth-900 dark:text-gray-100 mb-6">
                Hubungi Kami
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-earth-700 dark:text-gray-300 mb-2">Jenis Kontak</label>
                  <select
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    {contactTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-earth-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-earth-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-earth-700 dark:text-gray-300 mb-2">Nomor Telepon (Opsional)</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-earth-700 dark:text-gray-300 mb-2">Subjek</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-earth-700 dark:text-gray-300 mb-2">Pesan</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Ceritakan lebih detail tentang bagaimana Anda ingin terlibat..."
                    className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="w-full btn-primary">
                  Kirim Pesan
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl text-earth-900 dark:text-gray-100 mb-6">
                Informasi Kontak
              </h2>
              
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-2">Alamat</h3>
                      <p className="text-earth-600 dark:text-gray-400">
                        Kebun Komunitas Selarasa<br />
                        Jl. Meruya Selatan No. 45<br />
                        Jakarta Barat 11650
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-2">Telepon</h3>
                      <p className="text-earth-600 dark:text-gray-400">
                        +62 812-3456-7890 (Admin)<br />
                        +62 812-3456-7891 (Program)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-2">Email</h3>
                      <p className="text-earth-600 dark:text-gray-400">
                        info@selarasa.org<br />
                        collaboration@selarasa.org
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-2">Jam Operasional</h3>
                      <p className="text-earth-600 dark:text-gray-400">
                        Senin - Jumat: 09:00 - 17:00<br />
                        Sabtu: 09:00 - 15:00<br />
                        Minggu: Tutup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Options */}
      <section className="section-padding bg-earth-50 dark:bg-gray-900">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-earth-900 dark:text-gray-100 mb-4">
              Cara Terlibat
            </h2>
            <div className="w-16 h-1 bg-leaf-500 mx-auto mb-6"></div>
            <p className="text-lg text-earth-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pilih cara yang sesuai untuk berkontribusi dalam gerakan Selarasa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Relawan
              </h3>
              <p className="text-earth-600 dark:text-gray-400 mb-4">
                Bantu di kebun, workshop, atau kegiatan komunitas
              </p>
              <button className="btn-secondary text-sm">
                Daftar Relawan
              </button>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Donasi
              </h3>
              <p className="text-earth-600 dark:text-gray-400 mb-4">
                Dukung kegiatan dengan donasi uang atau barang
              </p>
              <button className="btn-secondary text-sm">
                Donasi Sekarang
              </button>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Kolaborasi
              </h3>
              <p className="text-earth-600 dark:text-gray-400 mb-4">
                Kerjasama proyek atau program bersama
              </p>
              <button className="btn-secondary text-sm">
                Ajukan Kolaborasi
              </button>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-leaf-100 dark:bg-leaf-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-leaf-600 dark:text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Member
              </h3>
              <p className="text-earth-600 dark:text-gray-400 mb-4">
                Bergabung sebagai anggota komunitas tetap
              </p>
              <button className="btn-secondary text-sm">
                Daftar Member
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-max text-center">
          <h2 className="font-serif text-3xl text-earth-900 dark:text-gray-100 mb-6">
            Ikuti Kami
          </h2>
          <p className="text-lg text-earth-600 dark:text-gray-400 mb-8">
            Dapatkan update terbaru tentang kegiatan Selarasa
          </p>
          
          <div className="flex justify-center space-x-6">
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 bg-earth-100 dark:bg-earth-700 rounded-full flex items-center justify-center hover:bg-leaf-100 dark:hover:bg-leaf-900 transition-colors border-none cursor-pointer"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 text-earth-600 dark:text-earth-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 bg-earth-100 dark:bg-earth-700 rounded-full flex items-center justify-center hover:bg-leaf-100 dark:hover:bg-leaf-900 transition-colors border-none cursor-pointer"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6 text-earth-600 dark:text-earth-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 bg-earth-100 dark:bg-earth-700 rounded-full flex items-center justify-center hover:bg-leaf-100 dark:hover:bg-leaf-900 transition-colors border-none cursor-pointer"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 text-earth-600 dark:text-earth-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
