import type { RequestHandler } from "express";
import { presentPublication } from "./publications.presenter.ts";
import type { GetReceptions } from "@teli/application/publications";
import { validatePublicationId } from "./publications.validator.ts";

type PublicationsControllerDeps = {
  getReceptions: GetReceptions;
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

  return {
    viewReceptionsHandler,
    updateReceptionsHandler,
  };
}
