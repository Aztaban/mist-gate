import { NavLink } from 'react-router-dom';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="site-footer full-bleed">
      <div className="site-footer__inner container">
        <div className="footer__col footer__col--links">
          <h3 className="footer__heading">Explore</h3>
          <ul className="footer__list">
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/posts">News</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/license">License Agreement</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--contact">
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__list">
            <li>123 Misty Lane, Fogtown</li>
            <li>
              <a href="mailto:info@mistgate.com">info@mistgate.com</a>
            </li>
            <li>
              <a href="tel:+123456789">+1 (234) 567-89</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__text">
          &copy; {date} Copyright{' '}
          <a className="footer__link" href="https://github.com/Aztaban" target="_blank" rel="noopener noreferrer">
            Aztaban
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
