import { useEffect } from "react";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded into window, resolve immediately
    if (src.includes("gsap.min") && (window as any).gsap) return resolve();
    if (src.includes("ScrollTrigger") && (window as any).ScrollTrigger) return resolve();

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      // Tag exists but globals not ready yet — poll until they appear
      const interval = setInterval(() => {
        if (src.includes("gsap.min") && (window as any).gsap) { clearInterval(interval); resolve(); }
        if (src.includes("ScrollTrigger") && (window as any).ScrollTrigger) { clearInterval(interval); resolve(); }
      }, 20);
      existing.addEventListener("error", () => { clearInterval(interval); reject(); });
      return;
    }

    // Fresh inject
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export default function EnergySection() {
  useEffect(() => {
    let cancelled = false;
    let kill: (() => void) | undefined;
    (async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
      if (cancelled) return;
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const pinSec = document.getElementById("energy-pin");
      const greenCover = document.getElementById("e-cover");
      const img1 = document.querySelector(".e-img-1");
      const img2 = document.querySelector(".e-img-2");
      const img3 = document.querySelector(".e-img-3");
      const wReliable = document.querySelectorAll(".e-word-reliable");
      const wClean = document.querySelectorAll(".e-word-clean");
      if (!pinSec) return;

      const tl2 = gsap.timeline({ paused: true });
      tl2.to(greenCover, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 0);
      tl2.to(document.querySelectorAll(".e-word-resilient"), { opacity: 1, duration: 0.5 }, 0.8);
      tl2.to(document.querySelectorAll(".e-right-word .e-word"), { opacity: 1, duration: 0.5 }, 0.8);
      tl2.to({}, { duration: 1.2 }, 0.8);
      tl2.fromTo(img1, { scale: 1 }, { scale: 1.12, duration: 1.2, ease: "none" }, 0.8);
      tl2.to(img1, { opacity: 0, duration: 0.8 }, 2.0);
      tl2.to(img2, { opacity: 1, duration: 0.8 }, 2.0);
      tl2.fromTo(img2, { scale: 1 }, { scale: 1.12, duration: 2.0, ease: "none" }, 2.0);
      tl2.to(wReliable, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 2.15);
      tl2.to({}, { duration: 1.2 }, 2.8);
      tl2.to(img2, { opacity: 0, duration: 0.8 }, 4.0);
      tl2.to(img3, { opacity: 1, duration: 0.8 }, 4.0);
      tl2.fromTo(img3, { scale: 1 }, { scale: 1.12, duration: 1.6, ease: "none" }, 4.0);
      tl2.to(wClean, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 4.15);
      tl2.to({}, { duration: 0.8 }, 4.8);

      const st = ScrollTrigger.create({
        trigger: pinSec, start: "top top", end: "+=400%", pin: true, scrub: 1.2, animation: tl2, anticipatePin: 1,
      });
      kill = () => { st.kill(); tl2.kill(); };
    })();
    return () => { cancelled = true; kill?.(); };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div id="energy-pin" className="e-pin-wrapper">
        <section className="e-pin-section">
          <div className="e-text-layout e-base-layer" aria-hidden="true">
            <div className="e-left-words">
              <span className="e-word e-word-resilient">Resilient,</span>
              <span className="e-word e-word-reliable">High-Yield,</span>
              <span className="e-word e-word-clean">Pure</span>
            </div>
            <div className="e-right-word"><span className="e-word">Seeds</span></div>
          </div>
          <div className="e-image-container">
            <div className="e-layer-img e-img-1" style={{ backgroundImage: "url('https://www.botanicalinterests.com/community/blog/wp-content/uploads/2024/08/sprouting-seeds-at-home-disinfecting-growing-and-harvesting-tips.jpg')" }} />
            <div className="e-layer-img e-img-2" style={{ backgroundImage: "url('https://5.imimg.com/data5/SELLER/Default/2024/5/417710632/ML/ML/UC/221692235/groundnut-500x500.png')" }} />
            <div className="e-layer-img e-img-3" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1557875324/photo/wheat-grain-in-a-hand-after-good-harvest-of-successful-farmer.jpg?s=612x612&w=0&k=20&c=VMrYu6CJnaN_XDmYdf5dxhTitUGUeOxmpVYGQs-d98Y=')" }} />
            <div className="e-text-layout e-overlay-layer" aria-hidden="true">
              <div className="e-left-words">
                <span className="e-word e-word-resilient">Resilient,</span>
                <span className="e-word e-word-reliable">High-Yield,</span>
                <span className="e-word e-word-clean">Pure</span>
              </div>
              <div className="e-right-word"><span className="e-word">Seeds</span></div>
            </div>
            <div className="e-cover" id="e-cover">
              <h2 className="e-cover-title">The Future<br />of Farming</h2>
              <p className="e-cover-desc">Growing tomorrow with superior genetics, resilient varieties, and sustainable practices.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const css = `
.e-pin-wrapper { position: relative; width: 100%; height: 100vh; }
.e-pin-section { position: relative; width: 100%; height: 100vh; background: #f5f0e8; overflow: hidden; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); font-family: 'DM Sans', sans-serif; }
.e-pin-section *, .e-pin-section *::before, .e-pin-section *::after { box-sizing: border-box; }
.e-text-layout { position: absolute; width: 100vw; height: 100vh; pointer-events: none; user-select: none; }
.e-base-layer { left: 0; top: 0; z-index: 1; }
.e-overlay-layer { left: calc(-50vw + 29vw / 2); top: calc(-50vh + 70vh / 2); z-index: 3; }
.e-left-words { position: absolute; left: 6vw; top: 50%; transform: translateY(-30%); display: flex; flex-direction: column; align-items: flex-start; }
.e-right-word { position: absolute; right: 6vw; top: 50%; transform: translateY(-50%); }
.e-word { display: block; font-family: 'Bebas Neue', sans-serif; font-size: clamp(3.2rem,8.8vw,10rem); line-height: .93; letter-spacing: .02em; }
.e-base-layer .e-word { color: #0d1208; }
.e-overlay-layer .e-left-words .e-word { color: #ffffff; }
.e-overlay-layer .e-right-word .e-word { color: #8cc63f; }
.e-word-reliable, .e-word-clean { opacity: 0; transform: translateY(36px); }
.e-word-resilient { opacity: 0; }
.e-right-word .e-word { opacity: 0; }
.e-image-container { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 29vw; height: 70vh; overflow: hidden; z-index: 2; border-radius: 3px; }
.e-layer-img { position: absolute; inset: 0; width: 100%; height: 100%; background-size: cover; background-position: center; background-repeat: no-repeat; will-change: transform; }
.e-img-1 { opacity: 1; z-index: 1; }
.e-img-2 { opacity: 0; z-index: 2; }
.e-img-3 { opacity: 0; z-index: 3; }
.e-cover { position: absolute; inset: 0; z-index: 10; background-color: #3d6b2f; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1.5rem; }
.e-cover-title { font-family: 'Bebas Neue', 'Cormorant Garamond', sans-serif; font-weight: 700; font-size: clamp(2.4rem,5.5vw,5rem); line-height: .95; letter-spacing: .03em; color: #f5f0e8; }
.e-cover-desc { font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: clamp(.9rem,1.1vw,1.05rem); line-height: 1.5; color: #0c0c0c; margin-top: 1rem; max-width: 30ch; opacity: .85; }
@media (max-width: 768px) {
  .e-image-container { width: 78vw; height: 42vh; }
  .e-overlay-layer { left: calc(-50vw + 78vw / 2); top: calc(-50vh + 42vh / 2); }
  .e-word { font-size: clamp(2.6rem,11vw,5rem); }
}
`;
