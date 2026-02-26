import { useEffect, useRef, useState  } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMonitor, FiSmartphone, FiServer, FiArrowUpRight, FiDatabase, FiCloud, } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: FiMonitor,
    title: "Web Application Development",
    desc: "Building responsive, performant web apps with modern frameworks like React, Angular, and Next.js.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: FiSmartphone,
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps using Ionic and Capacitor for seamless native experiences.",
    tags: ["Ionic", "Capacitor", "PWA"],
  },
  {
    icon: FiServer,
    title: "API Development",
    desc: "RESTful & GraphQL APIs with Spring Boot — secure, scalable, and production-ready.",
    tags: ["Spring Boot", "REST", "GraphQL"],
  },
  {
     icon: FiDatabase,
    title: "Backend Development",
    desc: "Robust server-side systems with Java & Spring Boot, microservices architecture, and database design.",
    tags: ["Java", "Spring Boot", "MySQL"],
  },
  {
    icon: FiCloud,
    title: "Cloud Solutions & Deployment",
    desc: "Cloud infrastructure setup, CI/CD pipelines, and containerized deployments for production-ready apps.",
    tags: ["Azure", "Docker", "CI/CD"],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
      gsap.fromTo(
        cards,
        { y: 50, autoAlpha: 0, scale: 0.95 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="services-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            End-to-end solutions crafted with modern technologies and best practices.
          </p>
        </div>

        {/* Bento Grid */}
        {/* Row 1: 3 cards | Row 2: 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {services.slice(0, 3).map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredIdx === i;
            const isBig = false;

            return (
              <div
                key={service.title}
                className="bento-card relative group cursor-default"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Card body */}
                <div
                  className={`relative h-full rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                    isHovered ? "border-primary/40" : ""
                  }`}
                  style={{
                    background: "var(--gradient-card)",
                    boxShadow: isHovered ? "var(--shadow-glow)" : "var(--shadow-card)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), transparent 60%, hsl(var(--accent) / 0.08))" }}
                  />

                  <div className="relative z-10 p-6 md:p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isHovered ? "gradient-bg shadow-lg" : "bg-primary/10"}`}>
                        <Icon className={`transition-colors duration-500 ${isHovered ? "text-primary-foreground" : "text-primary"}`} size={22} />
                      </div>

                      <a href="#contact" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${isHovered ? "border-primary bg-primary/10 text-primary rotate-0" : "border-border text-muted-foreground -rotate-45"}`}>
                        <FiArrowUpRight size={16} />
                      </a>
                    </div>
                    <h3 className="text-lg font-bold font-display mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${isHovered ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

                    {/* Row 2: 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto mt-4 md:mt-5">
          {services.slice(3).map((service, i) => {
            const realIdx = i + 3;
            const Icon = service.icon;
            const isHovered = hoveredIdx === realIdx;
            const isBig = false;

                     return (
              <div
                key={service.title}
                className="bento-card relative group cursor-default"
                onMouseEnter={() => setHoveredIdx(realIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className={`relative h-full rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 ${isHovered ? "border-primary/40" : ""}`}
                  style={{
                    background: "var(--gradient-card)",
                    boxShadow: isHovered ? "var(--shadow-glow)" : "var(--shadow-card)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), transparent 60%, hsl(var(--accent) / 0.08))" }}
                  />
                  <div className="relative z-10 p-6 md:p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isHovered ? "gradient-bg shadow-lg" : "bg-primary/10"}`}>
                        <Icon className={`transition-colors duration-500 ${isHovered ? "text-primary-foreground" : "text-primary"}`} size={22} />
                      </div>
                      <a href="#contact" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${isHovered ? "border-primary bg-primary/10 text-primary rotate-0" : "border-border text-muted-foreground -rotate-45"}`}>
                        <FiArrowUpRight size={16} />
                      </a>
                    </div>
                    <h3 className="text-lg font-bold font-display mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${isHovered ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
