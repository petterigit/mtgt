FROM node:18-alpine AS base

RUN npm install pnpm --global

### Builder ###

FROM base AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm install turbo --global 
COPY . .
RUN turbo prune --scope=backend --docker

### Installer ### 

FROM base AS runner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=backend



# Start the server using the production build
CMD [ "node", "/app/apps/backend/dist/main.js" ]