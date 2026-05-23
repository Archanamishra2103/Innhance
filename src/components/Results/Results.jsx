import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './Results.css'

function useCountUp(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!startCounting) return
    let startTime = null
    const parsed = parseFloat(end.toString().replace(/[^0-9.]/g, ''))
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * parsed))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, startCounting])
  return count
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }

export default function Results() {
  const { t } = useTranslation()
  const [startCounting, setStartCounting] = useState(false)
  const sectionRef = useRef(null)
  const testimonials = t('results.testimonials', { returnObjects: true })

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStartCounting(true)
    }, { threshold: 0.3 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="results section-padding" id="results" ref={sectionRef}>
      <div className="container">
        <motion.div className="results-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="section-label">{t("results.sectionLabel")}</div>
          <h2 className="section-heading">
            {t("results.heading")} <em className="heading-green">{t("results.headingEmphasis")}</em>
          </h2>
          <p className="section-subheading">{t("results.subheading")}</p>
        </motion.div>
        <motion.div className="testimonials-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }}>
          {testimonials.map((item, i) => (
            <motion.div key={i} className="testimonial-card" variants={cardVariants}>
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-quote">{item.quote}</p>
              <div className="testimonial-stats">
                {item.stats.map((stat, j) => (
                  <div key={j} className="testimonial-stat">
                    <div className="testimonial-stat-value">{stat}</div>
                    <div className="testimonial-stat-label">{item.statsLabels[j]}</div>
                  </div>
                ))}
              </div>
              <div className="testimonial-author">
                <div className={`testimonial-avatar avatar-${(item.author?.split(' ').map(n=>n[0]).join('') || 'XX').toLowerCase()}`}>
                  {item.author?.split(' ').map(n=>n[0]).join('') || ''}
                </div>
                <div>
                  <div className="testimonial-name">{item.author}</div>
                  <div className="testimonial-role">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
