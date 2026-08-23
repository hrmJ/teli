import type { AuthorDocument } from "./author.schema.ts";
import type { Author } from "@teliapi/domain/authors";
import { nullToUndefined } from "@teliapi/language";

export function authorToDomain(doc: AuthorDocument): Author {
  return {
    id: doc._id.toString(),
    name: doc.name,
    pseudonyms: nullToUndefined(doc.pseudonyms),
    otherNames: nullToUndefined(doc["other names"]),
    yearOfBirth: nullToUndefined(doc["year of birth"]),
    yearOfDeath: nullToUndefined(doc["year of death"]),
    country: nullToUndefined(doc.country),
    language: nullToUndefined(doc.language),
    biographicalDetails: nullToUndefined(doc["biographical details"]),
    professionalDetails: nullToUndefined(doc["professional details"]),
    publications: [],
  };
}
