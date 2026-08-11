import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import BackgroundGrid from "@/components/shared/BackgroundGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative overflow-hidden">
        <BackgroundGrid size={{ x: "25px", y: "25px" }} />
        <Skills />
        <Projects />
        <Experience compact />
        <Contact />
      </div>
    </>
  );
}
