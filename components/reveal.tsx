"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  textStagger?: boolean;
};

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className, textStagger = true }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduceMotion.matches) {
        gsap.set(element, { autoAlpha: 1, y: 0 });
        return;
      }

      const textTargets = textStagger
        ? element.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, li, a, button, blockquote, small",
          )
        : [];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      });

      timeline.fromTo(
        element,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
        },
      );

      if (textTargets.length) {
        timeline.fromTo(
          textTargets,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power2.out",
            stagger: 0.06,
            clearProps: "transform",
          },
          "-=0.45",
        );
      }
    }, element);

    return () => ctx.revert();
  }, [textStagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
