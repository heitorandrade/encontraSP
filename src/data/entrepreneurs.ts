import { entrepreneurSummaries } from "@/data/entrepreneur-summaries";
import { Entrepreneur, EntrepreneurCategory, EntrepreneurService } from "@/types/entrepreneur";

const createSquarePlaceholder = (title: string, accent: string, shade: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${shade}" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" rx="44" fill="url(#bg)" />
      <circle cx="455" cy="145" r="76" fill="rgba(255,255,255,0.18)" />
      <circle cx="160" cy="460" r="112" fill="rgba(255,255,255,0.12)" />
      <rect x="64" y="360" width="472" height="104" rx="20" fill="rgba(255,255,255,0.16)" />
      <text x="64" y="176" fill="white" font-family="Georgia, serif" font-size="38" letter-spacing="1.5">ENCONTRA SP</text>
      <text x="64" y="252" fill="white" font-family="Arial, sans-serif" font-size="54" font-weight="700">${title}</text>
    </svg>
  `)}`;

const serviceCatalogByCategory: Record<EntrepreneurCategory, Omit<EntrepreneurService, "image" | "id">[]> = {
  Criativo: [
    {
      name: "Direcao visual de campanha",
      description: "Conceito criativo, pecas principais e desdobramentos para lancamentos e materiais comerciais.",
      price: "A partir de R$ 650"
    },
    {
      name: "Kit institucional",
      description: "Apresentacao, papelaria digital e guia rapido de uso para operacao do negocio.",
      price: "A partir de R$ 420"
    },
    {
      name: "Ambientacao de vitrine",
      description: "Proposta visual com materiais, mockups e orientacao de montagem no ponto fisico.",
      price: "A partir de R$ 980"
    }
  ],
  Consultoria: [
    {
      name: "Diagnostico comercial",
      description: "Leitura da operacao atual com prioridades de oferta, rotina e canais de aquisicao.",
      price: "A partir de R$ 380"
    },
    {
      name: "Plano de organizacao",
      description: "Agenda objetiva com metas quinzenais, indicadores simples e frentes de execucao.",
      price: "A partir de R$ 540"
    },
    {
      name: "Acompanhamento mensal",
      description: "Ritmo consultivo para revisao de processos, funil e proximos ciclos de crescimento.",
      price: "A partir de R$ 890"
    }
  ],
  Alimentacao: [
    {
      name: "Coffee break executivo",
      description: "Menu compacto para reunioes, encontros internos e apresentacoes corporativas.",
      price: "A partir de R$ 34 por pessoa"
    },
    {
      name: "Buffet para workshop",
      description: "Montagem completa com opcoes quentes, frias e apoio basico para eventos de medio porte.",
      price: "A partir de R$ 68 por pessoa"
    },
    {
      name: "Estacao de snacks",
      description: "Solucao pratica para escritorios e ativacoes com entrega local e reposicao programada.",
      price: "A partir de R$ 420"
    }
  ],
  Saude: [
    {
      name: "Consulta funcional",
      description: "Atendimento inicial com escuta orientada e plano de cuidado enxuto para rotina profissional.",
      price: "A partir de R$ 180"
    },
    {
      name: "Ergonomia aplicada",
      description: "Avaliacao de postura, movimentos e ambiente para reduzir desconfortos do dia a dia.",
      price: "A partir de R$ 260"
    },
    {
      name: "Plano mensal de acompanhamento",
      description: "Rotina de encontros e revisoes para manter energia, prevencao e constancia.",
      price: "A partir de R$ 430"
    }
  ],
  Tecnologia: [
    {
      name: "Landing page de captacao",
      description: "Pagina objetiva para apresentar servicos, destacar prova social e receber contatos.",
      price: "A partir de R$ 720"
    },
    {
      name: "Suporte operacional web",
      description: "Ajustes recorrentes em paginas, formularios e fluxos digitais do negocio.",
      price: "A partir de R$ 320"
    },
    {
      name: "Estrutura digital inicial",
      description: "Setup leve com site institucional, canal de atendimento e base para campanhas.",
      price: "A partir de R$ 1.180"
    }
  ]
};

const servicePaletteByCategory: Record<EntrepreneurCategory, [string, string]> = {
  Criativo: ["#425466", "#d9936b"],
  Consultoria: ["#4b6378", "#c9895d"],
  Alimentacao: ["#597a51", "#d68c61"],
  Saude: ["#4d7684", "#a5b56d"],
  Tecnologia: ["#304a63", "#7ea19b"]
};

const createServices = (ownerId: string, category: EntrepreneurCategory) =>
  serviceCatalogByCategory[category].map((service, index) => {
    const [accent, shade] = servicePaletteByCategory[category];
    return {
      id: `${ownerId}-service-${index + 1}`,
      ...service,
      image: createSquarePlaceholder(service.name, accent, shade)
    };
  });

export const entrepreneurs: Entrepreneur[] = entrepreneurSummaries.map((summary) => ({
  ...summary,
  description:
    summary.category === "Saude"
      ? "Atendimento com abordagem objetiva, rotina clara e foco em constancia para a operacao diaria do negocio."
      : summary.category === "Tecnologia"
        ? "Estrutura digital enxuta para apresentar servicos, captar contatos e sustentar a presenca online com clareza."
        : summary.category === "Consultoria"
          ? "Operacao consultiva para organizar prioridades, proposta comercial e ritmo de crescimento com leitura pratica."
          : summary.category === "Alimentacao"
            ? "Entrega local pensada para operacoes profissionais, encontros de equipe e experiencias de marca com montagem agil."
            : "Trabalho criativo aplicado a marcas locais que precisam clareza visual, consistencia e materiais prontos para uso.",
  contacts: {
    whatsapp: summary.contactUrl,
    email: `contato@${summary.id}.com.br`,
    instagram: `@${summary.id.replace(/-/g, "")}`,
    website: `https://www.${summary.id}.com.br`
  },
  services: createServices(summary.id, summary.category)
}));
