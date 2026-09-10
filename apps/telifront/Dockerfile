FROM node:26.7.0-bookworm-slim AS build

WORKDIR /repo

RUN npm install --global pnpm@10

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/telifront/package.json apps/telifront/package.json
COPY apps/telifront/panda.config.ts apps/telifront/panda.config.ts
COPY apps/telifront/postcss.config.cjs apps/telifront/postcss.config.cjs
COPY apps/telifront/vite.config.js apps/telifront/vite.config.js
COPY apps/telifront/tsconfig.json apps/telifront/tsconfig.json

COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/contracts/src packages/contracts/src

RUN pnpm install \
    --frozen-lockfile \
    --filter @teli/front...

COPY apps/telifront apps/telifront

WORKDIR /repo/apps/telifront

ARG VITE_API_URL
ARG VITE_BASE_PATH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE_PATH=$VITE_BASE_PATH

RUN pnpm run build

# Stage 2: Serve
FROM nginx:stable-alpine

COPY --from=build /repo/apps/telifront/dist /usr/share/nginx/html

# SPA fallback: serve index.html for all routes
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
