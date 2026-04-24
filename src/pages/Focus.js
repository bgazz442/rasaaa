import React from 'react';

const Focus = () => {
  const focusAreas = [
    {
      title: 'Pangan Lokal',
      description: 'Melestarikan, mengembangkan, dan mempromosikan varietas pangan lokal Indonesia sebagai bagian dari ketahanan pangan dan identitas budaya.',
      icon: 'food',
      color: 'leaf',
      topics: [
        'Varietas pangan tradisional',
        'Konservasi benih lokal',
        'Pengolahan pangan lokal',
        'Nutrisi pangan tradisional',
        'Hak atas pangan',
      ],
      initiatives: [
        'Seed Bank Jakarta',
        'Pasar Pangan Lokal',
        'Festival Pangan Tradisional',
        'Dokumentasi Resep Lokal',
      ],
    },
    {
      title: 'Urban Farming',
      description: 'Mengembangkan praktik pertanian perkotaan yang berkelanjutan untuk meningkatkan ketahanan pangan di kota.',
      icon: 'urban',
      color: 'earth',
      topics: [
        'Teknik pertanian urban',
        'Hidroponik dan aquaponik',
        'Pertanian organik',
        'Manajemen ruang terbatas',
        'Sistem irigasi efisien',
      ],
      initiatives: [
        'Kebun Komunitas',
        'Rooftop Garden',
        'Vertical Farming',
        'Composting Urban',
      ],
    },
    {
      title: 'Praktik Kolektif',
      description: 'Membangun sistem kerja kolektif yang inklusif dan demokratis dalam pengelolaan sumber daya pangan.',
      icon: 'collective',
      color: 'leaf',
      topics: [
        'Manajemen kolektif',
        'Struktur organisasi horizontal',
        'Pengambilan keputusan partisipatif',
        'Berbagi sumber daya',
        'Ekonomi soliditas',
      ],
      initiatives: [
        'Koperasi Pangan',
        'Kebun Bersama',
        'Dapur Komunal',
      ],
    },
    {
      title: 'Relasi Sosial',
      description: 'Memperkuat hubungan sosial melalui praktik pangan sebagai medium untuk membangun komunitas yang solid.',
      icon: 'social',
      color: 'earth',
      topics: [
        'Komunitas pangan',
        'Jaringan petani',
        'Konsumen sadar',
        'Pendidikan pangan',
        'Kesehatan kolektif',
      ],
      initiatives: [
        'Komunitas Makanan',
        'Jaringan Petani Kota',
        'Edukasi Publik',
        'Program Berbagi',
      ],
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      food: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      urban: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      collective: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      social: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.food;
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-leaf-50 to-earth-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-max">
          <div className="text-center">
            <h1 className="font-serif text-5xl text-earth-900 dark:text-gray-100 mb-6">
              Fokus & Isu
            </h1>
            <div className="w-24 h-1 bg-leaf-500 mx-auto mb-8"></div>
            <p className="text-xl text-earth-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Area fokus utama Selarasa dalam mengembangkan ekosistem pangan lokal 
              yang berkelanjutan, inklusif, dan berkeadilan.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-max">
          <div className="space-y-20">
            {focusAreas.map((area, index) => (
              <div
                key={area.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-${area.color}-100 dark:bg-${area.color}-900 rounded-full mb-6`}>
                    <div className={`text-${area.color}-600 dark:text-${area.color}-400`}>
                      {getIcon(area.icon)}
                    </div>
                  </div>
                  <h2 className="font-serif text-4xl text-earth-900 dark:text-gray-100 mb-6">
                    {area.title}
                  </h2>
                  <p className="text-lg text-earth-700 dark:text-gray-300 leading-relaxed mb-8">
                    {area.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-4">
                      Topik Utama
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {area.topics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center text-earth-600 dark:text-gray-400"
                        >
                          <svg className="w-4 h-4 mr-2 text-leaf-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-4">
                      Inisiatif Kami
                    </h3>
                    <div className="space-y-3">
                      {area.initiatives.map((initiative) => (
                        <div
                          key={initiative}
                          className="flex items-center justify-between p-3 bg-earth-50 dark:bg-gray-700 rounded-lg"
                        >
                          <span className="text-earth-700 dark:text-gray-300 font-medium">
                            {initiative}
                          </span>
                          <svg className="w-5 h-5 text-leaf-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-leaf-100 to-earth-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className={`text-${area.color}-500`}>
                          {getIcon(area.icon)}
                        </div>
                      </div>
                      <p className="text-earth-600 dark:text-gray-300 font-medium text-lg">
                        {area.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Issues */}
      <section className="section-padding bg-earth-50 dark:bg-gray-900">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-earth-900 dark:text-gray-100 mb-4">
              Isu Terkait
            </h2>
            <div className="w-16 h-1 bg-leaf-500 mx-auto mb-6"></div>
            <p className="text-lg text-earth-600 dark:text-gray-400 max-w-2xl mx-auto">
              Isu-isu strategis yang menjadi perhatian kami dalam mengembangkan ekosistem pangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Ketahanan Pangan
              </h3>
              <p className="text-earth-600 dark:text-gray-400 leading-relaxed">
                Membangun sistem yang resilient terhadap krisis pangan melalui diversifikasi 
                dan lokalisasi produksi.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Keadilan Pangan
              </h3>
              <p className="text-earth-600 dark:text-gray-400 leading-relaxed">
                Memastikan akses pangan yang adil untuk semua lapisan masyarakat 
                tanpa diskriminasi.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Keberlanjutan
              </h3>
              <p className="text-earth-600 dark:text-gray-400 leading-relaxed">
                Praktik pertanian dan konsumsi yang tidak merusak lingkungan 
                dan dapat dipertahankan jangka panjang.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Keanekaragaman Hayati
              </h3>
              <p className="text-earth-600 dark:text-gray-400 leading-relaxed">
                Melestarikan varietas tanaman dan ekosistem yang mendukung 
                ketahanan pangan lokal.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Ekonomi Lokal
              </h3>
              <p className="text-earth-600 dark:text-gray-400 leading-relaxed">
                Mengembangkan ekonomi sirkular yang memberdayakan petani 
                dan produsen lokal.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-earth-900 dark:text-gray-100 mb-3">
                Pendidikan Pangan
              </h3>
              <p className="text-earth-600 dark:text-gray-400 leading-relaxed">
                Meningkatkan literasi pangan masyarakat untuk membuat 
                pilihan yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-leaf-600 text-white">
        <div className="container-max text-center">
          <h2 className="font-serif text-4xl mb-6">
            Bergabung dalam Diskusi
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Mari bersama-sama mendiskusikan dan mengembangkan solusi 
            untuk isu-isu pangan lokal.
          </p>
          <button className="bg-white text-leaf-600 hover:bg-earth-50 px-8 py-3 rounded-lg transition-colors duration-200 font-medium">
            Ikuti Diskusi Publik
          </button>
        </div>
      </section>
    </div>
  );
};

export default Focus;
