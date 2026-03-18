"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site-data";
import { ColorauLogo } from "@/components/colorau-logo";
import { useThemeAccent } from "@/components/theme-provider";

export function SiteHeader() {
  const DOT_STAGGER_MS = 32;
  const DOT_ENTER_MS = 240;
  const CLOSE_BUFFER_MS = 80;
  const pathname = usePathname();
  const { accentId, options, setAccent } = useThemeAccent();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isPaletteMounted, setIsPaletteMounted] = useState(false);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const orderedNavItems = [
    ...navItems.filter((item) => item.href !== "/corista"),
    ...navItems.filter((item) => item.href === "/corista"),
  ];

  const openPalette = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsPaletteMounted(true);
    window.requestAnimationFrame(() => setIsPaletteOpen(true));
  };

  const closePalette = () => {
    setIsPaletteOpen(false);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsPaletteMounted(false);
      closeTimerRef.current = null;
    }, options.length * DOT_STAGGER_MS + DOT_ENTER_MS + CLOSE_BUFFER_MS);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!paletteRef.current) return;
      if (!paletteRef.current.contains(event.target as Node)) {
        closePalette();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePalette();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-white md:flex-row md:items-stretch md:gap-0 md:px-8">
        <Link
          href="/"
          className="order-1 flex items-center justify-center text-white md:order-3 md:ml-auto md:justify-start"
        >
          <ColorauLogo className="h-8 w-auto md:h-10" />
        </Link>

        <nav className="order-2 flex flex-wrap items-center gap-2 text-xs md:order-1 md:text-sm">
          {orderedNavItems.map((item) => {
            const isActive = pathname === item.href;
            const isCorista = item.href === "/corista";
            const currentOption = options.find((option) => option.id === accentId);
            const linkClass = `rounded-full px-3 py-2 transition md:px-3 md:py-2 ${
              isCorista
                ? "bg-accent text-accent-foreground hover:brightness-110"
                : isActive
                ? "bg-white text-black"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            }`;

            if (isCorista) {
              return (
                <div
                  key={item.href}
                  className="relative flex items-center gap-2"
                  ref={paletteRef}
                >
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => (isPaletteOpen ? closePalette() : openPalette())}
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-expanded={isPaletteOpen}
                    aria-label="Abrir menu de cores"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/40"
                      style={{ backgroundColor: currentOption?.value ?? "#ffffff" }}
                    />
                  </button>
                  {isPaletteMounted && (
                  <div
                    className={`absolute left-1/2 top-[44px] z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full bg-black/90 p-2 backdrop-blur transition-all duration-180 ease md:max-w-none ${
                      isPaletteOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isPaletteOpen
                        ? "0ms"
                        : `${Math.max(0, options.length * DOT_STAGGER_MS - 90)}ms`,
                    }}
                  >
                    {options.map((option, index) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setAccent(option.id);
                          closePalette();
                        }}
                        className={`h-5 w-5 rounded-full ${
                          isPaletteOpen ? "theme-dot-enter" : "theme-dot-exit"
                        } ${
                          option.id === accentId
                            ? "ring-2 ring-white ring-offset-1 ring-offset-black"
                            : "hover:scale-110"
                        }`}
                        style={{
                          backgroundColor: option.value,
                          animationDelay: `${index * DOT_STAGGER_MS}ms`,
                        }}
                        aria-label="Selecionar cor"
                      />
                    ))}
                  </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="order-2 hidden flex-1 items-center justify-center gap-4 px-4 md:flex">
          <div className="hidden h-[40px] flex-1 md:block">
            <div
              aria-hidden="true"
              className="texture-panel texture-3 texture-background h-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
