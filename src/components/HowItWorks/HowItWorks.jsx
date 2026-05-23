import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HowItWorks.css'

gsap.registerPlugin(ScrollTrigger)

const icons = ['📱', '🤖', '✅']

export default function HowItWorks() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const steps = t('howItWorks.steps', { returnObjects: true })

  useGSAP(() => {
    gsap.fromTo('.how-it-works-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: '.how-it-works-header', start: 'top 80%', toggleActions: 'play none none reverse' } });
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.steps-grid', start: 'top 75%', toggleActions: 'play none none reverse' } });
    tl.fromTo('.connector-line', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' })
      .fromTo('.step-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' });
  }, { scope: containerRef });

  return (
    <section className="how-it-works section-padding" id="how-it-works" ref={containerRef}>
      <div className="container">
        <div className="how-it-works-header">
          <div className="section-label">{t("howItWorks.sectionLabel")}</div>
          <h2 className="section-heading">{t("howItWorks.heading")}</h2>
          <p className="section-subheading">{t("howItWorks.subheading")}</p>
        </div>
        <div className="steps-grid">
          <div className="connector-line" style={{ position: 'absolute', top: '40px', left: '16.66%', right: '16.66%', height: '2px', background: 'linear-gradient(90deg, var(--color-green), rgb(240, 237, 255), var(--color-green))', zIndex: 0 }} />
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{idx + 1}</div>
              <div className="step-image-container"></div>
              <span className="step-icon">{icons[idx]}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
