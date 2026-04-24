import React from 'react';
import { 
  Handshake, 
  ArrowLeft, 
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Partisipasi = () => {
  return (
    <div className="min-h-screen bg-earth-sand/10">
      {/* Header */}
      <div className="bg-earth-dark text-earth-cream pt-24 pb-16">
        <div className="w-full px-4 md:max-w-4xl md:mx-auto md:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-earth-sand hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Terlibat
          </h1>
          <p className="text-earth-sand/80 text-lg max-w-2xl">
            Terbuka untuk berbagai bentuk kolaborasi dan partisipasi komunitas.
            Mari bertumbuh bersama.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-4 md:max-w-4xl md:mx-auto md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Terbuka */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-earth-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-earth-green" />
            </div>
            <h3 className="text-xl font-semibold text-earth-dark mb-4">Terbuka</h3>
            <p className="text-gray-600 mb-6">
              Menerima berbagai bentuk kolaborasi dari individu maupun komunitas
            </p>
            <p className="text-sm text-earth-brown">
              Hubungi kami untuk berdiskusi lebih lanjut tentang ide kolaborasi Anda.
            </p>
          </div>

          {/* Komunitas */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-earth-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-earth-green" />
            </div>
            <h3 className="text-xl font-semibold text-earth-dark mb-4">Komunitas</h3>
            <p className="text-gray-600 mb-6">
              Bergabung dengan jaringan urban farmer dan praktisi pangan lokal
            </p>
            <p className="text-sm text-earth-brown">
              Mari membangun ekosistem pangan yang lebih kuat bersama-sama.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Tertarik untuk berkolaborasi? Hubungi kami melalui:
          </p>
          <a 
            href="mailto:selarasa@example.com" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-earth-dark text-white rounded-full hover:bg-earth-brown transition-colors"
          >
            Email Kami
          </a>
        </div>
      </div>
    </div>
  );
};

export default Partisipasi;
