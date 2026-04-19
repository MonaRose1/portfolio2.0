import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const ROLES = [
  'AI Automation Engineer',
  'Full Stack Developer',
  'LLM Integration Specialist',
  'Workflow Automation Architect',
];

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; alpha: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const role = useTypewriter(ROLES);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 120) {
          const force = (120 - distToMouse) / 120;
          p.x -= dx * force * 0.015;
          p.y -= dy * force * 0.015;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx2 = p.x - q.x;
          const dy2 = p.y - q.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -9999, y: -9999 }; });

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 24px 60px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: 36, height: 1, background: '#00d4ff' }} />
            <span className="section-label">Portfolio 2024</span>
          </div>

          <div
            className="font-mono-custom"
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ color: '#00d4ff' }}>{'> '}</span>Hello, World. I'm
          </div>

          <h1
            className="font-orbitron glow-cyan"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
              color: '#f0f4ff',
            }}
          >
            ALEX
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MORGAN
            </span>
          </h1>

          <div
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              minHeight: '2em',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span style={{ color: '#f0f4ff' }}>{role}</span>
            <span className="animate-blink" style={{ color: '#00d4ff', marginLeft: '2px' }}>_</span>
          </div>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '500px',
              marginBottom: '44px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Building intelligent systems that automate the complex. I bridge the gap between
            cutting-edge AI and production-ready full stack applications.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '56px' }}>
            <button className="btn-primary" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </button>
            <button className="btn-secondary" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get in Touch
            </button>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {[
              { icon: <Github size={18} />, href: '#', label: 'GitHub' },
              { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
              { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid rgba(0,212,255,0.18)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00d4ff';
                  e.currentTarget.style.color = '#00d4ff';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.18)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onClick={scrollToAbout}
        >
          <span className="section-label" style={{ fontSize: '0.65rem' }}>Scroll</span>
          <ArrowDown size={16} color="#00d4ff" className="animate-float" />
        </div>
      </div>
    </section>
  );
}
