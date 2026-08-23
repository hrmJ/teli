# Running tests

## A word on definitions

Defining different types of tests tends to create a lot of confusion and disagreement among devs.
For the puproses of the repo I use the term *api test* to refer to tests that spin up an actual 
process for serving the api, use a database behind the process and hit the api endpoints 
with actual requests. Most of the tests in this project fall into this category.

## Running api tests

### Dev mode

Running the api tests in dev mode provide a nice way to develop in a TDDish style 
by constantly seeing which functionality is working and which is not.

1. Start the backend services

```
docker compose -f compose/docker-compose.dev.yaml up
```

2. Start the api in dev mode

```
# Inside ./apps/teliapi/

pnpm run dev

```

3. Start the tests


```
# Inside ./apps/teliapi/

pnpm run test:integration:watch

```
