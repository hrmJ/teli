import type { RequestHandler } from "express";
import type {
  CreateAuthor,
  DeleteAuthor,
  GetAuthorDetails,
  GetAuthorIndex,
  ListAuthorNames,
  ListAuthors,
} from "@teli/application/authors";
import { presentAuthorDetails, presentAuthorIndex, presentAuthorList } from "./authors.presenter.ts";
import { validateNewAuthor } from "./authors.validator.ts";

type AuthorsControllerDeps = {
  getAuthorIndex: GetAuthorIndex;
  getAuthorDetails: GetAuthorDetails;
  listAuthors: ListAuthors;
  listAuthorNames: ListAuthorNames;
  createAuthor: CreateAuthor;
  deleteAuthor: DeleteAuthor;
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

  const authorNameListHandler: RequestHandler = async function (_, res) {
    const authors = await deps.listAuthorNames();
    const dto = presentAuthorList(authors);
    res.json(dto);
  };

  const createAuthorHandler: RequestHandler = async function (req, res) {
    const newAuthor = validateNewAuthor(req.body);
    const savedAuthor = await deps.createAuthor(newAuthor);
    res.status(201).json({ id: savedAuthor });
  };

  const deleteAuthorHandler: RequestHandler = async function (req, res) {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid author id" });
      return;
    }
    await deps.deleteAuthor(id);
    res.sendStatus(204);
  };

  return {
    authorIndexHandler,
    authorDetailsHandler,
    authorListHandler,
    authorNameListHandler,
    createAuthorHandler,
    deleteAuthorHandler,
  };
}
