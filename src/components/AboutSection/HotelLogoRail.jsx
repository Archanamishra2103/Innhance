import { useState, useEffect, useRef } from 'react'
import './HotelLogoRail.css'

const hotelLogos = [
  { id: 'bindram', name: "Bindram Hotels", src: "/assets/hotels.img/bindramhotels.webp" },
  { id: 'fatehv', name: "Fatehv Hotel", src: "/assets/hotels.img/fatehvhotel.webp" },
  { id: 'gables14', name: "Gables 14", src: "/assets/hotels.img/gables14hotel.webp" },
  { id: 'garhwal', name: "Garhwal Hotel", src: "/assets/hotels.img/garhwalhotel.webp" },
  { id: 'gorbandh', name: "Gorbandh Hotel", src: "/assets/hotels.img/gorbandhhotel.webp" },
  { id: 'himalayan', name: "Himalayan Hotel", src: "/assets/hotels.img/himalayanhotel.webp" },
  { id: 'hyat', name: "Hyat Hotel", src: "/assets/hotels.img/hyathotel.webp" },
  { id: 'kashmir', name: "Kashmir Hotel", src: "/assets/hotels.img/kashmirhotel.webp" },
  { id: 'mani', name: "Mani Hotel", src: "/assets/hotels.img/manihotel.webp" },
  { id: 'meeram', name: "Meeram Hotel", src: "/assets/hotels.img/meeramhotel.webp" },
  { id: 'oldtown', name: "Old Town Hotel", src: "/assets/hotels.img/oldtownhotel.webp" },
  { id: 'panambi', name: "Panambi Hotel", src: "/assets/hotels.img/panambihotel.webp" },
  { id: 'sevenseas', name: "Seven Seas Hotel", src: "/assets/hotels.img/sevenseashotel.webp" },
  { id: 'swarg', name: "Swarg Hotel", src: "/assets/hotels.img/swarghotel.webp" },
  { id: 'yogniketan', name: "Yog Niketan", src: "/assets/hotels.img/yogniketanhotel.webp" }
]

export default function HotelLogoRail() {
  const [selectedLogoId, setSelectedLogoId] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const railRef = useRef(null)

  // Duplicate the array to create a seamless infinite loop
  const duplicatedLogos = [...hotelLogos, ...hotelLogos]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (railRef.current && !railRef.current.contains(e.target)) {
        setSelectedLogoId(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLogoClick = (e, id) => {
    e.stopPropagation() // Prevent triggering the outside click
    if (selectedLogoId === id) {
      setSelectedLogoId(null) // Unselect if clicked again
    } else {
      setSelectedLogoId(id)
    }
  }

  const isPaused = isHovered || selectedLogoId !== null

  return (
    <section className="hotel-rail-section">
      <div className="hotel-rail-header">
        <h3 className="hotel-rail-title">TRUSTED BY BOUTIQUE HOTELS ACROSS INDIA</h3>
      </div>
      
      <div 
        className="hotel-rail-viewport" 
        ref={railRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`hotel-rail-track ${isPaused ? 'paused' : ''}`}>
          {duplicatedLogos.map((hotel, index) => {
            const isSelected = selectedLogoId === hotel.id
            return (
              <div 
                key={`${hotel.id}-${index}`} 
                className={`hotel-logo-card ${isSelected ? 'selected' : ''}`}
                onClick={(e) => handleLogoClick(e, hotel.id)}
              >
                <div className="hotel-logo-img-wrapper">
                  <img src={hotel.src} alt={hotel.name} className="hotel-logo-img" loading="lazy" />
                </div>
                {isSelected && (
                  <div className="hotel-logo-tooltip">
                    {hotel.name}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
