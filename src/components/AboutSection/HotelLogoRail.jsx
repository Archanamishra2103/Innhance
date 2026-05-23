import { useState, useEffect, useRef } from 'react'
import './HotelLogoRail.css'

const hotelLogos = [
  { id: 'bindram', name: "Bindram Hotels", src: "/assets/hotels.img/bindramhotels.jpeg" },
  { id: 'fatehv', name: "Fatehv Hotel", src: "/assets/hotels.img/fatehvhotel.jpeg" },
  { id: 'gables14', name: "Gables 14", src: "/assets/hotels.img/gables14hotel.jpeg" },
  { id: 'garhwal', name: "Garhwal Hotel", src: "/assets/hotels.img/garhwalhotel.jpeg" },
  { id: 'gorbandh', name: "Gorbandh Hotel", src: "/assets/hotels.img/gorbandhhotel.jpeg" },
  { id: 'himalayan', name: "Himalayan Hotel", src: "/assets/hotels.img/himalayanhotel.jpeg" },
  { id: 'hyat', name: "Hyat Hotel", src: "/assets/hotels.img/hyathotel.jpeg" },
  { id: 'kashmir', name: "Kashmir Hotel", src: "/assets/hotels.img/kashmirhotel.jpeg" },
  { id: 'mani', name: "Mani Hotel", src: "/assets/hotels.img/manihotel.jpeg" },
  { id: 'meeram', name: "Meeram Hotel", src: "/assets/hotels.img/meeramhotel.jpeg" },
  { id: 'oldtown', name: "Old Town Hotel", src: "/assets/hotels.img/oldtownhotel.jpeg" },
  { id: 'panambi', name: "Panambi Hotel", src: "/assets/hotels.img/panambihotel.jpeg" },
  { id: 'sevenseas', name: "Seven Seas Hotel", src: "/assets/hotels.img/sevenseashotel.jpeg" },
  { id: 'swarg', name: "Swarg Hotel", src: "/assets/hotels.img/swarghotel.jpeg" },
  { id: 'yogniketan', name: "Yog Niketan", src: "/assets/hotels.img/yogniketanhotel.jpeg" }
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
        <h4 className="hotel-rail-title">TRUSTED BY BOUTIQUE HOTELS ACROSS INDIA</h4>
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
