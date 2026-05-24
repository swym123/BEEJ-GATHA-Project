import seedVideo from "../assets/beej2.mp4";

export default function YoutubeSection() {
  return (
    <>
      <style>{css}</style>
      <section className="yt-sec">
        <div className="yt-container">
          <div className="yt-header">
            <span className="yt-tag">Vision in Motion</span>
            <h2 className="yt-title">Our <em>Farming</em> Legacy</h2>
            <p className="yt-desc">
              Take a journey through the golden fields and state-of-the-art labs where the seeds of tomorrow's prosperity are sown, nurtured, and brought to life.
            </p>
          </div>

          <div className="yt-player-wrapper">
            <div className="yt-player-inner">
              <video
                src={seedVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const css = `
.yt-sec {
  background: linear-gradient(to bottom, #0d1208 0%, #16220f 100%);
  padding: clamp(4rem, 10vw, 8rem) 0 0; /* Zero left/right padding for edge-to-edge cinematic layout */
  font-family: 'DM Sans', sans-serif;
  color: #f5f0e8;
  position: relative;
  overflow: hidden;
}

.yt-sec::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(140, 198, 63, 0.08) 0%, transparent 70%);
  top: -10%;
  right: -10%;
  pointer-events: none;
}

.yt-sec::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(61, 107, 47, 0.15) 0%, transparent 70%);
  bottom: -10%;
  left: -10%;
  pointer-events: none;
}

.yt-container {
  width: 100%;
  max-width: 100%;
  position: relative;
  z-index: 2;
}

.yt-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto clamp(3rem, 6vw, 4.5rem);
  padding: 0 1.5rem; /* Retain horizontal breathing room for text content */
}

.yt-tag {
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #8cc63f;
  display: inline-block;
  margin-bottom: 1rem;
}

.yt-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  letter-spacing: -0.01em;
}

.yt-title em {
  font-style: italic;
  color: #8cc63f;
}

.yt-desc {
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.8;
  color: rgba(245, 240, 232, 0.7);
}

.yt-player-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.yt-player-inner {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Cinema Aspect Ratio */
  background: #000;
  z-index: 2;
  border: 0;
  border-radius: 0;
}

.yt-player-inner video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0;
}
`;
