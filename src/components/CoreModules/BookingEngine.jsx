import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { QrCode, CreditCard, Wallet, Percent, CircleCheck } from 'lucide-react'
import ROICalculator from './ROICalculator'
import './BookingEngine.css'

gsap.registerPlugin(ScrollTrigger)

export default function BookingEngine() {
  const { t } = useTranslation()
  const container = useRef(null)

  useGSAP(() => {
    gsap.to('.commission-badge', { scale: 1.05, repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut' })
  }, { scope: container })

  return (
    <section className="booking-section section-padding" id="booking-engine" ref={container}>
      <div className="booking-bg-accent"></div>
      <div className="container-custom">
        <div className="booking-layout">
          <div className="booking-text">
            <h2 className="section-title">
              {t("bookingEngine.titleLine1")} <br/> {t("bookingEngine.titleLine2")}
            </h2>
            <p className="booking-par">{t("bookingEngine.description")}</p>
            <div className="commission-badge">
              <Percent size={24}/>
              <span>{t("bookingEngine.commissionBadge")}</span>
            </div>
            <div className="payment-methods">
              <div className="pay-method"><Wallet size={20}/> {t("bookingEngine.payUPI")}</div>
              <div className="pay-method"><CreditCard size={20}/> {t("bookingEngine.payCards")}</div>
              <div className="pay-method"><QrCode size={20}/> {t("bookingEngine.payQR")}</div>
            </div>
          </div>
          <div className="booking-visual">
            <ROICalculator />
          </div>
        </div>
      </div>
    </section>
  )
}
