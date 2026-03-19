import { useState } from 'react'
import { motion } from 'framer-motion'

const contactInfo = [
  {
    label: 'Email',
    value: 'lakshbhamre01@gmail.com',
    href: 'mailto:lakshbhamre01@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 853 072 312',
    href: 'tel:+91853072312',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
      </svg>
    ),
  },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/laksh712',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/laksh-bhamare-965605202/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="relative z-10" style={{ padding: '100px 40px' }}>
      <motion.div
        className="max-w-2xl mx-auto rounded-3xl p-14 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            top: -200, right: -200, borderRadius: '50%',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
            bottom: -150, left: -100, borderRadius: '50%',
          }}
        />

        {/* Header */}
        <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: '#00F0FF' }}>
          Contact
        </p>
        <h2 className="font-bold mb-2" style={{ fontSize: 40, letterSpacing: '-1.5px' }}>
          Let's build something.
        </h2>
        <p className="text-base font-light mb-8" style={{ color: '#94A3B8', lineHeight: 1.7 }}>
          Have an interesting problem? I'd love to hear about it. Response within 24 hours.
        </p>

        {/* ── Contact Info Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto') || item.href.startsWith('tel') ? '_self' : '_blank'}
              rel="noreferrer"
              className="no-underline flex items-center gap-4 p-4 rounded-xl group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                borderColor: 'rgba(0,240,255,0.25)',
                background: 'rgba(0,240,255,0.04)',
                y: -2,
              }}
            >
              {/* Icon bubble */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{
                  background: 'rgba(0,240,255,0.08)',
                  color: '#00F0FF',
                }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-0.5"
                  style={{ color: '#475569' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-medium truncate transition-colors duration-200 group-hover:text-[#00F0FF]"
                  style={{ color: '#F8FAFC' }}
                >
                  {item.value}
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="flex-shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="#00F0FF" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </motion.a>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          className="mb-8"
          style={{ height: 1, background: 'rgba(255,255,255,0.06)' }}
        />

        {/* ── Form ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: '#94A3B8' }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3.5 text-sm outline-none rounded-lg transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#F8FAFC',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0,240,255,0.4)')}
              onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>
          <div>
            <label
              className="block font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: '#94A3B8' }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3.5 text-sm outline-none rounded-lg transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#F8FAFC',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0,240,255,0.4)')}
              onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block font-mono text-xs tracking-widest uppercase mb-2"
            style={{ color: '#94A3B8' }}
          >
            Subject
          </label>
          <input
            type="text"
            placeholder="What's this about?"
            className="w-full px-4 py-3.5 text-sm outline-none rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#F8FAFC',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(0,240,255,0.4)')}
            onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        </div>

        <div className="mb-6">
          <label
            className="block font-mono text-xs tracking-widest uppercase mb-2"
            style={{ color: '#94A3B8' }}
          >
            Message
          </label>
          <textarea
            placeholder="Tell me about your project..."
            rows={5}
            className="w-full px-4 py-3.5 text-sm outline-none rounded-lg resize-y"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#F8FAFC',
              fontFamily: 'Space Grotesk, sans-serif',
              minHeight: 120,
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(0,240,255,0.4)')}
            onBlur={(e)  => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        </div>

        {/* Submit button */}
        <motion.button
          className="w-full py-4 rounded-lg font-bold text-base text-black border-none cursor-pointer relative z-10"
          style={{
            background: submitted
              ? 'linear-gradient(135deg, #34D399, #10B981)'
              : 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
            boxShadow: '0 4px 24px rgba(0,240,255,0.2)',
            transition: 'box-shadow 0.2s',
          }}
          whileHover={{ y: -2, boxShadow: '0 8px 40px rgba(0,240,255,0.35)' }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 3000)
          }}
        >
          {submitted ? '✓ Message Sent!' : 'Send Message →'}
        </motion.button>

        {/* ── Social links ── */}
        <div
          className="flex gap-3 mt-8 pt-8 flex-wrap"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="social-link flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm no-underline"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94A3B8',
              }}
              whileHover={{
                borderColor: 'rgba(0,240,255,0.3)',
                color: '#00F0FF',
                background: 'rgba(0,240,255,0.04)',
              }}
            >
              {link.icon}
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}