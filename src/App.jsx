import { useState, useEffect, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Eagerly loaded (Above the fold)
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'

// Lazy loaded (Below the fold)
const Features = lazy(() => import('./components/Features/Features'))
const GuestJourney = lazy(() => import('./components/GuestJourney/GuestJourney'))
const OmniChannel = lazy(() => import('./components/CoreModules/OmniChannel'))
const BookingEngine = lazy(() => import('./components/CoreModules/BookingEngine'))
const ContextualHelp = lazy(() => import('./components/CoreModules/ContextualHelp'))
const DigitalConcierge = lazy(() => import('./components/CoreModules/DigitalConcierge'))
const AnalyticsPreview = lazy(() => import('./components/AnalyticsPreview/AnalyticsPreview'))
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'))
const Pricing = lazy(() => import('./components/Pricing/Pricing'))
const FAQ = lazy(() => import('./components/FAQ/FAQ'))
const Footer = lazy(() => import('./components/Footer/Footer'))
const AboutSection = lazy(() => import('./components/AboutSection/AboutSection'))
const Blog = lazy(() => import('./components/Blog/Blog'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'))

const RTL_LANGUAGES = ['ar']

function App() {
  const [currentView, setCurrentView] = useState('home')
  const { i18n } = useTranslation()

  // Handle RTL/LTR direction based on language
  useEffect(() => {
    const isRtl = RTL_LANGUAGES.includes(i18n.language)
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language

    // Refresh ScrollTrigger after DOM layout shift
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 50)
  }, [i18n.language, currentView])

  return (
    <div className="app-container">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero />
            <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
              <Features />
              <GuestJourney />
              <OmniChannel />
              <BookingEngine />
              <ContextualHelp />
              <DigitalConcierge />
              <AnalyticsPreview />
              <Testimonials />
              <Pricing />
              <FAQ />
            </Suspense>
          </>
        ) : currentView === 'about' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
            <AboutSection />
          </Suspense>
        ) : currentView === 'privacy' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
            <PrivacyPolicy />
          </Suspense>
        ) : (
          <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
            <Blog />
          </Suspense>
        )}
      </main>
      
      <Suspense fallback={<div style={{ minHeight: '200px' }}></div>}>
        <Footer setCurrentView={setCurrentView} />
      </Suspense>
    </div>
  )
}

export default App
