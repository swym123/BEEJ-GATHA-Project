

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CARDS_DATA = [
  {
    id: 0,
    tag: "Step 01 · Selection",
    em: "Choosing the",
    h1: "Finest",
    h2: "Seeds",
    desc: "Our agronomists hand-pick parent seeds from the best crop varieties — evaluating yield history, disease resistance, and regional adaptability before a single seed enters our lab.",
    stat: "1000+",
    statLabel: "varieties screened",
    img: "https://www.taropumps.com/media/2538/type-of-seeds-2.jpg",
    mTitle1: "Choosing the",
    mTitle2: "Finest Seeds",
    mDesc: "Hand-picked varieties screened for yield, resistance, and regional adaptability.",
  },
  {
    id: 1,
    tag: "Step 02 · Lab Testing",
    em: "Tested in our",
    h1: "State-of-Art",
    h2: "Laboratory",
    desc: "Every batch undergoes rigorous germination tests, purity analysis, moisture checks, and pathogen screening in our ISO-certified lab — ensuring only the strongest seeds pass through.",
    stat: "99.2%",
    statLabel: "purity standard",
    img: "https://www.sgs.com/-/media/sgscorp/images/temporary/scientist-analysing-wheat-seeds.cdn.en-PT.1.jpg",
    mTitle1: "Tested in our",
    mTitle2: "State-of-Art Lab",
    mDesc: "ISO-certified germination, purity, moisture and pathogen screening on every batch.",
  },
  {
    id: 2,
    tag: "Step 03 · Field Trials",
    em: "Proven in the",
    h1: "Real",
    h2: "Field",
    desc: "Approved seeds are planted across our trial farms in different soil types and climates. We measure growth rate, resistance to stress, and final yield — season after season.",
    stat: "12+",
    statLabel: "trial locations",
    img: "https://brandonbioscience.com/wp-content/uploads/2024/05/shutterstock_2414814355-1536x1024.webp",
    mTitle1: "Proven in the",
    mTitle2: "Real Field",
    mDesc: "Trialed across 12+ locations in varying soils and climates before approval.",
  },
  {
    id: 3,
    tag: "Step 04 · Processing & Packaging",
    em: "Cleaned &",
    h1: "Sealed for",
    h2: "Freshness",
    desc: "Seeds are cleaned, graded by size and weight, treated for long shelf life, and sealed in moisture-proof packaging. Every packet is batch-coded and traceable back to its origin.",
    stat: "48hr",
    statLabel: "processing cycle",
    img: "https://gdagroindustries.com/wp-content/uploads/2025/07/seed-and-paddy-processing-plant-gd-agro-industries-india.webp",
    mTitle1: "Cleaned &",
    mTitle2: "Sealed Fresh",
    mDesc: "Graded, treated and moisture-sealed with full batch traceability in 48 hours.",
  },
  {
    id: 4,
    tag: "Step 05 · Delivery to You",
    em: "Straight from",
    h1: "Our Lab",
    h2: "to Your Farm",
    desc: "Orders are dispatched within 24 hours in temperature-controlled packaging. We deliver directly to farmers across India — with full support from our agronomy team at every step.",
    stat: "24hr",
    statLabel: "dispatch guarantee",
    img: "https://tcifreight.in/wp-content/uploads/2025/06/seeds-fams.jpg",
    mTitle1: "Straight to",
    mTitle2: "Your Farm",
    mDesc: "Dispatched within 24 hours in temperature-controlled packs, across India.",
  },
];

const STEPS = [
  { n: "01", label: "Seed Selection", phase: "Selection" },
  { n: "02", label: "Lab Testing", phase: "Lab Testing" },
  { n: "03", label: "Field Trials", phase: "Field Trials" },
  { n: "04", label: "Processing", phase: "Processing" },
  { n: "05", label: "Delivery to You", phase: "Delivery" },
];

const N = CARDS_DATA.length;
const DEPTHS = [0.018, 0.025, 0.015, 0.022, 0.02];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if ((window as any).gsap && src.includes("gsap.min")) { resolve(); return; }
      if ((window as any).ScrollTrigger && src.includes("ScrollTrigger")) { resolve(); return; }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

export default function SeedCompanySection() {
  const flashRef = useRef<HTMLDivElement>(null);
  const pBarRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const stepRefs = useRef<Array<HTMLDivElement | null>>(Array(N).fill(null));
  const cardRefs = useRef<Array<HTMLDivElement | null>>(Array(N).fill(null));
  const infoRefs = useRef<Array<HTMLDivElement | null>>(Array(N).fill(null));
  const imgRefs = useRef<Array<HTMLImageElement | null>>(Array(N).fill(null));

  useEffect(() => {
    let dead = false;
    const disposers: Array<() => void> = [];

    (async () => {
      await loadScript(import.meta.env.VITE_GSAP_CDN as string);
      await loadScript(import.meta.env.VITE_SCROLLTRIGGER_CDN as string);
      if (dead) return;

      const gsap: any = (window as any).gsap;
      const ScrollTrigger: any = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Only run desktop engine on true desktop (>1024px)
      if (window.innerWidth <= 1024) return;

      const cards = cardRefs.current;
      const infos = infoRefs.current;
      const imgs = imgRefs.current;
      const heroSteps = stepRefs.current;
      const gallery = galleryRef.current;
      const stageEl = stageRef.current;
      const spacerEl = spacerRef.current;
      const stageHero = heroRef.current;
      const hint = hintRef.current;
      const pBar = pBarRef.current;
      const flash = flashRef.current;

      if (!gallery || !stageEl || !spacerEl || !stageHero || !hint || !pBar || !flash) return;
      if (cards.some(c => !c) || imgs.some(img => !img)) return;

      function getScattered(VW: number, VH: number, tW: number, tH: number) {
        return [
          { leftFrac: 0.450, topFrac: 0.080 },
          { leftFrac: 0.680, topFrac: 0.180 },
          { leftFrac: 0.460, topFrac: 0.400 },
          { leftFrac: 0.680, topFrac: 0.530 },
          { leftFrac: 0.460, topFrac: 0.710 },
        ].map(({ leftFrac, topFrac }) => ({
          left: Math.min(VW * leftFrac, VW - tW - 20),
          top: Math.min(VH * topFrac, VH - tH - 20),
          w: tW,
          h: tH,
        }));
      }

      let mouseX = 0, mouseY = 0, lerpX = 0, lerpY = 0;
      let basePos: Array<{ left: number; top: number }> = [];
      let scrollPhase = 0;
      let rafId: number | null = null;

      const onMM2 = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      document.addEventListener("mousemove", onMM2);
      disposers.push(() => document.removeEventListener("mousemove", onMM2));

      function startParallaxLoop() {
        if (rafId) return;
        const loop = () => {
          rafId = requestAnimationFrame(loop);
          if (scrollPhase > 0.05) return;
          lerpX += (mouseX - lerpX) * 0.08;
          lerpY += (mouseY - lerpY) * 0.08;
          cards.forEach((card, i) => {
            if (!card || !basePos[i]) return;
            gsap.set(card, {
              x: lerpX * DEPTHS[i] * window.innerWidth,
              y: lerpY * DEPTHS[i] * window.innerHeight,
            });
          });
        };
        loop();
      }
      disposers.push(() => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } });

      let st: any = null;
      let tl: any = null;
      let lastActive = -1;

      function buildLayout() {
        const VW = window.innerWidth;
        const VH = window.innerHeight;
        const tW = Math.max(120, Math.min(Math.round(VW * 0.155), 200));
        const tH = Math.round(tW * 0.66);
        const CARD_W = VW * 0.8;
        const CARD_H = VH * 0.65;
        const CARD_GAP = VH * 0.2;
        const stackLeft = (VW - CARD_W) / 2;
        const STACK_TOP = (VH - CARD_H) / 2;
        const cardTop = (i: number) => STACK_TOP + i * (CARD_H + CARD_GAP);
        const panAmt = (N - 1) * (CARD_H + CARD_GAP);
        const scattered = getScattered(VW, VH, tW, tH);
        basePos = scattered.map(s => ({ left: s.left, top: s.top }));
        const snapPoints = Array.from({ length: N }, (_, i) =>
          0.5 + (i / (N - 1)) * 0.5
        );
        const scrollDist = VH * 9;
        spacerEl!.style.height = `${VH + scrollDist}px`;
        return { VW, VH, tW, tH, CARD_W, CARD_H, CARD_GAP, stackLeft, STACK_TOP, cardTop, panAmt, scattered, snapPoints, scrollDist };
      }

      function updateActiveCard(progress: number, L: ReturnType<typeof buildLayout>) {
        scrollPhase = progress;
        const panProgress = Math.max(0, (progress - 0.5) / 0.5);

        pBar!.style.width = progress * 100 + "%";
        hint!.style.opacity = progress < 0.04 ? "1" : "0";

        gsap.set(stageHero, {
          opacity: Math.max(0, 1 - progress * 3.5),
          y: progress * -60,
        });

        const idx = Math.min(N - 1, Math.round(panProgress * (N - 1)));
        if (idx !== lastActive) {
          heroSteps.forEach((s, j) => s?.classList.toggle("active", j === idx));
          lastActive = idx;
          if (progress > 0.5) {
            gsap.fromTo(flash, { opacity: 0.08 }, { opacity: 0, duration: 0.5, ease: "power2.out" });
          }
        }

        if (progress < 0.45) {
          cards.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, { scale: 1, opacity: 1 });
            gsap.set(infos[i], { opacity: 0, y: 0 });
            gsap.set(imgs[i], { yPercent: -10 });
          });
          return;
        }

        const galY = gsap.getProperty(gallery, "y") as number;
        cards.forEach((card, i) => {
          if (!card) return;
          const cardCentre = L.cardTop(i) + L.CARD_H / 2 + galY;
          const normDist = (cardCentre - L.VH / 2) / L.VH;
          const absDist = Math.abs(normDist);
          const scaleFactor = 1 - 0.2 * Math.min(absDist / 0.5, 1);
          const cardOpacity = Math.max(0, 1 - absDist * 2.0);
          gsap.set(card, { scale: scaleFactor, opacity: cardOpacity });
          const textOpacity = Math.max(0, 1 - absDist * 3);
          gsap.set(infos[i], { opacity: textOpacity, y: normDist * -20 });
          gsap.set(imgs[i], { yPercent: normDist * 20 - 10 });
        });
      }

      /* ── INIT ── */
      function init() {
        if (st) { st.kill(); st = null; }
        if (tl) { tl.kill(); tl = null; }
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.refresh();
        lastActive = -1; scrollPhase = 0; lerpX = 0; lerpY = 0;

        const L = buildLayout();

        cards.forEach((card, i) => {
          if (!card) return;
          const s = L.scattered[i];
          gsap.set(card, {
            left: s.left, top: s.top,
            width: s.w, height: s.h,
            borderRadius: 6, zIndex: i + 1,
            x: 0, y: 0, opacity: 1,
            clearProps: "boxShadow",
          });
          card.classList.remove("sc-expanded");
          gsap.set(infos[i], { opacity: 0, y: 12 });
          gsap.set(imgs[i], { yPercent: -10 });
        });
        gsap.set(gallery, { y: 0 });
        gsap.set(stageHero, { opacity: 1, y: 0 });

        // 1. REMOVED OVERWRITE FROM TIMELINE DEFAULTS
        tl = gsap.timeline();

        cards.forEach((card, i) => {
          if (!card) return;
          const s = L.scattered[i];
          tl.fromTo(
            card,
            { left: s.left, top: s.top, width: s.w, height: s.h, borderRadius: 6, x: 0, y: 0, scale: 1, opacity: 1 },
            {
              left: L.stackLeft, top: L.cardTop(i),
              width: L.CARD_W, height: L.CARD_H,
              borderRadius: 12, x: 0, y: 0, scale: 1, opacity: 1,
              ease: "power3.inOut", duration: 1, // 2. REMOVED OVERWRITE FROM PROPERTY TARGETS
              onUpdate() {
                card.classList.toggle("sc-expanded", card.offsetWidth / L.CARD_W > 0.5);
              },
              onReverseComplete() { card.classList.remove("sc-expanded"); },
            },
            0
          );
        });

        tl.fromTo(
          gallery,
          { y: 0 },
          { y: -L.panAmt, ease: "none", duration: 1 }, // 3. REMOVED OVERWRITE HERE
          1
        );

        st = ScrollTrigger.create({
          trigger: spacerEl,
          start: "top top",
          end: `+=${L.scrollDist}`,
          pin: stageEl,
          pinSpacing: false,
          scrub: 0.4, // 4. TIGHTENED SCRUB (from 0.8 to 0.4) for snappy alignment response
          animation: tl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo(value: number) {
              if (value < 0.48) return value;
              let closest = L.snapPoints[0], minDist = Infinity;
              for (const p of L.snapPoints) {
                const d = Math.abs(value - p);
                if (d < minDist) { minDist = d; closest = p; }
              }
              return closest;
            },
            duration: { min: 0.1, max: 0.4 }, // 5. LOWERED SNAP DURATIONS for a seamless catch
            delay: 0.02,                      // 6. LOWERED SNAP DELAY to align with scrub catchup
            ease: "power2.out",
          },
          onUpdate(self: any) { updateActiveCard(self.progress, L); },
        });

        startParallaxLoop();
      }

      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth <= 1024) return;
          init();
        }, 220);
      };
      window.addEventListener("resize", onResize);
      disposers.push(() => { window.removeEventListener("resize", onResize); if (resizeTimer) clearTimeout(resizeTimer); });

      disposers.push(() => {
        if (st) { st.kill(); st = null; }
        if (tl) { tl.kill(); tl = null; }
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      });

      init();
    })();

    return () => {
      dead = true;
      disposers.forEach(fn => fn());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div id="sc-flash" ref={flashRef} />
      <div id="sc-progress" ref={pBarRef} />

      <div id="sc-hint" ref={hintRef}>
        <div className="sc-hint-line" />
        <span></span>
      </div>

      {/* ── DESKTOP: scroll spacer ── */}
      <div id="sc-spacer" ref={spacerRef}>
        <div id="sc-stage" ref={stageRef}>
          <div id="sc-hero" ref={heroRef}>
            <div className="sc-hero-eyebrow">Our Process</div>
            <div className="sc-hero-title">
              From Lab<br />to <em>Your</em><br />Farm.
            </div>
            <p className="sc-hero-desc">
              Every seed we deliver has passed through five rigorous steps — ensuring
              the crop you grow is the strongest it can be.
            </p>
            <div className="sc-hero-steps">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className={"sc-hero-step" + (i === 0 ? " active" : "")}
                  data-n={s.n}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          <div id="sc-gallery" ref={galleryRef}>
            {CARDS_DATA.map((c, i) => (
              <div
                key={c.id}
                className="sc-card"
                ref={el => { cardRefs.current[i] = el; }}
              >
                <div className="sc-card-imgwrap">
                  <img
                    src={c.img}
                    alt={c.tag}
                    ref={el => { imgRefs.current[i] = el; }}
                  />
                </div>
                <div
                  className="sc-card-info"
                  ref={el => { infoRefs.current[i] = el; }}
                >
                  <div className="sc-card-eyebrow">{c.tag}</div>
                  <div className="sc-card-title">
                    <em>{c.em}</em>
                    {c.h1}<br />{c.h2}
                  </div>
                  <div className="sc-card-bottom">
                    <p className="sc-card-desc">{c.desc}</p>
                    <div className="sc-card-stat">
                      <strong>{c.stat}</strong>
                      <span>{c.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: after section ── */}
      <div id="sc-after">
        <h2><span className="sc-black-text">One Seed<br /></span><em>Infinite Potential</em></h2>
        <p>
          Every seed we send you has been selected, tested, trialed, and packed with
          care — because we believe the future of farming begins with a seed you can trust.
        </p>
        <div className="sc-after-grid">
          <div className="sc-after-stat"><strong>5</strong><span>Step Process</span></div>
          <div className="sc-after-stat"><strong>20+</strong><span>Varieties</span></div>
          <div className="sc-after-stat"><strong>24hr</strong><span>Dispatch</span></div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div id="sc-mobile">
        {/* Mobile hero */}
        <div className="sc-m-hero">
          <div className="sc-m-eyebrow">Our Process</div>
          <div className="sc-m-hero-title">
            From Lab<br />to <em>Your</em><br />Farm.
          </div>
          <p className="sc-m-hero-desc">
            Five rigorous steps — ensuring the crop you grow is the strongest it can be.
          </p>
          <div className="sc-m-scrollhint">Scroll to explore</div>
        </div>

        {/* Stacking cards */}
        <div className="sc-m-stack">
          {CARDS_DATA.map((c, i) => (
            <div
              key={c.id}
              className="sc-m-item"
              style={{ zIndex: i + 1, top: `calc(80px + ${i * 20}px)` }}
            >
              <div className="sc-m-card">
                <div className="sc-m-imgwrap">
                  <img src={c.img} alt={c.tag} loading="lazy" />
                  <div className="sc-m-imgoverlay" />
                  <div className="sc-m-step-num">{`0${i + 1}`}</div>
                </div>
                <div className="sc-m-body">
                  <span className="sc-m-tag">{c.tag}</span>
                  <div className="sc-m-title">
                    <em>{c.mTitle1}</em>
                    {c.mTitle2}
                  </div>
                  <p className="sc-m-desc">{c.mDesc}</p>
                  <div className="sc-m-stat">
                    <strong>{c.stat}</strong>
                    <span>{c.statLabel}</span>
                  </div>
                  <div className="sc-m-progress-wrap">
                    <div className="sc-m-progress-fill" style={{ width: `${((i + 1) / N) * 100}%` }} />
                  </div>
                  <div className="sc-m-counter">{i + 1} / {N}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Extra scroll space so last card can fully stick */}
          <div className="sc-m-tail" />
        </div>

        {/* Mobile after */}
        <div className="sc-m-after">
          <h2><span className="sc-black-text">One Seed<br /></span><em>Infinite Potential</em></h2>
          <p>Every seed selected, tested, trialed, and packed with care.</p>
          <div className="sc-m-after-grid">
            <div className="sc-m-after-stat"><strong>5</strong><span>Steps</span></div>
            <div className="sc-m-after-stat"><strong>200+</strong><span>Varieties</span></div>
            <div className="sc-m-after-stat"><strong>24hr</strong><span>Dispatch</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --sc-accent: #3d6b2f;
  --sc-bg:     #f5f0e8;
  --sc-text:   #0d1208;
  --sc-muted:  #8c7e6a;
  --sc-card-text: #ffffff;
  --sc-card-accent: #8cc63f;
}

/* ── PROGRESS BAR ── */
#sc-progress {
  position: fixed; bottom: 0; left: 0; height: 2px;
  background: var(--sc-accent); width: 0%; z-index: 700;
  pointer-events: none; transition: width .12s linear;
}

/* ── SCROLL HINT ── */
#sc-hint {
  position: fixed; bottom: 2.5rem; left: 50%;
  transform: translateX(-50%); z-index: 700; pointer-events: none;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  transition: opacity .6s; font-family: 'DM Sans', sans-serif;
}
#sc-hint span { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; color: var(--sc-muted); }
.sc-hint-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--sc-accent), transparent);
  animation: sc-hint-drop 2.2s ease-in-out infinite;
}
@keyframes sc-hint-drop {
  0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
  40%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
  80%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}

/* ── FLASH ── */
#sc-flash {
  position: fixed; inset: 0; z-index: 600;
  background: var(--sc-bg); opacity: 0; pointer-events: none;
}

/* ─────────────────────────────────────────
   DESKTOP
───────────────────────────────────────── */
#sc-mobile { display: none; }

#sc-spacer {
  position: relative;
  height: 1000vh;
  width: 100%;
}

#sc-stage {
  position: relative; width: 100%; height: 100vh;
  overflow: hidden; background: var(--sc-bg);
  font-family: 'DM Sans', sans-serif; color: var(--sc-text);
}

#sc-hero {
  position: absolute;
  left: clamp(2rem, 5vw, 5rem);
  top: clamp(90px, 15vh, 140px);
  z-index: 10; max-width: min(480px, 45vw);
  pointer-events: none; will-change: opacity, transform;
}
.sc-hero-eyebrow {
  font-size: clamp(8px, .85vw, 10px); letter-spacing: .22em;
  text-transform: uppercase; color: var(--sc-accent);
  margin-bottom: clamp(.5rem, 1vw, 1rem);
  display: flex; align-items: center; gap: 12px;
}
.sc-hero-eyebrow::before {
  content: ''; display: block; width: 24px; height: 1px;
  background: var(--sc-accent); flex-shrink: 0;
}
.sc-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 300; line-height: .95;
  color: var(--sc-text); letter-spacing: -.01em;
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
}
.sc-hero-title em { font-style: italic; color: var(--sc-accent); }
.sc-hero-desc {
  font-size: clamp(11px, 1vw, 13px); line-height: 1.5;
  color: rgba(13, 18, 8, 0.75); font-weight: 300;
  margin-bottom: clamp(0.8rem, 1.5vw, 1.5rem);
}
.sc-hero-steps { display: flex; flex-direction: column; gap: 6px; }
.sc-hero-step {
  display: flex; align-items: center; gap: 12px;
  font-size: clamp(8px, .8vw, 10px); letter-spacing: .12em;
  text-transform: uppercase; color: rgba(13, 18, 8, 0.4); transition: color .3s;
}
.sc-hero-step::before {
  content: attr(data-n);
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem); font-weight: 300;
  color: var(--sc-accent); opacity: .5; min-width: 1.2rem; line-height: 1;
}
.sc-hero-step.active { color: rgba(13, 18, 8, 0.9); }
.sc-hero-step.active::before { opacity: 1; }

#sc-gallery {
  position: absolute; inset: 0;
  overflow: visible; pointer-events: none; z-index: 1;
}

/* ── CARD ── */
.sc-card {
  position: absolute; overflow: hidden;
  will-change: transform, opacity; pointer-events: all;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}
.sc-card-imgwrap {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; overflow: hidden;
  will-change: transform;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
}
.sc-card-imgwrap img {
  width: 100%; height: 120%; object-fit: cover; display: block;
  pointer-events: none; user-select: none; will-change: transform;
  transform: translate3d(0, -10%, 0);
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
}

/*
  KEY FIX 1: Always show a strong dark gradient from bottom,
  plus a dark top vignette — works for both light and dark images.
  Removed the opacity:0 → opacity:1 toggle entirely.
*/
.sc-card::after {
  content: ''; position: absolute; inset: 0; z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(to top,  rgba(5,10,4,0.88) 0%,  rgba(5,10,4,0.55) 40%, transparent 70%),
    linear-gradient(to bottom, rgba(5,10,4,0.45) 0%, transparent 30%);
}

.sc-card-info {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
  padding: clamp(1.2rem,3vw,2.8rem) clamp(1.4rem,3.5vw,3.2rem) clamp(1rem,2.5vw,2.4rem);
  opacity: 0; pointer-events: none; will-change: opacity, transform;
}

/* KEY FIX 2: Eyebrow — brighter accent so visible over dark overlay */
.sc-card-eyebrow {
  font-size: clamp(8px,.9vw,10px); letter-spacing: .22em; text-transform: uppercase;
  color: var(--sc-card-accent);
  margin-bottom: clamp(.5rem,1vw,1rem);
  display: flex; align-items: center; gap: 12px;
}
.sc-card-eyebrow::before {
  content: ''; display: block; width: 28px; height: 1px;
  background: var(--sc-card-accent); flex-shrink: 0;
}

/* KEY FIX 3: Title — white + text-shadow so it pops on any image */
.sc-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem,6vw,7.5rem);
  font-weight: 300; line-height: .9;
  color: #ffffff;
  letter-spacing: -.01em;
  text-shadow: 0 2px 24px rgba(0,0,0,0.5);
}
.sc-card-title em {
  font-style: italic;
  color: rgba(255,255,255,.65);
  font-size: .6em; display: block;
  margin-bottom: .1em; letter-spacing: .02em;
  text-shadow: 0 1px 12px rgba(0,0,0,0.4);
}

.sc-card-bottom {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-top: clamp(.8rem,2vw,2rem); gap: 1rem; flex-wrap: wrap;
}

/* KEY FIX 4: Description — brighter white + text-shadow */
.sc-card-desc {
  max-width: min(440px, 55%);
  font-size: clamp(11px,1.1vw,13.5px);
  line-height: 1.75;
  color: rgba(255,255,255,0.92);
  font-weight: 300;
  text-shadow: 0 1px 8px rgba(0,0,0,0.6);
}

.sc-card-stat { text-align: right; flex-shrink: 0; }

/* KEY FIX 5: Stat number — bright accent + shadow */
.sc-card-stat strong {
  display: block; font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem,4.5vw,4.2rem); font-weight: 300;
  color: var(--sc-card-accent); line-height: 1;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}

/* KEY FIX 6: Stat label — fully white so it's readable */
.sc-card-stat span {
  font-size: clamp(8px,.8vw,9px); letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}

/* ── AFTER SECTION (desktop) ── */
#sc-after {
  background: var(--sc-bg);
  padding: clamp(6rem,12vw,12rem) 5vw clamp(4rem,8vw,10rem);
  text-align: center; font-family: 'DM Sans', sans-serif; color: var(--sc-text);
}
#sc-after h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem,8vw,10rem);
  font-weight: 300; line-height: .9; letter-spacing: -.01em;
}
#sc-after h2 em { font-style: italic; color: var(--sc-accent); }
.sc-black-text { color: #000000; }
#sc-after p {
  margin: 2rem auto 0; max-width: 480px;
  font-size: clamp(13px,1.2vw,15px); color: var(--sc-muted);
  line-height: 1.85; font-weight: 300;
}
.sc-after-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: rgba(0,0,0,.06);
  margin: clamp(3rem,6vw,6rem) auto 0; max-width: 660px;
}
.sc-after-stat {
  padding: clamp(1.5rem,3vw,3rem) 1rem;
  background: var(--sc-bg); text-align: center;
}
.sc-after-stat strong {
  display: block; font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem,5vw,4rem); font-weight: 300;
  color: var(--sc-accent); line-height: 1.1; margin-bottom: 4px;
}
.sc-after-stat span {
  display: block; font-size: 10px; color: var(--sc-muted);
  letter-spacing: .12em; text-transform: uppercase;
}

/* ─────────────────────────────────────────
   MOBILE / TABLET (up to 1024px)
───────────────────────────────────────── */
@media (max-width: 1024px) {
  #sc-hint, #sc-flash, #sc-progress { display: none; }
  #sc-spacer, #sc-stage, #sc-after { display: none; }
  #sc-mobile { display: block; background: var(--sc-bg); }

  .sc-m-hero {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 5rem 1.5rem 3rem;
    background: var(--sc-bg);
    font-family: 'DM Sans', sans-serif;
  }
  .sc-m-eyebrow {
    font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--sc-accent); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 10px;
  }
  .sc-m-eyebrow::before {
    content: ''; display: block; width: 20px; height: 1px;
    background: var(--sc-accent);
  }
  .sc-m-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.2rem, 14vw, 5rem);
    font-weight: 300; line-height: .92; color: var(--sc-text);
    margin-bottom: 1.2rem;
  }
  .sc-m-hero-title em { font-style: italic; color: var(--sc-accent); }
  .sc-m-hero-desc {
    font-size: 13px; line-height: 1.6; color: var(--sc-muted);
    font-weight: 300; max-width: 300px; margin-bottom: 2rem;
  }
  .sc-m-scrollhint {
    display: flex; align-items: center; gap: 10px;
    font-size: 9px; letter-spacing: .18em; text-transform: uppercase;
    color: var(--sc-muted);
  }
  .sc-m-scrollhint::before {
    content: ''; width: 1px; height: 28px;
    background: linear-gradient(to bottom, transparent, var(--sc-accent));
    animation: sc-m-pulse 2s ease-in-out infinite;
  }
  @keyframes sc-m-pulse { 0%,100%{opacity:.3} 50%{opacity:1} }

  .sc-m-stack {
    position: relative;
    height: calc(5 * 52vh + 10vh);
    background: var(--sc-bg);
  }
  .sc-m-item {
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    padding: 0 1.2rem 24px;
    box-sizing: border-box;
  }
  .sc-m-card {
    width: 100%;
    border-radius: 24px;
    overflow: hidden;
    background: linear-gradient(135deg, #131b0e 0%, #0b0f07 100%);
    border: 1px solid rgba(140, 198, 63, 0.12);
    display: flex;
    flex-direction: column;
  }
  .sc-m-imgwrap {
    position: relative;
    width: 100%;
    height: 44vw;
    min-height: 160px;
    max-height: 240px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .sc-m-imgwrap img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .sc-m-imgoverlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,.5) 0%, transparent 60%);
  }
  .sc-m-step-num {
    position: absolute; top: 1rem; left: 1.2rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 13vw, 4rem);
    font-weight: 300; color: rgba(255,255,255,0.9);
    line-height: 1; letter-spacing: -.02em;
    text-shadow: 0 2px 12px rgba(0,0,0,0.5);
  }
  .sc-m-body {
    padding: 1.1rem 1.3rem;
    background: transparent;
    flex: 1;
  }
  .sc-m-tag {
    display: inline-block;
    font-size: 8px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--sc-card-accent);
    background: rgba(140, 198, 63, 0.08);
    border: 1px solid rgba(140, 198, 63, 0.25);
    padding: 4px 10px; border-radius: 100px;
    margin-bottom: .6rem;
    font-weight: 500;
  }
  .sc-m-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 8.5vw, 2.8rem);
    font-weight: 300; line-height: .92;
    color: #ffffff; letter-spacing: -.01em;
    margin-bottom: .4rem;
  }
  .sc-m-title em {
    font-style: italic; color: rgba(255,255,255,.55);
    font-size: .62em; display: block;
    margin-bottom: .12em; letter-spacing: .02em;
  }
  .sc-m-desc {
    font-size: 12px; line-height: 1.7;
    color: rgba(255,255,255,.75); font-weight: 300;
    margin-bottom: .7rem;
  }
  .sc-m-stat {
    display: flex; align-items: baseline; gap: .4rem;
    margin-bottom: .7rem;
  }
  .sc-m-stat strong {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 7vw, 2.2rem); font-weight: 300;
    color: var(--sc-card-accent); line-height: 1;
  }
  .sc-m-stat span {
    font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
    color: rgba(255,255,255,.6);
  }
  .sc-m-progress-wrap {
    height: 3px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 100px; overflow: hidden; margin-bottom: .5rem;
  }
  .sc-m-progress-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, var(--sc-card-accent) 0%, #a2db58 100%);
  }
  .sc-m-counter {
    font-size: 9px; letter-spacing: .16em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); text-align: right;
  }

  .sc-m-tail { height: 8vh; }

  .sc-m-after {
    background: var(--sc-bg);
    padding: 5rem 1.5rem 4rem;
    text-align: center; font-family: 'DM Sans', sans-serif;
  }
  .sc-m-after h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 13vw, 5rem);
    font-weight: 300; line-height: .92; letter-spacing: -.01em;
    color: var(--sc-text); margin-bottom: 1.2rem;
  }
  .sc-m-after h2 em { font-style: italic; color: var(--sc-accent); }
  .sc-m-after p {
    font-size: 13px; line-height: 1.7; color: var(--sc-muted);
    font-weight: 300; max-width: 280px; margin: 0 auto 2.5rem;
  }
  .sc-m-after-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1px; background: rgba(0,0,0,.08);
    max-width: 340px; margin: 0 auto;
  }
  .sc-m-after-stat {
    padding: 1.5rem .5rem; background: var(--sc-bg); text-align: center;
  }
  .sc-m-after-stat strong {
    display: block; font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 9vw, 3rem); font-weight: 300;
    color: var(--sc-accent); line-height: 1.1; margin-bottom: 3px;
  }
  .sc-m-after-stat span {
    display: block; font-size: 9px; color: var(--sc-muted);
    letter-spacing: .12em; text-transform: uppercase;
  }
}

/* ── Tablet refinements (769px – 1024px) ── */
@media (min-width: 769px) and (max-width: 1024px) {
  .sc-m-hero {
    padding: 7rem 3rem 4rem;
  }
  .sc-m-hero-title {
    font-size: clamp(4rem, 8vw, 6rem);
  }
  .sc-m-hero-desc {
    font-size: 15px;
    max-width: 480px;
  }
  .sc-m-stack {
    height: calc(5 * 52vh + 10vh);
  }
  .sc-m-item {
    padding: 0 3rem 32px;
  }
  .sc-m-card {
    flex-direction: row;
    border-radius: 20px;
  }
  .sc-m-imgwrap {
    width: 42%;
    height: auto;
    min-height: 220px;
    max-height: none;
    flex-shrink: 0;
  }
  .sc-m-body {
    padding: 1.8rem 2rem;
  }
  .sc-m-title {
    font-size: clamp(2.2rem, 4vw, 3.2rem);
  }
  .sc-m-desc {
    font-size: 14px;
  }
  .sc-m-after {
    padding: 6rem 3rem 5rem;
  }
  .sc-m-after h2 {
    font-size: clamp(3.5rem, 7vw, 5.5rem);
  }
  .sc-m-after-grid {
    max-width: 500px;
  }
}
`;