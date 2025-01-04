FROM golang:1.23.4-alpine AS base
WORKDIR /usr/src/app
COPY ./go.mod ./go.sum ./
RUN go mod download
COPY ./ ./

FROM base AS development
RUN go install github.com/githubnemo/CompileDaemon@latest
EXPOSE 8080
CMD ["CompileDaemon", "--build=go build -o main .", "--command=./main"]

FROM golang:1.23.4-alpine AS builder
WORKDIR /usr/src/app
COPY ./go.mod ./go.sum ./
RUN go mod download
COPY ./ ./
RUN CGO_ENABLED=0 GOOS=linux go build -o vote-api .

FROM alpine:latest AS production
WORKDIR /usr/src/app
COPY --chown=nobody:nobody --from=builder /usr/src/app/vote-api ./
RUN chown -R nobody:nobody /usr/src/app
USER nobody
EXPOSE 8080
CMD ["./vote-api"]
