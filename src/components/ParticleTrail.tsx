'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  brightness: number;
}

const MAX_PARTICLES = 60;
const COLORS = [
  { r: 212, g: 168, b: 67 },   // #D4A843
  { r: 201, g: 169, b: 110 },   // #C9A96E
  { r: 232, g: 201, b: 122 },   // #E8C97A
  { r: 245, g: 214, b: 168 },   // #F5D6A8
  { r: 184, g: 144, b: 32 },    // #B89020
];

export default function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const spawnParticle = useCallback((x: number, y: number) => {
    const now = performance.now();
    if (now - lastSpawnRef.current < 16) return; // throttle to ~60fps spawn
    lastSpawnRef.current = now;

    const particles = particlesRef.current;
    if (particles.length >= MAX_PARTICLES) {
      // recycle oldest
      const oldest = particles.reduce((min, p, i) =>
        p.life < particles[min].life ? i : min, 0
      );
      const p = particles[oldest];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed - 0.3;
      p.life = 0;
      p.maxLife = 40 + Math.random() * 40;
      p.size = 1.5 + Math.random() * 3;
      p.hue = 40 + Math.random() * 15;
      p.brightness = 70 + Math.random() * 30;
      p.r = color.r;
      p.g = color.g;
      p.b = color.b;
      return;
    }

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.8 + 0.2;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.3,
      life: 0,
      maxLife: 40 + Math.random() * 40,
      size: 1.5 + Math.random() * 3,
      hue: 40 + Math.random() * 15,
      brightness: 70 + Math.random() * 30,
      r: color.r,
      g: color.g,
      b: color.b,
    } as Particle & { r: number; g: number; b: number });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      spawnParticle(e.clientX, e.clientY);
      // Spawn 1-2 extra for density
      if (Math.random() > 0.4) spawnParticle(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i] as Particle & { r: number; g: number; b: number };
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005; // slight upward drift
        p.vx *= 0.98; // friction
        p.vy *= 0.98;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio >= 1) {
          particles.splice(i, 1);
          continue;
        }

        // Ease out opacity and size
        const alpha = 1 - lifeRatio * lifeRatio; // quadratic ease-out
        const currentSize = p.size * (1 - lifeRatio * 0.6);

        // Outer glow
        const glowSize = currentSize * 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        gradient.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${alpha * 0.6})`);
        gradient.addColorStop(0.3, `rgba(${p.r},${p.g},${p.b},${alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentSize), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(255, p.r + 40)},${Math.min(255, p.g + 40)},${Math.min(255, p.b + 20)},${alpha * 0.9})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spawnParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99998] pointer-events-none"
      aria-hidden="true"
    />
  );
}