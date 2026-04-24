import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import CardNav from './CardNav';
import LiquidGlassNavIOS from './LiquidGlassNavIOS';

const NavbarWrapper = () => {
  const isMobile = useIsMobile();

  // Conditional rendering: CardNav for mobile, LiquidGlassNavIOS for desktop
  return (
    <>
      {isMobile ? <CardNav /> : <LiquidGlassNavIOS />}
    </>
  );
};

export default NavbarWrapper;
