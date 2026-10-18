import * as v from "valibot";
import {
  NewPublicationDtoSchema,
  PublicationDtoSchema,
} from "./publications.ts";

export const ReceptionDtoSchema = v.object({
  translations: v.array(PublicationDtoSchema),
  reviews: v.array(PublicationDtoSchema),
  adaptations: v.array(PublicationDtoSchema),
  articles: v.array(PublicationDtoSchema),
  other: v.array(PublicationDtoSchema),
});

export type ReceptionDto = v.InferOutput<typeof ReceptionDtoSchema>;

export const receptionTypeList = [
  "translation",
  "review",
  "adaptation",
  "article",
  "other",
] as const;

export const NewReceptionDataSchema = v.object({
  receptionType: v.picklist(receptionTypeList),
  existingPublication: v.optional(
    v.object({ title: v.string(), id: v.string() }),
  ),
  newOrExistingPublication: v.picklist(["new", "existing"]),
  newPublication: v.optional(NewPublicationDtoSchema),
});

export type NewReceptionData = v.InferOutput<typeof NewReceptionDataSchema>;
