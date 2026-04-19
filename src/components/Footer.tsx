import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(0,212,255,0.08)',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={14} color="#00d4ff" fill="#00d4ff" />
          <span className="font-orbitron" style={{ fontSize: '0.85rem', color: '#f0f4ff', fontWeight: 700, letterSpacing: '0.05em' }}>
            ALEX<span style={{ color: '#00d4ff' }}>.</span>AI
          </span>
        </div>
        <p className="font-mono-custom" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} — Built with React + AI
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['About', 'Skills', 'Lab', 'Projects', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
