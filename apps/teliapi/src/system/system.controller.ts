import type { RequestHandler } from "express";

export const statusHandler: RequestHandler = async function (_, res) {
  res.json({ status: "ok" });
};
