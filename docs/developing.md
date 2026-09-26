# Developing

## How to run the development server and set up a local dev env?

### Pre-requirements

- Docker (e.g. via [docker desktop](https://www.docker.com/products/docker-desktop/) or [rancher desktop](https://rancherdesktop.io/))
- nodejs. Check the required version from the `engine` section of the root package.json.
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


2. Start the individual apps by runing run `pnpm -r --parallel run dev` 

Note: set up the necessary env variables before running by sourcing the `./local-dev.env` file
with `source local-dev.env`.


3. You should now be able to access the frontend at http://localhost:4000 using the dummy 
local dev credentials `testuser:test-password`.


## Making changes to frontend code

Look at apps/telifront/README.md


## Restoring data

In local dev

```
# 1. Copy the dump into the container

docker compose -f compose/docker-compose.dev.yaml cp  /path/to/teli-migration-dump   mongo:/tmp/teli-restore

#2. Restore

docker compose --env-file local-dev.env  -f compose/docker-compose.dev.yaml  exec mongo   sh -c 'exec mongorestore \
     --username "$MONGO_INITDB_ROOT_USERNAME" \
     --password "$MONGO_INITDB_ROOT_PASSWORD" \
     --authenticationDatabase admin \
     --nsInclude "teli.authors" \
     --nsInclude "teli.users" \
     --nsFrom "teli.*" \
     --nsTo "teliapi2.*" \
     --drop \
     --stopOnError \
     /tmp/teli-restore'

```

``` 
"$HOME/bin/docker" --context rootless compose   -f docker-compose.yaml cp   /path/to/teli-migration-dump   mongo:/tmp/teli-restore


```

