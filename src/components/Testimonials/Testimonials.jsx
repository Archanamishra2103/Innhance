import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const tweenRef = useRef(null);

  const testimonials = t('testimonials_section.items', { returnObjects: true }) || [];
  // Duplicate the array to create a seamless loop
  const loopData = [...testimonials, ...testimonials];

  useGSAP(() => {
    // Highly attractive modern SaaS header reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testi-header",
        start: "top 80%",
      }
    });

    tl.from(".testi-avatar", {
      scale: 0,
      opacity: 0,
      x: -20,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.5)"
    })
    .from(".testi-avatar-count", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.5)"
    }, "-=0.4")
    .from(".testi-title-word", {
      y: 40,
      filter: "blur(10px)",
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.6")
    .from(".sparkle-icon", {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(2)"
    }, "-=0.8")
    .from(".testi-subtitle", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "all"
    }, "-=0.6");
    
    // Continuous floating for sparkles
    gsap.to(".sparkle-1", {
      y: -8,
      rotation: 10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(".sparkle-2", {
      y: 8,
      rotation: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // The total width of all original items is exactly 50% of the looped track
    // We animate from 0 to -50% to make it seamless
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 160, // Slower duration to account for double the items (from 80)
      repeat: -1
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    }
  }, { scope: containerRef, dependencies: [i18n.language, loopData.length] });

  useEffect(() => {
    if (tweenRef.current) {
      if (selectedCardIndex !== null) {
        tweenRef.current.pause();
      } else {
        tweenRef.current.play();
      }
    }
  }, [selectedCardIndex]);

  const handleCardClick = (index) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null); // Deselect if clicking again
    } else {
      setSelectedCardIndex(index);
    }
  };

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`testi-card-${index}`);
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle 3D rotation based on mouse position
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`testi-card-${index}`);
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.6
    });
  };

  const handleScrollPrev = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        time: tweenRef.current.time() - 8,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleScrollNext = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        time: tweenRef.current.time() + 8,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  return (
    <section className="testimonials-section section-padding" id="testimonials" ref={containerRef} key={`testi-${i18n.language}`}>
      <div className="container-custom">
        <div className="testi-header">
          <div className="testi-avatar-group">
            <div className="testi-avatar" style={{backgroundImage: "url('/assets/hotels.img/fatehvhotel.jpeg')"}}></div>
            <div className="testi-avatar" style={{backgroundImage: "url('/assets/hotels.img/gorbandhhotel.jpeg')"}}></div>
            <div className="testi-avatar" style={{backgroundImage: "url('/assets/hotels.img/himalayanhotel.jpeg')"}}></div>
            <div className="testi-avatar-count">50+</div>
          </div>
          <h2 className="testi-title">
            <span className="testi-title-word title-dark">{t("testimonials_section.heading1")}</span>
            <br/>
            <span className="testi-title-word title-gradient-wrap">
              <span className="title-gradient">{t("testimonials_section.heading2")}</span>
              <svg className="sparkle-icon sparkle-1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fdfcf0" strokeWidth="1"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fdfcf0"/></svg>
              <svg className="sparkle-icon sparkle-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fdfcf0" strokeWidth="1"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fdfcf0"/></svg>
            </span>
          </h2>
          <p className="testi-subtitle">{t("testimonials_section.subtitle")}</p>
        </div>
      </div>

      <div className="testimonials-carousel-wrapper">
        <button className="testi-nav-arrow testi-prev" onClick={handleScrollPrev} aria-label="Previous testimonial">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="testi-nav-arrow testi-next" onClick={handleScrollNext} aria-label="Next testimonial">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div className="fade-mask fade-mask-left"></div>
        <div className="fade-mask fade-mask-right"></div>
        
        <div className="testimonials-track" ref={trackRef}>
          {loopData.map((item, index) => {
            const isSelected = selectedCardIndex === index;
            return (
              <div 
                key={index}
                id={`testi-card-${index}`} 
                className={`testimonial-card ${item.featured ? 'featured-card' : ''} ${isSelected ? 'selected-card' : ''}`}
                onClick={() => handleCardClick(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="card-top">
                  {item.category ? <span className="testi-category">{item.category}</span> : <div></div>}
                  <div className="quote-icon">"</div>
                </div>
                <p className="testi-quote">{item.quote}</p>
                <div className="testi-author-block">
                  <div className="author-avatar">{item.initials}</div>
                  <div className="author-info">
                    <h4 className="author-name">{item.author}</h4>
                    <p className="author-location">{item.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
