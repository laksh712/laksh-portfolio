import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Work',       href: '#work'       },
  { label: 'Stack',      href: '#tech'       },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-5"
        style={{
          background: 'rgba(5,5,5,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={scrollToTop}
          className="font-mono text-lg font-medium tracking-tight select-none no-underline"
          style={{ color: '#00F0FF', cursor: 'pointer' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ opacity: 0.75 }}
        >
          <span style={{ color: '#8B5CF6' }}>./</span>laksh.bhamare
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navLinks.map(({ label, href }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <a
                href={href}
                className="relative group text-sm font-medium no-underline transition-colors duration-200"
                style={{ color: '#94A3B8' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8')
                }
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: '#00F0FF' }}
                />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Hamburger button — animates to X when open */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer gap-0 p-0"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <motion.span
            className="block h-px w-6 origin-center"
            style={{ background: '#94A3B8' }}
            animate={menuOpen
              ? { rotate: 45, y: 1, background: '#00F0FF' }
              : { rotate: 0,  y: -3, background: '#94A3B8' }
            }
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-px w-6 origin-center"
            style={{ background: '#94A3B8' }}
            animate={menuOpen
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-6 origin-center"
            style={{ background: '#94A3B8' }}
            animate={menuOpen
              ? { rotate: -45, y: -1, background: '#00F0FF' }
              : { rotate: 0,   y:  3, background: '#94A3B8' }
            }
            transition={{ duration: 0.25 }}
          />
        </button>
      </motion.nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop — tap outside to close */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            {/* Menu panel — slides down from nav */}
            <motion.div
              className="fixed left-0 right-0 z-40 flex flex-col"
              style={{
                top: 73, // navbar height
                background: 'rgba(5,5,5,0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '8px 0 16px',
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="no-underline px-10 py-4 text-base font-medium flex items-center justify-between group"
                  style={{
                    color: '#94A3B8',
                    borderBottom: i < navLinks.length - 1
                      ? '1px solid rgba(255,255,255,0.05)'
                      : 'none',
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8')
                  }
                >
                  <span>{label}</span>
                  {/* Arrow indicator */}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="#00F0FF" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </motion.a>
              ))}

              {/* Footer row inside mobile menu */}
              <div className="px-10 pt-4 flex items-center gap-3">
                <span className="font-mono text-xs" style={{ color: '#475569' }}>
                  ./laksh.bhamare
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                />
                <span className="font-mono text-xs" style={{ color: '#00F0FF' }}>
                  v1.0.0
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}