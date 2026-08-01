

import { useEffect, useRef } from "react";
import './SeedCompanySection.css'
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
    if (!src) return reject(new Error("Script source is undefined"));
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
      await loadScript((import.meta.env.VITE_GSAP_CDN as string) || "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript((import.meta.env.VITE_SCROLLTRIGGER_CDN as string) || "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
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

