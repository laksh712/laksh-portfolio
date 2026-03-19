import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChipStyle {
  bg: string
  color: string
}

interface TechItem {
  label: string
  abbr: string
  style: ChipStyle
}

interface ChipProps {
  label: string
  abbr: string
  style: ChipStyle
}

interface MarqueeRowProps {
  items: TechItem[]
  reverse: boolean
}

// ── Data ──────────────────────────────────────────────────────────────────────
const row1: TechItem[] = [
  { label: 'React',      abbr: 'Re', style: { bg: 'rgba(97,218,251,0.1)',  color: '#61DAFB' } },
  { label: 'TypeScript', abbr: 'TS', style: { bg: 'rgba(49,120,198,0.15)', color: '#3178C6' } },
  { label: 'Python',     abbr: 'Py', style: { bg: 'rgba(255,212,59,0.1)',  color: '#FFD43B' } },
  { label: 'Node.js',    abbr: 'Nd', style: { bg: 'rgba(104,160,99,0.1)',  color: '#68A063' } },
  { label: 'Go',         abbr: 'Go', style: { bg: 'rgba(0,172,215,0.1)',   color: '#00ACD7' } },
  { label: 'Rust',       abbr: 'Rs', style: { bg: 'rgba(206,103,60,0.1)',  color: '#CE673C' } },
  { label: 'TensorFlow', abbr: 'TF', style: { bg: 'rgba(255,144,13,0.1)',  color: '#FF900D' } },
  { label: 'Docker',     abbr: '🐳', style: { bg: 'rgba(35,171,221,0.1)',  color: '#23ABDD' } },
  { label: 'AWS',        abbr: '☁',  style: { bg: 'rgba(255,153,0,0.1)',   color: '#FF9900' } },
  { label: 'Kubernetes', abbr: 'K8', style: { bg: 'rgba(50,108,229,0.1)',  color: '#326CE5' } },
  { label: 'PostgreSQL', abbr: 'PG', style: { bg: 'rgba(50,103,145,0.1)',  color: '#326791' } },
  { label: 'Redis',      abbr: 'Rd', style: { bg: 'rgba(220,29,37,0.1)',   color: '#DC1D25' } },
]

const row2: TechItem[] = [
  { label: 'PyTorch',    abbr: 'PT', style: { bg: 'rgba(238,76,44,0.1)',   color: '#EE4C2C' } },
  { label: 'LangChain',  abbr: 'LC', style: { bg: 'rgba(0,180,120,0.1)',   color: '#00B478' } },
  { label: 'Vertex AI',  abbr: 'Vt', style: { bg: 'rgba(66,133,244,0.1)',  color: '#4285F4' } },
  { label: 'GraphQL',    abbr: 'GQ', style: { bg: 'rgba(229,53,171,0.1)',  color: '#E535AB' } },
  { label: 'Kafka',      abbr: 'Kf', style: { bg: 'rgba(250,80,30,0.1)',   color: '#FA501E' } },
  { label: 'dbt',        abbr: 'db', style: { bg: 'rgba(255,100,60,0.1)',  color: '#FF643C' } },
  { label: 'Spark',      abbr: 'Sp', style: { bg: 'rgba(228,103,48,0.1)',  color: '#E46730' } },
  { label: 'Terraform',  abbr: 'Tf', style: { bg: 'rgba(94,56,214,0.1)',   color: '#5E38D6' } },
  { label: 'Next.js',    abbr: 'Nx', style: { bg: 'rgba(255,255,255,0.06)',color: '#ffffff' } },
  { label: 'Flask',      abbr: 'Fl', style: { bg: 'rgba(255,100,50,0.1)',  color: '#FF6432' } },
]

// ── Chip ──────────────────────────────────────────────────────────────────────
function Chip({ label, abbr, style }: ChipProps) {
  return (
    <div
      className="flex items-center gap-2.5 px-5 py-3 rounded-xl whitespace-nowrap text-sm font-medium"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#F8FAFC',
      }}
    >
      <span
        className="w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs"
        style={{ background: style.bg, color: style.color }}
      >
        {abbr}
      </span>
      {label}
    </div>
  )
}

// ── MarqueeRow ────────────────────────────────────────────────────────────────
function MarqueeRow({ items, reverse }: MarqueeRowProps) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-wrapper">
      <div
        style={{
          display: 'flex',
          gap: 16,
          width: 'max-content',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${reverse ? '30s' : '25s'} linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <Chip key={i} label={item.label} abbr={item.abbr} style={item.style} />
        ))}
      </div>

      <style>{`
        @keyframes marquee         { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
      `}</style>
    </div>
  )
}

// ── TechStack section ─────────────────────────────────────────────────────────
export default function TechStack() {
  return (
    <section id="tech" className="relative z-10" style={{ padding: '80px 0' }}>
      <motion.div
        className="px-10 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="font-mono text-xs tracking-widest mb-3 uppercase"
          style={{ color: '#00F0FF' }}
        >
          Technologies
        </p>
        <h2
          className="font-bold"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px' }}
        >
          Built with precision.
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>
    </section>
  )
}