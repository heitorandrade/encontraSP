interface FilterBarProps {
  isLocalized: boolean;
  selectedDistance: number;
  categories: string[];
  regions: string[];
  tags: string[];
  selectedCategory: string;
  selectedRegion: string;
  selectedTag: string;
  sortOrder: string;
  onToggleLocalized: () => void;
  onDistanceChange: (value: number) => void;
  onCategoryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

const selectClassName =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100";

export function FilterBar({
  isLocalized,
  selectedDistance,
  categories,
  regions,
  tags,
  selectedCategory,
  selectedRegion,
  selectedTag,
  sortOrder,
  onToggleLocalized,
  onDistanceChange,
  onCategoryChange,
  onRegionChange,
  onTagChange,
  onSortOrderChange
}: FilterBarProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <button
        type="button"
        onClick={onToggleLocalized}
        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
          isLocalized ? "border-sky-300 bg-sky-100 text-sky-900" : "border-black/10 bg-white text-ink hover:border-sky-200"
        }`}
      >
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] opacity-70">Localizacao</span>
        <span className="mt-1 block font-medium">{isLocalized ? "Me localize ativado" : "Me localize"}</span>
      </button>

      <select
        aria-label="Filtrar por distancia"
        className={`${selectClassName} ${!isLocalized ? "cursor-not-allowed opacity-55" : ""}`}
        value={selectedDistance}
        disabled={!isLocalized}
        onChange={(event) => onDistanceChange(Number(event.target.value))}
      >
        <option value={1}>1 km</option>
        <option value={2}>2 km</option>
        <option value={3}>3 km</option>
        <option value={4}>4 km</option>
        <option value={5}>5 km</option>
        <option value={6}>6 km</option>
        <option value={7}>7 km</option>
        <option value={8}>8 km</option>
        <option value={9}>9 km</option>
        <option value={10}>10 km</option>
        <option value={999}>10+ km</option>
      </select>

      <select
        aria-label="Filtrar por categoria"
        className={selectClassName}
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por regiao"
        className={selectClassName}
        value={selectedRegion}
        onChange={(event) => onRegionChange(event.target.value)}
      >
        <option value="">Todas as regioes</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        aria-label="Filtrar por tag"
        className={selectClassName}
        value={selectedTag}
        onChange={(event) => onTagChange(event.target.value)}
      >
        <option value="">Todas as especialidades</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <select
        aria-label="Ordenar catalogo"
        className={selectClassName}
        value={sortOrder}
        onChange={(event) => onSortOrderChange(event.target.value)}
      >
        <option value="name-asc">Nome A-Z</option>
        <option value="name-desc">Nome Z-A</option>
        <option value="category-asc">Categoria A-Z</option>
      </select>
    </div>
  );
}
