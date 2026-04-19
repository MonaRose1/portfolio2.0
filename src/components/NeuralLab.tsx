import { useEffect, useRef, useState, useCallback } from 'react';
import { Trash2, Zap, Shuffle, Info } from 'lucide-react';

interface Neuron {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  layer: number;
  activation: number;
  pulsePhase: number;
}

interface Signal {
  fromId: number;
  toId: number;
  progress: number;
  speed: number;
  color: string;
}

const AI_LABELS = [
  'Input', 'Dense', 'Conv', 'ReLU', 'Pool', 'LSTM', 'Attn',
  'Embed', 'Norm', 'Drop', 'Softmax', 'Output', 'Gate', 'Head',
];

const COLORS = ['#00d4ff', '#39ff14', '#ff6b35', '#ffcc02', '#ff4499'];

let idCounter = 0;

function makeNeuron(x: number, y: number, w: number, h: number): Neuron {
  return {
    id: idCounter++,
    x,
    y,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 6 + 8,
    label: AI_LABELS[Math.floor(Math.random() * AI_LABELS.length)],
    layer: Math.floor(Math.random() * 4),
    activation: Math.random(),
    pulsePhase: Math.random() * Math.PI * 2,
  };
}

function initNeurons(count: number, w: number, h: number): Neuron[] {
  return Array.from({ length: count }, () =>
    makeNeuron(
      Math.random() * (w - 80) + 40,
      Math.random() * (h - 80) + 40,
      w,
      h,
    )
  );
}

export default function NeuralLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const animRef = useRef<number>();
  const draggingRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isTrainingRef = useRef(false);
  const [training, setTraining] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);
  const [signalCount, setSignalCount] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const getCanvas = () => canvasRef.current;

  const getNeuronAt = useCallback((x: number, y: number) => {
    return neuronsRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < n.radius + 6;
    });
  }, []);

  const fireSignals = useCallback(() => {
    const neurons = neuronsRef.current;
    if (neurons.length < 2) return;
    const newSignals: Signal[] = [];
    for (let i = 0; i < Math.min(neurons.length * 2, 20); i++) {
      const from = neurons[Math.floor(Math.random() * neurons.length)];
      const to = neurons[Math.floor(Math.random() * neurons.length)];
      if (from.id !== to.id) {
        newSignals.push({
          fromId: from.id,
          toId: to.id,
          progress: 0,
          speed: Math.random() * 0.012 + 0.006,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }
    signalsRef.current = [...signalsRef.current, ...newSignals];
  }, []);

  useEffect(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (neuronsRef.current.length === 0) {
        neuronsRef.current = initNeurons(14, canvas.width, canvas.height);
        setNodeCount(14);
      }
    };

    const CONN_DIST = 160;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = '#04040f';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const neurons = neuronsRef.current;
      const t = Date.now() / 1000;

      neurons.forEach((n) => {
        if (draggingRef.current === n.id) return;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < n.radius) { n.x = n.radius; n.vx *= -1; }
        if (n.x > w - n.radius) { n.x = w - n.radius; n.vx *= -1; }
        if (n.y < n.radius) { n.y = n.radius; n.vy *= -1; }
        if (n.y > h - n.radius) { n.y = h - n.radius; n.vy *= -1; }
        n.pulsePhase += 0.025;
      });

      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i];
          const b = neurons[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const opacity = (1 - dist / CONN_DIST) * 0.22;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(0, 212, 255, ${opacity})`);
            grad.addColorStop(1, `rgba(57, 255, 20, ${opacity * 0.6})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - dist / CONN_DIST) * 1.2;
            ctx.stroke();
          }
        }
      }

      signalsRef.current = signalsRef.current.filter((sig) => {
        const from = neurons.find((n) => n.id === sig.fromId);
        const to = neurons.find((n) => n.id === sig.toId);
        if (!from || !to) return false;

        sig.progress += sig.speed;
        if (sig.progress >= 1) return false;

        const x = from.x + (to.x - from.x) * sig.progress;
        const y = from.y + (to.y - from.y) * sig.progress;

        const grd = ctx.createRadialGradient(x, y, 0, x, y, 8);
        grd.addColorStop(0, sig.color);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.fill();

        return true;
      });

      if (isTrainingRef.current) {
        if (Math.random() < 0.25) {
          fireSignals();
        }
      }

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      neurons.forEach((n) => {
        const pulse = Math.sin(t * 2.5 + n.pulsePhase) * 0.4 + 0.6;
        const isHovered = Math.sqrt((n.x - mouseX) ** 2 + (n.y - mouseY) ** 2) < n.radius + 10;
        const isDragging = draggingRef.current === n.id;

        const layerColors = ['#00d4ff', '#39ff14', '#ff6b35', '#ffcc02'];
        const color = layerColors[n.layer % layerColors.length];

        if (isHovered || isDragging) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 16, 0, Math.PI * 2);
          ctx.fillStyle = `${color}12`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${Math.floor(pulse * 60).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grd.addColorStop(0, color);
        grd.addColorStop(1, `${color}88`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = `${color}cc`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = `500 9px 'JetBrains Mono', monospace`;
        ctx.fillStyle = '#04040f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });

      setSignalCount(signalsRef.current.length);
      animRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (draggingRef.current !== null) {
        const n = neuronsRef.current.find((n) => n.id === draggingRef.current);
        if (n) {
          n.x = mouseRef.current.x;
          n.y = mouseRef.current.y;
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const neuron = getNeuronAt(x, y);
      if (neuron) {
        draggingRef.current = neuron.id;
        neuron.vx = 0;
        neuron.vy = 0;
        canvas.style.cursor = 'grabbing';
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (draggingRef.current !== null) {
        const n = neuronsRef.current.find((n) => n.id === draggingRef.current);
        if (n) {
          n.vx = (Math.random() - 0.5) * 0.6;
          n.vy = (Math.random() - 0.5) * 0.6;
        }
        draggingRef.current = null;
        canvas.style.cursor = 'crosshair';
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!getNeuronAt(x, y)) {
        const n = makeNeuron(x, y, canvas.width, canvas.height);
        n.vx = 0;
        n.vy = 0;
        neuronsRef.current = [...neuronsRef.current, n];
        setNodeCount((c) => c + 1);
        setShowInfo(false);
        fireSignals();
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize);
    canvas.style.cursor = 'crosshair';

    resize();
    draw();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [getNeuronAt, fireSignals]);

  const handleTrain = () => {
    const next = !training;
    setTraining(next);
    isTrainingRef.current = next;
    if (next) fireSignals();
  };

  const handleShuffle = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    neuronsRef.current.forEach((n) => {
      n.vx = (Math.random() - 0.5) * 2.5;
      n.vy = (Math.random() - 0.5) * 2.5;
      n.activation = Math.random();
    });
    fireSignals();
  };

  const handleClear = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    neuronsRef.current = initNeurons(14, canvas.width, canvas.height);
    signalsRef.current = [];
    setNodeCount(14);
    isTrainingRef.current = false;
    setTraining(false);
    setShowInfo(true);
  };

  return (
    <section id="lab" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
            <span className="section-label">Interactive</span>
            <div style={{ width: 28, height: 1, background: '#00d4ff' }} />
          </div>
          <h2
            className="font-orbitron"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.01em' }}
          >
            Neural Network{' '}
            <span className="gradient-text-cyan">Playground</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '0.95rem' }}>
            Click to spawn neurons &mdash; drag to reposition &mdash; hit Train to see the network fire
          </p>
        </div>

        <div className="reveal" style={{ position: 'relative' }}>
          <div
            style={{
              border: '1px solid rgba(0,212,255,0.18)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              background: '#04040f',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ display: 'block', width: '100%', height: 'clamp(380px, 50vh, 560px)' }}
            />

            {showInfo && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  opacity: 0.55,
                }}
              >
                <Info size={28} color="#00d4ff" style={{ margin: '0 auto 10px' }} />
                <p className="font-mono-custom" style={{ fontSize: '0.8rem', color: '#00d4ff', letterSpacing: '0.1em' }}>
                  CLICK ANYWHERE TO ADD NEURONS
                </p>
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                gap: '12px',
              }}
            >
              <div className="glass-card" style={{ padding: '8px 14px', borderRadius: '8px' }}>
                <span className="font-mono-custom" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  NODES{' '}
                  <span style={{ color: '#00d4ff', fontWeight: 600 }}>{nodeCount}</span>
                </span>
              </div>
              <div className="glass-card" style={{ padding: '8px 14px', borderRadius: '8px' }}>
                <span className="font-mono-custom" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  SIGNALS{' '}
                  <span style={{ color: '#39ff14', fontWeight: 600 }}>{signalCount}</span>
                </span>
              </div>
              {training && (
                <div
                  className="glass-card"
                  style={{ padding: '8px 14px', borderRadius: '8px', borderColor: 'rgba(57,255,20,0.3)' }}
                >
                  <span className="font-mono-custom" style={{ fontSize: '0.7rem', color: '#39ff14' }}>
                    ● TRAINING
                  </span>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handleTrain}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '8px',
                border: `1.5px solid ${training ? '#39ff14' : 'rgba(57,255,20,0.3)'}`,
                background: training ? 'rgba(57,255,20,0.1)' : 'transparent',
                color: '#39ff14',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                transition: 'all 0.25s ease',
              }}
            >
              <Zap size={15} />
              {training ? 'Stop Training' : 'Start Training'}
            </button>

            <button
              onClick={handleShuffle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1.5px solid rgba(0,212,255,0.3)',
                background: 'transparent',
                color: '#00d4ff',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                transition: 'all 0.25s ease',
              }}
            >
              <Shuffle size={15} />
              Shuffle
            </button>

            <button
              onClick={handleClear}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,107,53,0.3)',
                background: 'transparent',
                color: '#ff6b35',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                transition: 'all 0.25s ease',
              }}
            >
              <Trash2 size={15} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
