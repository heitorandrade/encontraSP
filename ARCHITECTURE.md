# ARCHITECTURE — Encontra SP (MVP)

## Estrutura do Projeto

```text
src/
  app/
    page.tsx
    not-found.tsx
    globals.css
    layout.tsx
    empreendedor/
      [id]/
        page.tsx
  components/
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

- page.tsx → página principal (catálogo)
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

---

### data/
Dados mockados utilizados no MVP.

- `entrepreneur-summaries.ts` abastece a home com uma versao mais leve dos cards
- `entrepreneurs.ts` deriva os dados completos do perfil a partir dos summaries

---

### types/
Definição de tipos TypeScript para os dados.

- `Entrepreneur` centraliza o shape consumido pela home, card e perfil
- `EntrepreneurSummary` reduz o payload inicial da home

---

## Fluxo Atual

- `app/page.tsx` consome `data/entrepreneur-summaries.ts`
- a home deriva opções de filtro a partir dos mocks
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

- home e perfil seguem o `encontra_sp_frames_v2.pen` como referencia visual principal
- o header cinza metalico e a hierarquia desktop/mobile ja foram refletidos no codigo
- o perfil prioriza servicos, com hero horizontal mais contextual
