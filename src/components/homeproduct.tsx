import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";
import type { ProductItem } from "../data/products";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPhotos(p: ProductItem): string[] {
  if (p.photos && p.photos.length > 0) return p.photos;
  return [p.img, p.img, p.img];
}

const CATEGORIES = ["All", "Cereal", "Pulse", "Vegetable", "Oilseed", "Forage"];
const SWIPE_THRESHOLD = 50;

// ─── Modal Component ──────────────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
}: {
  product: ProductItem;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const touchRef = useRef<{ startX: number | null }>({ startX: null });
  const photos = getPhotos(product);

  const prev = useCallback(
    () => setSlide((s) => (s - 1 + photos.length) % photos.length),
    [photos.length],
  );
  const next = useCallback(
    () => setSlide((s) => (s + 1) % photos.length),
    [photos.length],
  );

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current.startX === null) return;
    const diff = touchRef.current.startX - e.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) next();
    else if (diff < -SWIPE_THRESHOLD) prev();
    touchRef.current.startX = null;
  };

  return (
    <div className="hps-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="hps-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="hps-modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="hps-modal-inner">
          {/* Image slider */}
          <div
            className="hps-modal-img-wrap"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="hps-modal-track"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="hps-modal-slide"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>

            {photos.length > 1 && (
              <>
                <button className="hps-modal-arrow hps-modal-arrow--l" onClick={prev} aria-label="Previous">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="hps-modal-arrow hps-modal-arrow--r" onClick={next} aria-label="Next">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className="hps-modal-dots">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      className={`hps-modal-dot${i === slide ? " hps-modal-dot--active" : ""}`}
                      onClick={() => setSlide(i)}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badge overlay */}
            <span className={`hps-modal-badge hps-modal-badge--${product.badge}`}>
              {product.tag}
            </span>
          </div>

          {/* Info panel */}
          <div className="hps-modal-info">
            <p className="hps-modal-category">{product.category}</p>
            <h2 className="hps-modal-title">{product.name}</h2>
            <p className="hps-modal-code">
              SKU: <strong>{product.code}</strong>
            </p>

            <div className="hps-modal-divider" />

            {product.desc && (
              <p className="hps-modal-desc">{product.desc}</p>
            )}

            <div className="hps-modal-actions">
              <Link
                to={`/contact?inquiry=${product.code}`}
                className="hps-modal-enquire"
              >
                <span>Enquire Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to={`/product/${product.id}`}
                className="hps-modal-full-link"
                onClick={onClose}
              >
                Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function HomeProductSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const [visible, setVisible] = useState(6); // load more pattern
  const sectionRef = useRef<HTMLElement>(null);

  // Animate cards in on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("hps-card--in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    const cards = sectionRef.current?.querySelectorAll(".hps-card");
    cards?.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [activeCategory, query, visible]);

  const filtered = INITIAL_FALLBACK_PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const term = query.toLowerCase();
    const matchQ =
      !term ||
      String(p.name ?? "").toLowerCase().includes(term) ||
      String(p.code ?? "").toLowerCase().includes(term) ||
      String(p.desc ?? "").toLowerCase().includes(term);
    return matchCat && matchQ;
  });

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      <style>{css}</style>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}

      <section className="hps-section" ref={sectionRef}>

        {/* ── Section Header ── */}
        <div className="hps-header">
          <p className="hps-eyebrow">— Seed Catalog</p>
          <h2 className="hps-heading">
            Our <em>Varieties</em>
          </h2>
          <p className="hps-subhead">
            Bred for Indian soil. Click any variety to explore it here.
          </p>
        </div>

        {/* ── Filters + Search ── */}
        <div className="hps-toolbar">
          <div className="hps-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`hps-cat${activeCategory === c ? " hps-cat--active" : ""}`}
                onClick={() => { setActiveCategory(c); setVisible(6); }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="hps-search-wrap">
            <svg className="hps-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="hps-search"
              type="search"
              placeholder="Search by name or SKU…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(6); }}
            />
          </div>
        </div>

        {/* ── Grid ── */}
        {shown.length === 0 ? (
          <div className="hps-empty">No varieties match — try a different filter.</div>
        ) : (
          <>
            <div className="hps-grid">
              {shown.map((p, i) => (
                <button
                  key={p.id}
                  className="hps-card"
                  style={{ animationDelay: `${(i % 3) * 0.07}s` }}
                  onClick={() => setSelected(p)}
                  aria-label={`View details for ${p.name}`}
                >
                  {/* Image */}
                  <div
                    className="hps-card-img"
                    style={{ backgroundImage: `url('${p.img}')` }}
                  >
                    <span className={`hps-badge hps-badge--${p.badge}`}>{p.tag}</span>
                    <div className="hps-card-img-overlay" />
                  </div>

                  {/* Body */}
                  <div className="hps-card-body">
                    <div className="hps-card-meta">
                      <span className="hps-card-cat">{p.category}</span>
                      <span className="hps-card-code">{p.code}</span>
                    </div>
                    <h3 className="hps-card-name">{p.name}</h3>
                    {p.desc && (
                      <p className="hps-card-desc">{p.desc}</p>
                    )}
                    <div className="hps-card-cta">
                      <span>Quick View</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="hps-load-wrap">
                <button
                  className="hps-load-btn"
                  onClick={() => setVisible((v) => v + 6)}
                >
                  Show more varieties ({filtered.length - visible} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Bottom CTA ── */}
        <div className="hps-bottom-cta">
          <Link to="/product" className="hps-full-catalog">
            Browse full catalog
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </section>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const css = `
/* ── Section shell ── */
.hps-section {
  background: #0d1208;
  padding: 6rem 1.5rem 5rem;
  position: relative;
  overflow: hidden;
}
.hps-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 10% 0%, rgba(140,198,63,.07) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 100%, rgba(61,107,47,.09) 0%, transparent 55%);
  pointer-events: none;
}

/* ── Header ── */
.hps-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3.5rem;
}
.hps-eyebrow {
  font-size: .7rem;
  letter-spacing: .4em;
  text-transform: uppercase;
  color: #8cc63f;
  margin: 0 0 1rem;
}
.hps-heading {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.1;
  color: #f5f0e8;
  margin: 0 0 1rem;
}
.hps-heading em {
  font-style: italic;
  color: #8cc63f;
}
.hps-subhead {
  font-size: .95rem;
  line-height: 1.7;
  color: rgba(245,240,232,.5);
  margin: 0;
}

/* ── Toolbar ── */
.hps-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(245,240,232,.08);
}
.hps-cats {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}
.hps-cat {
  font-family: 'DM Sans', sans-serif;
  font-size: .78rem;
  font-weight: 500;
  letter-spacing: .04em;
  padding: .45rem 1.1rem;
  border-radius: 100px;
  border: 1px solid rgba(245,240,232,.12);
  background: transparent;
  color: rgba(245,240,232,.55);
  cursor: pointer;
  transition: all .2s;
}
.hps-cat:hover {
  border-color: #8cc63f;
  color: #8cc63f;
}
.hps-cat--active {
  background: #3d6b2f;
  border-color: #3d6b2f;
  color: #fff;
}
.hps-search-wrap {
  position: relative;
  min-width: 260px;
}
@media (max-width: 600px) { .hps-search-wrap { min-width: 100%; } }
.hps-search-icon {
  position: absolute;
  left: .9rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(245,240,232,.3);
  pointer-events: none;
}
.hps-search {
  font-family: 'DM Sans', sans-serif;
  width: 100%;
  padding: .6rem 1rem .6rem 2.4rem;
  background: rgba(245,240,232,.06);
  border: 1px solid rgba(245,240,232,.1);
  border-radius: 100px;
  color: #f5f0e8;
  font-size: .85rem;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  box-sizing: border-box;
}
.hps-search::placeholder { color: rgba(245,240,232,.3); }
.hps-search:focus {
  border-color: #8cc63f;
  box-shadow: 0 0 0 3px rgba(140,198,63,.12);
}

/* ── Grid ── */
.hps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 1024px) { .hps-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .hps-grid { grid-template-columns: 1fr; } }

/* ── Card ── */
.hps-card {
  background: rgba(245,240,232,.04);
  border: 1px solid rgba(245,240,232,.08);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  padding: 0;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity .6s ease,
    transform .6s ease,
    border-color .25s,
    box-shadow .25s;
}
.hps-card--in {
  opacity: 1;
  transform: translateY(0);
}
.hps-card:hover {
  border-color: rgba(140,198,63,.4);
  box-shadow: 0 16px 40px rgba(0,0,0,.35);
  transform: translateY(-4px);
}
.hps-card:hover .hps-card-img-overlay {
  opacity: 1;
}
.hps-card:hover .hps-card-cta {
  color: #8cc63f;
}
.hps-card:focus-visible {
  outline: 2px solid #8cc63f;
  outline-offset: 2px;
}

/* Card image */
.hps-card-img {
  position: relative;
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  flex-shrink: 0;
}
.hps-card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(140,198,63,.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity .3s;
}
.hps-badge {
  position: absolute;
  top: .85rem;
  left: .85rem;
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  padding: .25rem .7rem;
  border-radius: 100px;
  z-index: 2;
}
.hps-badge--green { background: rgba(220,252,231,.9); color: #166534; }
.hps-badge--blue  { background: rgba(219,234,254,.9); color: #1e40af; }
.hps-badge--amber { background: rgba(254,243,199,.9); color: #92400e; }

/* Card body */
.hps-card-body {
  padding: 1.3rem 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: .55rem;
  flex: 1;
}
.hps-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hps-card-cat {
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #8cc63f;
}
.hps-card-code {
  font-size: .62rem;
  font-weight: 600;
  color: rgba(245,240,232,.3);
}
.hps-card-name {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #f5f0e8;
  line-height: 1.2;
  margin: 0;
}
.hps-card-desc {
  font-size: .82rem;
  line-height: 1.65;
  color: rgba(245,240,232,.45);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hps-card-cta {
  display: flex;
  align-items: center;
  gap: .4rem;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(245,240,232,.35);
  margin-top: auto;
  padding-top: .5rem;
  transition: color .2s;
}

/* ── Load more ── */
.hps-load-wrap {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}
.hps-load-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: .82rem;
  font-weight: 600;
  letter-spacing: .06em;
  padding: .75rem 2rem;
  border-radius: 100px;
  border: 1px solid rgba(140,198,63,.35);
  background: transparent;
  color: #8cc63f;
  cursor: pointer;
  transition: all .2s;
}
.hps-load-btn:hover {
  background: #3d6b2f;
  border-color: #3d6b2f;
  color: #fff;
}

/* ── Empty state ── */
.hps-empty {
  text-align: center;
  font-size: 1rem;
  color: rgba(245,240,232,.3);
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Bottom CTA ── */
.hps-bottom-cta {
  text-align: center;
  margin-top: 3.5rem;
}
.hps-full-catalog {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: rgba(245,240,232,.4);
  text-decoration: none;
  transition: color .2s;
}
.hps-full-catalog:hover { color: #8cc63f; }

/* ════════════════════════════════════════
   MODAL OVERLAY + PANEL
════════════════════════════════════════ */
.hps-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(4, 9, 4, .75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: hps-fade-in .2s ease;
}
@keyframes hps-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.hps-modal {
  position: relative;
  background: #111a0e;
  border: 1px solid rgba(140,198,63,.2);
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,.6);
  animation: hps-slide-up .3s cubic-bezier(0.2, 1, 0.2, 1);
}
@keyframes hps-slide-up {
  from { opacity: 0; transform: translateY(30px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Close button */
.hps-modal-close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 20;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245,240,232,.08);
  border: 1px solid rgba(245,240,232,.1);
  border-radius: 50%;
  color: rgba(245,240,232,.7);
  cursor: pointer;
  transition: all .2s;
}
.hps-modal-close:hover {
  background: rgba(245,240,232,.15);
  color: #f5f0e8;
}

/* Two-column inner layout */
.hps-modal-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  max-height: 90vh;
}
@media (max-width: 680px) {
  .hps-modal-inner {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
}

/* Image side */
.hps-modal-img-wrap {
  position: relative;
  overflow: hidden;
  background: #0a0f09;
  min-height: 340px;
}
.hps-modal-track {
  display: flex;
  height: 100%;
  transition: transform .65s cubic-bezier(0.25, 1, 0.2, 1);
}
.hps-modal-slide {
  flex: 0 0 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  min-height: 340px;
}
.hps-modal-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: all .2s;
}
.hps-modal-arrow:hover {
  background: #fff;
  color: #0d1208;
}
.hps-modal-arrow--l { left: 1rem; }
.hps-modal-arrow--r { right: 1rem; }
.hps-modal-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: .4rem;
  padding: .4rem .85rem;
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(8px);
  border-radius: 100px;
}
.hps-modal-dot {
  width: 12px;
  height: 3px;
  border: none;
  border-radius: 2px;
  background: rgba(255,255,255,.35);
  cursor: pointer;
  padding: 0;
  transition: all .3s;
}
.hps-modal-dot--active {
  background: #fff;
  width: 24px;
}
.hps-modal-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  padding: .25rem .7rem;
  border-radius: 100px;
}
.hps-modal-badge--green { background: rgba(220,252,231,.9); color: #166534; }
.hps-modal-badge--blue  { background: rgba(219,234,254,.9); color: #1e40af; }
.hps-modal-badge--amber { background: rgba(254,243,199,.9); color: #92400e; }

/* Info panel */
.hps-modal-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  padding: 2.5rem 2.2rem;
  overflow-y: auto;
}
.hps-modal-category {
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: #8cc63f;
  margin: 0;
}
.hps-modal-title {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  line-height: 1.1;
  color: #f5f0e8;
  margin: 0;
}
.hps-modal-code {
  font-size: .85rem;
  color: rgba(245,240,232,.4);
  margin: 0;
}
.hps-modal-code strong {
  color: rgba(245,240,232,.6);
  font-weight: 600;
}
.hps-modal-divider {
  width: 48px;
  height: 2px;
  background: #3d6b2f;
  border-radius: 2px;
}
.hps-modal-desc {
  font-size: .9rem;
  line-height: 1.75;
  color: rgba(245,240,232,.55);
  margin: 0;
}
.hps-modal-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: .5rem;
  flex-wrap: wrap;
}
.hps-modal-enquire {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  padding: .85rem 2rem;
  background: #3d6b2f;
  color: #fff;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: .88rem;
  font-weight: 600;
  text-decoration: none;
  transition: all .2s;
  box-shadow: 0 8px 20px rgba(61,107,47,.25);
}
.hps-modal-enquire:hover {
  background: #2b4f21;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(61,107,47,.35);
}
.hps-modal-full-link {
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(245,240,232,.35);
  text-decoration: none;
  transition: color .2s;
  white-space: nowrap;
}
.hps-modal-full-link:hover { color: #8cc63f; }
`;