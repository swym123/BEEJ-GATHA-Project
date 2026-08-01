import './ScientistsSection.css'

export default function ScientistsSection() {
  const scientists = [
    {
      name: "Dr. M. S. Swaminathan",
      role: "Father of Indian Green Revolution",
      img: "https://mlpyskbirng6.i.optimole.com/cb:qf7c.e96c/w:372/h:418/q:mauto/g:sm/f:best/https://www.iwmi.org/wp-content/uploads/2023/10/MS-Swaminathan-2.jpg",
      desc: "Revolutionized Indian agriculture through high-yield crop varieties and sustainable farming practices."
    },
    {
      name: "Dr. Verghese Kurien",
      role: "Father of the White Revolution",
      img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/Freedom-Science-Tech-%26-Def-Aug_6.jpg?size=690:388",
      desc: "Empowered millions of Indian farmers through dairy and rural agricultural development."
    },
    {
      name: "Dr. M. Mahadevappa",
      role: "Seed Technology & Crop Research Expert",
      img: "https://lh3.googleusercontent.com/proxy/oDkOvytcL9CmgxP0tJNZYFzWfDft6RK7YTA6LEkFO83GtSD0spZ4LSMfi8nFVdgRtQa6O-ztyz56JmTIlXNDm3FkN7YdN2jbNDeOW3gnsGNjyO8D",
      desc: "Contributed significantly to seed technology advancement and sustainable crop improvement in India."
    },
    {
      name: "Dr. R. S. Paroda",
      role: "Architect of Modern Indian Agri-Research",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rmHaL1OSaQafmeY0aPzs-yywSBdnmZMPOQ&s",
      desc: "Strengthened India's agricultural innovation ecosystem and national farming research programs."
    },
  ];

  return (
    <>

      <section className="sci-sec">
        <div className="sci-head">
          <p className="sci-eyebrow">Vision in Motion</p>
          <h2>Standing on the shoulders of <em>giants</em></h2>
          <p className="sci-lead">Our lab is built on the legacy of India's greatest agricultural scientists. We continue their mission with modern genetics, climate-resilient breeding, and farmer-first research — right here, on Indian soil, for Indian farmers.</p>
        </div>
        <div className="sci-grid">
          {scientists.map((s) => (
            <article key={s.name} className="sci-card">
              <img src={s.img} alt={s.name} />
              <div className="sci-meta">
                <h4>{s.name}</h4>
                <p>{s.role}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="sci-lab">
          <div>
            <p className="sci-eyebrow">About our lab</p>
            <h3>Indigenous research. <em>Global standards.</em></h3>
            <p className="sci-lab-desc">Our Gujarat-based seed laboratory operates under ISTA-aligned protocols, partnering with ICAR institutes and state agricultural universities. From genotyping to germination trials, every batch is examined by Indian scientists who understand local soil, monsoon, and farmer needs.</p>
            <ul>
              <li>✓ ICAR-aligned testing protocols</li>
              <li>✓ 12+ regional trial farms across India</li>
              <li>✓ Climate-resilient varieties for every zone</li>
              <li>✓ Open partnerships with agricultural universities</li>
            </ul>
          </div>
          {/* <img src="https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/6d144592-1d2e-4107-9439-a5056d9f519b/0.webp?format=500w" alt="Lab scientist examining seeds" /> */}
          <img src="https://images.stockcake.com/public/9/6/f/96f43d6a-2059-4e31-9beb-9860268bd331_large/laboratory-plant-growth-stockcake.jpg"></img>
        </div>
      </section>
    </>
  );
}

