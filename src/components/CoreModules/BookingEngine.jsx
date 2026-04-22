import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { QrCode, CreditCard, Wallet, Percent, CircleCheck } from 'lucide-react'
import './BookingEngine.css'

gsap.registerPlugin(ScrollTrigger)

export default function BookingEngine() {
  const container = useRef(null)

  useGSAP(() => {
    // Parallax on the booking cards
    gsap.from('.mock-room-card', {
      scrollTrigger: {
        trigger: '.booking-section',
        start: 'top 80%'
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    })

    // Ping animation on the 0% commission badge
    gsap.to('.commission-badge', {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut'
    })
  }, { scope: container })

  return (
    <section className="booking-section section-padding" id="booking-engine" ref={container}>
      
      {/* Background Graphic */}
      <div className="booking-bg-accent"></div>

      <div className="container-custom">
        <div className="booking-layout">
          
          <div className="booking-text">
            <h2 className="section-title">
              Keep 100% of <br/> your revenue.
            </h2>
            <p className="booking-par">
              OTAs charge 15-25% commission. Innhance allows guests to book directly on WhatsApp with zero commission fees, supporting seamless UPI and Card payments instantly.
            </p>

            <div className="commission-badge">
              <Percent size={24}/>
              <span>0% Commission on Direct Bookings</span>
            </div>

            <div className="payment-methods">
              <div className="pay-method"><Wallet size={20}/> UPI (GPay, PhonePe)</div>
              <div className="pay-method"><CreditCard size={20}/> Credit / Debit Cards</div>
              <div className="pay-method"><QrCode size={20}/> Dynamic QR</div>
            </div>
          </div>

          <div className="booking-visual">
            <div className="mock-room-cards">
              
              {/* Room Card 1 */}
              <div className="mock-room-card highlight">
                <div className="room-img-mock"></div>
                <div className="room-details">
                  <div className="room-head">
                    <h4 className="room-title">Deluxe Sunset Suite</h4>
                    <span className="room-price">₹8,999<small>/night</small></span>
                  </div>
                  <ul className="room-amenities">
                    <li><CircleCheck size={14}/> King Bed</li>
                    <li><CircleCheck size={14}/> Ocean View</li>
                  </ul>
                  <button className="btn-primary btn-full disabled">Processing Booking...</button>
                </div>
              </div>

              {/* UPI Mock Overlay */}
              <div className="upi-overlay-mock">
                <div className="upi-top">
                  <QrCode size={40} className="qr-icon"/>
                  <div className="upi-amt">₹8,999</div>
                  <div className="upi-merch">To: Heritage Hotel</div>
                </div>
                <div className="upi-bot">Scan to Pay securely via UPI</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
