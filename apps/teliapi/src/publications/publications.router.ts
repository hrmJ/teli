import { Router } from "express";
import { publicationsController } from "../composition.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const { viewReceptionsHandler, updateReceptionsHandler } =
  publicationsController;

export function composePublicationsRouter() {
  return Router()
    .get("/:id/receptions", viewReceptionsHandler)
    .put("/:id/receptions", authMiddleware, updateReceptionsHandler);
}
