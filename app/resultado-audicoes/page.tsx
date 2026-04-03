import { Reveal } from "@/components/reveal";
import Link from "next/link";

export default function ResultadoAudicoesPage() {
  const aprovados = [
    "Ana Carolina dos Reis Santos Abreu",
    "Ana Rosa de Souza Oliveira",
    "André Dias Avelar",
    "Bruno Araujo Medeiros",
    "Caroline Borges de Oliveira",
    "Eduardo Ribeiro de Oliveira Júnior",
    "Guilherme Felipe Tomaz Candido",
    "João Paulo dos santos Silva",
    "Laura Santana Marques",
    "Layla Alcântara Conceição De Assis Nogueira",
    "Luíza Marilac Horta",
    "Maria Luiza Mayer de Camargo",
    "Mariana Queiroz de Lima",
  ];

  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
            <div className="px-6 py-7 md:px-10 md:py-10">
              <Link href="/" className="text-sm text-black/50 hover:text-black/80 transition uppercase tracking-widest font-semibold">
                &larr; Voltar
              </Link>
              <h1 className="mt-6 text-3xl font-semibold md:text-5xl text-accent">
                Resultado das Audições 2026
              </h1>
              <p className="mt-5 max-w-4xl leading-relaxed text-black/80 text-lg">
                É com muita alegria que damos as boas-vindas às novas vozes do Colorau!
                As audições foram um sucesso e estamos muito empolgados com a energia e
                o talento que vimos em cada pessoa.
              </p>
              <p className="mt-4 max-w-4xl leading-relaxed text-black/75">
                Para quem não passou desta vez, nosso muito obrigado por compartilhar
                seu canto com a gente. Fiquem de olho nas próximas oportunidades!
              </p>
            </div>
            <div
              aria-hidden="true"
              className="texture-panel texture-1 hidden min-h-[280px] md:block"
            />
          </div>
        </Reveal>

        <Reveal className="section-card p-0">
          <div className="px-6 py-7 md:px-10 md:py-10">
            <h2 className="text-2xl font-semibold md:text-3xl mb-6">
              Pessoas Aprovadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
              {aprovados.map((nome, index) => (
                <div key={index} className="py-2 border-b border-black/10 last:border-0 md:border-0 flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent"></div>
                  <span className="text-lg font-medium text-black/80">{nome}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-accent/10 p-6 sm:p-8 text-left border-y sm:border border-accent/20">
              <h3 className="text-xl font-semibold text-accent mb-4">
                Boas-vindas ao Colorau!
              </h3>
              <div className="text-black/80">
                <p className="font-medium mb-3">Os próximos passos:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-1">
                  <li>Entrar no grupo do WhatsApp</li>
                  <li>Ler o documento de Manifesto e Cultura</li>
                  <li>Acessar a Área do Corista</li>
                </ul>
                <p className="text-black/70 mt-5 pt-4 border-t border-accent/10">
                  A produção vai entrar em contato orientando.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
