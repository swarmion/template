# Serverless Monorepo Microservices Template

This template aims to define a opinionated clean Serverless monorepo microservices architecture.

## Install

Head to [the install docs](./docs/install.md)!

## Features

- Lerna
- Eslint configuration
- Prettier configuration
- Jest configuration
- Common packages built with babel, with a watch mode
- Selective tests, package and deploy to remove the need to run all the tests and deploy at every commit.

## Code principles

- Always explicitely declare dependencies between end services in `package.json`
- These dependencies can be of two kinds:
  - code dependencies: _service B_ declares _service A_ as a dependency because it needs some code exported by _service A_;
  - deploy dependencies: _service B_ declares _service A_ as a dependency because it needs _service A_ to be deployed before it.

## Commands

These commands have to be run at the root of the project.

- `nvm use`: set the version of node set in `.nvmrc`
- `yarn`: install node dependencies in all packages;
- `yarn package`: compile the common packages;
- `yarn watch`: launch the compilation of all packages in watch mode;
- `yarn deploy`: deploy all the end services in order;

## Adding a new service

- Good idea!
