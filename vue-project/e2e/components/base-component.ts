import { Locator, Page } from "@playwright/test";

export default class BaseComponent {
  protected readonly page: Page;
  
  constructor(readonly element: Locator) {
      this.page = this.element.page();
  }
}