import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMonitor, FiSmartphone, FiServer, FiLayout, FiZap } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: FiMonitor, title: "Web Application Development", desc: "Building responsive, performant web apps with modern frameworks." },
  { icon: FiSmartphone, title: "Mobile App Development", desc: "Cross-platform mobile apps using Ionic and Capacitor." },
  { icon: FiServer, title: "API Development", desc: "RESTful APIs with Spring Boot, secure and scalable." },
  { icon: FiLayout, title: "UI/UX Implementation", desc: "Pixel-perfect interfaces with smooth interactions." },
  { icon: FiZap, title: "System Optimization", desc: "Performance tuning and architecture improvements." },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      gsap.fromTo(cards,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
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
    <section ref={sectionRef} id="services" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-16">
          My <span className="gradient-text">Services</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="service-card glass-card p-7 hover-lift">
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-5">
                <Icon className="text-primary-foreground" size={22} />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
