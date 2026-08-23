import * as v from "valibot";

export const PublicationDtoSchema = v.object({
  id: v.string(),
  author: v.string(),
  title: v.optional(v.string()),
  englishTitle: v.optional(v.string()),
  otherAuthors: v.optional(v.string()),
  documentType: v.optional(v.string()),
  genre: v.optional(v.string()),
  language: v.optional(v.string()),
  publisher: v.optional(v.string()),
  publicationName: v.optional(v.string()),
  source: v.optional(v.string()),
  publishLocation: v.optional(v.string()),
  year: v.optional(v.number()),
  date: v.optional(v.date()),
  reference: v.optional(v.string()),
  note: v.optional(v.string()),
  link: v.optional(v.string()),
});

export type PublicationDto = v.InferOutput<typeof PublicationDtoSchema>;
