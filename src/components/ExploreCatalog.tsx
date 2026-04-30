"use client";

import Link from "next/link";
import { useState } from "react";

import { EntrepreneurCard } from "@/components/EntrepreneurCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { entrepreneurSummaries } from "@/data/entrepreneur-summaries";

const categories = [...new Set(entrepreneurSummaries.map((item) => item.category))];
const regions = [...new Set(entrepreneurSummaries.map((item) => item.region))];
const tags = [...new Set(entrepreneurSummaries.flatMap((item) => item.tags))];

interface ExploreCatalogProps {
  initialLocationSearch?: string;
  initialIsLocalized?: boolean;
}

export function ExploreCatalog({
  initialLocationSearch = "",
  initialIsLocalized = false
}: ExploreCatalogProps) {
  const [isLocalized, setIsLocalized] = useState(initialIsLocalized);
  const [selectedDistance, setSelectedDistance] = useState(5);
  const [locationSearch, setLocationSearch] = useState(initialLocationSearch);
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
  const featuredEntrepreneurs = visibleEntrepreneurs.slice(0, 4);
  const remainingEntrepreneurs = visibleEntrepreneurs.slice(4);

  const hasActiveFilters =
    selectedCategory !== "" ||
    selectedRegion !== "" ||
    selectedTag !== "" ||
    normalizedQuerySearch !== "" ||
    normalizedLocationSearch !== "" ||
    isLocalized;

  const showFeatured = !hasActiveFilters || visibleEntrepreneurs.length > 4;

  return (
    <main className="min-h-screen bg-white pb-14">
      <section className="bg-[#7f858d]">
        <div className="mx-auto flex max-w-[1440px] items-start justify-between px-3 py-2.5 sm:px-4 lg:px-[18px]">
          <div className="space-y-0.5">
            <Link href="/explorar" className="text-[17px] font-semibold uppercase tracking-[0.08em] text-white sm:text-[18px]">Encontra SP</Link>
            <p className="text-[10px] text-[#eef2f7]">catalogo profissional de negocios locais</p>
          </div>
          <div className="hidden items-center gap-4 pt-1 text-[10px] text-white/90 md:flex">
            <span>catalogo</span>
            <span>filtros</span>
            <span>perfis</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-3 pb-4 pt-4 sm:px-4 lg:px-[18px]">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-[#3157d5]">Descoberta local</p>
            <h1 className="max-w-3xl text-[28px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[36px]">
              Encontre negocios perto de voce
            </h1>
            <p className="max-w-3xl text-[13px] leading-5 text-ink/56">
              Wireframe de catalogo para busca por categoria, localizacao e especialidade, mantendo foco em decisao rapida e
              navegacao para o perfil.
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
                    ? "bg-[#eef2ff] text-[#3157d5]"
                    : "bg-[#f4f5f7] text-ink/58 hover:bg-[#edf1f6]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-[18px]">
        <div className="rounded-[18px] bg-[#fafafa] p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold text-ink/72">Busca e filtros</p>
            </div>
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded-full px-2 py-1 text-[11px] font-medium text-[#3157d5] transition hover:bg-[#edf5ff]"
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

      <section className="mx-auto max-w-[1440px] px-3 pb-10 pt-5 sm:px-4 lg:px-[18px]">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8d7441]">Listagem</p>
            <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-[26px]">Negocios em destaque</h2>
          </div>
          <p className="text-[11px] text-ink/42">{visibleEntrepreneurs.length} resultados</p>
        </div>

        {visibleEntrepreneurs.length > 0 ? (
          showFeatured ? (
            <>
              {featuredEntrepreneurs.length > 0 && (
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {featuredEntrepreneurs.map((entrepreneur) => (
                    <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} isFeatured />
                  ))}
                </div>
              )}
              {remainingEntrepreneurs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {remainingEntrepreneurs.map((entrepreneur) => (
                    <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {visibleEntrepreneurs.map((entrepreneur) => (
                <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
              ))}
            </div>
          )
        ) : (
          <div className="rounded-[22px] bg-[#fafafa] px-6 py-12 text-center">
            <p className="text-lg font-semibold text-ink">Nenhum negocio encontrado.</p>
            <p className="mt-2 text-sm leading-6 text-ink/56">Ajuste a busca ou remova filtros para explorar outros perfis.</p>
          </div>
        )}
        </section>    </main>
  );
}
