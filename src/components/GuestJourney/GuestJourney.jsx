import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Hotel } from 'lucide-react'
import './GuestJourney.css'

gsap.registerPlugin(ScrollTrigger)

export default function GuestJourney() {
  const { t } = useTranslation()
  const container = useRef(null)
  const steps = t('guestJourney.steps', { returnObjects: true })

  useGSAP(() => {
    let mm = gsap.matchMedia()
    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray('.gj-step-card')
      const chatBubbles = gsap.utils.toArray('.gj-chat-group')
      gsap.set(chatBubbles.slice(1), { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: ".gj-container",
        start: "top 20%",
        end: `+=${panels.length * 400}`, 
        pin: ".gj-visual-side",
        anticipatePin: 1
      })
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel, start: "top center", end: "bottom center",
          onEnter: () => { gsap.to(panel, { opacity: 1, duration: 0.3 }); if (i > 0) gsap.to(chatBubbles[i - 1], { opacity: 0, y: -20, duration: 0.3 }); gsap.to(chatBubbles[i], { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }) },
          onEnterBack: () => { gsap.to(panel, { opacity: 1, duration: 0.3 }); if (i < panels.length - 1) gsap.to(chatBubbles[i + 1], { opacity: 0, y: 20, duration: 0.3 }); gsap.to(chatBubbles[i], { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }) },
          onLeave: () => { gsap.to(panel, { opacity: 0.3, duration: 0.3 }) },
          onLeaveBack: () => { gsap.to(panel, { opacity: 0.3, duration: 0.3 }) }
        })
      })
    })
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray('.gj-step-card').forEach(panel => {
        gsap.from(panel, { scrollTrigger: { trigger: panel, start: "top 80%" }, y: 30, opacity: 0, duration: 0.6 })
      })
    })
    return () => mm.revert()
  }, { scope: container })

  return (
    <section className="gj-section section-padding" id="journey" ref={container}>
      <div className="container-custom">
        <div className="gj-header">
          <h2 className="gj-title">
            {t("guestJourney.titleLine1")}
            <span className="text-lime-italic" style={{ display: 'block', marginTop: '12px' }}>{t("guestJourney.titleLine2")}</span>
          </h2>
        </div>
        <div className="gj-container">
          <div className="gj-text-side">
            {steps.map((step, idx) => (
              <div key={idx} className="gj-step-card">
                <div className="step-num">0{idx + 1}</div>
                <h3 className="step-head">{step.title}</h3>
                <p className="step-par">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="gj-visual-side">
            <div className="phone-wrapper">
              <div className="phone-hardware">
                <div className="phone-notch"></div>
                <div className="phone-top-bar">
                  <div className="phone-avatar"><Hotel size={18}/></div>
                  <div className="phone-contact">{t("guestJourney.innhanceAiBot")}</div>
                </div>
                <div className="phone-screen">
                  <div className="gj-chat-group group-0">
                    <div className="chat received">{t("guestJourney.chatStep0")}</div>
                  </div>
                  <div className="gj-chat-group group-1">
                    <div className="chat received">{t("guestJourney.chatStep0")}</div>
                    <div className="chat sent lime-sent">{t("guestJourney.chatStep1Reply")}</div>
                  </div>
                  <div className="gj-chat-group group-2">
                    <div className="chat received">{t("guestJourney.chatStep0")}</div>
                    <div className="chat sent lime-sent">{t("guestJourney.chatStep1Reply")}</div>
                    <div className="chat received">{t("guestJourney.chatStep2Guest")}</div>
                    <div className="chat sent teal-sent">{t("guestJourney.chatStep2Bot")}</div>
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
