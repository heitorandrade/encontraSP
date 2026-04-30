# Encontra SP

Frontend MVP para descoberta de negocios cadastrados no Sebrae, com foco em landing inicial, catalogo, busca, filtros simples e pagina de perfil.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Estrutura

- `src/app`: rotas da landing, do catalogo e do perfil
- `src/components`: busca, filtros, cards e tags
- `src/data`: mocks da listagem leve e do perfil completo
- `src/types`: tipagens do dominio
- `scripts/start-local.ps1`: automacao local de build + restart + validacao
- `encontra_sp_frames.pen`: wireframes desktop e mobile
- `src/Maps_referencia.png`: imagem de referencia usada no bloco de localizacao do perfil

## Como rodar

Instale as dependencias:

```powershell
npm install
```

Para subir de forma automatizada:

```powershell
npm run start:local
```

Veja o guia completo em [START_LOCAL.md](./START_LOCAL.md).

## Documentação

- [START_LOCAL.md](./START_LOCAL.md) — guia rápido para subir o projeto localmente
- [STUDY.md](./STUDY.md) — estudo aprofundado do código, arquitetura e decisões
- [ARCHITECTURE.md](./ARCHITECTURE.md) — visão estrutural do projeto
- [AGENTS.md](./AGENTS.md) — checklist de validação de servidor local

## Funcionalidades atuais

- landing hero responsiva inspirada no wireframe do Pencil
- catalogo responsivo em `/explorar`
- header em tom metalico com variacao desktop/mobile
- busca por localidade e intencao
- filtros por distancia, categoria, regiao, especialidade e ordenacao
- listagem em cards com imagem quadrada `1:1`
- carrossel automatico com 3 imagens urbanas no hero
- perfil individual por empreendedor
- retorno para a home via `× Fechar`
- lista de servicos como foco principal da pagina de perfil
- bloco de localizacao com imagem de mapa de referencia
- bloco final com contatos e horario de funcionamento
- adaptacao mobile coerente com os frames `MOBILE`

## Estado atual da interface

- a landing inicial fica em `/`
- o catalogo em `/explorar` usa uma listagem leve derivada de `src/data/entrepreneur-summaries.ts`
- o perfil usa `src/data/entrepreneurs.ts`, com servicos e contatos completos
- o layout web atual tenta seguir o arquivo `encontra_sp_frames.pen`
- o CTA de WhatsApp no codigo esta sem icone local no momento

## Arquivos de design

O projeto inclui o arquivo de wireframe:

- `encontra_sp_frames.pen`

Ele serve como referencia visual para a interface web e para futuras iteracoes no OpenPencil.
