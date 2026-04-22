import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import data from '../../data/innhanceData.json'
import './Storytelling.css'
//  import testImg from "../../assets/about.pics/test.jpeg";
console.log(data.storytelling[0].image)

export default function Storytelling() {
  return (
    <section className="comic-section page-entry-anim" id="about">
      <div className="container-custom">
        {/* Exact Replica of the Header DOM from screenshot */}
        <div className="comic-header-wrapper">
          <h2 className="comic-sp-title">
            "How It All Started: "
            <br />
            <span className="comic-sp-badge">
              The Beginning of Innhance
            </span>
          </h2>
        </div>

        {/* Replica of the swiper-parent DOM */}
        <div className="swiper-parent-mock">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50} // Matches `margin-right: 50px`
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            simulateTouch={true}
            className="comic-swiper overflow-unset"
          >
            {data.storytelling.map((panel, idx) => (
              <SwiperSlide key={idx} className="comic-panel-slide">
                <div className="comic-strip-panel-sp">

                  {/* Illustration / Image Slot (top) */}
                  <div className="panel-illustration-sp">
                    {/* 👇 ADD YOUR IMAGE URL HERE 👇 */}
                    {console.log(panel)}
                    <img
                      src={panel.image}
                      alt={panel.heading}
                      className="panel-img-main"
                    />

                    <div className="panel-badge-sp">{panel.stage}</div>

                    {/* Speech bubble style text */}
                    {panel.dialogue && (
                      <div className="panel-speech-bubble-sp">
                        "{panel.dialogue}"
                        <div className="bubble-tail-sp"></div>
                      </div>
                    )}
                  </div>

                  {/* Text Content Block */}
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
