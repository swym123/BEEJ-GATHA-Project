export default function MissionSection() {
  return (
    <>
      <style>{css}</style>
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

const css = `
  /* Clean Premium Background Theme */
  .ms-layout-wrapper {
    width: 100%;
    background-color: #f5f0e8; /* Perfectly matches your site's cream palette */
    color: #0d1208;
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
    /* Large top padding completely protects your text headers from the fixed navbar */
    padding: 160px 2rem 7rem 2rem; 
  }

  .ms-container-shield {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* Centered Intro Headers */
  .ms-head { 
    text-align: center; 
    max-width: 700px; 
    margin: 0 auto 4.5rem auto; 
  }
  
  .ms-eyebrow { 
    font-size: .75rem; 
    letter-spacing: .35em; 
    text-transform: uppercase; 
    color: #3d6b2f; 
    margin: 0 0 1rem 0; 
    font-weight: 700;
  }
  
  .ms-head h2 { 
    font-family: 'Playfair Display', serif; 
    font-weight: 400; 
    font-size: clamp(2.2rem, 5vw, 3.5rem); 
    margin: 0; 
    line-height: 1.2; 
    color: #0d1208; 
  }

  /* Side-by-Side Statement Cards (Desktop Row, Mobile Column) */
  .ms-split-statements {
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    margin-bottom: 6rem;
    width: 100%;
  }

  .ms-statement-card {
    flex: 1;
    width: 50%;
    background: #ffffff; /* Crisp contrast white card over the cream canvas */
    padding: 3.5rem 3rem;
    border-radius: 8px;
    border: 1px solid #e8dcc8;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgba(13, 18, 8, 0.01);
  }

  .ms-accent-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #8cc63f; /* Premium solid top accent border line */
    border-radius: 8px 8px 0 0;
  }

  .ms-statement-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 400;
    margin: 0 0 1.25rem 0;
    color: #0d1208;
  }

  .ms-statement-card p {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #5a4f3e;
    margin: 0;
  }

  /* Pillars Grid Framework Section */
  .ms-pillars-section {
    width: 100%;
    margin-top: 2rem;
  }

  .ms-grid-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 400;
    margin-bottom: 3.5rem;
    color: #0d1208;
    text-align: center;
  }

  .ms-pillars-matrix {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;
  }

  /* Premium Box Container Cards instead of simple open un-bordered layouts */
  .ms-pillar-card {
    background: #ffffff;
    border: 1px solid #e8dcc8;
    border-radius: 6px;
    padding: 2.5rem 2rem;
    position: relative;
    box-sizing: border-box;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
  }

  .ms-pillar-card:hover {
    transform: translateY(-5px);
    border-color: #8cc63f;
    box-shadow: 0 12px 30px rgba(61, 107, 47, 0.05);
  }

  .ms-pillar-num {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: #8cc63f;
    letter-spacing: 0.1em;
    margin-bottom: 0.8rem;
  }

  .ms-pillar-card h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0 0 0.8rem 0;
    color: #0d1208;
  }

  .ms-pillar-card p {
    font-size: 0.98rem;
    line-height: 1.7;
    color: #5a4f3e;
    margin: 0;
  }

  /* ── Responsive Mobile Adaptations ── */
  @media (max-width: 960px) {
    .ms-pillars-matrix {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .ms-split-statements {
      gap: 1.5rem;
    }
    .ms-statement-card {
      padding: 2.5rem 2rem;
    }
  }

  @media (max-width: 768px) {
    .ms-split-statements {
      flex-direction: column;
      gap: 2rem;
    }
    .ms-statement-card {
      width: 100%;
    }
    .ms-layout-wrapper {
      padding-top: 130px; /* Adapts height dynamically for tablet viewports */
    }
  }

  @media (max-width: 520px) {
    .ms-layout-wrapper {
      padding: 110px 1.25rem 4rem 1.25rem;
    }
    .ms-pillars-matrix {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .ms-head h2, .ms-grid-section-title {
      font-size: 2rem;
    }
  }
`;