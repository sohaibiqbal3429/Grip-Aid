"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export default function Counter({ end, start = 0, duration = 1200, suffix = "", prefix = "", className }: CounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let animationFrame = 0;
    const startedAt = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      setValue(Math.round(start + (end - start) * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    }

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, end, hasStarted, start]);

  return (
    <span className={className} ref={elementRef}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
