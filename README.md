# Serverless Monorepo Microservices Template

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This template aims to define an opinionated clean Serverless monorepo microservices architecture.

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

## Install

Head to [the install docs](./docs/install.md)!

If you need to setup your CI/CD: [docs](./docs/ci-cd.md).

## Features

- Nx
- Eslint configuration
- Prettier configuration
- Jest configuration
- Typescript
- Common packages built with babel, with a watch mode
- Selective tests, package and deploy to remove the need to run all the tests and deploy at every commit.

## Code principles

This repository follows the code principles:

- **Your codebase should adapt to your team organizations**
- **DRY** (Don't Repeat Yourself)
- **Don't deploy all at once**
- **Safe deployments**

In order to respect these guidelines, a good solution is the Monorepo approach. See:

- [the Monorepo structure documentation](./docs/monorepo-structure.md)
- [the contracts documentation](https://github.com/swarmion/swarmion)

Tips:

- Always explicitly declare dependencies between end services in `package.json`
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
- `yarn test-circular`: check if there are circular dependencies in the code base;

## Adding a new service

- Good idea!

## Other docs

- [Swarmion](https://github.com/swarmion/swarmion)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/fargito"><img src="https://avatars.githubusercontent.com/u/29537204?v=4?s=100" width="100px;" alt=""/><br /><sub><b>François Farge</b></sub></a><br /><a href="#infra-fargito" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/swarmion/template/commits?author=fargito" title="Code">💻</a> <a href="#ideas-fargito" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/swarmion/template/commits?author=fargito" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/adriencaccia"><img src="https://avatars.githubusercontent.com/u/19605940?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrien Cacciaguerra</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=adriencaccia" title="Code">💻</a> <a href="#ideas-adriencaccia" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-adriencaccia" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/LouisPinsard"><img src="https://avatars.githubusercontent.com/u/30240360?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Louis Pinsard</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=LouisPinsard" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/guillaumeduboc"><img src="https://avatars.githubusercontent.com/u/33599414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>guillaumeduboc</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=guillaumeduboc" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MaximeVivier"><img src="https://avatars.githubusercontent.com/u/55386175?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxime Vivier</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=MaximeVivier" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GuillaumeLagrange"><img src="https://avatars.githubusercontent.com/u/19265358?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Guillaume Lagrange</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=GuillaumeLagrange" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pmilliotte"><img src="https://avatars.githubusercontent.com/u/39985796?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pierre Milliotte</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=pmilliotte" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ThomasAribart"><img src="https://avatars.githubusercontent.com/u/38014240?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thomas Aribart</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=ThomasAribart" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/charlesgery"><img src="https://avatars.githubusercontent.com/u/46850903?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Charles Géry</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=charlesgery" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/StanHannebelle"><img src="https://avatars.githubusercontent.com/u/45121661?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stan Hannebelle</b></sub></a><br /><a href="https://github.com/swarmion/template/commits?author=StanHannebelle" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/qhello"><img src="https://avatars.githubusercontent.com/u/9997584?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Quentin Hello</b></sub></a><br /><a href="#infra-qhello" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
