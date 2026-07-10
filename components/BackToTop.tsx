"use client";

import { useEffect, useState } from "react";

type BackToTopProps = {
  threshold?: number;
};

export default function BackToTop({ threshold = 300 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      aria-label="Back to top"
      className="back-to-top"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Top
    </button>
  );
}
