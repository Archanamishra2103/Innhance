import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { BarChart3, TrendingUp, MoonStar, Filter } from 'lucide-react'
import './AnalyticsPreview.css'

gsap.registerPlugin(ScrollTrigger)

export default function AnalyticsPreview() {
  const { t } = useTranslation()
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.dash-mockup-layer', {
      scrollTrigger: { trigger: '.analytics-section', start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: 100, ease: 'none'
    })
    gsap.from('.silence-tax-card', {
      scrollTrigger: { trigger: '.analytics-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      y: -50, x: -30, rotation: -2, ease: 'none'
    })
    ScrollTrigger.create({
      trigger: ".dash-mockup-layer", start: "top 70%",
      onEnter: () => {
        gsap.to('.bar-fill', { height: (i, el) => el.getAttribute('data-height'), duration: 1.5, ease: 'power4.out', stagger: 0.1 })
        gsap.to('.funnel-layer', { width: (i, el) => el.getAttribute('data-width'), duration: 1.5, ease: 'power4.out', stagger: 0.1, delay: 0.5 })
      },
      once: true
    })
  }, { scope: container })

  return (
    <section className="analytics-section section-padding" id="analytics" ref={container}>
      <div className="container-custom">
        <div className="analytics-layout">
          <div className="analytics-text">
            <h2 className="section-title text-white">
              {t("analyticsPreview.titleLine1")} <br/>
              <span className="text-lime-italic">{t("analyticsPreview.titleLine2")}</span>
            </h2>
            <p className="analytics-par">{t("analyticsPreview.description")}</p>
            <a href="https://innhance-hotels-dashboard.vercel.app/login" target="_blank" rel="noopener noreferrer ">
            <button className="btn-primary mt-8">{t("analyticsPreview.viewDemoDashboard")}</button>
            </a>
          </div>
          <div className="analytics-visual">
            <div className="dash-mockup-layer">
              <div className="dash-header">
                <div className="dash-title"><Filter size={20}/> {t("analyticsPreview.conversionFunnel")}</div>
              </div>
              <div className="funnel-chart-container">
                <div className="funnel-row">
                  <div className="funnel-label">{t("analyticsPreview.totalInquiries")}</div>
                  <div className="funnel-bar-bg"><div className="funnel-layer teal-fill" data-width="100%"></div></div>
                  <div className="funnel-val">1,248</div>
                </div>
                <div className="funnel-row">
                  <div className="funnel-label">{t("analyticsPreview.aiHandled")}</div>
                  <div className="funnel-bar-bg"><div className="funnel-layer teal-fill" data-width="85%"></div></div>
                  <div className="funnel-val">1,060</div>
                </div>
                <div className="funnel-row">
                  <div className="funnel-label">{t("analyticsPreview.bookings")}</div>
                  <div className="funnel-bar-bg"><div className="funnel-layer lime-fill" data-width="38%"></div></div>
                  <div className="funnel-val">474</div>
                </div>
              </div>
            </div>
            <div className="silence-tax-card">
              <div className="st-head"><MoonStar size={18}/> {t("analyticsPreview.silenceTaxTitle")}</div>
              <div className="st-body">
                <div className="st-stat">
                  <div className="st-label">{t("analyticsPreview.recoveredNightLeads")}</div>
                  <div className="st-val text-lime">{t("analyticsPreview.recoveredValue")}</div>
                </div>
                <div className="st-chart-mock"><div className="st-line"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
