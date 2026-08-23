import { Document, Schema, model, type InferSchemaType } from "mongoose";

export const publicationSchema = new Schema({
  title: { type: String },
  "english title": { type: String },
  "other authors": { type: String },
  "document type": { type: String },
  genre: { type: String },
  language: { type: String },
  publisher: { type: String },
  "publication name": { type: String },
  source: { type: String },
  "publish location": { type: String },
  year: { type: Number },
  date: { type: Date },
  reference: { type: String },
  note: { type: String },
  link: { type: String },
  reception_type: { type: String }, // Just for importing receptions from excel
  target: { type: String }, // Just for importing receptions from excel
  receptions: { type: Object },
  receptionOf: { type: Array },
});

export type PublicationDocument = Document &
  InferSchemaType<typeof publicationSchema>;

export const PublicationModel = model("Publication", publicationSchema);
