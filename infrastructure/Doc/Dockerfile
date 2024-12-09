FROM node:lts as builder

WORKDIR /docs

COPY ./docs/package.json ./docs/yarn.lock ./

RUN yarn install

COPY ./docs ./

RUN yarn build

FROM nginx:alpine

COPY --from=builder /docs/build /usr/share/nginx/html

EXPOSE 3000
