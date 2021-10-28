# Monorepo structure

## Why

TODO

## The internal modules structure

Apart from the various configuration files at the root of the project, this repository wants to keep a strict folder structure.

_Note: the services names in this folder are purely for the sake of the template and should not be considered standard._

Therefore, it defines a set of _internal modules_ managed by [Lerna](https://lerna.js.org/) and [Yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

```
.
├── backend
|   ├── core
|   |   ├── ...
|   |   ├── package.json            # dependencies of the core service
|   |   ├── serverless.ts           # core serverless service file
|   |   └── tsconfig.json           # core typescript config
|   |
|   ├── forum
|   |   ├── ...
|   |   ├── package.json            # dependencies of the forum service
|   |   ├── serverless.ts           # forum serverless service file
|   |   └── tsconfig.json           # forum typescript config
|   |
|   ├── users
|   |   ├── ...
|   |   ├── package.json            # dependencies of the users service
|   |   ├── serverless.ts           # users serverless service file
|   |   └── tsconfig.json           # users typescript config
|   |
|   └── ...                         # other deployed services
|
├── commonConfiguration             # configuration files such as jest, babel...
|   ├── babel.config.js
|   ├── jest.config.js
|   └── lintstaged-base-config.js
|
├── contracts                       # JSONSchema-based binding contracts.
|   ├── core-schemas
|   |   ├── ...
|   |   ├── package.json
|   |   └── tsconfig.json
|   |
|   ├── forum-schemas
|   |   ├── ...
|   |   ├── package.json
|   |   └── tsconfig.json
|   |
|   ├── users-schemas
|   |   ├── ...
|   |   ├── package.json
|   |   └── tsconfig.json
|   |
|   └── ...                         # other contracts, used between deployed services
|
├── packages
|   ├── serverless-configuration    # common constants used in all deployed services
|   |   ├── ...
|   |   ├── package.json
|   |   └── tsconfig.json
|   |
|   ├── serverless-helpers          # a set of shared helpers
|   |   ├── ...
|   |   ├── package.json
|   |   └── tsconfig.json
|   |
|   └── ...                        # other internal shared packages
|
├── lerna.json                     # lerna configuration
├── package.json                   # shared dependencies and global scripts
└── yarn.lock                      # unique lock file, using yarn workspaces

```

## Lerna and Yarn workspaces

These tools work in sync but provide slightly different features.

Lerna:

- Filter changes, run commands

Yarn workpaces:

- Handle dependencies anywhere in the repository

You can find [here](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/) a good explanation on how and why use these tools together.

## Types of internal modules

This repository defines two main types of _internal modules_.

- Deployed modules (Serverless stacks): their purpose is to be deployed and serve our application logic, provision the resources, etc. They are called the **services**;
- Packaged modules (contracts and packages): their purpose is to be **built** (or **packaged**) and embedded into the code of a deployed service:
  - **contracts**: provide a binding contract between deployed services, that can be checked at compile time via the static type-checking provided by Typescript or at run time using JSONSchema. For more details on contracts, see the [contracts documentation](./contracts.md);
  - **packages**: aim to reduce the code duplication between the services by providing shared helper functions. These packages must not become too big in order for them to remain usable and must be well documented.
