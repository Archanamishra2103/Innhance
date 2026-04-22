import { useRef } from 'react'
import { motion } from 'framer-motion'
import './AiConsole.css'

export default function AiConsole() {
  return (
    <section className="ai-console section-padding" id="ai">
      <div className="container">
        <div className="ai-layout">
          <motion.div
            className="ai-text-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="ai-badge">BUILT FOR HOTELS</div>
            <h2 className="ai-heading">
              Your 24/7 AI-Powered <em>Booking Engine</em>
            </h2>
            <p className="ai-subheading">
              Turn your hotel's WhatsApp into a revenue-generating machine. Instantly answer guest questions, share availability, and complete direct bookings on autopilot while your front desk sleeps.
            </p>
            <a href="#" className="btn btn-primary-light">See AI in Action</a>
          </motion.div>

          <motion.div
            className="ai-visual-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="ai-stats-grid">
              <div className="ai-stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">0.2s</div>
                <div className="stat-label">Avg. Response Time</div>
              </div>
              <div className="ai-stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-value">+35%</div>
                <div className="stat-label">Direct Bookings</div>
              </div>
              <div className="ai-stat-card full-width">
                <div className="stat-icon">🤖</div>
                <div className="stat-value">98%</div>
                <div className="stat-label">Queries Resolved Without Human Agent</div>
                <div className="progress-bar-container">
                   <div className="progress-bar-fill" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
