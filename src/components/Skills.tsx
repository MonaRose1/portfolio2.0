import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'AI & Machine Learning',
    color: '#00d4ff',
    tagClass: '',
    skills: [
      { name: 'LangChain / LlamaIndex', level: 95 },
      { name: 'OpenAI / Anthropic APIs', level: 98 },
      { name: 'RAG Systems', level: 92 },
      { name: 'Fine-tuning (LoRA)', level: 85 },
      { name: 'Vector Databases', level: 90 },
      { name: 'Multi-Agent Systems', level: 88 },
    ],
  },
  {
    category: 'Full Stack Development',
    color: '#39ff14',
    tagClass: 'tag-green',
    skills: [
      { name: 'React / Next.js', level: 97 },
      { name: 'Node.js / Express', level: 95 },
      { name: 'TypeScript', level: 94 },
      { name: 'Python / FastAPI', level: 91 },
      { name: 'PostgreSQL / Supabase', level: 89 },
      { name: 'GraphQL', level: 82 },
    ],
  },
  {
    category: 'Automation & DevOps',
    color: '#ff6b35',
    tagClass: 'tag-orange',
    skills: [
      { name: 'n8n / Make / Zapier', level: 96 },
      { name: 'Docker / Kubernetes', level: 87 },
      { name: 'AWS / GCP', level: 85 },
      { name: 'CI/CD Pipelines', level: 90 },
      { name: 'Webhook Integrations', level: 93 },
      { name: 'Redis / Queues', level: 84 },
    ],
  },
];

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        setTimeout(() => setWidth(level), 100);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
        <span style={{ fontSize: '0.875rem', color: '#f0f4ff', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          {name}
        </span>
        <span
          className="font-mono-custom"
          style={{ fontSize: '0.72rem', color, letterSpacing: '0.05em' }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: '4px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: '2px',
            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}

const toolTags = [
  'OpenAI GPT-4', 'Claude 3', 'Gemini', 'Mistral', 'Ollama',
  'LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'Chroma',
  'n8n', 'Make.com', 'Zapier', 'Dify', 'Flowise',
  'Vercel', 'Supabase', 'PlanetScale', 'Redis', 'Cloudflare',
  'HuggingFace', 'Replicate', 'Anthropic', 'Groq', 'Together AI',
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
            <span className="section-label">Tech Stack</span>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
          </div>
          <h2
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.01em' }}
          >
            Skills &{' '}
            <span className="gradient-text-warm">Expertise</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              className="glass-card reveal"
              style={{ padding: '32px', transitionDelay: `${i * 0.12}s` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: group.color,
                    boxShadow: `0 0 10px ${group.color}`,
                  }}
                />
                <h3
                  className="font-space"
                  style={{ fontSize: '0.9rem', fontWeight: 600, color: group.color, letterSpacing: '0.04em' }}
                >
                  {group.category}
                </h3>
              </div>
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} color={group.color} />
              ))}
            </div>
          ))}
        </div>

        <div className="glass-card reveal" style={{ padding: '40px' }}>
          <h3
            className="font-space"
            style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Tools & Platforms
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {toolTags.map((tool, i) => (
              <span
                key={tool}
                className={`tag ${i % 3 === 0 ? '' : i % 3 === 1 ? 'tag-green' : 'tag-orange'}`}
                style={{ cursor: 'default', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
