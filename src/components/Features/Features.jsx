import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageSquare, Globe, CalendarCheck, CreditCard, ShieldCheck, LineChart, ArrowUpRight } from 'lucide-react'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
  MessageSquare, Globe, CalendarCheck, CreditCard, ShieldCheck, LineChart
}
const iconKeys = ['MessageSquare', 'Globe', 'CalendarCheck', 'CreditCard', 'ShieldCheck', 'LineChart']

export default function Features() {
  const { t } = useTranslation()
  const container = useRef(null)
  const features = t('features.items', { returnObjects: true })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    gsap.to(card, { duration: 0.4, rotateX, rotateY, zIndex: 10, ease: "power2.out", transformPerspective: 1000 })
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { duration: 0.8, rotateX: 0, rotateY: 0, zIndex: 1, ease: "elastic.out(1, 0.3)" })
  }

  useGSAP(() => {
    const boxes = gsap.utils.toArray('.bento-box')
    // Reduced y offset to 30 to prevent cards from sliding 100px into the rows below them during scroll reveal
    gsap.set(boxes, { y: 30, opacity: 0, rotationX: 10, transformPerspective: 1000, zIndex: 1 })
    
    // Smooth internal icon floating animations (won't break grid)
    gsap.to('.gsap-icon-float', { y: -10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.gsap-icon-float-delayed', { y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
    
    // Slow, elegant floating animation on the entire card
    boxes.forEach((el, index) => {
      const floatVal = index % 2 === 0 ? -6 : 6;
      gsap.to(el, {
        y: floatVal,
        duration: 4 + (index % 3), // Very slow, premium duration (4s - 6s)
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.4,
        transformPerspective: 1000
      })
    })
    
    ScrollTrigger.batch(boxes, {
      start: "top 85%",
      onEnter: (elements) => {
        gsap.to(elements, { 
          opacity: 1, rotationX: 0, stagger: 0.15, duration: 0.8, ease: "power3.out"
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
            {t("features.titleLine1")} <br />
            <span className="text-muted">{t("features.titleLine2")}</span>
          </h2>
        </div>

        <div className="bento-grid">
          
          <div className="bento-wrapper bento-large">
            <div className="bento-box interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="bento-bg gradient-teal"></div>
              <div className="bento-content">
                <div className="bento-icon-wrapper">
                  {(() => { const Icon = iconMap[iconKeys[0]]; return <Icon size={72} strokeWidth={1.2} className="gsap-icon-float" style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }} /> })()}
                </div>
                <div className="bento-text">
                  <h3 className="bento-title">{features[0]?.title}</h3>
                  <p className="bento-desc">{features[0]?.description}</p>
                </div>
              </div>
              <div className="bento-visual">
                <div className="chat-bubble-mock received bounce-continuous">{t("features.chatBubbleReceived")}</div>
                <div className="chat-bubble-mock sent delay-bounce">{t("features.chatBubbleSent")}</div>
              </div>
            </div>
          </div>

          <div className="bento-wrapper bento-medium">
            <div className="bento-box interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="bento-bg gradient-lime"></div>
              <div className="bento-content dark-text">
                <div className="bento-top">
                  <div className="bento-icon-wrapper dark">
                    {(() => { const Icon = iconMap[iconKeys[1]]; return <Icon size={64} strokeWidth={1.2} className="gsap-icon-float-delayed" style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.15))" }} /> })()}
                  </div>
                  <button className="icon-btn"><ArrowUpRight size={24}/></button>
                </div>
                <div className="bento-text">
                  <h3 className="bento-title">{features[1]?.title}</h3>
                  <p className="bento-desc">{features[1]?.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-wrapper bento-medium">
            <div className="bento-box interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="bento-bg bg-white"></div>
              <div className="bento-content dark-text">
                <div className="bento-top">
                  <div className="bento-icon-wrapper lime">
                    {(() => { const Icon = iconMap[iconKeys[2]]; return <Icon size={40} /> })()}
                  </div>
                </div>
                <div className="bento-text">
                  <h3 className="bento-title">{features[2]?.title}</h3>
                  <p className="bento-desc">{features[2]?.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-wrapper bento-small">
            <div className="bento-box interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="bento-bg gradient-teal"></div>
              <div className="bento-content center">
                <div className="bento-icon-wrapper pulse-glow">
                  {(() => { const Icon = iconMap[iconKeys[4]]; return <Icon size={44} /> })()}
                </div>
                <div className="bento-text">
                  <h3 className="bento-title">{features[4]?.title}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-wrapper bento-small">
            <div className="bento-box interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="bento-bg gradient-lime"></div>
              <div className="bento-content center dark-text">
                <div className="bento-icon-wrapper dark pulse-glow-dark">
                  {(() => { const Icon = iconMap[iconKeys[3]]; return <Icon size={44} /> })()}
                </div>
                <div className="bento-text">
                  <h3 className="bento-title">{features[3]?.title}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-wrapper bento-wide">
            <div className="bento-box interactive-tilt" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div className="bento-bg bg-white"></div>
              <div className="bento-content dark-text content-row">
                <div className="bento-text-column">
                  <div className="bento-icon-wrapper lime">
                    {(() => { const Icon = iconMap[iconKeys[5]]; return <Icon size={44} /> })()}
                  </div>
                  <h3 className="bento-title mt-4">{features[5]?.title}</h3>
                  <p className="bento-desc">{features[5]?.description}</p>
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
      </div>
    </section>
  )
}
