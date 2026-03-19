"use client";

import { useEffect, useRef } from "react";

function isScrollableFormElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  if (target.isContentEditable) return true;

  // If a wheel happens over a descendant of a form element, allow native scroll.
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function ButterScroll() {
  const rafRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const lastTsRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    // If reduced motion is requested, keep native scrolling behavior.
    if (prefersReducedMotion) return;

    const getMaxScrollY = () => {
      const doc = document.documentElement;
      return Math.max(0, doc.scrollHeight - window.innerHeight);
    };

    const cancel = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isAnimatingRef.current = false;
      velocityRef.current = 0;
    };

    const stopIfSettled = (velocity: number) => {
      return Math.abs(velocity) < 0.15;
    };

    const tick = (ts: number) => {
      rafRef.current = null;
      isAnimatingRef.current = true;

      const last = lastTsRef.current || ts;
      const dt = ts - last;
      lastTsRef.current = ts;

      const maxScrollY = getMaxScrollY();
      const currentY = window.scrollY;

      // Convert dt to a stable multiplier (so it feels similar across FPS).
      const dtFactor = clamp(dt / 16.67, 0.5, 2.0);
      const frictionBase = 0.92;
      const friction = Math.pow(frictionBase, dtFactor);

      let velocity = velocityRef.current * friction;

      // Drive scroll position directly via velocity decay.
      let nextY = currentY + velocity;
      nextY = clamp(nextY, 0, maxScrollY);

      // If we hit boundaries, stop.
      const hitTop = nextY <= 0;
      const hitBottom = nextY >= maxScrollY;
      if (hitTop || hitBottom) {
        velocity = 0;
      }

      window.scrollTo(0, nextY);
      velocityRef.current = velocity;

      if (!document.hidden && !stopIfSettled(velocity) && !(hitTop || hitBottom)) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
        rafRef.current = null;
        velocityRef.current = 0;
      }
    };

    const startIfNeeded = () => {
      if (rafRef.current !== null || isAnimatingRef.current) return;
      lastTsRef.current = 0;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.defaultPrevented) return;
      if (e.ctrlKey) return; // pinch-to-zoom, let browser handle it
      if (isScrollableFormElement(e.target)) return;

      // Avoid clobbering scroll when user prefers reduced motion (checked once on mount).
      // (No-op here because we already returned above.)

      // deltaMode: 0=px, 1=lines, 2=pages
      const deltaPx =
        e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;

      const currentY = window.scrollY;
      const maxScrollY = getMaxScrollY();
      const wantsUp = deltaPx < 0;
      const wantsDown = deltaPx > 0;

      // If we are already clamped at a boundary and user scrolls further,
      // don't block native "overscroll" behavior.
      if ((currentY <= 0 && wantsUp) || (currentY >= maxScrollY && wantsDown)) {
        return;
      }

      // Accumulate velocity and let RAF animate the "glide".
      const sensitivity = 0.90;
      const maxVelocity = 40; // prevent wild jumps
      const nextVelocity = clamp(velocityRef.current + deltaPx * sensitivity, -maxVelocity, maxVelocity);
      velocityRef.current = nextVelocity;

      // Prevent native scroll so our inertia controls the motion.
      e.preventDefault();
      startIfNeeded();
    };

    const onScroll = () => {
      // If user scrolls via keyboard/mouse wheel outside our control, stop inertia.
      if (isAnimatingRef.current) return;
      cancel();
    };

    // Must be { passive: false } to call preventDefault().
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Safety: stop animation when leaving tab.
    const onVisibility = () => {
      if (document.hidden) cancel();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("wheel", onWheel as EventListener);
      window.removeEventListener("scroll", onScroll as EventListener);
      document.removeEventListener("visibilitychange", onVisibility);
      cancel();
    };
  }, []);

  return null;
}

