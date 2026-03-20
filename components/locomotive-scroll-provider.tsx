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
    let resizeDebounce: ReturnType<typeof setTimeout> | undefined;

    const refreshLayout = () => {
      if (canceled) return;
      instanceRef.current?.resize?.();
      ScrollTrigger.refresh();
    };

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
          // Lower lerp = slower deceleration / longer glide (default in Lenis is ~0.075).
          lerp: 0.045,
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
        refreshLayout();
      });
    };

    // (Re)create on first mount and whenever Next route changes.
    create();

    const onResize = () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(refreshLayout, 150);
    };
    window.addEventListener("resize", onResize);

    const onLoad = () => refreshLayout();
    window.addEventListener("load", onLoad);

    const fontsReady = document.fonts?.ready;
    fontsReady?.then(() => refreshLayout());

    return () => {
      canceled = true;
      clearTimeout(resizeDebounce);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, [pathname]);

  return null;
}

