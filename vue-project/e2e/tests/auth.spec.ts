import { test } from "@/fixtures/fixtures.js";
import { adminCredentials } from "@/constants/auth-data.js";
import { TAGS } from "@/constants/tags.js";
import mainPage from "@/pages/main.page.js";

test.describe("Authentication tests", () => {
  test("Successfull login", { tag: TAGS.SMOKE }, async ({ authPage }) => {
    await authPage.goto();

    await authPage.fillForm(adminCredentials.username, adminCredentials.password);
    
    await authPage.submit();

    await new mainPage(authPage.page).checkPageUrl();
  });
});
