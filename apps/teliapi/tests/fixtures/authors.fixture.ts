import type { AuthorDocument } from "@teli/infrastructure/mongoose";

export function authorFixture(overrides: Partial<AuthorDocument> = {}) {
  return {
    name: "Mary Smith",
    pseudonyms: "Smithy",
    "other names": "Maria",
    "year of birth": 1900,
    "year of death": 1977,
    country: "Finland",
    language: "Finnish",
    "biographical details": "Was born in Sonkajarvi, had a tragic childhood.",
    "professional details": "M.S. was a tremendous journalist",
    publications: [],
    ...overrides,
  };
}
