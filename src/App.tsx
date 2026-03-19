import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import TechStack from './components/TeckStack'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const trailPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12
      trail.style.left = trailPos.current.x + 'px'
      trail.style.top = trailPos.current.y + 'px'
      raf = requestAnimationFrame(animate)
    }
    animate()

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, .bento-card, .social-link'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '24px'
        cursor.style.height = '24px'
        cursor.style.opacity = '0.6'
      })
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px'
        cursor.style.height = '12px'
        cursor.style.opacity = '1'
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-trail" ref={trailRef} />
      <div className="grid-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}