FROM node:lts as builder

WORKDIR /app

COPY ./web-client/package.json ./web-client/yarn.lock ./
COPY ./web-client/next.config.ts ./

RUN yarn install --frozen-lockfile

COPY ./web-client ./

RUN yarn build

FROM node:lts as runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start"]
