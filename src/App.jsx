import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import AboutSection from './components/AboutSection/AboutSection'
import Features from './components/Features/Features'
import GuestJourney from './components/GuestJourney/GuestJourney'
import OmniChannel from './components/CoreModules/OmniChannel'
import BookingEngine from './components/CoreModules/BookingEngine'
import ContextualHelp from './components/CoreModules/ContextualHelp'
import DigitalConcierge from './components/CoreModules/DigitalConcierge'
import AnalyticsPreview from './components/AnalyticsPreview/AnalyticsPreview'
import Testimonials from './components/Testimonials/Testimonials'
import Pricing from './components/Pricing/Pricing'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import Blog from './components/Blog/Blog'

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
  }, [i18n.language])

  return (
    <div className="app-container">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero />
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
          </>
        ) : currentView === 'about' ? (
          <AboutSection />
        ) : (
          <Blog />
        )}
      </main>
      
      <Footer setCurrentView={setCurrentView} />
    </div>
  )
}

export default App
