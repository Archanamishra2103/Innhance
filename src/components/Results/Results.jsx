import { useState, useEffect, useRef } from 'react'
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

const metrics = [
  { value: '2.4', prefix: '+₹', suffix: 'L', label: 'Extra/month' },
  { value: '98', prefix: '', suffix: '%', label: 'Conversion' },
  { value: '12', prefix: '', suffix: ' hrs', label: 'Saved/week' },
]

const metrics2 = [
  { value: '400', prefix: '', suffix: '+', label: 'Msgs/day' },
  { value: '42', prefix: '+', suffix: '%', label: 'Revenue' },
]

const testimonials = [
  {
    quote: '"Pehle hum night inquiries miss kar dete the. Ab 98% inquiries convert hoti hain — without any manual effort."',
    author: 'Harshvardhan Singh',
    role: 'Owner, The Heritage',
    initials: 'HS',
    stats: ['+₹2.4L', '98%', '12 hrs'],
    statsLabels: ['Extra/month', 'Conversion', 'Saved/week'],
  },
  {
    quote: '"Season mein 400+ inquiries per day aate hain. Innhance sab handle karta hai — sales up by 42%."',
    author: 'Priya Menon',
    role: 'Owner, Coastline Stays',
    initials: 'PM',
    stats: ['400+', '+42%'],
    statsLabels: ['Msgs/day', 'Revenue'],
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

export default function Results() {
  const [startCounting, setStartCounting] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartCounting(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="results section-padding" id="results" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="results-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Real Results</div>
          <h2 className="section-heading">
            Numbers that <em className="heading-green">speak for themselves</em>
          </h2>
          <p className="section-subheading">
            Aggregated from 200+ hotels using Innhance to automate WhatsApp bookings over the last 12 months.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} className="testimonial-card" variants={cardVariants}>
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-stats">
                {t.stats.map((stat, j) => (
                  <div key={j} className="testimonial-stat">
                    <div className="testimonial-stat-value">{stat}</div>
                    <div className="testimonial-stat-label">{t.statsLabels[j]}</div>
                  </div>
                ))}
              </div>
              <div className="testimonial-author">
                <div className={`testimonial-avatar avatar-${t.initials.toLowerCase()}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
