# Git Workflow

## Branch Management
We use Gitflow for branch management:
- `main`: Production-ready code.
- `demo/demo`: Integration branch for features.
- `feature/*`: Feature branches.
- `release/*`: Release branches.
- `hotfix/*`: Hotfix branches.

## Pull Requests
- All changes must go through pull requests.
- Code reviews are mandatory.
- Use Gitmoji for commit messages.

## Rollbacks
- Rollbacks are managed by reverting the specific commit or using the `hotfix/*` branch.

## Creating a Hotfix
1. Create a branch from `main`: `hotfix/<issue>`
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