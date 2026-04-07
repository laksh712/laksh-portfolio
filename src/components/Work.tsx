import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────────────────────
type TagClass = 'blue' | 'green' | 'purple' | 'orange' | 'teal'

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

// ── Real Projects from Resume ─────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 'a',
    span: 'col-span-12 md:col-span-7',
    tag: 'IoT / Full Stack',
    tagClass: 'blue',
    title: 'Just Breathe® — Air Purifier Management',
    desc: 'Admin panel for monitoring IoT-based air purifier stations across enterprise campuses. Real-time air quality via WebSockets, JWT auth, AWS S3 integration. Deployed at airports & corporate campuses, aligned with EU/CPCB/ASHRAE standards.',
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'AWS', 'WebSockets'],
    link: '/case-study/just-breathe.html'
  },
  {
    id: 'b',
    span: 'col-span-12 md:col-span-5',
    tag: 'Frontend',
    tagClass: 'green',
    title: 'Sarwa — Hyper-local Delivery Platform',
    desc: '10,000+ Android downloads. Customer web app + admin panel with Google Maps, Razorpay, real-time delivery tracking. 5,000+ products, 200+ brands.',
    tech: ['Next.js', 'React.js', 'Google Maps API', 'Razorpay'],
    link: 'https://sarwa.shop',
  },
  {
    id: 'c',
    span: 'col-span-12 md:col-span-4',
    tag: 'AI / Full Stack',
    tagClass: 'purple',
    title: 'NiyukJobs — AI Job Platform',
    desc: 'AI-powered job matching by skills, experience & location. Dynamic resume builder, SSR optimized, email auth.',
    tech: ['Next.js', 'AI Recommendation', 'REST APIs'],
    link: 'https://niyukjobs.ai/',
  },
  {
    id: 'd',
    span: 'col-span-12 md:col-span-4',
    tag: 'Backend / Safety',
    tagClass: 'orange',
    title: 'SaferStops — Driver Safety Platform',
    desc: 'Truck driver safety platform across South Africa. Backend APIs, admin panel, route tracking, reward systems & training modules.',
    tech: ['Nest.js', 'React.js', 'Node.js', 'REST APIs'],
    link: '#',
  },
  {
    id: 'e',
    span: 'col-span-12 md:col-span-4',
    tag: 'Frontend',
    tagClass: 'teal',
    title: 'LOL — Love Organised Life',
    desc: 'Lifestyle management app — tasks, events, reminders & wishlists. Google Calendar sync, multi-method OAuth login.',
    tech: ['React.js', 'Google Calendar API', 'OAuth', 'Redux'],
    link: 'https://app.mylolapp.com/login',
  },
]

const tagColors: Record<TagClass, { background: string; color: string }> = {
  blue: { background: 'rgba(0,240,255,0.1)', color: '#00F0FF' },
  green: { background: 'rgba(52,211,153,0.1)', color: '#34D399' },
  purple: { background: 'rgba(139,92,246,0.1)', color: '#A78BFA' },
  orange: { background: 'rgba(251,146,60,0.1)', color: '#FB923C' },
  teal: { background: 'rgba(20,184,166,0.1)', color: '#2DD4BF' },
}

// ── BentoCard ─────────────────────────────────────────────────────────────────
function BentoCard({ project, delay }: BentoCardProps) {
  const isExternal = project.link.startsWith('http')

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
      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.03), transparent 60%)' }}
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

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 font-mono"
              style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, color: '#475569' }}
            >
              {t}
            </span>
          ))}
        </div>

        {project.link !== '#' && (
          <a
            href={project.link}
            target={isExternal ? '_blank' : '_blank'} 
            rel="noopener noreferrer"
            className="text-xs no-underline flex items-center gap-1 transition-all duration-200"
            style={{ color: '#00F0FF', letterSpacing: '0.5px' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          >
            {isExternal ? 'Live →' : 'Case Study →'}
          </a>
        )}
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
        <p className="font-mono text-xs tracking-widest mb-3 uppercase" style={{ color: '#00F0FF' }}>
          Selected Projects
        </p>
        <h2 className="font-bold" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-2px' }}>
          Work that ships.
        </h2>
        <p className="mt-3 text-base font-light" style={{ color: '#94A3B8' }}>
          Production systems used by real people, at scale.
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