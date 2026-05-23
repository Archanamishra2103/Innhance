import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import './ROICalculator.css'

export default function ROICalculator() {
  const { t } = useTranslation()
  const [currency, setCurrency] = useState('INR')
  const [inquiries, setInquiries] = useState(1000)
  const [currentConv, setCurrentConv] = useState(5)
  const [avgValue, setAvgValue] = useState(5000)
  const [staffHours, setStaffHours] = useState(4)
  const [staffCost, setStaffCost] = useState(100)
  const [expectedImp, setExpectedImp] = useState(3)

  // Currency Conversion Handler
  const handleCurrencyChange = (newCurrency) => {
    const toInrRate = { INR: 1, USD: 83, AED: 22.6, EUR: 90 }
    const oldRate = toInrRate[currency]
    const newRate = toInrRate[newCurrency]
    
    setAvgValue(Math.round((avgValue * oldRate) / newRate))
    setStaffCost(Math.round((staffCost * oldRate) / newRate))
    setCurrency(newCurrency)
  }

  // Dynamic Slider Bounds based on Currency
  const getSliderProps = (type) => {
    const toInrRate = { INR: 1, USD: 83, AED: 22.6, EUR: 90 }
    const rate = toInrRate[currency]
    if (type === 'avgValue') {
      return {
        min: Math.max(1, Math.round(1000 / rate)),
        max: Math.round(20000 / rate),
        step: currency === 'INR' ? 500 : 10
      }
    }
    if (type === 'staffCost') {
      return {
        min: Math.max(1, Math.round(50 / rate)),
        max: Math.round(1000 / rate),
        step: currency === 'INR' ? 50 : 2
      }
    }
  }

  // Math
  const currentBookings = (inquiries * currentConv) / 100
  const improvedConv = currentConv + expectedImp
  const improvedBookings = (inquiries * improvedConv) / 100
  const extraBookings = improvedBookings - currentBookings
  const extraMonthlyRev = extraBookings * avgValue
  const extraYearlyRev = extraMonthlyRev * 12
  const monthlyHoursSaved = staffHours * 30 * 0.7
  const monthlyStaffCostSaved = monthlyHoursSaved * staffCost
  const totalMonthlyValue = extraMonthlyRev + monthlyStaffCostSaved

  const formatCurrency = (val) => {
    try {
      if (currency === 'INR') return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)
      if (currency === 'USD') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
      if (currency === 'AED') return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val)
      if (currency === 'EUR') return new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val)
    } catch(e) {
      return val
    }
    return val
  }

  const container = useRef(null)
  useGSAP(() => {
    gsap.from('.roi-anim', {
      y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: container.current, start: 'top 85%' }
    })
  }, { scope: container })

  return (
    <div className="roi-calculator-container" ref={container}>
      <div className="roi-header roi-anim">
        <h3 className="roi-title">{t("roi.title")}</h3>
        <select className="roi-currency-select" value={currency} onChange={(e) => handleCurrencyChange(e.target.value)}>
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="AED">د.إ AED</option>
          <option value="EUR">€ EUR</option>
        </select>
      </div>

      <div className="roi-layout roi-anim">
        <div className="roi-inputs">
          <div className="roi-input-group">
            <div className="roi-label-row">
              <label>{t("roi.monthlyInquiries")}</label>
              <span className="roi-val">{inquiries}</span>
            </div>
            <input type="range" min="100" max="5000" step="100" value={inquiries} onChange={(e) => setInquiries(Number(e.target.value))} />
          </div>

          <div className="roi-input-group">
            <div className="roi-label-row">
              <label>{t("roi.currentConversion")}</label>
              <span className="roi-val">{currentConv}%</span>
            </div>
            <input type="range" min="1" max="20" step="1" value={currentConv} onChange={(e) => setCurrentConv(Number(e.target.value))} />
          </div>

          <div className="roi-input-group">
            <div className="roi-label-row">
              <label>{t("roi.avgBookingValue")}</label>
              <span className="roi-val">{formatCurrency(avgValue)}</span>
            </div>
            <input type="range" {...getSliderProps('avgValue')} value={avgValue} onChange={(e) => setAvgValue(Number(e.target.value))} />
          </div>

          <div className="roi-input-group">
            <div className="roi-label-row">
              <label>{t("roi.expectedImprovement")}</label>
              <span className="roi-val">+{expectedImp}%</span>
            </div>
            <input type="range" min="1" max="15" step="1" value={expectedImp} onChange={(e) => setExpectedImp(Number(e.target.value))} />
          </div>

          <div className="roi-input-group">
            <div className="roi-label-row">
              <label>{t("roi.staffHrsDay")}</label>
              <span className="roi-val">{staffHours}h</span>
            </div>
            <input type="range" min="1" max="12" step="1" value={staffHours} onChange={(e) => setStaffHours(Number(e.target.value))} />
          </div>

          <div className="roi-input-group">
            <div className="roi-label-row">
              <label>{t("roi.staffCostHr")}</label>
              <span className="roi-val">{formatCurrency(staffCost)}</span>
            </div>
            <input type="range" {...getSliderProps('staffCost')} value={staffCost} onChange={(e) => setStaffCost(Number(e.target.value))} />
          </div>
        </div>

        <div className="roi-results">
          <div className="roi-total-card">
            <div className="roi-total-label">{t("roi.estMonthlyValue")}</div>
            <div className="roi-total-value">{formatCurrency(totalMonthlyValue)}</div>
          </div>
          <div className="roi-result-grid">
            <div className="roi-result-card">
              <div className="roi-result-label">{t("roi.extraRevYr")}</div>
              <div className="roi-result-value">{formatCurrency(extraYearlyRev)}</div>
            </div>
            <div className="roi-result-card">
              <div className="roi-result-label">{t("roi.extraBookings")}</div>
              <div className="roi-result-value">+{Math.round(extraBookings)}/{t("roi.mo")}</div>
            </div>
            <div className="roi-result-card">
              <div className="roi-result-label">{t("roi.staffSavings")}</div>
              <div className="roi-result-value">{formatCurrency(monthlyStaffCostSaved)}/{t("roi.mo")}</div>
            </div>
          </div>
        </div>

        <a 
          href="https://api.whatsapp.com/send?phone=919217566814&text=Hello%2C%20I%20want%20to%20see%20the%20demo."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-full roi-cta"
          style={{ textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}
        >
          {t("roi.bookDemo")}
        </a>
        <div className="roi-disclaimer">{t("roi.disclaimer")}</div>
      </div>
    </div>
  )
}
