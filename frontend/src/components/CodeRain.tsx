import { useEffect, useRef } from 'react';

interface CodeDrop {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
}

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<CodeDrop[]>([]);
  const animationRef = useRef<number>();

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDrops = () => {
      const drops: CodeDrop[] = [];
      const dropCount = Math.floor(canvas.width / 20);

      for (let i = 0; i < dropCount; i++) {
        drops.push({
          x: i * 20,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 1,
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: Math.random() * 0.5 + 0.3
        });
      }
      return drops;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px monospace';
      ctx.fillStyle = '#0f0';

      dropsRef.current.forEach(drop => {
        ctx.globalAlpha = drop.opacity;
        ctx.fillText(drop.char, drop.x, drop.y);

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = 0;
          drop.char = chars[Math.floor(Math.random() * chars.length)];
        }

        if (Math.random() < 0.01) {
          drop.char = chars[Math.floor(Math.random() * chars.length)];
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    dropsRef.current = createDrops();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      dropsRef.current = createDrops();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ background: 'transparent' }}
    />
  );
};

export default CodeRain;
