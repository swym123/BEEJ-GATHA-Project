import { useEffect } from "react";
import MissionSection from "../components/MissionSection";
import './mission.css'

export default function Mission() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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