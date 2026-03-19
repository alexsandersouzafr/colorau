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
        <Reveal className="grid items-stretch gap-6 md:grid-cols-2">
          <article className="section-card h-full bg-accent p-0 text-accent-foreground overflow-hidden">
            <div className="flex flex-col items-start justify-start px-6 py-7 md:px-8 md:py-8">
              <ColorauLogo className="mt-4 h-20 w-auto text-current md:h-28" />
              <p className="subtitle-italic mt-3 text-4xl font-extralight tracking-[0.06em]">
                Um coro de corpos plurais e sensíveis
              </p>
              <p className="mt-5 text-base leading-relaxed text-accent-foreground/80 md:text-lg text-spread"></p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <Link
                  href="/sobre"
                  className="bg-black  px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Conheça o Colorau
                </Link>
              </div>
            </div>
          </article>

          <article className="section-card h-full min-h-[320px] bg-accent p-2 overflow-hidden md:min-h-[420px]">
            <div className="relative h-full w-full">
              <Image
                src={galleryPhotos[4]}
                alt="Foto da galeria 1 do COLORAU"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </article>

          <article className="section-card h-full bg-accent p-0 text-black outline-accent">
            <div
              aria-hidden="true"
              className="texture-panel texture-4 texture-flip-y texture-black h-10 md:h-60"
            />
            <div className="px-6 py-7 md:px-8 md:py-8">
              <h2 className="text-4xl font-semibold text-black">
                Audições temporada 2026
              </h2>
              <div className="mt-5 space-y-3 text-sm text-black uppercase md:text-base">
                <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                  <span className="uppercase tracking-[0.08em]">Inscrições</span>
                  <span className="text-right font-bold italic">Até 28/3</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                  <span className="uppercase tracking-[0.08em]">Audições</span>
                  <span className="text-right font-bold italic">30/03 e 01/04</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                  <span className="uppercase tracking-[0.08em]">Ensaios</span>
                  <span className="text-right font-bold italic">Segundas 18h30-21h</span>
                </div>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfyA1tVd6ykYyY_CpAnw82rvyKGU-4Oq_jkT6d96BC-JWRgug/viewform"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Quero me inscrever
              </a>
            </div>
          </article>

          <article className="section-card h-full p-0 overflow-hidden">
            <div className="px-6 py-7 md:px-8 md:py-8">
              <h2 className="text-4xl font-semibold text-black">Agenda 2026</h2>

              <div className="mt-5 space-y-4">
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-black">
                    Data a anunciar
                  </p>
                  <h3 className="mt-2 subtitle-italic text-5xl font-normal normal-case">
                    MAIS COLORAU!
                  </h3>
                </div>
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-black">
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
                className="texture-panel texture-2 texture-black texture-flip-y texture-flip-x h-10 md:h-56"
            />
          </article>

          <article className="section-card h-full p-0 overflow-hidden">
            <div className="flex h-full flex-col px-6 py-7 md:px-8 md:py-8">
              <h2 className="text-2xl font-semibold md:text-3xl">
                A música começa no encontro.
              </h2>
              <p className="mt-4 text-black/75">
                O Colorau é um coletivo coral contemporâneo nascido em Belo
                Horizonte a partir do desejo de retomar a música após o silêncio
                da pandemia. Mais do que um coro, funciona como laboratório
                artístico onde técnica e afeto coexistem.
              </p>
              <p className="mt-4 text-black/75">
                No cenário cultural de Belo Horizonte, o Colorau ocupa um espaço
                entre o rigor técnico da música coral e o calor popular da
                cultura brasileira. A proposta artística integra música, corpo,
                cena e presença coletiva.
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8 text-sm">
                <Link
                  className="bg-accent px-4 py-2 text-accent-foreground hover:brightness-110"
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
            </div>
          </article>

          <article className="section-card h-full min-h-[320px] bg-accent p-2 overflow-hidden md:min-h-[420px]">
            <div className="relative h-full w-full">
              <Image
                src={galleryPhotos[5]}
                alt="Foto da galeria 2 do COLORAU"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
