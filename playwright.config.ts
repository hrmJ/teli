import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  retries: 0,
  timeout: 10000,
  projects: [
    {
      name: "local",
      use: {
        baseURL: "http://localhost:4000",
      },
      retries: 2,
    },
    {
      name: "prod-current",
      use: {
        baseURL: "https://puolukka.rd.tuni.fi/teli-beta",
      },
      retries: 2,
    },
    {
      name: "prod-legacy",
      use: {
        baseURL: "https://puolukka.rd.tuni.fi/tekstitliikkeessa",
      },
      retries: 2,
    },
  ],
});
