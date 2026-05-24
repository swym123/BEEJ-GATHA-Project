import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{css}</style>

      <footer className="ft">
        <div className="ft-grid">
          <div>
            <h4 className="ft-logo">
              Beej<span>Gatha</span>
            </h4>
            <p className="ft-tag">
              From lab to field — growing tomorrow's harvest with today's science.
            </p>
          </div>

          <div>
            <h5>Explore</h5>
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/about">About</Link>
            <Link to="/mission">Mission</Link>
            <Link to="/policy">Policy</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h5>Reach Us</h5>
            <a href="mailto:hello@beejgatha.com">hello@beejgatha.com</a>
            <a href="tel:+911234567890">+91 12345 67890</a>
            <p className="ft-addr">Pune, Maharashtra, India</p>
          </div>

          <div>
            <h5>Follow</h5>
            <a href="#" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>

        <div className="ft-bot">
          <p>© {new Date().getFullYear()} Beej Gatha · From Seed to Life</p>
          <p>Crafted with care for the planet 🌱</p>
        </div>
      </footer>
    </>
  );
}

const css = `
.ft { background: #f5f0e8; color: #0d1208; padding: clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem) 2rem; font-family: 'DM Sans', sans-serif; border-top: 3px solid #8cc63f; }
.ft-grid { display: grid; grid-template-columns: 2fr 1fr 1.2fr 1fr; gap: 3rem; max-width: 1200px; margin: 0 auto; }
@media (max-width: 760px) { .ft-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
@media (max-width: 480px) { .ft-grid { grid-template-columns: 1fr; } }
.ft-logo { font-family: 'Outfit', 'Playfair Display', sans-serif; font-size: 1.6rem; margin: 0 0 .8rem; font-weight: 800; color: #0d1208; }
.ft-logo span { color: #8cc63f; font-style: normal; }
.ft-tag { font-size: .85rem; line-height: 1.7; color: #5a4f3e; max-width: 32ch; }
.ft h5 { font-size: .65rem; letter-spacing: .3em; text-transform: uppercase; color: #3d6b2f; margin: 0 0 1.2rem; }
.ft a { display: block; color: #5a4f3e; text-decoration: none; font-size: .85rem; padding: .35rem 0; transition: color .25s; }
.ft a:hover { color: #8cc63f; }
.ft-addr { font-size: .8rem; color: #8c7e6a; margin-top: .5rem; }
.ft-bot { max-width: 1200px; margin: 3rem auto 0; padding-top: 1.5rem; border-top: 1px solid #e8dcc8; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: #8c7e6a; }
`;