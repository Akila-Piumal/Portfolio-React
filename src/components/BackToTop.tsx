import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground shadow-lg hover:opacity-90 transition-opacity animate-[scale-in_0.2s_ease-out]"
      aria-label="Back to top"
    >
      <FiArrowUp size={20} />
    </button>
  ) : null;
};

export default BackToTop;
