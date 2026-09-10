import type { RequestHandler } from "express";
import { presentPublication } from "./publications.presenter.ts";
import type { GetReceptions } from "@teli/application/publications";

type PublicationsControllerDeps = {
  getReceptions: GetReceptions;
};

export function composePublicationsController(
  deps: PublicationsControllerDeps,
) {
  const receptionHandler: RequestHandler = async function (req, res) {
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
  return {
    receptionHandler,
  };
}
