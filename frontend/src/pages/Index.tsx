import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SkillsModern from "@/components/SkillsModern";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Involvement from "@/components/Involvement";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Analytics from "@/components/Analytics";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground smooth-scroll">
      <SEO />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <SkillsModern />
      <Experience />
      <Education />
      <Involvement />
      <Blog />
      <Testimonials />
      <Analytics />
      <Contact />
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
