FROM node:lts as builder

WORKDIR /docs

COPY ./docs/package.json ./docs/yarn.lock ./

RUN yarn install

COPY ./docs ./

RUN yarn build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./infrastructure/Doc/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /docs/build /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
