import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Blog.css'

gsap.registerPlugin(ScrollTrigger)

export default function Blog() {
  const { t } = useTranslation()
  const container = useRef(null)
  
  useGSAP(() => {
    gsap.from('.blog-header > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    })

    gsap.from('.blog-card', {
      scrollTrigger: {
        trigger: '.blog-grid',
        start: 'top 85%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
  }, { scope: container })
  
  const blogPosts = [
    {
      id: 1,
      title: "How AI is Revolutionizing Boutique Hotel Bookings in 2026",
      excerpt: "Discover how conversational AI is eliminating the 'Silence Tax' and capturing overnight leads that hotels previously lost to OTAs.",
      date: "Oct 12, 2026",
      readTime: "5 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Ultimate Guide to WhatsApp Marketing for Resorts",
      excerpt: "WhatsApp has become the primary channel for Indian guests. Learn the best practices for engaging your audience and driving direct bookings.",
      date: "Sep 28, 2026",
      readTime: "7 min read",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1551882547-ff40c0d1398c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Why Zero-Commission Direct Bookings are the Future",
      excerpt: "Stop paying 15-25% to OTAs. We explore strategies top independent hotels are using to reclaim their margins through direct channels.",
      date: "Sep 15, 2026",
      readTime: "4 min read",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1542314831-c6a420325142?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <section className="blog-section section-padding" id="blog" ref={container}>
      <div className="blog-bg-grid"></div>
      <div className="blog-blob blog-blob-1"></div>
      <div className="blog-blob blog-blob-2"></div>

      <div className="container-custom relative-z">
        <div className="blog-header">
          <div className="blog-badge"><Sparkles size={16} /> Latest Insights</div>
          <h1 className="blog-title">
            The Innhance <span className="blog-title-highlight">Journal</span>
          </h1>
          <p className="blog-subtitle">
            Insights, strategies, and updates from the intersection of hospitality and artificial intelligence.
          </p>
        </div>

        <div className="blog-grid-wrapper">
          <div className="blog-grid blur-effect">
            {blogPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-image" loading="lazy" decoding="async" />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                    <span className="meta-item"><Clock size={14} /> {post.readTime}</span>
                  </div>
                  <h3 className="blog-post-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <a href="#" className="read-more-btn" onClick={(e) => e.preventDefault()}>
                    Read Article <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="coming-soon-overlay">
            <h2 className="coming-soon-text">Coming Soon</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
