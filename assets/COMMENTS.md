[back](../README.md)

## Installing / Getting started

All you have to be configured is this project is the .env file, and it can be found into root project with the following environment variables names.

Once it have setup the .env file and installed all requirements, let's start the project with the following commands:

```shell
cd project-name
yarn # => Installing the dependencies. (or npm install)
yarn test # => Running the automated tests. (or npm run test)
yarn start:dev # => Running the project into local. (or npm run start:dev)
```

> For run the project into a docker container just run `yarn docker:up` and if need to down the container run `yarn docker:down`

## Building

So, basically if you want to build the project into your machine run the following commands:

```shell
yarn build # => or npm run build
```

The api documentation is in the route /documentation