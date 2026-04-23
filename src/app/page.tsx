"use client";

import { useState } from "react";

import { EntrepreneurCard } from "@/components/EntrepreneurCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { entrepreneurSummaries } from "@/data/entrepreneur-summaries";

const categories = [...new Set(entrepreneurSummaries.map((item) => item.category))];
const regions = [...new Set(entrepreneurSummaries.map((item) => item.region))];
const tags = [...new Set(entrepreneurSummaries.flatMap((item) => item.tags))];

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

  const visibleEntrepreneurs = [...entrepreneurSummaries]
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

      const intentContent = [entrepreneur.name, entrepreneur.category, entrepreneur.shortDescription, ...entrepreneur.tags]
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
    <main className="min-h-screen bg-white pb-14">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-5 lg:px-6">
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">Encontra SP</p>
            <p className="text-[11px] text-ink/42">Descoberta local</p>
          </div>
          <div className="hidden items-center gap-4 text-[11px] text-ink/44 md:flex">
            <span>catalogo</span>
            <span>mapa</span>
            <span>perfil</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-5 pt-4 sm:px-5 lg:px-6 lg:pt-5">
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-[#3157d5]">Descoberta local</p>
            <h1 className="max-w-3xl text-[28px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[34px]">
              Encontre negocios perto de voce
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-ink/56">
              Explore servicos cadastrados, refine por regiao e entenda rapidamente o que cada negocio oferece.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory((current) => (current === category ? "" : category))}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                  selectedCategory === category
                    ? "bg-[#e9f2ff] text-[#3157d5]"
                    : "bg-[#f4f5f7] text-ink/58 hover:bg-[#edf1f6]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 sm:px-5 lg:px-6">
        <div className="rounded-[22px] bg-[#fafafa] p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/48">Busca e filtros</p>
              <p className="mt-1 text-[11px] text-ink/42">
                {isLocalized ? `Me localize ativo · ${selectedDistance >= 999 ? "10+ km" : `${selectedDistance} km`}` : "catalogo responsivo"}
              </p>
            </div>
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded-full px-3 py-1.5 text-[11px] font-medium text-[#3157d5] transition hover:bg-[#edf5ff]"
            >
              Limpar tudo
            </button>
          </div>

          <div className="space-y-2.5">
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
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10 pt-6 sm:px-5 lg:px-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-[22px]">Negocios em destaque</h2>
            <p className="mt-1 text-[12px] text-ink/46">Leitura rapida para descoberta e acesso ao perfil</p>
          </div>
          <p className="text-[11px] text-ink/42">{visibleEntrepreneurs.length} resultados</p>
        </div>

        {visibleEntrepreneurs.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {visibleEntrepreneurs.map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] bg-[#fafafa] px-6 py-12 text-center">
            <p className="text-lg font-semibold text-ink">Nenhum negocio encontrado.</p>
            <p className="mt-2 text-sm leading-6 text-ink/56">Ajuste a busca ou remova filtros para explorar outros perfis.</p>
          </div>
        )}
      </section>
    </main>
  );
}
