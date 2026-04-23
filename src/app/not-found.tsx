import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="rounded-full border border-spruce/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-spruce shadow-soft">
        Perfil indisponivel
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">O negocio solicitado nao foi encontrado.</h1>
      <p className="max-w-xl text-base leading-7 text-ink/68">
        Volte para o catalogo principal para continuar explorando empresas cadastradas nesta fase do MVP.
      </p>
      <Link href="/" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">
        Ir para a home
      </Link>
    </main>
  );
}
