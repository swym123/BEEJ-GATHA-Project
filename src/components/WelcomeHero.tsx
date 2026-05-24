import logo from "../assets/beej-gatha-logo.png";

export default function WelcomeHero() {
  return (
    <>
      <style>{css}</style>
      <section className="wh-hero">
        <div className="wh-bg" />
        <div className="wh-inner">
          <img src={logo} alt="Beej Gatha logo" className="wh-logo" />
          <p className="wh-eyebrow">— Welcome to —</p>
          <h1>Beej Gatha</h1>
          <p className="wh-sub">हर खेत में हरियाली</p>
          <p className="wh-lead">A story written in soil. Where Indian science meets the farmer's hand — seed by seed, field by field.</p>
          <a href="#scrub-stage" className="wh-cta">Begin the journey ↓</a>
        </div>
      </section>
    </>
  );
}

const css = `
.wh-hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%); color: #f5f0e8; overflow: hidden; text-align: center; padding: 6rem 1.5rem 4rem; }
.wh-bg { position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, rgba(140,198,63,.18), transparent 50%), radial-gradient(circle at 70% 80%, rgba(61,107,47,.25), transparent 55%); }
.wh-inner { position: relative; z-index: 2; max-width: 780px; }
.wh-logo { width: clamp(120px, 18vw, 180px); height: auto; margin-bottom: 1.5rem; border-radius: 50%; box-shadow: 0 20px 60px rgba(0,0,0,.5); animation: whFloat 6s ease-in-out infinite; }
@keyframes whFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.wh-eyebrow { font-size: .75rem; letter-spacing: .4em; text-transform: uppercase; color: #8cc63f; margin: 0 0 1rem; }
.wh-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(3rem, 9vw, 6.5rem); line-height: 1; margin: 0 0 .8rem; letter-spacing: -.02em; }
.wh-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.2rem, 2.5vw, 1.8rem); color: rgba(245,240,232,.7); margin: 0 0 2rem; }
.wh-lead { font-family: 'DM Sans', sans-serif; font-size: clamp(.95rem, 1.4vw, 1.1rem); line-height: 1.8; color: rgba(245,240,232,.65); max-width: 560px; margin: 0 auto 2.5rem; }
.wh-cta { display: inline-block; padding: .9rem 2.2rem; border: 1px solid rgba(140,198,63,.45); border-radius: 999px; color: #8cc63f; text-decoration: none; font-size: .75rem; letter-spacing: .3em; text-transform: uppercase; transition: all .3s; }
.wh-cta:hover { background: #8cc63f; color: #0d1208; transform: translateY(-2px); }
`;
