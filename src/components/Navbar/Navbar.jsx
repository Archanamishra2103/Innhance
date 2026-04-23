import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Bot, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ currentView, setCurrentView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (mobileMenuOpen) return
      
      const currentScrollY = window.scrollY
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        gsap.to(navRef.current, { yPercent: -120, duration: 0.4, ease: 'power2.inOut' })
      } else {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: 'power2.inOut' })
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  const handleNavClick = (view, e) => {
    if (e) e.preventDefault()
    setCurrentView(view)
    setMobileMenuOpen(false)
    window.scrollTo(0,0)
  }

  return (
    <div className="navbar-wrapper">
      <nav ref={navRef} className="navbar-capsule">
        <div className="navbar-logo" onClick={(e) => handleNavClick('home', e)}>
          <img src="/assets/logo.jpeg" alt="Innhance Logo" className="logo-img" />
          <span className="logo-text">Innhance</span>
        </div>

        <ul className="navbar-links desktop-only">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); window.scrollTo(0,0); }} className={currentView === 'about' ? 'active-link' : ''}>
              About
            </a>
          </li>
          <li><a href="#features" onClick={() => setCurrentView('home')}>Features</a></li>
          <li><a href="#analytics" onClick={() => setCurrentView('home')}>Analytics</a></li>
          <li><a href="#pricing" onClick={() => setCurrentView('home')}>Pricing</a></li>
        </ul>

        <div className="navbar-actions desktop-only">
          <a href="https://wa.link/jkc1du" className="btn-life" onClick={(e) => { e.preventDefault(); setCurrentView('life'); window.scrollTo(0,0); }}>Life at Innhance</a>
          <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
          <button className="btn-primary">Book Demo</button>
          </a>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overflow */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); setMobileMenuOpen(false); window.scrollTo(0,0); }}>About</a>
            <a href="#features" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>Features</a>
            <a href="#analytics" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>Analytics</a>
            <a href="#pricing" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>Pricing</a>
            <hr />
            <a href="#" className="btn-life mobile-life" onClick={(e) => { e.preventDefault(); setCurrentView('life'); setMobileMenuOpen(false); window.scrollTo(0,0); }}>Life at Innhance</a>
            <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer" className="w-full">
              <button className="btn-primary w-full">Book Demo</button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
