import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";
import type { ProductItem } from "../data/products";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";





export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  // --- RULE OF HOOKS: All hooks must remain at the very top ---

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = INITIAL_FALLBACK_PRODUCTS.find((p) => p.id === parseInt(id ?? ""));
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);

  // Derived image array used inside our navigation triggers safely
  const photosData = product?.photos && product.photos.length > 0
    ? product.photos
    : product ? [product.img, product.img, product.img] : [];

  useEffect(() => {
    if (photosData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % photosData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [photosData.length]);

  const scrollPrev = useCallback(() => {
    if (photosData.length === 0) return;
    setCurrent((c) => (c - 1 + photosData.length) % photosData.length);
  }, [photosData.length]);

  const scrollNext = useCallback(() => {
    if (photosData.length === 0) return;
    setCurrent((c) => (c + 1) % photosData.length);
  }, [photosData.length]);

  // --- EARLY RETURNS: Safe to use now that all hooks have fired ---

  if (loading) {
    return <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh", background: "#f5f0e8" }}>Loading...</div>;
  }

  if (!product) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh", background: "#f5f0e8" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: "1rem" }}>Product not found</h2>
        <Link to="/product" style={{ color: "#3d6b2f", fontWeight: 600 }}>← Return to Products</Link>
      </div>
    );
  }

  const fullDesc = product.fullDesc ?? product.desc;

  return (
    <>
      <style>{css}</style>
      <main className="pdetail-page">

        <div className="pdetail-hero">
          <div className="pdetail-container">
            <button className="pdetail-back" onClick={() => navigate("/product")}>
              ← Back to Catalog
            </button>
            <div className="pdetail-header">
              <div className="pdetail-tags">
                <span className="pdetail-cat">{product.category}</span>
                <span className={"pdetail-badge pdetail-badge-" + product.badge}>{product.tag}</span>
              </div>
              <h1>{product.icon} {product.name}</h1>
              <p className="pdetail-code">Product Code: {product.code}</p>
            </div>
          </div>
        </div>

        <div className="pdetail-container pdetail-content">
          <div className="pdetail-main">
            <div className="pdetail-gallery-wrapper">
              <div className="pdetail-carousel">
                <div
                  className="pdetail-carousel-track"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {photosData.map((photo, idx) => (
                    <div key={idx} className="pdetail-carousel-slide">
                      <div
                        className="pdetail-img-slide"
                        style={{ backgroundImage: `url('${photo}')` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {photosData.length > 1 && (
                <>
                  <button className="pdetail-arrow pdetail-arrow-prev" onClick={scrollPrev} aria-label="Previous image">←</button>
                  <button className="pdetail-arrow pdetail-arrow-next" onClick={scrollNext} aria-label="Next image">→</button>

                  <div className="pdetail-dots">
                    {photosData.map((_, idx) => (
                      <button
                        key={idx}
                        className={"pdetail-dot" + (idx === current ? " active" : "")}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="pdetail-description">
              <h2>About {product.name}</h2>
              <p>{fullDesc}</p>
            </div>
          </div>

          <aside className="pdetail-sidebar">
            <div className="pdetail-specs-card">
              <h3>Agronomic Specifications</h3>
              <ul className="pdetail-specs-list">
                <li>
                  <span>Yield Potential</span>
                  <strong>{product.yield}</strong>
                </li>
                <li>
                  <span>Maturity Duration</span>
                  <strong>{product.maturity}</strong>
                </li>
                <li>
                  <span>Disease Resistance</span>
                  <strong>{product.resistance}</strong>
                </li>
                <li>
                  <span>Sowing Season</span>
                  <strong>{product.season ?? "Kharif & Rabi"}</strong>
                </li>
                <li>
                  <span>Plant Spacing</span>
                  <strong>{product.spacing ?? "Standard spacing"}</strong>
                </li>
              </ul>
              <Link to={`/contact?inquiry=${product.code}`} className="pdetail-enquire">
                Enquire Now →
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

const css = `
.pdetail-page {
  background: #f5f0e8;
  color: #0d1208;
  font-family: 'DM Sans', sans-serif;
  padding-top: 80px;
  min-height: 100vh;
}

.pdetail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

/* Hero */
.pdetail-hero {
  padding: 3rem 0;
  border-bottom: 1px solid #e8dcc8;
  margin-bottom: 3rem;
}

.pdetail-back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #5a4f3e;
  font-size: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 2rem;
  font-family: 'DM Sans', sans-serif;
  transition: color 0.2s;
}
.pdetail-back:hover { color: #3d6b2f; }

.pdetail-tags {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.pdetail-cat {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8c7e6a;
}

.pdetail-badge {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: 100px;
}
.pdetail-badge-green { background: #dcfce7; color: #166534; }
.pdetail-badge-blue  { background: #dbeafe; color: #1e40af; }
.pdetail-badge-amber { background: #fef3c7; color: #92400e; }

.pdetail-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  color: #0d1208;
}

.pdetail-code {
  color: #8c7e6a;
  font-size: 1rem;
  letter-spacing: 0.05em;
}

/* Layout Grid Configuration */
.pdetail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  padding-bottom: 6rem;
  align-items: start;
}
@media (max-width: 900px) {
  .pdetail-content { grid-template-columns: 1fr; gap: 3rem; }
}

/* Gallery Elements */
.pdetail-gallery-wrapper {
  position: relative;
  margin-bottom: 3rem;
}

.pdetail-carousel {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.07);
}

.pdetail-carousel-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.pdetail-carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
}

.pdetail-img-slide {
  background-size: cover;
  background-position: center;
  height: 480px;
  width: 100%;
}
@media (max-width: 600px) {
  .pdetail-img-slide { height: 260px; }
}

/* Carousel Control Elements */
.pdetail-arrow {
  position: absolute;
  top: calc(240px - 22px);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e8dcc8;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #3d6b2f;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.2s;
}
.pdetail-arrow:hover { background: #8cc63f; color: #fff; border-color: #8cc63f; }
.pdetail-arrow-prev { left: -22px; }
.pdetail-arrow-next { right: -22px; }

@media (max-width: 600px) {
  .pdetail-arrow { display: none; }
}

/* Dot Navigation Strings */
.pdetail-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.pdetail-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #d0c9bc;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}
.pdetail-dot.active {
  background: #3d6b2f;
  transform: scale(1.3);
}

/* Technical Descriptions text wrappers */
.pdetail-description h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  margin: 0 0 1.5rem;
  color: #000000ff;

}
.pdetail-description p {
  font-size: 1.05rem;
  line-height: 1.85;
  color: #5a4f3e;
}

/* Sidebar Informative Layout Spec-Card styles */
.pdetail-specs-card {
  background: #fff;
  border: 1px solid #e8dcc8;
  border-radius: 12px;
  padding: 2.5rem;
  position: sticky;
  top: 100px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
}
.pdetail-specs-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  margin: 0 0 1.5rem;
  font-weight: 400;
  border-bottom: 1px solid #e8dcc8;
  padding-bottom: 1rem;
}

.pdetail-specs-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.pdetail-specs-list li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.pdetail-specs-list span {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8c7e6a;
}
.pdetail-specs-list strong {
  font-size: 1rem;
  font-weight: 600;
  color: #0d1208;
}

.pdetail-enquire {
  display: block;
  width: 100%;
  background: #3d6b2f;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'DM Sans', sans-serif;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
}
.pdetail-enquire:hover { background: #8cc63f; }

@media (max-width: 600px) {
  .pdetail-specs-card { padding: 1.5rem; }
}
`;