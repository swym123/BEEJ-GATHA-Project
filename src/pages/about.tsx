import { useEffect } from "react";
import ScientistsSection from "../components/ScientistsSection";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="about-page animate-fade-in">
        <section className="about-hero">
          <div className="about-hero-inner">
            <p className="about-eyebrow">— Who We Are</p>
            <h1>Roots in Science</h1>
            <p className="about-sub">
              Combining world-class laboratory genomics with deep local extension farming experience to write India's next agricultural chapter.
            </p>
          </div>
        </section>

        <section className="story-sec">
          <div className="about-container">
            <div className="story-grid">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Founded in Pune by a collective of plant geneticists and veteran agricultural extension officers, Beej Gatha was born from a simple observation: Indian farmers are dealing with 21st-century climate challenges using seed technologies that haven't kept pace.
                </p>
                <p>
                  We believe that the best agricultural solutions are created when molecular biology labs are closely connected to actual farming fields. We work directly with soil, testing crop varieties over multiple seasons to ensure resilience and high productivity.
                </p>
              </div>
              <div className="story-stats-card">
                <div className="stat-item">
                  <span className="stat-val">12k+</span>
                  <span className="stat-lbl">Farmers Partnered</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">45+</span>
                  <span className="stat-lbl">Seed Trials Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">4</span>
                  <span className="stat-lbl">Indian States Covered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse the existing scientists team section */}
        <ScientistsSection />
      </div>
    </>
  );
}

const css = `
.about-page {
  font-family: 'DM Sans', sans-serif;
  color: #0d1208;
  background: #fdfcf9;
}

.about-hero {
  position: relative;
  background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%);
  color: #f5f0e8;
  padding: 10rem 1.5rem 6rem;
  text-align: center;
}

.about-eyebrow {
  font-size: .75rem;
  letter-spacing: .4em;
  text-transform: uppercase;
  color: #8cc63f;
  margin: 0 0 1rem;
}

.about-hero h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin: 0 0 1rem;
  line-height: 1.1;
  color: #f5f0e8;
}

.about-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(245, 240, 232, 0.7);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.story-sec {
  padding: 6rem 1.5rem;
  background: #fff;
}

.about-container {
  max-width: 1100px;
  margin: 0 auto;
}

.story-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 860px) {
  .story-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.story-text h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin: 0 0 1.5rem;
  color: #0d1208;
}

.story-text p {
  font-size: 1rem;
  line-height: 1.8;
  color: #5a4f3e;
  margin: 0 0 1.5rem;
}

.story-text p:last-child {
  margin-bottom: 0;
}

.story-stats-card {
  background: #fdfcf9;
  border: 1px solid #e8dcc8;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 4px;
}

.stat-item {
  border-bottom: 1px solid rgba(232, 220, 200, 0.6);
  padding-bottom: 1rem;
}

.stat-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.stat-val {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: #3d6b2f;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.stat-lbl {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8c7e6a;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
`;