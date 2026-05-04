import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import Dock from './Dock';
import { Home, Image, Phone } from 'lucide-react';

const MobileDock = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Only show on mobile devices
  if (!isMobile) {
    return null;
  }

  const dockItems = [
    {
      icon: <Home size={18} />,
      label: 'Beranda',
      onClick: () => navigate('/')
    },
    {
      icon: <Image size={18} />,
      label: 'Pameran',
      onClick: () => navigate('/pameran')
    },
    {
      icon: <Phone size={18} />,
      label: 'Kontak',
      onClick: () => navigate('/contact')
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <Dock
        items={dockItems}
        panelHeight={60}
        baseItemSize={45}
        magnification={65}
        distance={150}
        className="selarasa-dock"
      />
    </div>
  );
};

export default MobileDock;
