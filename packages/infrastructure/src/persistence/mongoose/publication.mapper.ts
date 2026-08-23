import type { Publication } from "@teliapi/domain/publications";
import type { PublicationDocument } from "./publication.schema.ts";
import { nullToUndefined } from "@teliapi/language";

export function publicationToDomain(doc: PublicationDocument): Publication {
  return {
    id: doc._id.toString(),
    title: nullToUndefined(doc["title"]),
    documentType: nullToUndefined(doc["document type"]),
    englishTitle: nullToUndefined(doc["english title"]),
    otherAuthors: nullToUndefined(doc["other authors"]),
    publicationName: nullToUndefined(doc["publication name"]),
    publishLocation: nullToUndefined(doc["publish location"]),
    year: nullToUndefined(doc["year"]),
    receptions: nullToUndefined(doc.receptions),
  };
}
