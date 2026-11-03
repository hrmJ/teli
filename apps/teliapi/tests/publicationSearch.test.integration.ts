import { after, before, beforeEach, test } from "node:test";
import { authorFixture } from "./fixtures/authors.fixture.ts";
import { AuthorModel, connectMongoose, disconnectMongoose } from "@teli/infrastructure/mongoose";
import { resetDb } from "./helpers/db.ts";
import { testConfig } from "./config.ts";
import assert from "assert";

before(async () => {
  await connectMongoose(testConfig.mongoUrl);
});

after(async () => {
  await disconnectMongoose();
});

beforeEach(async () => {
  await resetDb();
  await AuthorModel.insertMany([
    authorFixture({ name: "Virtanen Vilma" } as any),
    authorFixture({ name: "Virtanen Valma" } as any),
    authorFixture({ name: "Mustonen Enni" } as any),
    authorFixture({ name: "Mastonen Anni" } as any),
  ]);
});

test("user can search for all authors with a matching name", async () => {
  const resp = await fetch(`${testConfig.baseUrl}/authors?query=Virtanen`);
  const json: any = await resp.json();
  assert.equal(resp.status, 200);
  assert.equal(json.length, 2);

  const resp2 = await fetch(`${testConfig.baseUrl}/authors?query=nni`);
  const json2: any = await resp2.json();
  assert.equal(resp2.status, 200);
  assert.equal(json2.length, 2);

  const resp3 = await fetch(`${testConfig.baseUrl}/authors?query=nen`);
  const json3: any = await resp3.json();
  assert.equal(resp3.status, 200);
  assert.equal(json3.length, 4);
});
