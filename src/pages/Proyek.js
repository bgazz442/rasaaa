import React, { useEffect, useState, useRef } from 'react';
import LightRays from '../components/LightRays';
import FlowingMenu from '../components/FlowingMenu';
import AccordionProyek from '../components/AccordionProyek';
import './Proyek.css';

const Proyek = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const accordionRef = useRef(null);

  // Fungsi untuk scroll ke accordion item tertentu
  const handleMenuClick = (index) => {
    setActiveAccordion(index);
    
    // Scroll ke item accordion yang spesifik (bukan hanya section)
    setTimeout(() => {
      accordionRef.current?.scrollToItem(index);
    }, 100);
  };

  // Data proyek dengan onClick handler
  const proyekItems = [
    {
      link: '#reboisasi',
      text: 'Reboisasi Hutan',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
      onClick: () => handleMenuClick(0)
    },
    {
      link: '#konservasi',
      text: 'Konservasi Air',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop',
      onClick: () => handleMenuClick(1)
    },
    {
      link: '#energi',
      text: 'Energi Terbarukan',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
      onClick: () => handleMenuClick(2)
    },
    {
      link: '#edukasi',
      text: 'Edukasi Lingkungan',
      image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&h=400&fit=crop',
      onClick: () => handleMenuClick(3)
    },
    {
      link: '#urban',
      text: 'Urban Farming',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop',
      onClick: () => handleMenuClick(4)
    }
  ];


  return (
    <div className="proyek-page">
      {/* Hero Section */}
      <section className="hero-proyek">
        <div className="hero-rays-container">
          <LightRays
            raysColor="#22c55e"
            raysOrigin="top-center"
            raysSpeed={1.2}
            lightSpread={0.7}
            rayLength={1.3}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.05}
            distortion={0.03}
            className="hero-rays"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">Proyek Alam</span>
          <h1 className="hero-title">Proyek Kami</h1>
          <p className="hero-subtitle">
            Jejak karya yang telah dan akan kami hadirkan untuk masa depan yang lebih hijau
          </p>
          <div className="hero-scroll-indicator">
            <span>Jelajahi</span>
            <div className="scroll-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="project-showcase">
        <div className="showcase-header">
          <h2 className="showcase-title">Green Projects</h2>
          <p className="showcase-subtitle">Inisiatif keberlanjutan untuk bumi yang lebih baik</p>
        </div>
        
        <div className="flowing-menu-container">
          <FlowingMenu
            items={proyekItems}
            speed={18}
            textColor="#bbf7d0"
            bgColor="transparent"
            marqueeBgColor="#22c55e"
            marqueeTextColor="#052e16"
            borderColor="rgba(255,255,255,0.1)"
          />
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          <span className="category-label">Kategori:</span>
          <div className="pills-container">
            <span className="pill active">Semua</span>
            <span className="pill">Sedang Berjalan</span>
            <span className="pill">Telah Selesai</span>
          </div>
        </div>
      </section>

      {/* Accordion Detail Section */}
      <AccordionProyek 
        ref={accordionRef}
        activeIndex={activeAccordion} 
        setActiveIndex={setActiveAccordion} 
      />
    </div>
  );
};

export default Proyek;
