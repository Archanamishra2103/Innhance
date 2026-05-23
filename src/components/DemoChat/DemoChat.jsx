import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Bot, X, MessageSquare, ArrowRight, ExternalLink, Send } from 'lucide-react';
import './DemoChat.css';

const PREDEFINED_QUESTIONS = [
  {
    id: 'q1',
    text: 'What is Innhance?',
    answer: 'Innhance helps hotels automate guest communication and manage interactions through AI-powered systems.'
  },
  {
    id: 'q2',
    text: 'How does it help hotels?',
    answer: 'It converts inquiries into confirmed bookings instantly, saving staff time and capturing leads 24/7.'
  },
  {
    id: 'q3',
    text: 'Does it work with WhatsApp?',
    answer: 'Yes. Innhance helps hotels engage guests directly through WhatsApp and simplify communication.'
  },
  {
    id: 'q4',
    text: 'Can it increase bookings?',
    answer: 'Faster replies and automated engagement help improve guest experience and increase conversion opportunities.'
  },
  {
    id: 'q5',
    text: 'How does the AI work?',
    answer: 'The AI understands guest intent, checks live availability, answers FAQs, and shares payment links naturally.'
  }
];

export default function DemoChat({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi 👋 I'm your Innhance AI assistant. Want a quick overview of how Innhance helps hotels?", id: 'm0' }
  ]);
  const [availableChips, setAvailableChips] = useState(PREDEFINED_QUESTIONS);
  const [isTyping, setIsTyping] = useState(false);
  const [showCtas, setShowCtas] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef(null);
  const popupRef = useRef(null);
  const chatBodyRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initial pulse and entry animation removed as it was for the trigger

  // Popup toggle animation
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(popupRef.current, 
        { autoAlpha: 0, scale: 0.95, y: -10, display: 'none' },
        { 
          autoAlpha: 1, 
          scale: 1, 
          y: 0, 
          display: 'flex', 
          duration: 0.4, 
          ease: 'power3.out',
          onStart: () => setTimeout(() => window.ScrollTrigger?.refresh(), 50)
        }
      );
      
      // Shift hero text block and left floaters on desktop, and hide right floater
      if (window.innerWidth > 768) {
        const shiftX = window.innerWidth > 1400 ? -220 : -150;
        gsap.to(document.querySelector('.hero-text-block'), { x: shiftX, duration: 0.5, ease: 'power3.out' });
        gsap.to(document.querySelectorAll('.floater-1, .floater-3'), { x: shiftX, duration: 0.5, ease: 'power3.out' });
        gsap.to(document.querySelector('.floater-2'), { autoAlpha: 0, duration: 0.3 }); // hide right floater
      }
      
      // Animate initial messages/chips
      gsap.fromTo('.chat-msg, .chat-chips', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );
    } else if (popupRef.current) {
      gsap.to(popupRef.current, {
        autoAlpha: 0,
        scale: 0.95,
        y: -10,
        display: 'none',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => window.ScrollTrigger?.refresh()
      });

      // Shift hero text block and floaters back
      if (window.innerWidth > 768) {
        gsap.to(document.querySelector('.hero-text-block'), { x: 0, duration: 0.5, ease: 'power3.out' });
        gsap.to(document.querySelectorAll('.floater-1, .floater-3'), { x: 0, duration: 0.5, ease: 'power3.out' });
        gsap.to(document.querySelector('.floater-2'), { autoAlpha: 1, duration: 0.4, delay: 0.2 });
      }
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, showCtas]);

  // Typing indicator animation
  useGSAP(() => {
    if (isTyping) {
      gsap.fromTo('.typing-indicator', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
      gsap.to('.typing-dot', {
        y: -4,
        duration: 0.4,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, { scope: containerRef, dependencies: [isTyping] });

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { type: 'user', text: userText, id: Date.now() + Math.random() }]);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "I'm a demo bot, but the real Innhance AI handles complex queries like this effortlessly! Want to learn more?", 
        id: Date.now() + Math.random() 
      }]);
      setShowCtas(true);
      setAvailableChips([]);
    }, 1500);
  };

  const handleChipClick = (chip) => {
    // Add user message
    const newUserMsg = { type: 'user', text: chip.text, id: Date.now() + Math.random() };
    setMessages(prev => [...prev, newUserMsg]);
    
    // Calculate new chips synchronously
    const newChips = availableChips.filter(c => c.id !== chip.id);
    setAvailableChips(newChips);
    
    // Show typing
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: chip.answer, id: Date.now() + Math.random() }]);
      
      // If user has clicked 2 questions or no more chips left, show CTAs
      if (newChips.length <= PREDEFINED_QUESTIONS.length - 2 || newChips.length === 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: 'Want to see more?', id: Date.now() + Math.random() }]);
          setShowCtas(true);
          setAvailableChips([]); // clear remaining chips
        }, 800);
      }
    }, 1200);
  };

  return (
    <div className="demo-chat-container" ref={containerRef}>
      
      {/* Popup */}
      <div className="demo-chat-popup" ref={popupRef}>
        <div className="demo-chat-header">
          <div className="demo-chat-header-info">
            <div className="demo-chat-avatar">
              <Bot size={20} />
            </div>
            <div className="demo-chat-title-group">
              <span className="demo-chat-title">AI Assistant</span>
              <span className="demo-chat-status">
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>
          <button className="demo-chat-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
            <X size={20} />
          </button>
        </div>
        
        <div className="demo-chat-body" ref={chatBodyRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-msg demo-msg-${msg.type}`}>
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}

          {!isTyping && !showCtas && availableChips.length > 0 && (
            <div className="chat-chips">
              {availableChips.map(chip => (
                <button 
                  key={chip.id} 
                  className="chat-chip"
                  onClick={() => handleChipClick(chip)}
                >
                  {chip.text}
                </button>
              ))}
            </div>
          )}

          {showCtas && !isTyping && (
            <div className="chat-ctas">
              <button 
                onClick={() => {
                  setShowCtas(false);
                  setAvailableChips(PREDEFINED_QUESTIONS);
                }} 
                className="chat-cta-btn cta-secondary"
              >
                Anything else?
              </button>
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer" className="chat-cta-btn cta-primary">
                Contact on WhatsApp <ExternalLink size={16} />
              </a>
            </div>
          )}

          {!showCtas && (
            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                className="chat-input-field" 
                placeholder="Ask anything..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="chat-send-btn" aria-label="Send">
                <Send size={18} />
              </button>
            </form>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Removed the internal trigger button */}

    </div>
  );
}
