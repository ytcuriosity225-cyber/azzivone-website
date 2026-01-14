## Multi-stage Dockerfile to build and run the full app (client + server)

### Build stage
FROM node:20 AS builder
WORKDIR /app

# copy package files first for better caching
COPY package.json package-lock.json* ./

# copy source
COPY . .

# Install dev deps if lockfile present use ci else install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Run project build (this builds client into dist/public and bundles server into dist)
RUN npm run build


### Production stage
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# copy built app
COPY --from=builder /app/dist ./dist

# copy package manifest to install production deps
COPY package.json package-lock.json* ./

# install only production deps
RUN if [ -f package-lock.json ]; then npm ci --production; else npm install --production; fi

EXPOSE 8080

# Start the bundled server
CMD ["node", "dist/index.cjs"]
