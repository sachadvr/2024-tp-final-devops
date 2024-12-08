---
slug: assignement
title: Assignement
authors: [ anthony ]
tags: [ ]
---

## Objectives

- Build Docker images
- Build a Docker Compose file
- Build a CI/CD pipeline with GitHub Actions
- Deploy an application on multiple hosting platforms

## What to do

Read **carrefully** the following instructions before starting.

### Git

Every commit must use the [Gitmoji convention](https://gitmoji.dev/specification).

You also need to chose how Git should be used on the project and apply the wanted method during when working on the
project.

From the project documentation, the following informations must be provided:

- How the manage branches / pull requests on the project (gitflow, trunk based, reviews...)
- How rollbacks are managed and do they allow
- How to create a hotfix
- In general all I need to know to start working on the project, create my feature and all the process until the feature
  is in production.

### Docker

Build and deploy docker images for all 3 applications, the `web-client`, the `vote-api` and the `docs`.

**Additional requirements:**

- the application must NOT be run as root in the container
- The `latest` of your docker image must be the latest version of the application
- use multi-stage builds to keep the final image as small as possible

### Docker Compose

Build a docker compose that can **build** and **run** the `web-client` and the `vote-api` applications with the
database.

**Additional requirements:**

- Both application main ports should be exposed (you can change them if you like).
- No additional configuration should be required.

### CI/CD

It is up to you to decide what you need to add to your CI/CD pipeline based on the team requirements.

### Deployment

Must be deployed:

- `web-client`, be carreful, although it is a client application, it still runs a backend
- `vote-api` with the databse
- `docs`

If you require multiple environments (preproduction, production, staging...) for you development flux, you do not have
to create all of them.
Only the production environment is required.

For example, if you need a preproduction environment and a production environment, you can create only the production
environment and when you would deploy on the preproduction, deploy to the production environment instead with a comment
explaining what should be change to have a proper preproduction environment.

As long as you show that you can deploy on the preproduction environment, we are good.

### Do anything that seems nice to have on the project

You do not have to do everything, this is for bonus points only after everything else is done.

**Some ideas:**

- automatic versioning with a tool like semantic-release
- devcontainers (a bit hard but very nice to use)
- badges to know the status of CI/CD pipeline(s)
- Comments in the Pull Requests with reports for failing tests
- dynamic environments per PR (very hard but would be amazing)

## Report submission

This time, I will only need your repository url.
The repository **MUST** be a fork of my repository.

Place your report in the `docs/docs/reports` directory in markdown format.
Your report should includes everything to understand your work, examples:

- what you have done
- how is it deploy
- links to deployed images and apps
- how should a new user contribute to the project

If you tried to do something but got stuck somewhere, explain what you did and what failed in the report.

## Advices

- Do not stay stuck, try other things, I do not need a perfect solution, I want to know if you understand what you are
  doing.
- Do not hesitate to ask for help or feedbacks if you need it (I'll ty to answer in max 3days)

I suggest you do things in the following order:

1. Git report
2. Docker
3. Docker Compose
4. CI pipeline
5. environments
6. CD pipeline

---

*Any information related to the project can be found in the documentation*
