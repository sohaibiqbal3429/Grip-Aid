"use client";

import { Children, ReactNode, useRef, useState } from "react";

type CarouselProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
};

export default function Carousel({ children, ariaLabel = "Carousel", className = "" }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = Children.toArray(children);

  function scrollBySlide(direction: -1 | 1) {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    const slideWidth = scroller.firstElementChild?.clientWidth ?? scroller.clientWidth;
    scroller.scrollBy({ left: direction * slideWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    const slideWidth = scroller.firstElementChild?.clientWidth ?? scroller.clientWidth;
    setActiveIndex(Math.round(scroller.scrollLeft / Math.max(slideWidth, 1)));
  }

  return (
    <section className={`carousel ${className}`.trim()} aria-label={ariaLabel}>
      <div className="carousel__viewport" ref={scrollRef} onScroll={handleScroll}>
        {slides.map((slide, index) => (
          <div className="carousel__slide" key={index} aria-roledescription="slide">
            {slide}
          </div>
        ))}
      </div>
      <div className="carousel__controls">
        <button type="button" className="carousel__button" onClick={() => scrollBySlide(-1)} aria-label="Previous slide">
          ‹
        </button>
        <span className="carousel__status" aria-live="polite">
          {activeIndex + 1} / {slides.length}
        </span>
        <button type="button" className="carousel__button" onClick={() => scrollBySlide(1)} aria-label="Next slide">
          ›
        </button>
      </div>
    </section>
  );
}
