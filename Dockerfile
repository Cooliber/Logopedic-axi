# VPS deploy — standalone Next.js + Takumi WASM
# Build: DOCKER_BUILD=1 bun run build -> .next/standalone
FROM oven/bun:1.4 AS base
WORKDIR /app

# Deps
FROM base AS deps
COPY package.json bun.lock ./
COPY bun.lock* package-lock.json* pnpm-lock.yaml* ./
RUN bun install --frozen-lockfile || bun install

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DOCKER_BUILD=1
# Generuj statyczne PDF do public/pdfs (opcjonalnie, wymaga network dla Google Fonts)
# RUN bun run generate:pdfs || echo "PDF gen skip (offline)"
RUN bun run build

# Runtime — minimal
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
