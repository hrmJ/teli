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
import {
  loginTestUser,
  logoutTestUser,
  type KeycloakTokens,
} from "./helpers/auth.ts";

let originalId: string | undefined;
let originalAuthorId: string | undefined;

before(async () => {
  await connectMongoose(testConfig.mongoUrl);
});

after(async () => {
  await resetDb();
  await disconnectMongoose();
});

beforeEach(async () => {
  await resetDb();

  const author = await AuthorModel.insertOne(
    authorFixture({ publications: [publicationFixture()] } as any),
  );

  originalAuthorId = author._id.toString();
  originalId = author.publications.at(0)?._id.toString();
});

test("Unauthenticated users cant link receptions", async () => {
  // Act
  const resp = await fetch(
    `${testConfig.baseUrl}/publications/${originalId}/receptions`,
    { method: "PUT", body: "" },
  );
  // Assert
  assert.equal(resp.status, 401);
});

test("Authenticated users can link existing works as receptions", async () => {
  const receptionAuthor = await AuthorModel.insertOne(
    authorFixture({ publications: [publicationFixture()] } as any),
  );
  const receptionAuthorId = receptionAuthor._id.toString();
  const receptionId = receptionAuthor.publications.at(0)?._id.toString();
  const receptionTitle = receptionAuthor.publications.at(0)?.title;

  const tokens = await loginTestUser();
  try {
    const resp = await fetch(
      `${testConfig.baseUrl}/publications/${originalId}/receptions`,
      {
        method: "PUT",
        body: JSON.stringify({
          receptionType: "translation",
          existingPublication: { title: receptionTitle, id: receptionId },
          newOrExistingPublication: "existing",
        }),
        headers: {
          authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    // Assert
    assert.equal(resp.status, 201);
    const updatedOriginalAuthor = await AuthorModel.findById(originalAuthorId);
    const updatedReceptions =
      updatedOriginalAuthor?.publications.at(0)?.receptions;
    assert.strictEqual(updatedReceptions, { translations: [receptionId] });

    const updatedReceptionAuthor =
      await AuthorModel.findById(receptionAuthorId);
    const updatedReceptionsOf =
      updatedReceptionAuthor?.publications.at(0)?.receptionOf;
    assert.strictEqual(updatedReceptionsOf, [originalId]);
  } finally {
    await logoutTestUser(tokens.refresh_token);
  }
});
