# Project Structure

![img.png](/img/project-structure.png)

The project is currently managed in a single Git repository.
We want to keep this situation as it helps us in our day to day work.

## `web-client`

`web-client` is the user interface to use the application.

It is a simple Next.Js application built with the `app` directory.

## `vote-api`

`vote-api` is the main API of the application, it interfaces the **[tvmaze](https://www.tvmaze.com/api)** public API.

It is written in **Go** because go is fun.

## `docs`

`docs` is the documentation of the project.

It is built with **[Docusaurus](https://docusaurus.io/)** and is a simple static website with no backend.

