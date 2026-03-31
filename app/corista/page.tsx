"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { coristaDocuments, repertoire } from "@/lib/site-data";
import { FileText, Headphones, PlayCircle } from "lucide-react";

export default function CoristaPage() {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("colorau-corista-access") === "yes";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
            <p className="text-xs uppercase tracking-[0.14em] text-accent">
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
                  className="mt-2 w-full border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-black/40 focus:border-accent focus:ring-1 focus:ring-accent"
                  autoComplete="off"
                />
              </div>
              {error && (
                <p className="text-sm text-accent">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110"
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


        <Reveal className="section-card">
          <h2 className="text-2xl font-semibold">
            Documentos importantes
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {coristaDocuments.map((doc) => (
              <a
                key={doc.url}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center gap-3 bg-black/5 p-4 text-sm text-black/75 transition hover:bg-black/10"
              >
                <FileText className="h-4 w-4 shrink-0" />
                {doc.title}
              </a>
            ))}
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
