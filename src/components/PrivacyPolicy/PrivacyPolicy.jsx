import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  const container = useRef(null)

  useGSAP(() => {
    // Hero animation
    gsap.from('.privacy-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    })

    // Content sections fade in on scroll
    const sections = gsap.utils.toArray('.privacy-section')
    sections.forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
    })

    // Floating icons animation
    gsap.to('.floating-icon', {
      y: -15,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.2
    })
  }, { scope: container })

  return (
    <div className="privacy-page-wrapper" ref={container}>
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="privacy-bg-glow"></div>
        <div className="container-custom privacy-hero-content">
          <div className="privacy-badge">
            <Shield size={16} />
            <span>Secure & Transparent</span>
          </div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            At Innhance, your privacy matters to us. We believe trust is built through transparency, and we are committed to handling your information responsibly.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="privacy-content-wrapper section-padding">
        <div className="container-custom">
          <div className="privacy-content-grid">
            
            {/* Sidebar (Optional decoration/navigation) */}
            <div className="privacy-sidebar desktop-only">
              <div className="sidebar-sticky">
                <div className="sidebar-icon-box floating-icon">
                  <Lock size={32} />
                </div>
                <div className="sidebar-icon-box floating-icon" style={{ animationDelay: '0.5s' }}>
                  <Eye size={32} />
                </div>
                <div className="sidebar-icon-box floating-icon" style={{ animationDelay: '1s' }}>
                  <CheckCircle2 size={32} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="privacy-main">
              
              <div className="privacy-section">
                <h2>Information We Collect</h2>
                <p>We may collect information that you provide directly to us, including:</p>
                <ul className="privacy-list">
                  <li>Name and contact information</li>
                  <li>Hotel or business details</li>
                  <li>Booking and inquiry information</li>
                  <li>WhatsApp interactions and communication data</li>
                  <li>Usage and analytics data related to our platform</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2>How We Use Information</h2>
                <p>We use collected information to:</p>
                <ul className="privacy-list">
                  <li>Deliver and improve Innhance services</li>
                  <li>Automate and manage guest interactions</li>
                  <li>Enhance booking experiences</li>
                  <li>Provide customer support</li>
                  <li>Improve platform performance and AI responses</li>
                  <li>Analyze trends and optimize user experience</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2>Communication Data</h2>
                <p>
                  Innhance may process messages, inquiries, and conversations shared through supported channels such as WhatsApp or related communication platforms. This information is used solely to enable intelligent responses and improve service quality.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect user data against unauthorized access, misuse, or disclosure.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Third-Party Services</h2>
                <p>
                  Certain services integrated with Innhance may involve trusted third-party providers. These providers process information only where necessary to support our platform functionality.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Cookies & Analytics</h2>
                <p>
                  We may use cookies and analytics tools to understand user behavior, improve website performance, and enhance overall experience.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Your Rights</h2>
                <p>
                  You may request access, correction, or deletion of your personal information where applicable.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Policy Updates</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be reflected on this page.
                </p>
              </div>

              <div className="privacy-section">
                <h2>Contact</h2>
                <p>
                  If you have any questions regarding this Privacy Policy, please contact us through our official channels.
                </p>
                <p className="privacy-date">Last Updated: May 2026</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
