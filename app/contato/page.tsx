import { Reveal } from "@/components/reveal";
import { Instagram, Mail } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card p-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
            <div className="px-6 py-7 md:px-10 md:py-10">
              <span className="pill bg-accent text-accent-foreground">Contato</span>
              <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
                Fale com o COLORAU
              </h1>
              <p className="mt-4 max-w-3xl text-black/75">
                Para convites de apresentação, parcerias ou produção
                cultural, entre em contato pelos canais oficiais.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="texture-panel texture-2 hidden min-h-[200px] md:block"
            />
          </div>
        </Reveal>

        <Reveal className="grid gap-6 md:grid-cols-2">
          <article className="section-card section-inverse">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-semibold text-accent">Email</h2>
            </div>
            <a
              href="mailto:coloraucontato@gmail.com"
              className="mt-3 inline-block text-lg text-white hover:underline"
            >
              coloraucontato@gmail.com
            </a>
          </article>

          <article className="section-card">
            <div className="flex items-center gap-3">
              <Instagram className="h-6 w-6 text-black" />
              <h2 className="text-xl font-semibold text-black">Instagram</h2>
            </div>
            <a
              href="https://instagram.com/coloraumusica"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-lg text-black hover:underline"
            >
              @coloraumusica
            </a>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
