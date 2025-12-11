import CustomNavbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import Services from "./Components/Services"
import About from "./Components/About"
import Footer from "./Components/Footer"
import BackgroundShapes from "./Components/BackgroundShapes"
import './App.css'

const App = () => {
  return (
    <>
      <BackgroundShapes />
      <CustomNavbar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </>
  )
}
export default App