import express from "express";
import { statusHandler } from "./system/system.controller.ts";
import { composeAuthorRouter } from "./authors/authors.router.ts";
import cors from "cors";
import { composePublicationsRouter } from "./publications/publications.router.ts";

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.use("/status", statusHandler);
  app.use("/authors", composeAuthorRouter());
  app.use("/publications", composePublicationsRouter());

  return app;
}
