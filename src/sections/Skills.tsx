import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaAngular, FaJava, FaGitAlt, FaMicrosoft, FaNodeJs,
} from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import {
  SiSpringboot, SiTypescript, SiTailwindcss, SiIonic,
  SiFirebase, SiCapacitor,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const isMobile = () => window.innerWidth < 768;

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  ring: number; // 1 = inner, 2 = middle, 3 = outer
  angle: number; // degrees
  color: string;
}

const skills: Skill[] = [
  // Inner ring – Frontend core
  { name: "Angular", icon: FaAngular, ring: 1, angle: 60, color: "hsl(1, 77%, 55%)" },
  { name: "TypeScript", icon: SiTypescript, ring: 1, angle: 120, color: "hsl(211, 60%, 48%)" },
  { name: "Next.js", icon: SiNextdotjs, ring: 1, angle: 180, color: "hsl(0, 0%, 80%)" },
  { name: "Ionic", icon: SiIonic, ring: 1, angle: 240, color: "hsl(226, 100%, 58%)" },
  { name: "Tailwind", icon: SiTailwindcss, ring: 1, angle: 300, color: "hsl(198, 93%, 60%)" },

  // Middle ring – Backend
  { name: "Spring Boot", icon: SiSpringboot, ring: 2, angle: 0, color: "hsl(115, 45%, 44%)" },
  { name: "Java", icon: FaJava, ring: 2, angle: 72, color: "hsl(15, 75%, 55%)" },
  { name: "Node.js", icon: FaNodeJs, ring: 2, angle: 144, color: "hsl(120, 55%, 45%)" },
  { name: "REST APIs", icon: TbApi, ring: 2, angle: 216, color: "hsl(258, 90%, 66%)" },
  { name: "Firebase", icon: SiFirebase, ring: 2, angle: 288, color: "hsl(37, 90%, 51%)" },

  // Outer ring – Tools
  { name: "Git", icon: FaGitAlt, ring: 3, angle: 60, color: "hsl(10, 75%, 48%)" },
  { name: "Azure", icon: FaMicrosoft, ring: 3, angle: 180, color: "hsl(207, 90%, 54%)" },
  { name: "Capacitor", icon: SiCapacitor, ring: 3, angle: 300, color: "hsl(211, 55%, 52%)" },
];

const ringRadii = { 1: 120, 2: 200, 3: 270 };
const ringRadiiMd = { 1: 140, 2: 230, 3: 310 };

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mobile = isMobile();

      // Heading
      gsap.from(".skills-heading", {
        y: 40,
        opacity: 0,
        filter: mobile ? "none" : "blur(8px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Center pulse
      gsap.fromTo(
        ".orbit-center",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Rings fade in
      gsap.fromTo(
        ".orbit-ring",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Skill nodes pop in
      gsap.fromTo(
        ".skill-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(2)",
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Slow orbit rotation (desktop only)
      if (!mobile) {
        [1, 2, 3].forEach((ring) => {
          const el = document.querySelector(`.ring-group-${ring}`);
          if (el) {
            gsap.to(el, {
              rotation: ring % 2 === 0 ? 360 : -360,
              duration: 60 + ring * 20,
              repeat: -1,
              ease: "none",
              transformOrigin: "center center",
            });
            // Counter-rotate children to keep them upright
            el.querySelectorAll(".skill-node").forEach((node) => {
              gsap.to(node, {
                rotation: ring % 2 === 0 ? -360 : 360,
                duration: 60 + ring * 20,
                repeat: -1,
                ease: "none",
                transformOrigin: "center center",
              });
            });
          }
        });
      }

      // Mobile grid fallback animation
      if (mobile) {
        gsap.fromTo(
          ".skill-mobile-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getPosition = (ring: number, angle: number) => {
    const radii = isMobile() ? ringRadii : ringRadiiMd;
    const r = radii[ring as keyof typeof radii];
    const rad = (angle * Math.PI) / 180;
    return {
      left: `calc(50% + ${Math.cos(rad) * r}px - 28px)`,
      top: `calc(50% + ${Math.sin(rad) * r}px - 28px)`,
    };
  };

  return (
    <section ref={sectionRef} id="skills" className="section-padding overflow-hidden">
      <div className="container mx-auto">
        <h2 className="skills-heading text-3xl md:text-4xl font-bold font-display text-center mb-16">
          My <span className="gradient-text">Skills</span>
        </h2>

               {/* Desktop orbit */}
        <div className="hidden md:block">
          <div
            ref={orbitRef}
            className="relative mx-auto"
            style={{ width: "660px", height: "660px" }}
          >
            {/* Orbit rings */}
            {[1, 2, 3].map((ring) => {
              const radii = ringRadiiMd;
              const r = radii[ring as keyof typeof radii];
              return (
                <div
                  key={ring}
                  className="orbit-ring absolute rounded-full border border-border/30"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    left: `calc(50% - ${r}px)`,
                    top: `calc(50% - ${r}px)`,
                  }}
                />
              );
            })}

            {/* Center element */}
            <div
              className="orbit-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center z-10"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "0 0 40px hsl(239 84% 67% / 0.4), 0 0 80px hsl(258 90% 66% / 0.2)",
              }}
            >
              <span className="text-primary-foreground font-display font-bold text-sm tracking-wider">
                TECH
              </span>
            </div>

            {/* Skill nodes grouped by ring for rotation */}
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className={`ring-group-${ring} absolute inset-0 pointer-events-none`}
                style={{ transformOrigin: "center center" }}
              >
                {skills
                  .filter((s) => s.ring === ring)
                  .map(({ name, icon: Icon, angle, color }) => {
                    const radii = ringRadiiMd;
                    const r = radii[ring as keyof typeof radii];
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * r;
                    const y = Math.sin(rad) * r;

                    return (
                      <div
                        key={name}
                        className="skill-node absolute group cursor-default pointer-events-auto"
                        style={{
                          left: `calc(50% + ${x}px - 28px)`,
                          top: `calc(50% + ${y}px - 28px)`,
                          opacity: 0,
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center border border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50"
                          style={{
                            background: "var(--gradient-card)",
                            boxShadow: "var(--shadow-card)",
                          }}
                        >
                          <Icon className="text-2xl" style={{ color }} />
                        </div>
                        {/* Tooltip */}
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile grid fallback */}
        <div className="md:hidden grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {skills.map(({ name, icon: Icon, color }) => (
            <div
              key={name}
              className="skill-mobile-card glass-card p-4 flex flex-col items-center gap-2 hover-lift"
              style={{ opacity: 0 }}
            >
              <Icon className="text-2xl" style={{ color }} />
              <span className="text-xs font-medium text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
