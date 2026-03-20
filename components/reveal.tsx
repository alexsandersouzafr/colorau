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
    let timeline: gsap.core.Timeline | null = null;
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

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          // Earlier reveal so it doesn't feel late with smooth scroll engines.
          start: "top 80%",
          end: "bottom top",
          // With Lenis/Locomotive, scroll often leaves the trigger range before the
          // timeline finishes; "reverse" on leave interrupts tweens and feels truncated.
          toggleActions: "play none play none",
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

    return () => {
      // Ensure ScrollTrigger instances tied to this element are killed first.
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element) st.kill();
        });
      } catch {
        // ignore cleanup issues
      }
      timeline?.kill();
      ctx.revert();
    };
  }, [textStagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
