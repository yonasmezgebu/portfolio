import Navbar from "./components/componentsNavbar";
import Footer from "./components/componentsFooter";
import Home from "./pages/pagesHome";
import About from "./pages/pagesAbout";
import Projects from "./pages/Pagesproduct";
import Services from "./pages/pagesServices";
import Blog from "./pages/pagesBlog";
import Contact from "./pages/pagesContact";

import CopilotWidget from "./components/CopilotWidget";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="services"><Services /></section>
        <section id="blog"><Blog /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
      <CopilotWidget />
    </div>
  );
}
