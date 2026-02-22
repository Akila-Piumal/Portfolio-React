import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import projectJanakaTailers from "@/assets/projectJanakaTailers.png";
import projectWeatherDashboard from "@/assets/project-weather-dashboard.png";
import projectPortfolio from "@/assets/project-portfolio.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Tailer Website",
    description: "React Website for Tailer in pelawatta.",
    tech: ["React", "Tailwind", "TypeScript", "shadcn-ui"],
    image: projectJanakaTailers,
    github: "https://github.com/Akila-Piumal/Janaka-Tailers.git",
    live: "https://janaka-tailers.vercel.app/",
  },
  {
    title: "Weather Dashboard",
    description: "Weather Dashboard web app using Angular and OpenWeatherMap APIs.",
    tech: ["Angular", "OpenWeatherMap"],
    image: projectWeatherDashboard,
    github: "https://github.com/Akila-Piumal/Weather_Dashboard",
    live: "https://weather-dashboard-eta-azure.vercel.app/",
  },
  {
    title: "Portfolio Website",
    description: "Proffesional and Modern Portfolio website with Next.js.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn-ui"],
    image: projectPortfolio,
    github: "https://github.com/Akila-Piumal/portfolio_new",
    live: "https://portfolio-new-ashy-rho.vercel.app/",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      gsap.fromTo(cards,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
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
    <section ref={sectionRef} id="projects" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-16">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card glass-card overflow-hidden group hover-lift"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-6 -mt-8 relative">
                <h3 className="text-xl font-bold font-display mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Live Demo"
                  >
                    <FiExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
