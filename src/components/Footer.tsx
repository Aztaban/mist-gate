const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {date} Copyright: Mist Gate Studios s.r.o.</p>
    </footer>
  )
}

export default Footer
