# IZI Gym

Site institucional da IZI ONE / IZI Gym, academia em Alto de Pinheiros, Sao Paulo.

## Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

## Como rodar localmente

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deploy

O projeto esta preparado para Vercel. O `vercel.json` configura o fallback SPA para `index.html`.

Os botões de matrícula usam exclusivamente o checkout do Sistema Pacto.

## Cloudflare Workers

O site também pode ser publicado na Cloudflare como Static Assets. A configuração
está em `wrangler.jsonc`; use `pnpm cf:build` para gerar os arquivos e
`pnpm cf:deploy` para publicar.
