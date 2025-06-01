import { Locator } from "@playwright/test"
import BaseComponent from "./base-component.js";

export default class Card extends BaseComponent {
  readonly title = this.element.locator(".title");
  readonly content = this.element.locator(".content");
  
  private readonly _deleteButton = this.element.locator(".delete-btn");
  
  constructor(element: Locator) {
    super(element);
  }
}