import assert from "node:assert";
import test from "node:test";
import { baseUrl } from "./config.ts";

test("Authorletters responds with letters of the authors in the db", async () => {
  // insert authors Aino Aalto and Edith Esimerkki
  const resp = await fetch(`${baseUrl}/authorletters`);
  assert.strictEqual(200, resp.status);
  assert.strictEqual(["A", "E"], resp.body);
});
