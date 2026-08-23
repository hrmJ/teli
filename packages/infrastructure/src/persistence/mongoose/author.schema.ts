import { Document, Schema, model, type InferSchemaType } from "mongoose";

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
  publications: [],
});

export type AuthorDocument = Document & InferSchemaType<typeof authorSchema>;

export const AuthorModel = model("Author", authorSchema);
