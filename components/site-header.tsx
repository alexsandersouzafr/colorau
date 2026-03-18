"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site-data";
import { ColorauLogo } from "@/components/colorau-logo";
import { useThemeAccent } from "@/components/theme-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { accentId, options, setAccent } = useThemeAccent();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const orderedNavItems = [
    ...navItems.filter((item) => item.href !== "/corista"),
    ...navItems.filter((item) => item.href === "/corista"),
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!paletteRef.current) return;
      if (!paletteRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPaletteOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-stretch px-4 py-4 text-white md:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {orderedNavItems.map((item) => {
            const isActive = pathname === item.href;
            const isCorista = item.href === "/corista";
            const currentOption = options.find((option) => option.id === accentId);
            const linkClass = `rounded-full px-3 py-2 transition ${
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
                    onClick={() => setIsPaletteOpen((state) => !state)}
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-expanded={isPaletteOpen}
                    aria-label="Abrir menu de cores"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/40"
                      style={{ backgroundColor: currentOption?.value ?? "#ffffff" }}
                    />
                  </button>
                  <div
                    className={`absolute right-0 top-[44px] z-50 flex items-center gap-2 bg-black/90 p-2 backdrop-blur transition-all duration-250 ease-out ${
                      isPaletteOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                    }`}
                  >
                    {options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setAccent(option.id);
                          setIsPaletteOpen(false);
                        }}
                        className={`h-5 w-5 rounded-full transition ${
                          option.id === accentId
                            ? "ring-2 ring-white ring-offset-1 ring-offset-black"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: option.value }}
                        aria-label="Selecionar cor"
                      />
                    ))}
                  </div>
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

        <div className="hidden flex-1 items-center justify-center gap-4 px-4 md:flex">
          <div className="hidden h-[40px] flex-1 md:block">
            <div
              aria-hidden="true"
              className="texture-panel texture-3 texture-background h-full"
            />
          </div>
        </div>

        <Link href="/" className="ml-auto flex items-center text-white">
          <ColorauLogo className="h-8 w-auto md:h-10" />
        </Link>
      </div>
    </header>
  );
}
