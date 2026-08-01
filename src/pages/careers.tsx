import { useEffect } from "react";
import './careers.css'

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
    }
  ];

  return (
    <>

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
        <section className="contact-sec">
          <div className="careers-container">
            <h2 className="contact-title">Contact Us</h2>
            <p className="contact-email">Email: <a href="mailto:contact@beejgatha.com">contact@beejgatha.com</a></p>
            <p className="contact-phone">Office No. Gujarat: 9805205293</p>
            <p className="contact-phone">Office No. Rajasthan: 9772086003</p>
          </div>
        </section>
      </div>
    </>
  );
}

