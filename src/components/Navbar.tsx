import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/beej-gatha-logo.png";
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Current path
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyScrolledStyle = scrolled || !isHome;

  const handleNavClick = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={"nav " + (applyScrolledStyle ? "nav-scrolled" : "")}>
        <Link to="/" className="nav-logo" onClick={handleNavClick}>
          <img src={logo} alt="Beej Gatha" />
          Beej<span>Gatha</span>
        </Link>

        <nav className={"nav-links " + (open ? "open" : "")}>
          <Link to="/" onClick={handleNavClick}>
            Home
          </Link>

          <Link to="/product" onClick={handleNavClick}>
            Product
          </Link>

          <Link to="/about" onClick={handleNavClick}>
            About
          </Link>

          <Link to="/mission" onClick={handleNavClick}>
            Mission
          </Link>

          <Link to="/policy" onClick={handleNavClick}>
            Policy
          </Link>

          <Link to="/careers" onClick={handleNavClick}>
            Careers
          </Link>

          <Link to="/contact" onClick={handleNavClick}>
            Contact
          </Link>
        </nav>

        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
}


