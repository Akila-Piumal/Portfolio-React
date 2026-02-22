import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";

const Index = () => (
  <>
    <ScrollProgress />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </main>
    <Footer />
    <BackToTop />
  </>
);

export default Index;
