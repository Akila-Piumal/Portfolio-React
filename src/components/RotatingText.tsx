import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const titles = [
  "Full Stack Web Developer",
  // "Associate Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Problem Solver",
];

const RotatingText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

    useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1 });

    titles.forEach((_, i) => {
      // Animate in
      tl.fromTo(
        el,
        { y: 40, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
          onStart: () => setIndex(i),
        }
      );
      // Hold
      tl.to({}, { duration: 2 });
      // Animate out
      tl.to(el, {
        y: -40,
        opacity: 0,
        rotationX: 45,
        duration: 0.5,
        ease: "power3.in",
      });
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <span className="inline-block" style={{ perspective: "600px" }}>
      <span
        ref={containerRef}
        className="inline-block gradient-text"
        style={{ transformStyle: "preserve-3d" }}
      >
        {titles[index]}
      </span>
    </span>
  );
};

export default RotatingText;