import { after, before, beforeEach, test } from "node:test";
import { authorFixture } from "./fixtures/authors.fixture.ts";
import { AuthorModel, connectMongoose, disconnectMongoose } from "@teli/infrastructure/mongoose";
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

  const extractId = (pub: { _id: any }) => pub._id.toString();

  const olaf = await AuthorModel.insertOne(
    authorFixture({
      name: "Original Olaf",
      publications: [publicationFixture({ title: "olafs pub 1" }), publicationFixture({ title: "olafs pub 2" })],
    } as any),
  );
  const [olaf1Id, olaf2Id] = olaf.publications.map(extractId);
  const [olaf1, olaf2] = olaf.publications;

  const olli = await AuthorModel.insertOne(
    authorFixture({
      name: "Original Olli",
      publications: [publicationFixture({ title: "ollis pub 1" }), publicationFixture({ title: "ollis pub 2" })],
    } as any),
  );
  const [olli1, olli2] = olli.publications;
  const [olli1Id, olli2Id] = olli.publications.map(extractId);

  const ralph = await AuthorModel.insertOne(
    authorFixture({
      name: "Reception Ralph",
      publications: [
        publicationFixture({ title: "ralphs pub 1", receptionOf: [olaf1Id] }),
        publicationFixture({ title: "ralphs pub 2", receptionOf: [olaf2Id] }),
        publicationFixture({ title: "ralphs pub 3", receptionOf: [olaf2Id] }),
      ],
    } as any),
  );

  const [ralph1Id, ralhp2Id, ralhp3Id] = ralph.publications.map(extractId);
  olaf1.set("receptions", { translations: [ralph1Id], adaptations: [], articles: [ralhp2Id], other: [], reviews: [] });
  olaf2.set("receptions", { translations: [], adaptations: [ralhp3Id], articles: [], other: [], reviews: [] });
  await olaf.save();

  const rolle = await AuthorModel.insertOne(
    authorFixture({
      name: "Reception Rolle",
      publications: [
        publicationFixture({ title: "rolles pub 1", receptionOf: [olli1Id] }),
        publicationFixture({ title: "rolles pub 2", receptionOf: [olli2Id] }),
      ],
    } as any),
  );

  const [rolle1Id, rolle2Id] = rolle.publications.map(extractId);
  olli1.set("receptions", { translations: [rolle1Id], adaptations: [], articles: [], other: [], reviews: [] });
  olli2.set("receptions", { translations: [], adaptations: [], articles: [], other: [], reviews: [rolle2Id] });
  await olli.save();
});

test("user can search for all * with a matching title", async () => {
  // 1. Search by title or author and perhaps some other field like publication
  // 2. Filter by reception type (only show translations and adaptaions / only show originals)
  const resp1 = await fetch(`${testConfig.baseUrl}/publications?query=pub`);
  const json1: any = await resp1.json();
  const resp2 = await fetch(`${testConfig.baseUrl}/publications?query=pub 1`);
  const json2: any = await resp2.json();

  // Assert

  assert.equal(resp1.status, 200);

  // All publications
  assert.equal(json1.publications.length, 9);
  assert.deepStrictEqual(
    json1.publications.map((pub: any) => pub.title),
    [
      "olafs pub 1",
      "olafs pub 2",
      "ollis pub 1",
      "ollis pub 2",
      "ralphs pub 1",
      "ralphs pub 2",
      "ralphs pub 3",
      "rolles pub 1",
      "rolles pub 2",
    ],
  );

  // Each author's first publication
  assert.equal(json2.publications.length, 4);
  assert.deepStrictEqual(
    json2.publications.map((pub: any) => pub.title),
    ["olafs pub 1", "ollis pub 1", "ralphs pub 1", "rolles pub 1"],
  );
});

test("user can search for all translations with a matching title", async () => {
  // 1. Search by title or author and perhaps some other field like publication
  // 2. Filter by reception type (only show translations and adaptaions / only show originals)
  const resp = await fetch(`${testConfig.baseUrl}/publications?query=pub&receptionType=translation`);
  const json: any = await resp.json();

  // Assert
  assert.equal(resp.status, 200);

  // All publications
  assert.equal(json.publications.length, 2);
});

test("user can search for all translations and articles  with a matching title", async () => {
  // 1. Search by title or author and perhaps some other field like publication
  // 2. Filter by reception type (only show translations and adaptaions / only show originals)
  const resp = await fetch(`${testConfig.baseUrl}/publications?query=pub&receptionType=translation&receptionType=article`);
  const json: any = await resp.json();

  // Assert
  assert.equal(resp.status, 200);

  // All publications
  assert.equal(json.publications.length, 3);
});

test("user can search for all originals with a matching title", async () => {
  // 1. Search by title or author and perhaps some other field like publication
  // 2. Filter by reception type (only show translations and adaptaions / only show originals)
  const resp = await fetch(`${testConfig.baseUrl}/publications?query=pub&originals=true`);
  const json: any = await resp.json();

  // Assert
  assert.equal(resp.status, 200);

  // All publications
  assert.equal(json.publications.length, 4);
});
