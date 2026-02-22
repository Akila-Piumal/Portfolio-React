import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding">
      <div className="container mx-auto">
        <h2 className="contact-anim text-3xl md:text-4xl font-bold font-display text-center mb-16">
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-anim space-y-5">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="gradient-bg px-8 py-3.5 rounded-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <FiSend /> Send Message
            </button>
            {sent && (
              <p className="text-primary text-sm font-medium animate-[fade-in_0.3s_ease-out]">
                ✓ Message sent successfully!
              </p>
            )}
          </form>

          {/* Info */}
          <div className="contact-anim space-y-6">
            <h3 className="text-xl font-bold font-display mb-4">Contact Info</h3>

            <div className="space-y-4">
              <a href="mailto:akilapiumal@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <FiMail className="text-primary" size={20} />
                akilapiumal@example.com
              </a>
              <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="text-primary" size={20} />
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="text-primary" size={20} />
                GitHub
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <FiMapPin className="text-primary" size={20} />
                Sri Lanka
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
