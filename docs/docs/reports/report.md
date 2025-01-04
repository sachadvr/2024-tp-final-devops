# Project Report (Sacha & Théo)

## What I Have Done

- Built Docker images for `web-client`, `vote-api`, and `docs`.
- Created a Docker Compose file (prod & dev) to run the applications with the database.
- Set up a CI/CD pipeline with GitHub Actions.
- Deployed the applications.

## Deployment

- Applications are deployed using Docker Compose.
- CI/CD pipeline handles the deployment process.
- The pipelines are now running on GitHub Actions & triggered on pull & push requests.

## Links (Not deployed yet)

- [Deployed Web Client](http://showcase.sachadvr.fr)
- [Deployed Vote API](http://showcase.sachadvr.fr/api/trpc/movies) - But it is not a public API, so only the `web-client` can access it.
- [Deployed Docs](https://docs.sachadvr.fr)

## Contributing

- Follow the Git workflow documented in `git-workflow.md`.

## Issues and Solutions

- If you encounter any issues, refer to the documentation or contact the team for support.
