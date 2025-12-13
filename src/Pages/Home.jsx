import CustomNavbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Services from "../Components/Services"
import About from "../Components/About"
import Footer from "../Components/Footer"
import BackgroundShapes from "../Components/BackgroundShapes"
import '../App.css'
import Team from "../Components/Team"
import FAQ from "../Components/FAQ"

const Home = () => {
  return (
    <>
      <BackgroundShapes />
      <CustomNavbar />
      <Hero />
      <Services />
      <About />
      <Team/>
      <FAQ />
      <Footer />
    </>
  )
}

export default Home