import { ColorauLogo } from "@/components/colorau-logo";

export function SiteFooter() {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-white/80 md:px-8">
        <ColorauLogo className="h-5 w-auto text-white" />
        <p className="subtitle-italic text-white/90">
          Quando vozes se encontram, algo acontece.
        </p>
        <p>
          Contato:{" "}
          <a
            className="text-[#ffe300] hover:underline"
            href="mailto:coloraucontato@gmail.com"
          >
            coloraucontato@gmail.com
          </a>{" "}
          | Instagram:{" "}
          <a
            className="text-[#ffe300] hover:underline"
            href="https://instagram.com/coloraumusica"
            target="_blank"
            rel="noreferrer"
          >
            @coloraumusica
          </a>
        </p>
      </div>
    </footer>
  );
}
