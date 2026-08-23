# App structure

The app is organized as a pnpm monorepo deployed with docker compose. 

On the top level there are two folders containing internal typescript packages, a folder 
for infrastructure and a documentation folder.

The code folders are structured roughly according to the principles of domain driven design.
Actual application logic according to user actions is defined inside `application`. The 
most important domain concepts like `Author` and `Book` reside in `domain`. `infrastructure`
holds the persistence layer implementations (currently only for mongo).

```
# TS applications in /apps
├── apps
│   ├── teliapi
│   └── telifront

# ...TS packages in /packages
├── packages
│   ├── application
│   ├── contracts
│   ├── domain
│   ├── infrastructure
│   └── language

# Docker infrastructure as code inside `/compose`
├── compose
│   ├── compose
│   ├── docker-compose.dev.yaml
│   └── init-mongo-dev.js

# The current folder for documentation

├── docs

# Monorepo definition and pnpm configuration
├── pnpm-workspace.yaml
├── package.json
├── pnpm-lock.yaml
```


To find out more about each app's/package's structure, look at the README.md 
of the package in question.

