import type { RequestHandler } from "express";
import type { GetAuthorIndex } from "@teliapi/application/authors";
import { presentAuthorIndex } from "./authors.presenter.ts";

type AuthorsControllerDeps = {
  getAuthorIndex: GetAuthorIndex;
};

export function composeAuthorsController(deps: AuthorsControllerDeps) {
  const authorIndexHandler: RequestHandler = async function (_, res) {
    const authorIndex = await deps.getAuthorIndex();
    const dto = presentAuthorIndex(authorIndex);
    res.json(dto);
  };

  return {
    authorIndexHandler,
  };
}
