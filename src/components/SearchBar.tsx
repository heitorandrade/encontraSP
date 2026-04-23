interface SearchBarProps {
  locationValue: string;
  queryValue: string;
  onLocationChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}

export function SearchBar({ locationValue, queryValue, onLocationChange, onQueryChange }: SearchBarProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.15fr)]">
      <label className="flex w-full items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">Onde voce esta?</span>
        <input
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
          type="search"
          value={locationValue}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Bairro, regiao ou cidade"
        />
      </label>

      <label className="flex w-full items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">O que voce procura?</span>
        <input
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
          type="search"
          value={queryValue}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Nome, categoria ou especialidade"
        />
      </label>
    </div>
  );
}
