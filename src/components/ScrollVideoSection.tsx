

import { useEffect, useRef } from "react";
import logo from "../assets/beej-gatha-logo.png";
import seedVideo from "../assets/seed.mp4";

const CHAPTERS: [number, number, string, string][] = [
  [0.0, 0.25, "The Seed", "Dormant · Patient · Ready"],
  [0.25, 0.5, "Awakening", "Breaking Ground · First Light"],
  [0.5, 0.75, "Rising", "Reaching · Unfolding · Stretching"],
  [0.75, 1.0, "Full Bloom", "Alive · Flourishing · Complete"],
];

const MOBILE_CHAPTERS = [
  { num: "01", name: "The Seed", hint: "Dormant · Patient · Ready", right: false },
  { num: "02", name: "Awakening", hint: "Breaking Ground · First Light", right: true },
  { num: "03", name: "Rising", hint: "Reaching · Unfolding", right: false },
  { num: "04", name: "Full Bloom", hint: "Alive · Flourishing · Complete", right: true },
];

const LERP_FACTOR = 0.09;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ScrollVideoSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const pctNumRef = useRef<HTMLDivElement>(null);
  const chapNameRef = useRef<HTMLDivElement>(null);
  const chapSubRef = useRef<HTMLDivElement>(null);
  const dirArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const vid = vidRef.current;
    const stage = stageRef.current;
    const pctNum = pctNumRef.current;
    const chapName = chapNameRef.current;
    const chapSub = chapSubRef.current;
    const dirArrow = dirArrowRef.current;

    if (!wrap || !vid || !stage) return;

    /* ── Intersection observer uses window (no root = viewport) ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    wrap.querySelectorAll(".a-item").forEach((el) => io.observe(el));

    let lastChapIdx = -1;
    let lastProg = 0;
    let targetTime = 0;
    let rafId = 0;
    let isSeeking = false;

    const updateChapter = (prog: number) => {
      for (let i = 0; i < CHAPTERS.length; i++) {
        const [s, e] = CHAPTERS[i];
        if (prog >= s && (prog < e || i === CHAPTERS.length - 1)) {
          if (i === lastChapIdx) return;
          lastChapIdx = i;
          chapName?.classList.remove("show");
          chapSub?.classList.remove("show");
          requestAnimationFrame(() => {
            if (chapName) chapName.textContent = CHAPTERS[i][2];
            if (chapSub) chapSub.textContent = CHAPTERS[i][3];
            requestAnimationFrame(() => {
              chapName?.classList.add("show");
              chapSub?.classList.add("show");
            });
          });
          return;
        }
      }
    };

    const tick = () => {
      if (vid.duration && !isNaN(vid.duration) && !isSeeking) {
        const diff = targetTime - vid.currentTime;
        if (Math.abs(diff) > 0.001) {
          const next = lerp(vid.currentTime, targetTime, LERP_FACTOR);
          try {
            if ((vid as any).fastSeek) (vid as any).fastSeek(next);
            else vid.currentTime = next;
          } catch { /* ignore */ }
        }
        const prog = vid.duration > 0 ? vid.currentTime / vid.duration : 0;
        if (pctNum) {
          pctNum.innerHTML = Math.round(prog * 100) + '<small style="font-size:.45em">%</small>';
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!vid.duration || isNaN(vid.duration)) return;
      // Use window scroll + stage's position relative to the document
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - stageTop;
      const total = stage.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, scrolled / total));
      targetTime = prog * vid.duration;
      if (dirArrow) {
        dirArrow.style.transform = prog >= lastProg ? "rotate(0deg)" : "rotate(180deg)";
      }
      lastProg = prog;
      updateChapter(prog);
    };

    const handleSeeking = () => { isSeeking = true; };
    const handleSeeked = () => { isSeeking = false; };

    vid.addEventListener("seeking", handleSeeking);
    vid.addEventListener("seeked", handleSeeked);
    vid.addEventListener("loadedmetadata", onScroll);
    // Listen on window instead of the wrap div
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);
    if (vid.readyState >= 1) onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      vid.removeEventListener("loadedmetadata", onScroll);
      vid.removeEventListener("seeking", handleSeeking);
      vid.removeEventListener("seeked", handleSeeked);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="sv-wrap" ref={wrapRef}>

        {/* ══ INTRO HERO ══ */}
        <section className="wh-hero">
          <div className="wh-bg" />
          <div className="wh-inner">
            <img src={logo} alt="Beej Gatha logo" className="wh-logo" />
            <p className="wh-eyebrow">— Welcome to —</p>
            <h1>Beej Gatha</h1>
            <p className="wh-sub">हर खेत में हरियाली</p>
            <p className="wh-lead">
              A story written in soil. Where Indian science meets the farmer's hand —
              seed by seed, field by field.
            </p>
            <a href="/product" className="wh-cta">Begin the journey ↓</a>
          </div>
        </section>

        {/* ══ VIDEO SCRUB — desktop only ══ */}
        <section
          className="sv-scrub-stage sv-desktop-only"
          id="scrub-stage"
          ref={stageRef as React.RefObject<HTMLElement>}
        >
          <div className="sv-video-sticky">
            <video
              ref={vidRef}
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
            >
              <source src={seedVideo} type="video/mp4" />
            </video>

            <div className="sv-chap-wrap">
              <div className="sv-chap-name" ref={chapNameRef}>The Seed</div>
              <div className="sv-chap-sub" ref={chapSubRef}>Dormant · Patient · Ready</div>
            </div>

            <div className="sv-dir-arrow" ref={dirArrowRef}>
              <svg viewBox="0 0 24 24">
                <polyline points="12 5 12 19" />
                <polyline points="6 13 12 19 18 13" />
              </svg>
            </div>
          </div>
        </section>

        {/* ══ MOBILE JOURNEY — mobile only ══ */}
        <section className="ms-section sv-mobile-only" id="scrub-stage">
          {/* floating particles */}
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="ms-particle"
              style={{
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                left: `${8 + (i * 5.7) % 84}%`,
                top: `${10 + (i * 6.3) % 80}%`,
                animationDelay: `${(i * 0.7) % 6}s`,
                animationDuration: `${5 + (i % 4)}s`,
                opacity: 0,
              } as React.CSSProperties}
            />
          ))}

          <div className="ms-canvas">
            <p className="ms-tag">— The Journey —</p>
            <h2 className="ms-title">The <span>Story</span><br />of a Seed</h2>
            <p className="ms-sub">बीज से वृक्ष तक</p>

            <div className="ms-stem">
              {MOBILE_CHAPTERS.map((ch, i) => (
                <div key={i} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    className="ms-chapter a-item"
                    style={{ transitionDelay: `${i * 0.12}s` }}
                  >
                    {!ch.right && (
                      <div className="ms-card">
                        <p className="ms-num">Chapter {ch.num}</p>
                        <p className="ms-name">{ch.name}</p>
                        <p className="ms-hint">{ch.hint}</p>
                      </div>
                    )}
                    <div className="ms-node">
                      <div
                        className="ms-dot"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      />
                    </div>
                    {ch.right ? (
                      <div className="ms-card ms-card--r">
                        <p className="ms-num">Chapter {ch.num}</p>
                        <p className="ms-name">{ch.name}</p>
                        <p className="ms-hint">{ch.hint}</p>
                      </div>
                    ) : (
                      <div className="ms-empty" />
                    )}
                  </div>
                  {i < MOBILE_CHAPTERS.length - 1 && (
                    <div className="ms-connector" />
                  )}
                </div>
              ))}
            </div>

            {/* progress bar */}
            <div className="ms-prog-wrap">
              <div className="ms-prog-bar" />
            </div>
            <div className="ms-prog-labels">
              <span>Seed</span><span>Awakening</span><span>Rising</span><span>Bloom</span>
            </div>

            {/* quote card */}
            <div className="ms-bloom a-item">
              <span className="ms-bloom-star">✦</span>
              <p className="ms-bloom-q">"The creation of a thousand forests is in one acorn."</p>
              <p className="ms-bloom-c">— Ralph Waldo Emerson</p>
            </div>
          </div>
        </section>

        {/* ══ IMAGE REVEAL ══ */}
        <section className="sv-reveal">
          <div className="sv-reveal-inner">
            <div className="sv-reveal-img">
              <img
                src="https://www.openaccessgovernment.org/wp-content/uploads/2021/03/dreamstime_l_162138825-scaled.jpg"
                alt="Young plant growing from rich earth"
                loading="lazy"
              />
            </div>
            <div className="sv-reveal-text">
              <div className="sv-tag-line a-item">
                <div className="sv-dash" />
                <span>Nature's Miracle</span>
              </div>
              <h2 className="a-item" style={{ transitionDelay: ".1s" }}>
                Every great<br />forest begins<br />with one <i>seed.</i>
              </h2>
              <p className="a-item" style={{ transitionDelay: ".2s" }}>
                Buried in darkness, nourished by rain, warmed by the sun — a tiny
                seed carries within it the blueprint of an entire tree. Growth is
                not sudden. It is steady, deliberate, and inevitable.
              </p>
              <div className="sv-facts">
                <div className="sv-fact a-item" style={{ transitionDelay: ".3s" }}>
                  <div className="sv-fact-n">72<small>h</small></div>
                  <div className="sv-fact-l">First Sprout</div>
                </div>
                <div className="sv-fact a-item" style={{ transitionDelay: ".4s" }}>
                  <div className="sv-fact-n">7<small>d</small></div>
                  <div className="sv-fact-l">First Leaf</div>
                </div>
                <div className="sv-fact a-item" style={{ transitionDelay: ".5s" }}>
                  <div className="sv-fact-n">∞</div>
                  <div className="sv-fact-l">Potential</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ QUOTE ══ */}
        <section className="sv-quote-sec">
          <blockquote>"The creation of a thousand forests is in one acorn."</blockquote>
          <cite>— Ralph Waldo Emerson</cite>
        </section>

      </div>
    </>
  );
}

const css = `
/* ─────────────────────────────────────────
   GLOBAL WRAP
───────────────────────────────────────── */
.sv-wrap {
  --sv-ink:   #0d1208;
  --sv-leaf:  #3d6b2f;
  --sv-lime:  #8cc63f;
  --sv-cream: #f5f0e8;
  --sv-sand:  #e8dcc8;
  /* NO overflow here — any overflow on a parent kills position:sticky on children */
  background: var(--sv-ink);
  color: var(--sv-cream);
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
}
.sv-wrap *, .sv-wrap *::before, .sv-wrap *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

/* ─────────────────────────────────────────
   RESPONSIVE VISIBILITY
───────────────────────────────────────── */
.sv-desktop-only { display: block; }
.sv-mobile-only  { display: none; }
@media (max-width: 768px) {
  .sv-desktop-only { display: none !important; }
  .sv-mobile-only  { display: block !important; }
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
.wh-hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%);
  color: #f5f0e8; overflow: hidden; text-align: center;
  padding: 6rem 1.5rem 4rem;
}
.wh-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(140,198,63,.18), transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(61,107,47,.25), transparent 55%);
}
.wh-inner { position: relative; z-index: 2; max-width: 780px; }
.wh-logo {
  width: clamp(120px, 18vw, 180px); height: auto; margin-bottom: 1.5rem;
  border-radius: 50%; box-shadow: 0 20px 60px rgba(0,0,0,.5);
  animation: whFloat 6s ease-in-out infinite;
}
@keyframes whFloat {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-12px); }
}
.wh-eyebrow {
  font-size: .75rem; letter-spacing: .4em; text-transform: uppercase;
  color: #8cc63f; margin: 0 0 1rem;
}
.wh-hero h1 {
  font-family: 'Playfair Display', serif; font-weight: 400;
  font-size: clamp(3rem, 9vw, 6.5rem); line-height: 1;
  margin: 0 0 .8rem; letter-spacing: -.02em;
}
.wh-sub {
  font-family: 'Cormorant Garamond', serif; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem); color: rgba(245,240,232,.7);
  margin: 0 0 2rem;
}
.wh-lead {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(.95rem, 1.4vw, 1.1rem); line-height: 1.8;
  color: rgba(245,240,232,.65); max-width: 560px; margin: 0 auto 2.5rem;
}
.wh-cta {
  display: inline-block; padding: .9rem 2.2rem;
  border: 1px solid rgba(140,198,63,.45); border-radius: 999px;
  color: #8cc63f; text-decoration: none; font-size: .75rem;
  letter-spacing: .3em; text-transform: uppercase; transition: all .3s;
}
.wh-cta:hover { background: #8cc63f; color: #0d1208; transform: translateY(-2px); }

/* ─────────────────────────────────────────
   VIDEO SCRUB (desktop)
───────────────────────────────────────── */
.sv-scrub-stage { position: relative; height: 600vh; }
.sv-video-sticky {
  position: sticky; top: 0; width: 100%; height: 100vh;
  overflow: hidden; display: flex; align-items: center; justify-content: center;
  background: #040904;
}
.sv-video-sticky video {
  width: 100%; height: 100%; object-fit: cover; display: block;
  will-change: contents; transform: translateZ(0);
}
.sv-video-sticky::before {
  content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(4,9,4,.8) 100%);
}
.sv-video-sticky::after {
  content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background:
    linear-gradient(to bottom, rgba(4,9,4,.55) 0%, transparent 16%),
    linear-gradient(to top,    rgba(4,9,4,.55) 0%, transparent 16%);
}
.sv-chap-wrap {
  position: absolute; left: clamp(1.2rem,4vw,4rem); bottom: clamp(1.8rem,5vh,4rem);
  z-index: 10; pointer-events: none;
}
.sv-chap-name {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(1.4rem,3.5vw,2.8rem); color: var(--sv-cream);
  opacity: 0; transform: translateY(10px);
  transition: opacity .45s, transform .45s;
}
.sv-chap-name.show { opacity: 1; transform: translateY(0); }
.sv-chap-sub {
  font-size: clamp(.58rem,1.2vw,.68rem);
  letter-spacing: .3em; text-transform: uppercase; color: var(--sv-lime);
  margin-top: .4rem; opacity: 0; transform: translateY(8px);
  transition: opacity .5s .08s, transform .5s .08s;
}
.sv-chap-sub.show { opacity: 1; transform: translateY(0); }
.sv-dir-arrow {
  position: absolute; bottom: clamp(1.8rem,5vh,4rem); right: clamp(1.2rem,3vw,3rem);
  z-index: 10; width: 28px; height: 28px; pointer-events: none;
  transition: transform .35s ease;
}
.sv-dir-arrow svg {
  width: 100%; height: 100%; fill: none;
  stroke: var(--sv-lime); stroke-width: 1.5;
  stroke-linecap: round; stroke-linejoin: round;
}

/* ─────────────────────────────────────────
   MOBILE JOURNEY SECTION
───────────────────────────────────────── */
.ms-section {
  position: relative;
  background: var(--sv-ink);
  overflow: hidden;
}

.ms-particle {
  position: absolute;
  border-radius: 50%;
  background: #8cc63f;
  pointer-events: none;
  animation: ms-float 6s ease-in-out infinite;
}
@keyframes ms-float {
  0%   { opacity: 0; transform: translateY(0) scale(.6); }
  15%  { opacity: .18; }
  85%  { opacity: .10; }
  100% { opacity: 0; transform: translateY(-140px) scale(1.1); }
}

.ms-canvas {
  position: relative; z-index: 2;
  padding: 4rem 1.25rem 4rem;
  display: flex; flex-direction: column; align-items: center;
}

.ms-tag {
  font-size: .58rem; letter-spacing: .35em; text-transform: uppercase;
  color: var(--sv-lime); margin-bottom: .5rem;
  opacity: 0; animation: sv-rise .8s .2s ease forwards;
}
.ms-title {
  font-family: 'Playfair Display', serif; font-weight: 400; font-style: italic;
  font-size: 2.1rem; line-height: 1.1; text-align: center; margin-bottom: .5rem;
  opacity: 0; animation: sv-rise .8s .4s ease forwards;
}
.ms-title span { color: var(--sv-lime); }
.ms-sub {
  font-size: .65rem; letter-spacing: .2em;
  color: rgba(245,240,232,.35); text-align: center; margin-bottom: 3rem;
  opacity: 0; animation: sv-rise .8s .6s ease forwards;
}

/* ── Stem ── */
.ms-stem {
  width: 100%;
  display: flex; flex-direction: column; align-items: stretch;
}

.ms-connector {
  width: 1px; height: 28px;
  background: linear-gradient(to bottom, rgba(140,198,63,.5), rgba(140,198,63,.05));
  margin-left: 19px; /* aligns with center of 40px node column */
}

/*
  THE KEY FIX:
  Override the 3-col alternating grid with a simple 2-col left-timeline.
  Node always goes to col 1, card always goes to col 2 (full width).
  Empty placeholders are hidden. No JSX changes needed.
*/
.ms-chapter {
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr;
  column-gap: 14px;
  align-items: flex-start;
}

/* Node: pin to col 1 regardless of DOM order */
.ms-node {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  margin-top: 2px;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(13,18,8,.95);
  border: 1.5px solid rgba(140,198,63,.55);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ms-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--sv-lime);
  animation: ms-pulse 2.6s ease-in-out infinite;
}
@keyframes ms-pulse {
  0%,100% { transform: scale(1);   opacity: .6; }
  50%     { transform: scale(1.7); opacity: 1;  }
}

/* Card: always pin to col 2, full width, left-aligned text */
.ms-card {
  grid-column: 2;
  grid-row: 1;
  text-align: left !important; /* override ms-card--r on right chapters */
  background: rgba(140,198,63,.08);
  border: .5px solid rgba(140,198,63,.28);
  border-radius: 14px;
  padding: .9rem 1rem;
  min-width: 0;
  overflow: hidden;
}

/* Empty placeholders: hide completely */
.ms-empty { display: none !important; }

.ms-num {
  font-size: .5rem; letter-spacing: .2em; text-transform: uppercase;
  color: var(--sv-lime); margin-bottom: .3rem;
}
.ms-name {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 1.05rem; color: var(--sv-cream); line-height: 1.25;
  margin-bottom: .25rem;
}
.ms-hint {
  font-size: .52rem; letter-spacing: .08em; line-height: 1.6;
  color: rgba(245,240,232,.32);
}

/* Progress bar */
.ms-prog-wrap {
  width: 82%; height: 1.5px;
  background: rgba(140,198,63,.12); border-radius: 2px;
  margin: 2.8rem auto 0; overflow: hidden;
  opacity: 0; animation: sv-rise .8s 1s ease forwards;
}
.ms-prog-bar {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, rgba(140,198,63,.35), var(--sv-lime));
  border-radius: 2px;
  animation: ms-fill 2.4s 1.3s ease forwards;
}
@keyframes ms-fill { to { width: 100%; } }

.ms-prog-labels {
  width: 82%;
  display: flex; justify-content: space-between;
  font-size: .44rem; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(140,198,63,.38); margin-top: .4rem; margin-bottom: 2.6rem;
  opacity: 0; animation: sv-rise .8s 1.1s ease forwards;
}

/* Quote bloom card */
.ms-bloom {
  width: 100%;
  background: rgba(140,198,63,.06);
  border: .5px solid rgba(140,198,63,.22);
  border-radius: 18px; padding: 1.8rem 1.3rem; text-align: center;
}
.ms-bloom-star {
  display: block; font-size: 1.3rem; color: var(--sv-lime);
  margin-bottom: .7rem;
  animation: ms-spin 9s linear infinite;
}
@keyframes ms-spin { to { transform: rotate(360deg); } }
.ms-bloom-q {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: .88rem; line-height: 1.7; color: rgba(245,240,232,.75);
  margin-bottom: .5rem;
}
.ms-bloom-c {
  font-size: .48rem; letter-spacing: .3em;
  text-transform: uppercase; color: var(--sv-lime);
}

/* ─────────────────────────────────────────
   SHARED REVEAL ANIMATION
───────────────────────────────────────── */
@keyframes sv-rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sv-wrap .a-item {
  opacity: 0; transform: translateY(24px);
  transition: opacity .75s ease, transform .75s ease;
}
.sv-wrap .a-item.in { opacity: 1; transform: translateY(0); }

/* ─────────────────────────────────────────
   IMAGE REVEAL
───────────────────────────────────────── */
.sv-reveal { background: var(--sv-cream); color: var(--sv-ink); overflow: hidden; }
.sv-reveal-inner { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
@media (max-width: 680px) { .sv-reveal-inner { grid-template-columns: 1fr; } }
.sv-reveal-img { position: relative; overflow: hidden; min-height: 50vh; }
.sv-reveal-img img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transform: scale(1.06); transition: transform 1.2s ease;
}
.sv-reveal-img:hover img { transform: scale(1); }
.sv-reveal-img::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(160deg, rgba(61,107,47,.2) 0%, transparent 55%);
}
.sv-reveal-text {
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(2.5rem,6vw,6rem) clamp(2rem,5vw,5rem); position: relative;
}
.sv-reveal-text::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--sv-leaf), var(--sv-lime));
}
.sv-tag-line { display: flex; align-items: center; gap: .8rem; margin-bottom: 2rem; }
.sv-dash { width: 24px; height: 1px; background: var(--sv-leaf); }
.sv-tag-line span {
  font-size: .62rem; letter-spacing: .38em;
  text-transform: uppercase; color: var(--sv-leaf);
}
.sv-reveal-text h2 {
  font-family: 'Playfair Display', serif; font-weight: 400;
  font-size: clamp(2rem,5vw,4.2rem); line-height: 1.05; color: var(--sv-ink);
  margin-bottom: 1.6rem;
}
.sv-reveal-text h2 i { color: var(--sv-leaf); }
.sv-reveal-text p {
  font-size: clamp(.82rem,1.6vw,.98rem); line-height: 1.85;
  color: #3a3328; max-width: 36ch; margin-bottom: 2.8rem;
}
.sv-facts { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
@media (max-width: 400px) { .sv-facts { grid-template-columns: 1fr 1fr; } }
.sv-fact { border-top: 1px solid rgba(13,18,8,.15); padding-top: 1rem; }
.sv-fact-n {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem,3vw,2.4rem); color: var(--sv-leaf); line-height: 1;
}
.sv-fact-n small { font-size: .5em; }
.sv-fact-l {
  font-size: .6rem; letter-spacing: .22em;
  text-transform: uppercase; color: #7a6e62; margin-top: .3rem;
}

/* ─────────────────────────────────────────
   QUOTE
───────────────────────────────────────── */
.sv-quote-sec {
  background: #0e140d !important;
  padding: clamp(4rem,8vh,7rem) clamp(1.5rem,6vw,6rem);
  text-align: center; position: relative; overflow: hidden;
}
.sv-quote-sec::before {
  content: '\\201C'; font-family: 'Playfair Display', serif; font-size: 16rem;
  color: rgba(255,255,255,.06); position: absolute;
  top: -3rem; left: 1rem; line-height: 1; pointer-events: none;
}
.sv-quote-sec blockquote {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(1.2rem,3vw,2rem); color: var(--sv-cream);
  max-width: 650px; margin: 0 auto 1.2rem; line-height: 1.55;
}
.sv-quote-sec cite {
  font-size: .62rem; letter-spacing: .35em;
  text-transform: uppercase; color: var(--sv-lime); font-style: normal;
}
`;