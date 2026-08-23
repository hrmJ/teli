import type { PublicationDto } from "@teliapi/contracts/publications";
import type { Publication } from "@teliapi/domain/publications";

export function presentPublication(result: Publication | null): PublicationDto {
  if (!result) throw new Error("Invalid publication entry");
  return {
    title: result.title,
    id: result.id,
    year: result.year,
    documentType: result.documentType,
    englishTitle: result.englishTitle,
    otherAuthors: result.otherAuthors,
    genre: result.genre,
    language: result.language,
    publisher: result.publisher,
    publicationName: result.publicationName,
    source: result.source,
    publishLocation: result.publishLocation,
    date: result.date,
    reference: result.reference,
    note: result.note,
    link: result.link,
  };
}
