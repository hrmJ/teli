import assert from "node:assert";
import test from "node:test";
import { baseUrl } from "./config.ts";

test("Status responds ok", async () => {
  const resp = await fetch(`${baseUrl}/status`);
  assert.strictEqual(200, resp.status);
});
