# STUDY.md

## Sumário

1. [Propósito deste guia](#propósito-deste-guia)
2. [Visão geral do sistema](#visão-geral-do-sistema)
3. [Mapa principal de pastas](#mapa-principal-de-pastas)
4. [O fluxo completo da aplicação](#o-fluxo-completo-da-aplicação)
5. [Rotas e “caminhos da API”](#rotas-e-caminhos-da-api)
6. [Tipos TypeScript: a base conceitual do projeto](#tipos-typescript-a-base-conceitual-do-projeto)
7. [Pasta `src/data`: dados e transformação](#pasta-srcdata-dados-e-transformação)
8. [`src/app/page.tsx`: estudo aprofundado da home](#srcapppagetsx-estudo-aprofundado-da-home)
9. [`src/app/empreendedor/[id]/page.tsx`: estudo aprofundado do perfil](#srcappempreendedoridpagetsx-estudo-aprofundado-do-perfil)
10. [Componentes e props: por que foram criados assim](#componentes-e-props-por-que-foram-criados-assim)
11. [Classes do Tailwind: como ler e por que elas foram usadas](#classes-do-tailwind-como-ler-e-por-que-elas-foram-usadas)
12. [Objetos importantes no código](#objetos-importantes-no-código)
13. [Variáveis importantes e por que elas existem](#variáveis-importantes-e-por-que-elas-existem)
14. [Por que não existem classes TypeScript](#por-que-não-existem-classes-typescript)
15. [Leitura comentada da home](#leitura-comentada-da-home)
16. [Leitura comentada do perfil](#leitura-comentada-do-perfil)
17. [O que foi simples de propósito](#o-que-foi-simples-de-propósito)
18. [O que eu estudaria primeiro, como aluno](#o-que-eu-estudaria-primeiro-como-aluno)
19. [Resumo didático final](#resumo-didático-final)

## Propósito deste guia

Este arquivo é um guia de estudo aprofundado do projeto `encontraSP`.

Ele foi escrito para alguém que não quer apenas “saber onde estão os arquivos”, mas entender:

- por que a estrutura foi montada desse jeito
- como os dados circulam pela aplicação
- como o TypeScript foi usado
- por que existem certos estados, props e objetos
- como as classes do Tailwind ajudam a construir a interface
- como as rotas funcionam
- onde o projeto ainda é simples de propósito

Sempre que possível, este guia aponta para os caminhos reais do diretório.

---

## Visão geral do sistema

O projeto é um front-end em `Next.js` com `App Router`, `TypeScript` e `Tailwind CSS`.

O sistema atual tem duas experiências principais:

1. a home, em [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)
2. o perfil do negócio, em [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)

Os dados são todos mockados e locais.

Não existe backend real, não existe banco e não existe API HTTP própria do projeto neste momento.

Isso é importante porque afeta toda a arquitetura:

- não há `fetch`
- não há rotas `/api`
- não há camada de serviços
- não há autenticação

Ou seja: o projeto é, hoje, uma aplicação de interface e navegação construída sobre dados locais.

---

## Mapa principal de pastas

Estrutura relevante:

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx              # landing hero
    not-found.tsx
    explorar/
      page.tsx            # catalogo com busca e filtros
    empreendedor/
      [id]/
        page.tsx          # perfil do negocio
  components/
    HeroLanding.tsx       # hero da landing com carrossel
    ExploreCatalog.tsx    # catalogo client-side
    SearchBar.tsx
    FilterBar.tsx
    EntrepreneurCard.tsx  # card com suporte a "isFeatured"
    Tag.tsx
  data/
    entrepreneur-summaries.ts
    entrepreneurs.ts
  types/
    entrepreneur.ts
  Maps_referencia.png

scripts/
  start-local.ps1
```

Modelo mental:

- `types` definem os contratos
- `data` cria e transforma os dados
- `components` desenham partes da interface
- `app` monta as páginas e a navegação

---

## O fluxo completo da aplicação

### Fluxo da landing → catálogo

O projeto tem duas experiências principais em sequência:

**1. Landing (`/`)**

Arquivo: [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)

Renderiza [src/components/HeroLanding.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/HeroLanding.tsx):

- carrossel automático de 3 imagens urbanas
- campo de busca por localização
- botões "Buscar serviços" e "Usar minha localização"
- ao submeter, navega para `/explorar` com parâmetros opcionais de localização

**2. Catálogo (`/explorar`)**

Arquivo: [src/app/explorar/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/explorar/page.tsx)

Renderiza [src/components/ExploreCatalog.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/ExploreCatalog.tsx):

1. importa `entrepreneurSummaries`
2. deriva listas auxiliares como categorias, regiões e tags
3. guarda o estado dos filtros com `useState`
4. filtra a lista com `filter`
5. ordena com `sort`
6. divide em `featuredEntrepreneurs` (4 primeiros) e `remainingEntrepreneurs`
7. detecta `hasActiveFilters` para decidir se exibe cards como destaque
8. renderiza grid(s) de `EntrepreneurCard` com ou sem `isFeatured`

### Cards em destaque

Os 4 primeiros resultados do catálogo são marcados com `isFeatured`:

- visual diferenciado (borda dourada, gradiente, badge "Destaque")
- altura reduzida em ~1/3 (sem o bloco extra de signals/offerings)
- no hover em telas `xl`: expande para 2 colunas (imagem + conteúdo lado a lado)
- quando filtros ativos e ≤ 4 resultados: os cards featured usam tamanho padrão

### Fluxo do perfil

Arquivo principal:

- [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)

Fluxo:

1. recebe o `id` vindo da rota
2. procura o empreendedor em `entrepreneurs`
3. se não achar, chama `notFound()`
4. se achar, renderiza o detalhe completo

---

## Rotas e “caminhos da API”

Como você pediu para aprofundar nos “caminhos da API”, aqui é importante fazer uma distinção técnica:

### O que o projeto tem hoje

Ele tem:

- rotas de página

Ele não tem:

- rotas de API

### Rotas de página atuais

- `/` -> [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)
- `/explorar` -> [src/app/explorar/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/explorar/page.tsx)
- `/empreendedor/[id]` -> [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)

Exemplo real:

```text
/empreendedor/clinica-eixo-bem-estar
```

### O que seria uma rota de API no Next

Se existisse, ela normalmente estaria em algo como:

- `src/app/api/.../route.ts`

Mas isso não existe no repositório atual.

### Por que isso importa?

Porque o projeto trabalha todo em memória local.

Então, quando você vê:

```ts
import { entrepreneurs } from "@/data/entrepreneurs";
```

isso significa:

- o dado está vindo de arquivo local
- não de uma chamada de rede

---

## Tipos TypeScript: a base conceitual do projeto

Arquivo principal:

- [src/types/entrepreneur.ts](C:/Users/Heitor/projetos/encontraSP/src/types/entrepreneur.ts)

Esse é um dos arquivos mais importantes para estudo.

Ele define os formatos de dados usados pelo sistema.

### `EntrepreneurCategory`

```ts
export type EntrepreneurCategory =
  | "Consultoria"
  | "Alimentacao"
  | "Saude"
  | "Tecnologia"
  | "Criativo";
```

Esse tipo é uma união de strings literais.

Por que isso foi escolhido?

- porque o conjunto de categorias é fechado
- porque ajuda o TypeScript a impedir valores inválidos
- porque melhora autocomplete e segurança

Se o projeto usasse apenas `string`, qualquer valor seria aceito.

Aqui, a escolha foi mais precisa.

### `EntrepreneurTag`

Mesma lógica das categorias:

- é um conjunto fechado
- melhora consistência

### `EntrepreneurService`

```ts
export interface EntrepreneurService {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}
```

Essa interface representa um item do menu de serviços do perfil.

Por que `price` é `string` e não `number`?

Porque o dado exibido já é textual:

- `"A partir de R$ 380"`
- `"A partir de R$ 34 por pessoa"`

Isso significa que o preço aqui é de apresentação, não de cálculo financeiro.

Se o projeto precisasse cálculo real, o ideal seria outro modelo.

### `Entrepreneur`

Essa é a estrutura completa do perfil.

Ela junta:

- dados básicos
- descrição longa
- contatos
- serviços

### `EntrepreneurSummary`

```ts
export type EntrepreneurSummary = Omit<Entrepreneur, "description" | "contacts" | "services">;
```

Essa linha é muito importante.

Ela diz:

- “quero um tipo igual a `Entrepreneur`, mas sem `description`, `contacts` e `services`”

Por que isso é uma boa escolha?

Porque evita duplicação.

Sem isso, você poderia criar outra interface quase igual, repetir tudo manualmente e aumentar o risco de inconsistência.

Essa escolha ensina um conceito muito importante do TypeScript:

- derivar tipos é melhor do que copiar estruturas quando os objetos têm relação forte entre si

---

## Pasta `src/data`: dados e transformação

### [src/data/entrepreneur-summaries.ts](C:/Users/Heitor/projetos/encontraSP/src/data/entrepreneur-summaries.ts)

Esse arquivo guarda a lista resumida da home.

Ele tem duas ideias importantes:

1. criar os objetos da listagem
2. gerar placeholders visuais inline

### A função `createSquarePlaceholder`

Ela retorna um SVG embutido como string.

Por que isso foi feito?

- para não depender de imagens reais
- para manter o projeto autônomo
- para garantir que cada card tenha uma imagem `1:1`

Isso é uma solução de MVP muito boa.

### A função `createSummary`

Ela recebe um objeto intermediário e devolve um `EntrepreneurSummary`.

Por que ela existe?

- para centralizar a lógica de montagem do resumo
- para não repetir a criação de `image`
- para manter a lista final mais limpa

Essa função também ensina algo útil:

- funções fábrica são boas quando muitos objetos compartilham estrutura parecida

### O array `entrepreneurSummaries`

Esse é o dado usado na home.

Cada item é um objeto literal com:

- `id`
- `name`
- `category`
- `region`
- `distanceKm`
- `accent`
- `shade`
- `shortDescription`
- `tags`
- `contactUrl`
- `address`
- `phone`

Note que `accent` e `shade` não existem no tipo final.

Eles são usados só durante a criação do placeholder.

Isso é interessante porque mostra:

- nem todo campo intermediário precisa sobreviver até o objeto final

### [src/data/entrepreneurs.ts](C:/Users/Heitor/projetos/encontraSP/src/data/entrepreneurs.ts)

Esse arquivo monta os dados completos do perfil.

Ele parte de `entrepreneurSummaries` e gera `entrepreneurs`.

Essa escolha é muito boa do ponto de vista de modelagem:

- a home usa um objeto enxuto
- o perfil usa um objeto enriquecido

### O objeto `serviceCatalogByCategory`

Esse é um `Record<EntrepreneurCategory, ...>`.

Por que isso é importante?

Porque vincula diretamente cada categoria a um catálogo de serviços.

Benefícios:

- garante que todas as categorias tenham catálogo
- evita `if` excessivo espalhado
- facilita manutenção

### O objeto `servicePaletteByCategory`

Ele define a paleta usada para os placeholders dos serviços.

Também é um `Record<EntrepreneurCategory, ...>`.

Essa escolha foi correta porque:

- mantém a relação categoria -> visual centralizada
- evita espalhar cores mágicas pelo arquivo

### A função `createServices`

Ela recebe:

- `ownerId`
- `category`

e retorna a lista final de serviços para o perfil.

Por que essa função existe?

- para gerar ids únicos por serviço
- para anexar a imagem mockada
- para reaproveitar o catálogo por categoria

Isso mostra uma boa prática:

- dados derivados devem ser montados por função quando existe regra repetitiva

### O array `entrepreneurs`

É o dado final do perfil.

Ele é criado com:

```ts
entrepreneurSummaries.map(...)
```

Ou seja:

- pega a base resumida
- adiciona campos extras
- gera a estrutura completa

Isso é simples e elegante.

---

## `src/app/page.tsx`: estudo aprofundado da home

Arquivo:

- [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)

### Por que ele começa com `"use client"`?

Porque usa:

- `useState`
- interação no navegador
- filtros client-side

Sem `"use client"`, o componente seria tratado como servidor no App Router e não poderia usar esse padrão.

### Constantes derivadas no topo

No topo do arquivo há:

```ts
const categories = [...new Set(...)]
const regions = [...new Set(...)]
const tags = [...new Set(...)]
```

Por que isso foi feito?

- porque as opções do filtro vêm dos próprios dados
- porque evita duplicar listas fixas
- porque mantém a interface coerente com o dataset atual

Isso também ensina:

- em vez de hardcode duplicado, derive o que puder da fonte real

### Estados da home

Os principais estados são:

- `isLocalized`
- `selectedDistance`
- `locationSearch`
- `querySearch`
- `selectedCategory`
- `selectedRegion`
- `selectedTag`
- `sortOrder`

Cada um representa um pedaço da UI.

Exemplo didático:

- `locationSearch` representa o valor digitado no campo “Onde você está”
- `selectedCategory` representa o chip ou filtro ativo de categoria

Isso é importante porque React funciona muito bem quando:

- cada parte visível da interface tem um estado claro associado

### A função `clearAllFilters`

Ela reseta todos os estados de busca e filtro.

Por que ela está no arquivo da página e não dentro de `FilterBar.tsx`?

Porque a página é a dona do estado.

Essa escolha é correta.

### `normalizedLocationSearch` e `normalizedQuerySearch`

Essas variáveis existem para:

- remover espaços desnecessários com `trim()`
- deixar a busca case-insensitive com `toLowerCase()`

Isso mostra uma boa prática:

- normalize os dados antes de comparar

### O array `visibleEntrepreneurs`

Esse é o coração da home.

Ele é criado com:

1. cópia da lista
2. `filter`
3. `sort`

#### Por que fazer `[...]` antes?

Porque `sort` muta o array original.

Então primeiro é feita uma cópia:

```ts
[...entrepreneurSummaries]
```

Isso é muito importante didaticamente.

Se você ordenar o array original sem copiar, pode causar efeitos colaterais ruins.

#### A ordem da lógica

Primeiro filtra, depois ordena.

Essa ordem é boa porque:

- reduz a lista antes da ordenação
- deixa a intenção do código mais clara

### Estrutura visual da home

O JSX da home foi dividido em blocos principais:

1. header metálico
2. bloco introdutório
3. chips rápidos
4. shell de busca e filtros
5. cabeçalho da listagem
6. grid de cards

Isso é importante porque mostra organização por seções de layout, não por “amontoado de divs”.

---

## `src/app/empreendedor/[id]/page.tsx`: estudo aprofundado do perfil

Arquivo:

- [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)

### Tipo de `params`

Hoje o componente foi escrito como:

```ts
interface EntrepreneurPageProps {
  params: Promise<{
    id: string;
  }>;
}
```

e depois:

```ts
const { id } = await params;
```

Do ponto de vista de estudo, vale notar:

- isso funciona no código atual
- mas conceitualmente, o importante é entender que o componente lê o `id` da rota

### Busca do empreendedor

```ts
const entrepreneur = entrepreneurs.find((item) => item.id === id);
```

Isso mostra uma estratégia simples:

- os dados estão todos em memória local
- então a busca é feita no próprio array

Se houvesse backend, isso provavelmente seria um `fetch`.

### `notFound()`

É uma utilidade do Next.js para renderizar a rota de fallback.

Lição:

- erro de dado inexistente também precisa de tratamento explícito

### Partes principais do perfil

#### Header

Renderiza:

- marca
- CTA `× Fechar`

#### Intro

Renderiza:

- nome
- descrição curta

#### Hero

Imagem horizontal contextual.

Importante:

- no desenho atual, ela é apoio visual
- não é o foco da página

#### Serviços

Essa é a seção principal.

Cada serviço é renderizado dentro de um `map`.

Cada card inclui:

- imagem
- nome
- descrição
- tags
- preço
- CTA

#### Localização

Usa [src/Maps_referencia.png](C:/Users/Heitor/projetos/encontraSP/src/Maps_referencia.png).

#### Rodapé informativo

Hoje mostra:

- contatos
- horário de funcionamento

### Por que o perfil está montado assim?

Porque a referência visual atual do Pencil coloca o foco em:

- menu de serviços
- localização
- contatos

e não em uma hero dominante.

---

## Componentes e props: por que foram criados assim

### [src/components/SearchBar.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/SearchBar.tsx)

Props:

- `locationValue`
- `queryValue`
- `onLocationChange`
- `onQueryChange`

Por que esse componente não usa `useState` interno?

Porque ele é controlado pela home.

Isso evita dois problemas:

1. estado duplicado
2. dificuldade de sincronização

### [src/components/FilterBar.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/FilterBar.tsx)

Esse componente recebe bastante coisa por props.

Isso pode parecer “muito”, mas aqui faz sentido porque:

- a home é a dona da lógica
- o filtro é só a interface dessa lógica

Esse é um caso em que muitas props não são necessariamente um problema.

### `selectClassName`

Dentro de `FilterBar.tsx`, existe a constante:

```ts
const selectClassName = "..."
```

Por que ela existe?

- para evitar repetição de classes utilitárias
- para manter consistência visual entre os `select`

Essa é uma pequena abstração, mas bem útil.

### [src/components/EntrepreneurCard.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/EntrepreneurCard.tsx)

Recebe:

- `entrepreneur: EntrepreneurSummary`

Isso é muito correto.

O card da home não deve depender do tipo completo do perfil.

Essa escolha reforça:

- separação entre resumo e detalhe

### [src/components/Tag.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/Tag.tsx)

É pequeno, mas expressa uma decisão boa:

- etiqueta repetida vira componente

Mesmo componente simples melhora:

- consistência
- manutenção
- clareza semântica

---

## Classes do Tailwind: como ler e por que elas foram usadas

O projeto usa muito Tailwind no JSX.

Exemplo comum:

```tsx
className="rounded-[18px] bg-[#fafafa] p-3 sm:p-4"
```

Vamos ler isso em partes:

- `rounded-[18px]`: borda arredondada de 18px
- `bg-[#fafafa]`: fundo personalizado
- `p-3`: padding geral menor
- `sm:p-4`: padding maior a partir do breakpoint `sm`

### Por que usar Tailwind aqui?

Porque neste projeto:

- o layout muda bastante
- o design foi iterado rápido
- o wireframe do Pencil serviu como guia visual

Tailwind ajuda justamente nesse cenário:

- mudanças rápidas
- classes perto do JSX
- responsividade explícita

### Como interpretar as classes responsivas

Exemplo:

```tsx
className="text-[26px] sm:text-[32px]"
```

Significa:

- no mobile: 26px
- a partir de `sm`: 32px

Isso mostra um padrão importante da base:

- a responsividade é construída por progressão
- não por folhas de estilo separadas

### Por que aparecem valores arbitrários como `[#7f858d]`?

Porque o projeto ainda não transformou toda a identidade visual em tokens semânticos.

Então, em alguns pontos, foram usados valores diretos.

Isso é aceitável em um MVP, desde que você saiba que depois pode querer sistematizar melhor.

---

## Objetos importantes no código

### Objetos de contato

Em [src/data/entrepreneurs.ts](C:/Users/Heitor/projetos/encontraSP/src/data/entrepreneurs.ts), cada `Entrepreneur` tem:

```ts
contacts: {
  whatsapp: string;
  email: string;
  instagram: string;
  website: string;
}
```

Por que esse agrupamento é bom?

Porque todos esses campos pertencem ao mesmo conceito:

- canais de contato

Se eles fossem espalhados no objeto raiz, o modelo ficaria mais desorganizado.

### Objetos de serviço

Cada serviço é um objeto com:

- `id`
- `name`
- `description`
- `price`
- `image`

Isso torna o `map` no perfil muito natural:

```ts
entrepreneur.services.map(...)
```

### Objetos de paleta e catálogo

Os objetos `serviceCatalogByCategory` e `servicePaletteByCategory` são importantes porque:

- concentram regra por categoria
- deixam a transformação dos dados mais declarativa

Essa é uma escolha melhor do que fazer vários `if/else` espalhados.

---

## Variáveis importantes e por que elas existem

### Na home

Arquivo:

- [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)

Variáveis importantes:

- `categories`
- `regions`
- `tags`
- `normalizedLocationSearch`
- `normalizedQuerySearch`
- `visibleEntrepreneurs`

#### Por que `categories`, `regions` e `tags` existem?

Porque a interface precisa dessas listas para renderizar opções.

#### Por que `normalized...` existe?

Porque comparar strings brutas costuma gerar resultados inconsistentes.

#### Por que `visibleEntrepreneurs` não está em `useState`?

Porque ele é derivado.

Essa é uma escolha importante.

Regra útil:

- não transforme tudo em estado
- se algo pode ser calculado a partir do estado atual, prefira derivar

### No perfil

Arquivo:

- [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)

Variáveis importantes:

- `id`
- `entrepreneur`

Elas são poucas porque a página é basicamente de leitura.

Isso também ensina algo:

- nem toda página precisa de muito estado

---

## Por que não existem classes TypeScript

Você mencionou “classes”.

É importante notar que o projeto praticamente não usa `class` do TypeScript/JavaScript.

Ele usa:

- funções
- objetos literais
- tipos e interfaces

Por que isso faz sentido?

Porque, em React moderno, para esse tipo de aplicação:

- funções costumam ser mais simples
- objetos são suficientes para representar dados
- classes trariam complexidade sem ganho real

Então a ausência de classes não é falta de sofisticação. É uma escolha adequada ao contexto.

---

## Leitura comentada da home

Arquivo principal:

- [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)

Aqui a proposta é ler a home como um professor lendo o arquivo com um aluno.

### Abertura do arquivo

O arquivo começa com:

```ts
"use client";
```

Isso é uma decisão importante.

Esse marcador existe porque a home usa:

- `useState`
- interação direta com filtros
- atualização imediata da interface no navegador

Sem isso, o componente seria tratado como servidor pelo App Router.

### Importações principais

Logo no início, a home importa:

- `useState`
- `EntrepreneurCard`
- `FilterBar`
- `SearchBar`
- `entrepreneurSummaries`

Esse conjunto já revela a arquitetura do arquivo:

- ele controla estado
- ele usa composição de componentes
- ele depende de dados locais resumidos

### Derivação de categorias, regiões e tags

Ainda fora do componente, aparecem as constantes:

```ts
const categories = [...new Set(...)]
const regions = [...new Set(...)]
const tags = [...new Set(...)]
```

Essa decisão é boa por três motivos:

1. evita hardcode duplicado
2. mantém a UI coerente com os dados
3. simplifica manutenção

Se amanhã os mocks mudarem, as opções dos filtros acompanham automaticamente.

### Estados da home

Dentro de `HomePage()`, os `useState` representam a memória da interface.

Exemplos:

- `querySearch`: texto digitado na busca principal
- `selectedRegion`: região escolhida
- `sortOrder`: ordem do catálogo

Isso é importante porque a tela não “adivinha” nada. Ela só responde ao estado atual.

### Normalização da busca

As variáveis:

```ts
const normalizedLocationSearch = locationSearch.trim().toLowerCase();
const normalizedQuerySearch = querySearch.trim().toLowerCase();
```

mostram uma decisão simples, mas correta:

- limpar e normalizar antes de comparar

Isso reduz bugs bobos de busca.

### `clearAllFilters`

Essa função reseta todos os filtros relevantes.

Ela foi colocada na página porque a página é a dona do estado.

Isso é importante didaticamente:

- quem controla o estado deve controlar o reset do estado

### `visibleEntrepreneurs`

Esse é o centro da lógica da home.

Ele:

1. copia a lista base
2. filtra
3. ordena

Ponto essencial:

```ts
[...entrepreneurSummaries]
```

Essa cópia existe porque `sort()` altera o array original.

Isso ensina uma regra valiosa:

- quando uma operação é mutável, tome cuidado com efeitos colaterais

### Parte visual da home

No JSX, a página é construída em blocos claros:

1. header metálico
2. introdução
3. chips
4. busca e filtros
5. seção da listagem
6. grid de cards

Essa leitura em blocos é exatamente o que você deve praticar ao estudar páginas React reais.

### Uso dos componentes filhos

Na home, dois filhos são importantes:

- [src/components/SearchBar.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/SearchBar.tsx)
- [src/components/FilterBar.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/FilterBar.tsx)

A página passa props para eles, mas continua controlando tudo.

Esse padrão é muito importante para projetos pequenos e médios:

- a página orquestra
- o componente apresenta

### Renderização da lista

O trecho:

```ts
visibleEntrepreneurs.map((entrepreneur) => (
  <EntrepreneurCard ... />
))
```

é a parte que fecha o ciclo da home.

O fluxo completo é:

- estado
- dados derivados
- renderização

Se você entender bem esse ponto, você entendeu a parte mais importante da home.

---

## Leitura comentada do perfil

Arquivo principal:

- [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)

Agora vamos ler a página de detalhe com a mesma lógica.

### Importações

O perfil importa:

- `Link`
- `notFound`
- `Image`
- `mapReference`
- `Tag`
- `entrepreneurs`

Isso já conta bastante sobre a página:

- ela navega
- pode falhar e cair em fallback
- usa imagem local otimizada
- consome dados completos

### Tipagem de `params`

A interface `EntrepreneurPageProps` documenta que a página espera um `id`.

Do ponto de vista didático, isso é importante porque:

- torna explícito o contrato da rota

### Busca do empreendedor

O trecho:

```ts
const entrepreneur = entrepreneurs.find((item) => item.id === id);
```

mostra que a resolução é local.

Não há API, nem request.

Essa simplicidade é boa para estudo porque deixa o foco no comportamento da página.

### Uso de `notFound()`

Se o item não existir, a página não tenta renderizar lixo.

Ela assume explicitamente:

- sem dado válido, sem página válida

Esse tipo de clareza é importante.

### Estrutura do perfil

A página foi dividida em blocos:

1. header com `× Fechar`
2. introdução
3. hero
4. serviços
5. mapa/localização
6. rodapé informativo

Essa ordem acompanha a hierarquia pensada no Pencil.

### Hero

O hero atual é horizontal e mais contido.

Ele existe para contextualizar visualmente, não para competir com os serviços.

Essa escolha é uma decisão de UX:

- o foco da página é o menu de serviços

### Lista de serviços

O `map` em `entrepreneur.services` gera os blocos repetidos do perfil.

Cada serviço inclui:

- imagem
- nome
- descrição
- tags
- preço
- CTA

Esse trecho é muito bom para estudo porque mostra:

- composição de lista detalhada
- grid responsivo
- uso combinado de dados do item e dados do empreendedor

### Mapa e endereço

O projeto usa:

- [src/Maps_referencia.png](C:/Users/Heitor/projetos/encontraSP/src/Maps_referencia.png)

com `next/image`.

Isso reforça que:

- o mapa ainda é um placeholder visual
- o endereço continua textual e explícito

### Rodapé com contatos e horário

No final, o perfil entrega a informação secundária.

Isso é importante:

- contatos e horário precisam existir
- mas não devem competir com a seção de serviços

Essa organização também conversa com a hierarquia do wireframe.

---

## O que foi simples de propósito

O projeto não tem:

- API
- backend real
- autenticação
- contexto global
- Redux/Zustand
- chamadas externas
- camadas de serviço

Isso foi uma decisão boa para o estágio atual.

Se alguém estiver aprendendo, isso ajuda porque:

- o domínio visual fica claro
- o caminho dos dados fica curto
- a leitura da base fica mais acessível

---

## O que eu estudaria primeiro, como aluno

Ordem recomendada:

1. [src/types/entrepreneur.ts](C:/Users/Heitor/projetos/encontraSP/src/types/entrepreneur.ts)
2. [src/data/entrepreneur-summaries.ts](C:/Users/Heitor/projetos/encontraSP/src/data/entrepreneur-summaries.ts)
3. [src/data/entrepreneurs.ts](C:/Users/Heitor/projetos/encontraSP/src/data/entrepreneurs.ts)
4. [src/components/Tag.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/Tag.tsx)
5. [src/components/EntrepreneurCard.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/EntrepreneurCard.tsx)
6. [src/components/HeroLanding.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/HeroLanding.tsx)
7. [src/components/SearchBar.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/SearchBar.tsx)
8. [src/components/FilterBar.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/FilterBar.tsx)
9. [src/components/ExploreCatalog.tsx](C:/Users/Heitor/projetos/encontraSP/src/components/ExploreCatalog.tsx)
10. [src/app/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/page.tsx)
11. [src/app/explorar/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/explorar/page.tsx)
12. [src/app/empreendedor/[id]/page.tsx](C:/Users/Heitor/projetos/encontraSP/src/app/empreendedor/[id]/page.tsx)
13. [scripts/start-local.ps1](C:/Users/Heitor/projetos/encontraSP/scripts/start-local.ps1)

Essa ordem ajuda porque vai:

- do contrato
- para o dado
- para o componente
- para a página
- para o fluxo de execução

---

## Resumo didático final

Se eu fosse resumir o projeto como professor:

> o `encontraSP` é uma base de front-end muito boa para estudo porque mostra como construir um MVP de catálogo e perfil usando Next.js, TypeScript e Tailwind sem exagerar na arquitetura.

Se eu fosse resumir o aprendizado principal:

> a grande lição desta base é que clareza estrutural vale mais do que complexidade artificial: tipos bem definidos, dados locais bem modelados, componentes com responsabilidade clara e páginas que coordenam a experiência do usuário.
