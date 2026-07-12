import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";
import animationData from "../assets/loader-animation.json";

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
      <style>{css}</style>

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

const css = `
.bg-loader{
    position:fixed;
    inset:0;
    z-index:99999;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#f1f8e9,#dcedc8);
    overflow:hidden;
    transition:opacity .6s ease;
}

.bg-loader.fade-out{
    opacity:0;
    pointer-events:none;
}

.bg-loader-glow{
    position:absolute;
    width:430px;
    height:430px;
    border-radius:50%;
    background:radial-gradient(circle,rgba(140,198,63,.35),transparent 70%);
    filter:blur(40px);
}

.bg-loader-content{
    position:relative;
    z-index:2;
    display:flex;
    flex-direction:column;
    align-items:center;
}

.bg-loader-anim{
    position:relative;
    width:240px;
    height:240px;
    margin-bottom:28px;
}

.bg-progress-ring{
    position:absolute;
    inset:0;
    transform:rotate(-90deg);
}

.bg-progress-circle{
    stroke:url(#bgGradStroke);
    stroke-dasharray:659;
    stroke-dashoffset:659;
    stroke-linecap:round;
    animation:bgFill 2.2s ease forwards;
    filter:drop-shadow(0 0 8px rgba(76,175,80,.5));
}

@keyframes bgFill{
    to{
        stroke-dashoffset:0;
    }
}

.bg-lottie{
    position:absolute;
    inset:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    animation:bgBreathe 2.5s ease-in-out infinite;
}

.bg-lottie>div{
    width:100%;
    height:100%;
}

@keyframes bgBreathe{
    0%,100%{
        transform:scale(1);
    }
    50%{
        transform:scale(1.05);
    }
}

.bg-loader-title{
    font-family:"Playfair Display",Georgia,serif;
    font-size:46px;
    font-weight:700;
    color:#2e7d32;
    letter-spacing:2px;
    text-align:center;
    text-shadow:0 2px 8px rgba(0,0,0,.08);
    animation:titleFade .9s ease forwards;
}

@keyframes titleFade{
    from{
        opacity:0;
        transform:translateY(20px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

@media(max-width:768px){

.bg-loader-anim{
    width:180px;
    height:180px;
}

.bg-progress-ring{
    width:180px;
    height:180px;
}

.bg-loader-title{
    font-size:32px;
}
}
`;