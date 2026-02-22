import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaReact, FaAngular, FaJava } from "react-icons/fa";
import { SiSpringboot, SiTypescript, SiIonic } from "react-icons/si";

const floatingIcons = [
  { Icon: FaReact, delay: 0, x: "10%", y: "20%" },
  { Icon: FaAngular, delay: 0.5, x: "85%", y: "15%" },
  { Icon: SiSpringboot, delay: 1, x: "75%", y: "70%" },
  { Icon: SiTypescript, delay: 1.5, x: "15%", y: "75%" },
  { Icon: FaJava, delay: 2, x: "90%", y: "45%" },
  { Icon: SiIonic, delay: 2.5, x: "5%", y: "45%" },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(greetingRef.current, { y: 40, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 50, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(buttonsRef.current?.children ?? [], {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
        }, "-=0.2");

      // Floating icons
      if (iconsRef.current) {
        gsap.from(iconsRef.current.children, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 1.2,
        });

        Array.from(iconsRef.current.children).forEach((child, i) => {
          gsap.to(child, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-15, 15)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Floating Icons */}
      <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, x, y }, i) => (
          <div
            key={i}
            className="absolute text-primary/20 text-3xl md:text-4xl"
            style={{ left: x, top: y }}
          >
            <Icon />
          </div>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse_glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-pulse_glow" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <span
            ref={greetingRef}
            className="inline-block text-lg md:text-xl text-muted-foreground mb-4"
          >
            Hi, I'm Akila 👋
          </span>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-display mb-6 leading-tight"
          >
            Associate{" "}
            <span className="gradient-text">Software Engineer</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Building scalable web & mobile applications with modern technologies.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => scrollTo("projects")}
              className="gradient-bg px-8 py-3.5 rounded-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity glow-effect"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-3.5 rounded-lg font-semibold border border-primary/40 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
