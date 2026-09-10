import type { PublicationDocument } from "@teli/infrastructure/mongoose";

export function publicationFixture(
  overrides: Partial<PublicationDocument> = {},
) {
  return {
    title: "Pitkä yksinäisyys",
    "english title": "Solitude",
    "other authors": "Alituisa Anna",
    "document type": "book",
    genre: "romance",
    language: "Finnish",
    publisher: "Otava",
    "publication name": "Kokoelma 1",
    source: "Kirjaston kanta",
    "publish location": "Helsinki",
    year: 1987,
    date: new Date(1987, 1, 5),
    reference: "some",
    note: "btw",
    link: "https://some.url",
    ...overrides,
  };
}
