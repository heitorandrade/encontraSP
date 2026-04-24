interface SearchBarProps {
  locationValue: string;
  queryValue: string;
  onLocationChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}

export function SearchBar({ locationValue, queryValue, onLocationChange, onQueryChange }: SearchBarProps) {
  return (
    <div className="grid gap-2 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_220px]">
      <label className="grid gap-1 rounded-[12px] border border-[#e5e7eb] bg-white px-3 py-2.5 transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
        <span className="text-[10px] font-medium text-ink/42">Onde voce esta</span>
        <input
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
          type="search"
          value={locationValue}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Bairro, regiao ou cidade"
        />
      </label>

      <label className="grid gap-1 rounded-[12px] border border-[#e5e7eb] bg-white px-3 py-2.5 transition focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
        <span className="text-[10px] font-medium text-ink/42">O que voce procura</span>
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
        className="inline-flex items-center justify-center rounded-[12px] bg-ink px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#16202d] lg:min-w-[170px]"
      >
        Buscar negocios
      </button>
    </div>
  );
}
