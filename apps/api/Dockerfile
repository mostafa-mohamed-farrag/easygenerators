FROM node:20-alpine
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./

COPY apps/api/package.json apps/api/

RUN pnpm install --frozen-lockfile --filter api...

COPY apps/api apps/api

WORKDIR /app/apps/api
RUN pnpm build

EXPOSE 4000
CMD ["node", "dist/main.js"]


