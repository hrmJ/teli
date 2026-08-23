import { test, expect } from "@playwright/test";
import { authors, browseAuthors } from "./constants.ts";

// use {tag: @mutate} for mutating tests

test("User can browse authors", { tag: "@noauth" }, async ({ page }) => {
  await page.goto("");
  await page.getByRole("link", { name: authors }).click();
  await page.getByText(browseAuthors, { exact: true }).click();

  await page.getByText("A", { exact: true }).click();
  await expect(page.getByText("Ahmatova")).toBeVisible();

  await page.getByText("O", { exact: true }).click();
  await page.getByText("Onerva").click();

  await page.getByText("Tekijän tiedot").click();
  await expect(page.getByText("Syntymävuosi")).toBeVisible();

  await expect(page.getByText("Teokset")).toBeVisible();

  await page.getByText("Mun askeleitani vartioi").click();
  await page.getByText("Reseptiot").click();

  await expect(page.getByText("Käännökset")).toBeVisible();
});

test(
  "User can recursively see receptions",
  { tag: "@noauth" },
  async ({ page }) => {
    await page.goto("");
    await page.getByRole("link", { name: authors }).click();
    await page.getByText(browseAuthors, { exact: true }).click();

    await page.getByText("J", { exact: true }).click();
    await page.getByText("Järnefelt Arvid").click();

    await page.getByText("Maaemon lapsia").click();
    await page.getByText("Reseptiot").click();
    await expect(page.getByText("Käännökset")).toBeVisible();
    await page.getByText("Deti zemli").click();
    await page.getByText("Reseptiot").last().click();
    await expect(page.getByText("rtikkelit")).toBeVisible();
    expect(
      await page.getByText("Perevodtšitsa Maria Blagoveštšenskaja").count(),
    ).toEqual(2);
    await page
      .getByText("Perevodtšitsa Maria Blagoveštšenskaja ")
      .first()
      .click();
  },
);
