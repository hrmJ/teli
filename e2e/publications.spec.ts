import { test, expect } from "@playwright/test";
import { authors, browseAuthors, publications } from "./constants.ts";

test(
  "User can search for publications",
  { tag: "@noauth" },
  async ({ page }) => {
    await page.goto("");
    await page.getByRole("link", { name: publications }).click();

    // cf. PIKI search "All fields" / "Title" / "author"

    await test.step("By author OR title", async () => {
      await page.getByRole("searchbox").fill("Maaemon laps");
      await page.getByRole("button", { name: "Hae" }).click();
      await page.getByText("Maaemon lapsia").click();
      await page.getByText("Reseptiot").click();
      await expect(page.getByText("Käännökset")).toBeVisible();
    });
    await test.step("By title", async () => {
      await page.getByRole("searchbox").fill("Maaemon laps");
      await page.getByRole("button", { name: "Hae" }).click();
      await page.getByText("Maaemon lapsia").click();
      await page.getByText("Reseptiot").click();
      await expect(page.getByText("Käännökset")).toBeVisible();
    });

    await test.step("By author", async () => {
      await page.getByRole("searchbox").fill("Maaemon laps");
      await page.getByRole("button", { name: "Hae" }).click();
      await page.getByText("Maaemon lapsia").click();
      await page.getByText("Reseptiot").click();
      await expect(page.getByText("Käännökset")).toBeVisible();
    });
  },
);

test("User can filter search results", { tag: "@noauth" }, async ({ page }) => {
  await test.step("By year", async () => {
    //TODO
  });
  await test.step("By language", async () => {
    //TODO
  });
  await test.step("By reception type", async () => {
    //TODO
  });
});

test(
  "Large result sets are paginated",
  { tag: "@noauth" },
  async ({ page }) => {
    // Earlier step: limit result number and ask to narrow search
  },
);
