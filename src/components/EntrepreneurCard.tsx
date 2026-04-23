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
      className="group block overflow-hidden rounded-[18px] border border-black/8 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-soft"
    >
      <article>
        <div className="aspect-square overflow-hidden bg-[#eef0f3]">
          <img
            src={entrepreneur.image}
            alt={`Capa do negocio ${entrepreneur.name}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="space-y-3 p-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#f3f4f6] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/68">
                {entrepreneur.category}
              </span>
              <span className="text-[11px] text-ink/48">{entrepreneur.distanceKm} km</span>
            </div>

            <div>
              <h2 className="text-[15px] font-semibold leading-5 tracking-tight text-ink">{entrepreneur.name}</h2>
              <p className="mt-1 text-[12px] text-ink/52">{entrepreneur.region}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {entrepreneur.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-black/8 pt-2.5">
            <span className="text-[11px] text-ink/48">Acessar perfil</span>
            <span className="rounded-full bg-[#e9f2ff] px-3 py-1.5 text-[11px] font-semibold text-[#3157d5] transition hover:bg-[#dcebff]">
              Ver perfil
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
