import { useEffect, useRef } from 'react';

const PixelBlast = ({
  variant = 'circle',
  pixelSize = 6,
  color = '#B497CF',
  patternScale = 3,
  patternDensity = 1.2,
  pixelSizeJitter = 0.5,
  enableRipples = true,
  rippleSpeed = 0.4,
  rippleThickness = 0.12,
  rippleIntensityScale = 1.5,
  liquid = true,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  liquidWobbleSpeed = 5,
  speed = 0.6,
  edgeFade = 0.25,
  transparent = true
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Hex to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 180, g: 151, b: 207 };
    };

    const baseColor = hexToRgb(color);

    // Generate pixel grid
    const cols = Math.ceil(width / (pixelSize * patternScale));
    const rows = Math.ceil(height / (pixelSize * patternScale));
    const pixels = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const jitterX = (Math.random() - 0.5) * pixelSize * pixelSizeJitter;
        const jitterY = (Math.random() - 0.5) * pixelSize * pixelSizeJitter;
        const sizeVar = pixelSize * (0.8 + Math.random() * 0.4);
        
        pixels.push({
          x: x * pixelSize * patternScale + jitterX,
          y: y * pixelSize * patternScale + jitterY,
          baseSize: sizeVar,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5
        });
      }
    }

    // Ripple array
    const ripples = [];

    const addRipple = () => {
      ripples.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.3,
        intensity: 1
      });
    };

    const animate = () => {
      timeRef.current += speed * 0.016;
      
      // Clear canvas with dark background base
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Add new ripple occasionally
      if (enableRipples && Math.random() < 0.02) {
        addRipple();
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += rippleSpeed * 2;
        r.intensity = 1 - (r.radius / r.maxRadius);
        
        if (r.intensity <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Draw pixels
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

      pixels.forEach(p => {
        // Distance from center for circle variant
        const distFromCenter = Math.sqrt(
          Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)
        );
        
        // Edge fade
        const edgeFactor = Math.max(0, 1 - (distFromCenter / maxDist) * (1 + edgeFade));
        
        // Liquid wobble
        let wobbleX = 0, wobbleY = 0;
        if (liquid) {
          const wobble = Math.sin(timeRef.current * liquidWobbleSpeed + p.phase) * liquidStrength;
          wobbleX = Math.cos(p.phase) * wobble * liquidRadius;
          wobbleY = Math.sin(p.phase) * wobble * liquidRadius;
        }

        // Ripple effect
        let rippleEffect = 0;
        ripples.forEach(r => {
          const distToRipple = Math.sqrt(
            Math.pow(p.x - r.x, 2) + Math.pow(p.y - r.y, 2)
          );
          const rippleDist = Math.abs(distToRipple - r.radius);
          if (rippleDist < pixelSize * 4) {
            rippleEffect += r.intensity * Math.exp(-rippleDist / (pixelSize * 2)) * rippleIntensityScale;
          }
        });

        // Final position and size
        const finalX = p.x + wobbleX;
        const finalY = p.y + wobbleY;
        const breathing = Math.sin(timeRef.current + p.phase) * 0.15 + 1;
        const finalSize = p.baseSize * breathing * (1 + rippleEffect * 0.3);

        // Opacity based on edge fade and pattern density
        const opacity = edgeFactor * patternDensity;

        if (opacity > 0.01) {
          ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`;
          
          if (variant === 'circle') {
            ctx.beginPath();
            ctx.arc(finalX, finalY, finalSize / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(
              finalX - finalSize / 2,
              finalY - finalSize / 2,
              finalSize,
              finalSize
            );
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    variant, pixelSize, color, patternScale, patternDensity, pixelSizeJitter,
    enableRipples, rippleSpeed, rippleThickness, rippleIntensityScale,
    liquid, liquidStrength, liquidRadius, liquidWobbleSpeed, speed, edgeFade
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ 
        display: 'block',
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default PixelBlast;
