"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { repertoire } from "@/lib/site-data";
import { FileText, Headphones, PlayCircle } from "lucide-react";

export default function CoristaPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem("colorau-corista-access");
    if (stored === "yes") {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.trim() === "langage") {
      setIsAuthorized(true);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("colorau-corista-access", "yes");
      }
      setError("");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="py-10 md:py-16">
        <section className="container-width">
          <Reveal className="section-card section-inverse max-w-xl">
            <p className="text-xs uppercase tracking-[0.14em] text-[#ff61ff]">
              Área restrita
            </p>
            <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
              Acesso do corista
            </h1>
            <p className="mt-4 text-sm text-white/75">
              Esta área é exclusiva para integrantes do COLORAU. Digite a senha
              combinada com a equipe para visualizar repertório e documentos.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="corista-password"
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/70"
                >
                  Senha
                </label>
                <input
                  id="corista-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#ff61ff] focus:ring-1 focus:ring-[#ff61ff]"
                  autoComplete="off"
                />
              </div>
              {error && (
                <p className="text-sm text-[#ff8080]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[#ff61ff] px-5 py-2 text-sm font-semibold text-black hover:brightness-110"
              >
                Entrar
              </button>
            </form>
          </Reveal>
        </section>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16">
      <section className="container-width flex flex-col gap-8 md:gap-10">
        <Reveal className="section-card p-0">
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr]">
            <div
              aria-hidden="true"
              className="texture-panel texture-3 texture-magenta hidden min-h-[200px] md:block"
            />
            <div className="px-6 py-7 md:px-10 md:py-10">
              <span className="pill bg-[#ff61ff] text-black">Área interna</span>
              <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
                Acesso do Corista
              </h1>
              <p className="mt-4 max-w-4xl text-black/75">
                Repertório centralizado com links para áudios por naipe, partitura e
                vídeo de referência. Atualize os links diretamente neste arquivo
                sempre que uma música nova entrar no programa.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="section-card section-inverse p-0">
          <div className="grid grid-cols-1 gap-8 px-6 py-7 md:grid-cols-2 md:px-10 md:py-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#ff61ff]">Repertório</h2>
              <div className="mt-5 space-y-4">
                {repertoire.map((music) => (
                  <article key={music.title} className="bg-white/10 p-4 md:p-5">
                    <h3 className="text-lg font-semibold">{music.title}</h3>
                    <p className="text-sm text-white/70">{music.artist}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm">
                      <a
                        className="inline-flex items-center gap-2 bg-[#ff61ff] px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
                        href={music.driveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Headphones className="h-4 w-4" />
                        Áudios por voz
                      </a>
                      <a
                        className="inline-flex items-center gap-2 bg-[#ff61ff] px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
                        href={music.scoreUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Partitura em PDF
                      </a>
                      <a
                        className="inline-flex items-center gap-2 bg-[#ff61ff] px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
                        href={music.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <PlayCircle className="h-4 w-4" />
                        Vídeo de referência
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="bg-white px-6 py-7 md:px-8 md:py-8">
              <h2 className="text-2xl font-semibold text-[#5900c3]">
                Documentos importantes
              </h2>
              <p className="mt-4 text-sm text-black/75">
                Reserve este espaço para PDFs e páginas internas com orientações do
                coro (cronograma, termos, roteiros de ensaio, etc.).
              </p>
              <div className="mt-5 space-y-3">
                <div className="bg-black/5 p-4 text-sm text-black/75">
                  Documento 01 – a adicionar
                </div>
                <div className="bg-black/5 p-4 text-sm text-black/75">
                  Documento 02 – a adicionar
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
