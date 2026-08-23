import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  retries: 0,
  timeout: 10000,
  projects: [
    {
      name: "local",
      timeout: 2000,
      use: {
        baseURL: "http://localhost:4000",
      },
    },
    {
      name: "prod-current",
      use: {
        baseURL: "https://puolukka.rd.tuni.fi/teli-beta",
      },
    },
    {
      name: "prod-legacy",
      use: {
        baseURL: "https://puolukka.rd.tuni.fi/tekstitliikkeessa",
      },
    },
  ],
});
