# ARCHITECTURE — Encontra SP (MVP)

## Estrutura do Projeto

```text
src/
  app/
    page.tsx
    explorar/
      page.tsx
    not-found.tsx
    globals.css
    layout.tsx
    empreendedor/
      [id]/
        page.tsx
  components/
    HeroLanding.tsx
    ExploreCatalog.tsx
    SearchBar.tsx
    FilterBar.tsx
    EntrepreneurCard.tsx
    Tag.tsx
  data/
    entrepreneur-summaries.ts
    entrepreneurs.ts
  types/
    entrepreneur.ts
  Maps_referencia.png
```


---

## Descrição

### app/
Responsável pelas rotas e páginas.

- page.tsx → landing inicial com hero
- explorar/page.tsx → catálogo principal
- empreendedor/[id]/page.tsx → página de perfil
- not-found.tsx → fallback de rota não encontrada
- layout.tsx → layout raiz e fontes globais
- globals.css → estilos globais da aplicação

---

### components/
Componentes reutilizáveis de interface.

- SearchBar → busca principal com localização + intenção
- FilterBar → filtros visíveis e ordenação da listagem
- EntrepreneurCard → card da listagem
- Tag → tags do card/perfil
- HeroLanding → hero inicial inspirado no Pencil com carrossel
- ExploreCatalog → implementação client-side do catálogo

---

### data/
Dados mockados utilizados no MVP.

- `entrepreneur-summaries.ts` abastece o catalogo com uma versao mais leve dos cards
- `entrepreneurs.ts` deriva os dados completos do perfil a partir dos summaries

---

### types/
Definição de tipos TypeScript para os dados.

- `Entrepreneur` centraliza o shape consumido pela landing, catalogo, card e perfil
- `EntrepreneurSummary` reduz o payload inicial do catalogo

---

## Fluxo Atual

- `app/page.tsx` renderiza a landing hero
- `app/explorar/page.tsx` consome `data/entrepreneur-summaries.ts`
- o catalogo deriva opções de filtro a partir dos mocks
- os componentes de interface recebem props simples
- o perfil em `empreendedor/[id]/page.tsx` resolve o item pelo `id` em `data/entrepreneurs.ts`
- o perfil usa `src/Maps_referencia.png` como imagem do bloco de localizacao

---

## Regra de Uso

Fluxo de dependência:

app → components → data / types

Não criar outras camadas neste momento.

Evitar:

- services
- stores globais
- hooks abstratos sem necessidade
- adapters ou presenters artificiais para este MVP

## Direção de UI atual

- landing, catalogo e perfil seguem o `encontra_sp_frames.pen` como referencia visual principal
- o header cinza metalico e a hierarquia desktop/mobile ja foram refletidos no codigo
- a landing prioriza descoberta local com hero e carrossel de imagens
- o perfil prioriza servicos, com hero horizontal mais contextual
