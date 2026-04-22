import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { BarChart3, TrendingUp, MoonStar, Filter } from 'lucide-react'
import './AnalyticsPreview.css'

gsap.registerPlugin(ScrollTrigger)

export default function AnalyticsPreview() {
  const container = useRef(null)

  useGSAP(() => {
    // Parallax effect on the dashboard pieces
    gsap.from('.dash-mockup-layer', {
      scrollTrigger: { trigger: '.analytics-section', start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: 100, ease: 'none'
    })

    gsap.from('.silence-tax-card', {
      scrollTrigger: { trigger: '.analytics-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      y: -50, x: -30, rotation: -2, ease: 'none'
    })

    // Fill bars animation
    ScrollTrigger.create({
      trigger: ".dash-mockup-layer",
      start: "top 70%",
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
              Stop guessing. <br/>
              <span className="text-lime-italic">Start optimizing.</span>
            </h2>
            <p className="analytics-par">
              Our single, unified dashboard gives you deep insights into guest intent, 
              response efficiency, and direct booking conversion rates. Discover exactly how much revenue you're losing to the "Silence Tax" (nighttime drop-offs).
            </p>
            <button className="btn-primary mt-8">View Live Demo Dashboard</button>
          </div>

          <div className="analytics-visual">
            <div className="dash-mockup-layer">
              <div className="dash-header">
                <div className="dash-title"><Filter size={20}/> Conversion Funnel</div>
              </div>
              
              <div className="funnel-chart-container">
                <div className="funnel-row">
                  <div className="funnel-label">Total Inquiries</div>
                  <div className="funnel-bar-bg"><div className="funnel-layer teal-fill" data-width="100%"></div></div>
                  <div className="funnel-val">1,248</div>
                </div>
                <div className="funnel-row">
                  <div className="funnel-label">AI Handled</div>
                  <div className="funnel-bar-bg"><div className="funnel-layer teal-fill" data-width="85%"></div></div>
                  <div className="funnel-val">1,060</div>
                </div>
                <div className="funnel-row">
                  <div className="funnel-label">Bookings</div>
                  <div className="funnel-bar-bg"><div className="funnel-layer lime-fill" data-width="38%"></div></div>
                  <div className="funnel-val">474</div>
                </div>
              </div>
            </div>

            {/* Silence Tax Floating Card */}
            <div className="silence-tax-card">
              <div className="st-head">
                <MoonStar size={18}/> The Silence Tax (12AM - 6AM)
              </div>
              <div className="st-body">
                <div className="st-stat">
                  <div className="st-label">Recovered Night Leads</div>
                  <div className="st-val text-lime">+ ₹1.4L</div>
                </div>
                <div className="st-chart-mock">
                  <div className="st-line"></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
