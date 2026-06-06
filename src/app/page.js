import Navbar from "@/resources/components/navbar";
import HeroSection from "@/resources/components/hero-section";
import AboutSection from "@/resources/components/about-section";
import ExperienceSection from "@/resources/components/experience-section";
import ProjectsSection from "@/resources/components/projects-section";
import SkillsSection from "@/resources/components/skills-section";
import ContactSection from "@/resources/components/contact-section";
import Footer from "@/resources/components/footer";

/**
 * Single-page portfolio: sections composed in order with shared dark theme in globals.
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <main className="container">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
