import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import './contact.css'

const YOUR_WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string;
const YOUR_PHONE_TEL = import.meta.env.VITE_PHONE_TEL as string;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const productSku = searchParams.get("inquiry");
    if (productSku) {
      setForm((prev) => ({
        ...prev,
        message: `Hello, I am interested in inquiring about the technical benchmarks, availability, and pricing options regarding seed variety: ${productSku}.`,
      }));
    }
  }, [searchParams]);

  const handleFieldChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSubmitted(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        alert("Thank you! Your message has been sent directly to our seed experts.");
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Service Request Failure:", error);
        alert("Failed to route transmission network packets. Verify your API Keys match configuration profiles.");
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I have an inquiry about your seed varieties.");
    window.open(`https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${YOUR_PHONE_TEL}`;
  };

  return (
    <>

      <div className="contact-page animate-fade-in">
        <section className="contact-hero">
          <div className="contact-hero-inner">
            <p className="contact-eyebrow">— Get In Touch</p>
            <h1>Connect With Us</h1>
            <p className="contact-sub">
              Have questions about seed varieties, soil testing, or distribution? Speak with our agronomists.
            </p>
          </div>
        </section>

        {/* ✅ Quick Contact Bar */}
        <section className="quick-contact-bar">
          <div className="contact-container">
            <div className="quick-contact-grid">
              <button className="quick-btn whatsapp-btn" onClick={handleWhatsApp}>
                <span className="quick-btn-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <span className="quick-btn-text">
                  <span className="quick-btn-label">Chat on WhatsApp</span>
                  <span className="quick-btn-sub">Tap to open WhatsApp</span>
                </span>
              </button>

              <button className="quick-btn call-btn" onClick={handleCall}>
                <span className="quick-btn-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </span>
                <span className="quick-btn-text">
                  <span className="quick-btn-label">Call Us Directly</span>
                  <span className="quick-btn-sub">9805205293</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="contact-body">
          <div className="contact-container">
            <div className="contact-grid">

              {/* Form Section */}
              <div className="contact-form-card">
                <h2>Send a Message</h2>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                    />
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        placeholder="name@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message / Query</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      placeholder="Please detail your query (e.g. Soil type, target crop, acreage)..."
                    />
                  </div>

                  <button type="submit" className="form-submit-btn" disabled={submitted}>
                    {submitted ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              </div>

              {/* Info Section */}
              <div className="contact-info-panel">
                <div className="info-section">
                  <h2>Corporate Office</h2>
                  <p className="address">
                    Keshod, Gujarat, India
                  </p>
                </div>

                <div className="info-section">
                  <h2>Email Address</h2>
                  <p>
                    <a href="mailto:contact@beejgatha.com">contact@beejgatha.com</a>
                  </p>
                </div>

                <div className="info-section">
                  <h2>Office Helpline</h2>
                  <p>
                    <strong>Gujarat:</strong> <a href="tel:9805205293">9805205293</a><br />
                    <strong>Rajasthan:</strong> <a href="tel:9772086003">9772086003</a>
                  </p>
                </div>

                <div className="info-section">
                  <h2>Our Processing Plants</h2>
                  <p>
                    <strong>Gujarat Extension:</strong> Ahmedabad Processing Hub<br />
                    <strong>North Extension:</strong> Rajasthan Distribution Center
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

