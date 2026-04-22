import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Hotel } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './GuestJourney.css'

gsap.registerPlugin(ScrollTrigger)

export default function GuestJourney() {
  const container = useRef(null)

  useGSAP(() => {
    // Media query to only pin on desktop scopes
    let mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      // Pinning the whole section 
      const panels = gsap.utils.toArray('.gj-step-card')
      const chatBubbles = gsap.utils.toArray('.gj-chat-group')
      
      // Hide all chat groups except the first
      gsap.set(chatBubbles.slice(1), { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: ".gj-container",
        start: "top 20%",
        end: `+=${panels.length * 400}`, 
        pin: ".gj-visual-side",
        anticipatePin: 1
      })

      // Link each text step to the phone mockup state
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(panel, { opacity: 1, duration: 0.3 })
            if (i > 0) gsap.to(chatBubbles[i - 1], { opacity: 0, y: -20, duration: 0.3 })
            gsap.to(chatBubbles[i], { opacity: 1, y: 0, duration: 0.3, delay: 0.1 })
          },
          onEnterBack: () => {
            gsap.to(panel, { opacity: 1, duration: 0.3 })
            if (i < panels.length - 1) gsap.to(chatBubbles[i + 1], { opacity: 0, y: 20, duration: 0.3 })
            gsap.to(chatBubbles[i], { opacity: 1, y: 0, duration: 0.3, delay: 0.1 })
          },
          onLeave: () => {
            gsap.to(panel, { opacity: 0.3, duration: 0.3 })
          },
          onLeaveBack: () => {
            gsap.to(panel, { opacity: 0.3, duration: 0.3 })
          }
        })
      })
    })

    // Mobile fallback animations
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray('.gj-step-card').forEach(panel => {
        gsap.from(panel, {
          scrollTrigger: { trigger: panel, start: "top 80%" },
          y: 30, opacity: 0, duration: 0.6
        })
      })
    })

    return () => mm.revert()
  }, { scope: container })

  return (
    <section className="gj-section section-padding" id="journey" ref={container}>
      <div className="container-custom">
        <div className="gj-header">
          <h2 className="gj-title">
            The automated guest journey. <br />
            <span className="text-lime-italic">From click to check-in.</span>
          </h2>
        </div>

        <div className="gj-container">
          
          {/* Left Text Scroller */}
          <div className="gj-text-side">
            {data.guestJourney.map((step, idx) => (
              <div key={idx} className="gj-step-card">
                <div className="step-num">0{step.step}</div>
                <h3 className="step-head">{step.title}</h3>
                <p className="step-par">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Right Pinned Visual */}
          <div className="gj-visual-side">
            <div className="phone-wrapper">
              <div className="phone-hardware">
                <div className="phone-notch"></div>
                <div className="phone-top-bar">
                  <div className="phone-avatar"><Hotel size={18}/></div>
                  <div className="phone-contact">Innhance AI Bot</div>
                </div>
                
                <div className="phone-screen">
                  {/* Absolute chat groups controlled by GSAP */}
                  <div className="gj-chat-group group-0">
                    <div className="chat received">Hi! Do you have a room for the 15th?</div>
                  </div>
                  
                  <div className="gj-chat-group group-1">
                    <div className="chat received">Hi! Do you have a room for the 15th?</div>
                    <div className="chat sent lime-sent">Checking our live calendar... Yes, we have a Deluxe Suite available for ₹8,999.</div>
                  </div>
                  
                  <div className="gj-chat-group group-2">
                    <div className="chat received">Hi! Do you have a room for the 15th?</div>
                    <div className="chat sent lime-sent">Checking our live calendar... Yes, we have a Deluxe Suite available for ₹8,999.</div>
                    <div className="chat received">Perfect. Here is my payment.</div>
                    <div className="chat sent teal-sent">Booking Confirmed! ✅</div>
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
