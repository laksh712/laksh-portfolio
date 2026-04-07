import { motion } from 'framer-motion'

// ── Types ────────────────────────────────────────────────────────────────────
interface Experience {
  date: string
  role: string
  company: string
  desc: string
  skills: string[]
  accent: 'blue' | 'purple'
}

interface TimelineItemProps {
  exp: Experience
  index: number
}

// ── Data ─────────────────────────────────────────────────────────────────────
// const experiences: Experience[] = [
//   {
//     date: '2023 — Present',
//     role: 'Senior AI Engineer',
//     company: 'Anthropic — San Francisco, CA',
//     desc: 'Leading inference optimization systems. Reduced model serving costs 40% through custom quantization. Architected multi-region deployment for 99.99% uptime.',
//     skills: ['MLOps', 'CUDA', 'Triton', 'Distributed Systems'],
//     accent: 'blue',
//   },
//   {
//     date: '2021 — 2023',
//     role: 'ML Engineer II',
//     company: 'Google DeepMind — London, UK',
//     desc: 'Built production pipelines for large-scale LLM evaluation. Contributed to efficient attention research. Led team of 4 on RLHF infrastructure.',
//     skills: ['JAX', 'TPU', 'RLHF', 'Python'],
//     accent: 'purple',
//   },
//   {
//     date: '2019 — 2021',
//     role: 'Software Engineer',
//     company: 'Stripe — Dublin, Ireland',
//     desc: 'Fraud detection ML models processing $1T+ in payments annually. Improved catch rate 23% while reducing false positives.',
//     skills: ['XGBoost', 'Kafka', 'Go', 'Flink'],
//     accent: 'blue',
//   },
//   {
//     date: '2015 — 2019',
//     role: 'B.Sc. Computer Science & AI',
//     company: 'MIT — Cambridge, MA',
//     desc: 'Graduated with honors. Thesis on "Efficient Transformers for Long-Context Reasoning." Published 2 papers in NeurIPS.',
//     skills: ['Research', 'NLP', 'Deep Learning'],
//     accent: 'purple',
//   },
// ]

const experiences: Experience[] = [
  {
    date: '2024 — Present',
    role: 'Full Stack Developer',
    company: 'Sphinx Solutions Pvt. Ltd. — Pune, India',
    desc: 'Developing scalable backend systems using Spring Boot and React.js. Built REST APIs, real-time features with WebSockets, and secure authentication systems. Integrated AWS S3, implemented cron jobs, and contributed to CI/CD pipelines using Jenkins.',
    skills: ['Spring Boot', 'React.js', 'MySQL', 'WebSockets', 'AWS', 'Jenkins', 'System Design'],
    accent: 'blue',
  },
  {
    date: '2023 — 2024',
    role: 'PG-DAC (Advanced Computing)',
    company: 'CDAC ACTS — Pune',
    desc: 'Completed advanced training in software engineering, backend systems, and full stack development with hands-on project experience.',
    skills: ['Java', 'Data Structures', 'System Design', 'Web Development', 'C++'],
    accent: 'purple',
  },
  {
    date: '2019 — 2023',
    role: 'B.E. Computer Engineering',
    company: "Modern Education Society's College of Engineering — Pune",
    desc: 'Graduated with strong foundation in computer science, data structures, and software engineering principles.',
    skills: ['OOP', 'Algorithms', 'Databases', 'SDLC', 'Team Projects', 'AI/ML Basics'],
    accent: 'blue',
  },
]

// ── TimelineItem ──────────────────────────────────────────────────────────────
function TimelineItem({ exp, index }: TimelineItemProps) {
  const accentColor = exp.accent === 'blue' ? '#00F0FF' : '#8B5CF6'

  return (
    <motion.div
      className="relative pl-14 mb-12"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Pulse node */}
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 18,
          height: 18,
          left: 12,
          top: 6,
          border: `2px solid ${accentColor}`,
          background: '#050505',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: accentColor,
            boxShadow: `0 0 12px ${accentColor}`,
            animation: `nodePulse 2s ease-in-out infinite ${index * 0.3}s`,
          }}
        />
      </div>

      <p
        className="font-mono text-xs tracking-widest uppercase mb-1.5"
        style={{ color: accentColor }}
      >
        {exp.date}
      </p>

      <h3 className="text-lg font-bold mb-1" style={{ letterSpacing: '-0.3px' }}>
        {exp.role}
      </h3>

      <p className="text-sm font-medium mb-3" style={{ color: '#8B5CF6' }}>
        {exp.company}
      </p>

      <p className="text-sm leading-relaxed mb-3.5" style={{ color: '#94A3B8' }}>
        {exp.desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {exp.skills.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 font-mono"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              color: '#475569',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: scale(1);   opacity: 1;   }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </motion.div>
  )
}

// ── Experience section ────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" className="relative z-10" style={{ padding: '100px 40px' }}>
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
          Career
        </p>
        <h2
          className="font-bold"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px' }}
        >
          Where I've built.
        </h2>
        <p className="mt-3 text-base font-light" style={{ color: '#94A3B8' }}>
          Building scalable systems and real-world products.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute"
          style={{
            left: 20,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, #00F0FF, #8B5CF6, transparent)',
          }}
        />

        {experiences.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}