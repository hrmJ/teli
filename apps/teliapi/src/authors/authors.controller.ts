import type { RequestHandler } from "express";
import type {
  GetAuthorDetails,
  GetAuthorIndex,
  ListAuthors,
} from "@teli/application/authors";
import {
  presentAuthorDetails,
  presentAuthorIndex,
  presentAuthorList,
} from "./authors.presenter.ts";

type AuthorsControllerDeps = {
  getAuthorIndex: GetAuthorIndex;
  getAuthorDetails: GetAuthorDetails;
  listAuthors: ListAuthors;
};

export function composeAuthorsController(deps: AuthorsControllerDeps) {
  const authorIndexHandler: RequestHandler = async function (_, res) {
    const authorIndex = await deps.getAuthorIndex();
    const dto = presentAuthorIndex(authorIndex);
    res.json(dto);
  };

  const authorDetailsHandler: RequestHandler = async function (req, res) {
    const name = req.params.name;
    if (!name || typeof name !== "string") {
      res.status(400).json({ error: "Missing author name" });
      return;
    }

    const authorDetails = await deps.getAuthorDetails(name);
    const dto = presentAuthorDetails(authorDetails);
    res.json(dto);
  };

  const authorListHandler: RequestHandler = async function (req, res) {
    const letter = req.query.letter;
    if (!letter || typeof letter !== "string") {
      res.status(400).json({ error: "Missing letter to browse with" });
      return;
    }
    const authors = await deps.listAuthors({ letter });
    const dto = presentAuthorList(authors);
    res.json(dto);
  };

  return {
    authorIndexHandler,
    authorDetailsHandler,
    authorListHandler,
  };
}
