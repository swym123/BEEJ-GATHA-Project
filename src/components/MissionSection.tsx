import './MissionSection.css'

export default function MissionSection() {
  return (
    <>
      <section className="ms-layout-wrapper">
        <div className="ms-container-shield">

          {/* Centered Intro Section with clean spacing away from the Navbar */}
          <div className="ms-head">
            <p className="ms-eyebrow">— Mission & Core Values</p>
            <h2>Why we wake up every morning</h2>
          </div>

          {/* ── Mission & Vision Side-by-Side row blocks ── */}
          <div className="ms-split-statements">
            <div className="ms-statement-card">
              <div className="ms-accent-line" />
              <h3>Our Mission</h3>
              <p>To put a high-yield, climate-resilient, scientifically-tested seed into the hand of every Indian farmer — and to ensure that seed represents a sustainable future they are genuinely proud to plant.</p>
            </div>

            <div className="ms-statement-card">
              <div className="ms-accent-line" />
              <h3>Our Vision</h3>
              <p>An India where no field goes hungry, no grower is left guessing, and every successful harvest carries the uncompromised structural dignity of honest agricultural science behind it.</p>
            </div>
          </div>

          {/* ── Core Values Layout Grid ── */}
          <div className="ms-pillars-section">
            <h3 className="ms-grid-section-title">Our Strategic Pillars</h3>

            <div className="ms-pillars-matrix">

              <div className="ms-pillar-card">
                <span className="ms-pillar-num">01</span>
                <h4>Genomic Integrity</h4>
                <p>Leveraging precision molecular markers to isolate premium drought and disease-tolerant traits cleanly.</p>
              </div>

              <div className="ms-pillar-card">
                <span className="ms-pillar-num">02</span>
                <h4>Honest Agronomy</h4>
                <p>Every seed variety is backed by transparent field data and multi-season localized trial reporting.</p>
              </div>

              <div className="ms-pillar-card">
                <span className="ms-pillar-num">03</span>
                <h4>Soil & Soul Resilience</h4>
                <p>Breeding climate-resilient cultivars engineered specifically to thrive in tomorrow's unpredictable weather zones.</p>
              </div>

              <div className="ms-pillar-card">
                <span className="ms-pillar-num">04</span>
                <h4>Multi-Location Testing</h4>
                <p>Before commercial production, all crops undergo rigorous testing profiles across diverse Indian ecologies.</p>
              </div>

              <div className="ms-pillar-card">
                <span className="ms-pillar-num">05</span>
                <h4>Direct Field Support</h4>
                <p>We don't just supply seeds; our agronomists work directly on-site with farmers to ensure continuous crop success.</p>
              </div>

              <div className="ms-pillar-card">
                <span className="ms-pillar-num">06</span>
                <h4>Dignified Science</h4>
                <p>Empowering Indian agriculture with the absolute confidence of zero-shortcut research and honest logistics.</p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

