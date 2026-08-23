import express from "express";
import { statusHandler } from "./system/system.controller.ts";
import { composeAuthorRouter } from "./authors/authors.router.ts";

export function makeApp() {
  const app = express();
  app.use(express.json());

  app.use("/status", statusHandler);
  app.use("/authors", composeAuthorRouter());

  return app;
}
