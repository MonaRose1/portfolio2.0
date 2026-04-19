import { useState } from 'react';
import { Send, Mail, MapPin, Clock, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(0,212,255,0.14)',
    borderRadius: '8px',
    padding: '13px 16px',
    color: '#f0f4ff',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
            <span className="section-label">Contact</span>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
          </div>
          <h2
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.01em' }}
          >
            Let's{' '}
            <span className="gradient-text-cyan">Build Together</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '14px', fontSize: '0.97rem', maxWidth: '500px', margin: '14px auto 0' }}>
            Have an automation challenge or a product to build? I'm available for freelance projects and full-time opportunities.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '40px', alignItems: 'start' }}>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { icon: <Mail size={18} />, label: 'Email', value: 'alex@morgan.dev', color: '#00d4ff' },
              { icon: <MapPin size={18} />, label: 'Location', value: 'San Francisco, CA', color: '#39ff14' },
              { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 24 hours', color: '#ff6b35' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card"
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}28`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="section-label" style={{ fontSize: '0.62rem', color: item.color, marginBottom: '3px' }}>
                    {item.label}
                  </div>
                  <div style={{ color: '#f0f4ff', fontSize: '0.92rem', fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div className="glass-card" style={{ padding: '24px' }}>
              <div className="section-label" style={{ marginBottom: '16px' }}>Find me on</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: <Github size={18} />, label: 'GitHub', color: '#f0f4ff' },
                  { icon: <Linkedin size={18} />, label: 'LinkedIn', color: '#00d4ff' },
                  { icon: <Twitter size={18} />, label: 'Twitter', color: '#00d4ff' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    style={{
                      width: 42,
                      height: 42,
                      border: '1px solid rgba(0,212,255,0.16)',
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
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.16)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="glass-card"
              style={{ padding: '20px 24px', borderColor: 'rgba(57,255,20,0.2)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#39ff14', boxShadow: '0 0 10px #39ff14' }} />
                <span className="font-mono-custom" style={{ fontSize: '0.8rem', color: '#39ff14' }}>
                  Available for hire
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card reveal" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <CheckCircle size={52} color="#39ff14" style={{ margin: '0 auto 20px' }} />
                <h3 className="font-orbitron" style={{ fontSize: '1.3rem', color: '#f0f4ff', marginBottom: '12px' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-primary"
                  style={{ marginTop: '28px', fontSize: '0.85rem' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.14)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.14)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.14)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <option value="" style={{ background: '#04040f' }}>Select a topic...</option>
                    <option value="ai-automation" style={{ background: '#04040f' }}>AI Automation Project</option>
                    <option value="fullstack" style={{ background: '#04040f' }}>Full Stack Development</option>
                    <option value="consulting" style={{ background: '#04040f' }}>Technical Consulting</option>
                    <option value="fulltime" style={{ background: '#04040f' }}>Full-Time Opportunity</option>
                    <option value="other" style={{ background: '#04040f' }}>Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', lineHeight: 1.6 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.14)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>
                      <div style={{ width: 16, height: 16, border: '2px solid transparent', borderTopColor: 'currentColor', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
