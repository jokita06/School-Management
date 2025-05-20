
import { Outlet } from "react-router-dom"
import { Nav } from "../../components/nav/Nav"
import { Footer } from "../../components/footer/Footer"
import './index.css'

export function Index() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}