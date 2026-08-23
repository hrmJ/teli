import assert from "node:assert";
import test from "node:test";
import { baseUrl } from "./config.ts";

test("Indexing by letters responds with letters of the authors in the db", async () => {
  // insert authors Aino Aalto and Edith Esimerkki
  const resp = await fetch(`${baseUrl}/authors/index`);
  assert.strictEqual(200, resp.status);
  const json = await resp.json();
  assert.deepEqual(["A", "E"], json);
});
