# Serverless Monorepo Microservices Template

This template aims to define a clean Serverless monorepo microservices architecture.

## Requirements
- node
- yarn

## Commands
- `nvm use`: set the version of node set in `.nvmrc` (you may use https://github.com/lukechilds/zsh-nvm to do this automatically);
- `yarn`: install node dependencies in all packages;
- `yarn package`: compile the common packages;
- `yarn watch`: launch the compilation in watch mode;
- `yarn deploy`: deploy all the end services in order;

## Principles
- Always explicitely declare dependencies between end services in `package.json` 


## Adding a new service
- Good idea!
