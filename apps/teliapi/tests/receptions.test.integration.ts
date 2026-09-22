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

before(async () => {
  await connectMongoose(testConfig.mongoUrl);
});

after(async () => {
  await disconnectMongoose();
});

beforeEach(async () => {
  await resetDb();

  const author = await AuthorModel.insertOne(
    authorFixture({ publications: [publicationFixture()] } as any),
  );

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

test("Authenticated users can link receptions", async () => {
  const tokens = await loginTestUser();
  try {
    const resp = await fetch(
      `${testConfig.baseUrl}/publications/${originalId}/receptions`,
      {
        method: "PUT",
        body: "",
        headers: {
          authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );
    // Assert
    assert.equal(resp.status, 201);
  } finally {
    await logoutTestUser(tokens.refresh_token);
  }
});
