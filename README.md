# Flights Manager

## Rules and description of service structure

1.  Source code of route handlers located in `./src/routes/index.ts`
1.  Adding of endpoint routes occurs in `./src/routes/api/**/*.ts`
1.  Swagger specification of micro-service located in `./swagger.json`
1.  Tests of micro-service located in `*.spec.ts` and `*.test.ts`

#### Directory Layout

```
.
├── src                                # Source code directory
│   ├── app.ts                         # Express server setup
│   ├── bin
│   │   └── www                        # Application entry point
│   ├── config                         # Config validation and export
│   ├── controllers                    # Service controllers
│   │   ├── health
│   │   ├── notfound
│   │   └── service
│   ├── middlewares                    # Middlewares
│   ├── routes                         # Route handlers
│   │   └── api
│   │       └── service
│   └── utils                          # Utilities/helpers directory
├── typings                            # Custom typescript @types
├── swagger.json                       # Swagger specification file
├── docker-compose.yml                 # Docker configuration file
└── package.json                       # Dependencies
```

## Run the application

### Install application

1.  Copy _.env_local_ to _.env_ and set/add values to variables

```
cp .env_local .env
```

2.  Install packages:

```
yarn
```

3.  Run the application:
    `yarn start` - just server run
    or
    `yarn dev` - server run with watcher (nodemon)

Open in your browser:

- http://localhost:3000/

### Run Swagger

```
docker-compose up -d --build docs
```

Open in your browser:

- http://localhost:3001/

### Run Prettier

```
yarn check
```

### Run tests

```
yarn test
```

Open in your browser:

- Service: http://localhost:3000/
- Swagger: http://localhost:3001/

## Build with

- [Typescript](https://github.com/Microsoft/TypeScript) (v2.8.1) - TypeScript
  [![Build Status](https://travis-ci.org/Microsoft/TypeScript.svg?branch=release-2.8)](https://travis-ci.org/Microsoft/TypeScript)
- [Express](https://github.com/expressjs/express) (v4.15.2) - Web framework for Node
  [![Build Status](https://travis-ci.org/expressjs/express.svg?branch=4.15.2)](https://travis-ci.org/expressjs/express)
  [![Coverage Status](https://coveralls.io/repos/github/expressjs/express/badge.svg?branch=4.15.2)](https://coveralls.io/github/expressjs/express?branch=4.15.2)
- [Bunyan](https://github.com/trentm/node-bunyan) (v1.8.12) - Logger
  [![Build Status](https://travis-ci.org/trentm/node-bunyan.svg?branch=1.8.12)](https://travis-ci.org/trentm/node-bunyan)
- [Express-bunyan-logger](https://github.com/villadora/express-bunyan-logger) (v1.3.3) - HTTP logger
  [![Build Status](https://travis-ci.org/villadora/express-bunyan-logger.svg?branch=v1.3.3)](https://travis-ci.org/villadora/express-bunyan-logger)
- [Jest](https://github.com/facebook/jest) (v22.4.3) - Test framework
  [![Build Status](https://travis-ci.org/facebook/jest.svg?branch=master)](https://travis-ci.org/facebook/jest)
