import { expect, test, type Page } from "@playwright/test";

export default class BasePage {
  constructor(
    public readonly page: Page,
    public readonly url: string,
  ) {}

  async goto(url = this.url) {
    await test.step(`Go to page ${url}`, async () => {
      await this.page.goto(url);

      return this;
    });
  }

  async checkPageUrl(url = this.url) {
    await test.step(`Check that page URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }
}
