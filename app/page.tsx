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
import { profile } from "@/data/content";

// Fiche « Person » lue par Google (données structurées schema.org)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${profile.firstName} ${profile.lastName}`,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  email: `mailto:${profile.email}`,
  url: profile.url,
  sameAs: profile.socials.filter((s) => s.label !== "WhatsApp").map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
