import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './LifeAtInnhance.css'

export default function TeamMember({ member }) {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=50%", // Reduced scroll distance for faster transitions
        pin: true,
        scrub: 0.5, // Faster scrub response
      }
    });

    // Entry Sequence
    tl.fromTo(imgRef.current, 
      { scale: 1.5, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(nameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(roleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.2"
    );

    // Removed the empty pause to eliminate scroll gap

    // Exit Sequence
    tl.to(sectionRef.current, {
      opacity: 0,
      y: -50,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.in"
    });

  }, { scope: sectionRef });

  return (
    <section className="member-section" ref={sectionRef}>
      <div className="member-card-wrapper">
        <div className="member-img-box" ref={imgRef}>
          <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
        </div>
        <div className="member-content">
          <h2 className="member-name" ref={nameRef}>{member.name}</h2>
          <p className="member-role" ref={roleRef}>{member.role}</p>
          <p className="member-text" ref={textRef}>{member.text}</p>
        </div>
      </div>
    </section>
  )
}
