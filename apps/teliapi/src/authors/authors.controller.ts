import type { RequestHandler } from "express";
import type { GetAuthorIndex } from "@teliapi/application/authors";

type AuthorsControllerDeps = {
  getAuthorIndex: GetAuthorIndex;
};

export function composeAuthorsController(deps: AuthorsControllerDeps) {
  const authorIndexHandler: RequestHandler = async function (_, res) {
    const authorIndex = await deps.getAuthorIndex();
    res.json(authorIndex.letters);
  };

  return {
    authorIndexHandler,
  };
}
