import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Languages, MessageCircle, Info } from 'lucide-react'
import './ContextualHelp.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContextualHelp() {
  const [lang, setLang] = useState('EN')
  const container = useRef(null)

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'HI' : 'EN')
  }

  useGSAP(() => {
    // Basic reveal
    gsap.from('.ctx-visual-box', {
      scrollTrigger: {
        trigger: '.ctx-section',
        start: 'top 80%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
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
                  <Languages size={16}/> {lang === 'EN' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें (EN)'}
                </button>
              </div>

              <div className="ctx-chat-area">
                <div className="faq-chip"><Info size={14}/> Pet Policy</div>
                <div className="mock-chat-row received mt-4">
                  <div className="mock-chat-bubble ctx-white">
                    {lang === 'EN' ? 'Do you allow pets?' : 'क्या आप पालतू जानवरों को अनुमति देते हैं?'}
                  </div>
                </div>
                <div className="mock-chat-row sent mt-4">
                  <div className="mock-chat-bubble ctx-dark">
                    {lang === 'EN' 
                    ? 'Yes! We are a pet-friendly hotel. A nominal fee of ₹500/night applies. We even provide pet beds!' 
                    : 'हाँ! हमारा होटल पालतू जानवरों के अनुकूल है। ₹500/रात का मामूली शुल्क लागू होता है। हम पालतू जानवरों के लिए बिस्तर भी प्रदान करते हैं!'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ctx-text">
            <h2 className="section-title">
              Speaks the language <br/> of your guests.
            </h2>
            <p className="ctx-par">
              Don't lose a booking to a language barrier. Innhance's Contextual AI recognizes 40+ languages instantly and replies with culturally aware context—from FAQs about pet policies to complete room bookings.
            </p>
            <ul className="ctx-list">
              <li><MessageCircle size={18} className="ctx-icon"/> Dynamic intent recognition</li>
              <li><MessageCircle size={18} className="ctx-icon"/> 40+ Global Indian & Int'l Languages</li>
              <li><MessageCircle size={18} className="ctx-icon"/> Intelligent FAQ predefined databases</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
