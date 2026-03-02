import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiMapPin, FiSend, FiArrowUpRight  } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaWhatsapp  } from "react-icons/fa";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactLinks = [
  { icon: FiMail, label: "akilapiumal16@gmail.com", href: "mailto:akilapiumal16@gmail.com" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/94783223485" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/akila-piumal-3b7040229/" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/Akila-Piumal" },
  { icon: FiMapPin, label: "Sri Lanka", href: undefined },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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
    if (!formRef.current || sending) return;

    setSending(true);
    setError("");

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSent(true);
        setSending(false);
        formRef.current?.reset();
        setTimeout(() => setSent(false), 3000);
      })
      .catch((err) => {
        setSending(false);
        setError("Failed to send. Please try again.");
        console.error("EmailJS error:", err);
      });
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="contact-anim text-center mb-16">
          {/* <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase gradient-bg text-primary-foreground mb-4">
            Contact
          </span> */}
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
            Have a project in mind? Let's collaborate and build something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-anim md:col-span-3 glass-card p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  required
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={sending}
                className="gradient-bg px-7 py-3 rounded-lg font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-2 group disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
                <FiSend className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
              </button>
              {sent && (
                <p className="text-primary text-sm font-medium animate-[fade-in_0.3s_ease-out]">
                  ✓ Sent successfully!
                </p>
              )}
              {error && (
                <p className="text-destructive text-sm font-medium animate-[fade-in_0.3s_ease-out]">
                  {error}
                </p>
              )}
            </div>
          </form>

          {/* Info sidebar */}
          <div className="contact-anim md:col-span-2 space-y-4">
            {contactLinks.map((item, i) => {
              const Inner = (
                <div
                  key={i}
                  className="glass-card p-4 flex items-center gap-4 group hover-lift cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <item.icon className="text-primary-foreground" size={18} />
                  </div>
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors truncate">
                    {item.label}
                  </span>
                  {item.href && (
                    <FiArrowUpRight className="ml-auto text-muted-foreground group-hover:text-primary transition-colors shrink-0" size={16} />
                  )}
                </div>
              );

              return item.href ? (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                  {Inner}
                </a>
              ) : (
                <div key={i}>{Inner}</div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
