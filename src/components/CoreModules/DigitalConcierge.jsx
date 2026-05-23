import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Utensils, Bell, MessageCircle } from 'lucide-react'
import './DigitalConcierge.css'

gsap.registerPlugin(ScrollTrigger)

export default function DigitalConcierge() {
  const { t } = useTranslation()
  const container = useRef(null)
  const [orderSent, setOrderSent] = useState(false)

  const handleOrder = () => {
    setOrderSent(true)
    gsap.fromTo('.dc-toast', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out' })
    setTimeout(() => setOrderSent(false), 3000)
  }

  useGSAP(() => {
    gsap.from('.dc-menu-item', {
      scrollTrigger: { trigger: '.dc-section', start: 'top 80%' },
      scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)'
    })
  }, { scope: container })

  return (
    <section className="dc-section section-padding" id="concierge" ref={container}>
      <div className="container-custom">
        <div className="dc-layout">
          <div className="dc-text">
            <h2 className="section-title">{t("digitalConcierge.title")}</h2>
            <p className="dc-par">{t("digitalConcierge.description")}</p>
          </div>
          <div className="dc-visual">
            <div className="dc-phone-ui">
              <div className="dc-header-mock">
                <div>{t("digitalConcierge.guestServices")}</div>
                <div className="room-badge">{t("digitalConcierge.roomBadge")}</div>
              </div>
              <div className="dc-menu-grid">
                <div className="dc-menu-item" onClick={handleOrder}>
                  <div className="menu-icon"><Utensils size={24}/></div>
                  <div className="menu-title">{t("digitalConcierge.inRoomDining")}</div>
                </div>
                <div className="dc-menu-item" onClick={handleOrder}>
                  <div className="menu-icon"><Bell size={24}/></div>
                  <div className="menu-title">{t("digitalConcierge.requestTowels")}</div>
                </div>
              </div>
              {orderSent && (
                <div className="dc-toast">
                  <MessageCircle size={16}/> "{t("digitalConcierge.toastMessage")}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
