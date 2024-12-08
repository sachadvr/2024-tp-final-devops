# ⚙️ Vote-API

## Requirements to start

- Go >=1.23

**Environment variables**

- `PG_URL`: url to connect to the database format like `postgres://user:password@host:port/database` (See this library
  for more details https://github.com/lib/pq)

## Commands
**All commands must be run from the `vote-api` directory**

### Start locally

```bash
go run .
```

### Test
```bash
go test ./...
```

### Build and run for production
This command create a file called `vote-api` (or `vote-api.exe` on windows) in the current directory.
```bash
go build
```

The produced binary can then be run by just executing it (no need to have go installed)
```bash
./vote-api
```

### Linter
For the linter, we like to use [golangci-lint](https://github.com/golangci/golangci-lint).

### Formatter
To format files in the project, we use the built-in `go fmt` command


