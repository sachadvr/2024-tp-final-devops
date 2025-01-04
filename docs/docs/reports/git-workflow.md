# Git Workflow

We're using twgit, you can find it [here](https://github.com/Twenga/twgit), and you'il need to set a big of config to make it work with our workflow.

```bash
TWGIT_STABLE='main'
TWGIT_PREFIX_DEMO='demo/'
TWGIT_PREFIX_TAG=''
```

## Branch Management

We use Gitflow & Twgit for branch management:

- `main`: Production-ready code.
- `demo/demo`: Integration branch for features.
- `feature/*`: Feature branches.
- `hotfix/*`: Hotfix branches.

## Release

Release branches -> we didn't use them, but we could have, just we didn't really had the need for it since we don't have a task manager like Jira or Trello.

But twgit works well and we could have automated the release process with it.

We choose to use the `demo/demo` branch as a release branch and when we want to release a new version, we merge `demo/demo` into `main` with the manual trigger of the pipeline on `demo/demo`.

## Pull Requests

- All changes must go through pull requests.
- Code reviews are mandatory.
- Use Gitmoji for commit messages.

## Rollbacks

- Rollbacks are managed by reverting the specific commit or using the `hotfix/*` branch.

## Creating a Hotfix

1. Create a branch from `main`: `hotfix/<issue>` or use twgit.

```bash
twgit hotfix start
git add .
gitmoji -c
git push origin HEAD
twgit hotfix finish
twgit demo start demo -d
## And you'il see and merge the tag into demo/demo
```

2. Fix the issue.
3. Merge back into `main` and `demo/demo`.
4. Deploy the hotfix.

## Contributing

1. Fork the repository.
2. Create a feature branch: `feature/<feature-name>` (preferably using twgit)

```bash
twgit feature start SU-{issue-number}
```

3. Commit changes using Gitmoji.

```bash
git commit -m ":sparkles: Add new feature"
```

or

```bash
gitmoji -c
```

4. Push to your fork.
5. Create a pull request to `demo/demo`.
