import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import projectJanakaTailers from "@/assets/projectJanakaTailers.png";
import projectTaskapp from "@/assets/project-taskapp.jpg";
import projectDashboard from "@/assets/project-dashboard.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Tailer Website",
    description: "React Website for Tailer in pelawatta.",
    tech: ["React", "Tailwind CSS", "TypeScript", "shadcn-ui", "Vite"],
    image: projectJanakaTailers,
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "Cross-platform mobile app for task tracking with real-time sync and notifications.",
    tech: ["Ionic", "Angular", "Firebase"],
    image: projectTaskapp,
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Dashboard",
    description: "Analytics dashboard with interactive charts and data visualization for business insights.",
    tech: ["React", "TypeScript", "Tailwind"],
    image: projectDashboard,
    github: "#",
    live: "#",
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
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href={project.live}
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
