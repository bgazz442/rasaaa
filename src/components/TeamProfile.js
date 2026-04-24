import React from 'react';
import PixelCard from './PixelCard';
import './TeamProfile.css';

const profiles = [
  {
    name: "Ahmad Rizky",
    image: "/images/profile1.jpg"
  },
  {
    name: "Bagas Chandra",
    image: "/images/profile2.jpg"
  },
  {
    name: "Budi Santoso",
    image: "/images/profile3.jpg"
  },
  {
    name: "Dewi Lestari",
    image: "/images/profile4.jpg"
  }
];

const TeamProfile = () => {
  return (
    <section className="team-section py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-earth-dark">
          Tim Kami
        </h2>
        
        {/* Row 1 - 1 card (center) */}
        <div className="flex justify-center mb-8">
          <PixelCard variant="pink" className="team-card">
            <div className="team-card-content">
              <h3 className="team-name">{profiles[0].name}</h3>
              <img 
                className="team-photo" 
                src={profiles[0].image} 
                alt={profiles[0].name}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </PixelCard>
        </div>

        {/* Row 2 - 3 cards (horizontal) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {profiles.slice(1).map((profile, index) => (
            <PixelCard key={index} variant="pink" className="team-card">
              <div className="team-card-content">
                <h3 className="team-name">{profile.name}</h3>
                <img 
                  className="team-photo" 
                  src={profile.image} 
                  alt={profile.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProfile;
