import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiGrid, FiLayers  } from "react-icons/fi";
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

/* ───── Project Card (shared between views) ───── */
const ProjectCard = ({
  project,
  index,
  isGrid,
}: {
  project: (typeof projects)[0];
  index: number;
  isGrid: boolean;
}) => (
  <div
    className={`project-grid-card glass-card overflow-hidden group hover-lift ${
      isGrid ? "" : "hidden"
    }`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="h-52 md:h-56 overflow-hidden relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

      {/* Overlay links on hover */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <a
          href={project.github}
          target="_blank"
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label="GitHub"
        >
          <FiGithub size={18} />
        </a>
        <a
          href={project.live}
          target="_blank"
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label="Live Demo"
        >
          <FiExternalLink size={18} />
        </a>
      </div>
    </div>

    <div className="p-6 -mt-4 relative z-10">
      <h3 className="text-lg md:text-xl font-bold font-display mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ───── Main Component ───── */
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const isAnimating = useRef(false);
  const total = projects.length;

  const go = useCallback(
    (dir: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setActive((prev) => (prev + dir + total) % total);
      setTimeout(() => {
        isAnimating.current = false;
      }, 500);
    },
    [total]
  );

  // Mouse drag support
  useEffect(() => {
     if (viewMode !== "carousel") return;
    const el = carouselRef.current;
    if (!el) return;

    let isDragging = false;
    let startX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      el.style.cursor = "grabbing";
    };

      const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;
      el.style.cursor = "grab";
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 50) {
        go(dx < 0 ? 1 : -1);
      }
    };

    const onMouseLeave = () => {
      isDragging = false;
      el.style.cursor = "grab";
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [go, viewMode]);

  // Touch swipe support
  useEffect(() => {
    if (viewMode !== "carousel") return;
    const el = carouselRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        go(dx < 0 ? 1 : -1);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [go, viewMode]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
         ".projects-header-row",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".projects-content",
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // GSAP grid stagger animation
  useEffect(() => {
    if (viewMode !== "grid") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-grid-card",
        { y: 40, autoAlpha: 0, scale: 0.95 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(1.4)",
          overwrite: "auto",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [viewMode]);

  // GSAP card content animation on slide change
  useEffect(() => {
    if (viewMode !== "carousel") return;
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".center-card-content",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, delay: 0.15, ease: "power2.out", overwrite: "auto" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [active, viewMode]);

  const getIndex = (offset: number) => (active + offset + total) % total;

  const cardStyles = (offset: number) => {
    const isCenter = offset === 0;
    const isLeft = offset === -1;

    if (isCenter) {
      return {
        width: "min(580px, 85vw)",
        zIndex: 20,
        transform: "translateX(0) scale(1) rotateY(0deg)",
        opacity: 1,
        filter: "none",
        pointerEvents: "auto" as const,
      };
    }

    return {
      width: "min(400px, 60vw)",
      zIndex: 10,
      transform: isLeft
        ? "translateX(calc(-55% - 20px)) scale(0.82) rotateY(8deg)"
        : "translateX(calc(55% + 20px)) scale(0.82) rotateY(-8deg)",
      opacity: 0.35,
      filter: "blur(3px) brightness(0.7)",
      pointerEvents: "none" as const,
    };
  };

  return (
    <section ref={sectionRef} id="projects" className="section-padding overflow-hidden">
      <div className="container mx-auto">
        {/* Header row with toggle */}
        <div className="projects-header-row flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center sm:text-left">
            Featured <span className="gradient-text">Projects</span>
          </h2>

                    <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-secondary/30 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "carousel"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FiLayers size={16} />
              <span className="hidden sm:inline">Spotlight</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FiGrid size={16} />
              <span className="hidden sm:inline">View All</span>
            </button>
          </div>
        </div>

        <div className="projects-content">
          {/* ───── Carousel View ───── */}
          {viewMode === "carousel" && (
            <div className="carousel-wrapper relative max-w-6xl mx-auto select-none" ref={carouselRef}>
              <div
                className="relative flex items-center justify-center h-[420px] md:h-[480px]"
                style={{ perspective: "1200px" }}
              >
                {[-1, 0, 1].map((offset) => {
                  const idx = getIndex(offset);
                  const project = projects[idx];
                  const isCenter = offset === 0;
                  const styles = cardStyles(offset);

                  return (
                    <div
                      key={`${idx}-${offset}`}
                      className="absolute will-change-transform"
                      style={{
                        ...styles,
                        transition:
                          "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, filter 0.5s ease, width 0.5s ease",
                      }}
                    >
                      <div
                        className={`glass-card overflow-hidden group ${
                          isCenter ? "glow-effect" : ""
                        }`}
                      >
                        <div className="h-52 md:h-60 overflow-hidden relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                        </div>

                      <div
                          className={`p-6 -mt-6 relative z-10 ${
                            isCenter ? "center-card-content" : ""
                          }`}
                        >
                          <h3 className="text-xl md:text-2xl font-bold font-display mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
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
                    </div>
                  );
                })}
              </div>

          {/* Carousel Controls */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  aria-label="Previous project"
                >
                  <FiChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  aria-label="Next project"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
            )}
          
            {/* ───── Grid View ───── */}
          {viewMode === "grid" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} isGrid />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
