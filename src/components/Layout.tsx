import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Mist from "./Mist"

const Layout = () => {
  return (
    <>
      <Mist />
      <Header />
      <main className="app">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
