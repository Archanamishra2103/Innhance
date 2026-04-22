import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageCircle, Camera, MessageSquareText } from 'lucide-react'
import './OmniChannel.css'

gsap.registerPlugin(ScrollTrigger)

export default function OmniChannel() {
  const container = useRef(null)

  useGSAP(() => {
    // Staggered reveal for inbox rows
    gsap.from('.inbox-row', {
      scrollTrigger: {
        trigger: '.omni-section',
        start: 'top 70%'
      },
      x: -50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out'
    })
    
    // Scale up for the main chat UI
    gsap.from('.omni-chat-ui', {
      scrollTrigger: {
        trigger: '.omni-section',
        start: 'top 60%'
      },
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power4.out',
      delay: 0.3
    })
  }, { scope: container })

  return (
    <section className="omni-section section-padding" id="omnichannel" ref={container}>
      <div className="container-custom">
        <div className="omni-header">
          <h2 className="section-title">
            One Hub.<br/>
            <span className="text-muted">Every Channel covered.</span>
          </h2>
          <div className="omni-channel-logos">

            <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
              <div className="omni-logo-circle whatsapp" title="WhatsApp">
                <MessageCircle size={28}/>
              </div>
            </a>

            <a href="https://www.instagram.com/innhance_?igsh=aXNnaHo4cnkzdnVm" target="_blank" rel="noopener noreferrer">
              <div className="omni-logo-circle ig" title="Instagram">
                <Camera size={28}/>
              </div>
            </a>

              <a href="https://www.linkedin.com/company/innhanceai/" target="_blank" rel="noopener noreferrer">
              <div className="omni-logo-circle linkedin" title="LinkedIn">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.3v-1.1h-2.5v7.8h2.5v-4.2c0-1 .5-2 1.5-2 1 0 1 .8 1 1.8v4.4h2.5M8.1 18.5V10.7H5.6v7.8h2.5M6.8 9.5c.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4z"/>
                </svg>
                </div>
            </a>

          </div>


            <div className="omni-layout">

            {/* Left panel: Inbox List */}
            <div className="omni-sidebar">
              <div className="omni-sidebar-head">Unified Inbox</div>

                <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
                <div className="inbox-row active">
                  <div className="channel-icon whatsapp"><MessageCircle size={18}/></div>
                  <div className="inbox-text">
                    <div className="guest-name">Raj Patel</div>
                    <div className="guest-msg">Need a room for 2 nights...</div>
                  </div>
                  <div className="inbox-time">Now</div>
                </div>
              </a>

              <a href="https://www.instagram.com/innhance_?igsh=aXNnaHo4cnkzdnVm" target="_blank" rel="noopener noreferrer">
                <div className="inbox-row">
                  <div className="channel-icon ig"><Camera size={18}/></div>
                  <div className="inbox-text">
                    <div className="guest-name">@wanderlust_aditi</div>
                    <div className="guest-msg">Do you have a spa menu?</div>
                  </div>
                  <div className="inbox-time">5m</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/company/innhanceai/" target="_blank" rel="noopener noreferrer">
                <div className="inbox-row">
                  <div className="channel-icon linkedin">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.3v-1.1h-2.5v7.8h2.5v-4.2c0-1 .5-2 1.5-2 1 0 1 .8 1 1.8v4.4h2.5M8.1 18.5V10.7H5.6v7.8h2.5M6.8 9.5c.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4z"/>
                    </svg>
                  </div>
                  <div className="inbox-text">
                    <div className="guest-name">Sanjay Mehra</div>
                    <div className="guest-msg">Interested in bulk corporate booking.</div>
                  </div>
                  <div className="inbox-time">1h</div>
                </div>
              </a>

            </div>
          </div>
          {/* Right Panel: Open Chat */}
          <div className="omni-chat-ui">
            <div className="chat-ui-head">
              <div className="chat-ui-user">
                <div className="avatar">R</div>
                <div>
                  <div className="u-name">Raj Patel</div>
                  <div className="u-status"><span className="dot"></span> Online (WhatsApp)</div>
                </div>
              </div>
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer ">
              <button className="btn-primary btn-small">
                <MessageCircle size={16}/> Chat on WhatsApp
              </button>
              </a>
            </div>

            <div className="chat-ui-body">
              <div className="msg-bubble received">
                Hi, I wanted to check availability for a double room from Dec 10 to Dec 12.
              </div>
              <div className="msg-meta">Received via WhatsApp • 10:42 AM</div>

              <div className="msg-bubble sent">
                Hello Raj! Yes, we have standard double rooms available for those dates at ₹4,500/night. Would you like me to reserve one for you?
              </div>
              <div className="msg-meta sent">AI Agent • 10:42 AM</div>
              
              <div className="chat-input-mock">
                Typing a manual override message...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
