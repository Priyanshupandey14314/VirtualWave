import CustomNavbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Services from "../Components/Services"
import About from "../Components/About"
import Footer from "../Components/Footer"

import '../App.css'
import Team from "../Components/Team"
import FAQ from "../Components/FAQ"
import Testimonials from "../Components/Testimonials"

const Home = () => {
  return (
    <>

      <CustomNavbar />
      <Hero />
      <Services />
      <About />
      <Team />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  )
}

export default Home