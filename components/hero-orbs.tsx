"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroOrbs() {
  const firstOrb = useRef<HTMLDivElement | null>(null);
  const secondOrb = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!firstOrb.current || !secondOrb.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(firstOrb.current, {
        x: 30,
        y: -18,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(secondOrb.current, {
        x: -24,
        y: 20,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={firstOrb}
        className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-[#ff001c]/25 blur-3xl"
      />
      <div
        ref={secondOrb}
        className="absolute -right-8 bottom-8 h-64 w-64 rounded-full bg-[#5351fe]/18 blur-3xl"
      />
    </div>
  );
}
