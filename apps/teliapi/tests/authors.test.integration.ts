import assert from "node:assert";
import test, { beforeEach, before } from "node:test";
import { resetDb } from "./helpers/db.ts";
import { AuthorModel, connectMongoose } from "@teli/infrastructure/mongoose";
import { testConfig } from "./config.ts";
import { authorFixture } from "./fixtures/authors.fixture.ts";
import { publicationFixture } from "./fixtures/publications.fixture.ts";

before(async () => {
  await connectMongoose(testConfig.mongoUrl);
});

beforeEach(async () => {
  await resetDb();
});

test("Indexing by letters responds with letters of the authors in the db", async () => {
  // TODO: The app currently expects a single name in the format Lastname Firstname

  // Arrange
  await AuthorModel.insertMany([
    authorFixture({ name: "Esimerkki Aino" }),
    authorFixture({ name: "Alaviite Aino" }),
    authorFixture({ name: "Anomaly Lilly" }),
  ]);

  // Act

  const resp = await fetch(`${testConfig.baseUrl}/authors/letters`);

  assert.strictEqual(200, resp.status);
  const json = (await resp.json()) as any;

  // Assert
  assert.deepEqual({ letters: ["A", "E"] }, json);
});

test("Listing by letter returns all authors' family names beginning with the given letter", async () => {
  // Arrange
  await AuthorModel.insertMany([
    authorFixture({ name: "Esimerkki Aino" }),
    authorFixture({ name: "Alaviite Aino" }),
    authorFixture({ name: "Anomaly Lilly" }),
  ]);

  // Act
  const resp = await fetch(`${testConfig.baseUrl}/authors?letter=A`);
  const json = (await resp.json()) as any;

  // Assert
  assert.equal(json.length, 2);
  assert.partialDeepStrictEqual(json.at(0), { name: "Alaviite Aino" });
  assert.partialDeepStrictEqual(json.at(1), { name: "Anomaly Lilly" });
});

test("Viewing details responds by an author's details", async () => {
  // Arrange
  const receptionAuthorDetails = {
    publications: [publicationFixture()],
  } as any;

  // Insert a publication first, then mark that as a translation
  const receptionAuthor = await AuthorModel.insertOne(
    authorFixture(receptionAuthorDetails),
  );
  const [reception] = receptionAuthor.publications;
  const receptionId = reception._id.toString();

  const details = {
    name: "Esimerkki Aino",
    pseudonyms: "Ainukka",
    country: "Finland",
    publications: [
      publicationFixture({
        receptions: { translations: [receptionId] },
      }),
    ],
  } as any;

  await AuthorModel.insertOne(authorFixture(details));

  // Act
  const resp = await fetch(`${testConfig.baseUrl}/authors/${details.name}`);
  const json = (await resp.json()) as any;

  // Assert
  const expectedPublicationOutput = {
    title: "Pitkä yksinäisyys",
    documentType: "book",
    englishTitle: "Solitude",
    otherAuthors: "Alituisa Anna",
    publicationName: "Kokoelma 1",
    publishLocation: "Helsinki",
    year: 1987,
    receptions: {
      translations: [receptionId],
    },
  };
  assert.partialDeepStrictEqual(json, {
    ...details,
    publications: [expectedPublicationOutput],
  });
});

test("Receptions can be fetched by publication id", async () => {
  // Arrange
  const receptionAuthorDetails = {
    publications: [publicationFixture({ title: "Dlinnoje odinnotsestvo" })],
  } as any;

  // Insert a publication first, then mark that as a translation
  const receptionAuthor = await AuthorModel.insertOne(
    authorFixture(receptionAuthorDetails),
  );
  const [reception] = receptionAuthor.publications;
  const receptionId = reception._id.toString();

  const details = {
    name: "Esimerkki Aino",
    pseudonyms: "Ainukka",
    country: "Finland",
    publications: [
      publicationFixture({
        receptions: { translations: [receptionId] },
      }),
    ],
  } as any;

  const originalAuthor = await AuthorModel.insertOne(authorFixture(details));
  const original = originalAuthor.publications.at(0);
  const originalId = original?._id;

  // Act
  const resp = await fetch(
    `${testConfig.baseUrl}/publications/${originalId}/receptions`,
  );

  // Assert
  assert.equal(resp.status, 200);
  const json = await resp.json();
  assert.partialDeepStrictEqual(json, {
    translations: [
      {
        id: receptionId,
        year: 1987,
        documentType: "book",
        englishTitle: "Solitude",
        otherAuthors: "Alituisa Anna",
      },
    ],
    adaptations: [],
    articles: [],
    other: [],
    reviews: [],
  });
});
