import type { RequestHandler } from "express";

type AuthorsControllerDeps = {};

export function composeAuthorsController(deps: AuthorsControllerDeps) {
  const authorIndexHandler: RequestHandler = async function (_, res) {
    res.json(["A", "E"]);
  };

  return {
    authorIndexHandler,
  };
}
