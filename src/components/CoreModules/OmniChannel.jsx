import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageCircle, Camera, MessageSquareText } from 'lucide-react'
import './OmniChannel.css'

gsap.registerPlugin(ScrollTrigger)

export default function OmniChannel() {
  const { t } = useTranslation()
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.inbox-row', {
      scrollTrigger: { trigger: container.current, start: 'top 70%' },
      x: -50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out'
    })
    gsap.from('.omni-chat-ui', {
      scrollTrigger: { trigger: container.current, start: 'top 60%' },
      y: 50, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power4.out', delay: 0.3
    })
  }, { scope: container })

  return (
    <section className="omni-section section-padding" id="omnichannel" ref={container}>
      <div className="container-custom">
        <div className="omni-header">
          <h2 className="section-title">
            {t("omniChannel.titleLine1")}<br/>
            <span className="text-muted">{t("omniChannel.titleLine2")}</span>
          </h2>
          <div className="omni-channel-logos">
            <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
              <div className="omni-logo-circle whatsapp" title="WhatsApp"><MessageCircle size={28}/></div>
            </a>
            <a href="https://www.instagram.com/innhance.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <div className="omni-logo-circle ig" title="Instagram"><Camera size={28}/></div>
            </a>
            <a href="https://www.linkedin.com/company/innhanceai/" target="_blank" rel="noopener noreferrer">
              <div className="omni-logo-circle linkedin" title="LinkedIn">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.3v-1.1h-2.5v7.8h2.5v-4.2c0-1 .5-2 1.5-2 1 0 1 .8 1 1.8v4.4h2.5M8.1 18.5V10.7H5.6v7.8h2.5M6.8 9.5c.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4z"/></svg>
              </div>
            </a>
          </div>
        </div>

        <div className="omni-layout">
            <div className="omni-sidebar">
              <div className="omni-sidebar-head">{t("omniChannel.unifiedInbox")}</div>
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
                <div className="inbox-row active">
                  <div className="channel-icon whatsapp"><MessageCircle size={18}/></div>
                  <div className="inbox-text">
                    <div className="guest-name">{t("omniChannel.guestName1")}</div>
                    <div className="guest-msg">{t("omniChannel.guestMsg1")}</div>
                  </div>
                  <div className="inbox-time">{t("omniChannel.time1")}</div>
                </div>
              </a>
              <a href="https://www.instagram.com/innhance.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                <div className="inbox-row">
                  <div className="channel-icon ig"><Camera size={18}/></div>
                  <div className="inbox-text">
                    <div className="guest-name">{t("omniChannel.guestName2")}</div>
                    <div className="guest-msg">{t("omniChannel.guestMsg2")}</div>
                  </div>
                  <div className="inbox-time">{t("omniChannel.time2")}</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/company/innhanceai/" target="_blank" rel="noopener noreferrer">
                <div className="inbox-row">
                  <div className="channel-icon linkedin">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.3v-1.1h-2.5v7.8h2.5v-4.2c0-1 .5-2 1.5-2 1 0 1 .8 1 1.8v4.4h2.5M8.1 18.5V10.7H5.6v7.8h2.5M6.8 9.5c.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4z"/></svg>
                  </div>
                  <div className="inbox-text">
                    <div className="guest-name">{t("omniChannel.guestName3")}</div>
                    <div className="guest-msg">{t("omniChannel.guestMsg3")}</div>
                  </div>
                  <div className="inbox-time">{t("omniChannel.time3")}</div>
                </div>
              </a>
            </div>
            <div className="omni-chat-ui">
              <div className="chat-ui-head">
              <div className="chat-ui-user">
                <div className="avatar">R</div>
                <div>
                  <div className="u-name">{t("omniChannel.guestName1")}</div>
                  <div className="u-status"><span className="dot"></span> {t("omniChannel.onlineWhatsApp")}</div>
                </div>
              </div>
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer ">
              <button className="btn-primary btn-small">
                <MessageCircle size={16}/> {t("omniChannel.chatOnWhatsApp")}
              </button>
              </a>
            </div>
            <div className="chat-ui-body">
              <div className="msg-bubble received">{t("omniChannel.chatReceived")}</div>
              <div className="msg-meta">{t("omniChannel.chatReceivedMeta")}</div>
              <div className="msg-bubble sent">{t("omniChannel.chatSent")}</div>
              <div className="msg-meta sent">{t("omniChannel.chatSentMeta")}</div>
              <div className="chat-input-mock">{t("omniChannel.typingPlaceholder")}</div>
            </div>
            </div>
          </div>
        </div>
    </section>
  )
}
