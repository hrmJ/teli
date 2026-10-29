import type { RequestHandler } from "express";
import { presentPublication } from "./publications.presenter.ts";
import type { AddPublicationReceptions, GetPublicationById, GetPublications, GetReceptions } from "@teli/application/publications";
import type { AddPublication, GetAuthorById } from "@teli/application/authors";
import { validateNewPublication, validateNewReception, validatePublicationId } from "./publications.validator.ts";

type PublicationsControllerDeps = {
  getReceptions: GetReceptions;
  getPublications: GetPublications;
  getById: GetPublicationById;
  addPublicationReception: AddPublicationReceptions;
  getAuthorById: GetAuthorById;
  addPublication: AddPublication;
};

export function composePublicationsController(deps: PublicationsControllerDeps) {
  const viewReceptionsHandler: RequestHandler = async function (req, res) {
    validatePublicationId(req, res);
    const id = req.params.id;
    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "Missing publication id" });
      return;
    }
    const receptions = await deps.getReceptions(id);

    res.json({
      translations: receptions?.translations.map(presentPublication) ?? [],
      adaptations: receptions?.adaptations.map(presentPublication) ?? [],
      articles: receptions?.articles.map(presentPublication) ?? [],
      other: receptions?.other.map(presentPublication) ?? [],
      reviews: receptions?.reviews.map(presentPublication) ?? [],
    });
  };

  const updateReceptionsHandler: RequestHandler = async function (req, res) {
    const targetId = req.params.id;
    if (!targetId || typeof targetId !== "string") {
      res.status(400).json({ error: "Missing publication id" });
      return;
    }

    const { receptionType, existingPublication, newPublication } = validateNewReception(req.body);

    await deps.addPublicationReception({
      targetId,
      receptionType,
      publication: newPublication,
      existingPublicationId: existingPublication?.id,
    });

    res.sendStatus(204);
  };

  const viewPublicationsHandler: RequestHandler = async function (req, res) {
    const title = req.query.title;
    if (!title || typeof title !== "string") {
      res.status(400).json({ error: "No search params in query" });
      return;
    }
    const publicationsRaw = await deps.getPublications(title);
    const publications = publicationsRaw.publications.map(presentPublication);

    res.status(200).json({ publications });
  };

  const createPublicationHandler: RequestHandler = async function (req, res) {
    const { publication, authorId } = req.body;
    const author = await deps.getAuthorById(authorId);
    if (!author) {
      res.status(422).json({ error: "Invalid author" });
      return;
    }
    const newPublication = validateNewPublication(publication);
    await deps.addPublication(authorId, newPublication);
    res.status(201).json({ status: "success" });
  };

  return {
    viewReceptionsHandler,
    updateReceptionsHandler,
    viewPublicationsHandler,
    createPublicationHandler,
  };
}
