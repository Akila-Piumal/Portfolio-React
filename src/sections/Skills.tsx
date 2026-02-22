import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaAngular, FaJava, FaGitAlt, FaMicrosoft,
} from "react-icons/fa";
import {
  SiSpringboot, SiTypescript, SiTailwindcss, SiIonic,
  SiFirebase, SiCapacitor,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: FaReact },
      { name: "Angular", icon: FaAngular },
      { name: "Ionic", icon: SiIonic },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Java", icon: FaJava },
      { name: "REST APIs", icon: TbApi },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "Firebase", icon: SiFirebase },
      { name: "Azure", icon: FaMicrosoft },
      { name: "Capacitor", icon: SiCapacitor },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
      gsap.fromTo(cards, 
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-16">
          My <span className="gradient-text">Skills</span>
        </h2>

        <div className="max-w-5xl mx-auto space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-xl font-semibold font-display text-muted-foreground mb-6">{cat.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cat.skills.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="skill-card glass-card p-5 flex flex-col items-center gap-3 hover-lift cursor-default"
                  >
                    <Icon className="text-3xl text-primary" />
                    <span className="text-sm font-medium text-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
