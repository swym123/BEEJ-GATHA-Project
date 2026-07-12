import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";

// Centralizing configuration constants
const CATEGORIES = ["All", "Cereal", "Pulse", "Vegetable", "Oilseed", "Forage"];
export default function Product() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  // ✅ Dynamic local state for products initialized as an empty array
  const liveProducts = INITIAL_FALLBACK_PRODUCTS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Computed array processes filtration over the dynamic live state list
  const filtered = liveProducts.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const name = String(p.name || "").toLowerCase();
    const code = String(p.code || "").toLowerCase();
    const desc = String(p.desc || "").toLowerCase();
    const searchTerm = query.toLowerCase();

    const matchQ =
      query === "" ||
      name.includes(searchTerm) ||
      code.includes(searchTerm) ||
      desc.includes(searchTerm);

    return matchCat && matchQ;
  });

  return (
    <>
      <style>{css}</style>
      <div className="pd-page animate-fade-in">
        <section className="pd-hero">
          <div className="pd-hero-inner">
            <p className="pd-eyebrow">— Our Seed Catalog</p>
            <h1>High-Yield Genetics</h1>
            <p className="pd-sub">
              Explore our hybrid seed varieties bred specifically to thrive in Indian climates and soil types.
            </p>
          </div>
        </section>

        <section className="pd-toolbar-sec">
          <div className="pd-container">
            <div className="pd-toolbar">
              <div className="pd-cats">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={"pd-cat-btn" + (active === c ? " active" : "")}
                    onClick={() => setActive(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="pd-search-wrap">
                <span className="pd-search-icon">🔍</span>
                <input
                  className="pd-search"
                  type="search"
                  placeholder="Search by name, category, or SKU..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pd-grid-sec">
          <div className="pd-container">
            {filtered.length === 0 ? (
              <div className="pd-empty">No products match your search.</div>
            ) : (
              <div className="pd-grid">
                {filtered.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="pd-card-wrapper">
                    <div className="pd-card-img" style={{ backgroundImage: `url('${p.img}')` }}>
                      <span className={"pd-tag pd-tag-" + p.badge}>{p.tag}</span>
                    </div>
                    <div className="pd-card-body">
                      <div className="pd-card-top">
                        <span className="pd-cat-pill">{p.category}</span>
                        <span className="pd-code">{p.code}</span>
                      </div>
                      <h2>{p.name}</h2>
                      <p className="pd-card-desc">{p.desc}</p>
                      <div className="pd-card-action">
                        <span>View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

const css = `
.pd-page { font-family: 'DM Sans', sans-serif; color: #0d1208; background: #fdfcf9; }
.pd-hero { position: relative; background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%); color: #f5f0e8; padding: 10rem 1.5rem 6rem; text-align: center; }
.pd-eyebrow { font-size: .75rem; letter-spacing: .4em; text-transform: uppercase; color: #8cc63f; margin: 0 0 1rem; }
.pd-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.5rem, 6vw, 4.5rem); margin: 0 0 1rem; line-height: 1.1; color: #f5f0e8; }
.pd-sub { font-size: clamp(1rem, 2vw, 1.25rem); color: rgba(245, 240, 232, 0.7); max-width: 600px; margin: 0 auto; line-height: 1.6; }
.pd-container { max-width: 1200px; margin: 0 auto; }
.pd-toolbar-sec { padding: 3rem 1.5rem 0; }
.pd-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; border-bottom: 1px solid #e8dcc8; padding-bottom: 2rem; }
.pd-cats { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.pd-cat-btn { font-family: 'DM Sans', sans-serif; background: #fff; border: 1px solid #e8dcc8; border-radius: 100px; padding: 0.5rem 1.2rem; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all .25s; color: #5a4f3e; }
.pd-cat-btn:hover { border-color: #8cc63f; color: #3d6b2f; }
.pd-cat-btn.active { background: #3d6b2f; border-color: #3d6b2f; color: #fff; }
.pd-search-wrap { position: relative; min-width: 320px; }
@media (max-width: 600px) { .pd-search-wrap { min-width: 100%; } }
.pd-search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: #8c7e6a; }
.pd-search { font-family: 'DM Sans', sans-serif; width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid #e8dcc8; border-radius: 100px; background: #fff; outline: none; font-size: 0.9rem; color: #0d1208; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
.pd-search:focus { border-color: #8cc63f; box-shadow: 0 0 0 3px rgba(140, 198, 63, 0.1); }
.pd-grid-sec { padding: 4rem 1.5rem 6rem; }
.pd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
@media (max-width: 992px) { .pd-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .pd-grid { grid-template-columns: 1fr; } }
.pd-card-wrapper { background: #fff; border: 1px solid #e8dcc8; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; display: flex; flex-direction: column; text-decoration: none; }
.pd-card-wrapper:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(13, 18, 8, 0.05); border-color: #8cc63f; }
.pd-card-img { height: 400px; background-size: cover; background-position: center; position: relative; }
.pd-tag { position: absolute; top: 1rem; left: 1rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.3rem 0.7rem; border-radius: 4px; }
.pd-tag-green { background: #e8f5e9; color: #2e7d32; }
.pd-tag-blue { background: #e3f2fd; color: #1565c0; }
.pd-tag-amber { background: #fff8e1; color: #ff8f00; }
.pd-card-body { padding: 2rem; flex-grow: 1; display: flex; flex-direction: column; }
.pd-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.pd-cat-pill { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #3d6b2f; letter-spacing: 0.05em; }
.pd-code { font-size: 0.75rem; font-weight: 700; color: #8c7e6a; }
.pd-card-body h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin: 0 0 0.8rem; color: #0d1208; font-weight: 400; }
.pd-card-desc { font-size: 0.9rem; line-height: 1.6; color: #5a4f3e; margin: 0 0 1.5rem; flex-grow: 1; }
.pd-card-action { font-size: 0.8rem; font-weight: 700; color: #3d6b2f; text-transform: uppercase; letter-spacing: 0.05em; margin-top: auto; }
.pd-empty { text-align: center; font-size: 1.1rem; color: #8c7e6a; padding: 4rem 0; grid-column: 1 / -1; }
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;