import React, { useEffect, useRef, useCallback } from 'react';

const ClickSpark = ({
  children,
  sparkColor = 'rgba(255,255,255,0.8)',
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out'
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sparksRef = useRef([]);
  const animationRef = useRef(null);

  const easeOutQuad = (t) => t * (2 - t);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const getEasingFunction = (easeType) => {
    switch (easeType) {
      case 'ease-out':
      case 'easeOut':
        return easeOutQuad;
      case 'ease-out-cubic':
      case 'easeOutCubic':
        return easeOutCubic;
      case 'ease-out-quart':
      case 'easeOutQuart':
        return easeOutQuart;
      default:
        return easeOutQuad;
    }
  };

  const createSpark = useCallback((x, y) => {
    const sparks = [];
    const angleStep = (2 * Math.PI) / sparkCount;

    for (let i = 0; i < sparkCount; i++) {
      const angle = angleStep * i;
      const velocity = sparkRadius * (0.5 + Math.random() * 0.5);
      
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: sparkSize * (0.5 + Math.random() * 0.5),
        opacity: 1,
        startTime: Date.now()
      });
    }

    return sparks;
  }, [sparkCount, sparkRadius, sparkSize]);

  const drawSparks = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();
    const easeFn = getEasingFunction(easing);

    // Update and draw sparks
    sparksRef.current = sparksRef.current.filter(spark => {
      const elapsed = currentTime - spark.startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) return false;

      const easedProgress = easeFn(progress);
      
      spark.x += spark.vx * 0.016;
      spark.y += spark.vy * 0.016;
      spark.vx *= 0.95;
      spark.vy *= 0.95;
      spark.opacity = 1 - easedProgress;
      spark.size = spark.size * (1 - easedProgress * 0.5);

      ctx.save();
      ctx.globalAlpha = spark.opacity;
      ctx.fillStyle = sparkColor;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return true;
    });

    if (sparksRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(drawSparks);
    }
  }, [duration, easing, sparkColor]);

  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks = createSpark(x, y);
    sparksRef.current = [...sparksRef.current, ...newSparks];

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    drawSparks();
  }, [createSpark, drawSparks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleClick]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
