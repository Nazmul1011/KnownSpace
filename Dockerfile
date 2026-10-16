# Vite 8 needs Node 20.19+ or 22.12+; older Node skips its native build binding.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
COPY package.json ./
COPY server ./server
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "server/index.mjs"]
