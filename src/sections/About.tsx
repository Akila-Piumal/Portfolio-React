import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";
import { FiDownload } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding">
      <div className="container mx-auto">
        <h2 className="about-content text-3xl md:text-4xl font-bold font-display text-center mb-16">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="about-content flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/20 glow-effect">
                <img
                  src={profileImg}
                  alt="Akila Piumal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-primary/10 -z-10" />
            </div>
          </div>

          <div className="about-content space-y-5">
            <p className="text-muted-foreground leading-relaxed">
              I'm an <span className="text-foreground font-medium">Associate Software Engineer</span> at{" "}
              <span className="gradient-text font-semibold">Kerk Solutions</span>, passionate about
              building scalable, user-centric applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My expertise spans across <span className="text-foreground">Angular, React, Ionic, and Spring Boot</span>,
              enabling me to deliver full-stack solutions from elegant frontends to robust backend APIs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm deeply interested in AI, modern web technologies, and continuously
              exploring new tools to craft better digital experiences.
            </p>

            <button className="gradient-bg px-6 py-3 rounded-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-4">
              <FiDownload />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
