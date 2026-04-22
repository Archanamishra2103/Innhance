import React, { useRef } from "react";
import "./LifeAtInnhance.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const teamData = [
  {
    name: "Arnav",
    role: "Founder",
    image: "/assets/pics.LAI/arnav.jpeg",
    text: "Runs on ideas, ambition, and somehow… zero sleep\n24×7 mode is not a phase, it’s the lifestyle"
  },
  {
    name: "Khushi",
    role: "Growth Partner",
    image: "/assets/pics.LAI/khushi.jpeg",
    text: "Coffee first, strategy later\nIf coffee stops, growth stops"
  },
  {
    name: "Harsh",
    role: "Full Stack Dev",
    image: "/assets/pics.LAI/harsh.jpeg",
    text: "“Technically possible” is his love language\nBuilds things we didn’t even know we needed"
  },
  {
    name: "Alankrita",
    role: "Sales",
    image: "/assets/pics.LAI/alankrita.jpeg",
    text: "Always on a call or about to be on one\nCold calls but warm conversions"
  },
  {
    name: "Archana",
    role: "Frontend",
    image: "/assets/pics.LAI/archana.jpeg",
    text: "Night owl energy\nUI gets better after 2 AM"
  }
];

export default function LifeAtInnhance() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".member-section");

    sections.forEach((section, i) => {
      const isLeft = section.classList.contains("left");

      // smoother card entry
      gsap.from(section.querySelector(".member-card-wrapper"), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        }
      });

      // image pop
      gsap.from(section.querySelector(".member-img-box"), {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        }
      });

      // text slide
      gsap.from(section.querySelector(".member-content"), {
        x: isLeft ? 80 : -80,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        }
      });

      // subtle stacking
      if (i > 0) {
        gsap.to(sections[i - 1], {
          scale: 0.96,
          opacity: 0.7,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            scrub: true,
          }
        });
      }
    });

    // hero animation
    gsap.from(".hero-title", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      }
    });

    gsap.from(".hero-highlight", {
      scale: 0,
      rotation: -15,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",

      transformOrigin: "center",

      onComplete: () => {
        // small bounce after stamp
        gsap.to(".hero-highlight", {
          scale: 1.05,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        });
      }
    });
    gsap.from(".meet-text", {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top 80%",
      }
    });

    gsap.to(".meet-text", {
      y: -6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    const particles = gsap.utils.toArray(".particle");

    particles.forEach((p) => {
      const size = gsap.utils.random(6, 16);
      const startX = gsap.utils.random(0, window.innerWidth);
      const startY = gsap.utils.random(0, window.innerHeight);
      const driftX = gsap.utils.random(-80, 80);
      const driftY = gsap.utils.random(-140, -60);
      const duration = gsap.utils.random(3, 6);
      const delay = gsap.utils.random(0, 2);
      const scale = gsap.utils.random(0.6, 1.4);

      gsap.set(p, {
        width: size,
        height: size,
        x: startX,
        y: startY,
        scale,
        opacity: gsap.utils.random(0.35, 1),
      });

      gsap.to(p, {
        x: `+=${driftX}`,
        y: `+=${driftY}`,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(p, {
        opacity: gsap.utils.random(0.25, 1),
        duration: gsap.utils.random(1.5, 3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    const memberParticles = gsap.utils.toArray(".member-particle");

     memberParticles.forEach((p) => {
      gsap.set(p, {
        x: gsap.utils.random(0, 800),
        y: gsap.utils.random(0, 400),
        scale: gsap.utils.random(0.5, 1.2),
        opacity: gsap.utils.random(0.3, 0.8),
      });

      gsap.to(p, {
        x: "+=" + gsap.utils.random(-60, 60),
        y: "+=" + gsap.utils.random(-80, 80)  ,
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

  }, { scope: containerRef });

  return (
    <div className="life-container" ref={containerRef}>

      {/* INTRO */}
      <section className="hero-section">
         <div className="particles">
          {Array.from({ length: 35 }).map((_, i) => (
             <span key={i} className="particle"></span>
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-title meet-text">Meet</h1>
          <div className="hero-highlight">TEAM INNHANCE</div>
        </div>
      </section>

      {/* TEAM */}
      {teamData.map((member, i) => (
        <section
          key={i}
          className={`member-section ${i % 2 === 0 ? "left" : "right"}`}
        >
          <div className="member-particles">
                {Array.from({ length: 12 }).map((_, j) => (
              <span key={j} className="member-particle"></span>
            ))}
          </div>

          <div className="member-card-wrapper">

            <div className="member-img-box">
              <img src={member.image} alt={member.name} />
            </div>

            <div className="member-content">
              <p className="member-role">{member.role}</p>
              <h2 className="member-name">{member.name}</h2>
              <p className="member-text">{member.text}</p>
            </div>

          </div>
        </section>
      ))}

      {/* FINAL */}
      <section className="hero-section">
        <div className="particles">
          {Array.from({ length: 45 }).map((_, i) => (
             <span key={i} className="particle"></span>
          ))}
        </div>  
        <div className="hero-content">
          <h1 className="hero-title"></h1>

          {/* 👇 wrap inside box */}
          <div className="hero-image-box">
            <img 
                src="/assets/pics.LAI/team.jpeg" 
              alt="Hero"
            />
          </div>

          <div className="hero-highlight">This is Innhance</div>
       </div>
      </section> 

    </div>
  );
}