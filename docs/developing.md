## How to run the development server and set up a local dev env?

### Pre-requirements

- Docker (e.g. via [docker desktop](https://www.docker.com/products/docker-desktop/) or [rancher desktop](https://rancherdesktop.io/))
- nodejs. Check the required version from the `engine` section of the root package.json at `.`
- pnpm (https://pnpm.io)

### Installing dependencies

install local dependencies by running

```
pnpm install
```

at the repo root

### Running the dev processes


1. Start up the docker containers for the backend services by running

```
docker compose -f compose/docker-compose.dev.yaml up
```


2. run `pnpm run dev` inside `apps/teliapi` and `apps/telifront/`


3. You should now be able to access the frontend at http://localhost:8080

