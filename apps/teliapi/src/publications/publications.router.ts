import { Router } from "express";
import { publicationsController } from "../composition.ts";

export function composePublicationsRouter() {
  return Router().get(
    "/:id/receptions",
    publicationsController.receptionHandler,
  );
}
