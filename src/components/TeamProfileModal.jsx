import React from 'react';
import { X } from 'lucide-react';

const TeamProfileModal = ({ profile, isOpen, onClose }) => {
  if (!isOpen || !profile) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-hidden animate-popupIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 md:py-6 border-b border-gray-100 bg-white/98 backdrop-blur-md">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Profil Member</h2>
            <p className="text-sm text-gray-500 mt-1">Selarasa Jagakarsa Food Lab</p>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Left Column - Photo & Info Card */}
              <div className="lg:w-[380px] flex-shrink-0 space-y-6">
                {/* Photo */}
                <div className="relative group">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Decorative gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </div>

                {/* Info Card */}
                {profile.kontribusi && (
                  <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-6 shadow-md">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3">Kontribusi</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {profile.kontribusi}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column - Biography */}
              <div className="flex-1 space-y-8">
                {/* Name Section */}
                <div className="space-y-3">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                    {profile.name}
                  </h3>
                  <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                </div>

                {/* Biography Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                    <h4 className="text-lg font-bold text-gray-900">Biografi</h4>
                  </div>

                  <div className="space-y-5 pl-0">
                    {Array.isArray(profile.bio) ? (
                      profile.bio.map((paragraph, idx) => (
                        <p 
                          key={idx} 
                          className="text-base md:text-lg text-gray-700 leading-relaxed text-justify"
                          style={{ textIndent: '0' }}
                        >
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Optional Action Area */}
        <div className="border-t border-gray-100 px-6 md:px-10 py-4 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Member Selarasa Food Lab
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfileModal;
