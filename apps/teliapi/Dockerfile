FROM node:26.7.0-bookworm-slim

ENV NODE_ENV=production
WORKDIR /repo

RUN npm install --global pnpm@10

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/teliapi/package.json apps/teliapi/package.json

COPY packages/application/package.json packages/application/package.json
COPY packages/application/src packages/application/src

COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/contracts/src packages/contracts/src

COPY packages/domain/package.json packages/domain/package.json
COPY packages/domain/src packages/domain/src

COPY packages/infrastructure/package.json packages/infrastructure/package.json
COPY packages/infrastructure/src packages/infrastructure/src

COPY packages/language/package.json packages/language/package.json
COPY packages/language/src packages/language/src

COPY apps/teliapi/src apps/teliapi/src

RUN pnpm install \
    --frozen-lockfile \
    --prod \
    --filter @teli/api...

WORKDIR /repo/apps/teliapi

USER node

CMD ["node", "src/index.ts"]
