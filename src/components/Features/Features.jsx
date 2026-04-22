import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageSquare, Globe, CalendarCheck, CreditCard, ShieldCheck, LineChart, ArrowUpRight } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
  MessageSquare, Globe, CalendarCheck, CreditCard, ShieldCheck, LineChart
}

export default function Features() {
  const container = useRef(null)
  const features = data.features;

  // 3D Tilt interaction
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Calculate rotation (-10 to 10 degrees max)
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, {
      duration: 0.4,
      rotateX,
      rotateY,
      ease: "power2.out",
      transformPerspective: 1000,
    })
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.8,
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.3)"
    })
  }

  useGSAP(() => {
    // Elegant floating animation applied automatically to components
    gsap.to('.bento-medium.float-1', { y: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.bento-small.float-2', { y: 15, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
    gsap.to('.bento-small.float-3', { y: 10, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 })

    const boxes = gsap.utils.toArray('.bento-box')
    gsap.set(boxes, { y: 100, opacity: 0, rotationX: 10 })

    ScrollTrigger.batch(boxes, {
      start: "top 85%",
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0, opacity: 1, rotationX: 0,
          stagger: 0.15, duration: 0.8, ease: "power3.out"
        })
      },
      once: true
    })
  }, { scope: container })

  return (
    <section className="features-section section-padding" id="features" ref={container}>
      <div className="container-custom">
        <div className="features-header">
          <h2 className="section-title">
            All the tools you need. <br />
            <span className="text-muted">None of the complexity.</span>
          </h2>
        </div>

        <div className="bento-grid">
          
          <div className="bento-box bento-large interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-bg gradient-teal"></div>
            <div className="bento-content">
              <div className="bento-icon-wrapper">
                {(() => { const Icon = iconMap[features[0].icon]; return <Icon size={32} /> })()}
              </div>
              <div className="bento-text">
                <h3 className="bento-title">{features[0].title}</h3>
                <p className="bento-desc">{features[0].description}</p>
              </div>
            </div>
            <div className="bento-visual">
              <div className="chat-bubble-mock received bounce-continuous">Are rooms available?</div>
              <div className="chat-bubble-mock sent delay-bounce">Yes! We have 2 rooms right now.</div>
            </div>
          </div>

          <div className="bento-box bento-medium float-1 interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-bg gradient-lime"></div>
            <div className="bento-content dark-text">
              <div className="bento-top">
                <div className="bento-icon-wrapper dark">
                  {(() => { const Icon = iconMap[features[1].icon]; return <Icon size={24} /> })()}
                </div>
                <button className="icon-btn"><ArrowUpRight size={20}/></button>
              </div>
              <div className="bento-text">
                <h3 className="bento-title">{features[1].title}</h3>
                <p className="bento-desc">{features[1].description}</p>
              </div>
            </div>
          </div>

          <div className="bento-box bento-medium interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-bg bg-white"></div>
            <div className="bento-content dark-text">
              <div className="bento-top">
                <div className="bento-icon-wrapper lime">
                  {(() => { const Icon = iconMap[features[2].icon]; return <Icon size={24} /> })()}
                </div>
              </div>
              <div className="bento-text">
                <h3 className="bento-title">{features[2].title}</h3>
                <p className="bento-desc">{features[2].description}</p>
              </div>
            </div>
          </div>

          <div className="bento-box bento-small float-2 interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-bg gradient-teal"></div>
            <div className="bento-content center">
              <div className="bento-icon-wrapper pulse-glow">
                {(() => { const Icon = iconMap[features[4].icon]; return <Icon size={28} /> })()}
              </div>
              <div className="bento-text">
                <h3 className="bento-title">{features[4].title}</h3>
              </div>
            </div>
          </div>

          <div className="bento-box bento-small float-3 interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-bg gradient-lime"></div>
            <div className="bento-content center dark-text">
              <div className="bento-icon-wrapper dark pulse-glow-dark">
                {(() => { const Icon = iconMap[features[3].icon]; return <Icon size={28} /> })()}
              </div>
              <div className="bento-text">
                <h3 className="bento-title">{features[3].title}</h3>
              </div>
            </div>
          </div>

          <div className="bento-box bento-wide interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="bento-bg bg-white"></div>
            <div className="bento-content dark-text content-row">
              <div className="bento-text-column">
                <div className="bento-icon-wrapper lime">
                  {(() => { const Icon = iconMap[features[5].icon]; return <Icon size={28} /> })()}
                </div>
                <h3 className="bento-title mt-4">{features[5].title}</h3>
                <p className="bento-desc">{features[5].description}</p>
              </div>
              <div className="bento-visual-column">
                <div className="mini-chart bar-chart-anim">
                  <div className="bar height-1"></div>
                  <div className="bar height-2"></div>
                  <div className="bar height-3"></div>
                  <div className="bar height-4 lime-bar pulse"></div>
                  <div className="bar height-2"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
