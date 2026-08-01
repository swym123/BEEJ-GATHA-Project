import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import animationData from "../assets/loader-animation.json";
import './Loader.css'
export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lottieOptions = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(lottieOptions);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 3000);
    const t2 = setTimeout(() => setHidden(true), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <>


      <div className={`bg-loader ${fadeOut ? "fade-out" : ""}`}>
        <div className="bg-loader-glow" />

        <div className="bg-loader-content">
          <div className="bg-loader-anim">
            <svg
              className="bg-progress-ring"
              width="240"
              height="240"
              viewBox="0 0 240 240"
            >
              <defs>
                <linearGradient
                  id="bgGradStroke"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8cc63f" />
                  <stop offset="100%" stopColor="#3d6b2f" />
                </linearGradient>
              </defs>

              <circle
                className="bg-progress-circle"
                cx="120"
                cy="120"
                r="105"
                fill="none"
                strokeWidth="6"
              />
            </svg>

            <div className="bg-lottie">{View}</div>
          </div>

          <h1 className="bg-loader-title">Beej Gatha</h1>
        </div>
      </div>
    </>
  );
}
