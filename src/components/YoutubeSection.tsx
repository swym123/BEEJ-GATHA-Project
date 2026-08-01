import seedVideo from "../assets/beej2.mp4";
import './YoutubeSection.css'

export default function YoutubeSection() {
  return (
    <>
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