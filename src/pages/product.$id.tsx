import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ProductItem } from "../data/products";
import { INITIAL_FALLBACK_PRODUCTS } from "../data/products";

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
      <style>{styles}</style>

      <main className="pd-root">

        {/* Back button — floating elegantly over top left */}
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

const styles = `
  /* Root: Centers everything full viewport */
  .pd-root {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    margin: 0;
    padding: 6rem 4rem;
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
    background: #f5f0e8;
  }

  /* Upper corner navigation button */
  .pd-back-btn {
    position: absolute;
    top: 3.5rem;
    left: 4.5rem;
    z-index: 10;
    display: inline-flex;
    align-items: center;
    padding: 0.65rem 1.3rem;
    background: rgba(15, 23, 42, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 100px;
    color: #0c1007;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .pd-back-btn:hover {
    background: #3d6b2f;
    border-color: #3d6b2f;
    color: #fff;
  }

  /* Two Column Row Split Layout Container (Sized-up profile width) */
  .pd-split-container {
    display: flex;
    flex-direction: row;
    align-items: center; /* Ensures exact layout mid-level height leveling */
    justify-content: space-between;
    width: 100%;
    max-width: 1240px; /* Enhanced wide workspace spread */
    gap: 5rem; /* Larger empty zone split divider */
  }

  /* ── Left Side Image Profile (Upscaled sizing window) ── */
  .pd-image-side {
    position: relative;
    flex: 0 0 50%; /* Holds steady exactly at half layout span width */
    width: 50%;
    height: 620px; /* Upgraded viewport box display size */
    overflow: hidden;
    background: #0d1109;
    border-radius: 24px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
  }

  .pd-slider-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.7s cubic-bezier(0.25, 1, 0.2, 1);
  }

  .pd-slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* Control buttons viewport frame overlays */
  .pd-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.2, 1, 0.2, 1);
  }
  .pd-arrow:hover {
    background: #fff;
    color: #0d1109;
    border-color: #fff;
    transform: translateY(-50%) scale(1.06);
  }
  .pd-arrow--left  { left: 1.5rem; }
  .pd-arrow--right { right: 1.5rem; }

  /* Frame slide indicator pagination wrapper */
  .pd-dots {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(12px);
    border-radius: 100px;
    z-index: 5;
  }
  .pd-dot {
    width: 14px;
    height: 4px;
    padding: 0;
    border: none;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .pd-dot--active {
    background: #fff;
    width: 28px;
  }

  /* ── Right Side Details Content Frame (Left-aligned text flow inside column) ── */
  .pd-info-side {
    flex: 0 0 50%;
    width: 50%;
    display: flex;
    align-items: center;
  }

  .pd-info-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
    max-width: 540px; /* Room for grand scale typography reads */
    width: 100%;
  }

  /* Header categorizers row badges layout */
  .pd-badge-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .pd-category {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #3d6b2f;
  }

  .pd-tag {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.28rem 0.9rem;
    border-radius: 100px;
  }
  .pd-tag--green { background: #dcfce7; color: #166534; }
  .pd-tag--blue  { background: #dbeafe; color: #1e40af; }
  .pd-tag--amber { background: #fef3c7; color: #92400e; }

  /* Premium Title Text Display (Upscaled Sizing) */
  .pd-title {
    font-family: 'Playfair Display', serif;
    font-size: 4.2rem; /* Significantly larger premium typography footprint */
    font-weight: 400;
    line-height: 1.1;
    color: #0c1007;
    margin: 0;
  }

  /* Catalog identifiers typography metrics */
  .pd-code {
    font-size: 1.1rem;
    color: #6b7568;
    margin: 0;
  }
  .pd-code strong {
    color: #3d4a39;
    font-weight: 600;
  }

  /* Border line accents spacer style */
  .pd-divider {
    width: 72px;
    height: 3px;
    background: #3d6b2f;
    border-radius: 2px;
    margin: 0.2rem 0;
  }

  /* Action button element footprint measurements */
  .pd-enquire-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.25rem 3.2rem; /* Expanded button canvas sizing */
    background: #3d6b2f;
    color: #fff;
    border-radius: 100px;
    font-size: 1.15rem;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 10px 25px rgba(61,107,47,0.2);
    transition: all 0.2s ease;
    margin-top: 0.5rem;
  }
  .pd-enquire-btn:hover {
    background: #2b4f21;
    transform: translateY(-2px);
    box-shadow: 0 14px 35px rgba(61,107,47,0.3);
  }
  .pd-enquire-btn:active {
    transform: translateY(0);
  }

  /* ── Responsive adjustments for handheld layouts ── */
  @media (max-width: 1024px) {
    .pd-split-container {
      gap: 3rem;
    }
    .pd-title { font-size: 3.2rem; }
    .pd-image-side { height: 500px; }
  }

  @media (max-width: 840px) {
    .pd-root {
      padding: 7rem 2rem 4rem 2rem;
    }

    .pd-back-btn {
      position: relative;
      top: 0;
      left: 0;
      margin-bottom: 1.5rem;
      align-self: flex-start;
    }

    .pd-split-container {
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }

    .pd-image-side {
      width: 100%;
      flex: none;
      height: 48vh;
      min-height: 340px;
    }

    .pd-info-side {
      width: 100%;
      flex: none;
    }

    .pd-info-content {
      max-width: 100%;
    }
    
    .pd-title { font-size: 2.8rem; }
  }
`;