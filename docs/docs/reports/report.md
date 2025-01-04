# Project Report (Sacha & Théo)

## What We Have Done

- Look for mermaid diagrams -> in `structure.md`.
- Built Docker images for `web-client`, `vote-api`, and `docs`.
- Created Docker Compose files (prod & dev) to run the applications with the database.
- Set up a CI/CD pipeline with GitHub Actions.
- Deployed the applications.

## Tests

The tests are run using GitHub Actions. They are executed on every push and pull request.

## Automatic Merge

- When the pipeline is triggered on the `demo/demo` branch, it will run the tests and merge the `demo/demo` branch into `main` if the tests pass.

## Deployment

- Applications are deployed using Docker Compose.
- The CI/CD pipeline handles the deployment process.
- Manual deployment is chosen, so we need to run a pipeline on `main` to deploy the applications.
- Tests are run before deployment.
- The application is deployed on a VPS with Docker installed.
- A reverse proxy is used to route the traffic to the correct application.
- A domain name is used to access the applications (docs/showcase).sachadvr.fr

## Links (Fully Functional)

- [Deployed Web Client](http://showcase.sachadvr.fr)
- [Deployed Vote API](http://showcase.sachadvr.fr/api/trpc/movies)
  This is not a public API, so only the `web-client` can access it for security reasons.
- [Deployed Docs](http://docs.sachadvr.fr)

## Images

- [Docker Hub - Web Client](https://hub.docker.com/repository/docker/sachadvr/web-client)
- [Docker Hub - Vote API](https://hub.docker.com/repository/docker/sachadvr/vote-api)
- [Docker Hub - Docs](https://hub.docker.com/repository/docker/sachadvr/docs)

## Contributing

- Follow the Git workflow documented in `git-workflow.md`.

## Issues and Solutions

- If you encounter any issues, refer to the documentation or contact the team for support.
