import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'
import './LanguageSwitcher.css'

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: 'EN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: 'HI' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: 'ES' },
  { code: 'fr', name: 'French', native: 'Français', flag: 'FR' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: 'AR' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: 'DE' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: 'ID' },
]

export default function LanguageSwitcher({ mobile = false }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className={`lang-switcher ${mobile ? 'lang-switcher-mobile' : ''}`} ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={16} className="lang-globe-icon" />
        <span className="lang-current">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`lang-chevron ${open ? 'rotated' : ''}`} />
      </button>

      {open && (
        <div className={`lang-dropdown ${mobile ? 'lang-dropdown-mobile' : ''}`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => handleChange(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.native}</span>
              <span className="lang-code">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
