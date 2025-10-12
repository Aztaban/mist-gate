import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <section className="about about--scrim">
      <header className="about__hero">
        <h1 className="about__title">About Mist Gate</h1>
        <p className="about__lede">
          A curated shop for fantasy, sci-fi, and mystery books—new releases, staff picks, and special editions. Step
          through the mist and discover your next world.
        </p>
      </header>

      <article className="about__section">
        <h2>Who we are</h2>
        <p>
          We’re readers first. Mist Gate began as a small recommendation list and grew into an indie store focused on
          thoughtful curation, fair pricing, and friendly service. Every product page includes clear details—author,
          release date, stock—and honest availability.
        </p>
      </article>

      <article className="about__section">
        <h2>What we stock</h2>
        <ul className="about__bullets">
          <li>
            <strong>New & notable:</strong> fresh releases and hidden gems.
          </li>
          <li>
            <strong>Staff picks:</strong> rotating recommendations you can trust.
          </li>
          <li>
            <strong>Special editions:</strong> limited runs and collector covers when available.
          </li>
        </ul>
      </article>

      <article className="about__section">
        <h2>Why shop with us</h2>
        <div className="about__highlights">
          <div className="about__card">
            <h3>Fast shipping</h3>
            <p>Choose Standard, Express, or Overnight at checkout.</p>
          </div>
          <div className="about__card">
            <h3>Easy returns</h3>
            <p>
              30-day return window. Start from your <NavLink to="/account">Account</NavLink> page.
            </p>
          </div>
          <div className="about__card">
            <h3>Secure checkout</h3>
            <p>Protected payments; no sensitive data stored in the browser.</p>
          </div>
          <div className="about__card">
            <h3>Community first</h3>
            <p>We highlight indie authors and small publishers whenever we can.</p>
          </div>
        </div>
      </article>

      <article className="about__section">
        <h2>Stay in the loop</h2>
        <p>
          Check the <NavLink to="/news">News</NavLink> page for announcements and release dates, or follow our{' '}
          <NavLink to="/products">catalog</NavLink> to see what’s new. Need help? Visit{' '}
          <NavLink to="/contact">Contact</NavLink> and we’ll get back quickly.
        </p>
      </article>

      <footer className="about__footer">
        <p className="muted">
          Mist Gate is an independent store. Thanks for supporting small business and great stories.
        </p>
      </footer>
    </section>
  );
};

export default About;
