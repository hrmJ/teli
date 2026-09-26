import type { RequestHandler } from "express";
import { presentPublication } from "./publications.presenter.ts";
import type {
  GetPublications,
  GetReceptions,
} from "@teli/application/publications";
import { validatePublicationId } from "./publications.validator.ts";

type PublicationsControllerDeps = {
  getReceptions: GetReceptions;
  getPublications: GetPublications;
};

export function composePublicationsController(
  deps: PublicationsControllerDeps,
) {
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
    const id = req.params.id;
    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "Missing publication id" });
      return;
    }
    res.status(201).json({ status: "ok" });
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

  return {
    viewReceptionsHandler,
    updateReceptionsHandler,
    viewPublicationsHandler,
  };
}
