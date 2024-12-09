FROM golang:1.23 AS builder

WORKDIR /vote-api

COPY ./vote-api/go.mod ./vote-api/go.sum ./
RUN go mod download

COPY ./vote-api .

EXPOSE 8080

CMD ["go", "run", "main.go"]
