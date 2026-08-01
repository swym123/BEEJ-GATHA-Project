import { useEffect } from "react";
import ScientistsSection from "../components/ScientistsSection";
import './about.css'
export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
