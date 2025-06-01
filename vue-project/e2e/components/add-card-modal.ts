import { Locator } from "@playwright/test"
import BaseComponent from "./base-component.js";

export default class AddCardModal extends BaseComponent {
  readonly form = this.element.locator(".edit-form");
  readonly titleInput = this.form.locator("#title");
  readonly contentInput = this.form.locator("#content");
  readonly saveButton = this.form.locator("[value='Save']");
  readonly closeButton = this.form.locator(".close");
  
  constructor(element: Locator) {
    super(element);
  }

  async fillForm(title: string, content: string) {
    await this.titleInput.fill(title);
    await this.contentInput.fill(content);
  }
}