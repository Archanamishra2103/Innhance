import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HowItWorks.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '1',
    icon: '📱',
    image: 'URL_FOR_IMAGE_1',
    title: 'Guest Messages You',
    description: 'A potential guest messages your hotel on WhatsApp, asking about rooms, availability, or pricing.'
  },
  {
    number: '2',
    icon: '🤖',
    image: 'URL_FOR_IMAGE_2',
    title: 'Innhance AI Replies',
    description: 'AI instantly checks availability, prices, and answers in the guest\'s language — Hindi, Tamil, English, or any of 15+ supported languages.'
  },
  {
    number: '3',
    icon: '✅',
    image: 'URL_FOR_IMAGE_3',
    title: 'Booking Confirmed',
    description: 'Guest pays via UPI or card, system updates your calendar, and your hotel gets a notification. All automatic.'
  }
]

export default function HowItWorks() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Header reveal
    gsap.fromTo('.how-it-works-header', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: '.how-it-works-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.steps-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.connector-line',
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }
    ).fromTo('.step-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  }, { scope: containerRef });

  return (
    <section className="how-it-works section-padding" id="how-it-works" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div className="how-it-works-header">
          <div className="section-label">How It Works</div>
          <h2 className="section-heading">Three Steps to Automation</h2>
          <p className="section-subheading">
            From inquiry to payment, Innhance handles the entire booking journey on WhatsApp — automatically.
          </p>
        </div>

        {/* Steps */}
        <div className="steps-grid">
          <div className="connector-line" style={{ position: 'absolute', top: '40px', left: '16.66%', right: '16.66%', height: '2px', background: 'linear-gradient(90deg, var(--color-green), rgb(240, 237, 255), var(--color-green))', zIndex: 0 }} />
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card"
            >
              <div className="step-number">{step.number}</div>
              <div className="step-image-container">
                 {/* <img src={step.image} alt={step.title} /> */}
              </div>
              <span className="step-icon">{step.icon}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
