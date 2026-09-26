import { useState } from "react";
import { SideRail } from "@/components/SideRail";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Focus } from "@/components/Focus";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Research } from "@/components/Research";
import { Achievements } from "@/components/Achievements";
import { Signals } from "@/components/Signals";
import { Trajectory } from "@/components/Trajectory";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ResumeModal } from "@/components/ResumeModal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <TopBar onOpenResume={() => setResumeOpen(true)} />

      <div className="shell md:grid md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] md:gap-12 lg:gap-20">
        <SideRail onOpenResume={() => setResumeOpen(true)} />
        <main className="min-w-0">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <Focus />
          <Projects />
          <Experience onOpenResume={() => setResumeOpen(true)} />
          <Research />
          <Achievements />
          <Signals />
          <Trajectory />
          <Contact />
        </main>
      </div>

      <Footer />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
