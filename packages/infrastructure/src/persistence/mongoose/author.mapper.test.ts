import type { Author } from "@teli/domain/authors";
import assert from "node:assert";
import { describe, it } from "node:test";
import { authorToDomain } from "./author.mapper.ts";

const sampleAuthor = {
  _id: "some-id",
  name: "George Orwell",
  pseudonyms: "Eric Arthur Blair",
  "other names": "Eric Blair",
  "year of birth": 1903,
  "year of death": 1950,
  country: "United Kingdom",
  language: "English",
  "biographical details": "George Orwell, was an English writer",
  "professional details": "Writer, journalist, and political commentator",
  publications: [],
};

describe("authorToDomain", () => {
  it("correctly maps an author to domain object", () => {
    const expected: Author = {
      id: sampleAuthor._id,
      name: sampleAuthor.name,
      pseudonyms: sampleAuthor.pseudonyms,
      otherNames: sampleAuthor["other names"],
      yearOfBirth: sampleAuthor["year of birth"],
      yearOfDeath: sampleAuthor["year of death"],
      country: sampleAuthor.country,
      language: sampleAuthor.language,
      biographicalDetails: sampleAuthor["biographical details"],
      professionalDetails: sampleAuthor["professional details"],
      publications: sampleAuthor.publications,
    };

    const result = authorToDomain(sampleAuthor as any);

    assert.deepEqual(result, expected);
  });
});
