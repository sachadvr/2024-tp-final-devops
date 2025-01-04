FROM node:23-alpine AS base

WORKDIR /usr/src/app
COPY --chown=nobody:nobody ./ ./
RUN yarn install

FROM base AS development
USER nobody
EXPOSE 4000
CMD ["yarn", "start"]


FROM base AS builder
RUN yarn run build


FROM nginx:stable-alpine AS production

COPY ./nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --chown=nobody:nobody --from=builder /usr/src/app/build ./

RUN chown -R nobody:nobody /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && chown -R nobody:nobody /var/cache/nginx \
    && chown -R nobody:nobody /etc/nginx \
    && chown -R nobody:nobody /var/log/nginx \
    && chmod 1777 /tmp

USER nobody

EXPOSE 80

CMD ["nginx", "-c", "/etc/nginx/nginx.conf"]
