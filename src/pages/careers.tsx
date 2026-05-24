import { useEffect } from "react";

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobs = [
    {
      title: "Senior Research Scientist (Plant Genetics)",
      department: "R&D Lab",
      location: "Pune, Maharashtra",
      type: "Full-Time",
      description: "Lead marker-assisted selection programs for drought and salt tolerance in oilseed/mustard crops. Ph.D. in Genetics/Plant Breeding required."
    },
    {
      title: "Regional Agronomy Manager",
      department: "Field Operations",
      location: "Indore, Madhya Pradesh",
      type: "Full-Time",
      description: "Manage farm demonstration trials and supervise a team of district agronomists. Requires 5+ years of extension service experience."
    },
    {
      title: "Quality Assurance Specialist",
      department: "Seed Lab & Quality Control",
      location: "Aurangabad, Maharashtra",
      type: "Full-Time",
      description: "Oversee moisture, physical purity, and germination testing parameters. Maintain ISTA and national certification documentation."
    }
  ];

  return (
    <>
      <style>{css}</style>
      <div className="careers-page animate-fade-in">
        <section className="careers-hero">
          <div className="careers-hero-inner">
            <p className="careers-eyebrow">— Join the Journey</p>
            <h1>Grow Your Career with Us</h1>
            <p className="careers-sub">
              Work at the intersection of genomic science and rural development. Help us feed millions with better seeds.
            </p>
          </div>
        </section>

        <section className="careers-why-sec">
          <div className="careers-container">
            <div className="why-grid">
              <div className="why-card">
                <span className="why-icon">🧪</span>
                <h3>Impactful Science</h3>
                <p>We do research that ends up in fields, not just in academic journals. See your breeding lines feed families.</p>
              </div>
              <div className="why-card">
                <span className="why-icon">🌾</span>
                <h3>Farmer Empowerment</h3>
                <p>Work directly with farming collectives, listening to their problems to design real products.</p>
              </div>
              <div className="why-card">
                <span className="why-icon">💚</span>
                <h3>Ethical Environment</h3>
                <p>We pride ourselves on transparent, honest data. No corporate shortcuts, just solid biology and care.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="openings-sec">
          <div className="careers-container">
            <h2 className="openings-title">Current Open Positions</h2>
            
            <div className="jobs-list">
              {jobs.map((j, i) => (
                <div key={i} className="job-card">
                  <div className="job-meta">
                    <span className="job-dept">{j.department}</span>
                    <span className="job-loc">{j.location}</span>
                    <span className="job-type">{j.type}</span>
                  </div>
                  <h3>{j.title}</h3>
                  <p>{j.description}</p>
                  <a href="/contact" className="job-apply">Apply For Role →</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const css = `
.careers-page {
  font-family: 'DM Sans', sans-serif;
  color: #0d1208;
  background: #fdfcf9;
}

.careers-hero {
  position: relative;
  background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%);
  color: #f5f0e8;
  padding: 10rem 1.5rem 6rem;
  text-align: center;
}

.careers-eyebrow {
  font-size: .75rem;
  letter-spacing: .4em;
  text-transform: uppercase;
  color: #8cc63f;
  margin: 0 0 1rem;
}

.careers-hero h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin: 0 0 1rem;
  line-height: 1.1;
}

.careers-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(245, 240, 232, 0.7);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.careers-why-sec {
  padding: 5rem 1.5rem;
  background: #fff;
}

.careers-container {
  max-width: 1000px;
  margin: 0 auto;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .why-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.why-card {
  text-align: center;
  padding: 2rem 1.5rem;
  border: 1px solid #e8dcc8;
  border-radius: 4px;
  background: #fdfcf9;
}

.why-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 1rem;
}

.why-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin: 0 0 0.8rem;
  color: #0d1208;
}

.why-card p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #5a4f3e;
  margin: 0;
}

.openings-sec {
  padding: 6rem 1.5rem;
  border-top: 1px solid #e8dcc8;
}

.openings-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  text-align: center;
  margin: 0 0 3.5rem;
  color: #0d1208;
}

.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job-card {
  background: #fff;
  border: 1px solid #e8dcc8;
  border-radius: 6px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.01);
  transition: border-color 0.3s, transform 0.3s;
}

.job-card:hover {
  border-color: #8cc63f;
  transform: translateY(-2px);
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.job-meta span {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

.job-dept {
  background: rgba(61, 107, 47, 0.1);
  color: #3d6b2f;
}

.job-loc {
  background: rgba(140, 198, 63, 0.15);
  color: #3d6b2f;
}

.job-type {
  background: rgba(13, 18, 8, 0.05);
  color: #0d1208;
}

.job-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  margin: 0 0 0.8rem;
  color: #0d1208;
}

.job-card p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #5a4f3e;
  margin: 0 1.5rem 1.5rem 0;
}

.job-apply {
  font-size: 0.8rem;
  font-weight: 700;
  color: #3d6b2f;
  text-decoration: none;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s;
}

.job-apply:hover {
  color: #8cc63f;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
`;
