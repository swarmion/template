# Serverless Monorepo Microservices Template

This template aims to define a clean Serverless monorepo microservices architecture.

## Install

Head to [the install docs](./docs/install.md)!

## Features

- Lerna
- Eslint configuration
- Prettier configuration

## Code principles

- Always explicitely declare dependencies between end services in `package.json`
- These dependencies can be

## Commands

These commands have to be run at the root of the project.

- `nvm use`: set the version of node set in `.nvmrc`
- `yarn`: install node dependencies in all packages;
- `yarn package`: compile the common packages;
- `yarn watch`: launch the compilation of all packages in watch mode;
- `yarn deploy`: deploy all the end services in order;

## Adding a new service

- Good idea!
