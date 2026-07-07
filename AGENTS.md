# AGENTS.md

Briefing para LLMs que iniciam trabalho neste repositório.

---

## Project Overview

Site institucional (landing page single-page) da **IZI ONE / IZI Gym**, academia em Alto de Pinheiros, São Paulo. O site exibe informações da unidade, planos de membership (buscados via API), galeria do espaço, FAQ e contato.

- **Tipo:** SPA (Single Page Application) — uma rota (`/`) com seções.
- **Cliente:** IZI Gym (academia).
- **Agência:** Fluxo Digital Tech / Jumper Studio.

---

## Tech Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | React | 18 |
| Bundler | Vite (plugin SWC) | 6 |
| Linguagem | TypeScript | 5.5 |
| Estilo | Tailwind CSS | 3.4 |
| UI Components | shadcn/ui (Radix primitives) | — |
| Data Fetching | TanStack Query (react-query) | 5 |
| Roteamento | React Router DOM | 6 |
| Animações | Framer Motion | 12 |
| Forms | React Hook Form + Zod | — |
| Package Manager | pnpm | — |
| Deploy | Vercel | — |

---

## Commands

```bash
pnpm dev        # Dev server na porta 8080 com proxy /api-evo
pnpm build      # Build de produção (output em dist/)
pnpm build:dev  # Build em modo development
pnpm lint       # ESLint (flat config)
pnpm preview    # Preview do build de produção
```

**Não há testes configurados.** Não existe vitest, jest, nem script de teste. Se precisar adicionar testes, instale `vitest` + `@testing-library/react` e crie um script `"test"` no `package.json`.

---

## Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Providers + roteamento
├── globals.css                 # Tailwind base + variáveis CSS + animações
├── vite-env.d.ts               # Tipos Vite
│
├── pages/
│   ├── Index.tsx               # Landing page (todas as seções)
│   └── NotFound.tsx            # 404
│
├── components/
│   ├── Reveal.tsx              # Animação de entrada via IntersectionObserver
│   ├── gym/                    # Componentes de seção da landing
│   │   ├── Header.tsx          # Navbar fixa com glassmorphism no scroll
│   │   ├── MobileNav.tsx       # Menu mobile (sheet)
│   │   ├── UnidadeSection.tsx  # Hero / seção da unidade
│   │   ├── PlanosSection.tsx   # Planos de membership (busca API)
│   │   ├── PlanCard.tsx        # Card individual de plano
│   │   ├── LocationsSection.tsx# Localização
│   │   ├── GallerySection.tsx  # Galeria de fotos
│   │   ├── FAQSection.tsx      # Perguntas frequentes
│   │   ├── Footer.tsx          # Rodapé
│   │   ├── WhatsAppButton.tsx  # Botão flutuante WhatsApp
│   │   ├── StickyMobileCTA.tsx # CTA fixo no mobile
│   │   └── ScrollToTopLink.tsx # Link de voltar ao topo
│   └── ui/                     # shadcn/ui — NÃO EDITAR manualmente
│       └── (40+ componentes)   # Adicionar via: npx shadcn@latest add <component>
│
├── services/
│   └── api.ts                  # API EVO/W12 — fetchPlans, tipos, QueryClient
│
├── hooks/
│   ├── use-mobile.tsx          # Hook de detecção mobile
│   └── use-toast.ts            # Hook de toast
│
├── lib/
│   └── utils.ts                # cn() — clsx + tailwind-merge
│
└── utils/
    └── toast.ts                # Utilitário de toast
```

---

## Conventions

### Code Style
- **Indentação:** 2 spaces (`.editorconfig`).
- **Arquivos:** PascalCase para componentes (`PlanCard.tsx`), camelCase para utils/hooks (`use-mobile.tsx`).
- **Componentes:** Arrow functions com `export const` (não `export default`), tipagem explícita com `React.FC<Props>` ou props inline.
- **Imports:** Alias `@/` aponta para `src/`. Sempre usar alias em vez de caminhos relativos longos.
- **Estilos:** Tailwind CSS inline. Usar `cn()` de `@/lib/utils` para merge condicional de classes.
- **Linting:** ESLint flat config. Regras relaxadas em `src/components/ui/` (código de terceiros do shadcn/ui). Ver `eslint.config.js`.

### Commits e Branches
Seguir **Conventional Commits** e o fluxo de branches documentado em [CONTRIBUTING.md](./CONTRIBUTING.md). Resumo rápido:

```
feat:     nova funcionalidade
fix:      correção de bug
docs:     documentação
style:    formatação (sem mudança de lógica)
refactor: refatoração sem feature/bugfix
perf:     melhoria de performance
chore:    manutenção
```

Branch `main` é protegida — sempre trabalhar em branches feature/fix e abrir PR.

### shadcn/ui
- Componentes em `src/components/ui/` são gerados pelo shadcn/ui CLI.
- **Não editar manualmente** — usar `npx shadcn@latest add <component>` para adicionar ou atualizar.
- Configuração do shadcn em `components.json` (style: default, baseColor: slate, cssVariables: true).

---

## Architecture Notes

### API EVO/W12
- O site busca planos de membership da API `evo-integracao-api.w12app.com.br`.
- **Em dev:** proxy do Vite redireciona `/api-evo` → API real (`vite.config.ts`).
- **Em prod:** rewrite do Vercel faz o mesmo (`vercel.json`).
- Autenticação: Basic Auth via `VITE_API_AUTH_TOKEN` (variável de ambiente, nunca commitar).
- Função principal: `fetchPlans()` em `src/services/api.ts` — busca, filtra planos ativos, normaliza URLs de checkout.
- O `QueryClient` está configurado com `staleTime: 5min`, `refetchOnWindowFocus: false`, `retry: 1`.

### Animações
- `Reveal.tsx`: animação de entrada via IntersectionObserver (translate-y + opacity). Respeita `prefers-reduced-motion`.
- `globals.css`: animações de intro do hero e navbar (keyframes customizados). Também respeita `prefers-reduced-motion`.
- Header usa glassmorphism progressivo baseado no scroll (não é CSS puro — usa JS com `requestAnimationFrame`).

### Responsividade
- Mobile-first. Breakpoints Tailwind padrão + custom `xs: 420px`.
- Navbar: desktop (links inline) vs mobile (sheet/bottom nav via `MobileNav`).
- `StickyMobileCTA`: CTA fixo visível apenas em mobile.

---

## Environment Variables

```bash
VITE_API_AUTH_TOKEN=         # Token Basic auth da API EVO (obrigatório em prod)
VITE_API_BASE_URL=/api-evo/api/v2  # Base URL da API (default funciona com proxy)
```

Copiar `.env.example` para `.env` para rodar localmente. O token é configurado no painel da Vercel para deploy.

---

## Deploy

- **Primário:** Vercel (pnpm, build command `pnpm run build`, output `dist/`).
- **Alternativo:** Dockerfile + nginx.conf para deploy em container.
- `vercel.json` configura rewrites para API proxy e fallback SPA.

---

## Key Files

| Arquivo | Função |
|---|---|
| `src/services/api.ts` | Toda lógica de API, tipos de plano, QueryClient |
| `src/pages/Index.tsx` | Composição da landing page |
| `src/components/gym/PlanosSection.tsx` | Seção de planos (consome API) |
| `src/components/gym/Header.tsx` | Navbar com glassmorphism |
| `src/components/Reveal.tsx` | Animação de entrada reutilizável |
| `src/globals.css` | Variáveis CSS, animações, reset |
| `tailwind.config.ts` | Tema, cores (primary: #E52C12), fontes (Outfit) |
| `vite.config.ts` | Proxy API, alias, build config |
| `components.json` | Configuração shadcn/ui |
