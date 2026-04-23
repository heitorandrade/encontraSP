import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import mapReference from "@/Maps_referencia.png";
import { Tag } from "@/components/Tag";
import { entrepreneurs } from "@/data/entrepreneurs";

interface EntrepreneurPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EntrepreneurPage({ params }: EntrepreneurPageProps) {
  const { id } = await params;
  const entrepreneur = entrepreneurs.find((item) => item.id === id);

  if (!entrepreneur) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-10">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 py-3 sm:px-4 lg:px-[18px]">
          <div className="space-y-0.5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink sm:text-[14px]">Encontra SP</p>
            <p className="text-[11px] text-ink/42">Perfil do negocio</p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium text-ink/58 transition hover:bg-[#f4f5f7] hover:text-ink"
          >
            <span className="text-base leading-none">×</span>
            Fechar
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-4 lg:px-[18px] lg:pt-5">
        <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[32px]">
              {entrepreneur.name}
            </h1>
            <p className="max-w-4xl text-sm leading-6 text-ink/56">{entrepreneur.description}</p>
          </div>

          <div className="aspect-[2.4/1] overflow-hidden rounded-[18px] bg-[#eef0f3] sm:aspect-[3.8/1]">
            <img
              src={entrepreneur.image}
              alt={`Imagem principal do negocio ${entrepreneur.name}`}
              className="h-full w-full object-cover"
            />
          </div>

          <section className="space-y-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-[24px]">Menu de servicos</h2>
                <p className="mt-1 text-[12px] text-ink/46">
                  Escolha uma solucao, entenda o foco da entrega e avance para contato.
                </p>
              </div>
              <span className="hidden text-[11px] text-ink/42 sm:inline">{entrepreneur.services.length} itens</span>
            </div>

            <div className="max-h-[680px] space-y-3 overflow-y-auto pr-1 sm:max-h-[560px]">
              {entrepreneur.services.map((service) => (
                <article
                  key={service.id}
                  className="grid gap-3 rounded-[18px] bg-[#fafafa] p-3 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
                >
                  <div className="aspect-square overflow-hidden rounded-[14px] bg-[#e8ebf0] sm:aspect-[1.12/1]">
                    <img src={service.image} alt={`Imagem do servico ${service.name}`} className="h-full w-full object-cover" />
                  </div>

                  <div className="min-w-0 space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-[16px] font-semibold leading-5 tracking-tight text-ink">{service.name}</h3>
                      <p className="text-sm leading-6 text-ink/56">{service.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Tag label={entrepreneur.category} />
                      {entrepreneur.tags.slice(0, 2).map((tag) => (
                        <Tag key={`${service.id}-${tag}`} label={tag} />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <p className="text-sm font-semibold text-[#3157d5]">{service.price}</p>
                    <a
                      href={entrepreneur.contactUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#e9f2ff] px-3 py-1.5 text-[11px] font-semibold text-[#3157d5] transition hover:bg-[#dcebff]"
                    >
                      Reservar
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-ink sm:text-base">Localizacao / Mapa Google</h2>
                <p className="mt-1 text-[12px] text-ink/46">Espaco reservado para mapa, rota e chamada de localizacao.</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entrepreneur.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-medium text-[#3157d5]"
              >
                Me localizar
              </a>
            </div>

            <div className="overflow-hidden rounded-[18px] bg-[#eef0f3]">
              <Image
                src={mapReference}
                alt="Referencia visual de localizacao do mapa"
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 100vw, 1200px"
                priority={false}
              />
            </div>
          </section>

          <section className="rounded-[18px] bg-[#fafafa] px-4 py-4">
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="space-y-2">
                <h2 className="text-sm font-semibold tracking-tight text-ink">Contatos</h2>
                <div className="space-y-1 text-sm leading-6 text-ink/58">
                  <p>{entrepreneur.phone}</p>
                  <p>{entrepreneur.contacts.email}</p>
                  <p>{entrepreneur.contacts.instagram}</p>
                  <p>{entrepreneur.contacts.website}</p>
                </div>
                <a
                  href={entrepreneur.contacts.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-[#e8f7ea] px-3 py-1.5 text-[11px] font-semibold text-[#2b8a47]"
                >
                  Entrar em contato por WhatsApp
                </a>
              </div>

              <div className="space-y-2">
                <h2 className="text-sm font-semibold tracking-tight text-ink">Endereco</h2>
                <p className="text-sm leading-6 text-ink/58">{entrepreneur.address}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
