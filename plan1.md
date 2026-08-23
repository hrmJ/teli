Yes: **GitHub Actions → registry → VPS pull → `docker compose up -d`** is a good next step.

I’d do it in this order:

1. **Keep one app repo first.** Add CI that runs tests/builds for API and frontend on PRs.
2. **Build images in GitHub Actions only after merge/tag.** Push `api:<git-sha>` and `frontend:<git-sha>` to Docker Hub or GHCR. GitHub’s official docs support this workflow, and Docker maintains official GitHub Actions for it. ([GitHub Docs][1]) ([Docker Documentation][2])
3. **Trust Docker Hub enough, but don’t trust mutable tags.** Use immutable git-SHA tags, or better, image digests. Docker documents digest pulls as a way to pull the exact image version. ([Docker Documentation][3])
4. **On the VPS, keep `docker-compose.yml` + `.env` as the deployment contract.** Example:

   ```env
   API_IMAGE=myuser/project-api:abc1234
   WEB_IMAGE=myuser/project-web:abc1234
   ```

   Then deploy with:

   ```bash
   docker compose pull
   docker compose up -d
   docker image prune -f
   ```
5. **Do not start with full GitOps.** For one VPS, a separate infra repo is useful only once you want reviewable deployment changes independent of app code. Start with `deploy/compose.yml` in the app repo, then split later.

For triggering deploys, I’d avoid auto-updaters like Watchtower at first. Watchtower can poll registries and update containers automatically, but that also means production may change just because a tag moved. ([GitHub][4])

Better low-maintenance option:

**GitHub Actions deploy job over SSH**

* build images
* push images
* SSH to VPS
* update `.env` image tags
* run `docker compose pull && docker compose up -d`

That gives contributors a simple rule: “merge to main deploys,” while you still have logs, reproducibility, and rollback by changing the tag back.

Later, evolve to:

**Small GitOps-ish infra repo**

* `compose.yml`
* `.env.production` with exact image tags/digests
* GitHub Action deploys whenever infra repo changes
* app repo opens a PR to infra repo after successful image build

That is cleaner, but probably step 2 or 3, not the first move.

[1]: https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images?utm_source=chatgpt.com "Publishing Docker images - GitHub Docs"
[2]: https://docs.docker.com/build/ci/github-actions/?utm_source=chatgpt.com "Docker Build GitHub Actions | Docker Docs"
[3]: https://docs.docker.com/dhi/core-concepts/digests/?utm_source=chatgpt.com "Image digests | Docker Docs"
[4]: https://github.com/containrrr/watchtower?utm_source=chatgpt.com "GitHub - containrrr/watchtower: A process for automating Docker ..."


## How to update manually:

```
ssh server
cd /srv/myproject
nano .env   # change API_IMAGE / FRONTEND_IMAGE tag
docker compose pull
docker compose up -d
docker compose ps
 ```
