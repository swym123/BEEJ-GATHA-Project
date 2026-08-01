import { useEffect, useRef } from "react";
import logo from "../assets/beej-gatha-logo.png";

import './ScrollVideoSection.css'
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

  useEffect(() => {
    const wrap = wrapRef.current;
    const vid = vidRef.current;
    const stage = stageRef.current;
    const pctNum = pctNumRef.current;
    const chapName = chapNameRef.current;
    const chapSub = chapSubRef.current;

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
            vid.currentTime = next;
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
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - stageTop;
      const total = stage.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, scrolled / total));
      targetTime = prog * vid.duration;
      updateChapter(prog);
    };

    const handleSeeking = () => { isSeeking = true; };
    const handleSeeked = () => { isSeeking = false; };

    vid.addEventListener("seeking", handleSeeking);
    vid.addEventListener("seeked", handleSeeked);
    vid.addEventListener("loadedmetadata", onScroll);
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
              <source src="/Seed_grows_to_plant_video.mp4" type="video/mp4" />
            </video>

            <div className="sv-chap-wrap">
              <div className="sv-chap-name" ref={chapNameRef}>The Seed</div>
              <div className="sv-chap-sub" ref={chapSubRef}>Dormant · Patient · Ready</div>
            </div>

            <div className="sv-watermark-cover">
              <img src={logo} alt="" className="sv-watermark-logo" />
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

