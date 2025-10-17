import React from "react";
import Hero from "../components/Hero";
import Technologies from "../components/Technologies";
import Experience from "../components/Experience";
import Tasks from "../components/Tasks";
import Education from "../components/Education";
import Contact from "../components/Contact";

const Home: React.FC = () => {
  // uso de scroll-mt con variable dinámicamente calculada para anclas
  const sectionBase = "snap-start scroll-mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] py-12";

  return (
    <div className="space-y-0">
      <section id="home" className={`${sectionBase}`}>
        <Hero />
      </section>

      <section id="technologies" className={`${sectionBase}`}>
        <Technologies />
      </section>

      <section id="experience" className={`${sectionBase}`}>
        <Experience />
      </section>

      <section id="tasks" className={`${sectionBase}`}>
        <Tasks />
      </section>

      <section id="education" className={`${sectionBase}`}>
        <Education />
      </section>

      <section id="contact" className={`${sectionBase}`}>
        <Contact />
      </section>
    </div>
  );
};

export default Home;