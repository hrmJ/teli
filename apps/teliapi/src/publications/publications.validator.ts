import { NewPublicationDtoSchema } from "@teli/contracts/publications";
import { NewReceptionDataSchema, receptionTypeSchema } from "@teli/contracts/receptions";
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

export function validateReceptionType(data: unknown) {
  const parsed = v.safeParse(receptionTypeSchema, data);
  if (!parsed.success) {
    console.log(parsed.issues);
    throw new Error("Invalid reception type");
  }
  return parsed.output;
}

export function validateFilterQuery(data: unknown) {
  const filterQuerySchema = v.object({
    query: v.pipe(v.string(), v.minLength(3, "The query string must be 3 or more UTF-16 code units long.")),
    receptionType: v.optional(v.union([v.array(receptionTypeSchema), receptionTypeSchema])),
    originals: v.optional(
      v.pipe(
        v.string(),
        v.transform((originals) => (originals === "true" ? true : false)),
      ),
    ),
  });
  const parsed = v.safeParse(filterQuerySchema, data);
  if (!parsed.success) {
    console.log(parsed.issues);
    throw new Error("Invalid reception type");
  }
  return parsed.output;
}
