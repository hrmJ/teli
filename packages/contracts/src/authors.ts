import * as v from "valibot";
import { PublicationDtoSchema } from "./publications.ts";

export const AuthorDtoSchema = v.object({
  id: v.string(),
  name: v.string(),
  pseudonyms: v.optional(v.string()),
  otherNames: v.optional(v.string()),
  yearOfBirth: v.optional(v.number()),
  yearOfDeath: v.optional(v.number()),
  country: v.optional(v.string()),
  language: v.optional(v.string()),
  biographicalDetails: v.optional(v.string()),
  professionalDetails: v.optional(v.string()),
  publications: v.array(PublicationDtoSchema),
});

export type AuthorListItemDto = {
  name: string;
  yearOfBirth?: number;
  yearOfDeath?: number;
};

export type GetAuthorsResponse = {
  authors: AuthorListItemDto[];
};

export type AuthorDto = v.InferOutput<typeof AuthorDtoSchema>;

export const AuthorIndexDtoSchema = v.object({
  letters: v.array(v.string()),
});

export const AuthorListDtoSchema = v.array(
  v.object({
    name: v.string(),
  }),
);

export type AuthorIndexDto = v.InferOutput<typeof AuthorIndexDtoSchema>;
export type AuthorListDto = v.InferOutput<typeof AuthorListDtoSchema>;
