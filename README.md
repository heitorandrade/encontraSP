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
- `src/data`: mocks da listagem e do perfil
- `src/types`: tipagens do dominio
- `scripts/start-local.ps1`: automacao local de build + restart + validacao
- `encontra_sp_frames_v2.pen`: wireframes desktop e mobile

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

## Funcionalidades atuais

- home responsiva com desktop e mobile
- busca por localidade e intencao
- filtros por distancia, categoria, regiao, especialidade e ordenacao
- listagem em cards com imagem quadrada `1:1`
- perfil individual por empreendedor
- retorno para a home via `Fechar`
- lista de servicos com foco principal da pagina
- bloco de localizacao e contatos

## Arquivos de design

O projeto inclui o arquivo de wireframe:

- `encontra_sp_frames_v2.pen`

Ele serve como referencia visual para a interface web e para futuras iteracoes no OpenPencil.
