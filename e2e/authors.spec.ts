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
  await expect(page.getByText("Orlov Vappu")).toBeVisible();
});
