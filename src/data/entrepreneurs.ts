import { Entrepreneur } from "@/types/entrepreneur";

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

export const entrepreneurs: Entrepreneur[] = [
  {
    id: "atelier-norte",
    name: "Atelier Norte Design",
    category: "Criativo",
    region: "Pinheiros",
    distanceKm: 1,
    image: createSquarePlaceholder("Atelier Norte", "#365a61", "#c8744e"),
    shortDescription: "Identidade visual, embalagens e materiais comerciais para pequenos negocios.",
    description:
      "Estudio criativo focado em marcas locais que precisam estruturar presenca visual com clareza, consistencia e entregas praticas para o dia a dia do negocio.",
    tags: ["B2B", "Sob demanda", "Atendimento remoto"],
    contactUrl: "https://wa.me/5511999990001",
    address: "Pinheiros, Sao Paulo - SP",
    phone: "(11) 99999-0001"
  },
  {
    id: "rota-clara-consultoria",
    name: "Rota Clara Consultoria",
    category: "Consultoria",
    region: "Vila Mariana",
    distanceKm: 3,
    image: createSquarePlaceholder("Rota Clara", "#597165", "#dba46a"),
    shortDescription: "Apoio operacional e planejamento comercial para negocios em fase de estrutura.",
    description:
      "Consultoria de processos e crescimento para empreendedores que precisam organizar operacao, proposta comercial e rotina de acompanhamento de resultados.",
    tags: ["B2B", "Empresa verificada", "Agenda rapida"],
    contactUrl: "https://wa.me/5511999990002",
    address: "Vila Mariana, Sao Paulo - SP",
    phone: "(11) 99999-0002"
  },
  {
    id: "casa-raiz-catering",
    name: "Casa Raiz Catering",
    category: "Alimentacao",
    region: "Moema",
    distanceKm: 5,
    image: createSquarePlaceholder("Casa Raiz", "#6e7f54", "#ca8459"),
    shortDescription: "Buffet corporativo e coffee breaks sob medida para eventos e reunioes.",
    description:
      "Operacao de alimentacao para empresas, workshops e encontros profissionais, com opcoes flexiveis para diferentes portes de evento e restricoes alimentares.",
    tags: ["Entrega local", "Sob demanda", "Atendimento presencial"],
    contactUrl: "https://wa.me/5511999990003",
    address: "Moema, Sao Paulo - SP",
    phone: "(11) 99999-0003"
  },
  {
    id: "clinica-eixo-bem-estar",
    name: "Clinica Eixo Bem-Estar",
    category: "Saude",
    region: "Santana",
    distanceKm: 10,
    image: createSquarePlaceholder("Eixo Bem-Estar", "#48757c", "#a5b87d"),
    shortDescription: "Atendimento multiprofissional com foco em rotina, ergonomia e saude ocupacional.",
    description:
      "Equipe voltada a atendimentos preventivos e consultivos para profissionais autonomos e pequenas equipes, com orientacao clara e linguagem acessivel.",
    tags: ["Agenda rapida", "Empresa verificada", "Atendimento presencial"],
    contactUrl: "https://wa.me/5511999990004",
    address: "Santana, Sao Paulo - SP",
    phone: "(11) 99999-0004"
  },
  {
    id: "nucleo-pixel-solucoes",
    name: "Nucleo Pixel Solucoes",
    category: "Tecnologia",
    region: "Bela Vista",
    distanceKm: 2,
    image: createSquarePlaceholder("Nucleo Pixel", "#2f4858", "#7f9c96"),
    shortDescription: "Sites institucionais, landing pages e suporte digital para empresas locais.",
    description:
      "Equipe enxuta de produto digital que cria presencas online objetivas para negocios que precisam captar contato e apresentar servicos com mais confianca.",
    tags: ["Atendimento remoto", "B2B", "Empresa verificada"],
    contactUrl: "https://wa.me/5511999990005",
    address: "Bela Vista, Sao Paulo - SP",
    phone: "(11) 99999-0005"
  },
  {
    id: "oficina-campo-vivo",
    name: "Oficina Campo Vivo",
    category: "Criativo",
    region: "Tatuape",
    distanceKm: 25,
    image: createSquarePlaceholder("Campo Vivo", "#5c4b51", "#c49762"),
    shortDescription: "Cenarios, producao de vitrines e ambientacoes para marcas e eventos.",
    description:
      "Oficina especializada em projetos cenograficos e ativacoes de marca que precisam de execucao artesanal com leitura comercial e acabamento consistente.",
    tags: ["Sob demanda", "Atendimento presencial", "B2B"],
    contactUrl: "https://wa.me/5511999990006",
    address: "Tatuape, Sao Paulo - SP",
    phone: "(11) 99999-0006"
  },
  {
    id: "estacao-ceres-saude",
    name: "Estacao Ceres Saude",
    category: "Saude",
    region: "Ipiranga",
    distanceKm: 6,
    image: createSquarePlaceholder("Estacao Ceres", "#647b92", "#d2a66f"),
    shortDescription: "Clinica de nutricao e acompanhamento preventivo para rotina profissional.",
    description:
      "Espaco de saude voltado ao acompanhamento continuo de alimentacao, energia e bem-estar para autonomos e pequenas equipes.",
    tags: ["Agenda rapida", "Atendimento presencial", "Empresa verificada"],
    contactUrl: "https://wa.me/5511999990007",
    address: "Ipiranga, Sao Paulo - SP",
    phone: "(11) 99999-0007"
  },
  {
    id: "bairro-base-tecnologia",
    name: "Bairro Base Tecnologia",
    category: "Tecnologia",
    region: "Butanta",
    distanceKm: 8,
    image: createSquarePlaceholder("Bairro Base", "#355c7d", "#74a7a8"),
    shortDescription: "Automacao de rotinas, sites e suporte de operacao digital para PME.",
    description:
      "Operacao enxuta de tecnologia para empresas que precisam ganhar organizacao comercial e presenca digital sem projetos longos.",
    tags: ["B2B", "Atendimento remoto", "Sob demanda"],
    contactUrl: "https://wa.me/5511999990008",
    address: "Butanta, Sao Paulo - SP",
    phone: "(11) 99999-0008"
  },
  {
    id: "muda-alimentos-corporativos",
    name: "Muda Alimentos Corporativos",
    category: "Alimentacao",
    region: "Lapa",
    distanceKm: 4,
    image: createSquarePlaceholder("Muda Alimentos", "#597a51", "#d68c61"),
    shortDescription: "Refeicoes e coffee stations para escritorios, treinamentos e encontros de marca.",
    description:
      "Fornecedor local de alimentacao para operacoes corporativas com foco em praticidade, apresentacao e montagem agil.",
    tags: ["Entrega local", "Sob demanda", "B2B"],
    contactUrl: "https://wa.me/5511999990009",
    address: "Lapa, Sao Paulo - SP",
    phone: "(11) 99999-0009"
  },
  {
    id: "traço-oficina-visual",
    name: "Traco Oficina Visual",
    category: "Criativo",
    region: "Jardins",
    distanceKm: 2,
    image: createSquarePlaceholder("Traco Oficina", "#425466", "#d9936b"),
    shortDescription: "Projetos editoriais, direcao de arte e criacao de materiais para marcas locais.",
    description:
      "Estudio de design focado em apresentacoes, campanhas e sistemas visuais de comunicacao para negocios em crescimento.",
    tags: ["B2B", "Atendimento remoto", "Empresa verificada"],
    contactUrl: "https://wa.me/5511999990010",
    address: "Jardins, Sao Paulo - SP",
    phone: "(11) 99999-0010"
  },
  {
    id: "vetor-claro-consultoria",
    name: "Vetor Claro Consultoria",
    category: "Consultoria",
    region: "Centro",
    distanceKm: 1,
    image: createSquarePlaceholder("Vetor Claro", "#4b6378", "#c9895d"),
    shortDescription: "Estrutura comercial e acompanhamento de metas para pequenos negocios.",
    description:
      "Consultoria de operacao e crescimento comercial para empreendedores que querem enxergar prioridades e melhorar execucao.",
    tags: ["B2B", "Agenda rapida", "Atendimento remoto"],
    contactUrl: "https://wa.me/5511999990011",
    address: "Centro, Sao Paulo - SP",
    phone: "(11) 99999-0011"
  },
  {
    id: "atelier-origem-eventos",
    name: "Atelier Origem Eventos",
    category: "Criativo",
    region: "Mooca",
    distanceKm: 7,
    image: createSquarePlaceholder("Atelier Origem", "#6a5a6f", "#d0a16c"),
    shortDescription: "Ambientacao, cenografia leve e materiais de presenca para eventos profissionais.",
    description:
      "Atelier especializado em detalhamento visual de eventos, vitrines e acoes de relacionamento de marca.",
    tags: ["Sob demanda", "Atendimento presencial", "B2B"],
    contactUrl: "https://wa.me/5511999990012",
    address: "Mooca, Sao Paulo - SP",
    phone: "(11) 99999-0012"
  },
  {
    id: "pulso-bem-estar",
    name: "Pulso Bem-Estar Integrado",
    category: "Saude",
    region: "Vila Madalena",
    distanceKm: 3,
    image: createSquarePlaceholder("Pulso Bem-Estar", "#4d7684", "#a5b56d"),
    shortDescription: "Atendimentos de fisioterapia, ergonomia e prevencao voltados ao dia a dia profissional.",
    description:
      "Clinica com abordagem integrada para saude funcional de profissionais autonomos e pequenas empresas.",
    tags: ["Atendimento presencial", "Empresa verificada", "Agenda rapida"],
    contactUrl: "https://wa.me/5511999990013",
    address: "Vila Madalena, Sao Paulo - SP",
    phone: "(11) 99999-0013"
  },
  {
    id: "nexo-apoio-digital",
    name: "Nexo Apoio Digital",
    category: "Tecnologia",
    region: "Santo Amaro",
    distanceKm: 9,
    image: createSquarePlaceholder("Nexo Apoio", "#304a63", "#7ea19b"),
    shortDescription: "Suporte web, manutencao de paginas e estrutura digital para prestadores de servico.",
    description:
      "Negocio local focado em manter sites, formularios e paginas comerciais funcionando com clareza e velocidade.",
    tags: ["Atendimento remoto", "B2B", "Sob demanda"],
    contactUrl: "https://wa.me/5511999990014",
    address: "Santo Amaro, Sao Paulo - SP",
    phone: "(11) 99999-0014"
  }
];
