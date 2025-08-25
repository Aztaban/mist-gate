const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy; {date} Copyright{' '}
        <a className="footer__link" href="https://github.com/Aztaban">
          {' '}
          Aztaban
        </a>
      </p>
    </footer>
  );
};

export default Footer;
