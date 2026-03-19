import { motion } from 'framer-motion'

// Map label → actual section id in the DOM
const navLinks = [
  { label: 'Work',       href: '#work'      },
  { label: 'Stack',      href: '#tech'      }, // section id is "tech" not "stack"
  { label: 'Experience', href: '#experience'},
  { label: 'Contact',    href: '#contact'   },
] as const

export default function Navbar() {

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-5"
      style={{
        background: 'rgba(5,5,5,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo — click scrolls back to top */}
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
              {/* Animated underline */}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: '#00F0FF' }}
              />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="flex md:hidden flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
        aria-label="Open menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-px w-6"
            style={{ background: '#94A3B8' }}
          />
        ))}
      </button>
    </motion.nav>
  )
}