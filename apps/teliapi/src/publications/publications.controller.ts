import type { RequestHandler } from "express";
import { presentPublication } from "./publications.presenter.ts";
import type {
  AddPublicationReceptions,
  FilterPublications,
  GetPublicationById,
  GetPublications,
  GetReceptions,
  UnlinkPublicationReceptions,
  UpdatePublication,
} from "@teli/application/publications";
import type { AddPublication, GetAuthorById } from "@teli/application/authors";
import {
  validateFilterQuery,
  validateNewPublication,
  validateNewReception,
  validatePublicationId,
  validateReceptionType,
} from "./publications.validator.ts";

type PublicationsControllerDeps = {
  getReceptions: GetReceptions;
  getPublications: GetPublications;
  getById: GetPublicationById;
  addPublicationReception: AddPublicationReceptions;
  getAuthorById: GetAuthorById;
  addPublication: AddPublication;
  updatePublication: UpdatePublication;
  unlinkReception: UnlinkPublicationReceptions;
  filterPublications: FilterPublications;
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
    const { title, ...queryParams } = req.query;

    // Mere title as a search param is handled separately
    if (typeof title === "string") {
      const publicationsRaw = await deps.getPublications(title);
      const publications = publicationsRaw.publications.map(presentPublication);
      res.status(200).json({ publications });
      return;
    }

    const { query, receptionType, originals } = validateFilterQuery(queryParams);
    const receptionTypes = Array.isArray(receptionType) ? receptionType : [receptionType];

    const publicationsRaw = await deps.filterPublications({
      query,
      receptionTypes: receptionTypes.filter((receptionType) => receptionType !== undefined),
      originals,
    });

    const publications = publicationsRaw.publications.map(presentPublication);
    res.status(200).json({ publications });
    return;
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

  const updatePublicationHandler: RequestHandler = async function (req, res) {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid author id" });
      return;
    }
    const { publication, authorId } = req.body;
    const newAuthorId = typeof authorId === "string" ? authorId : undefined;
    const newPublication = validateNewPublication(publication);
    const updatedPublication = await deps.updatePublication(id, newPublication, newAuthorId);
    res.status(200).json({ publication: updatedPublication });
  };

  const unlinkReceptionsHandler: RequestHandler = async function (req, res) {
    const { id, receptionId } = req.params;
    if (typeof id !== "string" || typeof receptionId !== "string") {
      res.status(400).json({ error: "Invalid publication or reception id" });
      return;
    }
    const receptionType = validateReceptionType(req.query.receptionType);
    const updatedPublication = await deps.unlinkReception(id, receptionId, receptionType);

    res.status(204).json({ publication: updatedPublication });
  };

  return {
    viewReceptionsHandler,
    updateReceptionsHandler,
    viewPublicationsHandler,
    createPublicationHandler,
    updatePublicationHandler,
    unlinkReceptionsHandler,
  };
}
