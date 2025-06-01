import AuthPage from "@/pages/auth.page.js";
import MainPage from "@/pages/main.page.js";
import { test as base } from "@playwright/test";

export const test = base.extend<{
  authPage: AuthPage;
  mainPage: MainPage;
}>({
  authPage: ({ page }, use) => {
    use(new AuthPage(page));
  },
  mainPage: async ({ authPage }, use) => {
    await authPage.goto();
    await authPage.submit();

    const mainPage = new MainPage(authPage.page);

    mainPage.checkPageUrl();

    use(mainPage);
  },
});
