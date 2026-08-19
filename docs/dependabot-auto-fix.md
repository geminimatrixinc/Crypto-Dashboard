# Dependabot Auto-Fix

When Dependabot opens a dependency-bump PR and CI fails on it, this repo
automatically opens a second PR that contains **the bump plus the fixes**,
with a green build, so a developer can eyeball one PR and merge it.

## What you'll see

For a failing Dependabot PR (say **#38**), a bot PR appears:

> **[Auto-Fix] Fix ESLint & Tests failures from dependabot #38**
> label: `dependabot-auto-fix`

That PR (e.g. **#41**) contains:

1. The original Dependabot bump commit(s)
2. Auto-generated fix commit(s) — e.g. `fix: resolve ESLint violations from dependabot PR #38`

Its CI is green.

## What to do

1. Review the **`[Auto-Fix]`** PR (the bump and the fixes are together, in context).
2. Merge it.
3. The original Dependabot PR closes automatically — the Auto-Fix PR body
   contains `Closes #<original>`, so merging it closes the Dependabot PR.

You do **not** need to merge the original Dependabot PR. Merge the green
`[Auto-Fix]` one.

## Why one PR (not a branch-on-branch stack)

The fix PR targets `main` and carries the bump **and** the fixes, so there is:

- one review surface,
- one green check,
- no merge-order coupling,
- no orphan branches.

Merging it lands everything; the original bump PR becomes redundant.

## How it works

```
Dependabot PR ──▶ CI (lint / test / build jobs)
                     │ (fails)
                     ▼
          .github/workflows/pr-dependabot.yml   (workflow_run trigger)
                     │  detects it's a Dependabot PR
                     │  reads which jobs failed (lint-* / test-* / build-*)
          ┌──────────┴──────────┐
          ▼                     ▼
   eslint-fix.yml          test-fix.yml         (reusable workflows)
   runs `eslint --fix`     re-runs tests
          └──────────┬──────────┘
                     ▼
        pushes branch  fix-for-dependabot-<PR#>
                     ▼
        opens the [Auto-Fix] PR, labels it,
        comments a link back on the Dependabot PR
```

### The files

| File | Role |
|------|------|
| `.github/workflows/ci.yml` | CI, split into `lint-*`, `test-*`, `build-*` jobs so failures route by name |
| `.github/workflows/pr-dependabot.yml` | Orchestrator: detects failures on Dependabot PRs, routes to fixers, opens the Auto-Fix PR |
| `.github/workflows/eslint-fix.yml` | Reusable workflow — runs `eslint --fix` on the affected project |
| `.github/workflows/test-fix.yml` | Reusable workflow — re-runs tests / prepares fix context |
| `.github/dependabot.yml` | Dependabot config (currently **daily**, grouped by ecosystem) |

Reusable workflows must live in `.github/workflows/` (GitHub does not allow
them in subdirectories).

## Repo settings this depends on

- **Settings → Actions → General → Workflow permissions**
  - "Read and write permissions" **enabled**
  - "Allow GitHub Actions to create and approve pull requests" **enabled**

Without these, the bot can push a branch but cannot open the Auto-Fix PR.

## Reusing this in another repo

1. Copy the four workflow files under `.github/workflows/`.
2. Adjust the project paths in `eslint-fix.yml` / `test-fix.yml` and the job
   names in `ci.yml` to match that repo.
3. Enable the two repo settings above.

The orchestrator keys off **job-name prefixes** (`lint-`, `test-`, `build-`),
so as long as a repo's CI names its jobs that way, the auto-fix routing works
without duplicating that repo's CI logic.

## Notes / current limitations

- `test-fix.yml` re-runs tests and prepares context but does not yet apply
  automated source fixes for logic failures — `eslint-fix.yml` is the fixer
  that currently modifies code. Extend `test-fix.yml` (e.g. Copilot / an LLM
  step) to auto-patch test failures.
- The Dependabot schedule is set to **daily** for now to make the flow easy
  to observe; dial back to `weekly` in `.github/dependabot.yml` once you're
  confident.
