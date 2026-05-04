import { useRef, useEffect, useState } from 'react';
import './LightRays.css';

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = ''
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(canvasRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Parse color
      const color = raysColor.replace('#', '');
      const r = parseInt(color.substr(0, 2), 16) / 255;
      const g = parseInt(color.substr(2, 2), 16) / 255;
      const b = parseInt(color.substr(4, 2), 16) / 255;

      // Calculate ray origin
      let originX, originY;
      const outside = 0.2;
      switch (raysOrigin) {
        case 'top-left':
          originX = 0;
          originY = -outside * height;
          break;
        case 'top-right':
          originX = width;
          originY = -outside * height;
          break;
        case 'left':
          originX = -outside * width;
          originY = 0.5 * height;
          break;
        case 'right':
          originX = (1 + outside) * width;
          originY = 0.5 * height;
          break;
        case 'bottom-left':
          originX = 0;
          originY = (1 + outside) * height;
          break;
        case 'bottom-center':
          originX = 0.5 * width;
          originY = (1 + outside) * height;
          break;
        case 'bottom-right':
          originX = width;
          originY = (1 + outside) * height;
          break;
        default: // "top-center"
          originX = 0.5 * width;
          originY = -outside * height;
          break;
      }

      // Apply mouse influence
      let targetX = originX;
      let targetY = originY;
      if (followMouse && mouseInfluence > 0) {
        const mouseX = mouseRef.current.x * width;
        const mouseY = mouseRef.current.y * height;
        targetX = originX + (mouseX - originX) * mouseInfluence;
        targetY = originY + (mouseY - originY) * mouseInfluence;
      }

      // Draw light rays
      const numRays = 20;
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2 * lightSpread;
        const waveOffset = distortion * Math.sin(time * 2 + i * 0.5) * 0.1;
        const finalAngle = angle + waveOffset;

        const endX = targetX + Math.cos(finalAngle) * width * rayLength;
        const endY = targetY + Math.sin(finalAngle) * width * rayLength;

        // Calculate distance for fade
        const distance = Math.sqrt(Math.pow(endX - targetX, 2) + Math.pow(endY - targetY, 2));
        const maxDistance = width * rayLength;
        const lengthFalloff = Math.max(0, 1 - distance / maxDistance);
        const fadeFalloff = Math.max(0.5, 1 - distance / (width * fadeDistance));

        // Pulsating effect
        const pulse = pulsating ? (0.8 + 0.2 * Math.sin(time * raysSpeed * 3 + i * 0.3)) : 1;

        // Calculate ray strength
        const baseStrength = (0.45 + 0.15 * Math.sin(finalAngle * 36.2214 + time * raysSpeed)) +
                          (0.3 + 0.2 * Math.cos(-finalAngle * 21.11349 + time * raysSpeed));
        const strength = Math.max(0, Math.min(1, baseStrength)) * lengthFalloff * fadeFalloff * pulse;

        // Add noise
        let noise = 0;
        if (noiseAmount > 0) {
          noise = (Math.random() - 0.5) * noiseAmount;
        }

        // Draw ray
        const gradient = ctx.createLinearGradient(targetX, targetY, endX, endY);
        const alpha = strength + noise;
        gradient.addColorStop(0, `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${r * 255}, ${g * 255}, ${b * 255}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.sin(time + i * 0.5) * 1;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      time += 0.01 * raysSpeed;
      animationRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
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
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    const handleMouseMove = e => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [followMouse]);

  return <canvas ref={canvasRef} className={`light-rays-container ${className}`.trim()} />;
}
