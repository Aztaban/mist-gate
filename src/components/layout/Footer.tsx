const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="site-footer full-bleed">
      <div className="site-footer__inner container">
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
