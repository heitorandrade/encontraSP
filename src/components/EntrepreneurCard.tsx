import Link from "next/link";

import { EntrepreneurSummary } from "@/types/entrepreneur";

import { Tag } from "./Tag";

interface EntrepreneurCardProps {
  entrepreneur: EntrepreneurSummary;
  isFeatured?: boolean;
}

export function EntrepreneurCard({ entrepreneur, isFeatured = false }: EntrepreneurCardProps) {
  return (
    <Link
      href={`/empreendedor/${entrepreneur.id}`}
      className={`group block h-full overflow-hidden rounded-[14px] border bg-white transition duration-300 hover:-translate-y-0.5 ${
        isFeatured
          ? "border-[#ddcfaa] bg-[linear-gradient(180deg,#fffdf7_0%,#fffaf0_100%)] shadow-[0_16px_38px_-30px_rgba(161,128,56,0.42)] hover:border-[#ceb67c] hover:shadow-[0_22px_44px_-28px_rgba(161,128,56,0.5)]"
          : "border-[#e5e7eb] hover:shadow-soft"
      }`}
    >
      <article
        className={`relative h-full ${isFeatured ? "grid grid-cols-1 transition-[grid-template-columns] duration-500 ease-out group-hover:grid-cols-[0.92fr_1.08fr]" : ""}`}
      >
        {isFeatured ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,rgba(226,205,147,0)_0%,rgba(226,205,147,0.9)_50%,rgba(226,205,147,0)_100%)] opacity-70 transition duration-500 group-hover:opacity-100" />
        ) : null}

        <div className={`relative overflow-hidden bg-[#e5e7eb] ${isFeatured ? "xl:min-h-[180px]" : "aspect-square"}`}>
          <img
            src={entrepreneur.image}
            alt={`Capa do negocio ${entrepreneur.name}`}
            className={`h-full w-full object-cover transition duration-500 ${
              isFeatured ? "group-hover:scale-[1.06]" : "group-hover:scale-[1.02]"
            }`}
          />

          {isFeatured ? (
            <>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0)_0%,rgba(17,24,39,0.16)_100%)]" />
              <div className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
              <div className="pointer-events-none absolute inset-y-0 left-[-30%] w-[34%] rotate-[14deg] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,244,214,0.38)_45%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-700 group-hover:left-[108%] group-hover:opacity-100" />
              <div className="absolute left-3 top-3 rounded-full border border-[#e2cf93] bg-[#fff7dc]/92 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b6a1d]">
                Destaque
              </div>
            </>
          ) : null}
        </div>

        <div className={`space-y-2.5 p-3 ${isFeatured ? "flex flex-col justify-between p-4" : ""}`}>
          <div className="space-y-2.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] text-ink/38">
                  {entrepreneur.category} · {entrepreneur.region}
                </p>
                <h2 className={`mt-1 font-semibold tracking-tight text-ink ${isFeatured ? "xl:text-[18px] xl:leading-6" : "text-[14px] leading-5"}`}>
                  {entrepreneur.name}
                </h2>
              </div>
              <span className="shrink-0 text-[10px] text-ink/38">{entrepreneur.distanceKm} km</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {entrepreneur.tags.slice(0, 2).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            {isFeatured ? (
              <div className="hidden space-y-1.5 xl:block">
                <p className="text-[11px] leading-4 text-ink/56">{entrepreneur.shortDescription}</p>
                <p className="text-[10px] text-ink/38">{entrepreneur.address}</p>
                <p className="text-[10px] text-ink/38">{entrepreneur.phone}</p>
              </div>
            ) : null}
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
