import { Reveal } from "@/components/reveal";
import { coristaDocuments, repertoire } from "@/lib/site-data";
import { FileText, Headphones, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function CoristaPage() {
  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card p-0">
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr]">
            <div
              aria-hidden="true"
              className="texture-panel texture-1 hidden min-h-[200px] md:block"
            />
            <div className="px-6 py-7 md:px-10 md:py-10">
              <span className="pill bg-accent text-accent-foreground">Área interna</span>
              <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
                Acesso do Corista
              </h1>
              <p className="mt-4 max-w-4xl text-black/75">
                Baixe partituras, áudios, acesse vídeos de referência e outros documentos.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="section-card bg-accent text-accent-foreground">
          <h2 className="text-2xl font-semibold">
            Manifesto e Cultura
          </h2>
          <p className="mt-4 text-accent-foreground/80">
            Entenda como o Colorau acontece e como funcionam os ensaios.
          </p>
          <Link
            href="/corista/manifesto"
            className="mt-6 inline-flex bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Ler o Manifesto
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <Reveal className="section-card bg-black/5">
            <h2 className="text-2xl font-semibold">
              Ensaios
            </h2>
            <div className="mt-5 space-y-3 text-black/80">
              <p>
                <strong className="text-black">Onde:</strong> Edifício Arcângelo Maletta, 9º andar.
              </p>
              <p>
                <strong className="text-black">Quando:</strong> Segundas-feiras, <strong>PONTUALMENTE</strong> das 18h30 às 21h00.
              </p>
              <p>
                <strong className="text-black">Período:</strong> De 6 de abril a 26 de outubro (total de 30 encontros).
              </p>
            </div>
          </Reveal>

          <Reveal className="section-card-agenda px-6 py-7 md:px-10 md:py-10">
            <h2 className="text-2xl font-semibold text-accent">
              Agenda
            </h2>
            <div className="mt-5 space-y-4 text-accent">
              <div>
                <h3 className="mt-2 subtitle-italic text-accent text-5xl font-normal normal-case mb-4">Mais Colorau!</h3>
                <p><strong className="font-bold">26 de setembro</strong>, Sala Sergio Magnani, Fundação de Educação Artística</p>
              </div>
              <div className="border-t border-accent/20 pt-4">
                <h3 className="mt-2 subtitle-italic text-accent text-5xl font-normal normal-case mb-4">Dendê Trapiá</h3>
                <p><strong className="font-bold">31 de outubro</strong>, Sala Juvenal Dias, Palácio das Artes</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="section-card section-inverse border border-accent/20 space-y-6">
          <div>
            <h3 className="font-semibold text-accent mb-2">Propostas dos Coristas:</h3>
            <p className="text-white/80">
              Para a apresentação final, DENDÊ TRAPIÁ, abrimos espaço para sugestões de peças (individuais ou em pequenos grupos). A premissa inegociável é: o Colorau neste ano faz apenas música latino-americana. As propostas devem ser apresentadas até o nosso último ensaio de maio (26 de maio).
            </p>
          </div>
          <div className="border-t border-accent/20 pt-6">
            <h3 className="font-semibold text-accent mb-2">Eventos e convites extras:</h3>
            <p className="text-white/80">
              Convites podem surgir ao longo da temporada. Para apresentações extraoficiais, consultaremos a disponibilidade do grupo. O Colorau será considerado disponível se tivermos pelo menos 2 pessoas de cada naipe para a data proposta. Caso contrário, declinaremos o convite.
            </p>
          </div>
        </Reveal>
        
        <Reveal className="section-card">
          <h2 className="text-2xl font-semibold">
            Documentos importantes
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {coristaDocuments.map((doc) => {
              const isInternal = doc.url.startsWith("/corista");
              const className = "inline-flex w-full items-center gap-3 bg-black/5 p-4 text-sm text-black/75 transition hover:bg-black/10";
              
              if (isInternal) {
                return (
                  <Link key={doc.url} href={doc.url} className={className}>
                    <FileText className="h-4 w-4 shrink-0" />
                    {doc.title}
                  </Link>
                );
              }
              
              return (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  {doc.title}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="section-card section-inverse">
          <h2 className="text-2xl font-semibold text-accent">Material de Apoio</h2>
          <div className="mt-5 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {repertoire.map((music) => (
              <article key={music.title} className="bg-white/10 p-4 md:p-5">
                <h3 className="text-lg font-semibold">{music.title}</h3>
                <p className="text-sm text-white/70">{music.artist}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  {music.audioUrl && (
                    <a
                      className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110"
                      href={music.audioUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Headphones className="h-4 w-4" />
                      Áudios
                    </a>
                  )}
                  {music.scoreUrl && (
                    <a
                      className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110"
                      href={music.scoreUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText className="h-4 w-4" />
                      Partitura
                    </a>
                  )}
                  {music.referenceUrl && (
                    <a
                      className="inline-flex items-center gap-2 bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110"
                      href={music.referenceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Vídeo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
