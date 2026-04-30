import { EntrepreneurSummary } from "@/types/entrepreneur";

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
      <text x="300" y="220" fill="white" font-family="Georgia, serif" font-size="38" letter-spacing="1.5" text-anchor="middle">ENCONTRA SP</text>
      <text x="300" y="300" fill="white" font-family="Arial, sans-serif" font-size="54" font-weight="700" text-anchor="middle">${title}</text>
    </svg>
  `)}`;

const createSummary = (
  item: Omit<EntrepreneurSummary, "image"> & {
    accent: string;
    shade: string;
  }
): EntrepreneurSummary => ({
  id: item.id,
  name: item.name,
  category: item.category,
  region: item.region,
  distanceKm: item.distanceKm,
  image: createSquarePlaceholder(item.name, item.accent, item.shade),
  shortDescription: item.shortDescription,
  tags: item.tags,
  contactUrl: item.contactUrl,
  address: item.address,
  phone: item.phone
});

export const entrepreneurSummaries: EntrepreneurSummary[] = [
  createSummary({
    id: "atelier-norte",
    name: "Atelier Norte Design",
    category: "Criativo",
    region: "Pinheiros",
    distanceKm: 1,
    accent: "#365a61",
    shade: "#c8744e",
    shortDescription: "Identidade visual, embalagens e materiais comerciais para pequenos negocios.",
    tags: ["B2B", "Sob demanda", "Atendimento remoto"],
    contactUrl: "https://wa.me/5511999990001",
    address: "Rua Vupabussu, 211, Pinheiros, Sao Paulo - SP, 05429-040",
    phone: "(11) 99999-0001"
  }),
  createSummary({
    id: "rota-clara-consultoria",
    name: "Rota Clara Consultoria",
    category: "Consultoria",
    region: "Vila Mariana",
    distanceKm: 3,
    accent: "#597165",
    shade: "#dba46a",
    shortDescription: "Apoio operacional e planejamento comercial para negocios em fase de estrutura.",
    tags: ["B2B", "Empresa verificada", "Agenda rapida"],
    contactUrl: "https://wa.me/5511999990002",
    address: "Rua Joaquim Tavora, 580, Vila Mariana, Sao Paulo - SP, 04015-012",
    phone: "(11) 99999-0002"
  }),
  createSummary({
    id: "casa-raiz-catering",
    name: "Casa Raiz Catering",
    category: "Alimentacao",
    region: "Moema",
    distanceKm: 5,
    accent: "#6e7f54",
    shade: "#ca8459",
    shortDescription: "Buffet corporativo e coffee breaks sob medida para eventos e reunioes.",
    tags: ["Entrega local", "Sob demanda", "Atendimento presencial"],
    contactUrl: "https://wa.me/5511999990003",
    address: "Alameda dos Arapanes, 870, Moema, Sao Paulo - SP, 04524-001",
    phone: "(11) 99999-0003"
  }),
  createSummary({
    id: "clinica-eixo-bem-estar",
    name: "Clinica Eixo Bem-Estar",
    category: "Saude",
    region: "Santana",
    distanceKm: 10,
    accent: "#48757c",
    shade: "#a5b87d",
    shortDescription: "Atendimento multiprofissional com foco em rotina, ergonomia e saude ocupacional.",
    tags: ["Agenda rapida", "Empresa verificada", "Atendimento presencial"],
    contactUrl: "https://wa.me/5511999990004",
    address: "Rua Conselheiro Moreira de Barros, 540, Santana, Sao Paulo - SP, 02018-010",
    phone: "(11) 99999-0004"
  }),
  createSummary({
    id: "nucleo-pixel-solucoes",
    name: "Nucleo Pixel Solucoes",
    category: "Tecnologia",
    region: "Bela Vista",
    distanceKm: 2,
    accent: "#2f4858",
    shade: "#7f9c96",
    shortDescription: "Sites institucionais, landing pages e suporte digital para empresas locais.",
    tags: ["Atendimento remoto", "B2B", "Empresa verificada"],
    contactUrl: "https://wa.me/5511999990005",
    address: "Rua Major Diogo, 212, Bela Vista, Sao Paulo - SP, 01324-000",
    phone: "(11) 99999-0005"
  }),
  createSummary({
    id: "oficina-campo-vivo",
    name: "Oficina Campo Vivo",
    category: "Criativo",
    region: "Tatuape",
    distanceKm: 25,
    accent: "#5c4b51",
    shade: "#c49762",
    shortDescription: "Cenarios, producao de vitrines e ambientacoes para marcas e eventos.",
    tags: ["Sob demanda", "Atendimento presencial", "B2B"],
    contactUrl: "https://wa.me/5511999990006",
    address: "Rua Itapura, 1220, Tatuape, Sao Paulo - SP, 03310-000",
    phone: "(11) 99999-0006"
  }),
  createSummary({
    id: "estacao-ceres-saude",
    name: "Estacao Ceres Saude",
    category: "Saude",
    region: "Ipiranga",
    distanceKm: 6,
    accent: "#647b92",
    shade: "#d2a66f",
    shortDescription: "Clinica de nutricao e acompanhamento preventivo para rotina profissional.",
    tags: ["Agenda rapida", "Atendimento presencial", "Empresa verificada"],
    contactUrl: "https://wa.me/5511999990007",
    address: "Rua Bom Pastor, 1245, Ipiranga, Sao Paulo - SP, 04203-002",
    phone: "(11) 99999-0007"
  }),
  createSummary({
    id: "bairro-base-tecnologia",
    name: "Bairro Base Tecnologia",
    category: "Tecnologia",
    region: "Butanta",
    distanceKm: 8,
    accent: "#355c7d",
    shade: "#74a7a8",
    shortDescription: "Automacao de rotinas, sites e suporte de operacao digital para PME.",
    tags: ["B2B", "Atendimento remoto", "Sob demanda"],
    contactUrl: "https://wa.me/5511999990008",
    address: "Avenida Corifeu de Azevedo Marques, 3100, Butanta, Sao Paulo - SP, 05339-000",
    phone: "(11) 99999-0008"
  }),
  createSummary({
    id: "muda-alimentos-corporativos",
    name: "Muda Alimentos Corporativos",
    category: "Alimentacao",
    region: "Lapa",
    distanceKm: 4,
    accent: "#597a51",
    shade: "#d68c61",
    shortDescription: "Refeicoes e coffee stations para escritorios, treinamentos e encontros de marca.",
    tags: ["Entrega local", "Sob demanda", "B2B"],
    contactUrl: "https://wa.me/5511999990009",
    address: "Rua Clelia, 1680, Lapa, Sao Paulo - SP, 05042-001",
    phone: "(11) 99999-0009"
  }),
  createSummary({
    id: "traco-oficina-visual",
    name: "Traco Oficina Visual",
    category: "Criativo",
    region: "Jardins",
    distanceKm: 2,
    accent: "#425466",
    shade: "#d9936b",
    shortDescription: "Projetos editoriais, direcao de arte e criacao de materiais para marcas locais.",
    tags: ["B2B", "Atendimento remoto", "Empresa verificada"],
    contactUrl: "https://wa.me/5511999990010",
    address: "Rua Pamplona, 1098, Jardins, Sao Paulo - SP, 01405-002",
    phone: "(11) 99999-0010"
  }),
  createSummary({
    id: "vetor-claro-consultoria",
    name: "Vetor Claro Consultoria",
    category: "Consultoria",
    region: "Centro",
    distanceKm: 1,
    accent: "#4b6378",
    shade: "#c9895d",
    shortDescription: "Estrutura comercial e acompanhamento de metas para pequenos negocios.",
    tags: ["B2B", "Agenda rapida", "Atendimento remoto"],
    contactUrl: "https://wa.me/5511999990011",
    address: "Rua Xavier de Toledo, 188, Centro, Sao Paulo - SP, 01048-000",
    phone: "(11) 99999-0011"
  }),
  createSummary({
    id: "atelier-origem-eventos",
    name: "Atelier Origem Eventos",
    category: "Criativo",
    region: "Mooca",
    distanceKm: 7,
    accent: "#6a5a6f",
    shade: "#d0a16c",
    shortDescription: "Ambientacao, cenografia leve e materiais de presenca para eventos profissionais.",
    tags: ["Sob demanda", "Atendimento presencial", "B2B"],
    contactUrl: "https://wa.me/5511999990012",
    address: "Rua da Mooca, 2440, Mooca, Sao Paulo - SP, 03104-002",
    phone: "(11) 99999-0012"
  }),
  createSummary({
    id: "pulso-bem-estar",
    name: "Pulso Bem-Estar Integrado",
    category: "Saude",
    region: "Vila Madalena",
    distanceKm: 3,
    accent: "#4d7684",
    shade: "#a5b56d",
    shortDescription: "Atendimentos de fisioterapia, ergonomia e prevencao voltados ao dia a dia profissional.",
    tags: ["Atendimento presencial", "Empresa verificada", "Agenda rapida"],
    contactUrl: "https://wa.me/5511999990013",
    address: "Rua Harmonia, 924, Vila Madalena, Sao Paulo - SP, 05435-001",
    phone: "(11) 99999-0013"
  }),
  createSummary({
    id: "nexo-apoio-digital",
    name: "Nexo Apoio Digital",
    category: "Tecnologia",
    region: "Santo Amaro",
    distanceKm: 9,
    accent: "#304a63",
    shade: "#7ea19b",
    shortDescription: "Suporte web, manutencao de paginas e estrutura digital para prestadores de servico.",
    tags: ["Atendimento remoto", "B2B", "Sob demanda"],
    contactUrl: "https://wa.me/5511999990014",
    address: "Rua Verbo Divino, 1450, Santo Amaro, Sao Paulo - SP, 04719-002",
    phone: "(11) 99999-0014"
  })
];
