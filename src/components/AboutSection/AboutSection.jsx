import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useTranslation } from 'react-i18next'
import Storytelling from '../Storytelling/Storytelling'
import HotelLogoRail from './HotelLogoRail'
import { Target, HeartHandshake } from 'lucide-react'
import './AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const { t } = useTranslation()
  const container = useRef(null)

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    // Realistic 3D tilt based on mouse position (subdued)
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    
    gsap.to(card, { 
      duration: 0.4, 
      rotateX, 
      rotateY, 
      scale: 1.01,
      ease: "power2.out", 
      transformPerspective: 1000 
    })
  }

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { 
      duration: 1, 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1,
      ease: "elastic.out(1, 0.3)" 
    })
  }

  const handlePillMove = (e) => {
    const pill = e.currentTarget;
    const rect = pill.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Magnetic pull effect
    gsap.to(pill, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.4,
      ease: "power2.out"
    });
  }

  const handlePillLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });
  }

  useGSAP(() => {
    // 1. Hero Text Parallax & Reveal
    const heroElements = gsap.utils.toArray('.about-hero-content > *')
    gsap.from(heroElements, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    })

    gsap.from('.about-hero-visual', {
      x: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.6
    })

    // Parallax on scroll for hero
    gsap.to('.about-hero-content', {
      scrollTrigger: {
        trigger: '.about-hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      opacity: 0.5
    })

    // 3. Problem + Approach Elegant Vertical Slide (Fixed Collision)
    const splitCards = gsap.utils.toArray('.about-split-card')

    gsap.from(splitCards, {
      scrollTrigger: { trigger: '.about-split-container', start: 'top 80%' },
      y: 60, 
      opacity: 0, 
      duration: 1.2, 
      stagger: 0.2,
      ease: "power3.out"
    })

    // Stat Number Counting (Loading) Animation
    const numbers = gsap.utils.toArray('.stat-num-val')
    numbers.forEach((num) => {
      const targetVal = parseFloat(num.getAttribute('data-val'))
      gsap.fromTo(num, 
        { innerHTML: 0 },
        {
          innerHTML: targetVal,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: '.about-stats-container',
            start: 'top 85%'
          }
        }
      )
    })

    // 4. Belief Pills (Clean entrance reveal, no floating)
    const pills = gsap.utils.toArray('.belief-pill')
    gsap.from(pills, {
      scrollTrigger: { trigger: '.about-beliefs-container', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    })

    // 5. Founder Note Animations
    gsap.from('.founder-note-card', {
      scrollTrigger: { trigger: '.founder-note-container', start: 'top 85%' },
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out"
    })

    gsap.from('.founder-char', {
      scrollTrigger: { trigger: '.founder-note-container', start: 'top 85%' },
      opacity: 0,
      display: 'none',
      duration: 0.05,
      stagger: 0.08,
      delay: 0.5, // start typing after card reveals
      ease: "none"
    })

  }, { scope: container })

  return (
    <div className="about-page-wrapper" ref={container}>
      {/* Subtle Architectural Hotel-Tech Grid */}
      <div className="about-bg-grid"></div>
      
      {/* 1. ABOUT HERO CARD */}
      <section className="about-hero-container">
        <div className="about-hero-card">
          <div className="about-hero-bg"></div>
          <div className="about-blob about-blob-1"></div>
          <div className="about-blob about-blob-2"></div>
          
          <div className="about-hero-layout">
            <div className="about-hero-content">
              <span className="about-subtitle">{t("about.subtitle")}</span>
              <h1 className="about-title">
                {t("about.titleLine1")} <br />
                <span className="about-title-highlight">{t("about.titleHighlight")}</span>{t("about.titleLine2")}
              </h1>
              <p className="about-description">
                {t("about.description")}
              </p>
            </div>
            
            <div className="about-hero-visual">
              <div className="about-video-wrapper">
                <video 
                  src="/assets/aboutsecvideo.mp4" 
                  className="about-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  style={{ pointerEvents: 'none' }}
                  ref={(el) => { if (el) { el.play().catch(e => console.log("Video autoplay blocked", e)) } }}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: HOTEL LOGO RAIL */}
      <HotelLogoRail />

      {/* 2. STATS CARDS */}
      <section className="about-stats-container">
        <div className="about-stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-text"><span className="golden-highlight">{t("about.stat1Text")}</span>{t("about.stat1TextEnd")}</div>
        </div>
        <div className="about-stat-card">
          <div className="stat-number"><span className="stat-num-val" data-val="40">0</span>+</div>
          <div className="stat-text">{t("about.stat2Text")} <span className="golden-highlight">{t("about.stat2TextEnd")}</span></div>
        </div>
        <div className="about-stat-card">
          <div className="stat-number">₹<span className="stat-num-val" data-val="0">0</span></div>
          <div className="stat-text">{t("about.stat3Text")} <span className="golden-highlight">{t("about.stat3TextEnd")}</span></div>
        </div>
      </section>

      {/* 3. PROBLEM + APPROACH CARDS */}
      <section className="about-split-container">
        {/* LEFT CARD */}
        <div className="about-split-card about-split-card-dark" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <Target size={40} className="split-icon" strokeWidth={1.5} />
          <h2 className="split-heading">{t("about.problemHeading")}</h2>
          <p className="split-content">
            {t("about.problemText1")} <span className="golden-highlight">{t("about.problemHighlight")}</span> {t("about.problemText2")}
          </p>
        </div>
        
        {/* RIGHT CARD */}
        <div className="about-split-card about-split-card-green" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <HeartHandshake size={40} className="split-icon" strokeWidth={1.5} />
          <h2 className="split-heading">{t("about.approachHeading")}</h2>
          <p className="split-content">
            {t("about.approachText1")} <span className="golden-highlight">{t("about.approachHighlight")}</span>{t("about.approachText2")}
          </p>
        </div>
      </section>

      {/* 4. WHAT WE BELIEVE IN */}
      <section className="about-beliefs-container">
        <h4 className="beliefs-title">{t("about.beliefsTitle")}</h4>
        <div className="beliefs-pill-wrap">
          <div className="belief-pill" onMouseMove={handlePillMove} onMouseLeave={handlePillLeave}>
            <span>❤️</span> {t("about.belief1")}
          </div>
          <div className="belief-pill" onMouseMove={handlePillMove} onMouseLeave={handlePillLeave}>
            <span>⚡</span> {t("about.belief2")}
          </div>
          <div className="belief-pill" onMouseMove={handlePillMove} onMouseLeave={handlePillLeave}>
            <span>🌱</span> {t("about.belief3")}
          </div>
          <div className="belief-pill" onMouseMove={handlePillMove} onMouseLeave={handlePillLeave}>
            <span>🔒</span> {t("about.belief4")}
          </div>
        </div>
      </section>

      {/* 5. FOUNDER'S NOTE */}
      <section className="founder-note-container">
        <div className="founder-note-card">
          <div className="founder-avatar-wrap">
            <img src="/assets/founderimg.png" alt="Founder" className="founder-avatar" loading="lazy" />
          </div>
          <div className="founder-content">
            <h5 className="founder-heading">
              {(t("about.founderNote") || "FOUNDER'S NOTE").split('').map((char, index) => (
                <span key={index} className="founder-char">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </h5>
            <h3 className="founder-name">Arnav Prabhakar</h3>
            <h6 className="founder-subheading">Founder & CEO, Innhance.in</h6>
            <p className="founder-quote">
              {t("about.founderQuote")}
            </p>
          </div>
        </div>
      </section>

      {/* 6. STORYTELLING SECTION (EXISTING COMPONENT) */}
      <Storytelling />
      
    </div>
  )
}
