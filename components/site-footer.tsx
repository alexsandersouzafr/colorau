import { ColorauLogo } from "@/components/colorau-logo";

export function SiteFooter() {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-white/80 md:px-8">
        <ColorauLogo className="h-5 w-auto text-white" />
      </div>
    </footer>
  );
}
