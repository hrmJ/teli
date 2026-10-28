import { NewPublicationDtoSchema } from "@teli/contracts/publications";
import { NewReceptionDataSchema } from "@teli/contracts/receptions";
import type { Request, Response } from "express";
import * as v from "valibot";

export function validatePublicationId(request: Request, response: Response) {
  const id = request.params.id;
  if (!id || typeof id !== "string") {
    response.status(400).json({ error: "Missing publication id" });
    return;
  }
}

export function validateNewReception(data: unknown) {
  const parsed = v.safeParse(NewReceptionDataSchema, data);
  if (!parsed.success) {
    console.log(parsed.issues);
    throw new Error("Invalid reception data");
  }
  return parsed.output;
}

export function validateNewPublication(data: unknown) {
  const parsed = v.safeParse(NewPublicationDtoSchema, data);
  if (!parsed.success) {
    console.log(parsed.issues);
    throw new Error("Invalid publication data");
  }
  return parsed.output;
}

export function formatDate(date: unknown) {
  if (date instanceof Date) return date;
  if (!date) return date;
  if (typeof date === "string") return new Date(date);
}
