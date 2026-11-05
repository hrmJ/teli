# Deploying

The basic deploy process goes as follows:

1. Commit changes
2. Tag the commit (e.g. `v0.0.3-dev.3`)
3. Push to the repo
4. github actions will create a new docker image and push it to dockerhub
5. Start using the new image on the server

More specific info defined on the server and on the private git repo  https://github.com/hrmJ/teli-ops.
