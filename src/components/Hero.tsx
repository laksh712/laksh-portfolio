import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const phrases: string[] = [
  'AI Engineer',
  'ML Systems Architect',
  'Open Source Builder',
  'Deep Learning Researcher',
]

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(phrases: string[]): string {
  const [text, setText] = useState('')
  const [pIdx, setPIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [cIdx, setCIdx] = useState(0)

  useEffect(() => {
    const current = phrases[pIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, cIdx + 1))
        if (cIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCIdx((c) => c + 1)
        }
      } else {
        setText(current.slice(0, cIdx - 1))
        if (cIdx - 1 === 0) {
          setDeleting(false)
          setPIdx((p) => (p + 1) % phrases.length)
          setCIdx(0)
        } else {
          setCIdx((c) => c - 1)
        }
      }
    }, deleting ? 60 : 100)
    return () => clearTimeout(timeout)
  }, [cIdx, deleting, pIdx, phrases])

  return text
}

// ── AI Core SVG ──────────────────────────────────────────────────────────────
function AiCore() {
  return (
    <svg width="260" height="260" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="140" cy="140" r="120" stroke="rgba(0,240,255,0.06)" strokeWidth="1" />
      <circle cx="140" cy="140" r="100" stroke="rgba(0,240,255,0.08)" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="140" cy="140" r="80"  stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
      <circle cx="140" cy="140" r="60"  stroke="rgba(0,240,255,0.1)"   strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="140" cy="140" r="110" stroke="rgba(0,240,255,0.2)" strokeWidth="1" strokeDasharray="40 200" filter="url(#glow)">
        <animateTransform attributeName="transform" type="rotate" from="0 140 140" to="360 140 140" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="140" r="90" stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="20 100" filter="url(#glow)">
        <animateTransform attributeName="transform" type="rotate" from="360 140 140" to="0 140 140" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="140" r="40" fill="url(#cg)" stroke="rgba(0,240,255,0.3)" strokeWidth="1" filter="url(#glow)" />
      <circle cx="140" cy="140" r="6" fill="#00F0FF" filter="url(#glow)">
        <animate attributeName="r" values="6;9;6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="20" r="4" fill="rgba(0,240,255,0.6)" filter="url(#glow)">
        <animateTransform attributeName="transform" type="rotate" from="0 140 140" to="360 140 140" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="140" r="3" fill="rgba(139,92,246,0.8)" filter="url(#glow)">
        <animateTransform attributeName="transform" type="rotate" from="120 140 140" to="480 140 140" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const text = useTypewriter(phrases)
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 600], [0, 180])
  const orb2Y = useTransform(scrollY, [0, 600], [0, -120])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px' }}
    >
      {/* Parallax orb 1 */}
      <motion.div style={{
        y: orb1Y, position: 'absolute', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        top: -200, right: -100, filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Parallax orb 2 */}
      <motion.div style={{
        y: orb2Y, position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
        bottom: -150, left: -100, filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* ── Content — flex-1 so it fills space above scroll hint ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full text-center">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-xs font-mono tracking-widest"
          style={{ border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#00F0FF' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
            background: '#00F0FF', boxShadow: '0 0 8px #00F0FF',
            animation: 'badgePulse 2s ease-in-out infinite',
          }} />
          Available for new opportunities
        </motion.div>

        {/* AI Core */}
        <motion.div className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AiCore />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-bold leading-none mb-4"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-3px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Laksh Bhamare
        </motion.h1>

        {/* Typewriter */}
        <motion.p
          className="mb-8 font-light uppercase"
          style={{ fontSize: 'clamp(13px, 2.5vw, 22px)', color: '#94A3B8', letterSpacing: '3px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <span style={{ color: '#00F0FF', fontWeight: 500 }}>{text}</span>
          <span style={{ color: '#00F0FF', animation: 'blink 1s step-end infinite' }}>|</span>
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base leading-relaxed font-light mx-auto mb-10"
          style={{ color: '#94A3B8', maxWidth: 540 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Building AI systems at the intersection of machine learning, distributed
          computing, and human-centered design. Turning complex problems into
          elegant, scalable solutions.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <a
            href="#work"
            className="no-underline px-8 py-3.5 rounded-md font-bold text-sm tracking-wide text-black transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)', boxShadow: '0 0 30px rgba(0,240,255,0.25)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 40px rgba(0,240,255,0.4)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(0,240,255,0.25)')}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="no-underline px-8 py-3.5 rounded-md text-sm font-medium text-white transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.4)'
              el.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.15)'
              el.style.background = 'transparent'
            }}
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* ── Scroll hint — in normal flow BELOW the content, never overlaps ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 pb-10 pt-8"
        style={{ color: '#475569' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span style={{
          fontSize: 10, letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 36,
          background: 'linear-gradient(to bottom, #00F0FF, transparent)',
          animation: 'scrollLine 1.5s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scrollLine {
          0%   { opacity: 0; transform: scaleY(0); }
          50%  { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(1); }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  )
}