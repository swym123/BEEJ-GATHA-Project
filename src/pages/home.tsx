import { useEffect } from "react";

import ScrollVideoSection from "../components/ScrollVideoSection";
import YoutubeSection from "../components/YoutubeSection";
import SeedCompanySection from "../components/SeedCompanySection";
import ScientistsSection from "../components/ScientistsSection";
import MissionSection from "../components/MissionSection";
import EnergySection from "../components/EnergySection";

function Home() {
  useEffect(() => {
    const pbar = document.getElementById("pbar");
    const onProg = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (pbar) pbar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onProg, { passive: true });
    return () => window.removeEventListener("scroll", onProg);
  }, []);

  return (
    <div style={{ overflowX: "clip", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`#pbar { position: fixed; top: 0; left: 0; height: 2px; width: 0%; background: linear-gradient(90deg, #3d6b2f, #8cc63f); z-index: 1000; transition: width 60ms linear; }`}</style>
      {/* <Loader /> */}
      <ScrollVideoSection />
      <SeedCompanySection />
      <YoutubeSection />
      <ScientistsSection />
      <MissionSection />
      <EnergySection />
    </div>
  );
}

export default Home;
