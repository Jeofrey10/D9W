import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LearningFormats from "@/components/sections/LearningFormats";
import CourseLevels from "@/components/sections/CourseLevels";
import WhyD9W from "@/components/sections/WhyD9W";
import AboutTutor from "@/components/sections/AboutTutor";
import ForInstitutions from "@/components/sections/ForInstitutions";
import FutureInGermany from "@/components/sections/FutureInGermany";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LearningFormats />
        <CourseLevels />
        <WhyD9W />
        <AboutTutor />
        <ForInstitutions />
        <FutureInGermany />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
