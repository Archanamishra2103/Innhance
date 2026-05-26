import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { Bot, Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import './Navbar.css'

export default function Navbar({ currentView, setCurrentView }) {
  const { t, i18n } = useTranslation()
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
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
          <img src="/assets/logo.webp" alt="Innhance Logo" className="logo-img" />
          <span className="logo-text">Innhance</span>
        </div>

        <ul className="navbar-links desktop-only">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); window.scrollTo(0,0); }} className={currentView === 'about' ? 'active-link' : ''}>
              {t("navbar.about")}
            </a>
          </li>
          <li><a href="#features" onClick={() => setCurrentView('home')}>{t("navbar.features")}</a></li>
          <li><a href="#analytics" onClick={() => setCurrentView('home')}>{t("navbar.analytics")}</a></li>
          <li><a href="#pricing" onClick={() => setCurrentView('home')}>{t("navbar.pricing")}</a></li>
        </ul>

        <div className="navbar-actions desktop-only">
          {i18n.language === 'ar' ? (
            <>
              <LanguageSwitcher />
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary">{t("navbar.bookDemo")}</button>
              </a>
              <a href="#" className="btn-life" onClick={(e) => { e.preventDefault(); setCurrentView('blog'); window.scrollTo(0,0); }}>{t("navbar.blog")}</a>
            </>
          ) : (
            <>
              <a href="#" className="btn-life" onClick={(e) => { e.preventDefault(); setCurrentView('blog'); window.scrollTo(0,0); }}>{t("navbar.blog")}</a>
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary">{t("navbar.bookDemo")}</button>
              </a>
              <LanguageSwitcher />
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overflow */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); setMobileMenuOpen(false); window.scrollTo(0,0); }}>{t("navbar.about")}</a>
            <a href="#features" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>{t("navbar.features")}</a>
            <a href="#analytics" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>{t("navbar.analytics")}</a>
            <a href="#pricing" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}>{t("navbar.pricing")}</a>
            <hr />
            {i18n.language === 'ar' ? (
              <>
                <LanguageSwitcher mobile={true} />
                <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer" className="w-full">
                  <button className="btn-primary w-full">{t("navbar.bookDemo")}</button>
                </a>
                <a href="#" className="btn-life mobile-life" onClick={(e) => { e.preventDefault(); setCurrentView('blog'); setMobileMenuOpen(false); window.scrollTo(0,0); }}>{t("navbar.blog")}</a>
              </>
            ) : (
              <>
                <a href="#" className="btn-life mobile-life" onClick={(e) => { e.preventDefault(); setCurrentView('blog'); setMobileMenuOpen(false); window.scrollTo(0,0); }}>{t("navbar.blog")}</a>
                <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer" className="w-full">
                  <button className="btn-primary w-full">{t("navbar.bookDemo")}</button>
                </a>
                <LanguageSwitcher mobile={true} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
