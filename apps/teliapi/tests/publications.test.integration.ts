import { after, before, beforeEach, test } from "node:test";
import { authorFixture } from "./fixtures/authors.fixture.ts";
import {
  AuthorModel,
  connectMongoose,
  disconnectMongoose,
} from "@teli/infrastructure/mongoose";
import { resetDb } from "./helpers/db.ts";
import { testConfig } from "./config.ts";
import { publicationFixture } from "./fixtures/publications.fixture.ts";
import assert from "assert";

before(async () => {
  await connectMongoose(testConfig.mongoUrl);
});

after(async () => {
  await disconnectMongoose();
});

beforeEach(async () => {
  await resetDb();
});

test("titles can be searched", async () => {
  // Arrange

  const author = await AuthorModel.insertOne(
    authorFixture({
      publications: [
        publicationFixture({ title: "this match is" }),
        publicationFixture({ title: "thismatchis" }),
        publicationFixture({ title: "this not mtatch is" }),
        publicationFixture({ title: "this Match is" }),
        publicationFixture({ title: "this matc!h not is" }),
        publicationFixture({ title: "this is a match" }),
        publicationFixture({ title: "match this is!" }),
      ],
    } as any),
  );

  // Act
  const resp = await fetch(`${testConfig.baseUrl}/publications?title=match`);
  const json: any = await resp.json();
  assert.equal(json.publications.length, 5);

  assert.partialDeepStrictEqual(json, {
    publications: [
      { title: "this match is" },
      { title: "thismatchis" },
      { title: "this Match is" },
      { title: "this is a match" },
      { title: "match this is!" },
    ],
  });

  // Assert
  assert.equal(resp.status, 200);
});
