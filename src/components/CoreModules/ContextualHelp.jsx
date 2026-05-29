import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Languages, MessageCircle, Info } from 'lucide-react'
import './ContextualHelp.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContextualHelp() {
  const { t } = useTranslation()
  const [lang, setLang] = useState('EN')
  const container = useRef(null)

  const langs = ['EN', 'HI', 'ES', 'AR', 'FR', 'DE']

  const toggleLang = () => {
    setLang(prev => {
      const idx = langs.indexOf(prev)
      return langs[(idx + 1) % langs.length]
    })
  }

  const getButtonText = () => {
    switch(lang) {
      case 'EN': return "Tap to change"
      case 'HI': return "बदलने के लिए टैप करें"
      case 'ES': return "Toca para cambiar"
      case 'AR': return "انقر للتغيير"
      case 'FR': return "Appuyez pour changer"
      case 'DE': return "Tippen zum Ändern"
      default: return "Tap to change"
    }
  }

  useGSAP(() => {
    gsap.from('.ctx-visual-box', {
      scrollTrigger: { trigger: container.current, start: 'top 80%' },
      scale: 0.9, opacity: 0, duration: 0.8, ease: 'power3.out'
    })
  }, { scope: container })

  return (
    <section className="ctx-section section-padding" id="contextual-help" ref={container}>
      <div className="container-custom">
        <div className="ctx-layout">
          <div className="ctx-visual">
            <div className="ctx-visual-box">
              <div className="ctx-phone-top">
                <button className="lang-toggle-btn" onClick={toggleLang}>
                  <Languages size={16}/> {getButtonText()}
                </button>
              </div>
              <div className="ctx-chat-area">
                <div className="faq-chip"><Info size={14}/> {t("contextualHelp.faqPetPolicy")}</div>
                <div className="mock-chat-row received mt-4">
                  <div className="mock-chat-bubble ctx-white" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
                    {t(`contextualHelp.question${lang}`)}
                  </div>
                </div>
                <div className="mock-chat-row sent mt-4">
                  <div className="mock-chat-bubble ctx-dark" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
                    {t(`contextualHelp.answer${lang}`)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ctx-text">
            <h2 className="section-title">
              {t("contextualHelp.titleLine1")} <br/> {t("contextualHelp.titleLine2")}
            </h2>
            <p className="ctx-par">{t("contextualHelp.description")}</p>
            <ul className="ctx-list">
              <li><MessageCircle size={18} className="ctx-icon"/> {t("contextualHelp.feature1")}</li>
              <li><MessageCircle size={18} className="ctx-icon"/> {t("contextualHelp.feature2")}</li>
              <li><MessageCircle size={18} className="ctx-icon"/> {t("contextualHelp.feature3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
