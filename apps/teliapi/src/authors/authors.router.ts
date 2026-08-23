import { Router } from "express";
import { authorsController } from "../composition.ts";

export function composeAuthorRouter() {
  return Router().get("/index", authorsController.authorIndexHandler);
}
