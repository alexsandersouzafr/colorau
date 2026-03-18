"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site-data";
import { ColorauLogo } from "@/components/colorau-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const orderedNavItems = [
    ...navItems.filter((item) => item.href !== "/corista"),
    ...navItems.filter((item) => item.href === "/corista"),
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-stretch px-4 py-4 text-white md:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {orderedNavItems.map((item) => {
            const isActive = pathname === item.href;
            const isCorista = item.href === "/corista";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 transition ${
                  isCorista
                    ? "bg-[#ff001c] text-white hover:brightness-110"
                    : isActive
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-1 px-4 md:block">
          <div
            aria-hidden="true"
            className="texture-panel texture-3 texture-gray h-[40px] md:h-[48px]"
          />
        </div>

        <Link href="/" className="ml-auto flex items-center text-white">
          <ColorauLogo className="h-8 w-auto md:h-10" />
        </Link>
      </div>
    </header>
  );
}
