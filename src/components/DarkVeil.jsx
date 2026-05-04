import { useRef, useEffect } from 'react';
import './DarkVeil.css';

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0,
  resolutionScale = 1
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Create gradient effect
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      
      // Animated colors based on time
      const hue1 = (time * 20 + hueShift) % 360;
      const hue2 = (time * 30 + hueShift + 120) % 360;
      const hue3 = (time * 40 + hueShift + 240) % 360;

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 50%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 40%, 0.6)`);
      gradient.addColorStop(1, `hsla(${hue3}, 80%, 60%, 0.8)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add noise effect
      if (noiseIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * noiseIntensity * 255;
          data[i] = Math.max(0, Math.min(255, data[i] + noise));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      // Add scanline effect
      if (scanlineIntensity > 0) {
        for (let y = 0; y < height; y += Math.max(1, 4 - scanlineFrequency)) {
          const opacity = Math.sin(y * 0.1 + time * 2) * scanlineIntensity;
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.fillRect(0, y, width, 1);
        }
      }

      // Add warp effect
      if (warpAmount > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'overlay';
        const warpGradient = ctx.createRadialGradient(
          width/2 + Math.sin(time) * warpAmount * 50,
          height/2 + Math.cos(time) * warpAmount * 50,
          0,
          width/2,
          height/2,
          Math.max(width, height)
        );
        warpGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        warpGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        ctx.fillStyle = warpGradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      time += 0.01 * speed;
      animationRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * resolutionScale;
        canvas.height = parent.clientHeight * resolutionScale;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale]);

  return <canvas ref={canvasRef} className="darkveil-canvas" />;
}
