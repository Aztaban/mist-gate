import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <section className="about page-stack">
      <header className="surface-dark section">
        <h2 className="section-title">About Mist Gate</h2>
        <p>
          Mist Gate is more than just a bookstore — it’s a threshold. We built it for readers who love stories that pull
          you out of the ordinary and into something strange, beautiful, or unexpected. Whether you crave ancient
          prophecies, cosmic mysteries, or quiet small-town hauntings, our shelves are designed to spark curiosity and
          wonder. Every title you find here has been hand-picked for world-building depth, thoughtful prose, or
          unforgettable atmosphere. Our goal isn’t to flood you with every release under the sun — it’s to offer a
          focused, meaningful catalog where every book has a reason to exist. Step through the mist, explore, and let
          new worlds find you.
        </p>
      </header>

      <article className="section surface-dark">
        <h2 className="section-title">Who we are</h2>
        <p>
          At our core, we’re readers before anything else — dreamers, collectors, and storytellers who still get
          goosebumps from a perfect first line. Mist Gate began as a small community recommendation list shared between
          friends and slowly grew into a dedicated shop built on trust and taste. We value transparency and care about
          the details: every product page lists the author, release date, and real stock status, so you always know
          exactly what you’re getting. We don’t chase trends — we chase meaning, mood, and the kind of stories that stay
          with you long after the last page. Our mission is simple: connect readers with books that remind them why they
          fell in love with reading in the first place.
        </p>
      </article>

      <article className="section surface-dark">
        <h2 className="section-title">What we stock</h2>
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

      <article className="section surface-dark">
        <h2 className="section-title">Why shop with us</h2>
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

      <article className="section surface-dark">
        <h2 className="section-title">Stay in the loop</h2>
        <p>
          The world of stories is always changing — and we make it easy to keep up. Visit our{' '}
          <NavLink to="/news" className="text-link">
            News
          </NavLink>{' '}
          page for upcoming releases, store announcements, and behind-the-scenes glimpses into our curation process. Our{' '}
          <NavLink to="/products" className="text-link">
            catalog
          </NavLink>{' '}
          is updated weekly with fresh arrivals and returning favorites, from debut authors to beloved series reprints.
          If you ever need help, have a recommendation to share, or just want to talk books, drop us a message through{' '}
          <NavLink to="/contact" className="text-link">
            Contact
          </NavLink>{' '}
          — we genuinely read and respond to every note. Join our community, follow along, and be among the first to see
          what’s waiting beyond the next gate.
        </p>
      </article>

      <footer className="about__footer surface-dark">
        <p className="muted">
          Mist Gate is an independent store. Thanks for supporting small business and great stories.
        </p>
      </footer>
    </section>
  );
};

export default About;
