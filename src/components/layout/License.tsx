import { NavLink } from 'react-router-dom';

const License = () => {
  const updated = '2025-10-12'; // keep this current

  return (
    <section className="license page-stack">
      {/* Header bar */}
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">License Agreement</h1>
        <span className="license__meta">Last updated: {updated}</span>
      </header>

      {/* Summary */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">Summary</h2>
        <p className="muted">
          This License Agreement explains how digital products purchased from <strong>Mist Gate</strong> may be used. By
          purchasing or downloading a product, you agree to the terms below. If something isn’t clear, please
          <NavLink to="/contact"> contact us</NavLink>.
        </p>
      </article>

      {/* Grant of License */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">1. Grant of License</h2>
        <ul className="license__list">
          <li>You receive a non-exclusive, non-transferable, revocable license to use purchased digital products.</li>
          <li>
            Unless stated otherwise, one license grants use by a single individual for personal, non-commercial use.
          </li>
          <li>Print books are licensed for personal reading and gifting; resale requires the physical item.</li>
        </ul>
      </article>

      {/* Permitted Uses */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">2. Permitted Uses</h2>
        <ul className="license__list">
          <li>Download and store a reasonable number of copies for personal backup.</li>
          <li>Print excerpts for personal reference and annotation.</li>
          <li>Use on multiple personal devices owned by you.</li>
        </ul>
      </article>

      {/* Restrictions */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">3. Restrictions</h2>
        <ul className="license__list">
          <li>No redistribution, reselling, or uploading files to public servers or “free download” sites.</li>
          <li>No sharing license keys, download links, or DRM-circumvention.</li>
          <li>No modification for the purpose of resale or compilation into competing products.</li>
          <li>No automated scraping of catalog data, preview pages, or cover art for reuse.</li>
        </ul>
      </article>

      {/* Commercial / Classroom */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">4. Commercial & Classroom Use</h2>
        <p>
          For commercial projects, libraries, or classroom distribution, please reach out—bulk or institutional licenses
          are available. Start at the <NavLink to="/contact">Contact</NavLink> page and we’ll tailor a plan.
        </p>
      </article>

      {/* Returns & Access */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">5. Returns & Access</h2>
        <ul className="license__list">
          <li>
            Digital items are generally non-refundable once downloaded. If you have trouble accessing files, we’ll help.
          </li>
          <li>We may replace corrupted files or update download links at our discretion.</li>
          <li>
            Physical items follow our standard <NavLink to="/returns">Returns Policy</NavLink>.
          </li>
        </ul>
      </article>

      {/* IP & Credits */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">6. Intellectual Property</h2>
        <p>
          All content remains the property of its respective authors, publishers, and rights holders. No ownership is
          transferred with your purchase. Cover art and trademarks belong to their owners and are used with permission.
        </p>
      </article>

      {/* Liability */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">7. Limitation of Liability</h2>
        <p>
          Mist Gate and its partners are not liable for any indirect or consequential damages arising from use of the
          products. Remedies are limited to replacement or refund where required by applicable law.
        </p>
      </article>

      {/* Privacy */}
      <article className="surface-dark license__section">
        <h2 className="license__h2">8. Privacy & Data</h2>
        <p>
          We only collect information necessary to process your order and improve the store. See our
          <NavLink to="/privacy"> Privacy Policy</NavLink> for details on analytics, cookies, and your choices.
        </p>
      </article>

      {/* Contact */}
      <footer className="surface-dark license__section license__footer">
        <p>
          Questions about this Agreement? <NavLink to="/contact">Contact Mist Gate</NavLink>—we’re happy to help.
        </p>
      </footer>
    </section>
  );
};

export default License;
