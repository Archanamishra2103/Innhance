import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import data from '../../data/innhanceData.json'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const container = useRef(null)

  useGSAP(() => {
    // Parallax scrolling for quote block
    gsap.from('.marquee-track', {
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      xPercent: -15
    })
  }, { scope: container })

  return (
    <section className="testimonials-section section-padding" id="testimonials" ref={container}>
      
      {/* Decorative large text running in background */}
      <div className="bg-marquee">
        <div className="marquee-track">
          TESTIMONIALS • RESULTS • SUCCESS • REVIEWS • TESTIMONIALS • RESULTS
        </div>
      </div>

      <div className="container-custom relative-z">
        <div className="quote-giant-marks">"</div>
        <div className="testi-content-block">
          <h3 className="big-quote">
            {data.testimonials[0].quote}
          </h3>
          
          <div className="author-block">
            <div className="author-img-mock"></div>
            <div>
              <div className="author-name">{data.testimonials[0].author}</div>
              <div className="author-role">{data.testimonials[0].role}</div>
            </div>
          </div>
        </div>

        {/* Results Metrics */}
        <div className="results-metrics">
          {data.results.map((r, i) => (
            <div key={i} className="metric-box">
              <div className="metric-num">{r.metric}</div>
              <div className="metric-head">{r.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
