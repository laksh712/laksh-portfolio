import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────
type TagClass = 'blue' | 'green' | 'purple' | 'orange'

interface Project {
  id: string
  span: string
  tag: string
  tagClass: TagClass
  title: string
  desc: string
  tech: string[]
  link: string
}

interface BentoCardProps {
  project: Project
  delay: number
}

// ── Data ──────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 'a',
    span: 'col-span-12 md:col-span-6',
    tag: 'AI / ML',
    tagClass: 'blue',
    title: 'NeuralEdge Platform',
    desc: 'Real-time inference platform processing 10M+ requests/day with sub-50ms latency. Custom model serving on Kubernetes with auto-scaling.',
    tech: ['PyTorch', 'K8s', 'gRPC', 'CUDA'],
    link: '#',
  },
  {
    id: 'b',
    span: 'col-span-12 md:col-span-6',
    tag: 'Analytics',
    tagClass: 'green',
    title: 'DataStream Engine',
    desc: 'Distributed streaming analytics pipeline processing terabytes of event data with automated anomaly detection.',
    tech: ['Kafka', 'Flink', 'Spark'],
    link: '#',
  },
  {
    id: 'c',
    span: 'col-span-12 md:col-span-4',
    tag: 'LLM',
    tagClass: 'purple',
    title: 'ContextOS',
    desc: 'Intelligent context management for long-form conversations. 3× reduction in token costs.',
    tech: ['Python', 'LangChain'],
    link: '#',
  },
  {
    id: 'd',
    span: 'col-span-12 md:col-span-4',
    tag: 'API',
    tagClass: 'orange',
    title: 'VectorVault',
    desc: 'High-performance vector DB with semantic search. 100M+ embeddings, sub-10ms queries.',
    tech: ['Go', 'Rust'],
    link: '#',
  },
  {
    id: 'e',
    span: 'col-span-12 md:col-span-4',
    tag: 'OSS',
    tagClass: 'blue',
    title: 'Promptsmith',
    desc: 'Open-source prompt engineering toolkit. 4.2K GitHub stars.',
    tech: ['TypeScript'],
    link: '#',
  },
]

const tagColors: Record<TagClass, { background: string; color: string }> = {
  blue:   { background: 'rgba(0,240,255,0.1)',   color: '#00F0FF' },
  green:  { background: 'rgba(52,211,153,0.1)',  color: '#34D399' },
  purple: { background: 'rgba(139,92,246,0.1)',  color: '#A78BFA' },
  orange: { background: 'rgba(251,146,60,0.1)',  color: '#FB923C' },
}

// ── BentoCard ─────────────────────────────────────────────────────────────────
function BentoCard({ project, delay }: BentoCardProps) {
  return (
    <motion.div
      className={`bento-card ${project.span} rounded-2xl p-8 relative overflow-hidden cursor-pointer`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        scale: 1.01,
        borderColor: 'rgba(0,240,255,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,240,255,0.05)',
      }}
    >
      {/* Hover shimmer overlay */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.03), transparent 60%)',
        }}
      />

      {/* Tag */}
      <span
        className="inline-block px-2.5 py-1 rounded text-xs font-mono tracking-wider mb-4"
        style={tagColors[project.tagClass]}
      >
        {project.tag}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2" style={{ letterSpacing: '-0.3px' }}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#94A3B8' }}>
        {project.desc}
      </p>

      {/* Footer: tech pills + link */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 font-mono"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 4,
                color: '#475569',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          className="text-xs no-underline flex items-center gap-1 transition-all duration-200"
          style={{ color: '#00F0FF', letterSpacing: '0.5px' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
          }
        >
          View →
        </a>
      </div>
    </motion.div>
  )
}

// ── Work section ──────────────────────────────────────────────────────────────
export default function Work() {
  return (
    <section id="work" className="relative z-10" style={{ padding: '100px 40px' }}>
      {/* Header */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="font-mono text-xs tracking-widest mb-3 uppercase"
          style={{ color: '#00F0FF' }}
        >
          Selected Projects
        </p>
        <h2
          className="font-bold"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px' }}
        >
          Work that ships.
        </h2>
        <p className="mt-3 text-base font-light" style={{ color: '#94A3B8' }}>
          Production systems serving millions of requests daily.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-4 max-w-5xl mx-auto">
        {projects.map((p, i) => (
          <BentoCard key={p.id} project={p} delay={i * 0.08} />
        ))}
      </div>
    </section>
  )
}