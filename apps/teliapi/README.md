## apps/teliapi

`Teliapi` is reponsible for providing the REST api that lets the users 
interact with the underlying persistent data sources (originally a mongo database).

It is organized in a rather traditional manner into routers that have handlers (controllers)
for dealing with user input and output.

- `./src/index.ts` starts the app process
- `./src/composition.ts` wires the different dependencies together
- `./src/authors/`,  `src/publications` etc - routers organized by domain concepts

