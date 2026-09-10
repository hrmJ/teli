import type { Publication } from "@teli/domain/publications";
import type { PublicationDocument } from "./publication.schema.ts";
import { nullToUndefined } from "@teli/language";

export function publicationToDomain(
  doc: PublicationDocument,
  authorName?: string,
): Publication {
  return {
    id: doc._id.toString(),
    author: authorName ?? "unknown",
    title: nullToUndefined(doc["title"]),
    documentType: nullToUndefined(doc["document type"]),
    englishTitle: nullToUndefined(doc["english title"]),
    otherAuthors: nullToUndefined(doc["other authors"]),
    publicationName: nullToUndefined(doc["publication name"]),
    publishLocation: nullToUndefined(doc["publish location"]),
    year: nullToUndefined(doc["year"]),
    receptions: nullToUndefined(doc.receptions),
    publisher: nullToUndefined(doc.publisher),
    date: nullToUndefined(doc.date),
    genre: nullToUndefined(doc.genre),
    language: nullToUndefined(doc.language),
    link: nullToUndefined(doc.link),
    note: nullToUndefined(doc.note),
    reference: nullToUndefined(doc.reference),
    source: nullToUndefined(doc.source),
  };
}
