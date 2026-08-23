import * as v from "valibot";
import { PublicationDtoSchema } from "./publications.ts";

export const ReceptionDtoSchema = v.object({
  translations: v.array(PublicationDtoSchema),
  reviews: v.array(PublicationDtoSchema),
  adaptations: v.array(PublicationDtoSchema),
  articles: v.array(PublicationDtoSchema),
  other: v.array(PublicationDtoSchema),
});

export type ReceptionDto = v.InferOutput<typeof ReceptionDtoSchema>;
