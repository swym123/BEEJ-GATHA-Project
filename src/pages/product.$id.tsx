import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ProductItem } from "../data/products";
import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";
import './product.$id.css'


// ─── Types ────────────────────────────────────────────────────────────────────

interface TouchState {
  startX: number | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 50;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPhotos(product: ProductItem): string[] {
  if (product.photos && product.photos.length > 0) return product.photos;
  return [product.img, product.img, product.img];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchRef = useRef<TouchState>({ startX: null });

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = INITIAL_FALLBACK_PRODUCTS.find((p) => p.id === parseInt(id ?? ""));
    setProduct(found ?? null);
    setLoading(false);
  }, [id]);

  const photos = product ? getPhotos(product) : [];
  const hasMultipleSlides = photos.length > 1;

  const prevSlide = useCallback(() => {
    setCurrentSlide((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current.startX === null) return;
    const diff = touchRef.current.startX - e.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) nextSlide();
    else if (diff < -SWIPE_THRESHOLD) prevSlide();
    touchRef.current.startX = null;
  };

  // ─── Loading / Not Found ────────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh", background: "#0a0d08", color: "#fff" }}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh", background: "#f5f0e8" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: "1rem" }}>Product not found</h2>
        <Link to="/product" style={{ color: "#3d6b2f", fontWeight: 600 }}>← Return to Products</Link>
      </div>
    );
  }

  // ─── Main Render ────────────────────────────────────────────────────────────

  return (
    <>

      <main className="pd-root">

        {/* Back button — floating elegantly over top left on desktop, inline on mobile */}
        <button className="pd-back-btn" onClick={() => navigate("/product")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Catalog
        </button>


        {/* ── Center Two-Column Split Layout Wrapper ── */}
        <div className="pd-split-container">

          {/* ── Left Side: Larger Image Viewport Slider ── */}
          <div
            className="pd-image-side"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="pd-slider-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="pd-slide"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            {hasMultipleSlides && (
              <>
                <button className="pd-arrow pd-arrow--left" onClick={prevSlide} aria-label="Previous image">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="pd-arrow pd-arrow--right" onClick={nextSlide} aria-label="Next image">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* Slider dots */}
            {hasMultipleSlides && (
              <div className="pd-dots">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    className={`pd-dot${i === currentSlide ? " pd-dot--active" : ""}`}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Right Side: Spacious Product Details ── */}
          <div className="pd-info-side">
            <div className="pd-info-content">

              {/* Category / Status Badges */}
              <div className="pd-badge-row">
                <span className="pd-category">{product.category}</span>
                <span className={`pd-tag pd-tag--${product.badge}`}>{product.tag}</span>
              </div>

              {/* Upscaled Header */}
              <h1 className="pd-title">{product.name}</h1>

              {/* SKU / Identifiers */}
              <p className="pd-code">Product Code: <strong>{product.code}</strong></p>

              <div className="pd-divider" />

              {/* Enlarged Enquire Action Button */}
              <Link to={`/contact?inquiry=${product.code}`} className="pd-enquire-btn">
                <span>Enquire Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

