## Overview and Testing

````bash
After we run ```docker-compose up``` to up the frontend, backend and db (mongodb)
    - Frontend is at localhost:3000
    - Backend is at localhost:8080
    - Database is at port 27017

We have the following screens to test the features
    - Login screen (the main authentication screen when first opening the web)
    - Registration screen to register new admin or user account with email
    - Home page as an admin
        - admin can view all the tracing checked by all users
        - User page to manage the users in our db
    - Tracing page to manage the tracings checked by users
    - Create new tracing by providing type (check-in or check-out) and detail
    - Home page as a normal user
        - normal user can view the list of tracings checked by them
        - they can add a new tracing

Technology stacks
    - For Backend, I'm using NodeJS with NestJS, a production ready framework for NodeJS
    - For Frontend, I'm using ReactJS with NextJS, a production ready framework for ReactJS to support SEO / SSR
    - For DB, I'm using mongodb due to the flexibilty of NoSQL
````

## Installation

```bash
$ npm install
```

````bash
## Running the app as a docker

docker-compose up

## Running the app as cli

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
````

## Running the frontend app

````bash
$ cd frontend
$ npm install
$ npm run dev

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
````

## API Endpoints

```bash
# register a user
localhost:8080/auth/register
{
    "username": "dntuanvu@gmail.com",
    "password": "P@ssw0rd123",
    "email": "dntuanvu@gmail.com",
    "first_name": "Victor",
    "last_name": "Dinh",
    "role": "admin" (or "user")
}

# login api
localhost:8080/auth/login
{
    "username": "dntuanvu@gmail.com",
    "password": "P@ssw0rd123"
}

# get all tracings
localhost:8080/tracings GET

# get all tracings by user
localhost:8080/tracings/user GET

# create new tracings by user
localhost:8080/tracings/raise POST
{
    "type": "check-in",
    "detail": "First check in"
}
```
