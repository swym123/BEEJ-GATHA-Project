import { useEffect } from "react";
import MissionSection from "../components/MissionSection";

export default function Mission() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="mission-page animate-fade-in">
        <section className="mission-hero">
          <div className="mission-hero-inner">
            <p className="mission-eyebrow">— Our Mission & Vision</p>
            <h1>Science for Soil & Soul</h1>
            <p className="mission-sub">
              Dedicating our research, labs, and fieldwork to building a prosperous, climate-resilient future for Indian agriculture.
            </p>
          </div>
        </section>

        {/* Reuse the existing MissionSection component for alignment */}
        <MissionSection />

        <section className="research-pillars">
          <div className="pillars-container">
            <div className="pillars-header">
              <h2>Our Strategic Pillars</h2>
              <p>How we ensure scientific excellence translates directly to real-world crop success.</p>
            </div>

            <div className="pillars-grid">
              <div className="pillar-card">
                <span className="pillar-num">01</span>
                <h3>Genomic Selection</h3>
                <p>We leverage molecular markers to identify traits for drought resistance, disease tolerance, and nutrient efficiency, cutting down breeding cycles by years.</p>
              </div>

              <div className="pillar-card">
                <span className="pillar-num">02</span>
                <h3>Multi-Location Testing</h3>
                <p>Before any seed reaches commercial production, it undergoes rigorous multi-season trials across different soil profiles and weather zones in India.</p>
              </div>

              <div className="pillar-card">
                <span className="pillar-num">03</span>
                <h3>Direct Agronomy Support</h3>
                <p>We don't just sell seeds; we send expert agronomists to fields. We share best practices, soil health advice, and crop-cycle guidelines directly.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const css = `
.mission-page {
  font-family: 'DM Sans', sans-serif;
  color: #0d1208;
  background: #fdfcf9;
}

.mission-hero {
  position: relative;
  background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%);
  color: #f5f0e8;
  padding: 10rem 1.5rem 6rem;
  text-align: center;
}

.mission-eyebrow {
  font-size: .75rem;
  letter-spacing: .4em;
  text-transform: uppercase;
  color: #8cc63f;
  margin: 0 0 1rem;
}

.mission-hero h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin: 0 0 1rem;
  line-height: 1.1;
  color: #f5f0e8;
}

.mission-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(245, 240, 232, 0.7);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.research-pillars {
  padding: 6rem 1.5rem;
  background: #fff;
  border-top: 1px solid #e8dcc8;
}

.pillars-container {
  max-width: 1200px;
  margin: 0 auto;
}

.pillars-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.pillars-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin: 0 0 1rem;
  color: #0d1208;
}

.pillars-header p {
  color: #5a4f3e;
  font-size: 1rem;
  line-height: 1.6;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

@media (max-width: 868px) {
  .pillars-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.pillar-card {
  padding: 2.5rem;
  background: #fdfcf9;
  border: 1px solid #e8dcc8;
  border-radius: 4px;
  position: relative;
  transition: border-color 0.3s, transform 0.3s;
}

.pillar-card:hover {
  border-color: #8cc63f;
  transform: translateY(-4px);
}

.pillar-num {
  font-family: 'Outfit', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: rgba(140, 198, 63, 0.15);
  position: absolute;
  top: 1rem;
  right: 1.5rem;
}

.pillar-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: #0d1208;
  position: relative;
  z-index: 1;
}

.pillar-card p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #5a4f3e;
  margin: 0;
  position: relative;
  z-index: 1;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
`;
