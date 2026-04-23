interface SearchBarProps {
  locationValue: string;
  queryValue: string;
  onLocationChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}

export function SearchBar({ locationValue, queryValue, onLocationChange, onQueryChange }: SearchBarProps) {
  return (
    <div className="grid gap-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_auto]">
      <label className="grid gap-1 rounded-2xl border border-black/8 bg-white px-3 py-2.5 transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/48">Onde voce esta</span>
        <input
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
          type="search"
          value={locationValue}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Bairro, regiao ou cidade"
        />
      </label>

      <label className="grid gap-1 rounded-2xl border border-black/8 bg-white px-3 py-2.5 transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/48">O que voce procura</span>
        <input
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
          type="search"
          value={queryValue}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Nome, categoria ou especialidade"
        />
      </label>

      <button
        type="button"
        className="inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16202d] md:min-w-[170px]"
      >
        Buscar negocios
      </button>
    </div>
  );
}
