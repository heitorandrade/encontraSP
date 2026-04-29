import Link from "next/link";

import { EntrepreneurSummary } from "@/types/entrepreneur";

import { Tag } from "./Tag";

const featuredOfferingsByCategory = {
  Criativo: ["Identidade visual", "Materiais comerciais", "Ambientacao de marca"],
  Consultoria: ["Planejamento comercial", "Diagnostico operacional", "Acompanhamento mensal"],
  Alimentacao: ["Buffet corporativo", "Coffee break", "Estacao de snacks"],
  Saude: ["Atendimento preventivo", "Rotina de bem-estar", "Ergonomia aplicada"],
  Tecnologia: ["Landing pages", "Suporte digital", "Estrutura digital"]
} as const;

const featuredSignalsByCategory = {
  Criativo: [
    { label: "Entrega", value: "Sob demanda" },
    { label: "Modelo", value: "Projeto fechado" },
    { label: "Faixa", value: "a partir de R$ 420" }
  ],
  Consultoria: [
    { label: "Entrega", value: "Agenda rapida" },
    { label: "Modelo", value: "Sprint ou mensal" },
    { label: "Faixa", value: "a partir de R$ 380" }
  ],
  Alimentacao: [
    { label: "Entrega", value: "Operacao local" },
    { label: "Modelo", value: "Evento sob medida" },
    { label: "Faixa", value: "a partir de R$ 34" }
  ],
  Saude: [
    { label: "Entrega", value: "Presencial agil" },
    { label: "Modelo", value: "Sessao ou plano" },
    { label: "Faixa", value: "a partir de R$ 180" }
  ],
  Tecnologia: [
    { label: "Entrega", value: "Remoto ou hibrido" },
    { label: "Modelo", value: "Setup e suporte" },
    { label: "Faixa", value: "a partir de R$ 320" }
  ]
} as const;

interface EntrepreneurCardProps {
  entrepreneur: EntrepreneurSummary;
  isFeatured?: boolean;
}

export function EntrepreneurCard({ entrepreneur, isFeatured = false }: EntrepreneurCardProps) {
  const featuredOfferings = featuredOfferingsByCategory[entrepreneur.category];
  const featuredSignals = featuredSignalsByCategory[entrepreneur.category];

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
        className={`relative h-full ${isFeatured ? "xl:grid xl:grid-cols-1 xl:transition-[grid-template-columns] xl:duration-500 xl:ease-out xl:group-hover:grid-cols-[0.92fr_1.08fr]" : ""}`}
      >
        {isFeatured ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,rgba(226,205,147,0)_0%,rgba(226,205,147,0.9)_50%,rgba(226,205,147,0)_100%)] opacity-70 transition duration-500 group-hover:opacity-100" />
        ) : null}

        <div className={`relative overflow-hidden bg-[#e5e7eb] ${isFeatured ? "xl:h-full xl:min-h-[280px]" : "aspect-square"}`}>
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
              <div className="pointer-events-none absolute inset-y-0 left-[-30%] w-[34%] rotate-[14deg] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,244,214,0.38)_45%,rgba(255,255,255,0)_100%)] opacity-0 transition-all duration-700 group-hover:left-[108%] group-hover:opacity-100" />
              <div className="absolute left-3 top-3 rounded-full border border-[#e2cf93] bg-[#fff7dc]/92 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b6a1d]">
                Destaque
              </div>
            </>
          ) : null}
        </div>

        <div className={`space-y-2.5 p-3 ${isFeatured ? "xl:flex xl:flex-col xl:justify-between xl:p-4" : ""}`}>
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

            {isFeatured ? (
              <div className="hidden space-y-2 xl:block">
                <p className="text-[12px] leading-5 text-ink/56">{entrepreneur.shortDescription}</p>
                <div className="grid grid-cols-3 gap-2">
                  {featuredSignals.map((signal) => (
                    <div
                      key={signal.label}
                      className="rounded-[12px] border border-[#efe3c4] bg-white/72 px-2.5 py-2 transition duration-300 group-hover:border-[#e5d29d] group-hover:bg-[#fffaf0]"
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9b7c38]">{signal.label}</p>
                      <p className="mt-1 text-[11px] font-medium leading-4 text-ink">{signal.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[12px] border border-[#eadcb7] bg-[#fffdf7] px-3 py-2 transition duration-300 group-hover:bg-[#fff9ec]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#967636]">Servicos e produtos</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {featuredOfferings.map((offering) => (
                      <span
                        key={offering}
                        className="rounded-full bg-[#f7efd8] px-2.5 py-1 text-[10px] font-medium text-[#6f5a26] transition duration-300 group-hover:bg-[#f2e4bc]"
                      >
                        {offering}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-4 text-[#6f6650]">Perfil com leitura rapida de oferta, faixa de entrada e acesso direto ao detalhe.</p>
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {entrepreneur.tags.slice(0, 2).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
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
