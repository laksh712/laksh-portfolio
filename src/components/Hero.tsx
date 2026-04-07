import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const phrases: string[] = [
  'Backend Engineer',
  'Full Stack Developer',
  'AI-Integrated Systems Builder',
  'Building Scalable Systems',
  'Passionate about AI and Distributed Computing'
]

// ── Typewriter ────────────────────────────────────────────────────────────────
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
        if (cIdx + 1 === current.length) setTimeout(() => setDeleting(true), 1800)
        else setCIdx(c => c + 1)
      } else {
        setText(current.slice(0, cIdx - 1))
        if (cIdx - 1 === 0) { setDeleting(false); setPIdx(p => (p + 1) % phrases.length); setCIdx(0) }
        else setCIdx(c => c - 1)
      }
    }, deleting ? 60 : 100)
    return () => clearTimeout(timeout)
  }, [cIdx, deleting, pIdx, phrases])

  return text
}

// ── Neo Developer Canvas ──────────────────────────────────────────────────────
function NeoDevCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const glitch = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, t = 0

    const BLUE = '#00F0FF'
    const PURPLE = '#8B5CF6'

    function resize() {
      const r = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      W = r.width; H = r.height
    }
    resize()
    window.addEventListener('resize', resize)

    function onMove(e: MouseEvent) {
      const r = canvas.getBoundingClientRect()
      mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
      mouse.current.y = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    function onLeave() { mouse.current.x = 0; mouse.current.y = 0 }
    function onClick() { glitch.current = 22 }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('click', onClick)

    // ── drawing helpers ───────────────────────────────────────────────────────
    function neonLine(x1: number, y1: number, x2: number, y2: number, col: string, alpha = 1, w = 1) {
      ctx.save()
      ctx.globalAlpha = alpha * 0.15; ctx.strokeStyle = col; ctx.lineWidth = w * 6
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      ctx.globalAlpha = alpha * 0.45; ctx.lineWidth = w * 2
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      ctx.globalAlpha = alpha; ctx.lineWidth = w * 0.8
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      ctx.restore()
    }

    function glowDot(x: number, y: number, r: number, col: string, alpha = 1) {
      ctx.save()
      ctx.globalAlpha = alpha * 0.1; ctx.fillStyle = col
      ctx.beginPath(); ctx.arc(x, y, r * 4, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = alpha * 0.28
      ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = alpha; ctx.fillStyle = col
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    }

    function hexagon(x: number, y: number, r: number, fill: string | null, stroke: string | null, sw = 1) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 180 * (60 * i - 30)
        if (i === 0) {
          ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
        } else {
          ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a))
        }
      }
      ctx.closePath()
      if (fill) { ctx.fillStyle = fill; ctx.fill() }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw; ctx.stroke() }
    }

    // ── draw functions ────────────────────────────────────────────────────────
    function drawGrid() {
      ctx.save(); ctx.globalAlpha = 0.055; ctx.strokeStyle = BLUE; ctx.lineWidth = 0.5
      const gs = 38
      for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
      ctx.restore()
    }

    function drawHexBg(cx: number, cy: number) {
      ctx.save()
      const pos: number[][] = [[-190, cy - 35], [190, cy - 25], [-165, cy + 65], [175, cy + 60], [-95, cy - 115], [100, cy - 110], [0, cy - 138]]
      pos.forEach(([dx, dy], i) => {
        const pulse = 0.25 + Math.sin(t * 1.4 + i * 0.9) * 0.12
        hexagon(cx + dx, dy, 26, 'rgba(0,240,255,0.025)', `rgba(0,240,255,${pulse})`, 0.6)
        glowDot(cx + dx, dy, 2.5, i % 2 === 0 ? BLUE : PURPLE, 0.45 + Math.sin(t + i) * 0.25)
      })
      ctx.restore()
    }

    function drawOrbitals(cx: number, cy: number) {
      ctx.save()
      const rings = [
        { r: 95, speed: 0.35, col: BLUE, tilt: 0.35 },
        { r: 72, speed: -0.6, col: PURPLE, tilt: 0.28 },
        { r: 50, speed: 1.1, col: BLUE, tilt: 0.42 },
      ]
      rings.forEach((ring, i) => {
        const a = t * ring.speed + i * 1.2
        ctx.globalAlpha = 0.15; ctx.strokeStyle = ring.col; ctx.lineWidth = 0.7
        ctx.setLineDash([4, 10])
        ctx.beginPath(); ctx.ellipse(cx, cy, ring.r, ring.r * ring.tilt, i * 0.3, 0, Math.PI * 2); ctx.stroke()
        ctx.setLineDash([])
        const nx = cx + Math.cos(a) * ring.r
        const ny = cy + Math.sin(a) * ring.r * ring.tilt
        glowDot(nx, ny, 3.5, ring.col, 0.9)
        neonLine(cx, cy, nx, ny, ring.col, 0.15, 0.5)
      })
      ctx.restore()
    }

    function drawMonitor(cx: number, cy: number) {
      const mx2 = mouse.current.x * 12, my2 = mouse.current.y * 6
      const ox = cx + mx2, oy = cy + my2
      const mw = 120, mh = 80
      ctx.save()
      ctx.globalAlpha = 0.9; ctx.strokeStyle = BLUE; ctx.lineWidth = 1
      ctx.beginPath(); ctx.roundRect(ox - mw / 2, oy - mh, mw, mh, 4)
      ctx.fillStyle = 'rgba(0,4,14,0.96)'; ctx.fill()
      ctx.globalAlpha = 0.22; ctx.lineWidth = 3.5
      ctx.beginPath(); ctx.roundRect(ox - mw / 2 - 2, oy - mh - 2, mw + 4, mh + 4, 5); ctx.stroke()
      ctx.globalAlpha = 0.85; ctx.lineWidth = 1
      ctx.beginPath(); ctx.roundRect(ox - mw / 2, oy - mh, mw, mh, 4); ctx.stroke()

      const g2 = glitch.current
      // const lines = [
      //   { text: `> init_server()`, col: BLUE },
      //   { text: `  API running`, col: '#A78BFA' },
      //   { text: `  JWT Auth ✓ verified`, col: '#34D399' },
      //   { text: `  AI API integrated ✓`, col: '#A78BFA' },
      //   { text: `  training 96.2%`, col: '#34D399' },
      //   { text: `  [████████░░] `, col: BLUE },
      //   { text: `  deploy ✓ live`, col: BLUE },
      // ]
      const lines = [
        { text: `> init_server()`, col: '#A78BFA' },
        { text: `  API running`, col: BLUE },
        { text: `  Response time: 120ms`, col: '#A78BFA' },
        { text: `  [████████░░] 96.2%`, col: '#34D399' },
        { text: `  deploy ✓ live`, col: BLUE },
      ]
      
      lines.forEach((l, i) => {
        ctx.font = `${7.5}px 'JetBrains Mono',monospace`
        ctx.fillStyle = l.col
        ctx.globalAlpha = g2 > 0 ? 0.5 + Math.random() * 0.5 : 0.88
        ctx.fillText(
          l.text,
          ox - mw / 2 + 7 + (g2 > 0 ? (Math.random() - .5) * g2 * 0.4 : 0),
          oy - mh + 14 + i * 13 + (g2 > 0 ? (Math.random() - .5) * 3 : 0)
        )
      })
      if (Math.sin(t * 4) > 0) {
        ctx.fillStyle = BLUE; ctx.globalAlpha = 0.85
        ctx.fillRect(ox - mw / 2 + 7, oy - mh + 14 + 5 * 13, 5, 8)
      }
      ctx.strokeStyle = BLUE; ctx.lineWidth = 0.7; ctx.globalAlpha = 0.45
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, oy + 14); ctx.lineTo(ox - mw * 0.22, oy + 14); ctx.stroke()
      ctx.restore()
      return { ox, oy, mh }
    }

    function drawDev(cx: number, cy: number) {
      const mx2 = mouse.current.x * 5, my2 = mouse.current.y * 3
      const ox = cx + mx2, oy = cy + my2
      const bob = Math.sin(t * 1.2) * 2.5
      ctx.save()
      glowDot(ox, oy - 64, 15, PURPLE, 0.85)
      ctx.strokeStyle = PURPLE; ctx.lineWidth = 1.3
      ctx.beginPath(); ctx.arc(ox, oy - 64, 15, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeStyle = 'rgba(139,92,246,0.75)'; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.moveTo(ox, oy - 49 + bob); ctx.lineTo(ox, oy - 8 + bob); ctx.stroke()
      const arm = Math.sin(t * 1.6) * 10
      ctx.beginPath(); ctx.moveTo(ox, oy - 36 + bob); ctx.lineTo(ox - 24, oy - 20 + bob + arm); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(ox, oy - 36 + bob); ctx.lineTo(ox + 24, oy - 20 + bob - arm); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(ox, oy - 8 + bob); ctx.lineTo(ox - 11, oy + 22 + bob); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(ox, oy - 8 + bob); ctx.lineTo(ox + 11, oy + 22 + bob); ctx.stroke()
      ctx.restore()
      return { ox, oy }
    }

    function drawDesk(cx: number, cy: number) {
      const mx2 = mouse.current.x * 6, my2 = mouse.current.y * 3
      const ox = cx + mx2, oy = cy + my2
      ctx.save(); ctx.globalAlpha = 0.6
      ctx.strokeStyle = BLUE; ctx.lineWidth = 0.9
      const dw = 170, dd = 55, dh = 11
      const pts = [
        [ox - dw / 2, oy], [ox + dw / 2, oy],
        [ox + dw / 2 + dd * 0.4, oy + dh + dd * 0.45], [ox - dw / 2 + dd * 0.4, oy + dh + dd * 0.45]
      ]
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]))
      ctx.closePath()
      ctx.fillStyle = 'rgba(0,240,255,0.03)'; ctx.fill(); ctx.stroke()
      ctx.restore()
    }

    function drawStreams(cx: number, cy: number) {
      ctx.save()
      const streams = [
        { sx: cx - 130, sy: cy - 75, ex: cx - 58, ey: cy - 35, col: BLUE },
        { sx: cx + 130, sy: cy - 65, ex: cx + 62, ey: cy - 30, col: PURPLE },
        { sx: cx - 90, sy: cy + 65, ex: cx - 32, ey: cy + 10, col: BLUE },
      ]
      streams.forEach((s, i) => {
        const prog = (t * 0.38 + i * 0.65) % 1
        const px = s.sx + (s.ex - s.sx) * prog, py = s.sy + (s.ey - s.sy) * prog
        neonLine(s.sx, s.sy, s.ex, s.ey, s.col, 0.22, 0.6)
        glowDot(px, py, 2.8, s.col, 0.9)
        ctx.font = '8px monospace'; ctx.fillStyle = s.col
        ctx.globalAlpha = 0.38 + Math.sin(t * 3 + i) * 0.18
        ctx.fillText(['API', 'AUTH', '[AI]'][i], s.sx - 8, s.sy - 7)
      })
      ctx.restore()
    }

    function drawFloatingCode(cx: number, cy: number) {
      ctx.save()
      const lines = [
        // { s: 'import torch', x: cx - 225, y: cy - 118, col: BLUE },
        // { s: '∇loss=0.0032', x: cx + 148, y: cy - 128, col: PURPLE },
        // { s: 'cuda:GPU_0', x: cx - 205, y: cy + 92, col: BLUE },
        // { s: '<Tensor[512]>', x: cx + 152, y: cy + 82, col: '#34D399' },
        { s: 'REST API /v1/users', x: cx - 225, y: cy - 118, col: BLUE },
        { s: 'DSA ✓', x: cx + 148, y: cy - 128, col: PURPLE },
        { s: 'Cron Job Active', x: cx - 205, y: cy + 92, col: BLUE },
        { s: 'AI Response 120ms', x: cx + 152, y: cy + 82, col: '#34D399' },
      ]
      const g = glitch.current
      lines.forEach((l, i) => {
        ctx.globalAlpha = 0.35 + Math.sin(t * 0.75 + i * 1.3) * 0.18 + (g > 0 ? Math.random() * 0.3 : 0)
        ctx.font = '8.5px monospace'; ctx.fillStyle = l.col
        ctx.fillText(
          l.s,
          l.x + (g > 0 ? (Math.random() - .5) * g * 0.4 : 0),
          l.y + Math.sin(t * 0.55 + i) * 4 + (g > 0 ? (Math.random() - .5) * 5 : 0)
        )
      })
      ctx.restore()
    }

    function drawMouseAura(cx: number, cy: number) {
      const { x, y } = mouse.current
      if (Math.abs(x) < 0.01 && Math.abs(y) < 0.01) return
      const ex = cx + x * 90, ey = cy + y * 45
      ctx.save()
        ;[30, 20, 10].forEach((r, i) => {
          ctx.globalAlpha = [0.06, 0.1, 0.18][i]
          ctx.strokeStyle = i === 1 ? PURPLE : BLUE; ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.arc(ex, ey, r, 0, Math.PI * 2); ctx.stroke()
        })
      glowDot(ex, ey, 3, BLUE, 0.75)
      ctx.restore()
    }

    // ── main loop ─────────────────────────────────────────────────────────────
    function frame() {
      t += 0.016
      if (glitch.current > 0) glitch.current--

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, W, H)

      const cx = W / 2, cy = H / 2 - 5

      drawGrid()
      drawHexBg(cx, cy)
      drawOrbitals(cx, cy)
      drawFloatingCode(cx, cy)
      drawStreams(cx, cy)
      drawDesk(cx, cy + 65)
      drawMonitor(cx - 20, cy + 22)
      drawDev(cx + 55, cy + 44)
      drawMouseAura(cx, cy)

      neonLine(cx - 85, cy - 22, cx - 20, cy + 22, BLUE, 0.3, 0.7)
      neonLine(cx + 85, cy - 18, cx - 20, cy + 22, PURPLE, 0.22, 0.7)

      // glitch scanlines
      if (glitch.current > 0) {
        ctx.save(); ctx.globalAlpha = 0.07 * (glitch.current / 22)
        ctx.fillStyle = BLUE
        for (let i = 0; i < 4; i++) {
          const gy = Math.random() * H, gh = 1.5 + Math.random() * 7
          ctx.fillRect(0, gy, W, gh)
        }
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, margin: '0 auto 8px' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: 320, borderRadius: 16, cursor: 'crosshair' }}
      />
      <div style={{
        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
        color: 'rgba(0,240,255,0.4)', letterSpacing: '2px', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        INTERACT · EXPLORE SYSTEM
      </div>
    </div>
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
      <motion.div style={{
        y: orb1Y, position: 'absolute', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        top: -200, right: -100, filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none',
      }} />
      <motion.div style={{
        y: orb2Y, position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
        bottom: -150, left: -100, filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full text-center">

        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-xs font-mono tracking-widest"
          style={{ border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#00F0FF' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF', animation: 'badgePulse 2s ease-in-out infinite' }}
          />
          Turning complex ideas into production-ready systems
        </motion.div>

        {/* ── 3D Neo Dev Canvas replaces static AiCore SVG ── */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <NeoDevCanvas />
        </motion.div>

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

        <motion.p
          className="mb-8 font-light uppercase"
          style={{ fontSize: 'clamp(13px,2.5vw,22px)', color: '#94A3B8', letterSpacing: '3px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          <span style={{ color: '#00F0FF', fontWeight: 500 }}>{text}</span>
          <span style={{ color: '#00F0FF', animation: 'blink 1s step-end infinite' }}>|</span>
        </motion.p>

        <motion.p
          className="text-base leading-relaxed font-light mx-auto mb-10"
          style={{ color: '#94A3B8', maxWidth: 540 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        >
          Designing scalable backend systems and modern web applications using Spring Boot and React.
          Integrating AI-driven features to build smarter, real-world products with clean architecture and high performance.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        >
          <a href="#work"
            className="no-underline px-8 py-3.5 rounded-md font-bold text-sm tracking-wide text-black transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#00F0FF,#8B5CF6)', boxShadow: '0 0 30px rgba(0,240,255,0.25)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 40px rgba(0,240,255,0.4)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(0,240,255,0.25)')}
          >View My Work</a>
          <a href="#contact"
            className="no-underline px-8 py-3.5 rounded-md text-sm font-medium text-white transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.4)'; el.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.background = 'transparent' }}
          >Get In Touch</a>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 pb-10 pt-8"
        style={{ color: '#475569' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span style={{ fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,#00F0FF,transparent)', animation: 'scrollLine 1.5s ease-in-out infinite' }} />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollLine { 0%{opacity:0;transform:scaleY(0)} 50%{opacity:1;transform:scaleY(1)} 100%{opacity:0;transform:scaleY(1)} }
        @keyframes badgePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
      `}</style>
    </section>
  )
}