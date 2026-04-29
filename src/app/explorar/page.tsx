import { ExploreCatalog } from "@/components/ExploreCatalog";

interface ExplorePageProps {
  searchParams?: Promise<{
    location?: string | string[];
    localized?: string | string[];
  }>;
}

const getFirstParamValue = (value?: string | string[]) => (Array.isArray(value) ? value[0] ?? "" : value ?? "");

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locationValue = getFirstParamValue(resolvedSearchParams?.location);
  const localizedValue = getFirstParamValue(resolvedSearchParams?.localized);

  return <ExploreCatalog initialLocationSearch={locationValue} initialIsLocalized={localizedValue === "1"} />;
}
