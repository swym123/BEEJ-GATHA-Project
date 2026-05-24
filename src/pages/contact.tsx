import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

const STORAGE_KEY = "beej_gatha_inventory";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();

  // ✅ Controlled state parameter fields
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const productSku = searchParams.get("inquiry");
    if (productSku) {
      setForm((prev) => ({
        ...prev,
        message: `Hello, I am interested in inquiring about the technical benchmarks, availability, and pricing options regarding seed variety: ${productSku}.`
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

    const SERVICE_ID = "service_djhtqdf";
    const TEMPLATE_ID = "template_ztj1gpq"; // Your updated template ID
    const PUBLIC_KEY = "BGiJA_ZIMPD4hyJEj";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
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

  return (
    <>
      <style>{css}</style>
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
                      name="name" /* ✅ Matches {{name}} in your HTML email template */
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
                        name="email" /* ✅ Matches {{email}} in your HTML email template */
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
                        name="phone" /* ✅ Matches {{phone}} in your HTML email template */
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
                      name="message" /* ✅ Matches {{message}} in your HTML email template */
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      placeholder="Please details your query (e.g. Soil type, target crop, acreage)..."
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
                    Pune Science Park, Seed R&D Wing,<br />
                    Ganeshkhind Road, Pune,<br />
                    Maharashtra - 411007
                  </p>
                </div>

                <div className="info-section">
                  <h2>Direct Contacts</h2>
                  <p>
                    <strong>Email:</strong> <a href="mailto:hello@beejgatha.com">hello@beejgatha.com</a><br />
                    <strong>Agronomy Helpline:</strong> <a href="tel:+911234567890">+91 12345 67890</a>
                  </p>
                </div>

                <div className="info-section">
                  <h2>Our Processing Plants</h2>
                  <p>
                    <strong>Central Maharashtra:</strong> Aurangabad Seed Processing Hub<br />
                    <strong>Central Extension:</strong> Indore Distribution Center
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

const css = `
.contact-page { font-family: 'DM Sans', sans-serif; color: #0d1208; background: #fdfcf9; }
.contact-hero { position: relative; background: linear-gradient(160deg, #0d1208 0%, #1a2a14 100%); color: #f5f0e8; padding: 10rem 1.5rem 6rem; text-align: center; }
.contact-eyebrow { font-size: .75rem; letter-spacing: .4em; text-transform: uppercase; color: #8cc63f; margin: 0 0 1rem; }
.contact-hero h1 { font-family: 'Playfair Display', serif; font-weight: 400; font-size: clamp(2.5rem, 6vw, 4.5rem); margin: 0 0 1rem; line-height: 1.1; }
.contact-sub { font-size: clamp(1rem, 2vw, 1.25rem); color: rgba(245, 240, 232, 0.7); max-width: 600px; margin: 0 auto; line-height: 1.6; }
.contact-body { padding: 5rem 1.5rem; }
.contact-container { max-width: 1100px; margin: 0 auto; }
.contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; }
@media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }
.contact-form-card { background: #fff; border: 1px solid #e8dcc8; border-radius: 8px; padding: 3rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01); }
@media (max-width: 480px) { .contact-form-card { padding: 1.5rem; } }
.contact-form-card h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0 0 2rem; color: #0d1208; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
.form-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 600px) { .form-group-row { grid-template-columns: 1fr; gap: 0; } }
.form-group label { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #3d6b2f; }
.form-group input, .form-group textarea { font-family: 'DM Sans', sans-serif; font-size: 0.95rem; padding: 0.8rem 1rem; border: 1px solid #e8dcc8; border-radius: 4px; background: #fdfcf9; outline: none; transition: border-color 0.2s, box-shadow 0.2s; color: #0d1208; }
.form-group input:focus, .form-group textarea:focus { border-color: #8cc63f; box-shadow: 0 0 0 3px rgba(140, 198, 63, 0.15); }
.form-submit-btn { font-family: 'DM Sans', sans-serif; background: #3d6b2f; color: #fff; border: none; border-radius: 4px; padding: 1rem 2rem; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background-color 0.2s, transform 0.2s; width: 100%; }
.form-submit-btn:hover { background: #8cc63f; color: #0d1208; }
.form-submit-btn:active { transform: scale(0.98); }
.contact-info-panel { display: flex; flex-direction: column; gap: 2.5rem; }
.info-section h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin: 0 0 1rem; color: #0d1208; border-bottom: 2px solid #8cc63f; display: inline-block; padding-bottom: 0.3rem; }
.info-section p { font-size: 0.95rem; line-height: 1.7; color: #5a4f3e; margin: 0; }
.info-section a { color: #3d6b2f; text-decoration: none; font-weight: 500; }
.info-section a:hover { color: #8cc63f; }
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;