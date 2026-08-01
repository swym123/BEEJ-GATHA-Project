import { useEffect } from "react";
import './policy.css'

export default function Policy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="policy-page animate-fade-in">
        <section className="policy-hero">
          <div className="policy-hero-inner">
            <p className="policy-eyebrow">— Legal & Agreements</p>
            <h1>Policies & Guidelines</h1>
            <p className="policy-sub">
              Understanding our warranties, genetic standards, and user data privacy.
            </p>
          </div>
        </section>

        <section className="policy-content-sec">
          <div className="policy-container">
            <div className="policy-card">
              <h2>1. Seed Genetic Purity & Quality Assurance</h2>
              <p>
                At Beej Gatha, we strictly adhere to the Indian Seed Act of 1966. Every batch of seed sold undergoes dual laboratory testing for physical purity, genetic integrity, and germination rate before packaging.
              </p>
              <ul>
                <li><strong>Minimum Germination:</strong> We guarantee a minimum of 85% germination rate under controlled laboratory conditions.</li>
                <li><strong>Genetic Purity:</strong> Maintained at 99.5% or above for hybrid crops.</li>
                <li><strong>Shatter/Weed Seed Rules:</strong> Batches containing noxious weed seeds are immediately rejected during cleaning phases.</li>
              </ul>

              <h2>2. Limited Warranty & Liabilities</h2>
              <p>
                Agricultural yields are highly dependent on weather patterns, soil preparation, irrigation schedules, and local pest pressure. Since these environmental factors are out of our direct control:
              </p>
              <p>
                Our liability under this warranty is strictly limited to the purchase price of the seed. Beej Gatha is not liable for consequential damages, crop failures, or lost profits due to unfavorable environmental conditions or improper agronomic management.
              </p>

              <h2>3. Privacy & Farmer Data Protection</h2>
              <p>
                We value your trust. Any personal details collected during purchase, direct consultation, or SMS advice programs are stored securely:
              </p>
              <ul>
                <li>We do not lease or sell contact databases to third-party marketing firms.</li>
                <li>Soil testing metrics and field telemetry shared by farmers are kept confidential and are used solely to improve regional agronomy advice and yield predictions.</li>
              </ul>

              <h2>4. Shipping, Exchanges & Returns</h2>
              <p>
                Seeds are biological materials requiring temperature and humidity-controlled storage. Therefore:
              </p>
              <ul>
                <li>Returns of unopened bag shipments are accepted within 10 days of delivery, subject to warehouse testing.</li>
                <li>Opened bags cannot be returned or refunded to prevent biological cross-contamination.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

