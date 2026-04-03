"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

export function AuthGuard({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}
