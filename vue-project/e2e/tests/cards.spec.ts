import { test } from "@/fixtures/fixtures.js";
import { TAGS } from "@/constants/tags.js";

test.describe("Cards tests", () => {
  test("Create a card", { tag: TAGS.SMOKE }, async ({ mainPage }) => {
    await mainPage.goto();

    const cardsCount = await mainPage.addCard("Test Card", "This is a test card content");
    
    await mainPage.checkCardAdded("Test Card", "This is a test card content", cardsCount);
  });
});