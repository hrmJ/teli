import { Router } from "express";
import { authorsController } from "../composition.ts";

export function composeAuthorRouter() {
  return Router()
    .get("/letters", authorsController.authorIndexHandler)
    .get("/", authorsController.authorListHandler)
    .get("/:name", authorsController.authorDetailsHandler);
}
