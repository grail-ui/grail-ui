# Contributing

## Prerequisite Software

Before you start, you must install and configure the following on your development machine:

- [Git](http://git-scm.com).

- [Node.js](https://nodejs.org) (version specified in the [.nvmrc](.nvmrc)). Optional: use a Node Version Manager, like [NVM](https://github.com/nvm-sh/nvm).

- [PNPM](https://pnpm.io) (version `7`) which is used to install dependencies.

## Installing dependencies

This repository requires the use of [PNPM](https://pnpm.io) package manager, so go ahead and [install](https://pnpm.io/installation) it.

Later, install this repo's dependencies with:

```bash
pnpm i
```

## Code structure

This is a monorepo utilizing [PNPM workspace](https://pnpm.io/workspaces) feature.

## Formatting your source code

To enforce a common style guide we use [Prettier](https://prettier.io). This allows us to focus our code reviews more on the content, and less on style nit-picking.
If the source code is not properly formatted, the CI will fail and the PR cannot be merged.

In order to format all files, run `pnpm format` at the root directory, otherwise add the `-w` flag.

## Linting

To check your code, run `pnpm lint`.

## Commit Message Guidelines

We follow the [Conventional Commits specification](https://www.conventionalcommits.org).

In general, the commit message should follow the following format:

```
type(scope): summary
BLANK LINE
body (optional)
BLANK LINE
Closes #ISSUE_NUMBER
```

Use the "summary" field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

For the full configuration check [here](commitlint.config.cjs).

## Generating CHANGELOGs

For your changes to be reflected in package changelogs, run `pnpm changeset` and follow the prompts.
