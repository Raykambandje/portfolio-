import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";
import ScrollProgress from "@/components/ScrollProgress";
import Intro from "@/components/Intro";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="absolute -left-[999px] top-4 z-[100] rounded bg-ink px-4 py-2 text-white focus:left-4"
      >
        Aller au contenu
      </a>
      <Intro />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Stack />
        <Timeline />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
