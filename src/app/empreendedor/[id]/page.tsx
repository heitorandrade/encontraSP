import Link from "next/link";
import { notFound } from "next/navigation";

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
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Link href="/" className="inline-flex w-fit rounded-full border border-spruce/15 bg-white px-4 py-2 text-sm text-ink shadow-soft">
        Voltar ao catalogo
      </Link>

      <section className="grid gap-6 overflow-hidden rounded-[32px] border border-spruce/15 bg-white shadow-soft lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <div className="aspect-square bg-sand/40">
          <img src={entrepreneur.image} alt={`Imagem do negocio ${entrepreneur.name}`} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-spruce">
                {entrepreneur.category}
              </span>
              <span className="text-sm text-ink/55">{entrepreneur.region}</span>
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{entrepreneur.name}</h1>
              <p className="mt-3 text-base leading-7 text-ink/72">{entrepreneur.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {entrepreneur.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <dl className="grid gap-4 rounded-[28px] bg-mist/70 p-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-spruce/75">Endereco base</dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{entrepreneur.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-spruce/75">Contato</dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{entrepreneur.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-spruce/75">Distancia mockada</dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{entrepreneur.distanceKm} km</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={entrepreneur.contactUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-spruce"
            >
              Abrir contato externo
            </a>
            <Link
              href="/"
              className="inline-flex justify-center rounded-full border border-spruce/15 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-spruce/35"
            >
              Continuar explorando
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
