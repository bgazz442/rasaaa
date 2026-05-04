import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import EnhancedCardNav from './EnhancedCardNav';
import EnhancedLiquidGlassNav from './EnhancedLiquidGlassNav';

const NavbarWrapper = () => {
  const isMobile = useIsMobile();

  // Enhanced navbar with React Bits GlassSurface for both mobile and desktop
  // Provides ultra-smooth iOS-like liquid glass effects with advanced distortion
  return (
    <>
      {isMobile ? <EnhancedCardNav /> : <EnhancedLiquidGlassNav />}
    </>
  );
};

export default NavbarWrapper;
