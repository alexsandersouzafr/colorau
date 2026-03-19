"use client";

import Image from "next/image";
import { useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
};

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasBio = member.bio && member.bio.length > 0;

  return (
    <article className="grid grid-cols-[160px_1fr] bg-white">
      <div className="relative h-full min-h-[160px] bg-black/5">
        <Image
          src={member.imageUrl}
          alt={`Foto de ${member.name}`}
          fill
          className="object-cover grayscale"
          sizes="160px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-col p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-black/50">
            Colorau
          </p>
          <h4 className="mt-2 text-2xl font-semibold leading-tight text-black">
            {member.name}
          </h4>
          <p className="mt-1 text-sm text-accent opacity-80">{member.role}</p>
        </div>

        {hasBio && (
          <>
            <div
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{ maxHeight: isExpanded ? 400 : 0 }}
            >
              <p className="px-4 pb-4 text-sm leading-relaxed text-black/75">
                {member.bio}
              </p>
            </div>
            <div className="flex justify-end px-4 pb-4">
              <button
                type="button"
                onClick={() => setIsExpanded((e) => !e)}
                className="inline-flex shrink-0 items-center justify-center bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Recolher currículo" : "Expandir currículo"}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
