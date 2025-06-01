import { test, type Page } from "@playwright/test";
import BasePage from "./base.page.js";

export default class AuthPage extends BasePage {
  readonly emailInput = this.page.locator("#email");
  readonly passwordInput = this.page.locator("#password");
  readonly submitButton = this.page.locator("input[type=submit]");
  readonly _errorMessage = this.page.locator(".msg");

  constructor(page: Page) {
    super(page, "/auth");
  }

  async fillForm(email: string, password: string) {
    await test.step(`Fill form with email "${email}" and password "${password}"`, async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
    });
  }

  async submit() {
    await test.step("Submit form", async () => {
      await this.submitButton.click();
    });
  }
}
