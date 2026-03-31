import { Instagram, Mail } from "lucide-react";
import { ColorauLogo } from "@/components/colorau-logo";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:items-center md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <ColorauLogo className="h-6 w-auto text-white" />
          <address className="not-italic text-xs uppercase tracking-wider text-white/40">
            Edifício Maletta, Avenida Augusto de Lima, nº 233, 9º andar — Belo Horizonte, Brasil
          </address>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:coloraucontato@gmail.com"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a
            href="https://instagram.com/coloraumusica"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
