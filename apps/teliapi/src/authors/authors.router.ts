import { Router } from "express";
import { authorsController } from "../composition.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

export function composeAuthorRouter() {
  return Router()
    .get("/letters", authorsController.authorIndexHandler)
    .get("/names", authorsController.authorNameListHandler)
    .get("/", authorsController.authorListHandler)
    .post("/", authMiddleware, authorsController.createAuthorHandler)
    .delete("/:id", authMiddleware, authorsController.deleteAuthorHandler)
    .get("/:name", authorsController.authorDetailsHandler);
}
