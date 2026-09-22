import type { Request, Response } from "express";

export function validatePublicationId(request: Request, response: Response) {
  const id = request.params.id;
  if (!id || typeof id !== "string") {
    response.status(400).json({ error: "Missing publication id" });
    return;
  }
}
