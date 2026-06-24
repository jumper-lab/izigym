# syntax=docker/dockerfile:1.6

# ===== Stage 1: Build =====
FROM node:20-alpine AS builder

# Habilita pnpm via corepack (sem precisar instalar globalmente)
RUN corepack enable

WORKDIR /app

# Copia manifests primeiro para aproveitar cache de layers
COPY package.json pnpm-lock.yaml ./

# Instala dependências de forma reprodutível
RUN pnpm install --frozen-lockfile

# Copia o restante do código
COPY . .

# Variáveis VITE_* precisam estar disponíveis em BUILD TIME
# (são "queimadas" no bundle gerado pelo Vite).
# No Easypanel, configure como Build Args.
ARG VITE_API_AUTH_TOKEN
ARG VITE_API_BASE_URL=/api-evo/api/v2
ENV VITE_API_AUTH_TOKEN=${VITE_API_AUTH_TOKEN}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build de produção do Vite (gera /app/dist)
RUN pnpm build

# ===== Stage 2: Runtime (Nginx servindo estático) =====
FROM nginx:1.31.2-alpine AS runner

# Configuração customizada (SPA fallback + proxy /api-evo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artefatos do build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Sem HEALTHCHECK aqui — o Easypanel/Traefik gerencia health probing
# externamente. Healthcheck no Dockerfile pode causar restart loop
# quando o orquestrador também faz probe.

CMD ["nginx", "-g", "daemon off;"]
