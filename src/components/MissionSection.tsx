export default function MissionSection() {
  const values = [
    { icon: "🌱", title: "Honesty in Science", text: "Every claim backed by data. Every trial published openly." },
    { icon: "🤝", title: "Farmer First", text: "We listen before we sell. The field is our boardroom." },
    { icon: "🌾", title: "Climate Resilience", text: "Breeding seeds that thrive in tomorrow's weather." },
    { icon: "♻️", title: "Sustainability", text: "From packaging to logistics — gentle on the earth." },
    { icon: "📚", title: "Knowledge Sharing", text: "Free agronomy training for every partner farmer." },
    { icon: "💚", title: "Integrity", text: "Transparent pricing, honest labels, no shortcuts." },
  ];
  return (
    <>
      <style>{css}</style>
      <section className="ms-sec">
        <div className="ms-inner">
          <div className="ms-head">
            <p className="ms-eyebrow">— Mission & Core Values</p>
            <h2>Why we wake up every morning</h2>
          </div>
          <div className="ms-mission">
            <div>
              <h3>Our Mission</h3>
              <p>To put a high-yield, climate-resilient, scientifically-tested seed into the hand of every Indian farmer — and to make sure that seed is a story they're proud to plant.</p>
            </div>
            <div>
              <h3>Our Vision</h3>
              <p>A India where no field goes hungry, no farmer is left guessing, and every harvest carries the dignity of honest science behind it.</p>
            </div>
          </div>
          <div className="ms-values">
            {values.map((v) => (
              <div key={v.title} className="ms-card">
                <div className="ms-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const css = `
.ms-sec { background: #f5f0e8; color: #0d1208; padding: clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem); font-family: 'DM Sans', sans-serif; }
.ms-inner { max-width: 1200px; margin: 0 auto; }
.ms-head { text-align: center; max-width: 700px; margin: 0 auto 3rem; }
.ms-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin: 0 0 1rem; }
.ms-head h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2rem,5vw,3.5rem); margin: 0; line-height: 1.1; color: #0d1208; }
.ms-mission { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 4rem; }
@media (max-width: 760px) { .ms-mission { grid-template-columns: 1fr; } }
.ms-mission > div { padding: 2.5rem; background: #fff; border-left: 3px solid #8cc63f; border-radius: 0; }
.ms-mission h3 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.8rem; margin: 0 0 1rem; color: #0d1208; }
.ms-mission p { font-size: 1rem; line-height: 1.8; color: #5a4f3e; margin: 0; }
.ms-values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
@media (max-width: 880px) { .ms-values { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .ms-values { grid-template-columns: 1fr; } }
.ms-card { padding: 2rem 1.5rem; background: #fff; border: 1px solid #e8dcc8; border-radius: 4px; transition: transform .3s, border-color .3s; }
.ms-card:hover { transform: translateY(-4px); border-color: #8cc63f; }
.ms-icon { font-size: 2rem; margin-bottom: .8rem; }
.ms-card h4 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.2rem; margin: 0 0 .6rem; color: #0d1208; }
.ms-card p { font-size: .9rem; line-height: 1.7; color: #5a4f3e; margin: 0; }
`;