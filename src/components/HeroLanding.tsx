"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import heroSlideOne from "../../images/generated-1777343740318.png";
import heroSlideTwo from "../../images/generated-1777343792457.png";
import heroSlideThree from "../../images/generated-1777343804708.png";

interface HeroSlide {
  image: StaticImageData;
  alt: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: heroSlideOne,
    alt: "Vista urbana de Sao Paulo ao entardecer com avenidas e edificios altos."
  },
  {
    image: heroSlideTwo,
    alt: "Rua movimentada com pedestres, faixa de onibus e fachadas comerciais em Sao Paulo."
  },
  {
    image: heroSlideThree,
    alt: "Avenida arborizada entre predios corporativos e fluxo local de carros e pessoas."
  }
];

const AUTOPLAY_MS = 4000;

export function HeroLanding() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeSlide, setActiveSlide] = useState(0);
  const [locationValue, setLocationValue] = useState("");

  const buttonLabel = isPending ? "Abrindo catalogo..." : "Buscar servicos";

  const exploreUrl = useMemo(() => {
    const params = new URLSearchParams();
    const trimmedLocation = locationValue.trim();

    if (trimmedLocation) {
      params.set("location", trimmedLocation);
    }

    const queryString = params.toString();
    return queryString ? `/explorar?${queryString}` : "/explorar";
  }, [locationValue]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const navigateToExplore = (targetUrl: string) => {
    startTransition(() => {
      router.push(targetUrl);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateToExplore(exploreUrl);
  };

  const handleUseMyLocation = () => {
    const params = new URLSearchParams();
    const trimmedLocation = locationValue.trim();

    if (trimmedLocation) {
      params.set("location", trimmedLocation);
    }

    params.set("localized", "1");

    navigateToExplore(`/explorar?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#f2f2ef] px-0 py-0 text-ink">
      <section className="mx-auto max-w-[1800px] px-0 md:px-6 md:py-6 xl:px-8 xl:py-8">
        <div className="overflow-hidden bg-white md:rounded-[22px] md:shadow-soft">
          <div className="flex items-center justify-between bg-[#7f858d] px-[14px] py-[10px] md:px-[18px] md:py-[10px]">
            <div className="space-y-[2px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white md:text-[18px]">Encontra SP</p>
              <p className="text-[10px] font-medium text-[#eef2f7]">catalogo profissional de negocios locais</p>
            </div>

            <div className="rounded-full bg-white/10 px-3 py-2">
              <p className="text-[10px] font-bold text-white md:text-[11px]">Descoberta local</p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex bg-[#f7f7f3] px-[22px] py-[26px] md:min-h-[648px] md:items-center md:px-[56px] md:py-[44px]">
              <div className="w-full max-w-[500px] space-y-4 md:space-y-[22px]">
                <div className="space-y-4 md:space-y-4">
                  <h1 className="text-[22px] font-semibold leading-[1.1] tracking-tight text-[#111827] md:text-[36px] md:font-bold">
                    Encontre Servicos e Produtos Perto de Voce em Sao Paulo.
                  </h1>
                  <p className="max-w-[500px] text-[13px] leading-5 text-[#6b7280] md:text-[15px] md:leading-6">
                    Descubra empreendedores e servicos proximos com base na sua localizacao.
                  </p>
                </div>

                <form className="space-y-[14px]" onSubmit={handleSubmit}>
                  <label className="block space-y-2">
                    <span className="block text-[13px] font-bold text-[#111827] md:text-[14px]">Onde voce esta?</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-[#d9dce2] bg-white px-[18px] py-4">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#3157d5]" aria-hidden />
                      <input
                        type="search"
                        value={locationValue}
                        onChange={(event) => setLocationValue(event.target.value)}
                        placeholder="Digite seu bairro ou CEP"
                        className="w-full bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af] md:text-[16px]"
                      />
                    </div>
                  </label>

                  <div className="flex flex-col gap-[10px] md:flex-row">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#111827] px-5 py-[14px] text-[14px] font-bold text-white transition hover:bg-[#19253a] disabled:cursor-wait disabled:opacity-85 md:min-w-[174px]"
                    >
                      {buttonLabel}
                    </button>
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      disabled={isPending}
                      className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#eef1f4] px-5 py-[14px] text-[14px] font-bold text-[#111827] transition hover:bg-[#e4e8ee] disabled:cursor-wait disabled:opacity-85"
                    >
                      Usar minha localizacao
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="relative min-h-[248px] overflow-hidden bg-white md:min-h-[648px]">
              {heroSlides.map((slide, index) => (
                <Image
                  key={slide.alt}
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#11182722]" />
              <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-transparent via-transparent to-[#11182718] md:block" />

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 md:bottom-12">
                {heroSlides.map((slide, index) => {
                  const isActive = activeSlide === index;
                  return (
                    <button
                      key={slide.alt}
                      type="button"
                      aria-label={`Ir para slide ${index + 1}`}
                      aria-pressed={isActive}
                      onClick={() => goToSlide(index)}
                      className={`h-[8px] w-[8px] rounded-full transition md:h-[9px] md:w-[9px] ${
                        isActive ? "bg-[#111827]" : "bg-white/85"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
