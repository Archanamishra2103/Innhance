import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './CTASection.css'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.cta-box', {
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%'
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: container })

  return (
    <section className="cta-section section-padding" ref={container}>
      <div className="container-custom">
        <div className="cta-box">
          <h2 className="cta-heading">
            Take control of your <br/> WhatsApp revenue.
          </h2>
          <p className="cta-par">
            Join the movement of forward-thinking hotels optimizing their guest journey with Innhance.
          </p>
          <div className="cta-actions">
            <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer ">
            <button className="btn-primary">Book a Demo Today</button>
            </a>
            <a href="tel:+919217566814" target="_blank" rel="noopener noreferrer ">
            <button className="btn-transparent">Contact Sales</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
