import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const TeamProfileModal = ({ profile, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen && profile) {
      console.log("RENDER POPUP MEMBER:", profile.name);
    }
  }, [isOpen, profile]);

  if (!isOpen || !profile) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Profil</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Photo */}
            <div className="w-full md:w-64 flex-shrink-0">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
              {profile.aka && <p className="text-sm text-gray-600 italic">{profile.aka}</p>}
              {profile.birthInfo && <p className="text-sm text-gray-600">{profile.birthInfo}</p>}
              
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold uppercase mb-2">Biografi</h4>
                {profile.bio?.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-gray-700 leading-relaxed">{paragraph}</p>
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
