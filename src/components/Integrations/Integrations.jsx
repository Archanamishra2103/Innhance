import { motion } from 'framer-motion'
import './Integrations.css'

const pmss = ['Mews', 'Cloudbeds', 'Opera', 'Protel', 'Apaleo']
const channels = ['WhatsApp', 'Instagram', 'Facebook', 'Google', 'Website']

export default function Integrations() {
  return (
    <section className="integrations section-padding" id="integrations">
      <div className="container">
        <div className="integrations-header">
          <h2 className="section-heading">
            Connects with your <em>entire tech stack</em>
          </h2>
          <p className="section-subheading">
            Pre-built integrations with 150+ Property Management Systems (PMS) and CRMs. Activate in 48 hours.
          </p>
        </div>

        <div className="integrations-grid">
          {/* Left Block: Channels */}
          <motion.div
            className="integrations-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Omnichannel Presence</h3>
            <p>From social media to search engines, be everywhere your guests are.</p>
            <div className="logo-cloud">
              {channels.map((c, i) => (
                <div key={i} className="logo-pill">{c}</div>
              ))}
            </div>
          </motion.div>

          {/* Right Block: PMS */}
          <motion.div
            className="integrations-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Seamless Syncing</h3>
            <p>Live inventory, dynamic rates, and instant reservations directly logged into your PMS.</p>
            <div className="logo-cloud">
              {pmss.map((p, i) => (
                <div key={i} className="logo-pill dark">{p}</div>
              ))}
              <div className="logo-pill outline">+145 more</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
