"use client";

import { useState } from "react";

import { EntrepreneurCard } from "@/components/EntrepreneurCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { entrepreneurs } from "@/data/entrepreneurs";

const categories = [...new Set(entrepreneurs.map((item) => item.category))];
const regions = [...new Set(entrepreneurs.map((item) => item.region))];
const tags = [...new Set(entrepreneurs.flatMap((item) => item.tags))];

export default function HomePage() {
  const [isLocalized, setIsLocalized] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [locationSearch, setLocationSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");

  const normalizedLocationSearch = locationSearch.trim().toLowerCase();
  const normalizedQuerySearch = querySearch.trim().toLowerCase();

  const clearAllFilters = () => {
    setIsLocalized(false);
    setSelectedDistance(5);
    setLocationSearch("");
    setQuerySearch("");
    setSelectedCategory("");
    setSelectedRegion("");
    setSelectedTag("");
    setSortOrder("name-asc");
  };

  const visibleEntrepreneurs = [...entrepreneurs]
    .filter((entrepreneur) => {
      if (isLocalized && entrepreneur.distanceKm > selectedDistance) {
        return false;
      }

      if (selectedCategory && entrepreneur.category !== selectedCategory) {
        return false;
      }

      if (selectedRegion && entrepreneur.region !== selectedRegion) {
        return false;
      }

      if (selectedTag && !entrepreneur.tags.some((tag) => tag === selectedTag)) {
        return false;
      }

      if (normalizedLocationSearch) {
        const locationContent = [entrepreneur.region, entrepreneur.address].join(" ").toLowerCase();

        if (!locationContent.includes(normalizedLocationSearch)) {
          return false;
        }
      }

      if (!normalizedQuerySearch) {
        return true;
      }

      const intentContent = [
        entrepreneur.name,
        entrepreneur.category,
        entrepreneur.shortDescription,
        ...entrepreneur.tags
      ]
        .join(" ")
        .toLowerCase();

      return intentContent.includes(normalizedQuerySearch);
    })
    .sort((left, right) => {
      if (sortOrder === "name-desc") {
        return right.name.localeCompare(left.name, "pt-BR");
      }

      if (sortOrder === "category-asc") {
        return left.category.localeCompare(right.category, "pt-BR") || left.name.localeCompare(right.name, "pt-BR");
      }

      return left.name.localeCompare(right.name, "pt-BR");
    });

  return (
    <main className="bg-white pb-16">
      <section className="bg-[#fafafa]">
        <div className="mx-auto flex max-w-[1580px] items-center justify-between gap-3 px-2 py-3 sm:px-2.5 lg:px-3">
          <div className="flex flex-wrap items-center gap-2 text-ink/68">
            <span className="font-semibold uppercase tracking-[0.18em] text-ink">Encontra SP</span>
            <span className="hidden sm:inline">catalogo de negocios locais</span>
          </div>
          <div className="flex items-center gap-3 text-ink/56">
            <span>{visibleEntrepreneurs.length} negocios ativos</span>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1580px] flex-col gap-3 px-2 py-4 sm:px-2.5 lg:px-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink/55">
              <span>Brasil</span>
              <span>/</span>
              <span className="font-semibold text-ink">Sao Paulo</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Negocios cadastrados para descoberta em Sao Paulo
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-ink/68">
              Navegue por categorias, bairros e especialidades com uma leitura direta de catalogo e acesso rapido ao
              perfil de cada empresa.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                selectedCategory === ""
                  ? "border-sky-300 bg-sky-100 text-sky-900"
                  : "border-black/12 bg-white text-ink/72 hover:border-sky-200"
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory((current) => (current === category ? "" : category))}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  selectedCategory === category
                    ? "border-sky-300 bg-sky-100 text-sky-900"
                    : "border-black/12 bg-white text-ink/72 hover:border-sky-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1580px] flex-col gap-5 px-2 py-4 sm:px-2.5 lg:px-3">
        <div className="grid gap-2 rounded-2xl bg-[#fafafa] p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/68">Busca e filtros</p>
            <div className="flex items-center gap-3">
              <p className="text-xs text-ink/50">
                {isLocalized ? `me localize · ${selectedDistance >= 999 ? "10+ km" : `${selectedDistance} km`}` : "catalogo responsivo"}
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink/72 transition hover:border-sky-200 hover:text-sky-900"
              >
                Limpar tudo
              </button>
            </div>
          </div>

          <SearchBar
            locationValue={locationSearch}
            queryValue={querySearch}
            onLocationChange={setLocationSearch}
            onQueryChange={setQuerySearch}
          />
          <FilterBar
            isLocalized={isLocalized}
            selectedDistance={selectedDistance}
            categories={categories}
            regions={regions}
            tags={tags}
            selectedCategory={selectedCategory}
            selectedRegion={selectedRegion}
            selectedTag={selectedTag}
            sortOrder={sortOrder}
            onToggleLocalized={() => {
              setIsLocalized((current) => {
                const nextValue = !current;
                if (!nextValue) {
                  setSelectedDistance(5);
                }
                return nextValue;
              });
            }}
            onDistanceChange={setSelectedDistance}
            onCategoryChange={setSelectedCategory}
            onRegionChange={setSelectedRegion}
            onTagChange={setSelectedTag}
            onSortOrderChange={setSortOrder}
          />
        </div>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4 pb-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">Listagem</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Empresas em destaque na busca</h2>
            </div>
            <p className="text-sm text-ink/60">{visibleEntrepreneurs.length} itens</p>
          </div>

          {visibleEntrepreneurs.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {visibleEntrepreneurs.map((entrepreneur) => (
                <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/15 bg-[#fafafa] px-6 py-12 text-center">
              <p className="text-lg font-semibold text-ink">Nenhum negocio encontrado.</p>
              <p className="mt-3 text-sm leading-6 text-ink/65">
                Ajuste a busca, remova algum filtro ou troque a ordenacao para explorar outros perfis.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
