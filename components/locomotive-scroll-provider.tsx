"use client";

import "locomotive-scroll/dist/locomotive-scroll.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function LocomotiveScrollProvider() {
  const pathname = usePathname();
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    let canceled = false;

    const create = async () => {
      const mod = await import("locomotive-scroll");
      const LocomotiveScroll = mod.default as any;

      // Destroy previous instance (dev mode / route changes).
      if (instanceRef.current?.destroy) {
        instanceRef.current.destroy();
      }

      if (canceled) return;

      instanceRef.current = new LocomotiveScroll({
        lenisOptions: {
          orientation: "vertical",
          // Tuning for a "butter" feel.
          // Lower lerp = more eased movement (default in Lenis is ~0.075).
          lerp: 0.08,
          smoothWheel: true,
          wheelMultiplier: 1,
        },
        scrollCallback: () => {
          // Keep ScrollTrigger in sync with Lenis-driven smooth scroll.
          ScrollTrigger.update();
        },
      });

      // Ensure ScrollTrigger recalculates positions with the smooth-scroll engine.
      // Lenis/Locomotive updates dimensions after first layout pass.
      window.requestAnimationFrame(() => {
        instanceRef.current?.resize?.();
        ScrollTrigger.refresh();
      });
    };

    // (Re)create on first mount and whenever Next route changes.
    create();

    const onResize = () => {
      instanceRef.current?.resize?.();
    };
    window.addEventListener("resize", onResize);

    return () => {
      canceled = true;
      window.removeEventListener("resize", onResize);
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, [pathname]);

  return null;
}

