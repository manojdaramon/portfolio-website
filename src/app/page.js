import dynamic from "next/dynamic";
import Navbar from "@/resources/components/navbar";
import HeroSection from "@/resources/components/hero-section";

const AboutSection = dynamic(() => import("@/resources/components/about-section"));
const SkillsVisualSection = dynamic(() => import("@/resources/components/skills-visual-section"));
const ExperienceSection = dynamic(() => import("@/resources/components/experience-section"));
const ProjectsSection = dynamic(() => import("@/resources/components/projects-section"));
const ContactSection = dynamic(() => import("@/resources/components/contact-section"));
const Footer = dynamic(() => import("@/resources/components/footer"));

/**
 * Single-page portfolio: sections composed in order with shared dark theme in globals.
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <AboutSection />
      <SkillsVisualSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
