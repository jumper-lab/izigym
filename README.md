# IZI Gym

Site institucional da IZI ONE / IZI Gym, academia em Alto de Pinheiros, Sao Paulo.

## Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- TanStack Query
- shadcn/ui

## Como rodar localmente

```bash
cp .env.example .env
npm install
npm run dev
```

O servidor local usa o proxy do Vite para a API EVO/W12 em `/api-evo`.

## Variaveis de ambiente

```bash
VITE_API_AUTH_TOKEN=
VITE_API_BASE_URL=/api-evo/api/v2
```

`VITE_API_AUTH_TOKEN` deve ser configurada no ambiente de deploy da Vercel. Nao commite `.env`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deploy

O projeto esta preparado para Vercel. O `vercel.json` configura rewrites para a API EVO/W12 e fallback SPA para `index.html`.
