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
  { label: 'Java', abbr: 'Jv', style: { bg: 'rgba(255,87,34,0.1)', color: '#FF5722' } },
  { label: 'Spring Boot', abbr: 'SB', style: { bg: 'rgba(139,195,74,0.1)', color: '#8BC34A' } },
  { label: 'React', abbr: 'Re', style: { bg: 'rgba(97,218,251,0.1)', color: '#61DAFB' } },
  { label: 'TypeScript', abbr: 'TS', style: { bg: 'rgba(49,120,198,0.15)', color: '#3178C6' } },
  { label: 'Python', abbr: 'Py', style: { bg: 'rgba(255,212,59,0.1)', color: '#FFD43B' } },
  { label: 'MySQL', abbr: 'My', style: { bg: 'rgba(0,117,143,0.1)', color: '#00758F' } },
  { label: 'Node.js', abbr: 'Nd', style: { bg: 'rgba(104,160,99,0.1)', color: '#68A063' } },
  { label: 'Docker', abbr: '🐳', style: { bg: 'rgba(35,171,221,0.1)', color: '#23ABDD' } },
  { label: 'AWS', abbr: '☁', style: { bg: 'rgba(255,153,0,0.1)', color: '#FF9900' } },
  { label: 'Kubernetes', abbr: 'K8', style: { bg: 'rgba(50,108,229,0.1)', color: '#326CE5' } },
  { label: 'PostgreSQL', abbr: 'PG', style: { bg: 'rgba(50,103,145,0.1)', color: '#326791' } },
  { label: 'Redis', abbr: 'Rd', style: { bg: 'rgba(220,29,37,0.1)', color: '#DC1D25' } },
  { label: 'WebSockets', abbr: 'WS', style: { bg: 'rgba(0,240,255,0.1)', color: '#00F0FF' } },
  { label: 'Data Structures & Algorithms', abbr: 'DSA', style: { bg: 'rgba(185, 255, 34, 0.1)', color: '#FF5722' } },
]

const row2: TechItem[] = [
  { label: 'OpenAI API', abbr: 'AI', style: { bg: 'rgba(16,185,129,0.1)', color: '#10B981' } },
  { label: 'LangChain', abbr: 'LC', style: { bg: 'rgba(0,180,120,0.1)', color: '#00B478' } },
  { label: 'Vector DB (FAISS)', abbr: 'VD', style: { bg: 'rgba(168,85,247,0.1)', color: '#A855F7' } },
  { label: 'Jenkins', abbr: 'Jn', style: { bg: 'rgba(212,72,55,0.1)', color: '#D44837' } },
  { label: 'Prompt Engg', abbr: 'PE', style: { bg: 'rgba(251,146,60,0.1)', color: '#FB923C' } },
  { label: 'Cron Jobs', abbr: 'CJ', style: { bg: 'rgba(132,204,22,0.1)', color: '#84CC16' } },
  { label: 'Firebase', abbr: 'FB', style: { bg: 'rgba(255,202,40,0.1)', color: '#FFCA28' } },
  { label: 'Razorpay', abbr: 'Rz', style: { bg: 'rgba(2,132,199,0.1)', color: '#0284C7' } },
  { label: 'Google APIs', abbr: 'G', style: { bg: 'rgba(66,133,244,0.1)', color: '#4285F4' } },
  { label: 'Redux', abbr: 'Rx', style: { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6' } },
  { label: 'Kafka', abbr: 'Kf', style: { bg: 'rgba(250,80,30,0.1)', color: '#FA501E' } },
  { label: 'Next.js', abbr: 'Nx', style: { bg: 'rgba(255,255,255,0.06)', color: '#ffffff' } },
  { label: 'Git', abbr: 'Git', style: { bg: 'rgba(240,80,51,0.1)', color: '#F05033' } },
  { label: 'System Design', abbr: 'SD', style: { bg: 'rgba(51,153,255,0.1)', color: '#3399FF' } },
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