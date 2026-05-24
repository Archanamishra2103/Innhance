import { useTranslation } from 'react-i18next'
import { MapPin, Mail } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './Footer.css'

export default function Footer({ setCurrentView }) {
  const { t } = useTranslation()
  return (
    <footer className="footer-cito">
      <div className="container-custom">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/logo.webp" alt="Innhance Logo" className="logo-img" loading="lazy" decoding="async" />
              <span className="logo-text">{data.company.name}</span>
            </div>
            <p className="footer-desc">{t("footer.companyDescription")}</p>
          </div>
      </div>    

        <div className="footer-links-grid">
          <div className="flink-col">
            <h3>{t("footer.product")}</h3>
            <ul>
              <li><a href="#features" onClick={() => setCurrentView('home')}>{t("footer.featuresLink")}</a></li>
              <li><a href="#pricing" onClick={() => setCurrentView('home')}>{t("footer.pricingLink")}</a></li>
            </ul>
          </div>
          <div className="flink-col">
            <h3>{t("footer.resources")}</h3>
            <ul>
              <li><a href="#blog" onClick={(e) => { e.preventDefault(); setCurrentView('blog'); window.scrollTo(0,0); }}>{t("footer.blog")}</a></li>
            </ul>
          </div>
          <div className="flink-col">
            <h3>{t("footer.company")}</h3>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setCurrentView('about'); window.scrollTo(0,0); }}>{t("footer.aboutUs")}</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); setCurrentView('privacy'); window.scrollTo(0,0); }}>{t("footer.privacyPolicy")}</a></li>
            </ul>
          </div>
          <div className="flink-col contact-col">
            <h3>{t("footer.contact")}</h3>
            <ul>
              <li><Mail size={16}/> {data.company.email}</li>
              <li><MapPin size={16}/> {data.company.location}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}
