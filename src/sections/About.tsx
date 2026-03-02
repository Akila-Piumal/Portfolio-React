import { useEffect, useRef, useCallback  } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";
import { FiDownload } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const isMobile = () => window.innerWidth < 768;

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);

  // Magnetic button effect
  const handleButtonMove = useCallback((e: MouseEvent) => {
    if (isMobile() || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3 - 4,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleButtonLeave = useCallback(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
         const mobile = isMobile();

      // --- Heading ---
      gsap.from(".about-heading", {
        y: 40,
        opacity: 0,
        filter: mobile ? "none" : "blur(8px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },



      });

      // --- Image entrance ---
      gsap.fromTo(
        imageRef.current,
        {
          x: -80,
          opacity: 0,
          scale: 0.95,
          filter: mobile ? "none" : "blur(8px)",
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          onComplete: () => {
            if (mobile) return;
            // Start idle float after entrance
            floatTween.current = gsap.to(imageRef.current, {
              y: -8,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );

      // --- Glow behind image ---
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: mobile ? 0.3 : 0.5,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // --- Text lines stagger ---
      if (textLinesRef.current) {
        const lines = textLinesRef.current.querySelectorAll(".about-line");
        gsap.fromTo(
          lines,
          {
            y: 40,
            opacity: 0,
            filter: mobile ? "none" : "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      }

      // --- Button entrance ---
      gsap.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          delay: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);

    // Magnetic listeners
    const btn = buttonRef.current;
    if (btn) {
      btn.addEventListener("mousemove", handleButtonMove);
      btn.addEventListener("mouseleave", handleButtonLeave);
    }

    return () => {
      ctx.revert();
      floatTween.current?.kill();
      if (btn) {
        btn.removeEventListener("mousemove", handleButtonMove);
        btn.removeEventListener("mouseleave", handleButtonLeave);
      }
    };
  }, [handleButtonMove, handleButtonLeave]);

  return (
    <section ref={sectionRef} id="about" className="section-padding">
      <div className="container mx-auto">
        <h2 className="about-heading text-3xl md:text-4xl font-bold font-display text-center mb-16">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow */}
              <div
                ref={glowRef}
                className="absolute -inset-8 rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-primary/25 blur-2xl opacity-0"
              />
              <div
                ref={imageRef}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/20 glow-effect"
                style={{ opacity: 0 }}
              >
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

          {/* Text */}
          <div ref={textLinesRef} className="space-y-5">
            <p className="about-line text-muted-foreground leading-relaxed" style={{ opacity: 0 }}>
              I'm an <span className="text-foreground font-medium">Associate Software Engineer</span> at{" "}
              <span className="gradient-text font-semibold">Kerk Solutions</span>, passionate about
              building scalable, user-centric applications.
            </p>
            <p className="about-line text-muted-foreground leading-relaxed" style={{ opacity: 0 }}>
              My expertise spans across <span className="text-foreground">Angular, React, Ionic, and Spring Boot</span>,
              enabling me to deliver full-stack solutions from elegant frontends to robust backend APIs.
            </p>
            <p className="about-line text-muted-foreground leading-relaxed" style={{ opacity: 0 }}>
              I'm deeply interested in AI, modern web technologies, and continuously
              exploring new tools to craft better digital experiences.
            </p>

            <button
              ref={buttonRef}
              className="gradient-bg px-6 py-3 rounded-lg font-semibold text-primary-foreground transition-shadow duration-300 inline-flex items-center gap-2 mt-4 hover:shadow-[0_0_30px_-5px_hsl(239_84%_67%/0.5)]"
              style={{ opacity: 0 }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/cv/Akila-Piumal-CV.pdf";
                link.download = "Akila-Piumal-Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
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
