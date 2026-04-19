import { useEffect, useRef, useState } from 'react';
import { Code2, Brain, Cpu, Rocket } from 'lucide-react';

const stats = [
  { value: 50, suffix: '+', label: 'AI Projects Shipped' },
  { value: 3, suffix: 'M+', label: 'API Calls Automated Daily' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 6, suffix: 'yrs', label: 'Experience' },
];

const traits = [
  { icon: <Brain size={20} />, title: 'AI-First Thinking', desc: 'Every solution is designed with intelligent automation at its core.' },
  { icon: <Code2 size={20} />, title: 'Full Stack Fluency', desc: 'React to Node to cloud deployment — I own the entire pipeline.' },
  { icon: <Cpu size={20} />, title: 'LLM Integration', desc: 'Prompt engineering, RAG systems, and model fine-tuning at scale.' },
  { icon: <Rocket size={20} />, title: 'Rapid Delivery', desc: 'From prototype to production without sacrificing code quality.' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const steps = 50;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-orbitron" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#00d4ff' }}>
      {count}{suffix}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
            <span className="section-label">About Me</span>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
          </div>
          <h2
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.01em' }}
          >
            Building the{' '}
            <span className="gradient-text-cyan">Future of Automation</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '72px' }}>
          {traits.map((trait, i) => (
            <div
              key={trait.title}
              className="glass-card glass-card-hover reveal"
              style={{ padding: '28px', transitionDelay: `${i * 0.1}s` }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '10px',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00d4ff',
                  marginBottom: '18px',
                }}
              >
                {trait.icon}
              </div>
              <h3 className="font-space" style={{ fontSize: '1rem', fontWeight: 600, color: '#f0f4ff', marginBottom: '10px' }}>
                {trait.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {trait.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="glass-card reveal"
          style={{
            padding: 'clamp(32px, 5vw, 56px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px',
            textAlign: 'center',
            borderColor: 'rgba(0,212,255,0.16)',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter target={stat.value} suffix={stat.suffix} />
              <div
                className="font-mono-custom"
                style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '6px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h3 className="font-orbitron" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '20px' }}>
              My Story
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px', fontSize: '0.97rem' }}>
              I started as a full stack developer building web apps, then got obsessed with making
              them smarter. Five years ago, I dove deep into AI — starting with simple ML models,
              then language models, and now building complex multi-agent automation systems.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.97rem' }}>
              Today I architect systems where AI handles the repetitive, humans handle the creative,
              and everything connects seamlessly through APIs I design and deploy end-to-end.
            </p>
          </div>
          <div>
            <div
              style={{
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.12)',
                borderRadius: '12px',
                padding: '24px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.82rem',
                lineHeight: 1.8,
              }}
            >
              {[
                { key: 'const engineer', value: '"Alex Morgan"', color: '#f0f4ff' },
                { key: 'role', value: '"AI Automation + Full Stack"', color: '#00ff88' },
                { key: 'stack', value: '["React", "Node", "Python", "LLMs"]', color: '#00d4ff' },
                { key: 'passion', value: '"Automating the impossible"', color: '#ff6b35' },
                { key: 'available', value: 'true', color: '#39ff14' },
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {i === 0 ? (
                    <>
                      <span style={{ color: '#00d4ff' }}>const</span>
                      <span style={{ color: '#f0f4ff' }}>engineer</span>
                      <span style={{ color: 'var(--text-secondary)' }}>=</span>
                      <span style={{ color: '#39ff14' }}>&#123;</span>
                    </>
                  ) : i === 4 ? (
                    <>
                      <span style={{ color: 'var(--text-secondary)', paddingLeft: '16px' }}>{line.key}:</span>
                      <span style={{ color: line.color }}>{line.value}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>&#125;</span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: 'var(--text-secondary)', paddingLeft: '16px' }}>{line.key}:</span>
                      <span style={{ color: line.color }}>{line.value}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>,</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
