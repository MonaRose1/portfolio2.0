import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'AutoPilot CRM',
    subtitle: 'AI-Powered Customer Intelligence',
    desc: 'An autonomous CRM that uses GPT-4 to analyze customer interactions, predict churn, and auto-generate personalized follow-up sequences. Reduced manual outreach effort by 78%.',
    tags: ['LangChain', 'React', 'Node.js', 'PostgreSQL', 'n8n'],
    tagClass: '',
    accent: '#00d4ff',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    title: 'DocuMind RAG',
    subtitle: 'Enterprise Document Intelligence',
    desc: 'RAG pipeline that ingests 100k+ enterprise documents and enables natural language querying. Deployed for a Fortune 500 legal team with 94% accuracy on compliance queries.',
    tags: ['LlamaIndex', 'Pinecone', 'FastAPI', 'Next.js'],
    tagClass: 'tag-green',
    accent: '#39ff14',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    title: 'FlowForge',
    subtitle: 'Visual Automation Builder',
    desc: 'No-code workflow automation platform with 200+ integrations. Built on a custom React Flow canvas with an AI assistant that suggests automation steps based on natural language.',
    tags: ['React', 'TypeScript', 'Webhooks', 'Redis', 'Make.com'],
    tagClass: 'tag-orange',
    accent: '#ff6b35',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    title: 'AgentOS',
    subtitle: 'Multi-Agent Orchestration Platform',
    desc: 'Framework for building and deploying networks of specialized AI agents. Agents collaborate to complete complex tasks: research, writing, code generation, and QA — all autonomous.',
    tags: ['Python', 'AutoGen', 'FastAPI', 'Docker', 'Kubernetes'],
    tagClass: '',
    accent: '#00d4ff',
    image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    title: 'PriceWatch AI',
    subtitle: 'Competitive Intelligence Automation',
    desc: 'Automated competitor price tracking system using headless browsers, AI extraction, and real-time alerts. Monitors 50k+ SKUs across 30+ competitors daily.',
    tags: ['Playwright', 'OpenAI', 'Node.js', 'Supabase'],
    tagClass: 'tag-green',
    accent: '#39ff14',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
  {
    title: 'VoiceFlow API',
    subtitle: 'Real-Time Voice AI Platform',
    desc: 'Low-latency voice AI platform for building conversational agents with custom knowledge bases. Sub-200ms response times with emotion detection and context retention.',
    tags: ['Whisper', 'ElevenLabs', 'WebSockets', 'React', 'Python'],
    tagClass: 'tag-orange',
    accent: '#ff6b35',
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
            <span className="section-label">Work</span>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
          </div>
          <h2
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.01em' }}
          >
            Featured{' '}
            <span className="gradient-text-cyan">Projects</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="glass-card glass-card-hover reveal"
              style={{
                overflow: 'hidden',
                transitionDelay: `${(i % 3) * 0.1}s`,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  height: '180px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    filter: 'brightness(0.4) saturate(0.6)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)';
                    (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.55) saturate(0.8)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.4) saturate(0.6)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, rgba(4,4,15,0.92) 100%)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: project.accent,
                    boxShadow: `0 0 12px ${project.accent}`,
                  }}
                />
              </div>

              <div style={{ padding: '24px' }}>
                <div className="section-label" style={{ marginBottom: '6px', color: project.accent }}>
                  {project.subtitle}
                </div>
                <h3
                  className="font-orbitron"
                  style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f0f4ff', marginBottom: '12px', letterSpacing: '0.02em' }}
                >
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px' }}>
                  {project.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={`tag ${project.tagClass}`} style={{ fontSize: '0.65rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="#"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: project.accent,
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                  <a
                    href="#"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      fontFamily: "'Space Grotesk', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f4ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <Github size={13} /> Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '52px' }}>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#00d4ff',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.9rem',
              border: '1px solid rgba(0,212,255,0.2)',
              padding: '12px 28px',
              borderRadius: '8px',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)';
            }}
          >
            View All Projects <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
