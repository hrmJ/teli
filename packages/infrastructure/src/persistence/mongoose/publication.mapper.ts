import type { Publication } from "@teli/domain/publications";
import type { PublicationDocument } from "./publication.schema.ts";
import { nullToUndefined } from "@teli/language";

export function publicationToDomain(doc: PublicationDocument, authorName?: string): Publication {
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
    receptionOf: doc.receptionOf,
    date: nullToUndefined(doc.date?.toISOString()),
    genre: nullToUndefined(doc.genre),
    language: nullToUndefined(doc.language),
    link: nullToUndefined(doc.link),
    note: nullToUndefined(doc.note),
    reference: nullToUndefined(doc.reference),
    source: nullToUndefined(doc.source),
  };
}

export function publicationToPersistence(publication: Partial<Publication>) {
  return Object.fromEntries(
    Object.entries({
      title: publication.title,
      "english title": publication.englishTitle,
      "other authors": publication.otherAuthors,
      "document type": publication.documentType,
      genre: publication.genre,
      language: publication.language,
      publisher: publication.publisher,
      "publication name": publication.publicationName,
      source: publication.source,
      "publish location": publication.publishLocation,
      year: publication.year,
      date: publication.date,
      reference: publication.reference,
      note: publication.note,
      link: publication.link,
      receptions: publication.receptions,
      receptionOf: publication.receptionOf,
    }).filter(([, value]) => value !== undefined),
  );
}
