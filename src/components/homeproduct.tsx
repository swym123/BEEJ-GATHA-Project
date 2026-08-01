import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";
import type { ProductItem } from "../data/products";
import './homeproduct.css'

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
