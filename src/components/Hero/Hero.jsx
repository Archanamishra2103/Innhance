import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Bot, MessageCircle, BarChart3, Star, Zap } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './Hero.css'
import GuestJourney from '../GuestJourney/GuestJourney'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const container = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

    tl.from('.hero-badge-pill', { y: 30, opacity: 0, delay: 0.3 })
      .from('.hero-title-line', { y: 40, opacity: 0, stagger: 0.12 }, "-=0.8")
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 }, "-=0.6")
      .from('.hero-buttons', { y: 20, opacity: 0 }, "-=0.8")
      .from('.hero-mockup-wrapper', { y: 100, opacity: 0, scale: 0.98 }, "-=0.9")
      .from('.floater', { y: 50, opacity: 0, stagger: 0.2, scale: 0.8 }, "-=0.8")

    gsap.to('.floater-1', { y: -18, rotation: 4, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.floater-2', { y: 16, rotation: -4, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.floater-3', { y: -14, x: 8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    gsap.to('.hero-mockup-wrapper', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 80,
      scale: 1.03,
      rotationX: 4
    })

    gsap.to('.hero-bg-accent', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      yPercent: 25,
      scale: 1.08
    })

  }, { scope: container })

  return (
    <section className="hero-section" id="hero" ref={container}>
      
      {/* Background */}
      <div className="hero-bg-elements">
        <div className="hero-bg-accent teal-glow"></div>
        <div className="hero-bg-accent lime-glow"></div>
        <div className="bg-grid-overlay"></div>
      </div>

      <div className="container-custom hero-content">
        
        {/* Floaters */}
        <div className="floater floater-1"><MessageCircle size={22}/> Auto-Replies</div>
        <div className="floater floater-2"><Zap size={22}/> 0% Limits</div>
        <div className="floater floater-3"><Star size={22}/> AI Trained</div>

        <div className="hero-text-block">
          
          <div className="hero-badge-pill">
            <Bot size={16} className="badge-icon" />
            <span>{data.hero.badges[0].text}</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-title-line">Turn</span>
            <span className="hero-title-line">
              WhatsApp <span className="text-accent">Chats</span>
            </span>
            <span className="hero-title-line">
              Into <span className="hero-badge-highlight">Hotel Bookings</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            {data.hero.subheadline}
          </p>

          {/* ✅ FIXED BUTTON STRUCTURE */}
          <div className="hero-buttons">
            <a href="#journey" className="btn-primary btn-large">
              Get Started <ArrowRight size={18} />
            </a>

            <a 
              href="https://wa.link/jkc1du" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-dark btn-large"
            >
              Book a Demo
            </a>
          </div>

          {/* ✅ NEW TRUST SIGNALS */}
          <div className="hero-trust-signals">
            <span>No credit card</span>
            <span>Setup in 5 min</span>
            <span>Built for hotels</span>
          </div>

        </div>

        {/* Mockup */}
        <div className="hero-mockup-wrapper">
          <div className="hero-mockup-window">

            <div className="hero-window-top">
              <div className="win-dot red"></div>
              <div className="win-dot yellow"></div>
              <div className="win-dot green"></div>
              <div className="win-title">Innhance AI</div>
            </div>
            
            <div className="hero-window-body">

              <div className="mock-sidebar">
                <div className="mock-nav-item active">
                  <MessageCircle size={16}/> Messages
                </div>
                <div className="mock-nav-item">
                  <BarChart3 size={16}/> Metrics
                </div>
              </div>
              
              <div className="mock-main-view">

                <div className="mock-chat-row received">
                  <div className="mock-chat-avatar user">U</div>
                  <div className="mock-chat-bubble">
                    Is the Deluxe Room available for Dec 24?
                  </div>
                </div>

                <div className="mock-chat-row sent">
                  <div className="mock-chat-avatar bot">
                    <Bot size={14}/>
                  </div>
                  <div className="mock-chat-bubble lime">
                    Yes! The Deluxe Room is available. Rate is ₹8,999/night.
                  </div>
                </div>

                <div className="mock-chat-row sent">
                  <div className="mock-chat-avatar empty"></div>
                  <div className="mock-chat-bubble dark">
                    Payment link attached: <span>Pay Now</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}