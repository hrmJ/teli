import { Router } from "express";
import { publicationsController } from "../composition.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const { viewReceptionsHandler, updateReceptionsHandler, viewPublicationsHandler, createPublicationHandler, updatePublicationHandler } =
  publicationsController;

export function composePublicationsRouter() {
  return Router()
    .get("", viewPublicationsHandler)
    .post("", authMiddleware, createPublicationHandler)
    .put("/:id", authMiddleware, updatePublicationHandler)
    .get("/:id/receptions", viewReceptionsHandler)
    .put("/:id/receptions", authMiddleware, updateReceptionsHandler);
}
