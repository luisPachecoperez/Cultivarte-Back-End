# ========= 1) BUILDER =========
# Este stage NO construye nada, solo organiza lo que viene del runner
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos los artefactos generados en GitHub Actions
# (debes asegurarte que dist/ y node_modules/ sí existan antes del docker build)
COPY dist ./dist
COPY node_modules ./node_modules
COPY package*.json ./


# ========= 2) RUNTIME =========
FROM node:20-alpine AS runtime
WORKDIR /app

# Copiamos SOLO lo necesario del builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./


ENV NODE_ENV=production
ENV PORT=8001
EXPOSE 8001

CMD ["node", "dist/main.js"]
