import React from 'react';
import { X } from 'lucide-react';

const TeamProfileModal = ({ profile, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
        >
          <X className="w-5 h-5 text-earth-dark" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Photo */}
            <div className="md:w-1/3 flex-shrink-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-earth-dark mb-2">
                {profile.name}
              </h2>
              {profile.aka && (
                <p className="text-earth-dark/60 text-sm mb-4 italic">
                  {profile.aka}
                </p>
              )}
              {profile.birthInfo && (
                <p className="text-earth-dark/60 text-sm mb-4">
                  {profile.birthInfo}
                </p>
              )}
              {profile.contact && (
                <div className="mb-4 text-sm text-earth-dark/60">
                  {profile.contact.email && (
                    <p>Email: {profile.contact.email}</p>
                  )}
                  {profile.contact.phone && (
                    <p>Telp: {profile.contact.phone}</p>
                  )}
                  {profile.contact.address && (
                    <p className="mt-1">Alamat: {profile.contact.address}</p>
                  )}
                </div>
              )}
              <div className="space-y-4 text-earth-dark/80 leading-relaxed text-sm md:text-base">
                {profile.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfileModal;
