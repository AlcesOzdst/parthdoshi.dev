import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Currently } from "@/components/Currently";
import { Research } from "@/components/Research";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Currently />
        <Research />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
