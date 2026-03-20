"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

const OUT_MS = 350;
const IN_MS = 480;

type Phase = "idle" | "out" | "in";

function hrefToSameOriginUrl(anchor: HTMLAnchorElement): URL | null {
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("#")) return null;
  if (raw.startsWith("mailto:") || raw.startsWith("tel:")) return null;
  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return url;
  } catch {
    return null;
  }
}

function navigationTarget(url: URL) {
  return `${url.pathname}${url.search}${url.hash}`;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("in");
  const exitTimerRef = useRef<number | null>(null);
  const prevPathnameRef = useRef<string | null>(null);
  const pendingHrefRef = useRef<string | null>(null);

  const clearExitTimer = useCallback(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    pendingHrefRef.current = null;
    clearExitTimer();
    setPhase("in");
  }, [pathname, clearExitTimer]);

  useEffect(() => {
    if (phase !== "in") return;
    const t = window.setTimeout(() => setPhase("idle"), IN_MS + 60);
    return () => window.clearTimeout(t);
  }, [phase, pathname]);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const el = e.target;
      if (!(el instanceof Element)) return;
      const anchor = el.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.skipPageTransition === "true") return;
      if (anchor.target === "_blank" || anchor.download) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return;

      const url = hrefToSameOriginUrl(anchor);
      if (!url) return;

      const pathSearch =
        window.location.pathname + window.location.search;
      const nextPathSearch = url.pathname + url.search;
      if (nextPathSearch === pathSearch) return;

      const here =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      const next = navigationTarget(url);
      if (next === here) return;

      e.preventDefault();
      e.stopPropagation();

      const to = navigationTarget(url);
      pendingHrefRef.current = to;
      clearExitTimer();

      flushSync(() => {
        setPhase("out");
      });

      exitTimerRef.current = window.setTimeout(() => {
        exitTimerRef.current = null;
        startTransition(() => {
          router.push(to);
        });
      }, OUT_MS);
    };

    window.addEventListener("click", onClickCapture, true);
    return () => {
      window.removeEventListener("click", onClickCapture, true);
      clearExitTimer();
    };
  }, [router, clearExitTimer]);

  const className =
    phase === "out"
      ? "page-trans-out"
      : phase === "in"
        ? "page-trans-in"
        : undefined;

  return (
    <div
      className={
        className ? `page-trans-root ${className}` : "page-trans-root"
      }
    >
      {children}
    </div>
  );
}
