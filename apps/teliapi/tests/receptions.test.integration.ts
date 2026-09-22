import assert from "node:assert";
import test, { beforeEach, before, after } from "node:test";
import { resetDb } from "./helpers/db.ts";
import {
  AuthorModel,
  connectMongoose,
  disconnectMongoose,
} from "@teli/infrastructure/mongoose";
import { testConfig } from "./config.ts";
import { publicationFixture } from "./fixtures/publications.fixture.ts";
import { authorFixture } from "./fixtures/authors.fixture.ts";

before(async () => {
  await connectMongoose(testConfig.mongoUrl);
});

after(async () => {
  await disconnectMongoose();
});

beforeEach(async () => {
  await resetDb();
});

test("Unauthenticated users cant link receptions", async () => {
  //Arrange
  const author = await AuthorModel.insertOne(
    authorFixture({ publications: [publicationFixture()] } as any),
  );
  const originalId = author.publications.at(0)?._id;
  // Act
  const resp = await fetch(
    `${testConfig.baseUrl}/publications/${originalId}/receptions`,
    { method: "PUT", body: "" },
  );
  console.log("DONE!");
  assert.equal(resp.status, 401);
});
