import Link from "next/link";
import Image from "next/image";
import { ColorauLogo } from "@/components/colorau-logo";
import { HeroOrbs } from "@/components/hero-orbs";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/site-data";

export default function Home() {
  return (
    <div className="relative overflow-hidden py-10 md:py-16">
      <HeroOrbs />
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          <Reveal className="bg-[#ff8c00] px-6 py-7 text-white md:px-10 md:py-10">
            <ColorauLogo className="mt-4 h-20 w-auto text-white md:h-32" />
            <p className="subtitle-italic font-extralight mt-3 text-4xl tracking-[0.06em]">
              Um coro de corpos plurais e sensíveis
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
              Colorau é um coletivo coral contemporâneo nascido em Belo Horizonte
              a partir do desejo de retomar a música após o silêncio da pandemia.
              Mais do que um coro, funciona como laboratório artístico onde
              técnica e afeto coexistem.
            </p>
            <div className="mt-6 h-2 w-full max-w-xl bg-[#ff8c00]" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sobre"
                className="bg-black border border-white px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Conheça o Colorau
              </Link>
              <Link
                href="/corista"
                className="bg-[#ff8c00] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
              >
                Acesso do corista
              </Link>
            </div>
          </Reveal>
          <div
            aria-hidden="true"
            className="texture-panel texture-1 texture-red hidden min-h-[320px] md:block"
          />
        </div>

        <Reveal className="grid gap-3 md:grid-cols-3">
          {galleryPhotos.slice(0, 3).map((photo, index) => (
            <div
              key={`${photo}-${index}`}
              className="relative aspect-16/10"
            >
              <Image
                src={photo}
                alt={`Foto de destaque ${index + 1} do COLORAU`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </Reveal>

        <Reveal className="grid gap-6 md:grid-cols-2">
          <article className="section-card p-0 outline-[6px] outline-[#ff8c00]">
            <div
              aria-hidden="true"
              className="texture-panel texture-1 texture-orange h-10 md:h-12"
            />
            <div className="px-6 py-7 md:px-8 md:py-8">
              <h2 className="text-4xl font-semibold text-[#ff8c00]">
                Audições temporada 2026
              </h2>
              <p className="mt-4 text-black/75">
                Inscrições até 28 de março de 2026.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-black/75">
                <li>- Audições: 30/03 e 01/04, às 18h30 (ordem de chegada)</li>
                <li>
                  - Local: Av. dos Andradas, 2287, sala 1406, Santa Efigênia
                </li>
                <li>
                  - Ensaios: segundas, 18h30–21h, de 06/04 a 26/10 no Ed. Maletta
                </li>
              </ul>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfyA1tVd6ykYyY_CpAnw82rvyKGU-4Oq_jkT6d96BC-JWRgug/viewform"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex bg-[#ff8c00] px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:brightness-110"
              >
                Quero me inscrever
              </a>
            </div>
          </article>

          <article className="section-card p-0">
            <div className="px-6 py-7 md:px-8 md:py-8">
              <h2 className="text-2xl font-semibold text-[#ff8c00]">Agenda 2026</h2>

              <div className="mt-5 space-y-4">
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#ff8c00]">
                    Data a anunciar
                  </p>
                  <h3 className="mt-2 subtitle-italic text-5xl font-normal normal-case">
                    MAIS COLORAU!
                  </h3>
                </div>
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#ff8c00]">
                    Data a anunciar
                  </p>
                  <h3 className="mt-2 subtitle-italic text-5xl font-normal normal-case">
                    Dendê Trapiá
                  </h3>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="texture-panel texture-4 texture-orange h-10 md:h-12"
            />
          </article>
        </Reveal>

        <Reveal className="section-card">
          <h2 className="text-2xl font-semibold md:text-3xl">
            A música começa no encontro.
          </h2>
          <p className="mt-4 max-w-4xl text-black/75">
            No cenário cultural de Belo Horizonte, o Colorau ocupa um espaço
            entre o rigor técnico da música coral e o calor popular da cultura
            brasileira. A proposta artística integra música, corpo, cena e
            presença coletiva.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              className="bg-[#ff8c00] px-4 py-2 text-white hover:brightness-110"
              href="/galeria"
            >
              Ver galeria
            </Link>
            <Link
              className="bg-black/5 px-4 py-2 hover:bg-black/10"
              href="/contato"
            >
              Entrar em contato
            </Link>
          </div>
        </Reveal>

        <div
          aria-hidden="true"
          className="texture-panel texture-4 texture-orange h-52 md:h-72"
        />
      </section>
    </div>
  );
}
