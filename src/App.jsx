import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Storytelling from './components/Storytelling/Storytelling'
import Features from './components/Features/Features'
import GuestJourney from './components/GuestJourney/GuestJourney'
import OmniChannel from './components/CoreModules/OmniChannel'
import BookingEngine from './components/CoreModules/BookingEngine'
import ContextualHelp from './components/CoreModules/ContextualHelp'
import DigitalConcierge from './components/CoreModules/DigitalConcierge'
import AnalyticsPreview from './components/AnalyticsPreview/AnalyticsPreview'
import Testimonials from './components/Testimonials/Testimonials'
import Pricing from './components/Pricing/Pricing'
import CTASection from './components/CTASection/CTASection'
import Footer from './components/Footer/Footer'
import LifeAtInnhance from './components/LifeAtInnhance/LifeAtInnhance'

function App() {
  const [currentView, setCurrentView] = useState('home')

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
            <CTASection />
          </>
        ) : currentView === 'about' ? (
          <Storytelling />
        ) : (
          <LifeAtInnhance />
        )}
      </main>
      
      <Footer setCurrentView={setCurrentView} />
    </div>
  )
}

export default App
