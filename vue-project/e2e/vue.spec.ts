import { test, expect } from "@playwright/test";

// See here how to get started:
// https://playwright.dev/docs/intro
test("visits the app root url", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main > h1")).toHaveText("Welcome here!");
});

test("shows successful message after successful log in", async ({ page }) => {
  await page.goto("/");
  await page.locator("input[type='submit']").click();

  await expect(page.locator(".success-msg")).toBeVisible();
});
