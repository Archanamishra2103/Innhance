import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  const { t } = useTranslation()
  const container = useRef(null)

  useGSAP(() => {
    // Hero animation
    gsap.from('.privacy-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    })

    // Content sections fade in on scroll
    const sections = gsap.utils.toArray('.privacy-section')
    sections.forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
    })

    // Floating icons animation
    gsap.to('.floating-icon', {
      y: -15,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.2
    })
  }, { scope: container })

  return (
    <div className="privacy-page-wrapper" ref={container}>
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="privacy-bg-glow"></div>
        <div className="container-custom privacy-hero-content">
          <div className="privacy-badge">
            <Shield size={16} />
            <span>{t("privacy.badgeText")}</span>
          </div>
          <h1 className="privacy-title">{t("privacy.title")}</h1>
          <p className="privacy-subtitle">
            {t("privacy.subtitle")}
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="privacy-content-wrapper section-padding">
        <div className="container-custom">
          <div className="privacy-content-grid">
            
            {/* Sidebar (Optional decoration/navigation) */}
            <div className="privacy-sidebar desktop-only">
              <div className="sidebar-sticky">
                <div className="sidebar-icon-box floating-icon">
                  <Lock size={32} />
                </div>
                <div className="sidebar-icon-box floating-icon" style={{ animationDelay: '0.5s' }}>
                  <Eye size={32} />
                </div>
                <div className="sidebar-icon-box floating-icon" style={{ animationDelay: '1s' }}>
                  <CheckCircle2 size={32} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="privacy-main">
              
              <div className="privacy-section">
                <h2>{t("privacy.sections.collect.title")}</h2>
                <p>{t("privacy.sections.collect.intro")}</p>
                <ul className="privacy-list">
                  {(() => {
                    const items = t("privacy.sections.collect.items", { returnObjects: true });
                    return Array.isArray(items) ? items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    )) : null;
                  })()}
                </ul>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.use.title")}</h2>
                <p>{t("privacy.sections.use.intro")}</p>
                <ul className="privacy-list">
                  {(() => {
                    const items = t("privacy.sections.use.items", { returnObjects: true });
                    return Array.isArray(items) ? items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    )) : null;
                  })()}
                </ul>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.communication.title")}</h2>
                <p>{t("privacy.sections.communication.text")}</p>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.security.title")}</h2>
                <p>{t("privacy.sections.security.text")}</p>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.thirdParty.title")}</h2>
                <p>{t("privacy.sections.thirdParty.text")}</p>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.cookies.title")}</h2>
                <p>{t("privacy.sections.cookies.text")}</p>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.rights.title")}</h2>
                <p>{t("privacy.sections.rights.text")}</p>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.updates.title")}</h2>
                <p>{t("privacy.sections.updates.text")}</p>
              </div>

              <div className="privacy-section">
                <h2>{t("privacy.sections.contact.title")}</h2>
                <p>{t("privacy.sections.contact.text")}</p>
                <p className="privacy-date">{t("privacy.lastUpdated")}</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
