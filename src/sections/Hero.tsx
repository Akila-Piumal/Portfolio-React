import { useEffect, useRef, useCallback  } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaAngular, FaJava } from "react-icons/fa";
import { SiSpringboot, SiTypescript, SiIonic } from "react-icons/si";
import profileImg from "@/assets/profile.png";
import RotatingText from "@/components/RotatingText";

gsap.registerPlugin(ScrollTrigger);

const floatingIcons = [
  { Icon: FaReact, delay: 0, x: "10%", y: "20%" },
  { Icon: FaAngular, delay: 0.5, x: "85%", y: "15%" },
  { Icon: SiSpringboot, delay: 1, x: "75%", y: "70%" },
  { Icon: SiTypescript, delay: 1.5, x: "15%", y: "75%" },
  { Icon: FaJava, delay: 2, x: "90%", y: "45%" },
  { Icon: SiIonic, delay: 2.5, x: "5%", y: "45%" },
];

const isMobile = () => window.innerWidth < 768;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const floatingTween = useRef<gsap.core.Tween | null>(null);
  const ringTween = useRef<gsap.core.Tween | null>(null);
  const entranceCompleteRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobile() || !entranceCompleteRef.current || !imageContainerRef.current || !imageWrapperRef.current) return;

    const rect = imageWrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    gsap.to(imageContainerRef.current, {
      rotationY: deltaX * 12,
      rotationX: -deltaY * 12,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile() || !entranceCompleteRef.current || !imageContainerRef.current) return;

    // Kill the idle float so y doesn't stay frozen at an offset
    floatingTween.current?.kill();
    floatingTween.current = null;

    gsap.to(imageContainerRef.current, {
      y: 0,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(".image-glow", {
      opacity: 1,
      scale: 1.15,
      duration: 0.5,
      ease: "power2.out",
    });

    ringTween.current?.kill();

    ringTween.current = gsap.to(".image-ring", {
      rotation: "+=360",
      duration: 6,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isMobile() || !entranceCompleteRef.current || !imageContainerRef.current) return;

    gsap.to(imageContainerRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
      onComplete: () => {
        // Restart idle float cleanly from y:0
        floatingTween.current = gsap.to(imageContainerRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    gsap.to(".image-glow", {
      opacity: 0.5,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Stop ring, reset
    ringTween.current?.kill();
    gsap.to(".image-ring", { rotation: 0, duration: 0.8, ease: "power2.out" });

  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(greetingRef.current, { y: 40, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 50, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(buttonsRef.current?.children ?? [],
          { scale: 0, opacity: 0, duration: 0.5, stagger: 0.15 },
          "-=0.2"
        );

      // --- Image entrance with ScrollTrigger ---
      gsap.fromTo(
        imageContainerRef.current,
        { y: 40, autoAlpha: 0, scale: 0.95 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          immediateRender: false,
          overwrite: "auto",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          onStart: () => {
            entranceCompleteRef.current = false;
          },
          onComplete: () => {
            entranceCompleteRef.current = true;
            // Start idle floating after entrance
            floatingTween.current = gsap.to(imageContainerRef.current, {
              y: -10,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );

      // Glow pulse
      gsap.fromTo(
        ".image-glow",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.5,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Ring fade in
      gsap.fromTo(
        ".image-ring",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

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

     // --- Hover / tilt listeners (outside context for persistence) ---
    const wrapper = imageWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("mouseenter", handleMouseEnter);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
      wrapper.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      ctx.revert();
      floatingTween.current?.kill();
      ringTween.current?.kill();
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        wrapper.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

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
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(239 84% 67% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(239 84% 67% / 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "grid-pulse 6s ease-in-out infinite",
        }}
      />

      {/* Animated light sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-1/3 h-[200%]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(239 84% 67% / 0.04), transparent)",
            animation: "line-sweep 12s linear infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? "hsl(239 84% 67% / 0.4)"
                : i % 3 === 1
                ? "hsl(258 90% 66% / 0.35)"
                : "hsl(280 80% 65% / 0.3)",
              animation: `float-particle ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -10}s`,
            }}
          />
        ))}
      </div>

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
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]"
        style={{ animation: "orb-drift 15s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px]"
        style={{ animation: "orb-drift 18s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[100px]"
        style={{
          background: "hsl(280 80% 65% / 0.04)",
          animation: "orb-drift 20s ease-in-out infinite 3s",
        }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span
              ref={greetingRef}
              className="inline-block text-lg md:text-xl text-muted-foreground mb-4"
            >
              Hi, I'm Akila 👋
            </span>








            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6 leading-tight"
            >
              <RotatingText />
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl max-w-2xl mb-10 gradient-text-animated cursor-default"

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

          {/* Profile Image with 3D tilt */}
          <div className="flex-shrink-0" style={{ perspective: "800px" }}>
            <div ref={imageWrapperRef} className="relative cursor-pointer">
              <div
                ref={imageContainerRef}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated glow behind image */}
                <div className="image-glow absolute -inset-6 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-2xl opacity-0" />

                {/* Dashed ring */}
                <div className="image-ring absolute -inset-4 rounded-full border-2 border-dashed border-primary/25 opacity-0" />

                {/* Secondary subtle ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-sm" />

                {/* Image */}
                <img
                  src={profileImg}
                  alt="Akila Piumal"
                  className="relative w-full h-full rounded-full object-cover border-4 border-background"
                  style={{ transform: "translateZ(30px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
