// export default function ScientistsSection() {
//   // const scientists = [
//   //   { name: "Dr. M. S. Swaminathan", role: "Father of Indian Green Revolution", img: 'https://adyartimes.in/wp-content/uploads/2023/09/2-tribute-MSS.jpeg' },
//   //   { name: "Dr. Verghese Kurien", role: "Pioneer of Operation Flood", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
//   //   { name: "Dr. R. S. Paroda", role: "Architect of Indian Agri-Research", img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80" },
//   //   { name: "Dr. Raj Kumar", role: "Seed Biotechnology Lead", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&q=80" },
//   // ];

//   const scientists = [
//     {
//       name: "Dr. M. S. Swaminathan",
//       role: "Father of Indian Green Revolution",
//       img: "https://adyartimes.in/wp-content/uploads/2023/09/2-tribute-MSS.jpeg",
//       desc: "Revolutionized Indian agriculture through high-yield crop varieties and sustainable farming practices."
//     },
//     {
//       name: "Dr. Verghese Kurien",
//       role: "Father of the White Revolution",
//       img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/Freedom-Science-Tech-%26-Def-Aug_6.jpg?size=690:388",
//       desc: "Empowered millions of Indian farmers through dairy and rural agricultural development."
//     },
//     {
//       name: "Dr. M. Mahadevappa",
//       role: "Seed Technology & Crop Research Expert",
//       img: "https://lh3.googleusercontent.com/proxy/oDkOvytcL9CmgxP0tJNZYFzWfDft6RK7YTA6LEkFO83GtSD0spZ4LSMfi8nFVdgRtQa6O-ztyz56JmTIlXNDm3FkN7YdN2jbNDeOW3gnsGNjyO8D",
//       desc: "Contributed significantly to seed technology advancement and sustainable crop improvement in India."
//     },
//     {
//       name: "Dr. R. S. Paroda",
//       role: "Architect of Modern Indian Agri-Research",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rmHaL1OSaQafmeY0aPzs-yywSBdnmZMPOQ&s",
//       desc: "Strengthened India's agricultural innovation ecosystem and national farming research programs."
//     },
//   ];
//   return (
//     <>
//       <style>{css}</style>
//       <section className="sci-sec">
//         <div className="sci-head">
//           <p className="sci-eyebrow">— Indian Body of Science</p>
//           <h2>Standing on the shoulders of giants</h2>
//           <p className="sci-lead">Our lab is built on the legacy of India's greatest agricultural scientists. We continue their mission with modern genetics, climate-resilient breeding, and farmer-first research — right here, on Indian soil, for Indian farmers.</p>
//         </div>
//         <div className="sci-grid">
//           {scientists.map((s) => (
//             <article key={s.name} className="sci-card">
//               <img src={s.img} alt={s.name} />
//               <div className="sci-meta">
//                 <h4>{s.name}</h4>
//                 <p>{s.role}</p>
//               </div>
//             </article>
//           ))}
//         </div>
//         <div className="sci-lab">
//           <div>
//             <p className="sci-eyebrow">— About our lab</p>

//             <h3>Indigenous research. Global standards.</h3>
//             <p>Our Pune-based seed laboratory operates under ISTA-aligned protocols, partnering with ICAR institutes and state agricultural universities. From genotyping to germination trials, every batch is examined by Indian scientists who understand local soil, monsoon, and farmer needs.</p>
//             <ul>
//               <li>✓ ICAR-aligned testing protocols</li>
//               <li>✓ 12+ regional trial farms across India</li>
//               <li>✓ Climate-resilient varieties for every zone</li>
//               <li>✓ Open partnerships with agricultural universities</li>
//             </ul>
//           </div>
//           <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80" alt="Lab scientist examining seeds" />
//         </div>
//       </section>
//     </>
//   );
// }

// const css = `
// .sci-sec { background: #f5f0e8; color: #0d1208; padding: clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem); font-family: 'DM Sans', sans-serif; }
// .sci-head { max-width: 800px; margin: 0 auto 3.5rem; text-align: center; }
// .sci-eyebrow { font-size: .7rem; letter-spacing: .35em; text-transform: uppercase; color: #3d6b2f; margin: 0 0 1rem; }
// .sci-head h2 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2rem,5vw,3.5rem); line-height: 1.1; margin: 0 0 1.2rem; }
// .sci-lead { font-size: clamp(.95rem,1.4vw,1.1rem); line-height: 1.8; color: #5a4f3e; margin: 0; }
// .sci-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; max-width: 1200px; margin: 0 auto 5rem; }
// @media (max-width: 880px) { .sci-grid { grid-template-columns: repeat(2, 1fr); } }
// @media (max-width: 480px) { .sci-grid { grid-template-columns: 1fr; } }
// .sci-card { background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(13,18,8,.06); }
// .sci-card img { width: 100%; height: 240px; object-fit: cover; filter: grayscale(20%); }
// .sci-meta { padding: 1.3rem 1.2rem; border-top: 3px solid #8cc63f; }
// .sci-meta h4 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 1.1rem; margin: 0 0 .3rem; }
// .sci-meta p { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: #3d6b2f; margin: 0; }
// .sci-lab { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; max-width: 1200px; margin: 0 auto; }
// @media (max-width: 760px) { .sci-lab { grid-template-columns: 1fr; } }
// .sci-lab h3 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(1.8rem,3.5vw,2.6rem); margin: 0 0 1.2rem; }
// .sci-lab p { font-size: .95rem; line-height: 1.85; color: #4a4030; margin: 0 0 1.5rem; }
// .sci-lab ul { list-style: none; padding: 0; margin: 0; }
// .sci-lab li { padding: .6rem 0; border-bottom: 1px solid rgba(140,198,63,.18); color: #3d6b2f; font-size: .9rem; }
// .sci-lab img { width: 100%; height: 480px; object-fit: cover; border-radius: 4px; }
// `;


export default function ScientistsSection() {
  const scientists = [
    {
      name: "Dr. M. S. Swaminathan",
      role: "Father of Indian Green Revolution",
      img: "https://adyartimes.in/wp-content/uploads/2023/09/2-tribute-MSS.jpeg",
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
      <style>{css}</style>
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
            <p className="sci-lab-desc">Our Pune-based seed laboratory operates under ISTA-aligned protocols, partnering with ICAR institutes and state agricultural universities. From genotyping to germination trials, every batch is examined by Indian scientists who understand local soil, monsoon, and farmer needs.</p>
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

const css = `
.sci-sec { 
  background: #0e140d !important; 
  color: #ffffff !important; 
  padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem); 
  font-family: 'DM Sans', sans-serif; 
}

.sci-sec h2, .sci-sec h3, .sci-sec h4 { 
  color: #ffffff !important; 
}

.sci-head { 
  max-width: 950px; 
  margin: 0 auto clamp(3rem, 6vw, 4.5rem); 
  text-align: center; 
}

.sci-eyebrow { 
  font-size: 11px !important; 
  letter-spacing: 0.4em !important; 
  text-transform: uppercase; 
  color: #527845 !important; 
  margin: 0 0 2.2rem !important; 
  font-weight: 500;
}

.sci-head h2 { 
  font-family: 'Playfair Display', serif; 
  font-weight: 400; 
  font-size: clamp(2.8rem, 6.5vw, 5.2rem); 
  line-height: 1.15; 
  margin: 0 0 2rem; 
  letter-spacing: -0.01em;
}

.sci-head h2 em, .sci-lab h3 em {
  font-style: italic;
  color: #89bd65 !important;
}

.sci-lead { 
  font-size: clamp(1rem, 1.6vw, 1.35rem) !important; 
  line-height: 1.7; 
  color: rgba(255, 255, 255, 0.65) !important; 
  margin: 0 auto;
  font-weight: 300;
  max-width: 800px;
}

.sci-grid { 
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 1.5rem; 
  max-width: 1200px; 
  margin: 0 auto 5rem; 
}

@media (max-width: 880px) { .sci-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .sci-grid { grid-template-columns: 1fr; } }

.sci-card { 
  background: #151e13; 
  border-radius: 4px; 
  overflow: hidden; 
  box-shadow: 0 4px 24px rgba(0,0,0,.3); 
}

.sci-card img { 
  width: 100%; 
  height: 240px; 
  object-fit: cover; 
}

.sci-meta { 
  padding: 1.3rem 1.2rem; 
  border-top: 3px solid #527845; 
}

.sci-meta h4 { 
  font-family: 'Playfair Display', serif; 
  font-weight: 400; 
  font-size: 1.2rem; 
  margin: 0 0 .5rem; 
}

.sci-meta p { 
  font-size: .75rem !important; 
  letter-spacing: .1em; 
  text-transform: uppercase; 
  color: rgba(255, 255, 255, 0.5) !important; 
  margin: 0; 
}

.sci-lab { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 3rem; 
  align-items: center; 
  max-width: 1200px; 
  margin: 0 auto; 
}

@media (max-width: 760px) { .sci-lab { grid-template-columns: 1fr; } }

.sci-lab h3 { 
  font-family: 'Playfair Display', serif; 
  font-weight: 400; 
  line-height: 1.25; /* 👈 Add this line here */
  font-size: clamp(2rem, 4vw, 3rem); 
  margin: 0 0 2.5rem; 
}

.sci-lab-desc { 
  font-size: clamp(0.95rem, 1.4vw, 1.1rem) !important; 
  line-height: 1.8; 
  color: rgba(255, 255, 255, 0.65) !important; 
  margin: 0 0 1.5rem; 
}

.sci-lab ul { 
  list-style: none; 
  padding: 0; 
  margin: 0 0 2rem 0; 
}

.sci-lab li { 
  padding: .6rem 0; 
  border-bottom: 1px solid rgba(255,255,255,.1); 
  color: #89bd65 !important; 
  font-size: .95rem; 
}

.sci-lab img { 
  width: 100%; 
  height: 480px; 
  object-fit: cover; 
  border-radius: 4px; 
}
`;