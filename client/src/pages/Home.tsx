import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Signals } from "@/components/Signals";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Signals />
        <Projects />
        <Research />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
