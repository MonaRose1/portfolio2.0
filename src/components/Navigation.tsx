import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Lab', href: '#lab' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(4, 4, 15, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 212, 255, 0.1)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div style={{
              width: 34,
              height: 34,
              border: '1.5px solid #00d4ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0,212,255,0.25)',
            }}>
              <Zap size={16} color="#00d4ff" fill="#00d4ff" />
            </div>
            <span className="font-orbitron" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f0f4ff', letterSpacing: '0.05em' }}>
              ALEX<span style={{ color: '#00d4ff' }}>.</span>AI
            </span>
          </a>

          <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-space"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
            <button
              className="btn-primary"
              style={{ padding: '8px 22px', fontSize: '0.85rem' }}
              onClick={() => handleNavClick('#contact')}
            >
              Hire Me
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0f4ff', display: 'none' }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="animate-slide-down"
          style={{
            background: 'rgba(4, 4, 15, 0.97)',
            borderTop: '1px solid rgba(0, 212, 255, 0.12)',
            padding: '20px 24px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                display: 'block',
                padding: '12px 0',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
