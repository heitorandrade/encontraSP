import Link from "next/link";

import { EntrepreneurSummary } from "@/types/entrepreneur";

import { Tag } from "./Tag";

interface EntrepreneurCardProps {
  entrepreneur: EntrepreneurSummary;
}

export function EntrepreneurCard({ entrepreneur }: EntrepreneurCardProps) {
  return (
    <Link
      href={`/empreendedor/${entrepreneur.id}`}
      className="group block overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-soft"
    >
      <article>
        <div className="aspect-square overflow-hidden bg-[#e5e7eb]">
          <img
            src={entrepreneur.image}
            alt={`Capa do negocio ${entrepreneur.name}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="space-y-2.5 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-ink/38">
                {entrepreneur.category} · {entrepreneur.region}
              </p>
              <h2 className="mt-1 text-[14px] font-semibold leading-5 tracking-tight text-ink">{entrepreneur.name}</h2>
            </div>
            <span className="shrink-0 text-[10px] text-ink/38">{entrepreneur.distanceKm} km</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {entrepreneur.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#e5e7eb] pt-2.5">
            <span className="text-[10px] text-ink/38">Acessar perfil</span>
            <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-[10px] font-semibold text-[#3157d5] transition hover:bg-[#dcebff]">
              Ver perfil
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
