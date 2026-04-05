import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { TeamMemberCard } from "@/components/team-member-card";
import { achievements, teamMembers } from "@/lib/site-data";
import { getGalleryPhotos } from "@/lib/get-gallery-photos.server";

export const dynamic = "force-dynamic";

const roleOrder = [
  "Direção Musical",
  "Preparação vocal",
  "Pianista",
  "Design e Produção executiva",
  "Jurídico e Produção executiva",
  "Produção cultural",
];

export default function SobrePage() {
  const galleryPhotos = getGalleryPhotos();
  const heroPhoto = galleryPhotos[0] ?? "/file.svg";

  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
            <div className="px-6 py-7 md:px-10 md:py-10">
              <span className="pill bg-accent text-accent-foreground">O Colorau</span>
              <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
                O que é o COLORAU
              </h1>
              <p className="mt-5 max-w-4xl leading-relaxed text-black/80">
                Colorau é um coral independente nascido em Belo Horizonte a
                partir do desejo de retomar a música após o silêncio da pandemia. O
                grupo manipula o som em uma experiência
                sensorial, artística e coletiva.
              </p>
              <p className="mt-4 max-w-4xl leading-relaxed text-black/75">
                A cultura de trabalho do Colorau combina rigor técnico, experimentação
                estética e experiência afetiva para reinventar a prática do canto
                coletivo com calor humano e sofisticação cultural.
              </p>
            </div>
            <div className="relative hidden min-h-[280px] md:block">
              <Image
                src={heroPhoto}
                alt=""
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="section-card section-inverse p-0">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
            <div
              aria-hidden="true"
              className="texture-panel texture-4 texture-background hidden min-h-[200px] md:block"
            />
            <div className="px-6 py-7 md:px-10 md:py-10">
              <h2 className="text-2xl font-semibold text-accent">O que nos move</h2>
              <p className="mt-4 text-white/80">
                Cuidamos do som e uns dos outros: exigência e acolhimento no mesmo passo.
              </p>
              <p className="mt-4 text-white/80">
                Gostamos de experimentar e supreender sem medo de errar em conjunto.
              </p>
              <p className="mt-4 text-white/80">
                Nossa brasilidade é plural, vibrante e contemtporânea.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="section-card section-inverse p-0">
          <div className="flex flex-col gap-10 py-7 md:px-10 md:py-10">
            <h2 className="text-3xl font-semibold md:text-5xl">
              Quem faz o COLORAU acontecer
            </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-accent mb-4">Soprano</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>Ângela Maria</li>
                    <li>Laiane Moreira</li>
                    <li>Laura Assis</li>
                    <li>Laura Santana</li>
                    <li>Rafaela Bueno</li>
                    <li>Thais Soki</li>
                    <li aria-hidden="true" className="h-1 border-b border-4 border-accent/20 w-1/3"></li>
                    <li>Amanda Laís</li>
                    <li>Ana Luz</li>
                    <li>Ester Ribeiro</li>
                    <li>Luíza Marilac</li>
                    <li>Mariana Queiroz</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-accent mb-4">Contralto</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>Aana</li>
                    <li>Ana Rosa</li>
                    <li>Malu Camargo</li>
                    <li>Núbia Aguiar</li>
                    <li aria-hidden="true" className="h-1 border-b border-4 border-accent/20 w-1/3"></li>
                    <li>Ada Gomes</li>
                    <li>Caroline Borges</li>
                    <li>Layla Alcântara</li>
                    <li>Paula Azevedo</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-accent mb-4">Tenor</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>Du Ribeiro</li>
                    <li>Gustavo Moreno</li>
                    <li>Luis Gustavo</li>
                    <li>Margarete Leta</li>
                    <li aria-hidden="true" className="h-1 border-b border-4 border-accent/20 w-1/3"></li>
                    <li>André Dias</li>
                    <li>Eduardo Moura</li>
                    <li>Márcia Amélia</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-accent mb-4">Baixo</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>Burunin</li>
                    <li>Makk</li>
                    <li aria-hidden="true" className="h-1 border-b border-4 border-accent/20 w-1/3"></li>
                    <li>Guilherme Felipe</li>
                    <li>João Pereira</li>
                    <li>Rafael Duarte</li>
                  </ul>
                </div>
              </div>
            
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {roleOrder.flatMap((role) => {
                const members = teamMembers.filter((m) => m.role === role);
                if (!members.length) return [];

                if (members.length >= 2) {
                  return members.map((member) => (
                    <div key={`${role}-${member.name}`}>
                      <div>
                        <div className="md:hidden">
                          <article className="bg-white text-black">
                            <div className="grid grid-cols-[120px_1fr]">
                              <div className="relative min-h-[160px] bg-black/5">
                                <Image
                                  src={member.imageUrl}
                                  alt={`Foto de ${member.name}`}
                                  fill
                                  className="object-cover grayscale"
                                  sizes="120px"
                                />
                              </div>
                              <div className="flex min-w-0 flex-col p-4">
                                <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                                  Colorau
                                </p>
                                <h4 className="mt-2 text-xl font-semibold leading-tight">
                                  {member.name}
                                </h4>
                                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/70">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                            {member.bio && (
                              <details className="border-t border-black/10 px-4 py-3">
                                <summary className="cursor-pointer text-sm text-black/70">
                                  Mini currículo
                                </summary>
                                <p className="mt-3 text-sm leading-relaxed text-black/75">
                                  {member.bio}
                                </p>
                              </details>
                            )}
                          </article>
                        </div>
                        <div className="hidden md:block">
                          <TeamMemberCard member={member} />
                        </div>
                      </div>
                    </div>
                  ));
                }

                return [
                  <div key={role}>
                    <div>
                      <div className="md:hidden">
                        <article className="bg-white text-black">
                          <div className="grid grid-cols-[120px_1fr]">
                            <div className="relative min-h-[160px] bg-black/5">
                              <Image
                                src={members[0].imageUrl}
                                alt={`Foto de ${members[0].name}`}
                                fill
                                className="object-cover grayscale"
                                sizes="120px"
                              />
                            </div>
                            <div className="flex min-w-0 flex-col p-4">
                              <p className="text-xs uppercase tracking-[0.14em] text-black/50">
                                Colorau
                              </p>
                              <h4 className="mt-2 text-xl font-semibold leading-tight">
                                {members[0].name}
                              </h4>
                              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/70">
                                {members[0].role}
                              </p>
                            </div>
                          </div>
                          {members[0].bio && (
                            <details className="border-t border-black/10 px-4 py-3">
                              <summary className="cursor-pointer text-sm text-black/70">
                                Mini currículo
                              </summary>
                              <p className="mt-3 text-sm leading-relaxed text-black/75">
                                {members[0].bio}
                              </p>
                            </details>
                          )}
                        </article>
                      </div>
                      <div className="hidden md:block">
                        <TeamMemberCard
                          key={`${members[0].name}-${members[0].role}`}
                          member={members[0]}
                        />
                      </div>
                    </div>
                  </div>,
                ];
              })}
            </div>
        </Reveal>

        <Reveal className="section-card p-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_140px]">
            <div className="px-6 py-7 md:px-10 md:py-10">
          <h2 className="text-2xl font-semibold text-accent">
            Realizações em destaque
          </h2>
          <div className="mt-6 space-y-5">
            {achievements.map((period) => (
              <div key={period.year} className="bg-white p-4">
                <p className="text-xs tracking-[0.14em] text-accent uppercase">
                  {period.year}
                </p>
                <ul className="mt-2 space-y-2 text-sm text-black/75">
                  {period.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
            </div>
            <div
              aria-hidden="true"
              className="texture-panel texture-2 hidden min-h-[200px] md:block"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
