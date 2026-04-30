# START LOCAL — Encontra SP

Guia rápido para subir o projeto localmente.

## Pré-requisito

```powershell
npm install
```

## Comando Único (Recomendado)

```powershell
npm run start:local
```

Esse script automatiza todo o fluxo:

1. **Build** — `npm run build` (limpa `.next` e compila)
2. **Encerra processo antigo** na porta `3000`, se houver
3. **Sobe servidor** local
4. **Valida** `HTTP 200` e checa marcadores da página

Ao final, o terminal mostra:

```
Servidor validado
PID atual: <id>
Status HTTP: 200
```

Basta abrir `http://localhost:3000`.

## Passo a Passo Manual

```powershell
# 1. Compilar
npm run build

# 2. Subir servidor de produção local
npm run preview
```

Ou, para desenvolvimento com hot-reload:

```powershell
npm run dev -- --port 3000
```

## Verificações

```powershell
# Confirmar que a porta está ouvindo
Get-NetTCPConnection -LocalPort 3000 -State Listen

# Confirmar resposta HTTP
(Invoke-WebRequest -UseBasicParsing http://localhost:3000).StatusCode
# Esperado: 200
```

## Encerrar Servidor

```powershell
Stop-Process -Id <PID>
```

> **Nota**: Este projeto já apresentou instâncias travadas em background.
> Sempre prefira `npm run start:local` em vez de subir manualmente,
> pois o script valida build, porta e resposta HTTP.
