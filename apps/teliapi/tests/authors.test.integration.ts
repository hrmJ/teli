import assert from "node:assert";
import test, { beforeEach, before } from "node:test";
import { resetDb } from "./helpers/db.ts";
import { AuthorModel, connectMongoose } from "@teliapi/infrastructure/mongoose";
import { testConfig } from "./config.ts";
import { authorFixture } from "./fixtures/authors.fixture.ts";

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

  const resp = await fetch(`${testConfig.baseUrl}/authors/index`);

  assert.strictEqual(200, resp.status);
  const json = await resp.json();

  // Assert
  assert.deepEqual(["A", "E"], json);
});
