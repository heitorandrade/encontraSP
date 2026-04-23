import Link from "next/link";

import { Entrepreneur } from "@/types/entrepreneur";

import { Tag } from "./Tag";

interface EntrepreneurCardProps {
  entrepreneur: Entrepreneur;
}

export function EntrepreneurCard({ entrepreneur }: EntrepreneurCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      <Link className="block" href={`/empreendedor/${entrepreneur.id}`}>
        <div className="aspect-square overflow-hidden bg-[#f3f3f3]">
          <img
            src={entrepreneur.image}
            alt={`Capa do negocio ${entrepreneur.name}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#f4f4f4] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/72">
              {entrepreneur.category}
            </span>
            <span className="text-xs text-ink/55">
              {entrepreneur.region} · {entrepreneur.distanceKm} km
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold leading-6 tracking-tight text-ink">{entrepreneur.name}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-ink/68">{entrepreneur.shortDescription}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {entrepreneur.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/8 pt-3">
          <span className="text-xs text-ink/55">Perfil e contato</span>
          <Link
            href={`/empreendedor/${entrepreneur.id}`}
            className="rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:bg-spruce"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </article>
  );
}
