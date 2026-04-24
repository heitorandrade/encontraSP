# Encontra SP

Frontend MVP para descoberta de negocios cadastrados no Sebrae, com foco em catalogo, busca, filtros simples e pagina de perfil.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Estrutura

- `src/app`: rotas da home e do perfil
- `src/components`: busca, filtros, cards e tags
- `src/data`: mocks da listagem leve e do perfil completo
- `src/types`: tipagens do dominio
- `scripts/start-local.ps1`: automacao local de build + restart + validacao
- `encontra_sp_frames_v2.pen`: wireframes desktop e mobile
- `src/Maps_referencia.png`: imagem de referencia usada no bloco de localizacao do perfil

## Como rodar

Instale as dependencias:

```powershell
npm install
```

Para subir de forma automatizada, com encerramento de processo antigo na `3000`, rebuild e validacao de `localhost`, use:

```powershell
npm run start:local
```

Esse comando:

- roda `npm run build`
- encerra uma instancia antiga na porta `3000`, se existir
- sobe uma nova instancia local
- valida `HTTP 200`
- valida a home por marcadores basicos de conteudo
- deixa o servico pronto para abrir em `http://localhost:3000`

Depois abra:

```text
http://localhost:3000
```

## Execucao manual

Se quiser rodar manualmente:

```powershell
npm run dev -- --port 3000
```

Ou, para validacao local mais estavel:

```powershell
npm run preview
```

Use `npm run preview` quando quiser testar a versao local com `next start` em vez de `next dev`.

## Fluxo Recomendado

Na pratica, o fluxo mais confiavel para este projeto e:

1. `npm run start:local`
2. Abrir `http://localhost:3000`
3. Reiniciar com `npm run start:local` se houver qualquer instabilidade na porta ou na pagina

## Funcionalidades atuais

- home responsiva inspirada no wireframe do Pencil
- header em tom metalico com variacao desktop/mobile
- busca por localidade e intencao
- filtros por distancia, categoria, regiao, especialidade e ordenacao
- listagem em cards com imagem quadrada `1:1`
- perfil individual por empreendedor
- retorno para a home via `× Fechar`
- lista de servicos como foco principal da pagina de perfil
- bloco de localizacao com imagem de mapa de referencia
- bloco final com contatos e horario de funcionamento
- adaptacao mobile coerente com os frames `MOBILE`

## Estado atual da interface

- a home usa uma listagem leve derivada de `src/data/entrepreneur-summaries.ts`
- o perfil usa `src/data/entrepreneurs.ts`, com servicos e contatos completos
- o layout web atual tenta seguir o arquivo `encontra_sp_frames_v2.pen`
- o CTA de WhatsApp no codigo esta sem icone local no momento

## Arquivos de design

O projeto inclui o arquivo de wireframe:

- `encontra_sp_frames_v2.pen`

Ele serve como referencia visual para a interface web e para futuras iteracoes no OpenPencil.
