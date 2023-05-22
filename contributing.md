<!-- @format -->

# Get started with the development

Great that you want to contribute! Nice to have you onboard! 👽 To get started, follow this contributing guideline to set up the project and work with us!

> Note: Read more about [running the app in production](#production---deployment) here

## Necessary software & tools

The following tools and softwares are necessary to develop this application:

| name    | version             | link                                                  |
| ------- | ------------------- | ----------------------------------------------------- |
| Node.js | ^18.x (recommended) | [Node.js v18](https://nodejs.org/en/)                 |
| yarn    | ^1.22.x             | [yarn](https://yarnpkg.com/getting-started)           |
| Docker  | ^20.10.x            | [Docker Desktop](https://docs.docker.com/get-docker/) |

After installing the necessary tools, you can run the commands below to start developing.

## Development - Setting Up The Repository

-   clone the repository by running `git clone {{repository url}} .` in your terminal or shell to clone the repo into the current directory.
-   run `yarn` or `yarn install` to install the dependencies. This will also install the necessary husky scripts as a `postinstall` command.

## Development - CLI Commands

-   `yarn reset`: Resets the git repository and creates the three working branches, release, main and development.
-   `yarn preci`: Removes all files inside the node_modules folder. Is part of the repository setup.
-   `yarn ci`: Installs all dependencies without generating a lockfile and throws and error if an update is needed.
-   `yarn postinstall`: Installs husky and the hooks
-   `yarn build`: Builds the front- and backend resources
-   `yarn build:production`: Builds the front- and backend resources and minifies them.
-   `yarn dev`: Builds the front- and backend resources in watch mode.
-   `yarn dev:dockerized`: Starts the development environment inside a docker container. You can reach in on the port specified in the .env file.
-   `yarn serve`: Starts the server in watch mode and serves the frontend to the port specified in the .env file.
-   `yarn start`: Starts the server in prod mode.
-   `yarn lint`: Runs alex and stylelint to check for code conformity and inclusiveness.
-   `yarn test`: Runs [ava](https://github.com/avajs/ava) with the tests supplied in the `tests` directory
-   `yarn test:coverage`: Runs [ava](https://github.com/avajs/ava) and uses [c8](https://github.com/bcoe/c8) to calculate test coverage after running the tests

There a handful commands that can be used to interact with Docker to simplify development.

-   `yarn docker:build`: Build the production docker image.
-   `yarn docker:up`: Starts the docker dev environment. The app is still accessible on the port defined in your .env file, but completely dockerized.
-   `yarn docker:down`: Downs the docker dev environment.
-   `yarn docker:stop`: Stops the docker dev environment.
-   `yarn db:up`: Starts only the Docker database image in a docker container.
-   `yarn db:down`: Downs the Docker database instance.
-   `yarn db:stop`: Stops the Docker database instance.
-   `yarn docker:deploy`: Builds the production image and spins up the service.
-   `yarn docker:destroy`: Composes down the production service.

## Development - Project Structure

The project is setup as a monorepo, encompassing a client, server and shared directory.

### Client

The client directory contains a [https://svelte.dev](svelte) app. The app is setup to work with TypeScript and SCSS. The `src` directory contains the application code, while the public directory contains assets and the eventual bundles. The static `reset.css` & `style.css` files are not bundled or transformed.

### Server

The server directory contains a [https://expressjs.com](express) app. The server uses typescript and comes with several pre installed middlewares, like cors, compression and helmet. The `src` directory contains the application, which is split into different sub modules:

-   `api`: Contains the code used to build the rest api.
-   `lib`: Contains any application code that is abstracted, like adapters, transformers or validators.
-   `middlewares`: Contains middlewares to be used with express.
-   `types`: Holds the server specific type declarations.
-   `utils`: Small utility functions.

### Shared

The shared directory can be used to share code (especially types, eg. models) between client and server in a idiomatic way.

### Repository tools

-   `.config`: Contains all configuration files that have a flexible location.
-   `.github`: Contains workflows and github specific data.
-   `.husky`: Git Hooks
-   `.vscode`: Contains settings for vscode users.
-   `tests`: Contains tests written in ava.

## Development - Enforcing Code Standards

This project uses multiple tools to enforce code quality:

### Conventional commits

The project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure a certain commit message style.

-   `feat`: Used when adding features to the application.
-   `fix`: Used when fixing a bug or issue.
-   `refactor`: Used when changing or improving code that is not a new feature or bug.
-   `chore`: Used when updating non application related code.
-   `test`: Used when creating, fixing or updating tests.

### Formatting

The project uses [prettier](https://prettier.io/) to format the code to conform to a certain style. Formatting is enforced using [pretty-quick](https://www.npmjs.com/package/pretty-quick) as a pre-commit hook.

### Inclusiveness

The project uses [alex](https://alexjs.com) to check documentation and text files for inclusive language. For example, when `We’ve confirmed his identity` is given, alex will warn you and suggest using `their` instead of `his`. Alex runs as part of the precommit linting.

### Stylelint

The project uses [stylelint](https://stylelint.io) to check css & scss for style problems. Stylelint runs as part of the precommit linting.

## Development - Git Structure

To develop a feature, checkout a new Branch from `development` and prefix it with the correct branch type. The project currently differentiates between two branch types, `feature` and `bugfix`. For example, a branch to fix a bug would be created like this:

```bash
$ git checkout development
# checkout development as basis for development
$ git checkout -b bugfix/bug-to-fix
# creates a new branch with the correct branch type prefixed
```

## Development - Github Actions

-   [Dependabot](https://github.com/dependabot) is used to keep the projects dependencies up to date.
-   The `CI` action is used to run the linting and test steps on pull requests to main and development.

## Development - Docker

The project uses [docker](https://www.docker.com/) to virtualize the development environment if desired. For production, a complete docker image is build by running `yarn docker:build`. For convenience, two different docker-compose files exist:

-   `docker-compose.db.yml`: Starts docker with the database image exposed on the port specified in your `.env` file.
-   `docker-compose.yml`: Starts a complete node app dockerized, reachable on the port specified in your `.env` file.

The `package.json` contains multiple commands to make working with docker easier. Read more about the commands [here](#development---cli-commands)

## Project - Dependencies

The following non-dev dependencies are used:

| Dependency  | Version | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| compression | ^1.7.4  | Used for compressing HTTP responses to improve performance. This dependency enables the server to compress the response bodies before sending them to the clients. It reduces the size of the data being transferred, resulting in faster response times and reduced network bandwidth usage. Compression is especially beneficial when dealing with large responses or limited network resources.                                                                                                                                                                                   |
| cors        | ^2.8.5  | Enables Cross-Origin Resource Sharing (CORS) for API requests. CORS is a security mechanism implemented in web browsers that restricts cross-origin requests. By including the CORS dependency, the server can handle requests from different origins, allowing resources to be shared across domains securely. It adds the necessary HTTP headers to the server's responses to enable proper CORS handling. This is essential when developing APIs that are accessed from multiple domains or when integrating front-end applications with back-end services.                       |
| dotenv      | ^16.0.3 | Loads environment variables from a .env file. Environment variables are often used to store sensitive information or configuration settings that vary across different environments (e.g., development, production). The dotenv dependency allows developers to define these variables in a separate .env file and load them into the application's environment during runtime. This approach simplifies the management of environment-specific settings and keeps sensitive information separate from the codebase.                                                                 |
| express     | ^4.18.2 | Express is a fast and minimalist web application framework for Node.js. It simplifies the process of building robust and scalable web applications by providing a set of essential features and middleware. Express is widely used in the Node.js ecosystem due to its simplicity, flexibility, and extensive community support. It provides a straightforward way to define routes, handle HTTP requests, and manage middleware. Express is an excellent choice for developing APIs or server-side web applications.                                                                |
| helmet      | ^7.0.0  | Enhances security by setting various HTTP headers. Helmet is a middleware collection that adds an extra layer of security to Express applications by setting appropriate HTTP headers. These headers help protect the application against common web vulnerabilities, such as cross-site scripting (XSS), content sniffing, clickjacking, and more. By including Helmet, the server can automatically set these headers for every response, ensuring a higher level of security without manual configuration. It's a recommended security measure for any Express-based application. |

## Production - Deployment

To deploy the application, build the image and then use the `production docker-compose` file to start the app.

```bash
# Build the image
yarn run docker:build

# Start the service
docker compose -f docker-compose.prod.yml up

# Alternatively, you can use the yarn command if desired
yarn run docker:deploy
```
