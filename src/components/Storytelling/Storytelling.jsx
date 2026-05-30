import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import data from '../../data/innhanceData.json'
import './Storytelling.css'

export default function Storytelling() {
  const { t } = useTranslation()
  const panels = t('storytelling.panels', { returnObjects: true })

  return (
    <section className="comic-section page-entry-anim" id="about">
      <div className="container-custom">
        <div className="comic-header-wrapper">
          <h2 className="comic-sp-title">
            {t("storytelling.headerLine1")}
            <br />
            <span className="comic-sp-badge">
              {t("storytelling.headerBadge")}
            </span>
          </h2>
        </div>

        <div className="swiper-parent-mock">
          <div className="story-nav-arrow story-nav-prev" aria-label="Previous story">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </div>
          <div className="story-nav-arrow story-nav-next" aria-label="Next story">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            navigation={{
              prevEl: '.story-nav-prev',
              nextEl: '.story-nav-next',
            }}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            simulateTouch={true}
            className="comic-swiper overflow-unset"
          >
            {panels.map((panel, idx) => (
              <SwiperSlide key={idx} className="comic-panel-slide">
                <div className="comic-strip-panel-sp">
                  <div className="panel-illustration-sp">
                    <img
                      src={data.storytelling[idx]?.image}
                      alt={panel.heading}
                      className="panel-img-main"
                      loading="lazy"
                      decoding="async"
                    />
                    {panel.stage && <div className="panel-badge-sp">{panel.stage}</div>}
                    {panel.dialogue && (
                      <div className="panel-speech-bubble-sp">
                        "{panel.dialogue}"
                        <div className="bubble-tail-sp"></div>
                      </div>
                    )}
                  </div>
                  <div className="panel-text-sp">
                    <h3 className="panel-heading-sp">{panel.heading}</h3>
                    <p className="panel-description-sp">{panel.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
