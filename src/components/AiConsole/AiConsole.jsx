import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './AiConsole.css'

export default function AiConsole() {
  const { t } = useTranslation()
  return (
    <section className="ai-console section-padding" id="ai">
      <div className="container">
        <div className="ai-layout">
          <motion.div className="ai-text-content" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <div className="ai-badge">{t("aiConsole.badge")}</div>
            <h2 className="ai-heading">
              {t("aiConsole.headingLine1")} <em>{t("aiConsole.headingLine2")}</em>
            </h2>
            <p className="ai-subheading">{t("aiConsole.description")}</p>
            <a href="#" className="btn btn-primary-light">{t("aiConsole.seeAiInAction")}</a>
          </motion.div>
          <motion.div className="ai-visual-content" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="ai-stats-grid">
              <div className="ai-stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">0.2s</div>
                <div className="stat-label">{t("aiConsole.avgResponseTime")}</div>
              </div>
              <div className="ai-stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-value">+35%</div>
                <div className="stat-label">{t("aiConsole.directBookings")}</div>
              </div>
              <div className="ai-stat-card full-width">
                <div className="stat-icon">🤖</div>
                <div className="stat-value">98%</div>
                <div className="stat-label">{t("aiConsole.queriesResolved")}</div>
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
