import { useEffect } from "react";
import "./EnergySection.css";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!src) return reject(new Error("Script source is undefined"));
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
      await loadScript((import.meta.env.VITE_GSAP_CDN as string) || "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript((import.meta.env.VITE_SCROLLTRIGGER_CDN as string) || "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
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
            <div className="e-layer-img e-img-1" style={{ backgroundImage: "url('https://images.stockcake.com/public/9/0/e/90e102ab-49c6-441a-8210-6a7c19f4a925_large/hand-holding-cotton-stockcake.jpg')" }} />
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
