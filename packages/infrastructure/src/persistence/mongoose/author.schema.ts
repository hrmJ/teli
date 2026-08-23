import { Document, Schema, model, type InferSchemaType } from "mongoose";
import { publicationSchema } from "./publication.schema.ts";

const authorSchema = new Schema({
  name: { type: String, default: "?", sparse: true },
  pseudonyms: { type: String },
  "other names": { type: String },
  "year of birth": { type: Number },
  "year of death": { type: Number },
  country: { type: String },
  language: { type: String },
  "biographical details": { type: String },
  "professional details": { type: String },
  publications: [publicationSchema],
});

export type AuthorDocument = Document & InferSchemaType<typeof authorSchema>;

export const AuthorModel = model("Author", authorSchema);
