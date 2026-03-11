import Navbar from "./components/componentsNavbar";
import Footer from "./components/componentsFooter";
import Home from "./pages/pagesHome";
import About from "./pages/pagesAbout";
import Projects from "./pages/Pagesproduct";
import Services from "./pages/pagesServices";
import Blog from "./pages/pagesBlog";
import Contact from "./pages/pagesContact";

import CopilotWidget from "./components/CopilotWidget";

import AnimatedSection from "./components/AnimatedSection";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <AnimatedSection id="home"><Home /></AnimatedSection>
        <AnimatedSection id="about"><About /></AnimatedSection>
        <AnimatedSection id="projects"><Projects /></AnimatedSection>
        <AnimatedSection id="services"><Services /></AnimatedSection>
        <AnimatedSection id="blog"><Blog /></AnimatedSection>
        <AnimatedSection id="contact"><Contact /></AnimatedSection>
      </main>
      <Footer />
      <CopilotWidget />
    </div>
  );
}
