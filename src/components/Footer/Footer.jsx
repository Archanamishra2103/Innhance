import { Bot, MapPin, Mail, ArrowRight } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './Footer.css'

export default function Footer({ setCurrentView }) {
  return (
    <footer className="footer-cito">
      <div className="container-custom">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/logo.jpeg" alt="Innhance Logo" className="logo-img" />
              <span className="logo-text">{data.company.name}</span>
            </div>
            <p className="footer-desc">
              {data.company.description}
            </p>
          </div>
      </div>    
          
      

        <div className="footer-links-grid">
          <div className="flink-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features" onClick={() => setCurrentView('home')}>Features</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#pricing" onClick={() => setCurrentView('home')}>Pricing</a></li>
            </ul>
          </div>
          <div className="flink-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="flink-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setCurrentView('about'); window.scrollTo(0,0); }}>About Us</a></li>
              <li><a href="#life" onClick={(e) => { e.preventDefault(); setCurrentView('life'); window.scrollTo(0,0); }}>Life At Innhance</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="flink-col contact-col">
            <h4>Contact</h4>
            <ul>
              <li><Mail size={16}/> {data.company.email}</li>
              <li><MapPin size={16}/> {data.company.location}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Innhance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
