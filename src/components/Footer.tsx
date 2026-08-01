import { Link } from "react-router-dom";
import './Footer.css'

export default function Footer() {
  return (
    <>
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
            <a href={`mailto:${import.meta.env.VITE_BUSINESS_EMAIL}`}>{import.meta.env.VITE_BUSINESS_EMAIL}</a>
            <a href={`tel:${import.meta.env.VITE_BUSINESS_PHONE_TEL}`}>{import.meta.env.VITE_BUSINESS_PHONE_DISPLAY}</a>
            <p className="ft-addr">Keshod, Gujarat, India</p>
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
