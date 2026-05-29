import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Bot, Star, TrendingUp, Zap, Bed, Send, X } from 'lucide-react'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const getPredefinedQuestions = (t) => [
  { id: 'q1', text: t('heroChat.q1Text'), answer: t('heroChat.q1Answer') },
  { id: 'q2', text: t('heroChat.q2Text'), answer: t('heroChat.q2Answer') },
  { id: 'q3', text: t('heroChat.q3Text'), answer: t('heroChat.q3Answer') }
];

export default function Hero() {
  const { t, i18n } = useTranslation()
  const container = useRef(null)
  const orbitRef = useRef(null)
  const chatBodyRef = useRef(null)
  const idleAnim = useRef(null)

  // Phone Interactive State
  const [isInteractive, setIsInteractive] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [availableChips, setAvailableChips] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isInteractive) {
      setChatMessages([{ type: 'bot', text: t('heroChat.initialBot'), id: 'm0' }]);
      setAvailableChips(getPredefinedQuestions(t));
      setInputValue("");
    } else {
      setChatMessages([]);
    }
  }, [isInteractive, i18n.language, t]);

  useEffect(() => {
    if (chatBodyRef.current && isInteractive) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, isInteractive]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const lowerText = userText.toLowerCase().trim();
    setInputValue("");
    setChatMessages(prev => [...prev, { type: 'user', text: userText, id: Date.now() }]);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      const greetings = ['hi', 'hello', 'hii', 'hey', 'namaste', 'hola', 'bonjour', 'hallo', 'مرحبا', 'halo'];
      const isGreeting = greetings.some(g => lowerText.includes(g));

      let replyText = t('heroChat.fallbackReply');

      if (isGreeting) {
        replyText = t('heroChat.greetingReply');
      } else {
        const questions = getPredefinedQuestions(t);
        const match = questions.find(q => lowerText.includes(q.text.toLowerCase()) || 
          (lowerText.includes('innhance') && q.id === 'q1') ||
          (lowerText.includes('whatsapp') && q.id === 'q3') ||
          (lowerText.includes('how') && q.id === 'q2')
        );
        if (match) {
          replyText = match.answer;
        }
      }

      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        text: replyText, 
        id: Date.now() + 1 
      }]);
    }, 1500);
  };

  const handleChipClick = (chip) => {
    setChatMessages(prev => [...prev, { type: 'user', text: chip.text, id: Date.now() }]);
    setAvailableChips(prev => prev.filter(c => c.id !== chip.id));
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { type: 'bot', text: chip.answer, id: Date.now() + 1 }]);
    }, 1200);
  };


  useGSAP(() => {
    // Ensure right column is visible immediately
    gsap.set('.hero-right-col', { opacity: 1 })

    // Entrance Animation Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

    tl.from('.hero-badge-pill', { y: 30, opacity: 0, delay: 0.1 })
      .from('.hero-title-line', { y: 40, opacity: 0, stagger: 0.1 }, "-=0.9")
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1 }, "-=0.8")
      .from('.hero-buttons', { y: 20, opacity: 0 }, "-=0.9")
      .from('.hero-social-proof', { y: 20, opacity: 0 }, "-=0.8")
      .from('.hero-phone-entrance-wrapper', { x: 80, opacity: 0, scale: 0.9, duration: 1.5, ease: 'power3.out' }, "-=1.2")
    

    // Mouse Parallax for background blobs AND phone
    const blobs = gsap.utils.toArray('.hero-blob')
    const xTo = gsap.quickTo(blobs, "x", { duration: 2, ease: "power2.out" })
    const yTo = gsap.quickTo(blobs, "y", { duration: 2, ease: "power2.out" })

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const xPos = (e.clientX / innerWidth - 0.5) * 40
      const yPos = (e.clientY / innerHeight - 0.5) * 40
      xTo(xPos)
      yTo(yPos)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Orbit Particle Animations using GSAP
    gsap.to('.orbit-particle-1', {
      rotation: '+=360',
      duration: 20,
      repeat: -1,
      ease: 'none'
    })
    gsap.to('.orbit-particle-1-delay', {
      rotation: '-=360',
      duration: 24,
      repeat: -1,
      ease: 'none'
    })
    gsap.to('.orbit-particle-2', {
      rotation: '+=360',
      duration: 22,
      repeat: -1,
      ease: 'none'
    })
    gsap.to('.orbit-particle-2-delay', {
      rotation: '-=360',
      duration: 26,
      repeat: -1,
      ease: 'none'
    })

    // Background Blob Pulsing
    gsap.to('.hero-blob-gold', {
      scale: 1.15,
      opacity: 0.65,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    gsap.to('.hero-blob-green', {
      scale: 1.1,
      opacity: 0.7,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })

    // Subtle sway for orbit rings
    gsap.to('.orbit-ring-wrap-1', {
      rotation: '-=4',
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    gsap.to('.orbit-ring-wrap-2', {
      rotation: '+=6',
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Subtle realistic phone float and shadow sync
    gsap.to('.hero-phone-wrapper', {
      y: -12,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    gsap.to('.phone-floor-shadow', {
      scale: 0.8,
      opacity: 0.5,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Shimmering glass reflection
    gsap.to('.hero-glass-reflection', {
      opacity: 0.4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // CTA text subtle pulse
    gsap.to('.hero-phone-cta', {
      opacity: 0.85,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Sequential typing animations
    const typingTl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    
    typingTl
      // Ensure both are empty initially
      .set('.text-accent', { text: "", '--cursor-opacity': 0 })
      .set('.hero-badge-highlight', { text: "", '--cursor-opacity': 0 })
      // Type "CHATS"
      .set('.text-accent', { '--cursor-opacity': 1 })
      .to('.text-accent', { text: t("hero.chats"), duration: 1.2, ease: "none" })
      .set('.text-accent', { '--cursor-opacity': 0 })
      // Wait slightly
      .to({}, { duration: 0.4 })
      // Type "Hotel Bookings"
      .set('.hero-badge-highlight', { '--cursor-opacity': 1 })
      .to('.hero-badge-highlight', { text: t("hero.hotelBookings"), duration: 1.8, ease: "none" })
      .set('.hero-badge-highlight', { '--cursor-opacity': 0 })
      // Hold both for reading before repeating
      .to({}, { duration: 3.5 })

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: container, dependencies: [i18n.language] })

  // Interactive Phone Transition
  useGSAP(() => {
    const cta = '.hero-phone-cta'

    if (isInteractive) {
      gsap.to(cta, {
        opacity: 0.35,
        y: 8,
        duration: 0.4
      })
    } else {
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.5
      })
    }
  }, { scope: container, dependencies: [isInteractive] })

  return (
    <section className="hero-section" id="hero" ref={container}>
      
      {/* Background Blobs & Grid */}
      <div className="hero-bg-elements">
        <div className="bg-grid-overlay"></div>
      </div>

      <div className="container-custom hero-split-layout">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="hero-left-col">
          
          <div className="hero-badge-pill">
            <Star size={14} className="badge-icon" />
            <span>{t("hero.badgeText")}</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-title-line hero-title-line-indented">{t("hero.turn")}</span>
            <span className="hero-title-line">
              {t("hero.whatsapp")}{' '}
              <span className="typing-container" key={`chats-${i18n.language}`}>
                <span className="typing-phantom">{t("hero.chats")}</span>
                <span className="text-accent"></span>
              </span>
            </span>
            <span className="hero-title-line hero-title-line-indented">
              {t("hero.into")}
            </span>
            <span className="hero-title-line hero-title-line-half-indented">
              <span className="typing-container typing-italic" style={{ marginLeft: 0 }} key={`bookings-${i18n.language}`}>
                <span className="typing-phantom">{t("hero.hotelBookings")}</span>
                <span className="hero-badge-highlight"></span>
              </span>
            </span>
          </h1>

          <p className="hero-subtitle">
            {t("hero.subheadline")}
          </p>

          <div className="hero-buttons">
            <a href="#journey" className="btn-primary btn-large" onClick={(e) => { e.preventDefault(); document.getElementById('journey')?.scrollIntoView({behavior: 'smooth'}) }}>
              {t("hero.getStarted")} <ArrowRight size={18} />
            </a>
            <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
              <button className="btn-dark btn-large">
                {t("hero.bookADemo")}
              </button>
            </a>
          </div>

          <div className="hero-social-proof">
            <div className="avatar-group">
              {/* Fallback to simple colored circles if images aren't found */}
              <div className="proof-avatar" style={{backgroundImage: "url('/assets/hotels.img/bindramhotels.webp')"}}></div>
              <div className="proof-avatar" style={{backgroundImage: "url('/assets/hotels.img/hyathotel.webp')"}}></div>
              <div className="proof-avatar" style={{backgroundImage: "url('/assets/hotels.img/kashmirhotel.webp')"}}></div>
              <div className="proof-avatar" style={{backgroundImage: "url('/assets/hotels.img/manihotel.webp')"}}></div>
            </div>
            <div className="proof-text">
              <div className="stars">
                <Star size={12} fill="currentColor" stroke="none" />
                <Star size={12} fill="currentColor" stroke="none" />
                <Star size={12} fill="currentColor" stroke="none" />
                <Star size={12} fill="currentColor" stroke="none" />
                <Star size={12} fill="currentColor" stroke="none" />
              </div>
              <span>Trusted by 50+ hotels across India</span>
            </div>
          </div>

          <div className="hero-scroll-explore">
            <div className="mouse-icon">
              <div className="mouse-wheel"></div>
            </div>
            <span>Scroll to explore</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Premium Phone Visualization */}
        <div className="hero-right-col">
          
          <div className="phone-stage">
            {/* Atmospheric Background Blobs */}
            <div className="hero-bg-blobs">
              <div className="hero-blob hero-blob-gold"></div>
              <div className="hero-blob hero-blob-green"></div>
            </div>

            {/* Orbit Container & Rings */}
            <div className="orbit-bg">
              <div className="orbit-container" ref={orbitRef}>
                {/* Ring 1 (rotate -18deg) */}
                <div className="orbit-ring-wrap orbit-ring-wrap-1">
                  <div className="orbit-ring-ellipse">
                    {/* Nodes along the ring */}
                    <div className="orbit-node-holder" style={{ transform: 'rotate(50deg)' }}>
                      <div className="orbit-node node-green"></div>
                    </div>
                    <div className="orbit-node-holder" style={{ transform: 'rotate(190deg)' }}>
                      <div className="orbit-node node-green"></div>
                    </div>
                    <div className="orbit-node-holder" style={{ transform: 'rotate(310deg)' }}>
                      <div className="orbit-node node-gold"></div>
                    </div>
                    
                    {/* Animated Particles */}
                    <div className="orbit-particle-wrapper orbit-particle-1">
                      <div className="orbit-particle particle-gold"></div>
                    </div>
                    <div className="orbit-particle-wrapper orbit-particle-1-delay">
                      <div className="orbit-particle particle-green"></div>
                    </div>
                  </div>
                </div>

                {/* Ring 2 (rotate 24deg) */}
                <div className="orbit-ring-wrap orbit-ring-wrap-2">
                  <div className="orbit-ring-ellipse">
                    {/* Nodes along the ring */}
                    <div className="orbit-node-holder" style={{ transform: 'rotate(15deg)' }}>
                      <div className="orbit-node node-gold"></div>
                    </div>
                    <div className="orbit-node-holder" style={{ transform: 'rotate(150deg)' }}>
                      <div className="orbit-node node-green"></div>
                    </div>
                    
                    {/* Animated Particles */}
                    <div className="orbit-particle-wrapper orbit-particle-2">
                      <div className="orbit-particle particle-green"></div>
                    </div>
                    <div className="orbit-particle-wrapper orbit-particle-2-delay">
                      <div className="orbit-particle particle-gold"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Floor Shadow */}
            <div className="phone-floor-shadow"></div>



            {/* iPhone Mockup */}
            <div className="hero-phone-entrance-wrapper">
              <div
               className={`hero-phone-wrapper ${isInteractive ? "phone-active" : ""}`}
               onClick={() => !isInteractive && setIsInteractive(true)}
              >
              <div className="hero-phone-frame">
                <div className="hero-glass-reflection"></div>
                <div className="hero-phone-notch"><div className="hero-notch-camera"></div></div>
                
                <div className="hero-phone-screen">
                  {/* Status Bar */}
                <div className="wa-status-bar">
                  <span className="wa-time">9:41</span>
                  <div className="wa-status-icons">
                    <svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 8V6.5M3 8V5M5 8V3.5M7 8V2M9 8V0.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <svg width="12" height="9" viewBox="0 0 12 9"><path d="M6 1.5C3.8 1.5 2 2.8 1 4L6 8L11 4C10 2.8 8.2 1.5 6 1.5Z" fill="white"/></svg>
                    <svg width="16" height="8" viewBox="0 0 16 8"><rect x="0.5" y="0.5" width="12" height="7" rx="1.5" stroke="white"/><rect x="1.5" y="1.5" width="9" height="5" rx="0.5" fill="white"/><path d="M13.5 2.5V5.5C14 5.5 14.5 5 14.5 4C14.5 3 14 2.5 13.5 2.5Z" fill="white"/></svg>
                  </div>
                </div>

                {/* WhatsApp Green Header */}
                <div className="wa-header">
                  <div className="wa-header-left">
                    <span className="wa-back">←</span>
                    <div className="wa-avatar"><Bot size={14}/></div>
                    <div className="wa-header-text">
                      <span className="wa-name">Innhance AI</span>
                      <span className="wa-online">online</span>
                    </div>
                  </div>
                  <div className="wa-header-right">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="1.5"/></svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M23 7l-7 5 7 5V7z" stroke="white" strokeWidth="1.5"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="white" strokeWidth="1.5"/></svg>
                    {isInteractive ? (
                      <span className="wa-close-btn" onClick={(e) => { e.stopPropagation(); setIsInteractive(false); }}><X size={16}/></span>
                    ) : (
                      <span className="wa-dots">⋮</span>
                    )}
                  </div>
                </div>

                {/* Chat Body */}
                <div className="wa-chat-body" ref={chatBodyRef}>
                  {!isInteractive ? (
                    <>
                      <div className="wa-msg wa-msg-left">
                        <div className="wa-bubble wa-bubble-white">
                          <p dangerouslySetInnerHTML={{ __html: t('heroChat.preChat1') }}></p>
                          <span className="wa-ts">9:41 AM</span>
                        </div>
                      </div>
                      <div className="wa-msg wa-msg-right">
                        <div className="wa-bubble wa-bubble-green">
                          <p>{t('heroChat.preChat2')}</p>
                          <span className="wa-ts">9:42 AM <span className="wa-ticks">✓✓</span></span>
                        </div>
                      </div>
                      <div className="wa-msg wa-msg-left">
                        <div className="wa-bubble wa-bubble-white">
                          <p>{t('heroChat.preChat3')}</p>
                          <span className="wa-ts">9:42 AM</span>
                        </div>
                      </div>
                      <div className="wa-msg wa-msg-left">
                        <div className="wa-bubble wa-bubble-white">
                          <p>{t('heroChat.preChat4')}</p>
                          <span className="wa-ts">9:42 AM</span>
                        </div>
                      </div>
                      <div className="wa-msg wa-msg-left">
                        <div className="wa-bubble wa-bubble-white">
                          <p>{t('heroChat.preChat5')}</p>
                          <span className="wa-ts">9:42 AM</span>
                        </div>
                      </div>
                      <div className="wa-msg wa-msg-right">
                        <div className="wa-bubble wa-bubble-green">
                          <p>{t('heroChat.preChat6')}</p>
                          <span className="wa-ts">9:43 AM <span className="wa-ticks">✓✓</span></span>
                        </div>
                      </div>
                      <div className="wa-msg wa-msg-left">
                        <div className="wa-bubble wa-bubble-white">
                          <p>{t('heroChat.preChat7')}</p>
                          <a className="wa-pay-link">{t('heroChat.payNow')}</a>
                          <span className="wa-ts">9:43 AM <span className="wa-ticks">✓✓</span></span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`wa-msg ${msg.type === 'bot' ? 'wa-msg-left' : 'wa-msg-right'}`}>
                          <div className={`wa-bubble ${msg.type === 'bot' ? 'wa-bubble-white' : 'wa-bubble-green'}`}>
                            <p>{msg.text}</p>
                            <span className="wa-ts">Now {msg.type === 'user' && <span className="wa-ticks">✓✓</span>}</span>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="wa-msg wa-msg-left">
                          <div className="wa-bubble wa-bubble-white typing-bubble">
                            <div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div>
                          </div>
                        </div>
                      )}

                      {!isTyping && availableChips.length > 0 && (
                        <div className="wa-chips-container">
                          {availableChips.map(chip => (
                            <button key={chip.id} className="wa-chip" onClick={(e) => { e.stopPropagation(); handleChipClick(chip); }}>
                              {chip.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* WhatsApp Input Bar */}
                {!isInteractive ? (
                  <div className="wa-input-bar">
                    <div className="wa-input-left">
                      <span className="wa-emoji">☺</span>
                      <span className="wa-input-text">Type a message</span>
                      <span className="wa-attach">📎</span>
                      <span className="wa-camera-icon">📷</span>
                    </div>
                    <div className="wa-mic-btn">🎤</div>
                  </div>
                ) : (
                  <form className="wa-input-bar interactive-form" onSubmit={handleSendMessage}>
                    <div className="wa-input-left">
                      <span className="wa-emoji">☺</span>
                      <input 
                        type="text" 
                        className="wa-interactive-input" 
                        placeholder="Type a message" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="wa-attach">📎</span>
                    </div>
                    <button type="submit" className="wa-send-btn" disabled={!inputValue.trim()} onClick={(e) => e.stopPropagation()}>
                      <Send size={14}/>
                    </button>
                  </form>
                )}
              </div>

              </div>
            </div>
            </div>
          </div>

          {/* CTA below phone */}
          {!isInteractive && (
            <div className="hero-phone-cta" onClick={() => setIsInteractive(true)}>
              <div className="cta-hand-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 14L8 6a1.5 1.5 0 0 0-3 0l3 10m0 0L4 12a1.5 1.5 0 0 0-2.1 2.1l5.6 5.6C8.7 20.9 10.3 22 12 22h4a6 6 0 0 0 6-6V9a1.5 1.5 0 0 0-3 0v4m-3-4a1.5 1.5 0 0 0-3 0v4" />
                  <path d="M2 6a3 3 0 0 1 3-3" strokeWidth="1.2" />
                  <path d="M1 8a5 5 0 0 1 5-5" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="cta-text-lines">
                <span>Click on the phone</span>
                <span>to try a demo chat</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}