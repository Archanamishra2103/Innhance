import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check, Sparkles } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './Pricing.css'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.price-card', {
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 70%'
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: container })

  return (
    <section className="pricing-section section-padding" id="pricing" ref={container}>
      <div className="container-custom">
        <div className="pricing-header">
          <h2 className="section-title">
            Straightforward pricing. <br/>
            <span className="text-muted">No hidden fees.</span>
          </h2>
        </div>

        {/* Promo banner */}
        <div className="promo-capsule">
          <Sparkles size={20} className="promo-icon"/>
          <span className="promo-text">{data.launchOffer.title} - {data.launchOffer.description}</span>
        </div>

        <div className="pricing-grid">
          {data.pricing.map((plan, idx) => {
            const isRec = plan.recommended
            return (
              <div key={idx} className={`price-card ${isRec ? 'rec-card' : ''}`}>
                {isRec && <div className="rec-badge">Most Popular</div>}
                
                <div className="price-top">
                  <h3 className="plan-title">{plan.tier}</h3>
                  <div className="plan-sub">{plan.subtitle}</div>
                  <h2 className="plan-price">{plan.price}</h2>
                  <p className="plan-desc">{plan.description}</p>
                </div>

                <div className="price-list-wrap">
                  <ul className="price-features">
                    {plan.features.map((f, i) => (
                      <li key={i}>
                        <Check size={18} className="check"/>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="price-bot">
                  <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer ">
                  <button className={isRec ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                    Choose {plan.tier}
                  </button>
                  </a>  
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
