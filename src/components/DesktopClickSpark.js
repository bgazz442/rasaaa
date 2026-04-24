import React, { useState, useEffect } from 'react';
import ClickSpark from './ClickSpark';

const DesktopClickSpark = ({
  children,
  sparkColor = 'rgba(255,255,255,0.8)',
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out'
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isDesktop) {
    return children;
  }

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={sparkSize}
      sparkRadius={sparkRadius}
      sparkCount={sparkCount}
      duration={duration}
      easing={easing}
    >
      {children}
    </ClickSpark>
  );
};

export default DesktopClickSpark;
