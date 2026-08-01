import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";
import './product.css'

// Centralizing configuration constants
const CATEGORIES = ["All", "Cereal", "Pulse", "Vegetable", "Oilseed", "Forage"];
export default function Product() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");


  const liveProducts = INITIAL_FALLBACK_PRODUCTS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

